<script setup>
import { storeToRefs } from "pinia";
import { useSocialStore } from "@/stores/social";
import UserList from "@/components/UserList.vue";

const store = useSocialStore();
const { followingUsers, suggestedUsers, isLoading } = storeToRefs(store);
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <v-card data-test="following-users">
      <v-card-title class="text-primary">
        Following
        <span class="text-medium-emphasis" data-test="following-count">
          · {{ followingUsers.length }}
        </span>
      </v-card-title>
      <v-skeleton-loader v-if="isLoading" type="list-item-avatar@4" />
      <UserList
        v-else
        :users="followingUsers"
        type="following"
        empty-text="You are not following anyone yet."
        @unfollow="store.unfollow"
      />
    </v-card>

    <v-card data-test="suggested-users">
      <v-card-title class="text-primary">Who to follow</v-card-title>
      <v-skeleton-loader v-if="isLoading" type="list-item-avatar@4" />
      <UserList
        v-else
        :users="suggestedUsers"
        type="suggested"
        empty-text="You already follow everybody!"
        @follow="store.follow"
      />
    </v-card>
  </div>
</template>
