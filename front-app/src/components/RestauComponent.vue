<template>
  <v-container>
    <div>
      <template>
          <ul v-for="restaurant in restaurants" :key="restaurant">
              <li>
                {{restaurant.name}}
                  <p> Menus disponible : </p>
                  <ul v-for="menu in menus " :key="menu">
                  <li>{{menu.name}} <button type="button" class="add-to-cart" > : Ajouter au panier</button></li>
                    <ul v-for="product in products" :key="product"> 
                      <li v-if="restaurant._id == menu.idRestaurant && product._id == menu.main"> {{product.name}}</li>
                    </ul>
                  </ul>
                  <p> Produit à l'unité : </p>
                  <ul v-for="product in products" :key="product">
                    <li v-if="restaurant._id == product.idRestaurant">{{product.name}} <button type="button" class="add-to-cart" > : Ajouter au panier</button></li>
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
        menus:[],

      }
    },
    props: {restaurantId: String},
    created() {
        this.getAllRestaurant();
        this.getAllProduct();
        this.getAllMenu();

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

        getAllMenu(){
          axios.get(`/restaurant/api/menus/`, {mode: 'no-cors'})
          .then(response => this.menus = response.data)
          .catch(e => this.error = [{ title: "Error de chargement",e }]);
        }, 
       
    },
  }
</script>
