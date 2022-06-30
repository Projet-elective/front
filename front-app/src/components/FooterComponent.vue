<template>
  <v-footer id="footer" color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">
        {{ link }}
      </v-btn>
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
</style>

<script>

export default {
  name: 'FooterComp',
  components: {

  },
  data: () => ({
    links: [
      'Accueil',
      'Mention légales',
      'Github',
      'Contactez nous',
    ],
  }),

}
</script>