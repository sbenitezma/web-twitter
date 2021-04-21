import Vue from "vue";
import Vuex from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

Vue.use(Vuex);

export const state = {
  currentUser: {},
  followingUsers: [],
  nonFollowingUsers: [],
  timelinePosts: [],
  userList: [],
  loading: {
    currentUser: true,
    following: true,
    follow: true,
    timeline: true,
    post: false,
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
