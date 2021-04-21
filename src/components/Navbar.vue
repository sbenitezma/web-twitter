<template>
  <div>
    <ProgressCircular v-if="loading.currentUser" :value="loading.currentUser" />
    <v-app-bar app v-else>
      <v-toolbar-items>
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-avatar size="64">
            <img
              :alt="currentUser.name.first"
              :id="`navbarUserImage-${currentUser._idUser}`"
              :src="currentUser.picture"
            />
          </v-avatar>
          <v-toolbar-title id="userData" class="ml-2 mr-6">
            <span class="subheading-1">
              {{ currentUser.name.first }} {{ currentUser.name.last }}
            </span>
            <v-divider></v-divider>
            <span class="subheading-2">@{{ currentUser.username }}</span>
          </v-toolbar-title>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="!loading.currentUser">
        <router-link to="/" custom v-slot="{ navigate }">
          <span @click="navigate" @keypress.enter="navigate" role="link">
            <v-img
              class="custom-icon mr-5"
              style="float: left"
              alt="web-twitter"
              aspect-ratio="1"
              contain
              id="webTwitter"
              height="40"
              width="40"
              src="@/assets/logo.png"
              transition="scale-transition"
          /></span>
        </router-link>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>
<script>
import { mapState } from "vuex";

import ProgressCircular from "@/components/ProgressCircular";

export default {
  name: "Navbar",
  components: {
    ProgressCircular,
  },
  computed: {
    ...mapState(["loading", "currentUser"]),
  },
  data: () => ({
    menuItems: [{ title: "Home", path: "/" }],
  }),
};
</script>
