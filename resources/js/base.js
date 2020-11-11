export default {
  methods: {
      checkIfLogged(){
          var vm = this;
          return new Promise((resolve, reject) => {
            axios.get('/sessionStatus')
               .then(response => {
                  resolve(response.data.user);
               })
               .catch(error => {
                  reject(error.response.data);
               });
          })

      },

      successnoti(text){
         this.$notify({
                 group: 'foo',
                 title: 'Succes!',
                 text: text,
                 type: 'success',
               });
      },

      warnnoti(text){
         this.$notify({
                 group: 'foo',
                 title: 'Alert!',
                 text: text,
                 type: 'warn',
               });
      },
      errornoti(text){
         this.$notify({
                 group: 'foo',
                 title: 'Oops!',
                 text: text,
                 type: 'error',
               });
      }
   }
}
