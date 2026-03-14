// @ts-check
const { test, expect } = require("@playwright/test");

const BASE = "https://lucentapp.io";
const EMAIL = "umoney@hotmail.co.uk";
const PASSWORD = "2Easyforme!";

// Helper: sign in via Clerk and wait for dashboard
async function signIn(page) {
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

  // Wait for redirect away from sign-in page
  await page.waitForURL((url) => !url.pathname.includes("sign-in"), {
    timeout: 20000,
  });
  await page.waitForLoadState("networkidle");
}

test.describe("Lucent E2E Smoke Tests", () => {
  test("1. Landing page loads with SEO metadata", async ({ page }) => {
    await page.goto(`${BASE}/landing-page`);
    await expect(page).toHaveTitle(/Lucent/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("2. Sign in and dashboard loads without errors", async ({ page }) => {
    await signIn(page);

    const body = await page.locator("body").textContent();

    // Should NOT show error states
    expect(body?.toLowerCase()).not.toContain("something went wrong");
    expect(body?.toLowerCase()).not.toContain("failed to load content");

    // Should show user content (welcome, courses, etc)
    const hasContent =
      body?.includes("Welcome") ||
      body?.includes("course") ||
      body?.includes("quiz");
    expect(hasContent).toBeTruthy();

    console.log("Dashboard loaded OK. Preview:", body?.substring(0, 200));
  });

  test("3. Profile API returns valid data", async ({ page }) => {
    await signIn(page);

    const response = await page.evaluate(async () => {
      const res = await fetch("/api/profile");
      return { status: res.status, body: await res.json() };
    });

    console.log("Profile API status:", response.status);
    console.log(
      "Profile keys:",
      Object.keys(response.body).slice(0, 10).join(", ")
    );
    console.log("Tier:", response.body.subscription?.tier);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("clerkId");
    expect(response.body.subscription?.tier).toBe("ENTERPRISE");
  });

  test("4. Course details page loads for new courses", async ({ page }) => {
    await signIn(page);

    // Test Clean Code course (one of the new ones)
    await page.goto(`${BASE}/course-details/clean-code`);
    await page.waitForLoadState("networkidle");

    const body = await page.locator("body").textContent();

    expect(body?.toLowerCase()).not.toContain("something went wrong");
    expect(body?.toLowerCase()).not.toContain("failed to load");

    const hasCourseContent =
      body?.includes("Clean Code") ||
      body?.includes("Chapter") ||
      body?.includes("Lesson");
    expect(hasCourseContent).toBeTruthy();

    console.log("Course page loaded OK");
  });

  test("5. Courses API returns all 4 courses", async ({ page }) => {
    await signIn(page);

    const response = await page.evaluate(async () => {
      const res = await fetch("/api/courses");
      return { status: res.status, body: await res.json() };
    });

    console.log(
      "Courses:",
      response.body.map?.((c) => c.title)
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(4);
  });

  test("6. Enterprise user sees unlimited quizzes on dashboard", async ({
    page,
  }) => {
    await signIn(page);

    // Wait for dashboard to fully render
    await page.waitForTimeout(2000);
    const body = await page.locator("body").textContent();

    // Enterprise user should NOT see "quiz limit reached"
    expect(body?.toLowerCase()).not.toContain("quiz limit reached");

    console.log(
      "Quiz display check. Has 'unlimited':",
      body?.toLowerCase().includes("unlimited")
    );
  });
});
