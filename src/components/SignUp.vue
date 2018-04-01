<template>
  <div>

    <h2>Sign Up</h2>

    <form @submit.prevent="signUp">

      <!-- Email -->
      <div>
        <label>Email</label>
        <input
          v-model="credentials.username"
          autocomplete="email"
          type="email">
      </div>

      <!-- Name / other attributes -->
      <div>
        <label>Name</label>
        <input
          v-model="credentials.attributes.name"
          autocomplete="name"
          type="text">
      </div>

      <!-- Password -->
      <div>
        <label>Password</label>
        <input
          v-model="credentials.password"
          autocomplete="new-password"
          type="password">
      </div>

      <button type="submit">Sign Up</button>

    </form>

    <router-link :to="{ name: 'Sign In' }">Sign In</router-link>
  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('Sign Up component');

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        attributes: {
          name: '',
        },
      },
    };
  },

  methods: {
    signUp() {
      Auth.signUp(this.credentials)
        .then(() => {
          alert('Success! Please, confirm your email and sign in!');
          this.$router.push({ name: 'Sign In' });
        })
        .catch((err) => {
          logger.debug(err);
          alert(err);
        });
    },
  },
};
</script>
