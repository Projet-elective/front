<template>
  <v-container>
    <div class="body">
          <a href="/cart" class="link-button" style="color:white; text-decoration:none">Panier</a>
      <template>
        <h1>Nos Menus</h1>
            <div class="container-restaurant">
                <table>
                    <thead class="head-table">
                        <tr>
                            <td style="width: 40%">Nom</td>
                            <td style="width: 30%">Prix</td>
                            <td style="width: 15%"></td>
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
            <div class="container-restaurant">
                <table>
                    <thead class="head-table">
                        <tr>
                            <td style="width: 40%">Nom</td>
                            <td style="width: 30%">Description</td>
                            <td style="width: 15%">Prix</td>
                            <td style="width: 15%">Type</td>
                        </tr>
                    </thead>
                    <tbody class="body-table" v-for="product in products" :key="product">
                        <tr v-if="!product ==''">
                            <td>{{ product.name }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.type }}</td>
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
.body{
  padding: 10%
}
</style>