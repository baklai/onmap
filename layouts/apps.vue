<template>
  <!-- v-if="$nuxt.$loading" -->
  <v-app>
    <NavDrawerApp
      :links="appLinks"
      :subheader="'Application'"
      :currentPage="currentPage"
    />
    <NavBarApp />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
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
  },
  watch: {
    error(value) {
      this.$toast.error(value.response.data.message);
    }
  }
};
</script>
