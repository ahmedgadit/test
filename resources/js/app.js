/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Base from './base.js'
import { extend } from 'vee-validate';
import { validate } from 'vee-validate';
import {
    ValidationProvider,
    ValidationObserver
} from 'vee-validate/dist/vee-validate.full';
import Notifications from 'vue-notification';
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(Notifications);

// name is optional
Vue.config.productionTip = false;

Vue.mixin(Base);



new Vue({
  router,
  store,
  created(){
    this.checkIfLogged()
        .then(response => {
            let temp =  response ? response : {};
            this.$store.dispatch('user/userlogin', temp);
        })
        .catch(error => {
            // console.log(error)
        });
  },
  computed: {

  },
  render: (h) => h(App),
}).$mount('#app');
