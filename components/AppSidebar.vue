<template>
  <v-navigation-drawer
    dark
    permanent
    mini-variant
    :app="app"
    :absolute="absolute"
    color="#37474f"
    class="pt-4"
  >
    <v-avatar size="36" class="d-block text-center mx-auto mb-9">
      <v-icon large> mdi-account-circle-outline </v-icon>
    </v-avatar>

    <v-list dense flat class="mt-2">
      <v-list-item link class="mb-2" to="/">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
          </template>
          <span>Home</span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="$auth.loggedIn" link class="mb-2" to="/dashboard">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-list-item-icon>
          </template>
          <span>Dashboard</span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="$auth.loggedIn" link class="mb-2" to="/users">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon>mdi-account-supervisor-outline</v-icon>
            </v-list-item-icon>
          </template>
          <span>Users</span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="$auth.loggedIn" link class="mb-2" to="/options">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
          </template>
          <span>Options</span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title>Options</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="$auth.loggedIn" link class="mb-2" to="/docs">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-icon>
          </template>
          <span>Help</span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list dense flat class="mt-2">
        <v-list-item
          link
          class="mb-2 d-none d-lg-block"
          target="_blank"
          v-for="item in socialLinks"
          :key="item.title"
          :href="item.href"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon color="#252526">{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link class="mb-2" @click.prevent="toggle_dark_mode">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>mdi-theme-light-dark</v-icon>
              </v-list-item-icon>
            </template>
            <span>Theme light/dark</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>Theme light/dark</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="ml-5 mr-5"></v-divider>

        <v-list-item link to="/signin" v-if="!$auth.loggedIn">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>mdi-login-variant</v-icon>
              </v-list-item-icon>
            </template>
            <span>Signin</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>Signin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="$auth.loggedIn" @click="Logout">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
            </template>
            <span>Signout</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>Signout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    app: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    socialLinks() {
      return this.$store.state.socialLinks;
    }
  },
  methods: {
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('theme.dark', this.$vuetify.theme.dark.toString());
    },
    async Logout() {
      this.$toast.success('Logout successfully completed!');
      await this.$auth.logout('local');
    }
  }
};
</script>
