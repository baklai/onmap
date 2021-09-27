<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="6" md="5" sm="8" xs="8" align="center">
        <DefaultPage />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout({ $auth }) {
    return $auth.loggedIn ? 'apps' : 'default';
  },
  data() {
    return {};
  }
};
</script>
