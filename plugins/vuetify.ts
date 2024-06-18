// plugins/vuetify.js
import { type ThemeDefinition, createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#6C63FF",
    secondary: "#34356E",
    primaryLight: "#14203b",
    white: "#fff",
    "option-one": "#F0FCF4",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: "lightTheme",
      themes: {
        lightTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
