import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from "@/utils/storage";

export const MAX_POST_LENGTH = 280;

export const STORAGE_KEYS = {
  following: "social-chirp:following",
  ownPosts: "social-chirp:own-posts",
};

/**
 * Loads the mock API. A dynamic import keeps the JSON out of the main bundle
 * and makes loading genuinely asynchronous, like a real HTTP request.
 * Tests can replace it through `setDataSource`.
 */
let dataSource = () =>
  import("@/api/db/user.json").then((module) => module.default);

export function setDataSource(loader) {
  dataSource = loader;
}

const fullName = (user) => `${user.name.first} ${user.name.last}`;

/** Newest first. Copies the array so the original order is never mutated. */
const sortByDateDesc = (posts) =>
  [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

const createPostId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

/**
 * Social store (Pinia, "setup store" syntax).
 *
 * Vue 2 → Vue 3 notes:
 * - Vuex state + mutations + actions + getters become refs, functions and
 *   computed values in a single file.
 * - The Vue 2 version kept `followingUsers` and `nonFollowingUsers` as two
 *   copies of the users. Now we only store the followed ids and derive both
 *   lists, so they can never get out of sync.
 */
export const useSocialStore = defineStore("social", () => {
  // --- State ---------------------------------------------------------------
  const currentUser = ref(null);
  const users = ref([]);
  const followingIds = ref([]);
  const ownPosts = ref([]);
  const isLoading = ref(true);
  const loadError = ref(null);

  // --- Getters -------------------------------------------------------------
  const followingUsers = computed(() =>
    users.value.filter((user) => followingIds.value.includes(user._idUser)),
  );

  const suggestedUsers = computed(() =>
    users.value.filter((user) => !followingIds.value.includes(user._idUser)),
  );

  const withAuthorName = (user) => (post) => ({
    ...post,
    authorName: fullName(user),
  });

  const currentUserPosts = computed(() => {
    if (!currentUser.value) return [];
    return sortByDateDesc(
      [...currentUser.value.posts, ...ownPosts.value].map(
        withAuthorName(currentUser.value),
      ),
    );
  });

  const timelinePosts = computed(() => {
    const followedPosts = followingUsers.value.flatMap((user) =>
      user.posts.map(withAuthorName(user)),
    );
    return sortByDateDesc([...currentUserPosts.value, ...followedPosts]);
  });

  function getUserByUsername(username) {
    if (currentUser.value?.username === username) return currentUser.value;
    return users.value.find((user) => user.username === username) ?? null;
  }

  function getPostsByUsername(username) {
    if (currentUser.value?.username === username) return currentUserPosts.value;
    const user = users.value.find((item) => item.username === username);
    return user ? sortByDateDesc(user.posts.map(withAuthorName(user))) : [];
  }

  function isFollowing(userId) {
    return followingIds.value.includes(userId);
  }

  // --- Actions -------------------------------------------------------------
  async function loadData() {
    isLoading.value = true;
    loadError.value = null;
    try {
      const data = await dataSource();
      currentUser.value = data.currentUser;
      users.value = data.usersList;

      const knownIds = new Set(data.usersList.map((user) => user._idUser));
      const seedFollowing = data.currentUser.following.map(
        (item) => item._idUser,
      );
      // Ignore ids that don't belong to a known user (e.g. the user itself)
      const savedFollowing = loadFromStorage(STORAGE_KEYS.following, null);
      const savedPosts = loadFromStorage(STORAGE_KEYS.ownPosts, null);

      followingIds.value = (
        Array.isArray(savedFollowing) ? savedFollowing : seedFollowing
      ).filter((id) => knownIds.has(id));
      ownPosts.value = Array.isArray(savedPosts) ? savedPosts : [];
    } catch (error) {
      loadError.value = error;
    } finally {
      isLoading.value = false;
    }
  }

  function follow(userId) {
    const exists = users.value.some((user) => user._idUser === userId);
    if (exists && !isFollowing(userId)) {
      followingIds.value = [...followingIds.value, userId];
      saveToStorage(STORAGE_KEYS.following, followingIds.value);
    }
  }

  function unfollow(userId) {
    followingIds.value = followingIds.value.filter((id) => id !== userId);
    saveToStorage(STORAGE_KEYS.following, followingIds.value);
  }

  /**
   * Publishes a post for the current user.
   * @param {string} content
   * @returns {object|null} The new post, or null if the content is invalid.
   */
  function publishPost(content) {
    const text = (content ?? "").trim();
    if (!currentUser.value || !text || text.length > MAX_POST_LENGTH) {
      return null;
    }
    const post = {
      _idPost: createPostId(),
      author: currentUser.value.username,
      picture: currentUser.value.picture,
      content: text,
      date: new Date().toISOString(),
    };
    ownPosts.value = [...ownPosts.value, post];
    saveToStorage(STORAGE_KEYS.ownPosts, ownPosts.value);
    return post;
  }

  /** Forgets local changes and restores the original demo data. */
  async function resetDemo() {
    Object.values(STORAGE_KEYS).forEach(removeFromStorage);
    await loadData();
  }

  return {
    currentUser,
    users,
    followingIds,
    ownPosts,
    isLoading,
    loadError,
    followingUsers,
    suggestedUsers,
    currentUserPosts,
    timelinePosts,
    getUserByUsername,
    getPostsByUsername,
    isFollowing,
    loadData,
    follow,
    unfollow,
    publishPost,
    resetDemo,
  };
});
