<template>
  <v-container>
    <AppLogo />
    <v-card flat tile class="text-center">
      <v-card-text>
        <h1 class="blue-grey--text text--darken-1 text-center">
          {{ appName }}
        </h1>
        <p class="blue-grey--text text--darken-1 text-center ma-6">
          {{ appShortName }} («{{ appName }}») - {{ appDescription }}
        </p>

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
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    appName() {
      return this.$store.state.app.name;
    },
    appShortName() {
      return this.$store.state.app.short_name;
    },
    appDescription() {
      return this.$store.state.app.description;
    },
    socialLinks() {
      return this.$store.state.social;
    },
    copyright() {
      return this.$store.getters.copyright;
    }
  }
};
</script>
