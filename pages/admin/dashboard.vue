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

  layout: 'administration',

  async asyncData({ $axios }) {
    const { data: users } = await $axios.get('users', {});
    return { users };
  },

  data() {
    return {};
  },

  methods: {
    async getUsers() {
      const { data: users } = await this.$axios.get('users', {});
      this.users = users;
    },
    editItem(item) {
      // this.editedIndex = this.items.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialog = true;
    },

    deleteItem(item) {
      // this.editedIndex = this.items.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.items.splice(this.editedIndex, 1);
      // this.closeDelete();
    },

    close() {
      // this.dialog = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
    },

    closeDelete() {
      // this.dialogDelete = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // });
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.items[this.editedIndex], this.editedItem);
      // } else {
      //   this.items.push(this.editedItem);
      // }
      // this.close();
    }
  }
};
</script>

<style scoped>
.v-list.list-users {
  height: 360px;
  overflow-y: auto;
}
</style>
