<template>
    <v-main>
        <div v-if="this.tokenRole == 'RESTAURANT'">
            <v-container>
                <div class="row">
                    <div class="col-sm-6">
                        <h3>
                            Commandes non complétées
                        </h3>

                        <div class="text-secondary" v-for="result in resultsNotCompleted" :key="result._id">
                            <v-card elevation="10" class="profile-container">
                                ID Commande : {{ result._id }}
                                <ul>
                                    <li>
                                        ID user : {{ result.idUser }}
                                    </li>
                                    <li>
                                        prix total: {{ result.totalPrice }}
                                    </li>
                                    <li>
                                        produits : {{ result.orderList }}
                                    </li>
                                    <li>
                                        Status : {{ result.state_order }}
                                    </li>
                                </ul>
                                <v-btn @click="validateOrder(result._id)"
                                    v-if="result.state_order == 'En cours de validation'">
                                    Validate
                                </v-btn>
                                <v-btn @click="isReady(result._id)"
                                    v-if="result.state_order == 'En cours de préparation'">
                                    Préparer
                                </v-btn>
                                <v-btn @click="deliver(result._id)" v-if="result.state_order == 'Commande prête'">
                                    Livrer
                                </v-btn>
                                <v-btn @click="complete(result._id)"
                                    v-if="result.state_order == 'En cours de livraison'">
                                    Compléter
                                </v-btn>
                            </v-card>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h3>
                            Commandes Complétées
                        </h3>

                        <div class="text-secondary" v-for="result in resultsCompleted" :key="result._id">

                            <v-card elevation="10" class="profile-container">
                                ID Commande : {{ result._id }}
                                <ul>
                                    <li>
                                        ID user : {{ result.idUser }}
                                    </li>
                                    <li>
                                        prix total: {{ result.totalPrice }}
                                    </li>
                                    <li>
                                        produits : {{ result.orderList }}
                                    </li>
                                    <li>
                                        status : {{result.state_order}}
                                    </li>

                                </ul>
                            </v-card>
                        </div>
                    </div>
                </div>

            </v-container>

        </div>
        <template v-if="this.tokenRole == 'CLIENT'">
            <h1>Page order CLient</h1>
        </template>


    </v-main>
</template>

<style>
.profile-container {
    padding: 10px;
    margin: 10px;
    width: 100%;
    background-color: white;
    border-radius: 25px;
}
</style>

<script>
import axios from 'axios';



export default {
    name: 'OrderComp',


    data() {
        return {
            form: {
                idCommande: '',
            },
            tokenJWT: '',
            tokenUsername: '',
            tokenEmail: '',
            tokenRole: '',
            tokenId: '',
            resultsNotCompleted: undefined,
            resultsCompleted: undefined,
            orderId: '',

        }

    },

    mounted() {

        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenJWT = jwtToken
        this.tokenUsername = decodedjwtToken.username
        this.tokenEmail = decodedjwtToken.email
        this.tokenRole = decodedjwtToken.role[0]
        this.tokenId = decodedjwtToken.id

        this.restaurantCompletedOrders()
        this.restaurantNotCompletedOrders()



    },
    methods: {
        /*For clients */
        async getOrder() {
            console.log(this.tokenJWT)
            console.log(this.tokenId)
            await axios.get('/orders/api/orders/' + this.tokenId, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            }).then((res) => {
                console.log(res)
            }).catch((res) => {
                console.log(res)
            })

        },
        /*For restaurants */
        async restaurantNotCompletedOrders() {

            const result = await axios.get('/orders/api/orders/restaurantsNotCompletedOrders/' + this.tokenId, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
            this.resultsNotCompleted = result.data
        },
        async restaurantCompletedOrders() {

            const result = await axios.get('/orders/api/orders/restaurantsCompletedOrders/' + this.tokenId, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
            this.resultsCompleted = result.data
        },

        /* ->preparation*/
        async validateOrder(idOrder) {

            axios.patch('/delivery/api/state_orders/validateOrder/' + idOrder, { title: 'oui' }, {

                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })

        },
        async isReady(idOrder) {
            axios.patch('/delivery/api/state_orders/isReadyOrder/' + idOrder, { title: 'oui' }, {

                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
        },
        async deliver(idOrder) {
            axios.patch('/delivery/api/state_orders/deliverOrder/' + idOrder, { title: 'oui' }, {

                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
        },
        async complete(idOrder) {
            axios.patch('/delivery/api/state_orders/CompleteOrder/' + idOrder, { title: 'oui' }, {

                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
        }


    }
}

</script>