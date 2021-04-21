<template>
  <v-row>
    <v-col cols="12" md="12" lg="12">
      <v-row no-gutters>
        <v-col cols="12" md="12" lg="12">
          <v-card rounded v-if="loading.following" min-height="300">
            <ProgressCircular :value="loading.following" size="20" />
          </v-card>
          <v-card rounded v-else id="followingUsers">
            <v-card-title class="title"
              >Following
              <span class="ml-2 mr-2"
                >- {{ getFollowingUsers.length }}</span
              ></v-card-title
            >
            <v-card-text>
              <v-list>
                <UserList :users="getFollowingUsers" type="following" />
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" lg="12">
          <v-card rounded v-if="loading.follow" min-height="300">
            <ProgressCircular :value="loading.follow" size="20" />
          </v-card>
          <v-card rounded="lg" v-else id="followUsers">
            <v-card-title class="title">Follow</v-card-title>
            <v-card-text>
              <v-list>
                <UserList :users="getNonFollowingUsers" type="follow" />
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import UserList from "@/components/UserList";
import ProgressCircular from "@/components/ProgressCircular";

export default {
  name: "SocialArea",
  components: { ProgressCircular, UserList },
  computed: {
    ...mapState(["loading"]),
    ...mapGetters(["getFollowingUsers", "getNonFollowingUsers"]),
  },
};
</script>
