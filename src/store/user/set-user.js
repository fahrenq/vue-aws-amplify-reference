import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('setUser action');

function constructUserObject(cognitoUser) {
  if (cognitoUser.constructor.name !== 'CognitoUser') {
    logger.error('Pass object from CognitoUser constructor.');
    return undefined;
  }

  const { signInUserSession: session } = cognitoUser;

  return {
    username: cognitoUser.username,
    attributes: {},
    tokens: {
      IdToken: session.getIdToken().getJwtToken(),
      AccessToken: session.getAccessToken().getJwtToken(),
      RefreshToken: session.getRefreshToken().getToken(),
    },
  };
}

export default function setUser({ commit }, user) {
  commit('setUser', constructUserObject(user));
  return Auth.currentUserInfo().then(({ attributes }) => {
    logger.debug('attributes fetched from server', attributes);
    commit('setUserAttributes', attributes);
  });
}
