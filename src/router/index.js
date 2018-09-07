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
import Loader from '../pages/loader';

// App settings
var appSettings = require("application-settings");

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
      path: '/loader',
      component: Loader,
      meta: {
        title: 'Loading',
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
        title: 'Cart',
      },
    },    
    {
      path: '/login',
      component: Login,
      meta: {
        title: 'Login',
      },
    },        
    {path: '*', redirect: '/pos'},
  ],
});

router.replace('/login');

module.exports = router;
