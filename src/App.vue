<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSocialStore } from "@/stores/social";
import AppNavbar from "@/components/AppNavbar.vue";
import SocialArea from "@/components/SocialArea.vue";

const store = useSocialStore();
const { loadError, announcement } = storeToRefs(store);

onMounted(() => store.loadData());
</script>

<template>
  <v-app>
    <AppNavbar />

    <!-- Invisible, but screen readers read every change out loud -->
    <div class="d-sr-only" role="status" aria-live="polite">
      {{ announcement }}
    </div>

    <v-main>
      <v-container class="py-6" max-width="1200">
        <v-alert
          v-if="loadError"
          type="error"
          variant="tonal"
          class="mb-4"
          title="We couldn't load the timeline"
          text="Please refresh the page to try again."
        />

        <v-row>
          <!--
            Vue 2 rendered <SocialArea> twice and hid one copy per breakpoint.
            Now there is a single instance and the order changes on mobile.
          -->
          <v-col cols="12" md="4" class="order-2 order-md-1">
            <SocialArea />
          </v-col>
          <v-col cols="12" md="8" class="order-1 order-md-2">
            <RouterView v-slot="{ Component, route }">
              <component :is="Component" :key="route.path" />
            </RouterView>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
