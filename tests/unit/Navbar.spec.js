import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import Navbar from "@/components/Navbar.vue";

describe("Navbar.vue", () => {
  const localVue = createLocalVue();
  let state;
  let router;
  let store;
  let vuetify;
  let wrapper;

  vuetify = new Vuetify();
  localVue.use(vuetify);
  localVue.use(Vuex);
  localVue.use(VueRouter);

  beforeEach(() => {
    state = {
      loading: {
        currentUser: false,
      },
      currentUser: {
        _idUser: "607b8f61ef146a20fe948f42",
        name: {
          first: "Pauline",
          last: "Ingram",
        },
        username: "pauline",
        picture: "https://i.pravatar.cc/150?u=607b8f61ef146a20fe948f42",
        posts: [
          {
            _idPost: "607b8f6142ccc605c2eaecef",
            author: "pauline",
            picture: "https://i.pravatar.cc/150?u=607b8f61ef146a20fe948f42",
            content:
              "Deserunt cillum voluptate cupidatat dolore. Do anim in nostrud quis et officia culpa eu ea nisi proident. Ad occaecat deserunt dolore dolor adipisicing. Nulla nisi proident consequat aute voluptate consequat aute sunt adipisicing velit cillum.",
            date: "2020-10-09T16:41:10.699Z",
          },
        ],
      },
    };
    store = new Vuex.Store({
      state,
    });
  });

  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Navbar component", () => {
    wrapper = shallowMount(Navbar, {
      router,
      store,
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
    });
    expect(wrapper.findComponent(Navbar).exists()).toBeTruthy();
  });
});
