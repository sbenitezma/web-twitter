import Vue from "vue";
import Vuetify from "vuetify";
import transitions from "vuetify/es5/components/transitions";
import "vuetify/dist/vuetify.min.css";
import customTheme from "@/plugins/theme";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  components: {
    transitions,
  },
  theme: {
    light: true,
    options: {
      customProperties: true,
      iconfont: "md",
      icons: true,
      treeShake: true,
      defaultAssets: {
        font: {
          family: "Source Sans Pro",
        },
      },
    },
    themes: customTheme,
  },
});
