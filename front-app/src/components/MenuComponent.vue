<template>
  <v-container>
  <!-- <ul v-for="menu in menus " :key="menu">
                <li v-if="restaurant._id == menu.idRestaurant">{{menu._id}} 
                  <button @click="addMenuToCart(menu._id)"> : Ajouter au panier</button>
                </li>
                <ul v-for="product in products" :key="product">
                  <li v-if="restaurant._id == menu.idRestaurant && product._id == menu.main"> {{product.name}}</li>
                </ul> -->
  </v-container>
</template>

<script>
//import axios from 'axios'


  export default {
    name: 'MenuComp',
    data (){
     return{
        cart:[],
      }
    },

  }
</script>
