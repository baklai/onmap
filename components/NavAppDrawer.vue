<template>
  <v-navigation-drawer :mini-variant="false" v-model="drawer" app width="380">
    <NavDrawerMini :app="false" :absolute="true" :drawer="drawer" />
    <v-sheet height="128" width="100%">
      <v-list three-line class="pl-14">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon large>{{ page().icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="body-1 text-uppercase font-weight-bold">
              {{ page().title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ page().subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>

    <v-list subheader two-line flat class="pl-14">
      <v-subheader>ONMAP Pages</v-subheader>
      <v-list-item-group>
        <v-list-item link v-for="(item, i) in pages" :key="i" :to="item.href">
          <v-list-item-avatar>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }} </v-list-item-title>
            <v-list-item-subtitle> {{ item.subtitle }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
    },
    pages: {
      type: Array,
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
    page: function () {
      console.log(this.pages);
      const dd = this.pages.find((item) => item.href === this.$route.fullPath);
      console.log(dd);
      return dd;
    },

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
  background-color: #252526 !important;
}
</style>
