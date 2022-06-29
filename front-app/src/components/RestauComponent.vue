<template>
  <v-container>
    <div>
      <template>
          <ul v-for="restaurant in restaurants" :key="restaurant">
              <li></li>   
          </ul>
      </template>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'RestauComp',
    data: () => ({
      restaurants: [] 
    }),
    created() {
        this.getAllRestaurant();
    },
    methods: {
        getAllRestaurant(){
            axios.get(`/restaurant/api/restaurants/`, {mode: 'no-cors'})
            .then(response => this.restaurants = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
    },
  }
</script>
