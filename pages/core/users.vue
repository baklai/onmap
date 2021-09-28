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
        :loading="false"
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

            <v-dialog v-model="dialog" persistent scrollable max-width="600px">
              <v-card>
                <v-card-title>
                  <v-icon large left> mdi-account-circle-outline </v-icon>
                  <span class="text-h5"> {{ modalFormTitle }} </span>
                  <v-spacer />
                  <v-btn icon @click="close">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form
                      ref="dialogForm"
                      lazy-validation
                      @submit.prevent="save()"
                    >
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            required
                            clearable
                            type="text"
                            label="User name"
                            :rules="rules.name"
                            v-model.trim="editedItem.name"
                            prepend-icon="mdi-account-circle-outline"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            required
                            clearable
                            type="email"
                            label="User email"
                            :rules="rules.email"
                            v-model.trim="editedItem.email"
                            prepend-icon="mdi-email-outline"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            required
                            clearable
                            type="text"
                            label="User login"
                            :rules="rules.login"
                            v-model.trim="editedItem.login"
                            prepend-icon="mdi-account-circle-outline"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            required
                            clearable
                            label="User password"
                            prepend-icon="mdi-lock-outline"
                            :type="showeye ? 'text' : 'password'"
                            :rules="rules.password"
                            v-model.trim="editedItem.password"
                            :counter="21"
                            :append-icon="
                              showeye
                                ? 'mdi-eye-outline'
                                : 'mdi-eye-off-outline'
                            "
                            @click:append="showeye = !showeye"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-switch
                            flat
                            inset
                            dense
                            color="success"
                            label="Activated account"
                            v-model="editedItem.isActive"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            dense
                            required
                            label="User role"
                            :rules="rules.role"
                            v-model="editedItem.role"
                            prepend-icon="mdi-account-key-outline"
                            :items="['anonymous', 'user', 'moderator', 'admin']"
                          />
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-switch
                            flat
                            inset
                            dense
                            color="success"
                            label="Admin account"
                            v-model="editedItem.isAdmin"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
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

        <template v-slot:[`item.role`]="{ item }">
          <v-chip
            outlined
            small
            :color="item.role === 'admin' ? 'success' : 'default'"
          >
            {{ item.role }}
          </v-chip>
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
            @click="editItem(item.id)"
          >
            <v-icon small> mdi-eye-outline </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2"
            color="blue lighten-1"
            @click="editItem(item.id)"
          >
            <v-icon small> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2"
            color="red lighten-1"
            @click="deleteItem(item.id)"
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
    const users = await store.dispatch('rest-api/users/findAll');
    return { users };
  },

  data() {
    return {
      search: null,
      dialog: false,
      dialogDelete: false,
      showeye: false,
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
      editedIndex: null,
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
      },

      rules: {
        name: [(v) => !!v || 'User name is required'],
        login: [(v) => !!v || 'User login is required'],
        email: [
          (v) => !!v || 'User email is required',
          (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'E-mail must be valid'
        ],
        password: [
          (v) => !!v || 'Password is required',
          (v) =>
            (v && v.length >= 4 && v.length <= 21) ||
            'Password must be equal or more than 4 characters'
        ],
        role: [(v) => !!v || 'User role is required']
      }
    };
  },

  computed: {
    modalFormTitle() {
      return this.editedIndex ? 'Edit current account' : 'Create new account';
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
      this.users = await this.$store.dispatch('rest-api/users/findAll');
      this.$toast.success('Users list is updated!');
    },

    async editItem(id) {
      this.editedIndex = id;
      const item = await this.$store.dispatch('rest-api/users/findOne', { id });
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(id) {
      this.editedIndex = id;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.$store.dispatch('rest-api/users/removeOne', {
        id: this.editedIndex
      });
      this.$toast.success('User is removed!');
      this.editedIndex = null;
      this.closeDelete();
      await this.getUsers();
    },

    close() {
      this.dialog = false;
      this.$refs.dialogForm.reset();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = null;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = null;
      });
    },

    async save() {
      if (this.$refs.dialogForm.validate()) {
        if (this.editedIndex) {
          await this.$store.dispatch('rest-api/users/updateOne', {
            id: this.editedIndex,
            user: this.editedItem
          });
          this.$toast.success('User is updated!');
        } else {
          await this.$store.dispatch(
            'rest-api/users/createOne',
            this.editedItem
          );
          this.$toast.success('User is created!');
        }
        this.close();
        this.$refs.dialogForm.reset();
        await this.getUsers();
      }
    }
  }
};
</script>
