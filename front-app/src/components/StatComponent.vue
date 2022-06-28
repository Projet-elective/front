<template>
   <v-container>
        <template v-if="this.tokenRole == 'COMMERCIAL'">
            <template>
                <h1 style="text-align: center;">Statistique commercials</h1>
                <p>Commande de la semaine</p>
                <ul v-for="week in weeks" :key="week">
                    <li>{{week}}</li>   
                </ul>
            </template>
                <v-spacer></v-spacer>
            <template>
                <p>Commande du mois</p>
                <ul v-for="month in months" :key="month">
                    <li>{{month}}</li>   
                </ul>
            </template>
                <v-spacer></v-spacer>
            <template>
                <p>Commande de l'année</p>
                <ul v-for="year in years" :key="year">
                    <li>{{year}} </li>   
                </ul>
            </template>
        <template>
        </template>
            <template v-if="this.tokenRole == 'RESTAURANT'">
                <h1 style="text-align: center;">Statistique restaurant</h1>
                <p>Commande de la semaine</p>
                <ul v-for="week in weeks" :key="week">
                    <li>{{week}}</li>   
                </ul>
            </template>
                <v-spacer></v-spacer>
            <template>
                <p>Commande du mois</p>
                <ul v-for="month in months" :key="month">
                    <li>{{month}}</li>   
                </ul>
            </template>
                <v-spacer></v-spacer>
            <template>
                <p>Commande de l'année</p>
                <ul v-for="year in years" :key="year">
                    <li>{{year}} </li>   
                </ul>
            </template>
        </template>
   </v-container> 
</template>

<script>
import axios from 'axios'

export default {
    name: 'StatComp',
     components: {
        
    },
    data() {
        return{
            weeks: [],
            months: [],
            years: [],
        };
    },
    created() {
        this.getWeekCommercial();
        this.getMonthCommercial();
        this.getYearCommercial();
        this.getWeekRestaurant();
        this.getMonthRestaurant();
        this.getYearRestaurant();
    },
    methods: {
        getWeekCommercial(){
            axios.get(`/stats/api/commercials/week`, {mode: 'no-cors'})
            .then(response => this.weeks = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
        getMonthCommercial(){
            axios.get(`/stats/api/commercials/month`, {mode: 'no-cors'})
            .then(response => this.months = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
        getYearCommercial(){
            axios.get(`/stats/api/commercials/year`, {mode: 'no-cors'})
            .then(response => this.years = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },

        getWeekRestaurant(){
            axios.get(`/stats/api/restaurants/week`, {mode: 'no-cors'})
            .then(response => this.weeks = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
        getMonthRestaurant(){
            axios.get(`/stats/api/restaurants/month`, {mode: 'no-cors'})
            .then(response => this.months = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
        getYearRestaurant(){
            axios.get(`/stats/api/restaurants/year`, {mode: 'no-cors'})
            .then(response => this.years = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
    },
    mounted() {
    const jwt = require('jose')
    const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
    const decodedjwtToken = jwt.decodeJwt(jwtToken)
    this.tokenUsername = decodedjwtToken.username
    this.tokenRole = decodedjwtToken.role[0]
    },
}
</script>

