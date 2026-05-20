// Skip full Chromium download in CI/Vercel — the build path there uses
// @sparticuz/chromium (a serverless-friendly Chrome bundle) via
// puppeteer-core. Locally (Windows/macOS) we still want puppeteer's
// bundled Chrome for the dev prerender flow.
module.exports = {
  skipDownload: !!(process.env.CI || process.env.VERCEL),
};
