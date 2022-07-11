<style>
.stat-body {
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
                        <h2>Commande du jour</h2>
                        <ul v-for="day in days" :key="day">
                            <li>{{ day }}</li>
                        </ul>
                    </template>
                    <v-spacer></v-spacer>
                    <template>
                        <h2>Commande du mois</h2>
                        <ul v-for="month in months" :key="month">
                            <li>{{ month }}</li>
                        </ul>
                    </template>
                    <v-spacer></v-spacer>
                    <template>
                        <h2>Commande de l'année</h2>
                        <ul v-for="year in years" :key="year">
                            <li>{{ year }} </li>
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
                        <h2>Commande du jour</h2>
                        <ul v-for="day in days" :key="day.id">
                            <li>{{ day }}</li>
                        </ul>
                    </template>
                    <v-spacer></v-spacer>
                    <template>
                        <h2>Commande du mois</h2>
                        <ul v-for="month in months" :key="month.id">
                            <li>{{ month }}</li>
                        </ul>
                    </template>
                    <v-spacer></v-spacer>
                    <template>
                        <h2>Commande de l'année</h2>
                        <ul v-for="year in years" :key="year.id">
                            <li>{{ year }} </li>
                        </ul>
                    </template>
                </div>

            </template>

            <template v-if="this.tokenRole == 'TECH'">
                <div class="container-title">
                    <h1>Utilisation de la mémoire</h1>
                </div>
                <div class="container-lists">
                    {{ freememory }} Go disponblie, sur les {{ totalmemory }} Go initial
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
        return {
            days: [],
            months: [],
            years: [],
            tokenRole: '',
            tokenId: '',
            tokenJWT: '',
            restaurantId: '',
            freememory: [],
            totalmemory: [],
        };
    },
    mounted() {
        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenJWT = jwtToken
        this.tokenId = decodedjwtToken.id
        this.tokenRole = decodedjwtToken.role[0]
        if (this.tokenRole == 'COMMERCIAL') {
            this.getDayCommercial();
            this.getMonthCommercial();
            this.getYearCommercial();
        }
        if (this.tokenRole == 'RESTAURANT') {
            this.getDayRestaurant();
            this.getMonthRestaurant();
            this.getYearRestaurant();
        }
        if (this.tokenRole == 'TECH') {
            this.getFreeMemory();
            this.getTotalMemory();
        }
    },

    methods: {
        getDayCommercial() {
            axios.get(`/stats/api/commercials/day`, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            })
                .then(response => this.days = response.data)
                .catch(e => this.error = [{ title: "Error de chargement", e }]);
        },
        getMonthCommercial() {
            axios.get(`/stats/api/commercials/month`, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            })
                .then(response => this.months = response.data)
                .catch(e => this.error = [{ title: "Error de chargement", e }]);
        },
        getYearCommercial() {
            axios.get(`/stats/api/commercials/year`, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            })
                .then(response => this.years = response.data)
                .catch(e => this.error = [{ title: "Error de chargement", e }]);
        },

        getDayRestaurant() {
            axios.get('/stats/api/restaurants/day/' + this.tokenId, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            }, { mode: 'no-cors' })
                .then(response => this.days = response.data)
                .catch(e => this.error = [{ title: "Error de chargement", e }]);
        },
        getMonthRestaurant() {
            axios.get('/stats/api/restaurants/month/' + this.tokenId, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            }, { mode: 'no-cors' })
                .then(response => this.months = response.data)
                .catch(e => this.error = [{ title: "Error de chargement", e }]);
        },
        getYearRestaurant() {
            axios.get('/stats/api/restaurants/year/' + this.tokenId, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            }, { mode: 'no-cors' })
                .then(response => this.years = response.data)
                .catch(e => this.error = [{ title: "Error de chargement", e }]);
        },
        getFreeMemory() {
            axios.get('/stats/api/techniques/freemem', {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            }, { mode: 'no-cors' })
                .then(response => this.freememory = response.data)
                .catch(e => this.error = [{ title: "Error de chargement", e }]);
        },
        getTotalMemory() {
            axios.get('/stats/api/techniques/totalmem', {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            }, { mode: 'no-cors' })
                .then(response => this.totalmemory = response.data)
                .catch(e => this.error = [{ title: "Error de chargement", e }]);
        },

    }
}
</script>

