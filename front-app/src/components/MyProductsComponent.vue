<template>
    <v-main>
        <div v-if="this.tokenRole == 'RESTAURANT'">
            <v-container>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-md-3">
                                <h3>
                                    Mes produits
                                </h3>
                            </div>
                            <div class="col-md-3">
                                <v-btn class="mr-4" :to="{ name: 'addProduct' }">
                                    Ajouter un produit
                                </v-btn>
                            </div>
                        </div>
                        <div>
                            <div v-if="myProducts != ''">
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
                                        <v-btn @click="goToEditProduct(product)">
                                            éditer
                                        </v-btn>
                                    </v-card>
                                </div>
                            </div>
                            <div v-else>
                                <v-card elevation="10" class="profile-container">
                                    <h3>Aucun produit disponible</h3>
                                </v-card>
                            </div>
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
    data() {
        return {
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
            myProducts: '',
        }
    },
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
            await axios.get('/restaurant/api/restaurants/getByOwner/' + ownerId, {
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
        // try {
        //     await axios.patch('/restaurant/api/products/editProduct/' + id, {

        //     }, {

        //         headers: {
        //             'Authorization': `${this.tokenJWT}`
        //         },
        //     })

        // } catch (error) {
        //     console.log(error)

        // }
        async goToEditProduct(product) {
            this.$router.push({ name: 'editProduct', params: { product: product } })
        },

        deleteProduct(id) {
            if (confirm('Comfirmer la suppression du produit')) {
                axios.delete('/restaurant/api/products/deleteProduct/' + id, {

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
            }

        },
        home() {
            document.location.href = "/myRestaurant/myProducts";
        },

    },
}
</script>