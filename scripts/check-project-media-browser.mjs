// Requires Playwright in the local QA toolchain; the site's runtime has no browser dependency.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.argv[2] || 'http://127.0.0.1:3199';
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const width of [375, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    await page.goto(`${base}/projets/battle-engine`, { waitUntil: 'networkidle' });
    const videos = page.locator('video');
    assert.equal(await videos.count(), 5);
    for (let index = 0; index < 5; index++) {
      const video = videos.nth(index);
      await video.scrollIntoViewIfNeeded();
      await page.waitForFunction(index => {
        const v = document.querySelectorAll('video')[index];
        return v.readyState >= 2 && !v.paused && v.currentTime > 0;
      }, index, { timeout: 12000 });
      const state = await video.evaluate(v => ({
        src: v.currentSrc, width: v.videoWidth, height: v.videoHeight,
        time: v.currentTime, controls: v.controls, muted: v.muted, playsInline: v.playsInline,
        declaredRatio: Number(v.getAttribute('width')) / Number(v.getAttribute('height')),
      }));
      assert.equal(state.controls, false);
      assert.equal(state.muted, true);
      assert.equal(state.playsInline, true);
      assert.ok(Math.abs(state.declaredRatio - state.width / state.height) < 0.001);
      await page.waitForTimeout(350);
      assert.ok(await video.evaluate(v => v.currentTime) > state.time, 'video must advance');
      results.push({ viewportWidth: width, index, ...state, verdict: 'PASS' });
    }
    const hero = videos.first();
    await hero.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => !document.querySelector('video').paused);
    await hero.focus();
    await page.keyboard.press('Space');
    assert.equal(await hero.evaluate(v => v.paused), true, 'keyboard pause');
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => !document.querySelector('video').paused);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    assert.equal(await videos.evaluateAll(vs => vs.every(v => v.paused)), true, 'offscreen pause');
    await hero.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => !document.querySelector('video').paused);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(500);
    assert.equal(await videos.evaluateAll(vs => vs.every(v => v.paused)), true, 'reduced motion pause');
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await videos.evaluateAll(vs => vs.every(v => v.paused)), true, 'reduced motion initial load');
    results.push({ width, keyboardPause: true, offscreenPause: true, reducedMotion: true, verdict: 'PASS' });
    await context.close();
  }
} finally {
  await browser.close();
  await fs.mkdir('tmp', { recursive: true });
  await fs.writeFile('tmp/project-media-browser.json', JSON.stringify(results, null, 2));
}
console.log(JSON.stringify({ verdict: 'PASS', checks: results.length, results }, null, 2));
