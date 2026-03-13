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
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
