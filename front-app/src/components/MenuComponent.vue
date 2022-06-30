<template>
  <v-container>
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
                            <td><button class="link-button" @click="addMenuToCart(menu._id)">Ajouter au panier</button></td>
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
                    <tbody class="body-table" v-for="product in products" :key="product">
                        <tr v-if="!product ==''">
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td><button class="link-button" @click="addProductToCart(product._id)">Ajouter au panier</button></td>
                        </tr>
                    </tbody> 
                </table>   
            </div>
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

        getAllMenu(){
          axios.get(`/restaurant/api/menus/restaurant/${this.$route.params.id._id}`, {mode: 'no-cors'})
          .then(response => this.menus = response.data)
          .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },

        getAllProduct(){
          console.log(this.$route.params.id._id)
          axios.get(`/restaurant/api/products/restaurant/${this.$route.params.id._id}`, {mode: 'no-cors'})
          .then(response => this.products = response.data)
          .catch(e => this.error = [{ title: "Error de chargement",e }]);
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
