<template>
  <v-app>
    <NavAppDrawer :drawer="drawer" :pages="subPages" />
    <NavAppBar :drawer="drawer" />
    <v-main>
      <v-container>
        <v-sheet min-height="70vh" rounded="lg" class="ma-3 elevation-1">
          <article v-if="article" class="pa-10">
            <h1>{{ article.title | formatTitle }}</h1>
            <br />
            <nuxt-content :document="article" />
            <p>
              <strong>Article last updated:</strong>
              {{ article.updatedAt | formatDate }}
            </p>
          </article>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: this.article ? this.article.title : 'Help'
    };
  },
  async fetch() {
    const articles = await this.$content().sortBy('title').fetch();
    articles.forEach((item) => {
      this.subPages.push({
        href: `/docs/${item.slug}`,
        icon: 'mdi-file-document-outline',
        title: item.title,
        subtitle: item.description
      });
    });

    try {
      this.article = await this.$content('options').fetch();
    } catch (err) {
      this.article = null;
    }
  },

  data() {
    return {
      drawer: null,
      article: null,
      subPages: []
    };
  },
  filters: {
    formatTitle(value) {
      return value.toUpperCase();
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    }
  },
  methods: {
    async getArticle(slug) {
      this.article = await this.$content(slug).fetch();
    }
  }
};
</script>
