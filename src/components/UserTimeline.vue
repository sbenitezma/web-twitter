<script setup>
import PostItem from "@/components/PostItem.vue";
import UserProfileHeader from "@/components/UserProfileHeader.vue";
import { useNow } from "@/composables/useNow";

defineProps({
  user: {
    type: Object,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: "Posts",
  },
  emptyText: {
    type: String,
    default: "No posts yet.",
  },
  postsCount: {
    type: Number,
    default: undefined,
  },
});

// One shared clock for every post, refreshed every minute
const now = useNow();
</script>

<template>
  <v-card data-test="timeline">
    <UserProfileHeader
      :user="user"
      :posts-count="postsCount ?? user.posts.length"
    />

    <v-card-title tag="h2" class="text-primary pt-4">{{ title }}</v-card-title>
    <v-divider />

    <!-- No <v-divider> inside the list: a list may only contain list items -->
    <v-list v-if="posts.length" lines="three" class="py-0">
      <PostItem
        v-for="post in posts"
        :key="post._idPost"
        :post="post"
        :now="now"
        class="chirp-post"
      />
    </v-list>

    <v-card-text
      v-else
      class="text-center text-medium-emphasis py-8"
      data-test="timeline-empty"
    >
      {{ emptyText }}
    </v-card-text>
  </v-card>
</template>
