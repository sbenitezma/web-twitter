<script setup>
import { computed } from "vue";
import { formatRelativeTime } from "@/utils/relativeTime";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  now: {
    type: Date,
    default: () => new Date(),
  },
});

const relativeDate = computed(() => formatRelativeTime(props.post.date, props.now));
const exactDate = computed(() => new Date(props.post.date).toLocaleString());
</script>

<template>
  <!--
    Security fix: the Vue 2 version rendered the author with v-html, which
    allows HTML injection. Text interpolation escapes it automatically.
  -->
  <v-list-item tag="article" class="py-3" data-test="post-item">
    <template #prepend>
      <RouterLink
        :to="{ name: 'User', params: { username: post.author } }"
        :aria-label="`Open ${post.authorName}'s profile`"
      >
        <v-avatar size="44">
          <v-img :src="post.picture" :alt="post.author" />
        </v-avatar>
      </RouterLink>
    </template>

    <div class="d-flex flex-wrap align-baseline ga-1">
      <span class="chirp-author" data-test="post-author">
        {{ post.authorName }}
      </span>
      <span class="chirp-username">@{{ post.author }}</span>
      <span class="chirp-username" aria-hidden="true">·</span>
      <time
        class="chirp-username text-body-2"
        :datetime="post.date"
        :title="exactDate"
        data-test="post-date"
      >
        {{ relativeDate }}
      </time>
    </div>
    <p class="chirp-content mt-1" data-test="post-content">{{ post.content }}</p>
  </v-list-item>
</template>
