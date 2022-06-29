<template>
  <v-container>
    <div>
      <template>
          <ul v-for="restaurant in restaurants" :key="restaurant">
              <li>
                {{restaurant.name}}
                  <ul v-for="product in products" :key="product">
                    <li v-if="restaurant._id == product.idRestaurant">{{product.name}}</li>
                  </ul>
              </li>   
          </ul>
      </template>
    </div>
  </v-container> 
</template>

<script lang="ts">
import axios from 'axios'

  export default {
    name: 'RestauComp',
    data (){
     return{
        restaurants:[],
        products:[],
      }
    },
    props: {restaurantId: String},
    created() {
        this.getAllRestaurant();
        this.getAllProduct();

    },
    methods: {
        getAllRestaurant(){
            axios.get(`/restaurant/api/restaurants/`, {mode: 'no-cors'})
            .then(response => this.restaurants = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
       
        getAllProduct(){
            axios.get(`/restaurant/api/products/`, {mode: 'no-cors'})
            .then(response => this.products = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },  
    },
  }
</script>
