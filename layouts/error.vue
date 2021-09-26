<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" align="center">
        <v-img
          contain
          :src="error.statusCode === 404 ? '/img/404.png' : '/img/500.png'"
          height="160"
          width="300"
        />
        <h1 class="blue-grey--text text--darken-1 text-center">
          {{ error.statusCode === 404 ? pageNotFound : otherError }}
        </h1>
        <v-btn dark rounded outlined color="#546e7a" class="mt-5" to="/">
          TAKE ME BACK HOME
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout({ $auth }) {
    return $auth.loggedIn ? 'apps' : 'default';
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  data() {
    return {
      pageNotFound: 'Oops! That page can’t be found.',
      otherError: 'Oops! Internal Server Error.'
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
