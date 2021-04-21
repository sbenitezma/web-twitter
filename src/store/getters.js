export const getters = {
  /**
   * Get All Following users
   */
  getFollowingUsers: (state) => {
    return state.followingUsers;
  },
  /**
   * Get all non following users
   */
  getNonFollowingUsers: (state) => {
    return state.nonFollowingUsers;
  },
  /**
   * Get All Users
   */
  getAllUsers: (state) => {
    return state.userList;
  },
  /**
   * Get all posts by user
   * @param state
   * @returns {*}
   */
  getPostsByUser: (state) => (username) => {
    const userInfo = state.userList.find((user) => user.username === username);
    let orderedPosts = [];
    if (userInfo) {
      if (userInfo.posts.length > 1) {
        orderedPosts = userInfo.posts.sort((date1, date2) =>
          new Date(date2.date) > new Date(date1.date) ? 1 : -1
        );
      }
    }
    return orderedPosts;
  },
  /**
   * Return user info by username
   * @param state
   * @returns {function(*): *}
   */
  getUserByUsername: (state) => (username) => {
    return state.userList.find((user) => user.username === username);
  },
};
