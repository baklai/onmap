<template>
  <v-navigation-drawer
    mini-variant
    :app="app"
    :permanent="drawer"
    :absolute="absolute"
    v-model="drawer"
    class="pt-3"
  >
    <template v-slot:prepend>
      <router-link to="/">
        <v-avatar size="36" class="d-block text-center mx-auto mb-4">
          <img :src="require('~/static/img/logo-app.png')" />
        </v-avatar>
      </router-link>
    </template>

    <v-list flat>
      <v-list-item link :to="core.home.href" class="mb-2">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon> {{ core.home.icon }} </v-icon>
            </v-list-item-icon>
          </template>
          <span> {{ core.home.title }} </span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title> {{ core.home.title }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link class="mb-2" :to="core.docs.href">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon> {{ core.docs.icon }} </v-icon>
            </v-list-item-icon>
          </template>
          <span> {{ core.docs.title }} </span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title> {{ core.docs.title }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="core.contacts.href" class="my-2">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon> {{ core.contacts.icon }} </v-icon>
            </v-list-item-icon>
          </template>
          <span> {{ core.contacts.title }} </span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title> {{ core.contacts.title }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-spacer />

    <template v-slot:append>
      <v-list flat dense>
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
                <v-icon> {{ item.icon }} </v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ item.title }} </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
              <span> {{ locale.name }} </span>
            </v-tooltip>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-list flat dense>
        <v-list-item link class="my-2" @click.prevent="langs = !langs">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> mdi-translate </v-icon>
              </v-list-item-icon>
            </template>
            <span> Translations </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> Translations </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          class="my-2"
          @click.prevent="$store.commit('toggleDarkMode')"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> mdi-theme-light-dark </v-icon>
              </v-list-item-icon>
            </template>
            <span> Theme toggle </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> Theme toggle </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mx-4" />

        <v-list-item link :to="core.signin.href" v-if="!$auth.loggedIn">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> {{ core.signin.icon }} </v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ core.signin.title }} </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> {{ core.signin.title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="$auth.loggedIn" @click="Logout">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> mdi-logout-variant </v-icon>
              </v-list-item-icon>
            </template>
            <span> Signout </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> Signout </v-list-item-title>
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
    core() {
      return this.$store.state.core;
    },
    socialLinks() {
      return this.$store.state.social;
    },
    drawer: {
      get() {
        return this.$store.state.sidebar;
      },
      set(val) {
        this.$store.commit('sidebar', val);
      }
    }
  },
  methods: {
    async toggleLang(code) {
      this.langs = false;
      await this.$i18n.setLocale(code);
    },

    async Logout() {
      this.$toast.success('Logout successfully completed!');
      await this.$auth.logout('local');
    }
  },
  watch: {
    drawer(value) {
      return value;
    }
  }
};
</script>
