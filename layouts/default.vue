<template>
  <v-app>
    <NavDrawerMini />
    <v-app-bar app flat color="transparent">
      <v-spacer />
      <NavBarBtnApp />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
