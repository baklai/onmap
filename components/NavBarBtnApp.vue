<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs" @click="sheet = !sheet">
          <v-icon> mdi-apps </v-icon>
        </v-btn>
      </template>
      <span> Applications </span>
    </v-tooltip>

    <v-bottom-sheet v-model="sheet" fullscreen>
      <v-sheet height="100%">
        <v-toolbar flat dark color="#546e7a">
          <v-toolbar-title> {{ appName }} </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon :ripple="false" @click="sheet = !sheet">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card
          flat
          tile
          dark
          class="mx-auto"
          color="#546e7a"
          v-if="$auth.loggedIn"
        >
          <v-card-text class="pa-0 px-2">
            <v-list-item>
              <v-list-item-avatar>
                <v-icon> mdi-account-outline </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  User name : {{ $auth.user.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-avatar>
                <v-icon> mdi-email-outline </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  User email : {{ $auth.user.email }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-avatar>
                <v-icon> mdi-account-key-outline </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  User role : {{ $auth.user.role }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
          <v-card-actions>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon large> mdi-account-circle-outline </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> {{ $auth.user.login }} </v-list-item-title>
              </v-list-item-content>
              <v-row align="center" justify="end">
                <v-icon class="mr-1"> mdi-clock-outline </v-icon>
                <span class="subheading mr-2"> {{ $auth.user.created }} </span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>

        <v-divider />

        <v-list flat>
          <v-list-item
            link
            :to="core.home.href"
            class="mb-2"
            @click="sheet = !sheet"
          >
            <v-list-item-icon>
              <v-icon> {{ core.home.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> {{ core.home.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            :to="core.docs.href"
            class="my-2"
            @click="sheet = !sheet"
          >
            <v-list-item-icon>
              <v-icon> {{ core.docs.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> {{ core.docs.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            :to="core.contacts.href"
            class="my-2"
            @click="sheet = !sheet"
          >
            <v-list-item-icon>
              <v-icon> {{ core.contacts.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> {{ core.contacts.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-group no-action prepend-icon="mdi-translate">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title> Translations </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="locale in locales"
              :key="locale.code"
              @click.prevent.stop="toggleLang(locale.code)"
            >
              <v-list-item-icon>
                <v-icon> mdi-web </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ locale.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item
            link
            class="my-2"
            @click.prevent="$store.commit('toggleDarkMode')"
          >
            <v-list-item-icon>
              <v-icon> mdi-theme-light-dark </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Theme toggle </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item link :to="core.signin.href" v-if="!$auth.loggedIn">
            <v-list-item-icon>
              <v-icon> {{ core.signin.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> {{ core.signin.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link v-if="$auth.loggedIn" @click="Logout()">
            <v-list-item-icon>
              <v-icon> mdi-logout-variant </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Signout </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card flat tile class="text-center mt-6">
          <v-card-text>
            <v-tooltip bottom v-for="item in socialLinks" :key="item.title">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-4"
                  icon
                  :href="item.href"
                  target="_blank"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="24px">
                    {{ item.icon }}
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-card-text>
          <span class="caption grey--text text--lighten-1">
            {{ copyright }}
          </span>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sheet: false
    };
  },
  computed: {
    appName() {
      return this.$store.state.app.name;
    },
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
    copyright() {
      return this.$store.getters.copyright;
    }
  },
  methods: {
    async toggleLang(code) {
      await this.$i18n.setLocale(code);
    },

    async Logout() {
      this.$toast.success('Logout successfully completed!');
      await this.$auth.logout('local');
    }
  }
};
</script>
