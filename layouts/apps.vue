<template>
  <v-app v-if="$nuxt.$loading">
    <NavDrawerApp
      :drawer="drawer"
      :links="appLinks"
      :subheader="'Application'"
      :currentPage="currentPage"
    />
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
  },
  computed: {
    appLinks() {
      return this.$store.state.app.links;
    },
    coreLinks() {
      return this.$store.state.core.links;
    },
    currentPage() {
      const links = [
        ...this.$store.state.app.links,
        ...this.$store.state.core.links
      ];
      const filter = links.find((item) => item.href === this.$route.fullPath);
      return filter
        ? filter
        : {
            icon: 'mdi-apps',
            title: this.$store.state.app.short_name,
            subtitle: this.$store.state.app.description
          };
    }
  }
};
</script>
