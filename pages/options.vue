<template>
  <v-container>
    <AppSidebar />
    Options
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {};
  },
  mounted() {}
};
</script>
