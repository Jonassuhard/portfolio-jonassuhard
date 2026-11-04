import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../public/", import.meta.url));
const manifest = {};
for (const name of ["cv", "cv-portfolio"]) {
  const pdf = `${root}${name}.pdf`;
  const info = execFileSync("pdfinfo", [pdf], { encoding: "utf8" });
  if (!/^Pages:\s+1\s*$/m.test(info)) throw new Error(`${name}: expected a one-page CV`);
  execFileSync("pdftoppm", ["-f", "1", "-singlefile", "-scale-to", "1800", "-jpeg", "-jpegopt", "quality=88", pdf, `${root}${name}-preview`]);
  manifest[name] = createHash("sha256").update(readFileSync(pdf)).digest("hex");
}
writeFileSync(`${root}cv-previews.json`, JSON.stringify(manifest, null, 2) + "\n");
