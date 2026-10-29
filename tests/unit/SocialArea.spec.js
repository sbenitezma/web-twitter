import { afterEach, describe, expect, it } from "vitest";
import SocialArea from "@/components/SocialArea.vue";
import { byTest, mountWithPlugins } from "../helpers";

describe("SocialArea", () => {
  let wrapper;

  afterEach(() => wrapper?.unmount());

  const followingSection = () => wrapper.find(byTest("following-users"));
  const suggestedSection = () => wrapper.find(byTest("suggested-users"));

  it("renders the following and suggested users", async () => {
    ({ wrapper } = await mountWithPlugins(SocialArea));

    expect(wrapper.find(byTest("following-count")).text()).toContain("1");
    expect(followingSection().text()).toContain("Pauline Ingram");
    expect(suggestedSection().text()).toContain("Sexton Dotson");
  });

  it("moves a user to 'Following' when following them", async () => {
    ({ wrapper } = await mountWithPlugins(SocialArea));

    await suggestedSection().find(byTest("follow-button")).trigger("click");

    expect(wrapper.find(byTest("following-count")).text()).toContain("2");
    expect(followingSection().text()).toContain("Sexton Dotson");
    expect(suggestedSection().text()).toContain("You already follow everybody!");
  });

  it("moves a user to 'Who to follow' when unfollowing them", async () => {
    ({ wrapper } = await mountWithPlugins(SocialArea));

    await followingSection().find(byTest("unfollow-button")).trigger("click");

    expect(wrapper.find(byTest("following-count")).text()).toContain("0");
    expect(suggestedSection().text()).toContain("Pauline Ingram");
  });
});
