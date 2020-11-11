<template>
    <div class="container" v-clock="isLogin">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ ('Dashboard') }}</div>

                    <div class="card-body">
                            <!-- <div class="alert alert-success" role="alert">
                                {{ ('status') }}
                            </div> -->

                        {{ user_data.name +' welcome back' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';

export default{
    watch:{
        real_user(){

        },
    },
    computed: {
        ...mapState({
          user_data: state => state.user.app_user,
          isLogin: state => state.user.user_login
        }),
    },
    mounted(){
    }
}
</script>
