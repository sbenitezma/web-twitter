<template>
  <v-app>
    <v-main class="grey lighten-3">
      <Navbar />
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            md="4"
            lg="4"
            sm="12"
            xs="12"
            class="hidden-sm-and-down"
          >
            <SocialArea />
          </v-col>
          <v-col cols="12" md="8" lg="8" sm="12" xs="12">
            <router-view :key="$route.path"></router-view>
          </v-col>
          <v-col
            cols="12"
            md="4"
            lg="4"
            sm="12"
            xs="12"
            class="hidden-md-and-up"
          >
            <SocialArea />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

import Navbar from "@/components/Navbar";
import SocialArea from "@/components/SocialArea";

export default {
  name: "App",
  components: {
    SocialArea,
    Navbar,
  },
  mounted() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchUser();
  },
  data: () => ({
    tab: null,
  }),
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    async fetchUser() {
      await this.$store.dispatch("LOAD_USER");
    },
  },
};
</script>
