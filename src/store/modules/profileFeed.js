import api from '@/api/profileFeed';

const state = {
  articles: null,
  isLoading: false,
};
const mutations = {
  getProfileAuthorFeedStart(state) {
    state.isLoading = true;
  },
  getProfileAuthorFeedSuccess(state, payload) {
    state.isLoading = false;
    state.articles = payload;
  },
  getProfileAuthorFeedFailure(state) {
    state.isLoading = false;
    state.articles = [];
  },
  getProfileFavoritedFeedStart(state) {
    state.isLoading = true;
  },
  getProfileFavoritedFeedSuccess(state, payload) {
    state.isLoading = false;
    state.articles = payload;
  },
  getProfileFavoritedFeedFailure(state) {
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
  deleteProfileFavoritedSuccess(state, payload) {
    state.isLoading = false;
    state.articles = state.articles
      .map((el) => {
        if (el.slug === payload.slug) {
          el.favorited = !el.favorited;
        }
        return el;
      })
      .filter((el) => el.favorited !== payload.favorited);
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
  getProfileAuthorFeed({ commit }, { slug, page }) {
    return new Promise((resolve) => {
      commit('getProfileAuthorFeedStart');
      api
        .getAuthorFeed(slug, page)
        .then((response) => {
          commit('getProfileAuthorFeedSuccess', response.data.articles);
          resolve(response.data.articles);
        })
        .catch((result) => {
          commit('getProfileAuthorFeedFailure');
          console.log(
            'errrors from getProfileAuthorFeed',
            result.response.data
          );
        });
    });
  },
  getProfileFavoritedFeed({ commit }, { slug, page }) {
    return new Promise((resolve) => {
      commit('getProfileFavoritedFeedStart');
      api
        .getFavoritedFeed(slug, page)
        .then((response) => {
          commit('getProfileFavoritedFeedSuccess', response.data.articles);
          resolve(response.data.articles);
        })
        .catch((result) => {
          commit('getProfileFavoritedFeedFailure');
          console.log(
            'errrors from getProfileFavoritedFeed',
            result.response.data
          );
        });
    });
  },
  postProfileFavorited({ commit }, slug) {
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
  deleteProfileFavorited({ commit }, slug) {
    return new Promise((resolve) => {
      commit('deleteProfileFavoritedStart');
      api
        .deleteFavorite(slug)
        .then((response) => {
          commit('deleteProfileFavoritedSuccess', response.data.article);
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

  postProfileUserFavorited({ commit }, slug) {
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

  deleteProfileUserFavorited({ commit }, slug) {
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
