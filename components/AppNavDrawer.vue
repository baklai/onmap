<template>
  <v-navigation-drawer
    mini-variant
    :permanent="drawer"
    v-model="drawer"
    :absolute="absolute"
    :app="app"
    class="pt-3"
  >
    <template v-slot:prepend>
      <router-link to="/">
        <v-avatar size="36" class="d-block text-center mx-auto mb-4">
          <img :src="require('~/static/favicon.svg')" />
        </v-avatar>
      </router-link>
    </template>
    <v-layout column fill-height>
      <v-spacer />
      <v-list flat dense>
        <!-- <v-list-item link to="/" class="mb-2">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>mdi-home-outline</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ $t('menu.home') }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.home') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- <v-list-item v-if="$auth.loggedIn" link class="mb-2" to="/dashboard">
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
        </v-list-item> -->

        <!-- <v-list-item v-if="$auth.loggedIn" link class="mb-2" to="/users">
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
        </v-list-item> -->

        <!-- <v-list-item v-if="$auth.loggedIn" link class="mb-2" to="/options">
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
        </v-list-item> -->

        <!-- <v-list-item v-if="$auth.loggedIn" link class="mb-2" to="/docs">
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
        </v-list-item> -->

        <!-- <v-list-item link to="/about" class="my-2">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>mdi-information-outline</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ $t('menu.about') }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.about') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- <v-list-item link to="/contacts" class="my-2">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>mdi-account-circle-outline</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ $t('menu.contacts') }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.contacts') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
      <v-spacer />
    </v-layout>
    <template v-slot:append>
      <v-expand-transition>
        <v-list dense flat v-if="langs">
          <v-list-item
            link
            class="my-2"
            v-for="locale in locales"
            :key="locale.code"
            @click.prevent.stop="toggleLang(locale.code)"
          >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-title v-bind="attrs" v-on="on" class="text-center">
                  {{ locale.code.toUpperCase() }}
                </v-list-item-title>
              </template>
              <span>{{ $t(`locale.${locale.name}`) }}</span>
            </v-tooltip>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-list flat dense>
        <!-- <v-list-item
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
        </v-list-item> -->

        <v-list-item link class="my-2" @click.prevent="langs = !langs">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>mdi-translate</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ $t('menu.translations') }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('menu.translations') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link class="my-2" @click.prevent="toggleDarkMode">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>mdi-theme-light-dark</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ $t('menu.theme') }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.theme') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mx-6" />

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
      default: true
    },
    drawer: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      langs: false
    };
  },
  computed: {
    locales() {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.$i18n.locale
      );
    },
    socialLinks() {
      return this.$store.state.socialLinks;
    }
  },
  methods: {
    toggleDarkMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('theme.dark', this.$vuetify.theme.dark.toString());
    },

    toggleLang: function (code) {
      this.langs = false;
      this.$i18n.setLocale(code);
      localStorage.setItem('lang.code', code);
    },

    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('theme.dark', this.$vuetify.theme.dark.toString());
    },

    async Logout() {
      this.$toast.success('Logout successfully completed!');
      await this.$auth.logout('local');
    }
  }
  // watch: {
  //   drawer(value) {
  //     return value;
  //   }
  // }
};
</script>

<style scoped>
.theme--dark.v-navigation-drawer {
  background-color: #333333 !important;
}
</style>
