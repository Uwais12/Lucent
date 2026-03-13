// @ts-check
const { test, expect } = require("@playwright/test");

const BASE = "https://lucentapp.io";
const EMAIL = "umoney@hotmail.co.uk";
const PASSWORD = "2Easyforme!";

test.describe("Lucent E2E Smoke Tests", () => {
  test("1. Landing page loads", async ({ page }) => {
    await page.goto(`${BASE}/landing-page`);
    await expect(page).toHaveTitle(/Lucent/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("2. Sign in and load dashboard", async ({ page }) => {
    // Go to sign-in
    await page.goto(`${BASE}/sign-in`);
    await page.waitForLoadState("networkidle");

    // Fill Clerk sign-in form
    const emailInput = page.locator('input[name="identifier"]');
    await emailInput.waitFor({ timeout: 15000 });
    await emailInput.fill(EMAIL);
    await page.locator('button:has-text("Continue")').click();

    // Wait for password field
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.waitFor({ timeout: 10000 });
    await passwordInput.fill(PASSWORD);
    await page.locator('button:has-text("Continue")').click();

    // Should redirect to dashboard - wait for profile API to complete
    await page.waitForURL(`${BASE}/**`, { timeout: 20000 });
    await page.waitForLoadState("networkidle");

    // Check dashboard loaded (not showing error)
    const body = await page.locator("body").textContent();
    console.log("Dashboard body preview:", body?.substring(0, 500));

    // Should NOT show "something went wrong" or "failed to load"
    expect(body?.toLowerCase()).not.toContain("something went wrong");
    expect(body?.toLowerCase()).not.toContain("failed to load content");

    // Should show welcome text or user content
    const hasContent =
      body?.includes("Welcome") ||
      body?.includes("Dashboard") ||
      body?.includes("quiz") ||
      body?.includes("course");
    expect(hasContent).toBeTruthy();
  });

  test("3. Profile API returns valid data after sign-in", async ({ page }) => {
    // Sign in first
    await page.goto(`${BASE}/sign-in`);
    await page.waitForLoadState("networkidle");

    const emailInput = page.locator('input[name="identifier"]');
    await emailInput.waitFor({ timeout: 15000 });
    await emailInput.fill(EMAIL);
    await page.locator('button:has-text("Continue")').click();

    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.waitFor({ timeout: 10000 });
    await passwordInput.fill(PASSWORD);
    await page.locator('button:has-text("Continue")').click();

    await page.waitForURL(`${BASE}/**`, { timeout: 20000 });
    await page.waitForLoadState("networkidle");

    // Now call profile API
    const response = await page.evaluate(async () => {
      const res = await fetch("/api/profile");
      return { status: res.status, body: await res.json() };
    });

    console.log("Profile API status:", response.status);
    console.log("Profile API body keys:", Object.keys(response.body));
    console.log("Profile subscription:", response.body.subscription);
    console.log("Profile email:", response.body.email);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("clerkId");
    expect(response.body.subscription?.tier).toBe("ENTERPRISE");
  });

  test("4. Course details page loads for a new course", async ({ page }) => {
    // Sign in
    await page.goto(`${BASE}/sign-in`);
    await page.waitForLoadState("networkidle");
    const emailInput = page.locator('input[name="identifier"]');
    await emailInput.waitFor({ timeout: 15000 });
    await emailInput.fill(EMAIL);
    await page.locator('button:has-text("Continue")').click();
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.waitFor({ timeout: 10000 });
    await passwordInput.fill(PASSWORD);
    await page.locator('button:has-text("Continue")').click();
    await page.waitForURL(`${BASE}/**`, { timeout: 20000 });

    // Navigate to a course
    await page.goto(`${BASE}/course-details/clean-code`);
    await page.waitForLoadState("networkidle");

    const body = await page.locator("body").textContent();
    console.log("Course page preview:", body?.substring(0, 500));

    // Should not have critical error messages
    expect(body?.toLowerCase()).not.toContain("something went wrong");
    expect(body?.toLowerCase()).not.toContain("failed to load");

    // Should have course content
    const hasCourseContent =
      body?.includes("Clean Code") ||
      body?.includes("Chapter") ||
      body?.includes("Lesson");
    expect(hasCourseContent).toBeTruthy();
  });

  test("5. Courses API returns all 4 courses", async ({ page }) => {
    await page.goto(`${BASE}/sign-in`);
    await page.waitForLoadState("networkidle");
    const emailInput = page.locator('input[name="identifier"]');
    await emailInput.waitFor({ timeout: 15000 });
    await emailInput.fill(EMAIL);
    await page.locator('button:has-text("Continue")').click();
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.waitFor({ timeout: 10000 });
    await passwordInput.fill(PASSWORD);
    await page.locator('button:has-text("Continue")').click();
    await page.waitForURL(`${BASE}/**`, { timeout: 20000 });

    const response = await page.evaluate(async () => {
      const res = await fetch("/api/courses");
      return { status: res.status, body: await res.json() };
    });

    console.log("Courses API status:", response.status);
    console.log(
      "Courses:",
      response.body.map?.((c) => c.title) || response.body
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(4);
  });

  test("6. Quiz limit not enforced for Enterprise user", async ({ page }) => {
    await page.goto(`${BASE}/sign-in`);
    await page.waitForLoadState("networkidle");
    const emailInput = page.locator('input[name="identifier"]');
    await emailInput.waitFor({ timeout: 15000 });
    await emailInput.fill(EMAIL);
    await page.locator('button:has-text("Continue")').click();
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.waitFor({ timeout: 10000 });
    await passwordInput.fill(PASSWORD);
    await page.locator('button:has-text("Continue")').click();
    await page.waitForURL(`${BASE}/**`, { timeout: 20000 });
    await page.waitForLoadState("networkidle");

    const body = await page.locator("body").textContent();
    console.log("Dashboard text for quiz check:", body?.substring(0, 300));

    // Enterprise user should NOT see "quiz limit reached"
    expect(body?.toLowerCase()).not.toContain("quiz limit reached");
    // Should see "unlimited quizzes"
    expect(body?.toLowerCase()).toContain("unlimited quizzes");
  });
});
