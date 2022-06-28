<template>
  <v-app>
    <v-main>
      <header-comp />
      <router-view />
      <footer-comp />

    </v-main>
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
  components:{
    HeaderComp,
    FooterComp

  }
};
</script>
