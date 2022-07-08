<template>
    <v-container>
        <div class="body">
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
                        <tbody class="body-table" v-for="cart in carts" :key="cart.id">
                            <tr v-if="!cart == ''">
                                <td>{{ cart.name }}</td>
                                <td>{{ cart.price }}</td>
                                <td><button class="remove-button" @click="removeFromCart(cart._id)">Supprimer du
                                        panier</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="total-cart">
                    <div class="container-total-cart">
                        <div>Commande</div>
                        <div>Nombre de produit : {{ totalCount }}</div>
                        <div>Total : {{ total }} €</div>
                    </div>
                    <div class="container-button"><button class="pay-button" @click="clearCart()">Vider le
                            panier</button></div>
                    <div v-if="this.tokenRole == 'CLIENT'">
                        <div class="container-button"><button class="pay-button" @click="postOrder()">Payer</button>
                        </div>
                    </div>
                    <div v-if="this.tokenRole == ''">
                        <p> Connectez vous pour payer</p>
                    </div>
                </div>
            </div>
        </div>
    </v-container>

</template>

<script>
import { required, digits, max, regex } from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'
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

    },
    data() {
        return {
            carts: [],
            cartsId: [],
            order: [],
            savingSuccessful: false,
            errorInRegister: false,
            errorMessages: '',
            idRestaurant: '',
            // orderList: this.carts._id,
            tokenRole: '',
            tokenUsername: '',
            delivery_address: '',
            tokenId: '',
            tokenJWT: '',
        }
    },
    mounted() {
    },
    created() {
        const i = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        if (i) {
            const jwt = require('jose')
            const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
            const decodedjwtToken = jwt.decodeJwt(jwtToken)
            this.tokenJWT = jwtToken
            this.tokenUsername = decodedjwtToken.username
            this.tokenRole = decodedjwtToken.role[0]
            this.tokenId = decodedjwtToken.id
            this.delivery_address = decodedjwtToken.address
            this.idRestaurant = this.$route.params.id
        }
        this.getCart();
        this.totalPrice();
        this.totalProduct();
    },
    methods: {
        postOrder() {
            console.log(this.cartsId)
            axios.post('/orders/api/orders/addOrder', {
                mode: 'no-cors',
                orderList: this.cartsId,
                idRestaurant: this.idRestaurant,
                idUser: this.tokenId,
                delivery_address: this.delivery_address,
                totalPrice: this.total
            }, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            })
                .then((res) => {
                    this.errorMessages = res.data['message'];
                    this.savingSuccessful = true
                    this.errorInRegister = false
                }).catch((res) => {
                    this.errorMessages = res.response.data['message']
                    this.errorInRegister = true
                    this.savingSuccessful = false
                })
            this.clearCart()
            console.log('Commande envoyée')
        },
        removeFromCart(itemId) {
            const cartItems = JSON.parse(localStorage.getItem("cart"));
            const indexone = this.carts.find(cart => cart._id === itemId)
            cartItems.splice(indexone, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            this.cart = JSON.parse(localStorage.getItem("cart"));
            const cartId = JSON.parse(localStorage.getItem("cartId"));
            const indextwo = this.carts.find(cart => cart._id === itemId)
            cartId.splice(indextwo, 1);
            localStorage.setItem("cartId", JSON.stringify(cartId));
            this.cartId = JSON.parse(localStorage.getItem("cartId"));

            this.getCart();
            this.totalPrice();
            this.totalProduct();
        },
        clearCart() {
            localStorage.clear();
            this.getCart();
            this.totalPrice();
            this.totalProduct();
        },
        getCart() {
            if (!localStorage.getItem("cart")) {
                localStorage.setItem("cart", JSON.stringify([]));
            }
            this.carts = JSON.parse(localStorage.getItem("cart"));
            if (!localStorage.getItem("cartId")) {
                localStorage.setItem("cartId", JSON.stringify([]));
            }
            this.cartsId = JSON.parse(localStorage.getItem("cartId"));
        },
        totalPrice() {
            if (localStorage.getItem("cart")) {
                var totalAMount = 0;
                const carts = JSON.parse(localStorage.getItem("cart"));
                carts.forEach(element => {
                    if (element == null) {
                        totalAMount = totalAMount + 0
                    } else {
                        totalAMount = totalAMount + element.price
                    }
                });
            }
            this.total = totalAMount;
        },
        totalProduct() {
            if (localStorage.getItem("cart")) {
                const carts = JSON.parse(localStorage.getItem("cart"));
                var countProduct = 0;
                carts.forEach(element => {
                    if (element == null) {
                        countProduct = countProduct + 0
                    } else {
                        countProduct = countProduct + 1
                    }
                });
            }
            this.totalCount = countProduct;
        }
    },

}
</script>

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

.list-cart table tr {
    border-bottom: 1px solid #ddd;
}

.list-cart table td {
    padding: 15px;
}

.head-table td {
    border-bottom: 1px solid rgb(150, 150, 150);
    font-weight: 500;
}

.body-table {}

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
    margin-top: 5%;
}

.body {
    padding: 5%
}
</style>