<template>
  <header>
    <ul>
      <li>
        <span v-if="$user">
          Authenticated as {{ $user.attributes.name || $user.attributes.email }}
        </span>
        <span v-else>Not Authenticated</span>
      </li>
      <li><router-link :to="{ name: 'Sign In' }">Sign In (only unauthenticated)</router-link></li>
      <li><router-link :to="{ name: 'Sign Up' }">Sign Up (only unauthenticated)</router-link></li>
      <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'Profile' }">Profile (only authenticated)</router-link></li>
      <li><button @click="signOut">Sign Out</button> (only authenticated)</li>
    </ul>
  </header>
</template>

<script>
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('Header component');

export default {
  methods: {
    signOut() {
      if (!this.$user) return;
      Auth.signOut()
        .then(() => {
          this.$store.commit('clearUser');
          this.$router.push({ name: 'Home' });
        })
        .catch(err => logger.error(err));
    },
  },
};
</script>
