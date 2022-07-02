<template>
    <v-main>
        <div v-if="this.tokenRole == 'RESTAURANT'">
            <v-container>
                <div class="row">
                    <div class="col-sm-6">
                        <h3>
                            Mes produits
                        </h3>

                        <div class="text-secondary" v-for="product in myProducts" :key="product.name">
                            <v-card elevation="10" class="profile-container">
                                ID produit {{ product._id }}
                                <ul>
                                    <li>
                                        Nom : {{ product.name }}
                                    </li>
                                    <li>
                                        Description: {{ product.description }}
                                    </li>
                                    <li>
                                        Prix : {{ product.price }} €
                                    </li>
                                    <li>
                                        Type : {{ product.type }}
                                    </li>
                                </ul>
                                <v-btn @click="deleteProduct(product._id)">
                                    Supprimer
                                </v-btn>
                            </v-card>
                        </div>
                    </div>
                </div>

            </v-container>

        </div>
    </v-main>
</template>
<script>

import axios from 'axios'

export default {
    name: 'MyProductsComp',
    components: {

    },
    data: () => ({
        name: '',
        description: '',
        price: '',
        type: '',
        savingSuccessful: false,
        errorInRegister: false,
        errorMessages: '',
        tokenJWT: '',
        tokenRole: '',
        tokenId: '',
        myProducts: undefined,
    }),
    mounted() {
        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenJWT = jwtToken
        this.tokenRole = decodedjwtToken.role[0]
        this.tokenId = decodedjwtToken.id
        this.getRestaurantByOwner(this.tokenId)


    },

    methods: {
        async getRestaurantByOwner(ownerId) {
            await axios.get('../../restaurant/api/restaurants/getByOwner/' + ownerId, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            }).then((res) => {
                if (res.data.restaurant.idOwner == this.tokenId) {
                    this.myProducts = res.data.products

                }


            }).catch((res) => {
                console.log(res)
            })

        },

        deleteProduct(id) {
            axios.delete('../../restaurant/api/products/deleteProduct/' + id, {

                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            }, {
                id: id,
            }

            ).then(() => {
                this.home()


            }).catch((res) => {
                console.log(res)

            })
        },
        home() {
            document.location.href = "/myRestaurant/myProducts";
        },

    },
}
</script>