<template>
  <v-app>
    <v-app-bar app clipped-right flat height="72">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-responsive max-width="156">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer :mini-variant="false" v-model="drawer" app width="400">
      <AppNavDrawer :app="false" :absolute="true" :drawer="drawer" />
      <v-sheet height="128" width="100%"></v-sheet>
      <v-list class="pl-14" shaped>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Reports</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
};
</script>

<style scoped>
.theme--dark.v-navigation-drawer {
  background-color: #252526 !important;
}
</style>
