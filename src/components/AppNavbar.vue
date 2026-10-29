<script setup>
import { storeToRefs } from "pinia";
import { useSocialStore } from "@/stores/social";

const store = useSocialStore();
const { currentUser, isLoading } = storeToRefs(store);
</script>

<template>
  <v-app-bar flat border="b" color="surface" data-test="navbar">
    <RouterLink
      to="/"
      class="d-flex align-center text-decoration-none ml-4"
      data-test="navbar-home"
      aria-label="Social Chirp, go to home"
    >
      <img src="/logo.svg" alt="" width="36" height="36" />
      <span class="text-h6 font-weight-bold text-primary ml-2">
        Social Chirp
      </span>
    </RouterLink>

    <v-spacer />

    <v-skeleton-loader v-if="isLoading" type="list-item-avatar" width="220" />

    <v-menu v-else-if="currentUser" location="bottom end">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          class="text-none mr-2"
          height="56"
          data-test="navbar-user"
        >
          <v-avatar size="40" class="mr-2">
            <v-img :src="currentUser.picture" :alt="currentUser.username" />
          </v-avatar>
          <span class="d-none d-sm-flex flex-column align-start">
            <span class="chirp-author text-capitalize">
              {{ currentUser.name.first }} {{ currentUser.name.last }}
            </span>
            <span class="chirp-username text-body-2">
              @{{ currentUser.username }}
            </span>
          </span>
          <v-icon end icon="mdi-chevron-down" />
        </v-btn>
      </template>

      <v-list density="compact">
        <v-list-item
          :to="{ name: 'User', params: { username: currentUser.username } }"
          prepend-icon="mdi-account"
          title="My profile"
        />
        <v-list-item
          prepend-icon="mdi-restore"
          title="Reset demo data"
          data-test="reset-demo"
          @click="store.resetDemo()"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
