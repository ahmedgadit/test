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
                                  <ValidationProvider rules="required" name="oldpassword"  tag="div" v-slot="{ errors }">
                                      <input v-model="user.oldpassword" @blur="checkPassword()" :class="{'is-invalid':( errors[0] ? true:false)}"  @change="checkPassword()" id="password" type="password" class="form-control" name="password" required autocomplete="new-password">

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
                                      <input v-model="user.cpassword" id="password-confirm" type="password" class="form-control" :class="{'is-invalid':( errors[0] ? true:false)}" name="password_confirmation" required autocomplete="new-password">

                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0]  }}</strong>
                                      </span>
                                  </ValidationProvider>

                              </div>
                          </div>

                          <div class="form-group row mb-0">
                              <div class="col-md-6 offset-md-4">
                                  <button type="submit" :disabled="invalid" class="btn btn-primary"  @click="updateUserPass()">
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
              password: '',
              oldpassword: '',
              cpassword: '',
         },
       }
    },
    computed: {
        ...mapState({
          user_data: state => state.user.app_user,
          isLogin: state => state.user.user_login
        }),
    },
    mounted(){
    },
    methods: {
        updateUserPass(){
            axios.post('change-password',{'password':this.user.password}).then((response) => {
                // Notice that we return an object containing both a valid property and a data property.
                if(response.data.status == true){
                    this.successnoti('your password changed Successfully');
                    let temp = this.user_data;
                    this.$store.dispatch('user/logout', temp).then(
                        message => {
                          console.log(message);
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
            });
        },

        onSubmit(){

        },
        checkPassword() {
            var el = this;
            axios.get('check-user-oldpassword?password='+el.user.oldpassword).then((response) => {
                // Notice that we return an object containing both a valid property and a data property.
                 var temp = {
                    valid: response.data.status,
                    data: {
                        message: response.data.message
                    }
                };
                if(temp.valid == false){
                    this.$refs.form.fields.oldpassword.failed = true
                    this.$refs.form.setErrors({
                        oldpassword: ['old password does not match']
                    });
                }
            });

        }
    }
}
</script>
