<template>
  <v-app-bar app clipped-right flat class="px-2">
    <v-btn icon @click.stop="drawer = !drawer">
      <v-icon> mdi-{{ `chevron-${drawer ? 'left' : 'right'}` }} </v-icon>
    </v-btn>
    <v-toolbar-title>{{ appName }}</v-toolbar-title>
    <v-spacer />
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
          class="mr-2"
          @click.prevent="$store.commit('toggleDarkMode')"
        >
          <v-icon> mdi-theme-light-dark </v-icon>
        </v-btn>
      </template>
      <span> Theme toggle </span>
    </v-tooltip>
    <v-tooltip bottom v-if="$auth.loggedIn">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs" class="mr-2">
          <v-icon> mdi-bell-outline </v-icon>
        </v-btn>
      </template>
      <span> Notifications </span>
    </v-tooltip>
    <NavBarBtnApp />
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
