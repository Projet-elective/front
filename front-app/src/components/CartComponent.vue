<template>
    <v-container>
        <div>
            <h1>Cart</h1>
            <button @click="$router.push('/delivery')">Payer</button>
            <ul v-for="cart in carts" :key="cart">
                <li v-if="!cart =='' "><p>{{ cart.name }}</p><button @click="removeFromCart(cart._id)">Vider le panier</button></li>
            </ul>
        </div>
    </v-container>   
</template>

<script>

export default {
    name: 'CartComp',
    components: {
    },
    data (){
     return{
        carts:[],
      }
    },
    created() {
        this.removeFromCart();
        this.getCart();
    },
    methods: {
       removeFromCart(itemId) {
            const cartItems = JSON.parse(localStorage.getItem("cart"));
            const index = this.carts.find(cart => cart._id === itemId)
            cartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            this.cart = JSON.parse(localStorage.getItem("cart"));
            this.getCart();
        },
        getCart() {
           console.log(localStorage.getItem("cart"))
            if (!localStorage.getItem("cart")) {
                localStorage.setItem("cart", JSON.stringify([]));
            }
            this.carts = JSON.parse(localStorage.getItem("cart"));
        },

    },
    beforeMount() {
        this.getCart();
    },
 
}
</script>

