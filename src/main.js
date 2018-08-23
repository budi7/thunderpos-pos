import Vue from 'nativescript-vue';

import router from './router';

import store from './store';

import './styles.scss';

var fiAll = require('nativescript-fonticon');
var TNSFontIcon = fiAll.TNSFontIcon;
var fonticon = fiAll.fonticon;

TNSFontIcon.paths = {
  'fa': 'all.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);


// Uncomment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;
new Vue({

  router,

  store,

}).$start();
