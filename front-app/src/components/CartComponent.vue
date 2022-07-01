<style>
.container-cart {
    width: 100%;
    display: flex;
    margin-top: 5em;
    min-height: 600px;
}

.list-cart {
    flex: 2;
    margin-right: 1em;
}

.list-cart table {
    border-collapse: collapse;
    width: 100%;
}

.list-cart table tr{
    border-bottom: 1px solid #ddd;
}
.list-cart table td{
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

.remove-button {
    padding: 10px 20px;
    background-color: var(--v-error-base);
    border-radius: 5px;
    color: white;
    font-weight: 500;
}

.total-cart {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.container-total-cart {
    background-color: #efefef;
    margin-bottom: 1em;
}

.container-total-cart div {
    height: 100px;
    padding: 40px 40px;
}

.container-total-cart :first-child {
    border-bottom: 1px solid rgb(150, 150, 150);
    font-size: 18px;
    font-weight: 500;
}

.container-button {
    align-self: center;
    width: 100%;
}

.pay-button {
    width: 100%;
    background-color: var(--v-primary-base);
    color: white;
    border-radius: 5px;
    padding: 10px 0;
    font-size: 20px;
}
</style>
<template>
    <v-container>
        <h1>Votre Panier</h1>
        <div class="container-cart">
            <div class="list-cart">
                <table>
                    <thead class="head-table">
                        <tr>
                            <td style="width: 50%">Produit</td>
                            <td style="width: 30%">Prix (€)</td>
                            <td style="width: 20%"></td>
                        </tr>
                    </thead>
                    <tbody class="body-table" v-for="cart in carts" :key="cart">
                        <tr v-if="!cart ==''">
                            <td>{{ cart.name }}</td>
                            <td>{{ cart.price }}</td>
                            <td><button class="remove-button" @click="removeFromCart(cart._id)">Supprimer du panier</button></td>
                        </tr>
                    </tbody> 
                </table>   
            </div>
            <div class="total-cart">
                <div class="container-total-cart">
                    <div>Commande</div>
                    <div>Nombre de produit : {{totalCount}}</div>
                    <div>Total : {{total}}</div>
                </div>
                
                <div class="container-button"><button class="pay-button" @click="$router.push('/delivery')">Payer</button></div>
            </div>
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
            this.totalPrice();
            this.totalProduct();
        },
        getCart() {
           //console.log(localStorage.getItem("cart"))
            if (!localStorage.getItem("cart")) {
                localStorage.setItem("cart", JSON.stringify([]));
            }
            this.carts = JSON.parse(localStorage.getItem("cart"));
        },
        totalPrice() {
            if (localStorage.getItem("cart")) {
                var totalAMount=0;
                const carts = JSON.parse(localStorage.getItem("cart"));
                carts.forEach(element => {
                    if(element == null){
                        totalAMount = totalAMount + 0
                    }else{
                        totalAMount = totalAMount + element.price
                    }
                });
            }
            this.total = totalAMount;
        },
        totalProduct() {
            if (localStorage.getItem("cart")) {
                const carts = JSON.parse(localStorage.getItem("cart"));
                var countProduct=0;
                carts.forEach(element => {
                    if(element == null){
                         countProduct= countProduct +0
                    }else{
                        countProduct= countProduct+ 1
                    }
            });   
            }
            this.totalCount = countProduct;
        }

    },
    beforeMount() {
        this.getCart();
        this.totalPrice();
        this.totalProduct
    },
 
}
</script>

