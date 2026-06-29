#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const PROMPTS_PATH = path.join(ROOT, "public/assets/cards/PROMPTS_IMAGES_PROJETS.md");
const OUTPUT_DIR = path.join(ROOT, "public/assets/cards");
const SLUGS = [
  "les-petites-griffes",
  "educool",
  "capselys",
  "iscom",
  "battle-engine",
  "hoopsphere",
];

const GEMINI_KEY_NAMES = ["GEMINI_API_KEY", "GOOGLE_API_KEY"];

async function loadDotEnv() {
  for (const name of [".env.local", ".env"]) {
    const file = path.join(ROOT, name);
    let content;
    try {
      content = await fs.readFile(file, "utf8");
    } catch {
      continue;
    }

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const [rawKey, ...rawValue] = line.split("=");
      const key = rawKey.trim().replace(/^export\s+/, "");
      if (process.env[key]) continue;
      process.env[key] = rawValue.join("=").trim().replace(/^['"]|['"]$/g, "");
    }
  }
}

function getGeminiApiKey() {
  for (const keyName of GEMINI_KEY_NAMES) {
    if (process.env[keyName]) return process.env[keyName];
  }
  return null;
}

async function readPrompts() {
  const markdown = await fs.readFile(PROMPTS_PATH, "utf8");
  const styleMatch = markdown.match(/## STYLE COMMUN[\s\S]*?```([\s\S]*?)```/);
  if (!styleMatch) {
    throw new Error(`Style commun introuvable dans ${PROMPTS_PATH}`);
  }

  const style = styleMatch[1].trim();
  const prompts = new Map();
  const projectRegex = /###\s+([a-z0-9-]+)\.webp[\s\S]*?```([\s\S]*?)```/g;
  let match;

  while ((match = projectRegex.exec(markdown))) {
    const slug = match[1];
    const rawPrompt = match[2].trim();
    const prompt = rawPrompt
      .replace(/\[STYLE COMMUN\]\s*\+\s*/g, `${style}\n\n`)
      .concat(
        "\n\nFinal asset constraints: no readable text, no readable letters, no readable numbers, no logo-like marks. Keep the composition centered with clean margins."
      );
    prompts.set(slug, prompt);
  }

  for (const slug of SLUGS) {
    if (!prompts.has(slug)) {
      throw new Error(`Prompt manquant pour ${slug}`);
    }
  }

  return SLUGS.map((slug) => ({ slug, prompt: prompts.get(slug) }));
}

async function postJson(url, body, apiKey) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  if (!response.ok) {
    const message = json?.error?.message || text.slice(0, 500) || response.statusText;
    throw new Error(`HTTP ${response.status}: ${message}`);
  }

  return json;
}

function base64ToBuffer(base64) {
  if (!base64 || typeof base64 !== "string") return null;
  return Buffer.from(base64, "base64");
}

function extractImageBuffer(payload) {
  const candidates = [
    payload?.output_image?.data,
    payload?.outputImage?.data,
    payload?.image?.imageBytes,
    payload?.generatedImages?.[0]?.image?.imageBytes,
    payload?.generated_images?.[0]?.image?.image_bytes,
    payload?.predictions?.[0]?.bytesBase64Encoded,
    payload?.predictions?.[0]?.image?.bytesBase64Encoded,
    payload?.predictions?.[0]?.imageBytes,
  ];

  for (const candidate of candidates) {
    const buffer = base64ToBuffer(candidate);
    if (buffer?.length) return buffer;
  }

  const part = payload?.candidates?.[0]?.content?.parts?.find((entry) => entry?.inlineData?.data);
  const partBuffer = base64ToBuffer(part?.inlineData?.data);
  if (partBuffer?.length) return partBuffer;

  throw new Error("Aucune donnée image trouvée dans la réponse API");
}

async function generateWithGeminiImage(prompt, apiKey) {
  const model = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image";
  const json = await postJson(
    "https://generativelanguage.googleapis.com/v1beta/interactions",
    {
      model,
      input: [{ type: "text", text: prompt }],
      response_format: {
        type: "image",
        mime_type: "image/png",
        aspect_ratio: "16:9",
        image_size: "2K",
      },
    },
    apiKey
  );

  return {
    provider: `Gemini Interactions API (${model})`,
    buffer: extractImageBuffer(json),
  };
}

async function generateWithImagen(prompt, apiKey) {
  const model = process.env.IMAGEN_MODEL || "imagen-4.0-generate-001";
  const json = await postJson(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`,
    {
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "16:9",
        imageSize: "2K",
        personGeneration: "dont_allow",
      },
    },
    apiKey
  );

  return {
    provider: `Imagen predict API (${model})`,
    buffer: extractImageBuffer(json),
  };
}

async function generateImage(prompt, apiKey) {
  const errors = [];
  for (const generate of [generateWithGeminiImage, generateWithImagen]) {
    try {
      return await generate(prompt, apiKey);
    } catch (error) {
      const cause = error.cause
        ? ` (${error.cause.code || error.cause.name || "cause"}: ${error.cause.message})`
        : "";
      errors.push(`${error.message}${cause}`);
    }
  }

  throw new Error(errors.map((message, index) => `${index + 1}. ${message}`).join("\n"));
}

async function writeWebp(inputBuffer, slug) {
  const outputPath = path.join(OUTPUT_DIR, `${slug}.webp`);
  const tempPath = path.join(OUTPUT_DIR, `.${slug}.tmp.webp`);

  await sharp(inputBuffer)
    .resize(1600, 900, { fit: "cover", position: "center" })
    .webp({ quality: 82 })
    .toFile(tempPath);

  await fs.rename(tempPath, outputPath);

  const meta = await sharp(outputPath).metadata();
  if (meta.width !== 1600 || meta.height !== 900 || meta.format !== "webp") {
    throw new Error(`${slug}: sortie invalide ${meta.width}x${meta.height} ${meta.format}`);
  }

  return outputPath;
}

async function main() {
  await loadDotEnv();
  const apiKey = getGeminiApiKey();
  const prompts = await readPrompts();

  if (process.argv.includes("--dry-run")) {
    console.log(`Prompts: ${prompts.length}`);
    console.log(`Gemini key: ${apiKey ? "present" : "missing"}`);
    console.log(`Outputs: ${SLUGS.map((slug) => `${slug}.webp`).join(", ")}`);
    return;
  }

  if (!apiKey) {
    throw new Error("Aucune cle Gemini disponible: GEMINI_API_KEY ou GOOGLE_API_KEY manquante");
  }

  for (const { slug, prompt } of prompts) {
    console.log(`Generating ${slug}.webp`);
    const { provider, buffer } = await generateImage(prompt, apiKey);
    const outputPath = await writeWebp(buffer, slug);
    console.log(`Saved ${path.relative(ROOT, outputPath)} via ${provider}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
