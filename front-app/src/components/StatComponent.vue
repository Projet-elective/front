<template>
   <v-container>
        <h1 style="text-align: center;">Statistique page</h1>
        <ul v-for="order in orders" :key="order">
            <li>{{order}} </li>
        </ul>
   </v-container> 
</template>

<script>
import axios from 'axios'


export default {
    name: 'StatComp',
     components: {
        
    },
    data: () => ({
        orders: [],
    }),

    methods: {
        async getmonth() {
            const passWord = this.password
            console.log(passWord)
            await axios.get('http://localhost:3000/api/restaurants/month/62ac6d2d008f56644b5d9d06', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: this.username,
                    password: passWord
                }
            }).then(() => {
                document.cookie = "access_token=";
                this.home();
            }).catch((res) => {
                this.deleteError = true,
                    this.deleteMessage = res.response.data.message
            })
        },
        home() {
            document.location.href = "http://localhost:8090/";
        },
    }
    
}

</script>

