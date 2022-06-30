<template>
  <v-container>
    <div>
      <template>
          <ul v-for="restaurant in restaurants" :key="restaurant">
            <li><button @click="goToMenu(restaurant._id)"><MenuComp  :restaurantId='restaurant._id'/>{{restaurant.name}}</button>
              <!-- <p> Menus disponible : </p>
              <ul v-for="menu in menus " :key="menu">
                <li v-if="restaurant._id == menu.idRestaurant">{{menu._id}} 
                  <button @click="addMenuToCart(menu._id)"> : Ajouter au panier</button>
                </li>
                <ul v-for="product in products" :key="product">
                  <li v-if="restaurant._id == menu.idRestaurant && product._id == menu.main"> {{product.name}}</li>
                </ul>
              </ul>
              <p> Produit à l'unité : </p>
              <ul v-for="product in products" :key="product">
                <li v-if="restaurant._id == product.idRestaurant">{{product.name}} 
                  <button @click="addProductToCart(product._id)"> : Ajouter au panier</button>
                </li>
              </ul>  -->
            </li>   
          </ul>
      </template>
    </div>
    
  </v-container> 
</template>

<script>
import axios from 'axios'
import MenuComp from './MenuComponent.vue'

  export default {
    name: 'RestauComp',
    components:{
      MenuComp
    },

    data (){
     return{
        restaurants:[],
        products:[],
        menus:[],
        cart:[],
      }
    },
    //props: {restaurantId: String},
    created() {
        this.getAllRestaurant();
        this.getAllProduct();
        this.getAllMenu();
        this.addProductToCart();
        this.addProductToCart();
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

      goToMenu(id){
        const restaurantId= this.restaurants.find(restaurant=> restaurant._id == id)
        console.log(restaurantId._id)
        this.$router.push({name: "menu", params:{restaurantId: restaurantId}})
        console.log(this.$router.push({name: "menu", props:{restaurantId: restaurantId}}))

      },

      addMenuToCart(itemId) {
        const item = this.menus.find(menu => menu._id === itemId);
        if (!localStorage.getItem("cart")) {
          localStorage.setItem("cart", JSON.stringify([]));
        }
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        cartItems.push(item);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        this.cart = JSON.parse(localStorage.getItem("cart"));
      },

      addProductToCart(itemId) {
        const item = this.products.find(product => product._id === itemId);
        if (!localStorage.getItem("cart")) {
          localStorage.setItem("cart", JSON.stringify([]));
        }
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        cartItems.push(item);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        this.cart = JSON.parse(localStorage.getItem("cart"));
      },
    },
  }
</script>
