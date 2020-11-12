import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate' // import the package

const createStore = () => {
  return new Vuex.Store({
    plugins: [createPersistedState()], /// include the imported plugin
    modules: {
      user,
    }
  })
}
export default createStore
