import axios from 'axios'

const host = window.location.host;
axios.defaults.baseURL = 'http://'+host;

export default {
  apiloginUser: function (data) {
    var formData = new FormData();
    formData.append( "email", data.email );
    formData.append( "password", data.password );
    formData.append( "remember", data.remember_me );
    return axios.post('/login',formData)
  },

  apisaveUser: function (data) {
    var formData = new FormData();
    formData.append( "name", data.name );
    formData.append( "age", data.age );
    formData.append( "email", data.email );
    formData.append( "password", data.password );
    return axios.post('register',formData)
  },

  apilogoutUser: function(data){
    return axios.post('logout',{data})
  }
}
