<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.v-main {
  background-image: url('/img/bg-app.png') !important;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.v-btn::before {
  background-color: transparent !important;
}

.v-btn--active.no-active::before {
  background-color: transparent !important;
  opacity: 0 !important;
}

.v-input .v-label {
  height: unset !important;
  line-height: unset !important;
}
</style>
