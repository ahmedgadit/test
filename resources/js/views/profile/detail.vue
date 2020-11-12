<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header">{{ ('Update') }}</div>

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
                                            <option v-for="(moon, index) in months" :value="index + 1">{{moon}}</option>
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
                                          <template v-if="$refs.form.errors != undefined  && $refs.form.errors != undefined && $refs.form.errors.age != undefined ">
                                              <strong >{{ $refs.form.errors.age.length > 0 ?'Your Age must be greater or equal to 18':'' }}</strong>
                                          </template>
                                      </span>
                                  </ValidationProvider>
                              </div>
                          </div>

                          <div class="form-group row">
                              <label for="email" class="col-md-4 col-form-label text-md-right">{{ ('E-Mail Address') }}</label>

                              <div class="col-md-6">
                                  <ValidationProvider rules="required|email" name="email"  tag="div" v-slot="{ errors }">

                                      <input v-model="user.email" disabled @blur="checkEmail()" :class="{'is-invalid':( errors[0] ? true:false)}" id="email" @change="checkEmail()" type="email" class="form-control" name="email"  required autocomplete="email">

                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ errors[0]  }}</strong>
                                      </span>
                                  </ValidationProvider>

                              </div>
                          </div>

                          <div class="form-group row mb-0">
                              <div class="col-md-6 offset-md-4">
                                  <button type="submit" :disabled="invalid" class="btn btn-primary"  @click="updateUser()">
                                      {{ ('Update') }}
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
            day:'',
            month:'',
            year:'',
            age: '',
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
       }
    },
    computed: {
        ...mapState({
          user_data: state => state.user.app_user,
          isLogin: state => state.user.user_login
        }),
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
    mounted(){
        setTimeout(() => {
            var bday = new Date(this.user_data.dob);
            this.user.name = this.user_data.name;
            this.user.email = this.user_data.email;
            this.user.month = bday.getUTCMonth() +1;
            this.user.day = bday.getUTCDate();
            this.user.year = bday.getUTCFullYear();
            this.user.age = this.user_data.age;
        }, 1000)
    },
    methods: {
        updateBday(){
            let day = this.user.day;
            let mon = this.user.month;
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
        updateUser(){
            console.log('asdsa');
            let temp = this.user;
            this.$store.dispatch('user/updateUser', temp).then(
                message => {
                  console.log(message);
                  this.successnoti('your settings saved Successfully');
                },
                error => {
                  if(error.data.status == false){
                      this.errornoti('Error 404, changes failed, please try again');
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
