import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import ProgressCircular from "@/components/ProgressCircular.vue";

describe("ProgressCircular.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  vuetify = new Vuetify();

  beforeEach(() => {
    // Mount component to be accessible for classes
    wrapper = mount(ProgressCircular, {
      vuetify,
      localVue,
      propsData: {
        value: true,
      },
    });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Progressbar component", () => {
    expect(wrapper.findComponent(ProgressCircular).exists()).toBeTruthy();
  });

  it("Should render ProgressCircular classes", () => {
    let progressClass = wrapper.find(".v-progress-circular");
    expect(progressClass.exists()).toBeTruthy();
    expect(progressClass.element).toMatchSnapshot();
  });
});
