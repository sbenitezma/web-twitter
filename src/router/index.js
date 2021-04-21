import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import User from "@/views/User";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:username",
    name: "User",
    component: User,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
