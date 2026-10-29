<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
  postsCount: {
    type: Number,
    default: 0,
  },
});

const COVER_IMAGE = "https://picsum.photos/id/106/1000/300";
</script>

<template>
  <header data-test="profile-header">
    <v-img :src="COVER_IMAGE" height="150" cover alt="" />
    <div class="d-flex align-end px-4 profile-row">
      <v-avatar size="112" class="profile-avatar">
        <v-img :src="user.picture" alt="" />
      </v-avatar>
      <div class="ml-4 pb-1">
        <h1 class="text-h6 font-weight-black text-secondary text-capitalize">
          {{ user.name.first }} {{ user.name.last }}
        </h1>
        <p class="chirp-username">
          @{{ user.username }} · {{ postsCount }}
          {{ postsCount === 1 ? "post" : "posts" }}
        </p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.profile-row {
  margin-top: -48px;
}

.profile-avatar {
  border: 4px solid rgb(var(--v-theme-surface));
  background: rgb(var(--v-theme-surface));
}
</style>
