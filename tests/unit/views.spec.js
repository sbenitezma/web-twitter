import { afterEach, describe, expect, it } from "vitest";
import HomeView from "@/views/HomeView.vue";
import UserView from "@/views/UserView.vue";
import { byTest, mountWithPlugins } from "../helpers";

describe("HomeView", () => {
  let wrapper;

  afterEach(() => wrapper?.unmount());

  it("shows the composer and the timeline with followed posts", async () => {
    ({ wrapper } = await mountWithPlugins(HomeView));

    expect(wrapper.find(byTest("post-composer")).exists()).toBe(true);
    const posts = wrapper.findAll(byTest("post-content"));
    expect(posts.map((post) => post.text())).toEqual([
      "Pauline's newest post",
      "Lesa's oldest post",
      "Pauline's old post",
    ]);
  });

  it("adds a new post at the top of the timeline", async () => {
    ({ wrapper } = await mountWithPlugins(HomeView));

    await wrapper
      .find(`${byTest("post-textarea")} textarea`)
      .setValue("Brand new chirp");
    await wrapper.find(byTest("post-submit")).trigger("click");

    expect(wrapper.find(byTest("post-content")).text()).toBe("Brand new chirp");
    expect(wrapper.find(byTest("post-date")).text()).toBe("just now");
  });
});

describe("UserView", () => {
  let wrapper;

  afterEach(() => wrapper?.unmount());

  it("shows only the posts of the selected user", async () => {
    ({ wrapper } = await mountWithPlugins(UserView, {
      props: { username: "pauline" },
    }));

    const authors = wrapper.findAll(byTest("post-author"));
    expect(authors).toHaveLength(2);
    authors.forEach((author) => expect(author.text()).toBe("Pauline Ingram"));
  });

  it("toggles follow from the profile", async () => {
    const result = await mountWithPlugins(UserView, {
      props: { username: "sexton" },
    });
    wrapper = result.wrapper;
    const toggle = () => wrapper.find(byTest("profile-follow-toggle"));

    expect(toggle().text()).toBe("Follow");
    await toggle().trigger("click");

    expect(result.store.isFollowing("u-sexton")).toBe(true);
    expect(toggle().text()).toBe("Unfollow");
  });

  it("hides the follow button on the current user's profile", async () => {
    ({ wrapper } = await mountWithPlugins(UserView, {
      props: { username: "lesa" },
    }));

    expect(wrapper.find(byTest("profile-follow-toggle")).exists()).toBe(false);
  });

  it("shows a friendly message for unknown users", async () => {
    ({ wrapper } = await mountWithPlugins(UserView, {
      props: { username: "ghost" },
    }));

    expect(wrapper.find(byTest("user-not-found")).text()).toContain(
      "@ghost doesn't exist",
    );
  });
});
