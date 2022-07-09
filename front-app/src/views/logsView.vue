<template>
    <v-main>


        <v-btn @click="getLogs">
            Télécharger les logs
        </v-btn>
    </v-main>
</template>

<script>

import axios from 'axios'


export default {
    name: 'addMenuView',
    components: {

    },
    data: () => ({
        errorMessages: '',
        tokenJWT: '',
        tokenRole: '',
        tokenId: '',
    }),
    mounted() {
        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenJWT = jwtToken
        this.tokenRole = decodedjwtToken.role[0]
        this.tokenId = decodedjwtToken.id

    },

    methods: {

        async getLogs() {
            try {
                await axios.get('/orders/api/orders/downloadAllOrder/' + this.tokenId, {
                    headers: {
                        'authorization': `${this.tokenJWT}`
                    }
                })
            } catch (error) {
                console.log(error)
            }

        },

        home() {
            this.$router.push({ name: 'myMenus' })
        },

        // clear() {
        //     this.name = '',
        //         this.description = '',
        //         this.price = '',
        //         this.type = '',
        //         this.$refs.observer.reset()
        // },
    },
}
</script>