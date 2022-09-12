import login from '@/api/login';

const state = {
  isSubmitting: false,
  isLoggedIn: false,
  validationErrors: null,
  currentUser: null,
};
const mutations = {
  loginStart(state) {
    state.isSubmitting = true;
  },
  loginSuccess(state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  loginFailure(state, payload) {
    state.validationErrors = payload;
  },
  resetLoginErrors() {
    state.validationErrors = null;
    state.isSubmitting = false;
  },
};
const actions = {
  login({ commit }, credentials) {
    return new Promise((resolve) => {
      commit('loginStart');
      login
        .login(credentials)
        .then((response) => {
          commit('loginSuccess', response.data.user);
          resolve(response);
        })
        .catch((result) => {
          commit('loginFailure', result.response.data.errors);
          console.log('errors from login', result.response.data.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
