import Vue from 'vue';
import Router from 'vue-router';
import RouterService from './services/RouterService';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: RouterService.getRoutes(),
});

router.beforeEach((to, from, next) => {
  return next();
});

export default router;
