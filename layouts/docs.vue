<template>
  <v-app>
    <NavDrawerApp
      :drawer="drawer"
      :links="docLinks"
      :subheader="'Documentation'"
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
  async fetch() {
    const articles = await this.$content().sortBy('title').fetch();
    articles.forEach((item) => {
      this.docLinks.push({
        href: `/docs/${item.slug}`,
        icon: 'mdi-file-document-outline',
        title: item.title,
        subtitle: item.description
      });
    });
  },
  data() {
    return {
      drawer: null,
      docLinks: []
    };
  },
  computed: {
    currentPage() {
      const links = [...this.docLinks, ...this.$store.state.core.links];
      const filter = links.find((item) => item.href === this.$route.fullPath);
      return filter
        ? filter
        : {
            icon: 'mdi-information-outline',
            title: this.$store.state.app.short_name,
            subtitle: this.$store.state.app.description
          };
    }
  }
};
</script>
