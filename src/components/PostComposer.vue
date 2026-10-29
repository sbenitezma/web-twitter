<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { MAX_POST_LENGTH, useSocialStore } from "@/stores/social";

const emit = defineEmits(["published"]);

const store = useSocialStore();
const { currentUser } = storeToRefs(store);

const content = ref("");

const trimmedLength = computed(() => content.value.trim().length);
const isTooLong = computed(() => content.value.length > MAX_POST_LENGTH);
const canPublish = computed(() => trimmedLength.value > 0 && !isTooLong.value);

function publish() {
  if (!canPublish.value) return;
  const post = store.publishPost(content.value);
  if (post) {
    // Improvement over Vue 2: the textarea is cleared after publishing
    content.value = "";
    emit("published", post);
  }
}
</script>

<template>
  <v-card data-test="post-composer">
    <v-card-title tag="h2" class="text-primary">New post</v-card-title>

    <v-card-text class="d-flex ga-3 pb-0">
      <v-avatar v-if="currentUser" size="48">
        <v-img :src="currentUser.picture" alt="" />
      </v-avatar>

      <!-- Ctrl/Cmd + Enter publishes, like most social apps -->
      <v-textarea
        v-model="content"
        label="What are you thinking about?"
        variant="outlined"
        rows="3"
        auto-grow
        :counter="MAX_POST_LENGTH"
        :error="isTooLong"
        :error-messages="isTooLong ? 'Your post is too long' : []"
        data-test="post-textarea"
        @keydown.enter.ctrl.prevent="publish"
        @keydown.enter.meta.prevent="publish"
      />
    </v-card-text>

    <v-card-actions class="justify-end px-4 pb-4">
      <v-btn
        color="primary"
        variant="flat"
        prepend-icon="mdi-send"
        :disabled="!canPublish"
        data-test="post-submit"
        @click="publish"
      >
        Chirp
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
