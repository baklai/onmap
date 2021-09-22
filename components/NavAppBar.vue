<template>
  <v-app-bar app clipped-right flat height="72">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {};
  },
  watch: {
    drawer(value) {
      return value;
    }
  }
};
</script>
