import api from '@/api/auth';
import { setItem } from '@/helpers/percistanceStorage';

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: {},
  validationsError: null,
  isLoggedIn: null,
};
const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.validationsError = null;
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  registerFailure(state, payload) {
    state.isSubmitting = false;
    state.validationsError = payload;
  },

  loginStart(state) {
    state.isSubmitting = true;
  },
  loginSuccess(state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  loginFailure(state, payload) {
    state.isSubmitting = false;
    state.validationsError = payload;
  },

  resetValidationsError() {
    state.validationsError = null;
  },
  getCurrentUserStart(state) {
    state.isLoading = true;
    state.isLoggedIn = null;
  },
  getCurrentUserSuccess(state, payload) {
    state.currentUser = payload;
    state.isLoading = false;
    state.isLoggedIn = true;
  },
  getCurrentUserFailure(state, payload) {
    state.validationsError = payload;
    state.isLoading = false;
    state.isLoggedIn = false;
  },
  logout(state) {
    state.isLoading = false;
    state.isLoggedIn = false;
  },
};

const actions = {
  register({ commit }, credentials) {
    return new Promise((resolve) => {
      commit('registerStart');
      api
        .register(credentials)
        .then((response) => {
          commit('registerSuccess', response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve();
        })
        .catch((result) => {
          commit('registerFailure', result.response.data.errors);
          reject();
        });
    });
  },

  login({ commit }, credentials) {
    return new Promise((resolve) => {
      commit('loginStart');
      api
        .login(credentials)
        .then((response) => {
          commit('loginSuccess', response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          commit('loginFauilure', result.response.data.user.errors);
          reject();
        });
    });
  },

  getCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      commit('getCurrentUserStart');
      api
        .getCurrentUser()
        .then((response) => {
          commit('getCurrentUserSuccess', response.data.user);
          resolve();
        })
        .catch((result) => {
          commit('getCurrentUserFailure', result.response.data.errors);
          reject();
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      setItem('accessToken', '');
      commit('logout');
      resolve();
    });
  },
};

const getters = {
  currentUser(state) {
    return state.currentUser;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
