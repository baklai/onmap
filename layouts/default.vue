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
