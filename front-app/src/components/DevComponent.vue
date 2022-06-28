<template>
    <v-container>
    <!--<template v-if="this.tokenRole == 'TECH'">-->
        <template>
            <h1 style="text-align: center;">Statistique commercials</h1>
            {{LoginComp}}
        </template>
    </v-container>
</template>

<script>
import axios from 'axios';
//import LoginComp from '/LoginComponent.vue'

export default {
  name: 'DevComp',
  components: {
   //LoginComp

  },
  data: () => ({
    logincontent: [LoginComp],
  }),
  created() {
        this.getWeekCommercial();
    },
    methods: {
        getWeekCommercial(){
            axios.get(`/login`, {mode: 'no-cors'})
            .then(response => this.logincontent = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
       
    },
    mounted() {
        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenUsername = decodedjwtToken.username
        this.tokenRole = decodedjwtToken.role[0]
    },
    
}
</script>