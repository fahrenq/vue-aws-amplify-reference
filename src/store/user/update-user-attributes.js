import { Auth } from 'aws-amplify';

export default function updateUserAttributes({ getters, commit }, payload) {
  // Will use this 'newAttributes' only if remote update was successful,
  const newAttributes = Object.assign({}, getters.user.attributes, payload);

  // Catch exceptions when dispatching this action
  return (
    Auth.currentAuthenticatedUser()
      // Pass only changed attributes to remote attributes update methods
      .then(user => Auth.updateUserAttributes(user, payload))
      // Update local with changes if server respond with success
      .then(() => commit('setUserAttributes', newAttributes))
  );
}
