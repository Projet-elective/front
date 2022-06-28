<style scoped>
.carrousel {
  display: block;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
</style>


<template>
<v-carousel
  class="carrousel"
  cycle
  height="400"
  hide-delimiter-background
  show-arrows-on-hover
>
  <v-carousel-item
  v-for="(item,i) in items"
  :key="i"
  :src="item.src"
  
  ></v-carousel-item>
</v-carousel>
</template>

<script>
  

  export default {
    name: 'HomeView',
    data () {
      return {
        items: [
          {
            src: require('@/assets/gros-bao.png '),
          },
          {
            src: require('@/assets/1745.png'),
          },
          {
            src: require('@/assets/tonton.png'),
          },
          {
            src: require('@/assets/levain.png'),
          },
          {
            src: require('@/assets/tacos.png'),
          },
        ],
      }
    },
    components: {
      
    },
  }
</script>
