// @ts-check
const { test, expect } = require("@playwright/test");

const BASE = "https://lucentapp.io";
const EMAIL = "umoney@hotmail.co.uk";
const PASSWORD = "2Easyforme!";

// Helper: sign in via Clerk
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
  await page.waitForURL((url) => !url.pathname.includes("sign-in"), {
    timeout: 20000,
  });
  await page.waitForLoadState("networkidle");
}

// ─────────────────────────────────────────────────────────────
// 1. LANDING PAGE & SEO
// ─────────────────────────────────────────────────────────────
test.describe("Landing Page & SEO", () => {
  test("Landing page loads with title", async ({ page }) => {
    await page.goto(`${BASE}/landing-page`);
    await expect(page).toHaveTitle(/Lucent/);
  });

  test("Robots.txt is accessible", async ({ page }) => {
    const res = await page.goto(`${BASE}/robots.txt`);
    expect(res?.status()).toBe(200);
    const text = await page.locator("body").textContent();
    expect(text).toContain("Sitemap");
    expect(text).toContain("Disallow: /api/");
  });

  test("Sitemap.xml is accessible", async ({ page }) => {
    const res = await page.goto(`${BASE}/sitemap.xml`);
    expect(res?.status()).toBe(200);
  });
});

// ─────────────────────────────────────────────────────────────
// 2. AUTH & DASHBOARD
// ─────────────────────────────────────────────────────────────
test.describe("Auth & Dashboard", () => {
  test("Sign in succeeds and dashboard loads", async ({ page }) => {
    await signIn(page);
    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).not.toContain("something went wrong");
    expect(body?.toLowerCase()).not.toContain("failed to load content");
    console.log("Dashboard loaded OK");
  });

  test("Profile API returns correct Enterprise tier", async ({ page }) => {
    await signIn(page);
    const profile = await page.evaluate(async () => {
      const res = await fetch("/api/profile");
      return { status: res.status, body: await res.json() };
    });
    expect(profile.status).toBe(200);
    expect(profile.body).toHaveProperty("clerkId");
    expect(profile.body.subscription?.tier).toBe("ENTERPRISE");
    console.log("Tier:", profile.body.subscription?.tier);
  });
});

// ─────────────────────────────────────────────────────────────
// 3. ENTERPRISE TIER — QUIZ ACCESS
// ─────────────────────────────────────────────────────────────
test.describe("Enterprise Tier - Quiz Access", () => {
  test("Dashboard does NOT show quiz limit reached", async ({ page }) => {
    await signIn(page);
    await page.waitForTimeout(2000);
    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).not.toContain("quiz limit reached");
    console.log("No quiz limit shown for Enterprise");
  });

  test("Can click quiz from dashboard without being blocked", async ({
    page,
  }) => {
    await signIn(page);
    await page.waitForTimeout(2000);

    // Look for quiz cards on the dashboard
    const quizLinks = page.locator('a[href*="/quiz/"]');
    const count = await quizLinks.count();
    console.log("Quiz links found on dashboard:", count);

    if (count > 0) {
      // Click the first quiz link
      const href = await quizLinks.first().getAttribute("href");
      console.log("Navigating to quiz:", href);
      await quizLinks.first().click();
      await page.waitForLoadState("networkidle");

      const body = await page.locator("body").textContent();
      // Should NOT show limit reached
      expect(body?.toLowerCase()).not.toContain("quiz limit reached");
      expect(body?.toLowerCase()).not.toContain("daily limit");
      console.log("Quiz page loaded without limit block");
    }
  });
});

