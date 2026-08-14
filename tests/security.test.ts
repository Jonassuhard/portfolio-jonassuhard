import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync(new URL("../next.config.mjs", import.meta.url), "utf8");

test("les headers de défense restent déclarés par le projet", () => {
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /max-age=63072000; includeSubDomains; preload/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /Referrer-Policy/);
  assert.match(config, /Permissions-Policy/);
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /frame-ancestors 'none'/);
});
