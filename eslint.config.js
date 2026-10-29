import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginCypress from "eslint-plugin-cypress";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "coverage/**", "src/api/db/jsonGenerator.js"],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: { ...globals.vitest },
    },
  },
  {
    files: ["cypress/**/*.js"],
    ...pluginCypress.configs.recommended,
  },
  // Prettier owns formatting; ESLint only checks code quality
  skipFormatting,
];
