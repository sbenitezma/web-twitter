import db from "../api/db/user.json";
export const actions = {
  /**
   * Load User API info
   * @param commit
   * @returns {Promise<void>}
   * @constructor
   */
  async LOAD_USER({ commit }) {
    if (db) {
      commit("setCurrentUser", db.currentUser);
      commit("setUserList", db.usersList);
      commit("setFollowUserList");
      commit("refreshTimeline");
    }
  },
  /**
   * Follow User by id
   * @param commit
   * @param userId
   * @returns {Promise<void>}
   */
  async followUser({ commit }, userId) {
    commit("followUser", userId);
    commit("refreshTimeline");
  },
  /**
   * Unfollow User by id
   * @param commit
   * @param userId
   * @returns {Promise<void>}
   */
  async unfollowUser({ commit }, userId) {
    commit("unfollowUser", userId);
    commit("refreshTimeline");
  },
  /**
   * Post new tweet
   * @param commit
   * @param tweet
   * @returns {Promise<void>}
   */
  async postTweet({ commit }, tweet) {
    commit("postTweet", tweet);
    commit("refreshTimeline");
  },
};
