<script setup>
import { storeToRefs } from "pinia";
import { useSocialStore } from "@/stores/social";
import PostComposer from "@/components/PostComposer.vue";
import UserTimeline from "@/components/UserTimeline.vue";

const store = useSocialStore();
const { currentUser, currentUserPosts, timelinePosts, isLoading } =
  storeToRefs(store);
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <v-skeleton-loader v-if="isLoading" type="card, list-item-avatar-three-line@3" />

    <template v-else-if="currentUser">
      <!-- The composer goes first: the main action shouldn't be below the fold -->
      <PostComposer />
      <UserTimeline
        :user="currentUser"
        :posts="timelinePosts"
        :posts-count="currentUserPosts.length"
        title="Your timeline"
        empty-text="Follow someone or write your first post!"
      />
    </template>
  </div>
</template>
