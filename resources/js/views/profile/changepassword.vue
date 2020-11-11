<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header">{{ ('Password Change') }}</div>

                  <div class="card-body">
                      <ValidationObserver ref="form" v-slot="{ invalid }" >
                        <form @submit.prevent="onSubmit">

                          <div class="form-group row">
                              <label for="password" class="col-md-4 col-form-label text-md-right">{{ ('Old Password') }}</label>

                              <div class="col-md-6">
                                  <ValidationProvider rules="required|min:6" name="password"  tag="div" v-slot="{ errors }">
                                      <input v-model="user.password"  :class="{'is-invalid':( errors[0] ? true:false)}" id="password" type="password" class="form-control" name="password" required autocomplete="new-password">

                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0]  }}</strong>
                                      </span>

                                  </ValidationProvider>

                              </div>
                          </div>

                          <div class="form-group row">
                              <label for="password" class="col-md-4 col-form-label text-md-right">{{ ('New Password') }}</label>

                              <div class="col-md-6">
                                  <ValidationProvider rules="required|min:6" name="password"  tag="div" v-slot="{ errors }">
                                      <input v-model="user.password"  :class="{'is-invalid':( errors[0] ? true:false)}" id="password" type="password" class="form-control" name="password" required autocomplete="new-password">

                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0]  }}</strong>
                                      </span>

                                  </ValidationProvider>

                              </div>
                          </div>

                          <div class="form-group row">
                              <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ ('Confirm Password') }}</label>

                              <div class="col-md-6">
                                  <ValidationProvider rules="required|confirmed:password" name="confirm password"  tag="div" v-slot="{ errors }">
                                      <input v-model="cpassword" id="password-confirm" type="password" class="form-control" :class="{'is-invalid':( errors[0] ? true:false)}" name="password_confirmation" required autocomplete="new-password">

                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0]  }}</strong>
                                      </span>
                                  </ValidationProvider>

                              </div>
                          </div>

                          <div class="form-group row mb-0">
                              <div class="col-md-6 offset-md-4">
                                  <button type="submit" :disabled="invalid" class="btn btn-primary"  @click="updateUser()">
                                      {{ ('Password Change') }}
                                  </button>
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
import { mapGetters, mapState } from 'vuex';


export default{
    data() {
        return {
          user: {
            name: '',
            email: '',
            age: '',
            password: '',
         },
         cpassword: '',
       }
    },
    computed: {
        ...mapState({
          user_data: state => state.user.app_user,
          isLogin: state => state.user.user_login
        }),
    },
    mounted(){
        this.user.name = this.user_data.name;
        this.user.email = this.user_data.email;
        this.user.age = this.user_data.age;
    }
    methods: {
        updateUser(){
            console.log('asdsa');
            let temp = this.user;
            this.$store.dispatch('user/updateUser', temp).then(
                message => {
                  console.log(message);
                  this.$router.replace('/home');
                },
                error => {
                  if(error.data.status == false){
                    alert("login failed, invalid email address or password");
                  }
                }

          );
        },

        onSubmit(){

        },
        checkEmail() {
            console.log(this.$refs);
            var el = this;
            axios.get('check-user-email?email='+el.user.email).then((response) => {
                // Notice that we return an object containing both a valid property and a data property.
                 var temp = {
                    valid: response.data.status,
                    data: {
                        message: response.data.message
                    }
                };
                console.log(temp.valid);
                if(temp.valid == true){
                    this.$refs.form.fields.email.failed = true
                    this.$refs.form.setErrors({
                        email: ['This email is already taken']
                    });
                }
            });
          console.log('Form has been submitted!')
          // this.$store.dispatch('products/createOrder', {
          //   product: this.cart,
          //   userDetail: this.user,
          //   amt: this.cartTotal
          // })
        }
    }
}
</script>
