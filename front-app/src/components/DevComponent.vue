<template>
    <v-container>
    <template v-if="this.tokenRole == 'TECH'">
            <h1 style="text-align: center;">Lien pour Développeur </h1>
            <p>Voici ci-dessous le github du projet :</p>
               <a v-bind:href="'https://github.com/Projet-elective'"> Projet elective </a>
        </template>
    </v-container>
</template>

<script>

export default {
  name: 'DevComp',
  components: {
 
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