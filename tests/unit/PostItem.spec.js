import { afterEach, describe, expect, it } from "vitest";
import PostItem from "@/components/PostItem.vue";
import { byTest, mountWithPlugins } from "../helpers";

const basePost = {
  _idPost: "p-1",
  author: "pauline",
  authorName: "Pauline Ingram",
  picture: "https://i.pravatar.cc/150?u=pauline",
  content: "Hello world",
  date: "2026-10-29T11:00:00.000Z",
};

describe("PostItem", () => {
  let wrapper;

  afterEach(() => wrapper?.unmount());

  it("renders the author, content and relative date", async () => {
    ({ wrapper } = await mountWithPlugins(PostItem, {
      props: { post: basePost, now: new Date("2026-10-29T12:00:00.000Z") },
    }));

    expect(wrapper.find(byTest("post-author")).text()).toBe("Pauline Ingram");
    expect(wrapper.find(byTest("post-content")).text()).toBe("Hello world");
    expect(wrapper.find(byTest("post-date")).text()).toBe("1 hour ago");
    expect(wrapper.find("time").attributes("datetime")).toBe(basePost.date);
  });

  it("escapes HTML instead of rendering it (no XSS)", async () => {
    const maliciousPost = {
      ...basePost,
      authorName: '<img src=x onerror="alert(1)">',
      content: "<script>alert('xss')</script>",
    };
    ({ wrapper } = await mountWithPlugins(PostItem, {
      props: { post: maliciousPost },
    }));

    expect(wrapper.find("img[src='x']").exists()).toBe(false);
    expect(wrapper.find("script").exists()).toBe(false);
    expect(wrapper.find(byTest("post-content")).text()).toBe(
      "<script>alert('xss')</script>",
    );
  });
});
