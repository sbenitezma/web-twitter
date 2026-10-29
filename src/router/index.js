import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/user/:username",
    name: "User",
    // Lazy loaded: only downloaded when a profile is opened
    component: () => import("@/views/UserView.vue"),
    props: true,
    meta: { title: (route) => `@${route.params.username}` },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
    meta: { title: () => "Page not found" },
  },
];

const router = createRouter({
  // Clean URLs (/user/pauline instead of /#/user/pauline).
  // Netlify needs the SPA redirect declared in netlify.toml for this.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

// A page title per route, so screen readers announce where you are
router.afterEach((to) => {
  const title = to.meta.title?.(to);
  document.title = title ? `${title} · Social Chirp` : "Social Chirp";
});

export default router;
