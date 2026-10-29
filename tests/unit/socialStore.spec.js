import { describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import {
  MAX_POST_LENGTH,
  STORAGE_KEYS,
  setDataSource,
  useSocialStore,
} from "@/stores/social";
import { createLoadedStore } from "../helpers";
import { createSocialData } from "../fixtures/socialData";

const ids = (items) => items.map((item) => item._idPost ?? item._idUser);

describe("social store", () => {
  describe("loadData", () => {
    it("loads the current user and the users list", async () => {
      const { store } = await createLoadedStore();
      expect(store.isLoading).toBe(false);
      expect(store.currentUser.username).toBe("lesa");
      expect(store.users).toHaveLength(2);
    });

    it("ignores following ids that don't belong to a known user", async () => {
      const { store } = await createLoadedStore();
      // The seed contains the user's own id, which must be filtered out
      expect(store.followingIds).toEqual(["u-pauline"]);
    });

    it("restores following and own posts saved in localStorage", async () => {
      window.localStorage.setItem(
        STORAGE_KEYS.following,
        JSON.stringify(["u-sexton"]),
      );
      window.localStorage.setItem(
        STORAGE_KEYS.ownPosts,
        JSON.stringify([
          {
            _idPost: "saved",
            author: "lesa",
            content: "Saved post",
            date: "2022-01-01T00:00:00.000Z",
          },
        ]),
      );
      const { store } = await createLoadedStore();
      expect(store.followingIds).toEqual(["u-sexton"]);
      expect(ids(store.currentUserPosts)).toContain("saved");
    });

    it("exposes the error when loading fails", async () => {
      setActivePinia(createPinia());
      setDataSource(() => Promise.reject(new Error("Network error")));
      const store = useSocialStore();
      await store.loadData();
      expect(store.loadError).toBeInstanceOf(Error);
      expect(store.isLoading).toBe(false);
    });
  });

  describe("getters", () => {
    it("splits users into following and suggested", async () => {
      const { store } = await createLoadedStore();
      expect(ids(store.followingUsers)).toEqual(["u-pauline"]);
      expect(ids(store.suggestedUsers)).toEqual(["u-sexton"]);
    });

    it("builds the timeline with own and followed posts, newest first", async () => {
      const { store } = await createLoadedStore();
      expect(ids(store.timelinePosts)).toEqual([
        "p-pauline-2",
        "p-lesa-1",
        "p-pauline-1",
      ]);
      expect(store.timelinePosts[0].authorName).toBe("Pauline Ingram");
    });

    it("doesn't mutate the original posts order when sorting", async () => {
      const data = createSocialData();
      const { store } = await createLoadedStore(data);
      store.getPostsByUsername("pauline");
      expect(ids(store.users[0].posts)).toEqual(["p-pauline-1", "p-pauline-2"]);
    });

    it("finds users (including the current one) by username", async () => {
      const { store } = await createLoadedStore();
      expect(store.getUserByUsername("sexton")._idUser).toBe("u-sexton");
      expect(store.getUserByUsername("lesa")._idUser).toBe("u-lesa");
      expect(store.getUserByUsername("nobody")).toBeNull();
    });

    it("returns an empty list of posts for unknown users", async () => {
      const { store } = await createLoadedStore();
      expect(store.getPostsByUsername("nobody")).toEqual([]);
    });
  });

  describe("follow / unfollow", () => {
    it("follows a user and adds their posts to the timeline", async () => {
      const { store } = await createLoadedStore();
      store.follow("u-sexton");
      expect(store.isFollowing("u-sexton")).toBe(true);
      expect(ids(store.timelinePosts)).toContain("p-sexton-1");
      expect(store.suggestedUsers).toHaveLength(0);
    });

    it("doesn't duplicate an already followed user", async () => {
      const { store } = await createLoadedStore();
      store.follow("u-pauline");
      expect(store.followingIds).toEqual(["u-pauline"]);
    });

    it("ignores unknown user ids", async () => {
      const { store } = await createLoadedStore();
      store.follow("u-unknown");
      expect(store.followingIds).toEqual(["u-pauline"]);
    });

    it("unfollows a user and removes their posts from the timeline", async () => {
      const { store } = await createLoadedStore();
      store.unfollow("u-pauline");
      expect(store.followingUsers).toHaveLength(0);
      expect(ids(store.timelinePosts)).toEqual(["p-lesa-1"]);
    });

    it("persists the following list", async () => {
      const { store } = await createLoadedStore();
      store.follow("u-sexton");
      expect(
        JSON.parse(window.localStorage.getItem(STORAGE_KEYS.following)),
      ).toEqual(["u-pauline", "u-sexton"]);
    });
  });

  describe("publishPost", () => {
    it("publishes a trimmed post at the top of the timeline", async () => {
      const { store } = await createLoadedStore();
      const post = store.publishPost("  Hello Social Chirp!  ");
      expect(post.content).toBe("Hello Social Chirp!");
      expect(store.timelinePosts[0]._idPost).toBe(post._idPost);
      expect(store.timelinePosts[0].authorName).toBe("Lesa Compton");
    });

    it("rejects empty or blank posts", async () => {
      const { store } = await createLoadedStore();
      expect(store.publishPost("")).toBeNull();
      expect(store.publishPost("    ")).toBeNull();
      expect(store.ownPosts).toHaveLength(0);
    });

    it(`rejects posts longer than ${MAX_POST_LENGTH} characters`, async () => {
      const { store } = await createLoadedStore();
      expect(store.publishPost("a".repeat(MAX_POST_LENGTH + 1))).toBeNull();
      expect(store.publishPost("a".repeat(MAX_POST_LENGTH))).not.toBeNull();
    });

    it("persists own posts", async () => {
      const { store } = await createLoadedStore();
      store.publishPost("Saved for later");
      const saved = JSON.parse(
        window.localStorage.getItem(STORAGE_KEYS.ownPosts),
      );
      expect(saved[0].content).toBe("Saved for later");
    });
  });

  describe("resetDemo", () => {
    it("restores the original data and clears local changes", async () => {
      const { store } = await createLoadedStore();
      store.follow("u-sexton");
      store.publishPost("Temporary post");

      await store.resetDemo();

      expect(store.followingIds).toEqual(["u-pauline"]);
      expect(store.ownPosts).toHaveLength(0);
      expect(window.localStorage.getItem(STORAGE_KEYS.following)).toBeNull();
    });
  });
});
