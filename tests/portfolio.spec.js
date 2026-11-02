import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { projects, skillGroups, certifications, filterProjects, ALL_PROJECTS, experience } from '../src/data/portfolio.js';

const title = 'Prathibha D | AI/ML & Data Science Portfolio';

async function expectNoOverflow(page) {
  const widths = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
}

async function waitForAnimations(locator) {
  await locator.evaluate((element) => Promise.race([
    Promise.all(element.getAnimations().map((animation) => animation.finished)),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]));
}

async function revealAll(page) {
  // Headless Chromium defers the initial IntersectionObserver delivery for ~1.5s
  // after load; scrolling before it lands would skip elements above the fold.
  // All waiting happens Node-side: page timers and rAF get throttled or paused
  // when a browser window is occluded during parallel runs.
  await page.waitForFunction(
    () => document.querySelectorAll('.reveal-visible').length > 0,
    null,
    { timeout: 20000, polling: 100 }
  );
  // Scroll in 60% viewport steps, not full-height ones: `window.scrollTo` is an
  // instant jump, so an element that is only ever visible between two steps
  // never registers as intersecting and its `whileInView` animation never runs.
  // That left the About quote in its initial state (mark scaled to 0, caption
  // offset 10px), which overflows the figure and trips axe's
  // `scrollable-region-focusable` rule. A step smaller than the viewport minus
  // the 80px `viewport.margin` every section uses guarantees a hit.
  const step = await page.evaluate(() => Math.round(window.innerHeight * 0.6));
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  for (let y = 0; y <= scrollHeight; y += step) {
    await page.evaluate((target) => window.scrollTo(0, target), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => { window.scrollTo(0, 0); document.documentElement.style.scrollBehavior = ''; });
  await page.waitForFunction(
    () => [...document.querySelectorAll('.reveal')].every((element) => getComputedStyle(element).opacity === '1'),
    null,
    { timeout: 20000, polling: 100 }
  );
}

test('verified content, metadata, valid anchors, and clean browser console', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto('/');
  await expect(page).toHaveTitle(title);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('.project-card')).toHaveCount(projects.length);
  await expect(page.locator('#hero .hero-intro')).toHaveText("Hi, I'm Prathibha D.");
  await expect(page.locator('#hero')).toContainText('Prathibha D');
  await expect(page.locator('#hero h1')).toHaveText('Building things that actually work.');
  await expect(page.locator('#hero')).not.toContainText('Turning data into');
  await expect(page.locator('#hero .impact')).toHaveCount(0);
  await expect(page.locator('#education')).toContainText('9.18/10');
  await expect(page.locator('#experience')).toContainText('Bold Analytics');
  const roles = page.locator('#experience .experience-row h3');
  await expect(roles).toHaveCount(experience.length);
  for (const [index, role] of experience.entries()) {
    await expect(roles.nth(index)).toHaveText(role.role);
  }
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Prathibha D/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
  const icon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect((await page.request.get(icon)).ok()).toBeTruthy();
  const links = await page.locator('a').evaluateAll((items) => items.map((item) => item.getAttribute('href')));
  for (const href of links) {
    expect(href).toBeTruthy();
    expect(href).not.toBe('#');
    if (href.startsWith('#/projects/')) expect(projects.some((project) => href === `#/projects/${project.slug}`)).toBeTruthy();
  }
  // Resolve every in-page anchor in one browser-side pass instead of one
  // round trip per link, which dominates the runtime on a loaded machine.
  const unresolvedAnchors = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href) => href && href !== '#' && !href.startsWith('#/'))
      .filter((href) => !document.getElementById(href.slice(1)))
  );
  expect(unresolvedAnchors).toEqual([]);
  await expect(page.locator('body')).not.toContainText('hello@example.com');
await expect(page.locator('#certifications')).toBeVisible();
await expect(page.locator('#certifications article')).toHaveCount(certifications.length);
await expect(page.locator('#contact')).toContainText('prathibhaa2006@gmail.com');
expect(errors).toEqual([]);
});

