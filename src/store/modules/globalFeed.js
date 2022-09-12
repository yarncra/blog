import api from '@/api/globalFeed';

const state = {
  articles: null,
  isLoading: false,
};
const mutations = {
  getGlobalFeedStart(state) {
    state.isLoading = true;
  },
  getGlobalFeedSuccess(state, payload) {
    state.isLoading = false;
    state.articles = payload;
  },
  getGlobalFeedFailure(state) {
    state.isLoading = false;
    state.articles = [];
  },

  postProfileFavoritedStart(state) {
    state.isLoading = true;
  },
  postProfileFavoritedSuccess(state, payload) {
    state.isLoading = false;
    state.articles = state.articles.map((el) => {
      if (el.slug === payload.slug) {
        el.favoritesCount = payload.favoritesCount;
        el.favorited = !el.favorited;
      }
      return el;
    });
  },
  postProfileFavoritedFailure(state) {
    state.isLoading = false;
  },

  deleteProfileFavoritedStart(state) {
    state.isLoading = true;
  },

  deleteProfileUserFavoritedSuccess(state, payload) {
    state.isLoading = false;
    state.articles = state.articles.map((el) => {
      if (el.slug === payload.slug) {
        el.favoritesCount = payload.favoritesCount;
        el.favorited = !el.favorited;
      }
      return el;
    });
  },
  deleteProfileFavoritedFailure(state) {
    state.isLoading = false;
  },
};
const actions = {
  getGlobalFeed({ commit }, page) {
    return new Promise((resolve) => {
      commit('getGlobalFeedStart');
      api
        .getGlobalFeed(page)
        .then((response) => {
          commit('getGlobalFeedSuccess', response.data.articles);
        })
        .catch((result) => {
          commit('getGlobalFeedFailure');
          console.log('errors from getGlobalFeed', result.response.data);
        });
    });
  },

  postGlobalFavorited({ commit }, slug) {
    return new Promise((resolve) => {
      commit('postProfileFavoritedStart');
      api
        .postFavorite(slug)
        .then((response) => {
          commit('postProfileFavoritedSuccess', response.data.article);
        })
        .catch((result) => {
          commit('postProfileFavoritedFailure');
          console.log('errors from postProfileFavorited', result.response.data);
        });
    });
  },
  deleteGlobalFavorited({ commit }, slug) {
    return new Promise((resolve) => {
      commit('deleteProfileFavoritedStart');
      api
        .deleteFavorite(slug)
        .then((response) => {
          commit('deleteProfileUserFavoritedSuccess', response.data.article);
        })
        .catch((result) => {
          commit('deleteProfileFavoritedFailure');
          console.log(
            'errors from deleteProfileFavoritedFailure',
            result.response.data
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
