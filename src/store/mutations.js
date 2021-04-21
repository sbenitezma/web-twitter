export const mutations = {
  /**
   * Set page loading
   * @param state
   * @param payload
   */
  setLoading(state, payload) {
    state.loading[payload.section] = payload.value;
  },
  /**
   * Set user.json currentUser
   * @param state
   * @param user
   */
  setCurrentUser(state, user) {
    state.currentUser = user;
    state.loading.currentUser = false;
  },
  /**
   * Set user.json userList
   * @param state
   * @param userList
   */
  setUserList(state, userList) {
    state.userList = userList;
    state.userList.forEach((user) => {
      user.posts.forEach((post) => {
        post.authorName = `${user.name.first} ${user.name.last}`;
      });
    });
    state.currentUser.posts.forEach((post) => {
      post.authorName = `${state.currentUser.name.first} ${state.currentUser.name.last}`;
    });
  },
  /**
   * Set following and non following users
   * @param state
   */
  setFollowUserList(state) {
    state.userList.forEach((user) => {
      let userF = state.currentUser.following.find(
        (following) => following._idUser === user._idUser
      );
      if (userF) {
        state.followingUsers.push(user);
      } else {
        state.nonFollowingUsers.push(user);
      }
    });
    state.loading.following = false;
    state.loading.follow = false;
  },
  /**
   * Refresh currentUser timeline
   * @param state
   */
  refreshTimeline(state) {
    let followingPosts = [];
    let currentUserPosts = [];
    state.followingUsers.forEach((user) => {
      user.posts.forEach((post) => {
        followingPosts.push(post);
      });
    });
    state.currentUser.posts.forEach((post) => {
      currentUserPosts.push(post);
    });
    followingPosts = followingPosts.concat(currentUserPosts);
    state.timelinePosts = followingPosts.sort((date1, date2) =>
      new Date(date2.date) > new Date(date1.date) ? 1 : -1
    );
    state.loading.timeline = false;
  },
  /**
   * Add user to following List
   * @param state
   * @param userId
   */
  followUser(state, userId) {
    state.loading.following = true;
    state.loading.follow = true;

    let user = state.userList.find((user) => user._idUser === userId);
    if (user) {
      state.followingUsers.push(user);
      state.nonFollowingUsers = state.nonFollowingUsers.filter(
        (user) => user._idUser !== userId
      );
    }
    state.loading.following = false;
    state.loading.follow = false;
  },
  /**
   * Post new tweet
   * @param state
   * @param tweet
   */
  postTweet(state, tweet) {
    state.loading.timeline = true;
    state.currentUser.posts.push({
      _idPost: Math.random().toString(36).substr(2, 9),
      author: state.currentUser.username,
      authorName: `${state.currentUser.name.first} ${state.currentUser.name.last}`,
      picture: state.currentUser.picture,
      content: tweet,
      date: new Date().toISOString(),
    });
  },
  /**
   * Remove user to following List
   * @param state
   * @param userId
   */
  unfollowUser(state, userId) {
    state.loading.following = true;
    state.loading.follow = true;

    let user = state.userList.find((user) => user._idUser === userId);
    if (user) {
      state.nonFollowingUsers.push(user);
      state.followingUsers = state.followingUsers.filter(
        (user) => user._idUser !== userId
      );
    }
    state.loading.following = false;
    state.loading.follow = false;
  },
};
