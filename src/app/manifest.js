export default function manifest() {
  return {
    name: "Lucent — Learn anything, taught by anyone",
    short_name: "Lucent",
    description:
      "An interactive course platform — anyone can publish, anyone can take. Bite-sized lessons with auto-graded exercises. Free for everyone.",
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