// ─────────────────────────────────────────────────────────────
// 4. COURSES
// ─────────────────────────────────────────────────────────────
test.describe("Courses", () => {
  test("Courses API returns all 4 courses", async ({ page }) => {
    await signIn(page);
    const response = await page.evaluate(async () => {
      const res = await fetch("/api/courses");
      return { status: res.status, body: await res.json() };
    });
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(4);
    console.log(
      "Courses:",
      response.body.map((c) => c.title)
    );
  });

  test("Course details page loads for enrolled course", async ({ page }) => {
    await signIn(page);
    await page.goto(`${BASE}/course-details/design-patterns`);
    await page.waitForLoadState("networkidle");
    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).not.toContain("something went wrong");
    expect(body).toContain("Design Patterns");
    console.log("Design Patterns course page loaded OK");
  });

  test("Course page shows Enroll Now for unenrolled course", async ({
    page,
  }) => {
    await signIn(page);

    // Check which courses the user is enrolled in
    const profile = await page.evaluate(async () => {
      const res = await fetch("/api/profile");
      return res.json();
    });
    const enrolledCourseIds = profile.progress?.courses?.map(
      (c) => c.courseId
    ) || [];
    console.log("Enrolled course count:", enrolledCourseIds.length);

    // Get all courses
    const courses = await page.evaluate(async () => {
      const res = await fetch("/api/courses");
      return res.json();
    });

    // Find a course the user is NOT enrolled in
    const unenrolledCourse = courses.find(
      (c) => !enrolledCourseIds.includes(c._id)
    );

    if (unenrolledCourse) {
      console.log("Testing unenrolled course:", unenrolledCourse.title);
      await page.goto(
        `${BASE}/course-details/${unenrolledCourse.slug}`
      );
      await page.waitForLoadState("networkidle");

      const body = await page.locator("body").textContent();
      // Should show "Enroll Now", not "Continue Learning"
      expect(body).toContain("Enroll Now");
      expect(body).not.toContain("Continue Learning");
      console.log("Course page correctly shows Enroll Now");
    } else {
      console.log("User is enrolled in all courses - skipping test");
    }
  });

  test("Course page shows Continue Learning for enrolled course", async ({
    page,
  }) => {
    await signIn(page);

    // Get enrolled course slug
    const profile = await page.evaluate(async () => {
      const res = await fetch("/api/profile");
      return res.json();
    });
    const courses = await page.evaluate(async () => {
      const res = await fetch("/api/courses");
      return res.json();
    });

    const enrolledCourseIds =
      profile.progress?.courses?.map((c) => c.courseId) || [];
    const enrolledCourse = courses.find((c) =>
      enrolledCourseIds.includes(c._id)
    );

    if (enrolledCourse) {
      console.log("Testing enrolled course:", enrolledCourse.title);
      await page.goto(
        `${BASE}/course-details/${enrolledCourse.slug}`
      );
      await page.waitForLoadState("networkidle");

      const body = await page.locator("body").textContent();
      // Should show "Continue Learning", not "Enroll Now"
      expect(body).toContain("Continue Learning");
      console.log("Course page correctly shows Continue Learning");
    } else {
      console.log("No enrolled courses - skipping test");
    }
  });
});

// ─────────────────────────────────────────────────────────────
// 5. CONTINUE LEARNING NAVIGATION
// ─────────────────────────────────────────────────────────────
test.describe("Continue Learning Navigation", () => {
  test("Continue Learning link points to correct lesson URL", async ({ page }) => {
    await signIn(page);

    const profile = await page.evaluate(async () => {
      const res = await fetch("/api/profile");
      return res.json();
    });
    const courses = await page.evaluate(async () => {
      const res = await fetch("/api/courses");
      return res.json();
    });

    const enrolledCourseIds =
      profile.progress?.courses?.map((c) => c.courseId) || [];
    const enrolledCourse = courses.find((c) =>
      enrolledCourseIds.includes(c._id)
    );

    if (enrolledCourse) {
      await page.goto(`${BASE}/course-details/${enrolledCourse.slug}`);
      await page.waitForLoadState("networkidle");

      const continueBtn = page.locator('a:has-text("Continue Learning")');
      const btnCount = await continueBtn.count();

      if (btnCount > 0) {
        const href = await continueBtn.first().getAttribute("href");
        console.log("Continue Learning href:", href);
        // Should point to /lesson/xxx (not /courses/...)
        expect(href).toMatch(/^\/lesson\//);
        console.log("Continue Learning URL is correct");
      } else {
        console.log("No Continue Learning button (course may be complete)");
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────
// 6. LESSON ACCESS FOR ENTERPRISE
// ─────────────────────────────────────────────────────────────
test.describe("Lesson Access - Enterprise", () => {
  test("Lesson links exist and point to /lesson/ URLs", async ({ page }) => {
    await signIn(page);

    await page.goto(`${BASE}/course-details/design-patterns`);
    await page.waitForLoadState("networkidle");

    // Find lesson links in the curriculum
    const lessonLinks = page.locator('a[href*="/lesson/"]');
    const count = await lessonLinks.count();
    console.log("Lesson links found:", count);
    expect(count).toBeGreaterThan(0);

    const href = await lessonLinks.first().getAttribute("href");
    expect(href).toMatch(/^\/lesson\//);
    console.log("Lesson link URL:", href);
  });

  test("Lesson API returns data for authenticated user", async ({ page }) => {
    await signIn(page);

    // Get a lesson slug from course data
    const courseData = await page.evaluate(async () => {
      const res = await fetch("/api/course-details/design-patterns");
      return res.json();
    });

    const firstLesson = courseData.chapters?.[0]?.lessons?.[0];
    if (firstLesson) {
      const lessonRes = await page.evaluate(async (slug) => {
        const res = await fetch(`/api/lessons/${slug}`);
        return { status: res.status, body: await res.json() };
      }, firstLesson.slug);

      console.log("Lesson API status:", lessonRes.status);
      console.log("Lesson title:", lessonRes.body.title || lessonRes.body.error);
      expect(lessonRes.status).toBe(200);
    }
  });
});
