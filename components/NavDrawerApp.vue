<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant="false" width="360">
    <NavDrawerMini :app="false" :absolute="true" :drawer="drawer" />

    <template v-slot:prepend>
      <v-sheet height="128" width="100%">
        <v-list three-line class="pl-14">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon large>{{ currentPage.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="body-1 text-uppercase font-weight-bold">
                {{ currentPage.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ currentPage.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </template>

    <v-list subheader two-line flat class="pl-14">
      <v-subheader>Application</v-subheader>
      <v-list-item-group>
        <v-list-item
          link
          v-for="(item, i) in appLinks"
          :key="i"
          :to="item.href"
        >
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

    <v-list subheader two-line flat class="pl-14">
      <v-subheader>Administrations</v-subheader>
      <v-list-item-group>
        <v-list-item
          link
          v-for="(item, i) in boardLinks"
          :key="i"
          :to="item.href"
        >
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
    }
  },
  data() {
    return {};
  },
  computed: {
    appLinks() {
      return this.$store.state.app.links;
    },
    boardLinks() {
      return this.$store.state.core.links;
    },
    currentPage() {
      const links = [
        ...this.$store.state.app.links,
        ...this.$store.state.core.links
      ];
      const filter = links.find((item) => item.href === this.$route.fullPath);
      return filter
        ? filter
        : {
            icon: 'mdi-apps',
            title: this.$store.state.app.short_name,
            subtitle: this.$store.state.app.description
          };
    }
  },
  methods: {
    // watch: {
    //   drawer(value) {
    //     return value;
    //   }}
  }
};
</script>

<style scoped>
.theme--dark.v-navigation-drawer {
  background-color: #252526 !important;
}
</style>
