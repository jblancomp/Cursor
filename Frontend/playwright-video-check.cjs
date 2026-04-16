/* eslint-disable no-console */

async function run() {
  const { chromium } = require('playwright');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const log = (...args) => console.log('[video-check]', ...args);

  try {
    await page.goto('http://localhost:3000/', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    log('home:', page.url());

    const reactCourseLink = page.getByRole('link', { name: /react/i }).first();
    await reactCourseLink.waitFor({ timeout: 15_000 });
    await reactCourseLink.click();
    await page.waitForLoadState('domcontentloaded');
    log('course:', page.url());

    const firstClassCandidate = page
      .getByRole('link', { name: /(clase|class).*1|^1\b|primera/i })
      .first();

    try {
      await firstClassCandidate.waitFor({ timeout: 8_000 });
      await firstClassCandidate.click();
    } catch {
      // Fallback: click the first link that is not the current page URL.
      const anyLinks = page.locator('a[href]');
      const count = await anyLinks.count();
      if (count === 0) throw new Error('No links found to navigate to a class.');
      await anyLinks.first().click();
    }

    await page.waitForLoadState('domcontentloaded');
    log('class:', page.url());

    const videoLike = page.locator(
      'video, iframe, [data-testid*=video], [class*=video], [id*=video]'
    );
    const count = await videoLike.count();
    let visible = 0;
    for (let i = 0; i < count; i++) {
      // isVisible may throw for detached nodes; treat as not visible.
      // eslint-disable-next-line no-await-in-loop
      const v = await videoLike
        .nth(i)
        .isVisible()
        .catch(() => false);
      if (v) visible++;
    }

    await page.screenshot({ path: 'playwright-video-check.png', fullPage: true });
    log('video-like elements:', { count, visible });

    console.log(visible > 0 ? 'RESULT: VIDEO_PLAYER_VISIBLE' : 'RESULT: VIDEO_PLAYER_NOT_VISIBLE');
  } finally {
    await browser.close();
  }
}

run().catch((e) => {
  console.error('RESULT: ERROR', e?.message ?? e);
  process.exitCode = 1;
});

