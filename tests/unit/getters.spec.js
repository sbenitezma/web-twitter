import Vue from "vue";
import Vuex from "vuex";
import { getters } from "@/store/getters";

describe("Store Getters", () => {
  Vue.use(Vuex);

  const state = {
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
    followingUsers: [
      {
        _idUser: "607b8f6110e19ea01b39e460",
        name: {
          first: "Concepcion",
          last: "Sosa",
        },
        username: "concepcion",
        picture: "https://i.pravatar.cc/150?u=607b8f6110e19ea01b39e460",
        posts: [
          {
            _idPost: "607b8f61fb31b0a22d5e2c38",
            author: "concepcion",
            picture: "https://i.pravatar.cc/150?u=607b8f6110e19ea01b39e460",
            content: "Sit et mollit cillum duis enim exercitation anim.",
            date: "2018-12-27T20:10:00.122Z",
          },
        ],
      },
    ],
    nonFollowingUsers: [
      {
        _idUser: "607b8f6170435c007d1f74f0",
        name: {
          first: "Sexton",
          last: "Dotson",
        },
        username: "sexton",
        picture: "https://i.pravatar.cc/150?u=607b8f6170435c007d1f74f0",
        posts: [
          {
            _idPost: "607b8f61360d1ad02c59c984",
            author: "sexton",
            picture: "https://i.pravatar.cc/150?u=607b8f6170435c007d1f74f0",
            content:
              "Et qui adipisicing ullamco incididunt voluptate fugiat in pariatur esse. Amet velit amet tempor nisi id id reprehenderit Lorem dolore occaecat anim. Lorem tempor laboris Lorem nulla proident voluptate ea laborum eu laboris labore ipsum aliqua. Ad reprehenderit tempor deserunt laborum mollit cillum nostrud et anim labore quis.",
            date: "2015-08-29T08:10:40.402Z",
          },
        ],
      },
    ],
    userList: [
      {
        _idUser: "607b8f6110e19ea01b39e460",
        name: {
          first: "Concepcion",
          last: "Sosa",
        },
        username: "concepcion",
        picture: "https://i.pravatar.cc/150?u=607b8f6110e19ea01b39e460",
        posts: [
          {
            _idPost: "607b8f61fb31b0a22d5e2c38",
            author: "concepcion",
            picture: "https://i.pravatar.cc/150?u=607b8f6110e19ea01b39e460",
            content: "Sit et mollit cillum duis enim exercitation anim.",
            date: "2018-12-27T20:10:00.122Z",
          },
        ],
      },
      {
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
      {
        _idUser: "607b8f6170435c007d1f74f0",
        name: {
          first: "Sexton",
          last: "Dotson",
        },
        username: "sexton",
        picture: "https://i.pravatar.cc/150?u=607b8f6170435c007d1f74f0",
        posts: [
          {
            _idPost: "607b8f61360d1ad02c59c984",
            author: "sexton",
            picture: "https://i.pravatar.cc/150?u=607b8f6170435c007d1f74f0",
            content:
              "Et qui adipisicing ullamco incididunt voluptate fugiat in pariatur esse. Amet velit amet tempor nisi id id reprehenderit Lorem dolore occaecat anim. Lorem tempor laboris Lorem nulla proident voluptate ea laborum eu laboris labore ipsum aliqua. Ad reprehenderit tempor deserunt laborum mollit cillum nostrud et anim labore quis.",
            date: "2015-08-29T08:10:40.402Z",
          },
        ],
      },
    ],
  };

  it("getFollowingUsers", () => {
    // Get the active app from the getter
    const followingUsers = getters.getFollowingUsers(state);
    expect(followingUsers).toEqual(state.followingUsers);
  });

  it("getNonFollowingUsers", () => {
    // Get the favourite apps from the getter
    const nonFollowingUsers = getters.getNonFollowingUsers(state);
    expect(nonFollowingUsers).toEqual(state.nonFollowingUsers);
  });

  it("getAllUsers", () => {
    const userList = getters.getAllUsers(state);
    expect(userList).toEqual(state.userList);
  });

  it("getPostsByUser", () => {
    const username = "concepcion";
    const userPosts = getters.getPostsByUser(state)(username);
    expect(userPosts).toBeDefined();
    expect(userPosts).toBeTruthy();
  });

  it("getUserByUsername", () => {
    const username = "sexton";
    const userPosts = getters.getUserByUsername(state)(username);
    expect(userPosts).toEqual(state.userList[2]);
  });
});
