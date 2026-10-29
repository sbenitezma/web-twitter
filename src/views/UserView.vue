<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useSocialStore } from "@/stores/social";
import UserTimeline from "@/components/UserTimeline.vue";

// With `props: true` in the router, the URL param arrives as a prop
// instead of being read from this.$route.params
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const store = useSocialStore();
const { isLoading, currentUser } = storeToRefs(store);

const user = computed(() => store.getUserByUsername(props.username));
const posts = computed(() => store.getPostsByUsername(props.username));
const isCurrentUser = computed(
  () => currentUser.value?.username === props.username,
);
const isFollowed = computed(
  () => user.value && store.isFollowing(user.value._idUser),
);

function toggleFollow() {
  if (isFollowed.value) store.unfollow(user.value._idUser);
  else store.follow(user.value._idUser);
}
</script>

<template>
  <v-skeleton-loader v-if="isLoading" type="card, list-item-avatar-three-line@3" />

  <div v-else-if="user" class="d-flex flex-column ga-4">
    <div class="d-flex justify-space-between align-center">
      <v-btn variant="text" prepend-icon="mdi-arrow-left" :to="{ name: 'Home' }">
        Back to timeline
      </v-btn>
      <v-btn
        v-if="!isCurrentUser"
        color="primary"
        :variant="isFollowed ? 'flat' : 'outlined'"
        data-test="profile-follow-toggle"
        @click="toggleFollow"
      >
        {{ isFollowed ? "Unfollow" : "Follow" }}
      </v-btn>
    </div>

    <UserTimeline :user="user" :posts="posts" :posts-count="posts.length" />
  </div>

  <!-- Improvement: Vue 2 crashed with an unknown username -->
  <v-card v-else class="pa-8 text-center" data-test="user-not-found">
    <v-icon icon="mdi-account-question" size="48" color="tertiary" />
    <h1 class="text-h6 mt-2">@{{ username }} doesn't exist</h1>
    <v-btn class="mt-4" color="primary" :to="{ name: 'Home' }">
      Back to timeline
    </v-btn>
  </v-card>
</template>
