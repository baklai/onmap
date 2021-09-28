<template>
  <v-app-bar app clipped-right flat height="72" class="px-2">
    <v-btn icon @click.stop="drawer = !drawer">
      <v-icon> mdi-{{ `chevron-${drawer ? 'left' : 'right'}` }} </v-icon>
    </v-btn>

    <v-toolbar-title>{{ appName }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-list-item link class="my-2" @click.prevent="toggleDarkMode">
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

    <v-btn icon class="mr-2" @click.prevent="toggleDarkMode">
      <v-icon> mdi-theme-light-dark </v-icon>
    </v-btn>

    <v-btn icon class="mr-2" v-if="$auth.loggedIn">
      <v-icon> mdi-bell-outline </v-icon>
    </v-btn>

    <v-btn icon @click="sheet = !sheet">
      <v-icon> mdi-apps </v-icon>
    </v-btn>

    <v-bottom-sheet v-model="sheet" fullscreen>
      <v-sheet height="100%">
        <!-- <v-toolbar dense flat outlined>
          <v-avatar size="32px" class="d-block text-center mx-auto mr-2">
            <img :src="require('~/static/img/logo-app.png')" alt="app-logo" />
          </v-avatar>

          <v-toolbar-title>{{ appName }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon :ripple="false" @click="sheet = !sheet">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar> -->

        <v-card class="mx-auto" color="#26c6da">
          <v-card-title>
            <v-avatar left size="32px">
              <img :src="require('~/static/img/logo-app.png')" alt="app-logo" />
            </v-avatar>
            <span> {{ appName }} </span>
            <v-spacer />
            <v-btn icon :ripple="false" @click="sheet = !sheet">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="pa-0 px-2">
            <v-list-item>
              <v-list-item-avatar>
                <v-icon> mdi-account-outline </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  >User login : {{ $auth.user.login }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-avatar>
                <v-icon> mdi-email-outline </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  >User email : {{ $auth.user.email }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-avatar>
                <v-icon> mdi-account-key-outline </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  >User role : {{ $auth.user.role }}
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
                <v-list-item-title> {{ $auth.user.name }} </v-list-item-title>
              </v-list-item-content>
              <v-row align="center" justify="end">
                <v-icon class="mr-1"> mdi-clock-outline </v-icon>
                <span class="subheading mr-2"> {{ $auth.user.created }} </span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>

        <v-list flat>
          <v-list-item link to="/" class="mb-2" @click="sheet = !sheet">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('menu.home') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/about" class="my-2" @click="sheet = !sheet">
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('menu.about') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/contacts" class="my-2" @click="sheet = !sheet">
            <v-list-item-icon>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('menu.contacts') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-group no-action prepend-icon="mdi-translate">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('menu.translations') }}
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="locale in locales"
              :key="locale.code"
              @click.prevent.stop="toggleLang(locale.code)"
            >
              <v-list-item-icon>
                <v-icon>mdi-web</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t(`locale.${locale.name}`) }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item link class="my-2" @click.prevent="toggleDarkMode">
            <v-list-item-icon>
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('menu.theme') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset />

          <v-list-item link @click="toggleExit()">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('menu.exit') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>
  </v-app-bar>
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
