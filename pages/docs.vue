<template>
  <v-row justify="center" class="ma-5">
    <AppSidebar />
    <v-col cols="3">
      <v-sheet rounded="lg">
        <v-list>
          <v-list-item
            two-line
            v-for="item in articles"
            :key="item.slug"
            @click.prevent="getArticle(item.slug)"
          >
            <v-list-item-avatar>
              <v-icon> mdi-file-document-outline </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.description }}
                <br />
                <small>
                  {{ item.updatedAt | formatDate }}
                </small>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item link color="grey lighten-4" to="/">
            <v-list-item-avatar>
              <v-icon> mdi-home-outline </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title> Home </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>
    <v-col cols="8">
      <v-sheet min-height="70vh" rounded="lg">
        <article v-if="article" class="pa-10">
          <h1>{{ article.title | formatTitle }}</h1>
          <br />
          <nuxt-content :document="article" />
          <p>Article last updated: {{ article.updatedAt | formatDate }}</p>
        </article>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head() {
    return {
      title: this.article ? this.article.title : 'Help'
    };
  },
  async asyncData({ $content }) {
    let article;
    const articles = await $content().sortBy('title').fetch();
    try {
      article = await $content('about').fetch();
    } catch (err) {
      article = null;
    }
    return {
      articles,
      article
    };
  },
  data() {
    return {};
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
