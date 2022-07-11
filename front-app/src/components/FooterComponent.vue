<template>
  <v-footer id="footer" color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <router-link to="/" tag="button" class="title">Accueil</router-link>
      <router-link to="/cgv" tag="button" class="title"> Mention légales </router-link>
      <a href="https://github.com/Projet-elective" class="title">Github </a>
      <router-link to="/contact" tag="button" class="title">Contactez-nous </router-link>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>CESI EATS</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<style>
#footer {
  bottom: 0;
  width: 100%;
}

.title {
  margin:2%;
  text-decoration: none;
}
</style>

<script>

export default {
  name: 'FooterComp',
  components: {

  },
}
</script>