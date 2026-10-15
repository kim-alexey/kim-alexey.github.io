import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const port = 3210;
const basePath = process.env.PORTFOLIO_BASE_PATH || "";
const url = `http://127.0.0.1:${port}${basePath}/`;
const errors = [];
const server = spawn(process.execPath, ["scripts/serve.mjs"], {
  env: { ...process.env, PORT: String(port) },
  stdio: "pipe",
});
server.stderr.on("data", (data) => errors.push(data.toString()));
let browser;
let passed = 0;
const check = (label) => {
  passed++;
  console.log(`PASS ${label}`);
};
try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(url)).ok) {
        ready = true;
        break;
      }
    } catch {
      /* server starting */
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert(ready, "Static server did not become ready");
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1050 },
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().startsWith(url) && response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  assert.match(await page.title(), /Alexey Kim/);
  assert.match(
    await page.locator(".hero-description").innerText(),
    /Alexey Kim/,
  );
  for (const id of ["about", "experience", "projects", "skills", "contact"])
    assert.equal(await page.locator(`#${id}`).count(), 1);
  const brokenAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter(
          (a) => !document.getElementById(a.getAttribute("href").slice(1)),
        )
        .map((a) => a.outerHTML),
    );
  assert.deepEqual(brokenAnchors, []);
  const body = await page.locator("body").innerText();
  assert(!/Industrial Engineering|GPA|expert|80%/.test(body));
  assert.equal(
    await page.locator('meta[name="robots"]').getAttribute("content"),
    "noindex, nofollow",
  );
  check(
    "Content, privacy exclusions, draft indexing policy, and section navigation",
  );

  const resumeLink = page.locator(".resume-link");
  assert.equal(
    await resumeLink.getAttribute("href"),
    `${basePath}/Alexey-Kim-Resume.pdf`,
  );
  const downloadEvent = page.waitForEvent("download");
  await resumeLink.click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), "Alexey-Kim-Resume.pdf");
  assert.equal(await download.failure(), null);
  const pdf = await fetch(
    `http://127.0.0.1:${port}${basePath}/Alexey-Kim-Resume.pdf`,
  );
  assert.equal(pdf.headers.get("content-type"), "application/pdf");
  assert.equal(
    Buffer.from(await pdf.arrayBuffer())
      .subarray(0, 5)
      .toString(),
    "%PDF-",
  );
  assert.equal(
    await page.locator('a[href="mailto:kim.alyosha@gmail.com"]').count(),
    1,
  );
  assert.equal(
    await page
      .locator('a[href="https://www.linkedin.com/in/alexeykim-sbu/"]')
      .count(),
    1,
  );
  check(
    "Resume download, PDF response, email and supplied LinkedIn destination",
  );

  await page.getByRole("button", { name: "UNDERSTAND Business" }).click();
  assert.match(
    await page.locator(".map-caption").innerText(),
    /people and the problem/,
  );
  check("Interactive connection map");

  assert.equal(await page.locator(".project-card").count(), 3);
  for (const category of ["Data", "Planning", "Development"]) {
    await page
      .locator(".project-filters")
      .getByRole("button", { name: category, exact: true })
      .click();
    assert.equal(await page.locator(".project-card").count(), 1);
  }
  await page
    .locator(".project-filters")
    .getByRole("button", { name: /All work/ })
    .click();
  assert.equal(await page.locator(".project-card").count(), 3);
  check("Project filters show the correct collection");

  const trigger = page.getByRole("button", {
    name: /Read project notes: English Premier League/,
  });
  await trigger.click();
  assert(await page.locator("dialog").isVisible());
  assert.match(await page.locator("dialog").innerText(), /completion status/);
  const modalAxe = await new AxeBuilder({ page })
    .include("dialog")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    modalAxe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
    [],
  );
  await page.keyboard.press("Escape");
  assert(!(await page.locator("dialog").isVisible()));
  assert(await trigger.evaluate((el) => el === document.activeElement));
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");
  check(
    "Project dialog, Escape dismissal, focus return, and modal accessibility",
  );

  const detail = page
    .locator("details")
    .filter({ hasText: "Front-End & CMS Developer" });
  await detail.locator("summary").click();
  assert(await detail.evaluate((el) => el.open));
  await detail.locator("summary").click();
  assert(!(await detail.evaluate((el) => el.open)));
  check("Experience entries expand and collapse");

  await page.getByRole("button", { name: /Cursor trail/ }).click();
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(
    await page
      .getByRole("button", { name: /Cursor trail/ })
      .getAttribute("aria-pressed"),
    "false",
  );
  await page.getByRole("button", { name: /Cursor trail/ }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page
      .locator(".cursor-trail")
      .evaluate((el) => getComputedStyle(el).display),
    "none",
  );
  assert.equal(
    await page
      .locator(".orbit-dot")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  check(
    "Cursor preference persists and reduced motion disables visual animation",
  );

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    accessibility.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
    [],
  );
  check("Desktop automated WCAG accessibility scan");
  await mkdir("test-results", { recursive: true });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: "test-results/desktop.png",
    animations: "disabled",
  });
  await page.screenshot({
    path: "test-results/full-desktop.png",
    fullPage: true,
    animations: "disabled",
  });

  for (const width of [320, 390, 640, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      content: document.documentElement.scrollWidth,
    }));
    assert(
      dimensions.content <= dimensions.width,
      `Horizontal overflow at ${width}px: ${dimensions.content}`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  const menu = page.locator(".menu-toggle");
  await menu.click();
  assert.equal(await menu.getAttribute("aria-expanded"), "true");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Skills", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .getAttribute("aria-expanded"),
    "false",
  );
  assert.equal(new URL(page.url()).hash, "#skills");
  const mobileAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    mobileAxe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
    [],
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: "test-results/mobile.png",
    animations: "disabled",
  });
  await page.screenshot({
    path: "test-results/full-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  check("Responsive layouts, mobile navigation and mobile accessibility");

  const touchPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await touchPage.goto(url, { waitUntil: "networkidle" });
  assert.equal(
    await touchPage
      .locator(".cursor-trail")
      .evaluate((el) => getComputedStyle(el).display),
    "none",
  );
  await touchPage.close();
  assert.deepEqual(errors, []);
  check(
    "Touch devices hide cursor effects; no browser errors or failing local assets",
  );
  console.log(
    `${passed} smoke checks passed against the production static export.`,
  );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
