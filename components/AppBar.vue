<template>
  <v-app-bar app top fixed dense flat v-if="!drawer">
    <router-link to="/">
      <v-avatar size="32px" class="d-block text-center mx-auto mr-2">
        <img :src="require('~/static/icon.png')" alt="app-logo" />
      </v-avatar>
    </router-link>

    <v-toolbar-title>Cyr To Lat</v-toolbar-title>

    <v-spacer />

    <v-btn icon :ripple="false" @click.prevent="toggleDarkMode">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>

    <v-app-bar-nav-icon
      :ripple="false"
      @click="sheet = !sheet"
    ></v-app-bar-nav-icon>

    <v-bottom-sheet v-model="sheet" fullscreen>
      <v-sheet height="100%">
        <v-toolbar dense flat outlined>
          <v-avatar size="32px" class="d-block text-center mx-auto mr-2">
            <img :src="require('~/static/icon.png')" alt="app-logo" />
          </v-avatar>

          <v-toolbar-title>Cyr To Lat</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon :ripple="false" @click="sheet = !sheet">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
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
    return {};
  }
};
</script>