test('project filters match the data and announce result counts', async ({ page }) => {
  await page.goto('/#projects');
  const toolbar = page.locator('.project-toolbar');
  await toolbar.waitFor({ state: 'visible' });

  const categories = [ALL_PROJECTS, ...new Set(projects.map((project) => project.category))];
  for (const category of categories) {
    const count = filterProjects(category).length;
    const button = page.getByRole('button', { name: category, exact: true });
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled();
    // Let any in-flight transition on the control settle so the click lands on a
    // stable element instead of retrying against a moving box.
    await waitForAnimations(toolbar);
    await button.click();

    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(count);
    if (count > 0) await expect(cards.first()).toBeVisible();
    const label = count === 1 ? 'project' : 'projects';
    const suffix = category === 'All projects' ? '' : ` in ${category}`;
    await expect(page.getByRole('status')).toHaveText(`${count} ${label}${suffix}`);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  }
});

test('all project routes support direct loading, reload, and Escape', async ({ page }) => {
  for (const project of projects) {
    await page.goto(`/#/projects/${project.slug}`);
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: project.title, exact: true })).toBeVisible();
    await expect(dialog).toContainText(project.result);
    await expect(page).toHaveTitle(`${project.title} | Prathibha D`);
    await page.reload();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expectNoOverflow(page);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page).toHaveTitle(title);
  }
});

test('detail dialog traps focus and preserves filters through history', async ({ page }) => {
  await page.goto('/#projects');
  await page.getByRole('button', { name: 'ML Applications', exact: true }).click();
  const trigger = page.getByRole('link', { name: 'Explore BusFlow', exact: true });
  await trigger.focus();
  await trigger.press('Enter');
  const close = page.getByRole('button', { name: 'Close project details' });
  await expect(close).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(close).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.goForward();
  await expect(page.getByRole('dialog')).toBeVisible();
  await close.click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.locator('body').evaluate((body) => body.style.overflow)).toBe('');
});

test('unknown project route has an accessible recovery path', async ({ page }) => {
  await page.goto('/#/projects/not-a-real-project');
  await expect(page.getByRole('dialog')).toContainText('That project isn’t here.');
  await page.getByRole('button', { name: 'Close project details' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('#projects h2')).toBeFocused();
});

test('skill groups render as cards with their skills', async ({ page }) => {
  await page.goto('/#skills');
  const cards = page.locator('#skills .skill-card');
  await expect(cards).toHaveCount(skillGroups.length);
  for (const [index, group] of skillGroups.entries()) {
    const card = cards.nth(index);
    await expect(card).toContainText(group.name);
    await expect(card).toContainText(group.description);
    for (const skill of group.items) await expect(card.getByText(skill, { exact: true })).toBeVisible();
  }
  await expect(page.locator('#skills')).not.toContainText('%');
});

test('mobile menu, skip link, focus, and resize behavior', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'webkit', 'Playwright WebKit on Windows excludes anchors from Tab order');
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const toggle = page.getByRole('button', { name: 'Menu', exact: false });
  await toggle.click();
  await expect(page.locator('#main-navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeFocused();
  await expect(page.locator('#main-navigation')).toBeHidden();
  await toggle.click();
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
});

test('responsive layouts do not overflow from 320px to desktop', async ({ page }, testInfo) => {
  test.setTimeout(90000);
  await page.goto('/');
  for (const width of [320, 360, 390, 560, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await revealAll(page);
    await expectNoOverflow(page);
    const overflowing = await page.locator('main').evaluate((main) => [...main.querySelectorAll('*')].filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && (rect.right > document.documentElement.clientWidth + 1 || rect.left < -1);
    }).map((element) => element.className));
    expect(overflowing).toEqual([]);
  }
  await page.screenshot({ path: testInfo.outputPath('desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: testInfo.outputPath('mobile.png'), fullPage: true });
});

test('WCAG automated checks pass on home and project details', async ({ page }) => {
  await page.goto('/');
  await revealAll(page);
  await waitForAnimations(page.locator('.hero-copy'));
  const home = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(home.violations).toEqual([]);
  await page.goto('/#/projects/credit-card-fraud-detection');
  await expect(page.getByRole('dialog')).toBeVisible();
  await waitForAnimations(page.getByRole('dialog'));
  const details = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(details.violations).toEqual([]);
});

test('reduced motion disables animation and smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');
  expect(await page.locator('.hero-copy').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
});

test('development server renders and opens project views without runtime errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://127.0.0.1:5174/');
  await expect(page).toHaveTitle(title);
  await page.getByRole('link', { name: 'Explore BusFlow', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close project details' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(errors).toEqual([]);
});
