/**
 * Small, predictable data set for unit tests (same shape as src/api/db/user.json).
 * Returns a fresh copy every time so tests can't leak changes into each other.
 */
export function createSocialData() {
  return structuredClone({
    currentUser: {
      _idUser: "u-lesa",
      name: { first: "Lesa", last: "Compton" },
      username: "lesa",
      picture: "https://i.pravatar.cc/150?u=lesa",
      following: [{ _idUser: "u-lesa" }, { _idUser: "u-pauline" }],
      posts: [
        {
          _idPost: "p-lesa-1",
          author: "lesa",
          picture: "https://i.pravatar.cc/150?u=lesa",
          content: "Lesa's oldest post",
          date: "2020-01-01T10:00:00.000Z",
        },
      ],
    },
    usersList: [
      {
        _idUser: "u-pauline",
        name: { first: "Pauline", last: "Ingram" },
        username: "pauline",
        picture: "https://i.pravatar.cc/150?u=pauline",
        posts: [
          {
            _idPost: "p-pauline-1",
            author: "pauline",
            picture: "https://i.pravatar.cc/150?u=pauline",
            content: "Pauline's old post",
            date: "2019-05-01T10:00:00.000Z",
          },
          {
            _idPost: "p-pauline-2",
            author: "pauline",
            picture: "https://i.pravatar.cc/150?u=pauline",
            content: "Pauline's newest post",
            date: "2021-03-01T10:00:00.000Z",
          },
        ],
      },
      {
        _idUser: "u-sexton",
        name: { first: "Sexton", last: "Dotson" },
        username: "sexton",
        picture: "https://i.pravatar.cc/150?u=sexton",
        posts: [
          {
            _idPost: "p-sexton-1",
            author: "sexton",
            picture: "https://i.pravatar.cc/150?u=sexton",
            content: "Sexton's post",
            date: "2020-06-01T10:00:00.000Z",
          },
        ],
      },
    ],
  });
}
