import api from "@/api/profile";

const state = {
  profile: {},
  isLoading: false,
};
const mutations = {
  getProfileStart(state) {
    state.isLoading = true;
  },
  getProfileSuccess(state, payload) {
    state.isLoading = false;
    state.profile = payload;
  },
  getProfileFailure(state) {
    state.isLoading = false;
  },

  followStart(state) {
    state.isLoading = true;
  },
  followSuccess(state) {
    state.isLoading = false;
    state.profile.following = !state.profile.following;
  },
  followFailure(state) {
    state.isLoading = false;
  },

  unfollowStart(state) {
    state.isLoading = true;
  },
  unfollowSuccess(state) {
    state.isLoading = false;
    state.profile.following = !state.profile.following;
  },
  unfollowFailure(state) {
    state.isLoading = false;
  },
};
const actions = {
  getProfile({ commit }, slug) {
    return new Promise((resolve) => {
      commit("getProfileStart");
      api
        .getProfile(slug)
        .then((response) => {
          commit("getProfileSuccess", response.data.profile);
          resolve(response.data.profile);
        })
        .catch((result) => {
          console.log("errors from profile", result.response);
        });
    });
  },
  follow({ commit }, slug) {
    return new Promise((resolve) => {
      commit("followStart");
      api
        .follow(slug)
        .then((response) => {
          commit("followSuccess", response.data.profile);
          resolve();
        })
        .catch((result) => {
          commit("followFailure");
          console.log("errors from profile", result.response);
        });
    });
  },

  unfollow({ commit }, slug) {
    return new Promise((resolve) => {
      commit("unfollowStart");
      api
        .unfollow(slug)
        .then((response) => {
          commit("unfollowSuccess", response.data.profile);
          resolve();
        })
        .catch((result) => {
          commit("unfollowFailure");
          console.log("errors from profile", result.response);
        });
    });
  },
};

const getters = {
  profile(state) {
    return state.profile;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
