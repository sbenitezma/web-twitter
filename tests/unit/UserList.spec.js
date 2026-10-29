import { afterEach, describe, expect, it } from "vitest";
import UserList from "@/components/UserList.vue";
import { byTest, mountWithPlugins } from "../helpers";
import { createSocialData } from "../fixtures/socialData";

const users = createSocialData().usersList;

describe("UserList", () => {
  let wrapper;

  afterEach(() => wrapper?.unmount());

  it("renders one item per user with a link to the profile", async () => {
    ({ wrapper } = await mountWithPlugins(UserList, {
      props: { users, type: "suggested" },
    }));

    const items = wrapper.findAll(byTest("user-list-item"));
    expect(items).toHaveLength(2);
    expect(items[0].text()).toContain("Pauline Ingram");
    expect(items[0].text()).toContain("@pauline");
    expect(wrapper.find(byTest("user-link")).attributes("href")).toBe(
      "/user/pauline",
    );
  });

  it("emits 'follow' with the user id in the suggested list", async () => {
    ({ wrapper } = await mountWithPlugins(UserList, {
      props: { users, type: "suggested" },
    }));

    await wrapper.find(byTest("follow-button")).trigger("click");

    expect(wrapper.emitted("follow")).toEqual([["u-pauline"]]);
    expect(wrapper.find(byTest("unfollow-button")).exists()).toBe(false);
  });

  it("emits 'unfollow' with the user id in the following list", async () => {
    ({ wrapper } = await mountWithPlugins(UserList, {
      props: { users, type: "following" },
    }));

    await wrapper.findAll(byTest("unfollow-button"))[1].trigger("click");

    expect(wrapper.emitted("unfollow")).toEqual([["u-sexton"]]);
  });

  it("shows the empty text when there are no users", async () => {
    ({ wrapper } = await mountWithPlugins(UserList, {
      props: { users: [], type: "following", emptyText: "Nobody to show" },
    }));

    expect(wrapper.text()).toContain("Nobody to show");
  });
});
