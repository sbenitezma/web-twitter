<template>
  <v-card rounded v-if="loading.currentUser" min-height="300">
    <ProgressCircular :value="loading.currentUser" size="20" />
  </v-card>
  <v-card id="createPost" rounded v-else>
    <v-card-title class="title">New Post</v-card-title>
    <v-card-text class="mb-0 pb-0">
      <v-row no-gutters>
        <v-col cols="2" md="2" lg="1">
          <v-avatar>
            <img
              :alt="currentUser.username"
              :id="`postUserImage-${currentUser._idUser}`"
              :src="currentUser.picture"
            />
          </v-avatar>
        </v-col>
        <v-col cols="10" md="10" lg="10">
          <v-textarea
            id="postTextarea"
            outlined
            rows="3"
            label="¿What are you thinking about?"
            v-model="tweet"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="ma-0 pa-0">
      <v-list-item class="mr-12 pr-12 mb-2">
        <v-row justify="end" no-gutters>
          <v-btn id="postNewTweet" color="primary" rounded @click="postTweet"
            >Tweet</v-btn
          >
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import ProgressCircular from "@/components/ProgressCircular";

export default {
  name: "Post",
  components: { ProgressCircular },
  computed: {
    ...mapState(["currentUser", "loading"]),
  },
  data: () => ({
    tweet: "",
  }),
  methods: {
    /**
     * Post new tweet
     */
    postTweet() {
      this.$store.dispatch("postTweet", this.tweet);
    },
  },
};
</script>
