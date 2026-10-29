import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Imports only the Vuetify components we actually use (tree shaking)
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    include: ["tests/unit/**/*.spec.js"],
    server: {
      deps: {
        // Vuetify ships CSS imports inside its JS, so Vitest must process it
        inline: ["vuetify"],
      },
    },
    coverage: {
      include: ["src/**/*.{js,vue}"],
      exclude: ["src/main.js", "src/api/**"],
    },
  },
});
