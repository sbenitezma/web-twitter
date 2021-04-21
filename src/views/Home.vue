<template>
  <div>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <Timeline :posts="timelinePosts" :user="currentUser" height="300" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <Post />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Timeline from "@/components/Timeline.vue";
import Post from "@/components/Post.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Timeline,
    Post,
  },
  computed: {
    ...mapState(["timelinePosts", "currentUser"]),
  },
};
</script>
