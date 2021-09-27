<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant="false" width="360">
    <NavDrawerMini :app="false" :absolute="true" />

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
      <v-subheader>{{ subheader }}</v-subheader>
      <v-list-item-group>
        <v-list-item link v-for="(item, i) in links" :key="i" :to="item.href">
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
      <v-subheader>Administration</v-subheader>
      <v-list-item-group>
        <v-list-item
          link
          v-for="(item, i) in coreLinks"
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
    subheader: {
      type: String,
      default: 'Application'
    },
    links: {
      type: Array,
      default: []
    },
    currentPage: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    coreLinks() {
      return this.$store.state.core.links;
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

<style scoped>
.theme--dark.v-navigation-drawer {
  background-color: #252526 !important;
}
</style>
