<template>
  <v-container>
  {{$route.params.id}}
    <!-- <ul v-for="menu in menus " :key="menu">
        <li v-if="restaurant._id == menu.idRestaurant">{{menu._id}} 
          <button @click="addMenuToCart(menu._id)"> : Ajouter au panier</button>
        </li>
        <ul v-for="product in products" :key="product">
          <li v-if="restaurant._id == menu.idRestaurant && product._id == menu.main"> {{product.name}}</li>
    </ul> -->
    <div>
      <template>
        <h1>Nos Menus</h1>
            <div class="container-menu">
                <table>
                    <thead class="head-table">
                        <tr>
                            <td style="width: 40%">Nom</td>
                            <td style="width: 30%">Prix</td>
                            <td style="width: 15%">Type</td>
                            <td style="width: 15%"></td>
                        </tr>
                    </thead>
                    <tbody class="body-table" v-for="menu in menus" :key="menu">
                        <tr v-if="!menu ==''">
                            <td>{{ menu.name }}</td>
                            <td>{{ menu.price }}</td>
                            <td><button class="link-button" @click="goToMenu(restaurant._id)">Voir le Restaurant</button></td>
                        </tr>
                    </tbody> 
                </table>   
            </div>
          <h1>Nos Porduits</h1>
            <div class="container-menu">
                <table>
                    <thead class="head-table">
                        <tr>
                            <td style="width: 40%">Nom</td>
                            <td style="width: 30%">Prix</td>
                            <td style="width: 15%">Type</td>
                            <td style="width: 15%"></td>
                        </tr>
                    </thead>
                    <tbody class="body-table" v-for="menu in menus" :key="menu">
                        <tr v-if="!menu ==''">
                            <td>{{ menu.name }}</td>
                            <td>{{ menu.price }}</td>
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
    name: 'MenuComp',
    
    data () {
    return {
      menus:[], 
      products:[], 
    }
    },
    created () {
      this.getAllMenu();
      this.getAllProduct();
      this.addProductToCart();
      this.addProductToCart();
    },
    methods: {
      // getRestaurant(restaurantId){
      //     const id= restaurantId
      //     console.log(id)
      //     // axios.get(`/restaurant/api/menus/${id}`, {mode: 'no-cors'})
      //     axios.get(`/restaurant/api/restaurants/${id}`, {mode: 'no-cors'})
      //     .then(response => this.menus = response.data)
      //     .catch(e => this.error = [{ title: "Error de chargement",e }]);
      //   },

        getAllMenu(){
          axios.get(`/restaurant/api/menus/${this.$route.params.id.idRestaurant}`, {mode: 'no-cors'})
          .then(response => this.menus = response.data)
          .catch(e => this.error = [{ title: "Error de chargement",e }]);
          console.log(this.menus)
        },
        getAllProduct(){
          axios.get(`/restaurant/api/menus/${this.$route.params.id.idRestaurant}`, {mode: 'no-cors'})
          .then(response => this.menus = response.data)
          .catch(e => this.error = [{ title: "Error de chargement",e }]);
          console.log(this.menus)
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
    }

}
</script>
