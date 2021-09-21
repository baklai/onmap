<template>
  <v-app>
    <v-app-bar app flat height="72">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Online Network Mapper</v-toolbar-title>
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

    <v-navigation-drawer :mini-variant="false" v-model="drawer" app width="380">
      <AppNavDrawer :app="false" :absolute="true" :drawer="drawer" />
      <v-sheet height="128" width="100%">
        <v-list three-line class="pl-14">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon large> mdi-clipboard-list-outline </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="body-1 text-uppercase font-weight-bold">
                List of reports
              </v-list-item-title>
              <v-list-item-subtitle>
                List of reports from scan report storage
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>

      <v-list subheader two-line flat class="pl-14">
        <v-subheader>ONMAP Pages</v-subheader>
        <v-list-item-group>
          <v-list-item link to="/onmap/reports">
            <v-list-item-avatar>
              <v-icon>mdi-clipboard-list-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Reports</v-list-item-title>
              <v-list-item-subtitle>
                List of reports from storage
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/onmap/scaner">
            <v-list-item-avatar>
              <v-icon>mdi-lan</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Scaner</v-list-item-title>
              <v-list-item-subtitle>Scan service</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/onmap/ping-icmp">
            <v-list-item-avatar>
              <v-icon>mdi-lan-pending</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>ICMP Ping</v-list-item-title>
              <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
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
    drawer: null,
    selectedItem: 0,
    items: [
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' }
    ]
  })
};
</script>

<style scoped>
.theme--dark.v-navigation-drawer {
  background-color: #252526 !important;
}
</style>
