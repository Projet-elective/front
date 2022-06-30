<style>
.stat-body{
    background-color: var(--v-secondary-base);
    height: 100%;
}

.stat-container {
    margin-right: 10%;
    margin-left: 10%;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    width: auto;
    background-color: white;
    height: 100%;
    box-shadow: 0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%) !important;
}

.container-title {
    width: 100%;
    height: 150px;
    background-color: var(--v-accent-base);
    padding-left: 10%;
    padding-top: 50px;
}

.container-title h1 {
    color: white;
}

.container-lists {
    padding-right: 10%;
    padding-left: 10%;
}

.container-list .h2 {
    background-color: green;
    padding: 10px 30px;
    width: fit-content;
    color: white;
    border-radius: 25px;
    margin-bottom: 25px;
    margin-top: 25px;
}
</style>
<template>
<div class="stat-body">
    <v-container class="stat-container">
        <template v-if="this.tokenRole == 'COMMERCIAL'">
            <div class="container-title">
                <h1>Statistique Commercial</h1>
            </div>
            <div class="container-lists">
                <template>
                    <h2>Commande de la semaine</h2>
                    <ul v-for="week in weeks" :key="week">
                        <li>{{week}}</li> 
                        
                    </ul>
                    <ul>
                        <li>text</li>  
                        <li>text</li> 
                        <li>text</li> 
                    </ul>
                </template>
                    <v-spacer></v-spacer>
                <template>
                    <h2>Commande du mois</h2>
                    <ul v-for="month in months" :key="month">
                        <li>{{month}}</li>   
                    </ul>
                </template>
                    <v-spacer></v-spacer>
                <template>
                    <h2>Commande de l'année</h2>
                    <ul v-for="year in years" :key="year">
                        <li>{{year}} </li>   
                    </ul>
                </template>
            </div>
            
        </template>
        <template v-if="this.tokenRole == 'RESTAURANT'">
                <div class="container-title">
                    <h1>Statistique Restaurant</h1>
                </div>
                <div class="container-lists">
                    <template>
                        <h2>Commande de la semaine</h2>
                        <ul v-for="week in weeks" :key="week">
                            <li>{{week}}</li>   
                        </ul>
                    </template>
                        <v-spacer></v-spacer>
                    <template>
                        <h2>Commande du mois</h2>
                        <ul v-for="month in months" :key="month">
                            <li>{{month}}</li>   
                        </ul>
                    </template>
                        <v-spacer></v-spacer>
                    <template>
                        <h2>Commande de l'année</h2>
                        <ul v-for="year in years" :key="year">
                            <li>{{year}} </li>   
                        </ul>
                    </template>
                </div>
            
        </template>
   </v-container>
</div>
    
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
    mounted() {
        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenId = decodedjwtToken.id
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
            axios.get(`/stats/api/restaurants/week/${this.tokenId}`, {mode: 'no-cors'})
            .then(response => this.weeks = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
        getMonthRestaurant(){
            axios.get(`/stats/api/restaurants/month/${this.tokenId}`, {mode: 'no-cors'})
            .then(response => this.months = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
        getYearRestaurant(){
            axios.get(`/stats/api/restaurants/year/${this.tokenId}`, {mode: 'no-cors'})
            .then(response => this.years = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
    }
}
</script>

