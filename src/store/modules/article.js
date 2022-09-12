import api from '@/api/article';

const state = {
  article: {},
  isLoading: false,
  comments: [],
};
const mutations = {
  getArticleStart(state) {
    state.isLoading = true;
  },
  getArticleSuccess(state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  getArticleFailure(state) {
    state.isLoading = false;
  },
  postArticleStart(state) {
    state.isLoading = true;
  },
  postArticleSuccess(state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  postArticleFailure(state) {
    state.isLoading = false;
  },
  putArticleStart(state) {
    state.isLoading = true;
  },
  putArticleSuccess(state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  putArticleFailure(state) {
    state.isLoading = false;
  },
  postCommentStart(state) {
    state.isLoading = true;
  },
  postCommentSuccess(state, payload) {
    state.isLoading = false;
    state.comments.push(payload);
  },
  postCommentFailure(state) {
    state.isLoading = false;
  },
  getCommentsStart(state) {
    state.isLoading = true;
  },
  getCommentsSuccess(state, payload) {
    state.isLoading = false;
    state.comments = payload;
  },
  getCommentsFailure(state) {
    state.isLoading = false;
  },
  deleteCommentStart(state) {
    state.isLoading = true;
  },
  deleteCommentSuccess(state, payload) {
    state.isLoading = false;
    state.comments = state.comments.filter((el) => el.id !== payload.id);
  },
  deleteCommentFailure(state) {
    state.isLoading = false;
  },

  deleteArticleStart(state) {
    state.isLoading = true;
  },
  deleteArticleSuccess(state) {
    state.isLoading = false;
  },
  deleteArticleFailure(state) {
    state.isLoading = false;
  },
};
const actions = {
  getArticle({ commit }, slug) {
    return new Promise((resolve) => {
      commit('getArticleStart');
      api
        .getArticle(slug)
        .then((response) => {
          commit('getArticleSuccess', response.data.article);
          resolve(response.data.article);
        })
        .catch((result) => {
          commit('getArticleFailure', result.response.data);
        });
    });
  },
  postArticle({ commit }, { article }) {
    commit('postArticleStart');
    return new Promise((resolve) => {
      api
        .postArticle(article)
        .then((response) => {
          commit('postArticleSuccess', response.data.article);
          resolve(response.data.article);
        })
        .catch((result) => {
          commit('postArticleFailure');

          console.log('errors from editor', result.response.data);
        });
    });
  },
  putArticle({ commit }, { slug, article }) {
    commit('putArticleStart');
    return new Promise((resolve) => {
      api
        .putArticle(slug, article)
        .then((response) => {
          commit('putArticleSuccess', response.data.article);
          resolve(response.data.article);
        })
        .catch((result) => {
          commit('putArticleFailure');

          console.log('errors from editor', result.response.data);
        });
    });
  },
  postComment({ commit }, data) {
    return new Promise((resolve) => {
      commit('postCommentStart');
      api
        .postComment(data)
        .then((response) => {
          commit('postCommentSuccess', response.data.comment);
          resolve();
        })
        .catch((result) => {
          commit('postCommentFailure');
          console.log('errors from comment', result.response.data);
        });
    });
  },
  getComments({ commit }, slug) {
    return new Promise((resolve) => {
      commit('getCommentsStart');
      api
        .getComments(slug)
        .then((response) => {
          commit('getCommentsSuccess', response.data.comments);
          resolve(response.data.comments);
        })
        .catch((result) => {
          commit('getCommentsFailure');
          console.log('errors from get comments', result.response.errors);
        });
    });
  },
  deleteComment({ commit }, data) {
    return new Promise((resolve) => {
      commit('deleteCommentStart');
      api
        .deleteComment(data)
        .then((response) => {
          commit('deleteCommentSuccess', data);
        })
        .catch((result) => {
          commit('deleteCommentFailure');
          console.log('errors from delete comments', result.response.errors);
        });
    });
  },

  deleteArticle({ commit }, slug) {
    return new Promise((resolve) => {
      commit('deleteArticleStart');
      api
        .deleteArticle(slug)
        .then((response) => {
          commit('deleteArticleSuccess');
          resolve();
        })
        .catch((result) => {
          commit('deleteArticleFailure');
          console.log('errors from delete article', result.response.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
