<template>
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
</template>

<script>
export default {
  layout: 'docs',
  head() {
    return {
      title: this.article ? this.article.title : 'Documentation'
    };
  },
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'about';
    const article = await $content(slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Article not found' });
      });

    return {
      article
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
  }
};
</script>
