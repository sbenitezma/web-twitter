<template>
  <div>
    <v-overlay :value="value" opacity="0.1" absolute>
      <v-progress-circular
        indeterminate
        :size="size"
        :color="color"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
export default {
  name: "ProgressCircular",
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: "50",
    },
    color: {
      type: String,
      required: false,
      default: "primary",
    },
  },
};
</script>
