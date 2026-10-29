import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createMemoryHistory, createRouter } from "vue-router";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { routes } from "@/router";
import { setDataSource, useSocialStore } from "@/stores/social";
import { createSocialData } from "./fixtures/socialData";

/**
 * Creates a store already loaded with the test fixture.
 * @returns {Promise<ReturnType<typeof useSocialStore>>}
 */
export async function createLoadedStore(data = createSocialData()) {
  const pinia = createPinia();
  setActivePinia(pinia);
  setDataSource(() => Promise.resolve(data));
  const store = useSocialStore();
  await store.loadData();
  return { store, pinia };
}

/**
 * Mounts a component with the same plugins the real app uses
 * (Vuetify, Pinia and Vue Router), so tests run against real behaviour.
 */
export async function mountWithPlugins(component, options = {}) {
  const { store, pinia } = await createLoadedStore(options.data);
  const router = createRouter({ history: createMemoryHistory(), routes });
  await router.push(options.route ?? "/");
  await router.isReady();

  const vuetify = createVuetify({ components, directives });

  // Layout components (v-app-bar, v-main...) only work inside <v-app>
  const target = options.withApp
    ? defineComponent({
        render: () =>
          h(components.VApp, null, () => h(component, options.props)),
      })
    : component;

  const wrapper = mount(target, {
    props: options.withApp ? undefined : options.props,
    global: {
      plugins: [pinia, router, vuetify],
    },
    attachTo: document.body,
  });

  return { wrapper, store, router };
}

/** Finds elements by our `data-test` attribute convention. */
export const byTest = (name) => `[data-test="${name}"]`;
