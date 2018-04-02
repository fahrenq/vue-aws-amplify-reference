import Amplify from 'aws-amplify';

import Vue from 'vue';
import App from './App';
import router from './router';
import { store } from './store';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:b8bab8ee-9c52-4a28-876a-5afe66ed84c3',
    region: 'us-east-1',
    userPoolId: 'us-east-1_iKDEc0ksV',
    userPoolWebClientId: '6rmq3kmhn0ecr6dgamoaenu3ds',
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
