import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // One worker at a time: four headless browsers plus two dev servers starve the
  // 16 GB box, and Firefox's software compositor (SwiftShader) hangs under that
  // pressure — the page renders but the renderer stops responding, so locator
  // waits time out and context teardown needs a force-kill.
  workers: 1,
  retries: 0,
  timeout: 120000,
  expect: { timeout: 10000 },
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { browserName: 'chromium', viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile-chromium', use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'firefox', use: { browserName: 'firefox', viewport: { width: 1366, height: 900 } } },
    { name: 'webkit', use: { browserName: 'webkit', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: [
    // Reuse an already-running server: both servers read from disk/source on
    // every request, so a leftover instance still serves the current build.
    // With `false`, a stray server on the port aborts the whole run.
    { command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: true },
    // Port 5174, not Vite's default 5173: another project on this machine owns
    // 5173, and `reuseExistingServer` would silently bind the suite to that
    // app instead of this one.
    { command: 'npm run dev -- --host 127.0.0.1 --port 5174 --strictPort', url: 'http://127.0.0.1:5174', reuseExistingServer: true },
  ],
});
