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

// custom vue modules
Vue.filter('reverse', function(value) { return value.slice().reverse() });


var firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
    function (instance) {
      console.log("firebase.init done");
      Vue.registerElement("MLKitBarcodeScanner", () => require("nativescript-plugin-firebase/mlkit/barcodescanning").MLKitBarcodeScanner);
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);


// Uncomment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;
new Vue({

  router,

  store,

}).$start();
