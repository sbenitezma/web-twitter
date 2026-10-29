import { afterEach, describe, expect, it } from "vitest";
import AppNavbar from "@/components/AppNavbar.vue";
import { byTest, mountWithPlugins } from "../helpers";

describe("AppNavbar", () => {
  let wrapper;

  afterEach(() => wrapper?.unmount());

  it("shows the brand linking to home and the current user", async () => {
    ({ wrapper } = await mountWithPlugins(AppNavbar, { withApp: true }));

    const home = wrapper.find(byTest("navbar-home"));
    expect(home.attributes("href")).toBe("/");
    expect(home.text()).toContain("Social Chirp");

    const user = wrapper.find(byTest("navbar-user"));
    expect(user.text()).toContain("Lesa Compton");
    expect(user.text()).toContain("@lesa");
  });
});
