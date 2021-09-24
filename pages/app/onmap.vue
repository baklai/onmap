<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="4" md="5" sm="8" xs="8" align="center">
        <AppDefault />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],

  layout: 'apps',

  data() {
    return {};
  }
};
</script>
