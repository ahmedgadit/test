<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div class="container">
          <a class="navbar-brand" href="">
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
              <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <!-- Left Side Of Navbar -->
              <ul class="navbar-nav mr-auto">

              </ul>

              <!-- Right Side Of Navbar -->
              <template v-if="isLogin">
                  <ul class="navbar-nav ml-auto">
                      <!-- Authentication Links -->
                          <li class="nav-item dropdown">
                              <router-link class="nav-link" :to="{ name: 'home', params: {} }">home</router-link>

                              <a id="navbarDropdown"  class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  v-cloak>
                                  {{ user_data.name }}
                              </a>


                              <div class="dropdown-menu dropdown-menu-right"  aria-labelledby="navbarDropdown">
                                  <router-link class="dropdown-item" :to="{ name: 'setting', params: {} }">Settings</router-link>
                                  <router-link class="dropdown-item" :to="{ name: 'password', params: {} }">Change Password</router-link>
                                  <router-link class="dropdown-item" :to="{ name: 'logs', params: {} }">Logs</router-link>
                                  <a class="dropdown-item" href="JavaScript:;"
                                     @click="logoutUser()">
                                      <!-- {{ ('Logout') }} --> Logout
                                  </a>

                                  <!-- <form id="logout-form" action="" method="POST" class="d-none">
                                  </form> -->
                              </div>
                          </li>
                  </ul>
              </template>
              <template v-else>
                  <ul class="navbar-nav ml-auto">
                      <li class="nav-item">
                          <!-- <a class="nav-link" href="">{{ ('Login') }}</a> -->
                          <router-link class="nav-link" :to="{ name: 'login', params: {} }">Login</router-link>
                      </li>
                      <li class="nav-item">
                          <!-- <a class="nav-link" href="">{{ ('Register') }}</a> -->
                          <router-link class="nav-link" :to="{ name: 'register', params: {} }">Register</router-link>

                      </li>
                  </ul>
              </template>
          </div>
      </div>
  </nav>
</template>
<script>
import { mapGetters, mapState } from 'vuex';

export default{
    computed: {
        ...mapState({
          user_data: state => state.user.app_user,
          isLogin: state => state.user.user_login
        }),
    },
    methods:{
        logoutUser(){
            let temp = this.user_data;
            this.$store.dispatch('user/logout', temp).then(
                message => {
                  this.successnoti('you are logout successfully');
                  this.$router.replace('/login');
                },
                error => {
                  if(error.data.status == false){
                    alert("login failed, invalid email address or password");
                  }
                }

          );
        }
    }
}
</script>
