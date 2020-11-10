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
import {mapState, mapGetters} from 'vuex';

// name is optional
Vue.config.productionTip = false;

Vue.mixin(Base);

new Vue({
  router,
  store,
  computed: {
    ...mapState({
        // authors: state => state.author.authors,
        // categories: state => state.category.categories,
        // news_list: state => state.news.news,
        // subcategories: state => state.subcategory.subcategories
    }),
  },
  render: (h) => h(App),
}).$mount('#app');
