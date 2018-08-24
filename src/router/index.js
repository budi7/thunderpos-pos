import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import HelloWorld from '../components/HelloWorld';
import Counter from '../components/Counter';

// pages
import Cart from '../pages/cart';
import Login from '../pages/login';
import Pos from '../pages/pos';

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/hello',
      component: HelloWorld,
      meta: {
        title: 'Hello World',
      },
    },
    {
      path: '/counter',
      component: Counter,
      meta: {
        title: 'Counter',
      },
    },
    {
      path: '/pos',
      component: Pos,
      meta: {
        title: 'pos',
      },
    },
    {
      path: '/cart',
      component: Cart,
      meta: {
        title: 'cart',
      },
    },    
    {
      path: '/login',
      component: Login,
      meta: {
        title: 'login',
      },
    },        
    {path: '*', redirect: '/pos'},
  ],
});

router.replace('/login');

module.exports = router;
