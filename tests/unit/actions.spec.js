import Vue from "vue";
import Vuex from "vuex";
import { actions } from "@/store/actions";

describe("Store actions", () => {
  Vue.use(Vuex);
  let store;
  let setDataMock;
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
  };
  beforeEach(() => {
    setDataMock = jest.fn();
    store = new Vuex.Store({
      state: state,
      mutations: {
        LOAD_USER: setDataMock,
        setCurrentUser: setDataMock,
        setUserList: setDataMock,
        setFollowUserList: setDataMock,
        refreshTimeline: setDataMock,
        followUser: setDataMock,
        unfollowUser: setDataMock,
      },
      actions: {
        LOAD_USER: actions.LOAD_USER,
        followUser: actions.followUser,
        unfollowUser: actions.unfollowUser,
      },
    });
  });
  it("Tests LOAD_USER", () => {
    return store.dispatch("LOAD_USER").then(() => {
      expect(setDataMock.mock.calls[0][1]).toBeTruthy();
      expect(typeof setDataMock.mock.calls[0][1]).toBe("object");
    });
  });

  it("Tests dispatch calls the proper action follow user", () => {
    return store
      .dispatch("followUser", { userId: "607b8f6170435c007d1f74f0" })
      .then(() => {
        expect(setDataMock.mock.calls[0]).toBeTruthy();
        expect(typeof setDataMock.mock.calls[0]).toBe("object");
      });
  });

  it("Tests dispatch calls the proper action unfollow user", () => {
    return store
      .dispatch("unfollowUser", { userId: "607b8f6110e19ea01b39e460" })
      .then(() => {
        expect(setDataMock.mock.calls[0]).toBeTruthy();
        expect(typeof setDataMock.mock.calls[0]).toBe("object");
      });
  });
});
