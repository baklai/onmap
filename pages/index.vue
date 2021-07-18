<template>
  <v-container fill-height fluid>
    <AppSidebar />
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="4" md="5" sm="8" xs="8" align="center">
        <v-card-text>
          <AppLogo />
          <h1 class="blue-grey--text text--darken-1 text-center">
            Online Network Mapper
          </h1>
          <p
            class="
              blue-grey--text
              text--darken-1 text-center text-center
              caption
              ma-6
            "
          >
            ONMAP («Online Network Mapper») - web application for network
            exploration and security auditing.
          </p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'redirecthome',
  data() {
    return {};
  }
};
</script>
