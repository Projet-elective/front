<style>
.container-restaurant {
    width: 100%;
    min-height: 650px;
}

.container-restaurant table {
    border-collapse: collapse;
    width: 100%;
}

.container-restaurant table tr{
    border-bottom: 1px solid #ddd;
}
.container-restaurant table td{
    padding: 15px;
}

.head-table td {
    border-bottom: 1px solid rgb(150, 150, 150);
    font-weight: 500;
}

.body-table {
    
}

.body-table td {
    border-bottom: 1px solid rgb(150, 150, 150);
}

.link-button {
    padding: 10px 20px;
    background-color: var(--v-primary-base);
    border-radius: 5px;
    color: white;
    font-weight: 500;
}
</style>
<template>
  <v-container>
    <div>
      <template>
        <h1>Nos Restaurants</h1>
            <div class="container-restaurant">
                <table>
                    <thead class="head-table">
                        <tr>
                            <td style="width: 40%">Restaurant</td>
                            <td style="width: 30%">Adresse</td>
                            <td style="width: 15%">Type</td>
                            <td style="width: 15%"></td>
                        </tr>
                    </thead>
                    <tbody class="body-table" v-for="restaurant in restaurants" :key="restaurant">
                        <tr v-if="!restaurant ==''">
                            <td>{{ restaurant.name }}</td>
                            <td>{{ restaurant.address }}</td>
                            <td>{{ restaurant.type }}</td>
                            <td><button class="link-button" @click="goToMenu(restaurant._id)">Voir le Restaurant</button></td>
                        </tr>
                    </tbody> 
                </table>   
            </div>
          <!-- <ul v-for="restaurant in restaurants" :key="restaurant"> -->
            <!-- <li><button @click="goToMenu(restaurant._id)">{{restaurant.name}}</button> -->
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
            <!-- </li>    -->
          <!-- </ul> -->
      </template>
    </div>
    
  </v-container> 
</template>

<script>
import axios from 'axios'

  export default {
    name: 'RestauComp',
    data (){
     return{
        restaurants:[],
        products:[],
        menus:[],
        cart:[],
      }
    },
    props: {restaurantId: String},
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
