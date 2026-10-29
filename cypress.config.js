import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // `npm run test:e2e` builds a preview server on this port first
    baseUrl: "http://localhost:4173",
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false,
  },
});
