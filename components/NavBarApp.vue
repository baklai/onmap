<template>
  <v-app-bar app clipped-right flat height="72">
    <v-btn icon @click.stop="drawer = !drawer">
      <v-icon> mdi-{{ `chevron-${drawer ? 'left' : 'right'}` }} </v-icon>
    </v-btn>

    <v-toolbar-title>{{ appName }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon> mdi-bell-outline </v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon> mdi-account-circle-outline </v-icon>
    </v-btn>

    <v-app-bar-nav-icon />
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    appName() {
      return this.$store.state.app.name;
    },
    drawer: {
      get() {
        return this.$store.state.sidebar;
      },
      set(val) {
        this.$store.commit('sidebar', val);
      }
    }
  }
};
</script>
