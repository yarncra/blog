import Vue from 'vue';
import VueRouter from 'vue-router';

import Register from '@/views/Register';
import MainFeed from '@/views/MainFeed';
import Login from '@/views/Login';
import Editor from '@/views/Editor';
import Settings from '@/views/Settings';
import Profile from '@/views/Profile';
import Article from '@/views/Article';
import ArticleEditor from '@/views/ArticleEditor';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'main-feed', component: MainFeed },
  { path: '/register', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login },
  { path: '/editor/', name: 'editor', component: Editor },
  { path: '/editor/:slug', name: 'article-editor', component: ArticleEditor },
  { path: '/settings', name: 'settings', component: Settings },
  { path: '/profile/:slug', name: 'profile', component: Profile },
  { path: '/article/:slug', name: 'article', component: Article },
  { path: '*', redirect: { name: 'main-feed' } },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
