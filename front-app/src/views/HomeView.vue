<style scoped>
.carrousel {
  display: block;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
.one h1 {
  text-align: center;
  text-transform: uppercase;
  padding-bottom: 5px;
}
h1 {
  position: relative;
  padding: 0;
  margin: 0;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 60px;
  color: #000000;
  -webkit-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
}
</style>


<template>
<div class="one">
  <h1>Welcome on Exeat ! 
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
</h1>
</div>
</template>

<script>
  

  export default {
    name: 'HomeView',
    data () {
      return {
        items: [
          {
            src: require('@/assets/gros-bao.png'),
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
