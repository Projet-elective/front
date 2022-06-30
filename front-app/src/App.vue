<template>
  <v-app>
    <header-comp />
      <router-view />
    <footer-comp />
  </v-app>
</template>

<script>
import HeaderComp from './components/HeaderComponent.vue'
import FooterComp from './components/FooterComponent.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    HeaderComp,
    FooterComp

  }
};
</script>
