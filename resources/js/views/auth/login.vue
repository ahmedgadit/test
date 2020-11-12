<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header">{{ ('Login') }}</div>

                  <div class="card-body">
                      <ValidationObserver ref="form" v-slot="{ invalid }" >
                        <form @submit.prevent="onSubmit">
                          <div class="form-group row">
                              <label for="email" class="col-md-4 col-form-label text-md-right">{{ ('E-Mail Address') }}</label>

                                  <div class="col-md-6">
                                      <ValidationProvider rules="required|email" name="email"  tag="div" v-slot="{ errors }">
                                          <input id="email" v-model="user.email" type="email" class="form-control" name="email" :class="{'is-invalid':( errors[0] ? true:false)}"  autocomplete="email" autofocus>

                                          <span class="invalid-feedback" role="alert">
                                              <strong>{{ errors[0]  }}</strong>
                                          </span>
                                      </ValidationProvider>
                                  </div>
                          </div>

                          <div class="form-group row">
                              <label for="password" class="col-md-4 col-form-label text-md-right">{{ ('Password') }}</label>
                                  <div class="col-md-6">
                                      <ValidationProvider rules="required" name="password"  tag="div" v-slot="{ errors }">
                                          <input v-model="user.password" id="password" type="password" class="form-control" :class="{'is-invalid':( errors[0] ? true:false)}"  name="password" required autocomplete="current-password">

                                          <span class="invalid-feedback" role="alert">
                                              <strong>{{ errors[0]  }}</strong>
                                          </span>
                                      </ValidationProvider>
                                  </div>
                          </div>

                          <div class="form-group row">
                              <div class="col-md-6 offset-md-4">
                                  <div class="form-check">
                                      <input class="form-check-input" v-model="user.remember_me" type="checkbox" name="remember" id="remember" >

                                      <label class="form-check-label" for="remember">
                                          Remember me
                                      </label>
                                  </div>
                              </div>
                          </div>

                          <div class="form-group row mb-0">
                              <div class="col-md-8 offset-md-4">
                                      <button type="submit" :disabled="invalid" @click="loginUser()" class="btn btn-primary">
                                      {{ ('Login') }}
                                  </button>
                                  <!-- <a class="btn btn-link" href="">
                                      {{ ('Forgot Your Password?') }}
                                  </a> -->
                              </div>
                          </div>
                      </form>
                  </ValidationObserver>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>

export default{
    data() {
        return {
          user: {
            email: '',
            password: '',
            remember_me:false
         },
       }
   },
   methods:{
       loginUser(){
           let temp = this.user;
           this.$store.dispatch('user/login', temp).then(
               message => {
                 this.successnoti('you are login Successfully');
                 this.$router.replace('/');
               },
               error => {
                   this.errornoti(error);
               }

         );
       },
       onSubmit(){

       }
   }
}
</script>
