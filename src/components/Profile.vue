<template>
  <div>
    <v-img
      id="profileHeaderImage"
      max-width="1920"
      max-height="150"
      :src="`https://picsum.photos/id/106/1001/300`"
    >
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img
              :id="`profileUserImage-${user._idUser}`"
              :src="user.picture"
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapState(["loading"]),
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
