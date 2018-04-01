import { Auth } from 'aws-amplify';

export default function (to, from, next) {
  Auth.currentAuthenticatedUser()
    .then(() => next())
    .catch(() => next({ name: 'Sign In' }));
}
