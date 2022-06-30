<template>
    <div>
        <v-carousel class="carrousel" cycle height="800" hide-delimiter-background show-arrows-on-hover hide-delimiters>
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>

        </v-carousel>
        <v-btn elevation="5" color="primary" class="carrousel-button" href="">Découvrez nos restaurants</v-btn>
    </div>


</template>

      <style scoped>
      .carrousel {
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
      }
      
      .carrousel-container {
          width: 100%;
      }
      
      .carrousel-button {
          position: absolute;
          left: 20%;
          bottom: 20%;
          font-size: 20px !important;
          padding: 1.5em !important;
      }
      
      .carrousel-button:hover {}
      </style>

<script>

export default {
    name: 'HomeComp',
    data() {
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