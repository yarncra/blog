import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Paginate from 'vuejs-paginate';
import Vuelidate from 'vuelidate';

import '@/assets/styles/styles.scss';
import 'material-design-icons-iconfont';

Vue.use(Vuelidate);
Vue.use(Paginate);
Vue.component('paginate', Paginate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
