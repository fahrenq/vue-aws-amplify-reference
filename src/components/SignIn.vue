<template>
  <div>

    <h2>Sign In</h2>

    <form @submit.prevent="signIn">

      <!-- Email -->
      <div>
        <label>Email</label>
        <input
          v-model="credentials.username"
          autocomplete="email"
          type="email">
      </div>

      <!-- Password -->
      <div>
        <label>Password</label>
        <input
          v-model="credentials.password"
          autocomplete="current-password"
          type="password">
      </div>

      <button type="submit">Sign In</button>

    </form>

    <router-link :to="{ name: 'Sign Up' }">
      Sign Up
    </router-link>
    |
    <router-link :to="{ name: 'Forgot Password' }">
      Forgot Password?
    </router-link>

  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('Sign In component');

export default {
  name: 'SignIn',

  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    };
  },

  methods: {
    signIn() {
      const { username, password } = this.credentials;

      Auth.signIn(username, password)
        .then((user) => {
          this.$store.dispatch('setUser', user).then(() => {
            this.$router.push({ name: 'Home' });
          });
        })
        .catch((err) => {
          logger.debug(err);
        });
    },
  },
};
</script>

