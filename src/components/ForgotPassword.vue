<template>
  <div>
    <h2>Forgot password?</h2>

    <h3>Step 1</h3>
    <form @submit.prevent="forgotPassword">
      <div>
        <label>Email</label>
        <input
          v-model="username"
          autocomplete="email"
          type="email">
      </div>
      <button type="submit">Submit</button>
    </form>

    <h3>Step 2</h3>
    <form @submit.prevent="forgotPasswordSubmit">
      <div>
        <label>Code from email</label>
        <input
          v-model="code"
          type="text">
      </div>
      <div>
        <label>New password</label>
        <input
          v-model="newPassword"
          type="password"
          autocomplete="new-password">
      </div>
      <button type="submit">
        Submit
      </button>
    </form>

  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('Forgot Password component');

export default {
  data() {
    return {
      username: '',
      code: '',
      newPassword: '',
    };
  },

  methods: {
    forgotPassword() {
      Auth.forgotPassword(this.username)
        .then(() => alert('Email with code has been sent'))
        .catch(err => logger.error('forgotPassword method', err));
    },

    forgotPasswordSubmit() {
      Auth.forgotPasswordSubmit(this.username, this.code, this.newPassword)
        .then(() => {
          alert('Success! Login with your new password.');
          this.$router.push({ name: 'Sign In' });
        })
        .catch(err => logger.error('forgotPasswordSubmit method', err));
    },
  },
};
</script>
