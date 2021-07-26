<template>
  <v-container>
    <AppSidebar />
    <v-row>
      <v-col cols="6">
        <v-card max-width="600" class="mx-auto">
          <v-toolbar>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>List of users</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  icon
                  small
                  v-on="on"
                  v-bind="attrs"
                  @click="getUsers"
                  class="mx-2"
                >
                  <v-icon> mdi-cached </v-icon>
                </v-btn>
              </template>
              <span> Update list </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  icon
                  small
                  v-on="on"
                  v-bind="attrs"
                  @click="getUsers"
                  class="mx-2"
                >
                  <v-icon large> mdi-plus-circle-outline </v-icon>
                </v-btn>
              </template>
              <span> Create User </span>
            </v-tooltip>
          </v-toolbar>

          <v-list subheader three-line>
            <v-subheader>User Controls</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Content filtering</v-list-item-title>
                <v-list-item-subtitle
                  >Set the content filtering level to restrict appts that can be
                  downloaded</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list dense subheader three-line class="list-users">
            <v-list-item v-for="item in users" :key="item._id">
              <v-list-item-avatar>
                <v-icon class="grey lighten-1" dark>
                  mdi-account-outline
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <strong>
                    {{ item.login }}
                  </strong>

                  <v-chip
                    x-small
                    class="mx-1"
                    :color="item.isActive ? 'success' : ''"
                  >
                    {{ item.isActive ? 'Active' : 'Disabled' }}
                  </v-chip>

                  <v-chip
                    x-small
                    class="mx-1"
                    :color="item.isAdmin ? 'primary' : ''"
                  >
                    {{ item.isAdmin ? 'Admin' : 'not admin' }}
                  </v-chip>
                </v-list-item-title>

                <v-list-item-subtitle>
                  Name: {{ item.name }} <br />
                  E-mail: {{ item.email }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>
                  {{ item.created }}
                </v-list-item-action-text>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card max-width="600" class="mx-auto">
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal first name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="[
                      'Skiing',
                      'Ice hockey',
                      'Soccer',
                      'Basketball',
                      'Hockey',
                      'Reading',
                      'Writing',
                      'Coding',
                      'Basejump'
                    ]"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],

  async asyncData({ $axios }) {
    const { data: users } = await $axios.get('users', {});

    console.log(users);

    return { users };
  },

  data() {
    return {};
  },

  methods: {
    async getUsers() {
      const { data: users } = await this.$axios.get('users', {});

      console.log(users);

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
