// https://next.json-generator.com/EJZEY44U9
// to use the code below, copy from [ and delete the semicolon ";" at the end
// and paste it into the URL
/** [
  {
    usersList: [
      {
        "repeat(10,20)": {
          _idUser: "{{objectId()}}",
          name: {
            first: "{{firstName()}}",
            last: "{{surname()}}",
          },
          username(tags) {
            return `${this.name.first}`.toLowerCase();
          },
          picture(tags) {
            return `https://i.pravatar.cc/150?u=${this._idUser}`;
          },
          posts: [
            {
              "repeat(5, 10)": {
                _idPost: "{{objectId()}}",
                author(tags, parent) {
                  return parent.username;
                },
                picture(tags, parent) {
                  return `https://i.pravatar.cc/150?u=${parent._idUser}`;
                },
                content(tags) {
                  const words = tags.random(1, 4);
                  const text = tags.lorem(words, "sentences");
                  return text;
                },
                date:
                  "{{moment(this.date(new Date(2014, 0, 1), new Date())).toISOString()}}",
              },
            },
          ],
        },
      },
    ],
    currentUser: {
      _idUser: "{{objectId()}}",
      name: {
        first: "{{firstName()}}",
        last: "{{surname()}}",
      },
      username(tags) {
        return `${this.name.first}`.toLowerCase();
      },
      picture(tags) {
        return `https://i.pravatar.cc/150?u=${this._idUser}`;
      },
      posts: [
        {
          "repeat(5, 10)": {
            _idPost: "{{objectId()}}",
            author(tags, parent) {
              return parent.username;
            },
            picture(tags, parent) {
              return `https://i.pravatar.cc/150?u=${parent._idUser}`;
            },
            content(tags) {
              const words = tags.random(1, 4);
              const text = tags.lorem(words, "sentences");
              return text;
            },
            date:
              "{{moment(this.date(new Date(2014, 0, 1), new Date())).toISOString()}}",
          },
        },
      ],
      following: [
        {
          "repeat(5, 10)": {
            _id: "{{objectId()}}",
          },
        },
      ],
    },
  },
];
*/
