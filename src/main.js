import Amplify from 'aws-amplify';

import Vue from 'vue';
import App from './App';
import router from './router';
import { store } from './store';

Amplify.configure({
  Auth: {
    identityPoolId: 'eu-central-1:59c2082d-d91b-40a0-9269-6e5072dd99a3',
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_Yesjw0oXK',
    userPoolWebClientId: '1dcqvn8sqg6toq0v59b4toi092',
  },
  Analytics: {
    disabled: true,
  },
});

Vue.config.productionTip = false;

Vue.mixin({
  computed: {
    $user() {
      return store.getters.user;
    },
  },
});

Amplify.Logger.LOG_LEVEL = 'DEBUG';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // CognitoUser initialization code is in a router guard.
  // If we initialize user in created() we won't be able to
  // render page with v-if="user.attribute" without
  // changin "user.attributes" when client alreay sees
  // rendered page.
  // Problem described above is also true for headers and
  // everything outside main <router-view> (in App.vue)
});
