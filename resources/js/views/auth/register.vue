<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header">{{ ('Register') }}</div>

                  <div class="card-body">
                      <ValidationObserver ref="form" v-slot="{ invalid }" >
                        <form @submit.prevent="onSubmit">

                          <div class="form-group row">
                              <label for="name" class="col-md-4 col-form-label text-md-right">{{ ('Name') }}</label>

                              <div class="col-md-6">
                                  <ValidationProvider rules="required" name="name"  tag="div" v-slot="{ errors }">
                                      <input v-model="user.name" id="name" type="text" class="form-control" :class="{'is-invalid':( errors[0] ? true:false)}" name="name"  autocomplete="name" autofocus>
                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0] }}</strong>
                                      </span>
                                  </ValidationProvider>
                              </div>
                          </div>

                          <div class="form-group row">
                              <label for="name" class="col-md-4 col-form-label text-md-right">{{ ('Date of birth') }}</label>


                              <div class="col-md-2">
                                  <ValidationProvider rules="required" name="day"  tag="div" v-slot="{ errors }">
                                      <select v-model="user.day" name="months" class="form-control" :class="{'is-invalid':( errors[0] ? true:false)}" @change="updateBday()">
                                            <option v-for="mn in days" :value="mn">{{mn}}</option>
                                      </select>
                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0] }}</strong>
                                      </span>
                                  </ValidationProvider>
                              </div>
                              <div class="col-md-2">
                                  <ValidationProvider rules="required" name="month"  tag="div" v-slot="{ errors }">
                                      <select v-model="user.month" name="month" class="form-control" :class="{'is-invalid':( errors[0] ? true:false)}" @change="updateBday()">
                                            <option v-for="(mn, index) in months" :value="index + 1">{{mn}}</option>
                                      </select>
                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0] }}</strong>
                                      </span>
                                  </ValidationProvider>
                              </div>
                              <div class="col-md-2">
                                  <ValidationProvider rules="required" name="day"  tag="div" v-slot="{ errors }">
                                      <select v-model="user.year" name="years" class="form-control" :class="{'is-invalid':( errors[0] ? true:false)}" @change="updateBday()">
                                            <option v-for="yr in years" :value="yr">{{yr}}</option>
                                      </select>
                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0] }}</strong>
                                      </span>
                                  </ValidationProvider>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-md-4">
                              </div>
                              <div class="col-md-6">
                                  <ValidationProvider rules="required|min_value:18" name="age"  v-slot="{ errors }">
                                      <input v-model="user.age" id="age" type="text" hidden class="form-control" :class="{'is-invalid':( errors[0] ? true:false)}" name="age"  autofocus>
                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ $refs.form.errors.age.length > 0 ?'Your Age must be greater or equal to 18':'' }}</strong>
                                      </span>
                                  </ValidationProvider>
                              </div>
                          </div>

                          <div class="form-group row">
                              <label for="email" class="col-md-4 col-form-label text-md-right">{{ ('E-Mail Address') }}</label>

                              <div class="col-md-6">
                                  <ValidationProvider rules="required|email" name="email"  tag="div" v-slot="{ errors }">

                                      <input v-model="user.email" @blur="checkEmail()" :class="{'is-invalid':( errors[0] ? true:false)}" id="email" @change="checkEmail()" type="email" class="form-control" name="email"  required autocomplete="email">

                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0]  }}</strong>
                                      </span>
                                  </ValidationProvider>

                              </div>
                          </div>

                          <div class="form-group row">
                              <label for="password" class="col-md-4 col-form-label text-md-right">{{ ('Password') }}</label>

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
                                  <button type="submit" :disabled="invalid" class="btn btn-primary"  @click="registerUser()">
                                      {{ ('Register') }}
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
import { extend } from 'vee-validate';

extend('min_value', {
  validate(value) {
    return value >= 18;
  },
  message: 'Your {_field_} must be greater or equal to 18'
});
export default{
    data() {
        return {
          user: {
            name: '',
            email: '',
            month:'',
            day:'',
            year:'',
            age: '',
            password: '',
         },
         months:[
             'jan',
             'feb',
             'mar',
             'apr',
             'may',
             'jun',
             'jul',
             'aug',
             'sept',
             'oct',
             'nov',
             'dec',
         ],
         cpassword: '',
       }
    },
    computed: {
        days () {
            var array = [],
            j = 0;
            for(var i = 1; i <= 31; i++){
                array[j] = i;
                j++;
            }
            return array;
        },
        years () {
          const year = new Date().getFullYear()
          return Array.from({length: year - 1900}, (value, index) => 1901 + index).reverse();
        }
    },
    methods: {
        updateBday(){
            let day = this.user.day;
            let mon = this.user.month + 1;
            let yer = this.user.year;
            let today = new Date();
            var ageDifMs = today.getFullYear() - this.user.year;
            this.user.age = ageDifMs;
            if(this.user.age < 18){
                this.$refs.form.fields.age.failed = true
                this.$refs.form.setErrors({
                    age: ['Age must be greater than or equal to 18']
                });
            }
        },
        registerUser(){
            let temp = this.user;
            this.$store.dispatch('user/registerUser', temp).then(
                message => {
                  this.successnoti('you are Registered Successfully');
                  this.$router.replace('/');
                },
                error => {
                  if(error.data.status == false){
                      this.errornoti('Error 404, Registered failed, please try again');
                    alert("login failed, invalid email address or password");
                  }
                }

          );
        },

        onSubmit(){

        },
        checkEmail() {
            var el = this;
            axios.get('check-user-email?email='+el.user.email).then((response) => {
                // Notice that we return an object containing both a valid property and a data property.
                 var temp = {
                    valid: response.data.status,
                    data: {
                        message: response.data.message
                    }
                };
                if(temp.valid == true){
                    this.$refs.form.fields.email.failed = true
                    this.warnnoti('This email is already taken');
                    this.$refs.form.setErrors({
                        email: ['This email is already taken']
                    });
                }
            });
        }
    }
}
</script>
