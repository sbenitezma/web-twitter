<template>
  <v-card class="pa-8 text-center" data-test="not-found">
    <v-icon icon="mdi-map-marker-question" size="48" color="tertiary" />
    <h1 class="text-h6 mt-2">This page doesn't exist</h1>
    <v-btn class="mt-4" color="primary" :to="{ name: 'Home' }">
      Back to timeline
    </v-btn>
  </v-card>
</template>
