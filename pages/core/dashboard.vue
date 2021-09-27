<template>
  <v-container>
    <v-card
      flat
      tile
      class="d-flex justify-space-around align-content-center flex-wrap"
    >
      <v-card class="ma-2" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">OVERLINE</div>
            <v-list-item-title class="text-h5 mb-1"> Users </v-list-item-title>
            <v-list-item-subtitle>
              Пользователи в системе
            </v-list-item-subtitle>
            <v-divider class="my-3" />
            Administrators: 5
          </v-list-item-content>

          <v-list-item-avatar tile>
            <v-icon x-large>mdi-account-supervisor-outline</v-icon>
          </v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  layout: 'apps',

  data() {
    return {};
  }
};
</script>
