<template>
  <v-container>
    <AppLogo />
    <v-card flat tile class="text-center">
      <v-card-text>
        <h1 class="blue-grey--text text--darken-1 text-center">
          Online Network Mapper
        </h1>
        <p class="blue-grey--text text--darken-1 text-center ma-6">
          ONMAP («Online Network Mapper») - Web application for network
          exploration and security auditing.
        </p>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <span>
        Copyright &copy; {{ new Date().getFullYear() }} Dmitrii Baklai
      </span>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
  })
};
</script>
