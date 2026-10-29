import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // `npm run test:e2e` builds the app and serves it here first.
    // 127.0.0.1 instead of localhost: on Windows, localhost may resolve to IPv6 only
    baseUrl: "http://127.0.0.1:4173",
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false,
    setupNodeEvents(on) {
      // Prints axe violations in the terminal (and in CI logs)
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});
