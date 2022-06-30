<template>
    <div>

        <template v-if="this.tokenRole == 'RESTAURANT'">
            <v-container>

                <h1>Page Order Restaurant</h1>
                <v-btn @click="restaurantNotCompletedOrders">
                    Non completed orders
                </v-btn>
            </v-container>
        </template>
        <template v-if="this.tokenRole == 'CLIENT'">
            <h1>Page order CLient</h1>
        </template>

    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'OrderComp',

    data() {
        return {
            tokenJWT: '',
            tokenUsername: '',
            tokenEmail: '',
            tokenRole: '',
            tokenId: '',

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
            console.log(this.tokenJWT)
            console.log(this.tokenId)
            await axios.get('/orders/api/orders/restaurantsNotCompletedOrders/' + this.tokenId, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            }).then((res) => {
                console.log(res)
            }).catch((res) => {
                console.log(res)
            })

        }
    }
}

</script>