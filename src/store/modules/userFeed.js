import api from '@/api/userFeed';

const state = {
  articles: null,
  isLoading: false,
};
const mutations = {
  getUserFeedStart(state) {
    state.isLoading = true;
  },
  getUserFeedStuccess(state, payload) {
    state.isLoading = false;
    state.articles = payload;
  },
  getUserFeedFailure(state) {
    state.isLoading = false;
    state.articles = [];
  },
  postUserFeedFavoritedStart(state) {
    state.isLoading = true;
  },
  postUserFeedFavoritedSuccess(state, payload) {
    state.isLoading = false;
    state.articles = state.articles.map((el) => {
      if (el.slug === payload.slug) {
        el.favoritesCount = payload.favoritesCount;
        el.favorited = !el.favorited;
      }
      return el;
    });
  },
  postUserFeedFavoritedFailure(state) {
    state.isLoading = false;
  },
  deleteUserFeedFavoritedStart(state) {
    state.isLoading = true;
  },
  deleteUserFeedFavoritedSuccess(state, payload) {
    state.isLoading = false;
    state.articles = state.articles.map((el) => {
      if (el.slug === payload.slug) {
        el.favoritesCount = payload.favoritesCount;
        el.favorited = !el.favorited;
      }
      return el;
    });
  },
  deleteUserFeedFavoritedFailure(state) {
    state.isLoading = false;
  },
};
const actions = {
  getUserFeed({ commit }, page) {
    commit('getUserFeedStart');
    return new Promise((resolve) => {
      api
        .getUserFeed(page)
        .then((response) => {
          commit('getUserFeedStuccess', response.data.articles);
          resolve(response.data.articles);
        })
        .catch((result) => {
          commit('getUserFeedFailure');
          console.log('errors from userFeed', result.response);
        });
    });
  },

  postUserFeedFavorited({ commit }, slug) {
    return new Promise((resolve) => {
      commit('postUserFeedFavoritedStart');
      api
        .postFavorite(slug)
        .then((response) => {
          commit('postUserFeedFavoritedSuccess', response.data.article);
        })
        .catch((result) => {
          commit('postUserFeedFavoritedFailure');
          console.log(
            'errors from postUserFeedFavorited',
            result.response.data
          );
        });
    });
  },

  deleteUserFeedFavorited({ commit }, slug) {
    return new Promise((resolve) => {
      commit('deleteUserFeedFavoritedStart');
      api
        .deleteFavorite(slug)
        .then((response) => {
          commit('deleteUserFeedFavoritedSuccess', response.data.article);
        })
        .catch((result) => {
          commit('deleteUserFeedFavoritedFailure');
          console.log(
            'errors from deleteUserFeedFavorited',
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
