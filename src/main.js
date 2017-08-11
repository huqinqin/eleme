// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import VueResource from 'vue-resource';
import './common/stylus/index.styl';
Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  {path: '/seller', component: seller},
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings}
];

const router = new VueRouter({
  routes
});
const app = new Vue({
  router,
  template: '<App/>',
  components: { App }
});
app.$mount('#app');
router.push('/goods');
