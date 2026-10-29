import { afterEach, beforeEach } from "vitest";

// jsdom doesn't implement ResizeObserver, but several Vuetify components use it
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub;

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  window.localStorage.clear();
});
