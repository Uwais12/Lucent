export default function manifest() {
  return {
    name: "Lucent - Master Advanced Software Concepts",
    short_name: "Lucent",
    description:
      "Interactive software engineering courses with bite-sized lessons, quizzes, and exercises.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
