<template>
  <div>
    <v-virtual-scroll
      :bench="benched"
      :items="users"
      height="300"
      item-height="70"
    >
      <template v-slot:default="{ item }">
        <v-list-item :key="item._idUser">
          <router-link
            :to="{
              name: 'User',
              params: { username: item.username },
            }"
            custom
            v-slot="{ navigate }"
          >
            <a @click="navigate" @keypress.enter="navigate" role="link">
              <v-list-item-avatar>
                <v-img :alt="`${item.name}`" :src="item.picture"></v-img>
              </v-list-item-avatar>
            </a>
          </router-link>
          <v-list-item-content>
            <router-link
              :to="{
                name: 'User',
                params: { username: item.username },
              }"
              custom
              v-slot="{ navigate }"
            >
              <a @click="navigate" @keypress.enter="navigate" role="link">
                <v-list-item-title
                  v-html="
                    `<span class='subheading'>${item.name.first} ${item.name.last}</span>
                 <span class='body ml-1'> @${item.username}</span>`
                  "
                ></v-list-item-title>
              </a>
            </router-link>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn
              id="unfollowUserBtn"
              color="primary"
              rounded
              v-if="type === 'following'"
              @click="unfollowUser(item._idUser)"
              >UnFollow</v-btn
            >
            <v-btn
              id="followUserBtn"
              color="primary"
              rounded
              outlined
              v-else-if="type === 'follow'"
              @click="followUser(item._idUser)"
              >Follow</v-btn
            >
          </v-list-item-icon>
        </v-list-item>
        <v-divider />
      </template>
    </v-virtual-scroll>
  </div>
</template>
<script>
export default {
  name: "UserList",
  props: {
    users: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    benched: 0,
  }),
  methods: {
    /**
     * Set follow user
     * @param userId
     */
    followUser(userId) {
      this.$store.dispatch("followUser", userId);
    },
    /**
     * Set unfollower user
     * @param userId
     */
    unfollowUser(userId) {
      this.$store.dispatch("unfollowUser", userId);
    },
  },
};
</script>
