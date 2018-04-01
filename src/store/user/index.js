import setUser from './set-user';
import updateUserAttributes from './update-user-attributes';

export default {
  state: {
    user: null,
  },

  getters: {
    user(state) {
      return state.user;
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setUserAttributes(state, payload) {
      state.user.attributes = payload;
    },

    userLoaded(state) {
      state.user.loading = false;
    },

    clearUser(state) {
      state.user = null;
    },
  },

  actions: {
    setUser,
    updateUserAttributes,
  },
};
