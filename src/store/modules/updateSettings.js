import api from '@/api/settings';

const state = {
  user: {},
  isLoading: false,
};
const mutations = {
  updateSettingsStart(state) {
    state.isLoading = true;
  },
  updateSettingsSuccess(state, payload) {
    state.isLoading = true;
    state.user = payload;
  },
  updateSettingsFailure(state) {
    state.isLoading = true;
  },
};
const actions = {
  updateSettings({ commit }, user) {
    return new Promise((resolve) => {
      commit('updateSettingsStart');
      api
        .updateSettings(user)
        .then((response) => {
          commit('updateSettingsSuccess', response.data.user);
          resolve(response.data.user);
        })
        .catch((result) => {
          console.log('errors from update settings', result.response.data);
          commit('updateSettingsFailure');
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
