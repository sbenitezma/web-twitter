<script setup>
/**
 * Presentational list of users. It doesn't know about the store: it only
 * emits events, so it is easy to reuse and to test in isolation.
 */
defineProps({
  users: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ["following", "suggested"].includes(value),
  },
  emptyText: {
    type: String,
    default: "Nobody here yet.",
  },
});

const emit = defineEmits(["follow", "unfollow"]);
</script>

<template>
  <v-list v-if="users.length" class="chirp-scroll py-0" data-test="user-list">
    <v-list-item
      v-for="user in users"
      :key="user._idUser"
      data-test="user-list-item"
    >
      <template #prepend>
        <RouterLink
          :to="{ name: 'User', params: { username: user.username } }"
          tabindex="-1"
          aria-hidden="true"
        >
          <v-avatar size="40">
            <v-img :src="user.picture" alt="" />
          </v-avatar>
        </RouterLink>
      </template>

      <v-list-item-title class="text-capitalize">
        <RouterLink
          :to="{ name: 'User', params: { username: user.username } }"
          class="chirp-author text-decoration-none"
          data-test="user-link"
        >
          {{ user.name.first }} {{ user.name.last }}
        </RouterLink>
      </v-list-item-title>
      <v-list-item-subtitle class="chirp-username">
        @{{ user.username }}
      </v-list-item-subtitle>

      <template #append>
        <v-btn
          v-if="type === 'following'"
          color="primary"
          variant="flat"
          size="small"
          :aria-label="`Unfollow ${user.username}`"
          data-test="unfollow-button"
          @click="emit('unfollow', user._idUser)"
        >
          Unfollow
        </v-btn>
        <v-btn
          v-else
          color="primary"
          variant="outlined"
          size="small"
          :aria-label="`Follow ${user.username}`"
          data-test="follow-button"
          @click="emit('follow', user._idUser)"
        >
          Follow
        </v-btn>
      </template>
    </v-list-item>
  </v-list>

  <p v-else class="text-medium-emphasis text-body-2 py-4 text-center">
    {{ emptyText }}
  </p>
</template>
