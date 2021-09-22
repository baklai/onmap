<template>
  <v-app v-if="$nuxt.$loading">
    <NavDrawerMini />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
/* .v-btn::before {
  background-color: transparent !important;
}

.v-btn--active.no-active::before {
  background-color: transparent !important;
  opacity: 0 !important;
}

.v-input .v-label {
  height: unset !important;
  line-height: unset !important;
} */
</style>
