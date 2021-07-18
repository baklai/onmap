<template>
  <v-container fill-height fluid>
    <AppSidebar />
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="4" md="5" sm="8" xs="8" align="center">
        <v-card-text>
          <app-logo />
          <h1 class="blue-grey--text text--darken-1 text-center ml-4">
            Online Network Mapper
          </h1>
          <p class="text-center caption ml-4 mt-4">
            Please enter your login and password to <br />
            sign in the application
          </p>
          <v-form
            ref="signinForm"
            v-model="valid"
            lazy-validation
            @submit.prevent="onSubmit"
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
              :rules="loginRules"
              @keypress.enter="onSubmit"
              v-disabled-icon-focus
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
              :rules="passwordRules"
              @click:append="showeye = !showeye"
              v-disabled-icon-focus
              @keypress.enter="onSubmit"
            />
          </v-form>
        </v-card-text>
        <div class="text-center mt-3">
          <v-btn @click="onSubmit" dark rounded color="#546e7a">
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
      showeye: false,
      valid: false,
      login: '',
      password: '',
      loginRules: [(v) => !!v || 'Login is required'],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 4 && v.length <= 21) ||
          'Password must be equal or more than 6 characters'
      ]
    };
  },
  directives: {
    disabledIconFocus: {
      bind(element) {
        element
          .querySelectorAll('.v-input__icon button')
          .forEach((item) => item.setAttribute('tabindex', -1));
      }
    }
  },
  methods: {
    async onSubmit() {
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

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: none;
  box-shadow: transparent;
  -webkit-text-fill-color: #0077ff;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
