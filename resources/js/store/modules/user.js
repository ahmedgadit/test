import categoryAPI from '../api/user.js'

const state = {
  categorieslist: [],
  categories: [],
  searchCategory: [],
}
// getters
const getters = {
  getcollectionCategory: (state) => {
    return collection => state.categories.filter((category) => {
      return collection === category.collection
    })
  },
  getCategoryById: (state) => {
    return id => state.categories.find((category) => {
      return category.data_id === +id
    })
  },
  getCategories : (state) => {
    return state.categorieslist
  },
}
// mutations
const mutations = {

  newCategory: (state, payload) => {
    state.categories.push(payload);
  },



  updatedCategory: (state,payload)=>{
    state.categories.find((index,auth) => {
      if( index.data_id === payload.data_id){
        state.categories[auth] = payload;
      }
    })
  },

  deletedCategory: (state, payload)=>{
    state.categories.splice(payload, 1)
  },




  setCategory: (state, payload) => {
    state.categories = payload
    state.categorieslist = payload
  },



  searchCategory: (state, payload) => {
    payload = payload.toLowerCase()
    state.searchCategory = []
    if (payload.length) {
      state.categories.filter((category) => {
        if (category.title.toLowerCase().includes(payload)) {
          state.searchCategory.push(category)
        }
      })
    }
  },

  livedCategory: (state, payload) => {
    state.categories.data.filter((category) => {
      if (category.id.includes(payload)) {
        category.lived = category.lived + 1
      }
    })
  },

  nonlivedCategory: (state, payload) => {
    state.categories.data.filter((category) => {
      if (category.id.includes(payload)) {
        category.nonliveds = category.nonlived + 1
      }
    })
  },


}
// actions
const actions = {


  createCategory: ({ commit }, data) => {
    categoryAPI.apicreateCategory(data).then(function (response) {
      commit('newCategory', response.data.category)
    })


  },


  updateCategory: ({ commit }, data) => {
    categoryAPI.apiupdateCategory(data).then(function (response) {
      commit('updatedCategory', response.data.category)
    })

  },


  deleteCategory: ({ commit }, data) => {
    let id = data.data_id;
    categoryAPI.apideleteCategory(id).then(function (response) {
      commit('deletedCategory', data.index)
    })

  },

  loadCategory: ({ commit }, data) => {
    categoryAPI.apigetCategories().then(function (response) {
      commit('setCategory', response.data.categories)
    })

  },


  searchCategory: (context, payload) => {
    context.commit('searchCategory', payload)
  },

  livedCategory: (context, payload) => {
    categoryAPI.apilivedCategory(payload).then(function (response) {
      context.commit('livedCategory', payload)
    })
  },

  nonlivedCategory: (context, payload) => {
    categoryAPI.apinoliveCategory(payload).then(function (response) {
      context.commit('nonlivedCategory', payload)
    })
  },



}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
