import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import globalFeed from '@/store/modules/globalFeed';
import userFeed from '@/store/modules/userFeed';
import updateSettings from '@/store/modules/updateSettings';
import profileFeed from '@/store/modules/profileFeed';
import profile from '@/store/modules/profile';
import article from '@/store/modules/article';
import tags from '@/store/modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    globalFeed,
    userFeed,
    updateSettings,
    profileFeed,
    profile,
    article,
    tags,
  },
});
