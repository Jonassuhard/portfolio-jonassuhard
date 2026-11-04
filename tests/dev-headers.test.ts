import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import test from "node:test";

test("HTTPS reste impose en production sans casser WebKit en dev HTTP", () => {
  const configUrl = pathToFileURL(process.cwd() + "/next.config.mjs").href;
  const script = `const {default:config}=await import(${JSON.stringify(configUrl)}); console.log(JSON.stringify(await config.headers()));`;
  for (const environment of ["development", "production"] as const) {
    const rules = JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", script], {
      env: {...process.env, NODE_ENV: environment}, encoding: "utf8"
    }));
    const headers = rules.find((rule: {source: string}) => rule.source === "/:path*").headers;
    const csp = headers.find((header: {key: string}) => header.key === "Content-Security-Policy").value;
    assert.equal(csp.includes("upgrade-insecure-requests"), environment === "production");
    for (const directive of ["frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'", "object-src 'none'"]) {
      assert.ok(csp.includes(directive));
    }
  }
});
