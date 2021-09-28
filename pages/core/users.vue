<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          itemsPerPageOptions: [5, 10, 15, -1],
          itemsPerPageText: 'Rows per users:',
          showFirstLastPage: true,
          showCurrentPage: true
        }"
        loading-text="Loading... Please wait"
        no-data-text="No data available"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-icon large left> mdi-account-supervisor-outline </v-icon>
            <v-toolbar-title> List of users </v-toolbar-title>
            <v-spacer />

            <v-responsive max-width="260" class="mr-2">
              <v-text-field
                flat
                dense
                rounded
                clearable
                hide-details
                solo-inverted
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search in users"
                class="ma-0"
              />
            </v-responsive>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-on="on"
                  v-bind="attrs"
                  @click="dialog = !dialog"
                  class="mx-2"
                >
                  <v-icon> mdi-account-plus-outline </v-icon>
                </v-btn>
              </template>
              <span> Create account </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
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

            <v-dialog v-model="dialog" max-width="600px">
              <v-card>
                <v-card-title>
                  <v-icon large left> mdi-account-circle-outline </v-icon>
                  <span class="text-h5"> {{ formTitle }} </span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="User name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.email"
                          label="User email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.login"
                          label="User login"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.role"
                          label="User role"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-switch
                          flat
                          inset
                          dense
                          label="Activated account"
                          color="success"
                          v-model="editedItem.isActive"
                        ></v-switch>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-switch
                          flat
                          inset
                          dense
                          label="Admin account"
                          color="success"
                          v-model="editedItem.isAdmin"
                        ></v-switch>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="close"> Cancel </v-btn>
                  <v-btn text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="300px">
              <v-card>
                <v-card-title>
                  Are you sure you want to delete this item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="deleteItemConfirm"> OK </v-btn>
                  <v-btn text @click="closeDelete"> Cancel </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <v-icon left> mdi-account-circle-outline </v-icon>
          <span> {{ item.name }} </span>
        </template>

        <template v-slot:[`item.email`]="{ item }">
          <v-icon left> mdi-email-outline </v-icon>
          <span> {{ item.email }} </span>
        </template>

        <template v-slot:[`item.login`]="{ item }">
          <v-icon left> mdi-account-outline </v-icon>
          <span> {{ item.login }} </span>
        </template>

        <template v-slot:[`item.isActive`]="{ item }">
          <v-switch
            flat
            inset
            dense
            disabled
            color="success"
            v-model="item.isActive"
          />
        </template>

        <template v-slot:[`item.isAdmin`]="{ item }">
          <v-switch
            flat
            inset
            dense
            disabled
            color="success"
            v-model="item.isAdmin"
          />
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            icon
            small
            class="mr-2"
            color="green lighten-1"
            @click="editItem(item)"
          >
            <v-icon small> mdi-eye-outline </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2"
            color="blue lighten-1"
            @click="editItem(item)"
          >
            <v-icon small> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2"
            color="red lighten-1"
            @click="deleteItem(item)"
          >
            <v-icon small> mdi-trash-can-outline </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  layout: 'apps',

  async asyncData({ store }) {
    const users = await store.dispatch('api/getUsers');
    return { users };
  },

  data() {
    return {
      search: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
          sortable: true
        },
        {
          text: 'Email',
          align: 'start',
          value: 'email',
          sortable: false
        },
        { text: 'Login', value: 'login', sortable: false },
        { text: 'Role', value: 'role', sortable: true },
        { text: 'Active', value: 'isActive', sortable: false },
        { text: 'Admin', value: 'isAdmin', sortable: false },
        { text: '', value: 'actions', align: 'center', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        login: '',
        role: '',
        isActive: false,
        isAdmin: false
      },
      defaultItem: {
        name: '',
        email: '',
        login: '',
        role: '',
        isActive: false,
        isAdmin: false
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New account' : 'Edit account';
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  methods: {
    async getUsers() {
      this.users = await this.$store.dispatch('api/getUsers');
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      //   this.editedItem = Object.assign({}, item);

      await this.$store.dispatch('api/removeUsers', {
        id: this.users[this.editedIndex].id
      });

      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        await this.$store.dispatch('api/createUsers', this.editedItem);
        await this.getUsers();
      }
      this.close();
    }
  }
};
</script>
