<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    :width="width"
    max-width="800"
  >
    <v-card>
      <v-card-title>
        <v-icon large left> {{ icon }} </v-icon>
        <span class="headline font-weight-light">{{ title }}</span>
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="onSubmit"
          >
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  required
                  clearable
                  type="text"
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account-outline"
                  v-model.trim="item.name"
                  :rules="nameRules"
                />

                <v-text-field
                  required
                  clearable
                  type="email"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email-outline"
                  v-model.trim="item.email"
                  :rules="emailRules"
                />

                <v-text-field
                  required
                  clearable
                  type="text"
                  label="Phone"
                  name="phone"
                  prepend-icon="mdi-phone-outline"
                  v-model.trim="item.phone"
                  :rules="phoneRules"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  required
                  clearable
                  type="text"
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account-circle-outline"
                  v-model.trim="item.login"
                  :rules="loginRules"
                />
                <v-switch
                  v-model="item.active"
                  :label="`Account active: ${item.active.toString()}`"
                ></v-switch>
                <v-switch
                  v-model="item.isAdmin"
                  :label="`Account is admin: ${item.isAdmin.toString()}`"
                ></v-switch>

                <v-select
                  dense
                  label="Role"
                  prepend-icon="mdi-shield-account-outline"
                  :items="['1', '2', '3']"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  dense
                  name="comment"
                  label="Comment"
                  hint="Comment text"
                  rows="3"
                  prepend-icon="mdi-comment-text-outline"
                  v-model.trim="item.comment"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'mdi-information-outline'
    },
    title: {
      type: String,
      default: 'User item'
    },
    dialog: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      valid: false,
      item: {
        name: 'Frozen Yogurt',
        email: 'sdfs@.sdf.rud',
        phone: '+35855445558',
        comment: 'dskfjgksdjg ksdfgjgh ldskgjf',
        active: true,
        isAdmin: false,
        role: 'admin',
        login: 'root',
        password: 'kjdsfhgkdsjgfhk'
      },
      nameRules: [(v) => !!v || 'Name is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        (v) => !!v || 'Phone is required',
        (v) =>
          /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(v) ||
          'Phone must be valid'
      ],
      loginRules: [(v) => !!v || 'Login is required'],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 6 && v.length <= 21) ||
          'Password must be equal or more than 6 characters'
      ]
    };
  },
  methods: {
    save() {
      this.$emit('update:dialog', false);
    },
    close() {
      this.$emit('update:dialog', false);
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          email: this.email,
          login: this.login,
          password: this.password
        };
        try {
          await this.$axios.$post('/api/v1/auth/signup', {
            ...user
          });
          this.$refs.form.reset();
          this.$toast.success('Authentication passed! Sign In Application.');
          this.$router.push('/auth/signin');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>
