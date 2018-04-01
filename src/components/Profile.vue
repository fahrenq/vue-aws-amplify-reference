<template>
  <div>
    <!-- Change attribute -->
    <h3>Change name</h3>
    <form @submit.prevent="updateName">
      <div>Current name: {{ $user.attributes.name }}</div>

      <div>
        <label>Name</label>
        <input type="text" v-model="newName">
      </div>

      <button type="submit">Save</button>
    </form>

    <hr>

    <h3>Change password</h3>
    <form @submit.prevent="changePassword">
      <div>
        <label>Old Password</label>
        <input type="password" v-model="oldPassword" autocomplete="current-password">
      </div>

      <div>
        <label>New Password</label>
        <input type="password" v-model="newPassword" autocomplete="new-password">
      </div>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('Profile component');

export default {
  data() {
    return {
      newName: '',

      oldPassword: '',
      newPassword: '',
    };
  },

  methods: {
    updateName() {
      this.$store
        .dispatch('updateUserAttributes', { name: this.newName })
        .then(() => alert('Name updated'))
        .catch(err => logger.error(err));
    },

    changePassword() {
      Auth.currentAuthenticatedUser()
        .then(user =>
          Auth.changePassword(user, this.oldPassword, this.newPassword),
        )
        .then(() => {
          alert('Password has been changed');
          this.oldPassword = '';
          this.newPassword = '';
        })
        .catch(err => logger.error(err));
    },
  },
};
</script>

<style scoped>

</style>
