<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="4" md="5" sm="8" xs="8" align="center">
        <v-card-text>
          <app-logo />
          <h1 class="blue-grey--text text--darken-1 text-center ml-4">
            {{ appName }}
          </h1>
          <p class="text-center caption ml-4 mt-4">
            Please enter your login and password to <br />
            sign in the application
          </p>
          <v-form
            ref="signinForm"
            lazy-validation
            @submit.prevent="onSignin"
            class="ml-5 mr-5"
          >
            <v-text-field
              required
              clearable
              type="text"
              label="Login"
              name="login"
              prepend-icon="mdi-account-circle-outline"
              color="blue darken-1"
              class="mt-6 mb-6"
              v-model.trim="login"
              :rules="rules.login"
              @keypress.enter="onSignin"
            />
            <v-text-field
              required
              label="Password"
              name="password"
              prepend-icon="mdi-lock-outline"
              color="blue darken-1"
              :type="showeye ? 'text' : 'password'"
              :append-icon="showeye ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              class="mt-6 mb-6"
              :counter="21"
              v-model.trim="password"
              :rules="rules.password"
              @click:append="showeye = !showeye"
              @keypress.enter="onSignin"
            />
          </v-form>
        </v-card-text>
        <div class="text-center mt-3">
          <v-btn @click="onSignin" dark rounded color="#546e7a">
            SIGN IN
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      rules: {
        login: [(v) => !!v || 'Login is required'],
        password: [
          (v) => !!v || 'Password is required',
          (v) =>
            (v && v.length >= 4 && v.length <= 21) ||
            'Password must be equal or more than 4 characters'
        ]
      },
      showeye: false
    };
  },

  computed: {
    appName() {
      return this.$store.state.app.name;
    }
  },

  methods: {
    async onSignin() {
      if (this.$refs.signinForm.validate()) {
        try {
          const user = {
            login: this.login,
            password: this.password
          };
          await this.$auth.loginWith('local', {
            data: { ...user }
          });
          this.$refs.signinForm.reset();
          this.$toast.success('Authorization passed!');
        } catch (err) {
          this.$toast.error(err.response.data.message);
        }
      }
    }
  }
};
</script>
