<template>
  <v-app v-if="$nuxt.$loading">
    <NavDrawerApp :drawer="drawer" />
    <NavBarApp :drawer="drawer" />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    };
  }
  // computed: {
  //   page() {
  //     return this.$route.name;
  //   }
  // }
  // mounted() {
  //   this.currentPage = this.subPages.find(
  //     (item) => item.href === this.$route.fullPath
  //   );
  // }
};
</script>
