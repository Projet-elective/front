<template>
    <v-main>
        <div v-if="this.tokenRole == 'RESTAURANT'">
            <v-container>
                <div class="row">
                    <div class="col-sm-6">
                        <h3>
                            Mes produits
                        </h3>

                        <div class="text-secondary" v-for="product in myProducts" :key="product">
                            <v-card elevation="10" class="profile-container">
                                <!-- ID Commande : {{ product._id }}
                                <ul>
                                    <li>
                                        ID user : {{ product.name }}
                                    </li>
                                    <li>
                                        prix total: {{ product.decription }}
                                    </li>
                                    <li>
                                        produits : {{ product.price }}
                                    </li>
                                    <li>
                                        Status : {{ product.type }}
                                    </li>
                                </ul> -->
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
    name: 'MyProductsView',
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
        this.getProducts();

    },

    methods: {
        async getProducts() {

            const result = await axios.get(`../../restaurant/api/products/restaurant/${this.$route.params.id._id}`, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            })
            this.myProducts = result.data

        },
        home() {
            document.location.href = "/myRestaurant";
        },

    },
}
</script>