import { Auth, Logger } from 'aws-amplify';
import { store } from '@/store';

const logger = new Logger('set-local-user route guard');

export default function (to, from, next) {
  // Auth.currentAuthenticatedUser function doesn't make a request
  // to servers, it's safe to call it on every route
  Auth.currentAuthenticatedUser()
    .then((user) => {
      // If local user is found and not exists in vuex - add it
      // and fetch attributes (fetching attributes in store action)
      if (!store.getters.user) {
        store
          .dispatch('setUser', user)
          .then(() => next())
          .catch(err => logger.error(err));
      } else next(); // If user already in store - just proceed further
    })
    .catch(() => next()); // not authenticated
}
