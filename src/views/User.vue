<template>
  <v-row>
    <v-col cols="12" lg="12" md="9" sm="12">
      <Timeline
        :posts="getPostsByUsername"
        :user="getUserByUsername"
        height="500"
      />
    </v-col>
  </v-row>
</template>

<script>
import Timeline from "@/components/Timeline.vue";

export default {
  name: "User",
  components: {
    Timeline,
  },
  computed: {
    getPostsByUsername() {
      return this.$store.getters.getPostsByUser(this.$route.params.username);
    },
    getUserByUsername() {
      return this.$store.getters.getUserByUsername(this.$route.params.username);
    },
  },
};
</script>
