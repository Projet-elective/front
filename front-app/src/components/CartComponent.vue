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
    margin-top:5%;
}
.body{
  padding: 5%
}
</style>

<template>
    <v-container v-if="this.tokenRole == 'CLIENT'">
     <validation-observer ref="observer" v-slot="{ invalid }">
        <div class="body">
            <h1>Votre Panier</h1>
            <div class="container-cart">
                <form @submit.prevent="login" v-if="!savingSuccessful" style="margin-bottom: 2rem;">
                    <validation-provider v-slot="{ errors }" name="delivery_address" rules="required">
                        <v-text-field v-model="delivery_address" :error-messages="errors" label="Votre adresse" required>
                        </v-text-field>
                    </validation-provider>

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
                    </form>
                     <div class="total-cart">
                        <div class="container-total-cart">
                            <div>Commande</div>
                            <div>Nombre de produit : {{totalCount}}</div>
                            <div>Total : {{total}} €</div>
                        </div>
                        <div class="container-button"><button class="pay-button" @click="clearCart()">Vider le panier</button></div>
                   
                        <div class="container-button"><button class="pay-button" @click="$router.push('/delivery'), postOrder()" type="submit" :disabled="invalid">Payer</button></div>
                    </div>
            </div>
        </div>
        </validation-observer>
    </v-container>   
</template>

<script>
import { required, digits, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from 'axios'


setInteractionMode('eager')
extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})
extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})
extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
})
extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
})


export default {
    name: 'CartComp',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data (){
     return{
        carts:[],
        order:[],
        savingSuccessful: false,
        errorInRegister: false,
        errorMessages: '',
        idRestaurant:this.carts._id,
        orderList: this.carts,
        idUser:this.tokenId,
        tokenRole: '',
        tokenUsername: '',
        delivery_address:''
      }
    },
    created() {
        this.getCart();
        this.postOrder();
    },
    methods: {
        postOrder(){
            const { orderList,idRestaurant, idUser, delivery_address } = this;
            axios.post(`/orders/api/orders/addOrder`, {mode: 'no-cors', 
                orderList:orderList, 
                idRestaurant:idRestaurant,
                idUser:idUser,
                delivery_address:delivery_address  })
            .then((res) => {
                    this.errorMessages = res.data['message'];
                    this.savingSuccessful = true
                    this.errorInRegister = false
            }).catch((res) => {
                this.errorMessages = res.response.data['message']
                this.errorInRegister = true
                this.savingSuccessful = false
            })
        },
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
        clearCart(){
            localStorage.clear();
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
            this.carts.forEach(element => {
                    if(element == null){
                       localStorage.removeItem('index')
                    }else{
                        console.log('')
                    }
                });
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
    mounted() {
        const i = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        if(i){
        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        console.log(jwtToken)
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenUsername = decodedjwtToken.username
        this.tokenRole = decodedjwtToken.role[0]
        this.tokenId = decodedjwtToken.id
        }
    },
    beforeMount() {
        this.getCart();
        this.totalPrice();
        this.totalProduct();
    },
 
}
</script>

