export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/sign-in/", "/sign-up/", "/profile/", "/exercise-test/"],
      },
    ],
    sitemap: "https://lucentapp.io/sitemap.xml",
  };
}
