<template>
  <v-row>
    <v-col cols="12" md="12" lg="12">
      <v-card rounded v-if="loading.timeline" min-height="300">
        <ProgressCircular :value="loading.timeline" size="20" />
      </v-card>
      <v-card id="timeline" rounded v-else>
        <Profile :user="user" />
        <v-card-title class="title">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"> Tweets </v-list-item-title>
            </v-list-item-content>
            <span class="title-1">
              {{ user.name.first }} {{ user.name.last }} -
              <span class="subheading-2"> @{{ user.username }} </span>
            </span>
          </v-list-item>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list three-line rounded>
            <v-virtual-scroll
              :bench="benched"
              :items="posts"
              :height="height"
              item-height="100"
            >
              <template v-slot:default="{ item }">
                <v-list-item :key="item._idPost">
                  <v-list-item v-if="item.picture" :key="item._idPost">
                    <v-list-item-avatar>
                      <v-img
                        :alt="item.author"
                        :id="`timelineUserImage-${user.username}-${item._idPost}`"
                        :src="item.picture"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        class="subheading"
                        v-html="
                          `<span class='subheading'>${item.authorName}</span>
                        <span class='body ml-1'> @${item.author}</span>`
                        "
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.content"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>
                        {{ tellTime(item.date) }}
                      </v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item>
                <v-divider />
              </template>
            </v-virtual-scroll>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import Profile from "@/components/Profile";
import ProgressCircular from "@/components/ProgressCircular";

export default {
  name: "Timeline",
  components: { ProgressCircular, Profile },
  computed: {
    ...mapState(["loading"]),
  },
  data: () => ({
    benched: 0,
  }),
  props: {
    height: {
      type: String,
      required: true,
    },
    posts: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    tellTime(time) {
      return this.$moment(time).fromNow();
    },
  },
};
</script>
