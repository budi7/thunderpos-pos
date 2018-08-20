import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import HelloWorld from '../components/HelloWorld';
import Counter from '../components/Counter';

// pages
import Pos from '../pages/pos';
import Login from '../pages/login';

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
