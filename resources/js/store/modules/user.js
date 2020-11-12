import userApi from '../api/user.js'

const state = {
  app_user: {},
  user_login: false
}
// getters
const getters = {
  getUser: (state) => {
    return  state.app_user
  }
}
// mutations
const mutations = {
  setUser: (state, payload) => {
    state.app_user = payload,
    state.user_login = (payload.id > 0  ? true : false)
  },
  setlogout: (state, payload) => {
    state.user_login = false,
    state.app_user = {}
  }
}
// actions
const actions = {
  login: ({commit}, payload) => {
    return userApi.apiloginUser(payload)
      .then(function (response) {
        if(response.data.status == true){
          commit('setUser', response.data.user)
          return Promise.resolve(response);
        }else {
          return Promise.reject(response);
        }
      }).catch(function(error){
        return Promise.reject(error);
      })
  },
  registerUser: ({commit}, payload) => {
    return userApi.apisaveUser(payload)
      .then(function (response) {
        if(response.data.status == true){
          commit('setUser', response.data.user)
          return Promise.resolve(response);
        }else{
          return Promise.reject(response);
        }
      })
  },
  updateUser: ({commit}, payload) => {
    return userApi.apiupdateUser(payload)
      .then(function (response) {
        if(response.data.status == true){
          commit('setUser', response.data.user)
          return Promise.resolve(response);
        }else{
          return Promise.reject(response);
        }
      })
  },

  userlogin: ({commit}, payload) => {
    commit('setUser', payload)
  },
  logout: ({commit}, payload) => {
    return userApi.apilogoutUser(payload)
      .then(function (response) {
        if(response.data.status == true){
          commit('setlogout', false)
          return Promise.resolve(response);
        } else {
          commit('setlogout', false);
          return Promise.reject(response);
        }
      })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
