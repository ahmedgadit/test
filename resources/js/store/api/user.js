import axios from 'axios'

const host = window.location.host;
axios.defaults.baseURL = 'http://'+host;

export default {

  apicreateCategory: function (payload) {
    var formData = new FormData();
    formData.append("data_id", payload.data_id);
    formData.append("name", payload.name);
    formData.append("image", payload.file)
    return axios.post('/Admin/category-create',formData)
  },

  apiupdateCategory: function (payload) {
    var formData = new FormData();
    formData.append("data_id", payload.data_id);
    formData.append("name", payload.name);
    formData.append("image", payload.file);

    return axios.post('/Admin/category-update',formData)
  },

  apideleteCategory: function (payload){
    var formData = new FormData();
    formData.append("data_id", payload);
    return axios.post('/Admin/category-delete',formData)
  },

  apigetCategories: function () {
     return axios.get('/categories')
  },


  apilivedProject: function (id){
    return axios.post('/api/categories/lived-nonlived',{
      id: id,
      choice: 'live'
    })
  },

  apinonlivedProject: function (id){
    return axios.post('/api/categories/lived-nonlived',{
      id: id,
      choice: 'nonlive'
    })
  },




}
