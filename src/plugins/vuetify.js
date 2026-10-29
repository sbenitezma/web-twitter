import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

/**
 * Brand palette. In the Vue 2 version these colors lived in a SCSS map and
 * were exported to JavaScript with `:export`. Vuetify 3 reads them directly.
 */
export const brandColors = {
  primary: "#5046E5",
  secondary: "#3C4856",
  accent: "#A0ACBD",
  tertiary: "#5F6368",
  success: "#00B697",
  info: "#0091B3",
  warning: "#E19E21",
  error: "#D93A40",
  background: "#F1F3F6",
  surface: "#FFFFFF",
};

export default createVuetify({
  theme: {
    defaultTheme: "chirpLight",
    themes: {
      chirpLight: {
        dark: false,
        colors: brandColors,
      },
    },
  },
  defaults: {
    VCard: { rounded: "lg" },
    VBtn: { rounded: "pill" },
  },
});
