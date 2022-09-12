import api from '@/api/editor';

const state = {
  article: [],
  isLoading: false,
};
const mutations = {
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
};
const actions = {
  postArticle({ commit }, { slug, article }) {
    commit('postArticleStart');
    return new Promise((resolve) => {
      api
        .postArticle(slug, article)
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
};

export default {
  state,
  mutations,
  actions,
};
