<template>
    <v-main>
        <div v-if="this.tokenRole == 'RESTAURANT'">
            <v-container>
                <div class="row">
                    <div class="col-sm-4">
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
                                        Menu.s : {{ result.orderList }}
                                    </li>
                                    <li>
                                        Status : {{ result.state_order }}
                                    </li>
                                    <li>
                                        ID livreur : {{ result.deliverer_id }}
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
                                <!-- <v-btn @click="deliver(result._id)" v-if="result.state_order == 'Commande prête'">
                                    Livrer
                                </v-btn>
                                <v-btn @click="complete(result._id)"
                                    v-if="result.state_order == 'En cours de livraison'">
                                    Compléter
                                </v-btn> -->
                            </v-card>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <h3>
                            Commandes en livraison
                        </h3>

                        <div class="text-secondary" v-for="result in resultsDelivering" :key="result._id">

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
                                        Menu.s : {{ result.orderList }}
                                    </li>
                                    <li>
                                        status : {{ result.state_order }}
                                    </li>

                                    <li>
                                        Livreur : {{ result.deliverer_id }}
                                    </li>

                                </ul>
                            </v-card>
                        </div>
                    </div>
                    <div class="col-sm-4">
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
                                        Menu.s : {{ result.orderList }}
                                    </li>
                                    <li>
                                        status : {{ result.state_order }}
                                    </li>
                                    <li>
                                        Livreur : {{ result.deliverer_id }}
                                    </li>

                                </ul>
                            </v-card>
                        </div>
                    </div>
                </div>

            </v-container>

        </div>
        <div v-if="this.tokenRole == 'DELIVERY'">
            <v-container>
                <div class="row">
                    <div class="col-sm-4">
                        <h3>
                            Liste des commandes
                        </h3>
                        <div v-if="this.deliveryAvailable != ''">
                            <div class="text-secondary" v-for="result in deliveryAvailable" :key="result._id">
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
                                            Menu.s : {{ result.orderList }}
                                        </li>
                                        <li>
                                            Status : {{ result.state_order }}
                                        </li>
                                    </ul>
                                    <v-btn @click="acceptDelivery(result._id)">
                                        Accepter
                                    </v-btn>
                                    <!-- <v-btn @click="deliver(result._id)" v-if="result.state_order == 'Commande prête'">
                                    Livrer
                                </v-btn>
                                <v-btn @click="complete(result._id)"
                                    v-if="result.state_order == 'En cours de livraison'">
                                    Compléter
                                </v-btn> -->
                                </v-card>
                            </div>
                        </div>
                        <div v-else>
                            <v-card elevation="10" class="profile-container" style="width:50%;">
                                <h3>Aucune commande disponible</h3>
                            </v-card>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <h3>
                            Commandes acceptées
                        </h3>
                        <div v-if="this.deliverNotCompletedOrder != ''">
                            <div class="text-secondary" v-for="result in deliverNotCompletedOrder" :key="result._id">
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
                                            Menu.s : {{ result.orderList }}
                                        </li>
                                        <li>
                                            Status : {{ result.state_order }}
                                        </li>
                                        <li>
                                            Livreur : {{ result.deliverer_id }}
                                        </li>
                                        <v-btn @click="deliver(result._id)"
                                            v-if="result.state_order == 'Commande prête'">
                                            Livrer
                                        </v-btn>
                                    </ul>
                                </v-card>
                            </div>
                        </div>
                        <div v-else>
                            <v-card elevation="10" class="profile-container" style="width:50%;">
                                <h3>Aucune commande disponible</h3>
                            </v-card>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <h3>
                            Commandes en livraison
                        </h3>
                        <div v-if="this.myDeliveryAccepted != ''">
                            <div class="text-secondary" v-for="result in myDeliveryAccepted" :key="result._id">
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
                                            Menu.s : {{ result.orderList }}
                                        </li>
                                        <li>
                                            Status : {{ result.state_order }}
                                        </li>
                                        <li>
                                            Livreur : {{ result.deliverer_id }}
                                        </li>
                                    </ul>
                                    <v-btn @click="complete(result._id)"
                                        v-if="result.state_order == 'En cours de livraison'">
                                        Compléter
                                    </v-btn>
                                </v-card>
                            </div>
                        </div>
                        <div v-else>
                            <v-card elevation="10" class="profile-container" style="width:50%;">
                                <h3>Aucune commande disponible</h3>
                            </v-card>
                        </div>
                    </div>
                </div>

            </v-container>

        </div>

        <div v-if="this.tokenRole == 'COMMERCIAL'">
            <div class="col-sm-4">
                <h3>
                    Commandes
                </h3>
                <div v-if="this.orderCommercials != ''">
                    <div class="text-secondary" v-for="orders in orderCommercials" :key="orders._id">
                        <v-card elevation="10" class="profile-container">
                            ID Commande : {{ orders._id }}
                            <ul>
                                <li>
                                    ID user : {{ orders.idUser }}
                                </li>
                                <li>
                                    prix total: {{ orders.totalPrice }}
                                </li>
                                <li>
                                    Menu.s : {{ orders.orderList }}
                                </li>
                                <li>
                                    Status : {{ orders.state_order }}
                                </li>
                                <li>
                                    Livreur : {{ orders.deliverer_id }}
                                </li>
                            </ul>
                        </v-card>
                    </div>
                </div>
                <div v-else>
                    <v-card elevation="10" class="profile-container" style="width:50%;">
                        <h3>Aucune commande disponible</h3>
                    </v-card>
                </div>
            </div>
        </div>
        <div v-if="this.tokenRole == 'CLIENT'">
            <div class="col-sm-4">
                <h3>
                    Mes commandes
                </h3>
                <div v-if="this.myClientOrders != ''">
                    <div class="text-secondary" v-for="orders in myClientOrders" :key="orders._id">
                        <v-card elevation="10" class="profile-container">
                            ID Commande : {{ orders._id }}
                            <ul>
                                <li>
                                    ID user : {{ orders.idUser }}
                                </li>
                                <li>
                                    prix total: {{ orders.totalPrice }}
                                </li>
                                <li>
                                    Menu.s : {{ orders.orderList }}
                                </li>
                                <li>
                                    Status : {{ orders.state_order }}
                                </li>
                                <li>
                                    Livreur : {{ orders.deliverer_id }}
                                </li>
                            </ul>
                        </v-card>
                    </div>
                </div>
                <div v-else>
                    <v-card elevation="10" class="profile-container" style="width:50%;">
                        <h3>Aucune commande disponible</h3>
                    </v-card>
                </div>
            </div>
        </div>



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

            resultsNotCompleted: [],
            resultsDelivering: [],
            deliverNotCompletedOrder: '',

            myDeliveryAccepted: '',

            resultsCompleted: '',
            deliveryAvailable: '',
            orderId: '',

            myClientOrders: '',

            orderCommercials:'',

        }

    },

    mounted() {

        this.fetch()



    },
    methods: {
        fetch() {
            const jwt = require('jose')
            const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
            const decodedjwtToken = jwt.decodeJwt(jwtToken)
            this.tokenJWT = jwtToken
            this.tokenUsername = decodedjwtToken.username
            this.tokenEmail = decodedjwtToken.email
            this.tokenRole = decodedjwtToken.role[0]
            this.tokenId = decodedjwtToken.id
            console.log(this.tokenRole)

            if (this.tokenRole == 'RESTAURANT') {
                this.restaurantNotCompletedOrders()
                this.restaurantCompletedOrders()
            }
            if (this.tokenRole == 'DELIVERY') {

                this.getDeliveryOrdersAvailable()
                this.deliverNotCompletedOrders(this.tokenId)
                this.readyToDeliverOrders(this.tokenId)
            }
            if (this.tokenRole == 'CLIENT') {
                this.myOrdersClient(this.tokenId)
            }
            if (this.tokenRole == 'COMMERCIAL') {
                this.orderCommercial()
            }
        },
        async getRestaurantByOwner(ownerId) {
            await axios.get('restaurant/api/restaurants/getByOwner/' + ownerId, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            }).then((res) => {
                if (res.data.restaurant.idOwner == this.tokenId) {
                    this.restauName = res.data.restaurant.name
                    this.restauDesc = res.data.restaurant.description
                    this.restauAddress = res.data.restaurant.address
                    this.restauType = res.data.restaurant.type
                    this.hasRestaurant = true
                    this.restauId = res.data.restaurant._id
                }


            }).catch((res) => {
                console.log(res)
            })

        },
        /*For clients */
        async getOrder() {
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
            const results = result.data
            for (let i = 0; i < results.length; i++) {
                if (results[i].state_order == 'En cours de livraison') {
                    this.resultsDelivering.push(results[i])
                } else {

                    this.resultsNotCompleted.push(results[i])

                }
            }

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
            this.refresh()
        },
        async isReady(idOrder) {
            axios.patch('/delivery/api/state_orders/isReadyOrder/' + idOrder, { title: 'oui' }, {

                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
            this.refresh()
        },
        async deliver(idOrder) {
            axios.patch('/delivery/api/state_orders/deliverOrder/' + idOrder, { title: 'oui' }, {

                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
            this.refresh()
        },
        async complete(idOrder) {
            axios.patch('/delivery/api/state_orders/CompleteOrder/' + idOrder, { title: 'oui' }, {

                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
            this.refresh()
        },

        /*DELIVERY SECTION*/

        async getDeliveryOrdersAvailable() {
            try {

                const result = await axios.get('/orders/api/orders/deliverOrders/availableOrders', {
                    headers: {
                        'Authorization': `${this.tokenJWT}`
                    },
                })
                this.deliveryAvailable = []
                this.deliveryAvailable = result.data

            } catch (err) {
                console.log(err)
            }

        },

        async deliverNotCompletedOrders(id) {
            try {

                const result = await axios.get('/orders/api/orders/deliverOrders/deliverNotCompletedOrders/' + id, {
                    headers: {
                        'Authorization': `${this.tokenJWT}`
                    },
                })
                this.deliverNotCompletedOrder = result.data
                console.log(this.deliverNotCompletedOrder)

            } catch (err) {
                console.log(err)
            }

        },

        async readyToDeliverOrders(id) {
            try {

                const result = await axios.get('/orders/api/orders/deliverOrders/myDeliveryAccepted/' + id, {
                    headers: {
                        'Authorization': `${this.tokenJWT}`
                    },
                })
                this.myDeliveryAccepted = result.data

            } catch (err) {
                console.log(err)
            }
        },

        async acceptDelivery(id) {
            try {
                axios.patch('/orders/api/orders/deliverOrders/acceptDelivery/' + id,
                    {
                        deliverer: this.tokenId
                    }
                    , {

                        headers: {
                            'Authorization': `${this.tokenJWT}`
                        },
                    })
                this.refresh()

            } catch (error) {
                console.log(error)
            }
        },

        //CLIENT
        async myOrdersClient(id) {
            try {

                const result = await axios.get('/orders/api/orders/myOrders/' + id, {
                    headers: {
                        'Authorization': `${this.tokenJWT}`
                    },
                })
                this.myClientOrders = result.data

            } catch (err) {
                console.log(err)
            }

        },

        //COMMERCIAL
        async orderCommercial() {
            try {

                const result = await axios.get('/orders/api/orders/allNotCompletedOrders/', {
                    headers: {
                        'Authorization': `${this.tokenJWT}`
                    },
                })
                this.orderCommercials = result.data

            } catch (err) {
                console.log(err)
            }

        },
        refresh() {
            this.$router.go({ name: 'order' })
        }


    }
}

</script>