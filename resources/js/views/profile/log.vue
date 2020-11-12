<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header">{{ ('Your Recent Activities') }}</div>

                  <div class="card-body">
                      <table class="table table-responsive">
                          <thead>
                              <tr>
                                  <th>
                                      Index
                                  </th>
                                  <th>
                                      Subject
                                  </th>
                                  <th>
                                      Url
                                  </th>
                                  <th>
                                      Method
                                  </th>
                                  <th>
                                      Ip
                                  </th>
                                  <th>
                                      Agent
                                  </th>
                                  <th>
                                      Date
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(log, index) in logs">
                                  <td>
                                      {{ index + 1 }}
                                  </td>
                                  <td>
                                      {{ log.subject }}
                                  </td>
                                  <td>
                                      {{ log.url }}
                                  </td>
                                  <td>
                                      {{ log.method }}
                                  </td>
                                  <td>
                                      {{ log.ip }}
                                  </td>
                                  <td>
                                      {{ log.agent }}
                                  </td>
                                  <td>
                                      {{ log.created_at }}
                                  </td>
                              </tr>
                          </tbody>
                      </table>
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
        return{
            logs:[],
        }
    },
    watch: {
        logs () {


        }
    },
    mounted(){
        axios.get('getlogs').then((response) => {
          // Notice that we return an object containing both a valid property and a data property.
          if(response.data.status == true){
              let temp = response.data.logs.reverse();
               this.logs = temp
          }
      });
    },
    methods: {

    }
}
</script>
