import { afterEach, describe, expect, it } from "vitest";
import PostComposer from "@/components/PostComposer.vue";
import { MAX_POST_LENGTH } from "@/stores/social";
import { byTest, mountWithPlugins } from "../helpers";

describe("PostComposer", () => {
  let wrapper;

  afterEach(() => wrapper?.unmount());

  const setup = async () => {
    const result = await mountWithPlugins(PostComposer);
    wrapper = result.wrapper;
    return {
      ...result,
      textarea: () => wrapper.find(`${byTest("post-textarea")} textarea`),
      submit: () => wrapper.find(byTest("post-submit")),
    };
  };

  it("disables the button while the post is empty", async () => {
    const { submit, textarea } = await setup();
    expect(submit().attributes("disabled")).toBeDefined();

    await textarea().setValue("   ");
    expect(submit().attributes("disabled")).toBeDefined();
  });

  it("publishes the post and clears the textarea", async () => {
    const { store, submit, textarea } = await setup();

    await textarea().setValue("My first chirp");
    expect(submit().attributes("disabled")).toBeUndefined();
    await submit().trigger("click");

    expect(store.ownPosts.at(-1).content).toBe("My first chirp");
    expect(textarea().element.value).toBe("");
    expect(wrapper.emitted("published")).toHaveLength(1);
  });

  it("publishes with Ctrl + Enter", async () => {
    const { store, textarea } = await setup();

    await textarea().setValue("Keyboard chirp");
    await textarea().trigger("keydown", { key: "Enter", ctrlKey: true });

    expect(store.ownPosts.at(-1).content).toBe("Keyboard chirp");
  });

  it("shows an error and blocks posts that are too long", async () => {
    const { submit, textarea } = await setup();

    await textarea().setValue("a".repeat(MAX_POST_LENGTH + 1));

    expect(submit().attributes("disabled")).toBeDefined();
    expect(wrapper.text()).toContain("Your post is too long");
  });
});
