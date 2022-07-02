<template>
    <v-main>

        <v-container v-if="this.tokenRole == 'RESTAURANT'">
            <v-card elevation="10" class="profile-container">
                <h1 class="title">My Restaurant</h1>
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h3 class="mb-0">Name</h3>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ restauName }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h3 class="mb-0">Description</h3>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ restauDesc }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h3 class="mb-0">Address</h3>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ restauAddress }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h3 class="mb-0">Type</h3>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ restauType }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>
            <v-btn class="mr-4" :to="{ name: 'addProduct' }">
                Ajouter un produit
            </v-btn>
            <v-btn class="mr-4" :to="{ name: 'addMenu' }">
                Ajouter un menu
            </v-btn>
            <v-btn class="mr-4" :to="{ name: 'myProducts' }">
                Voir mes produits
            </v-btn>

        </v-container>
        <v-container v-if="this.tokenRole == 'RESTAURANT' && this.hasRestaurant == false">
            <v-card elevation="10" class="profile-container">

                <validation-observer ref="observer" v-slot="{ invalid }">
                    <div class="register-container">
                        <h1 class="title">Create a restaurant</h1>
                        <form @submit.prevent="createRestaurant" style="margin-bottom: 2rem;">
                            <validation-provider v-slot="{ errors }" name="Nom du restaurant" rules="required">
                                <v-text-field class="register-input" v-model="form.name" :error-messages="errors"
                                    label="Nom du restaurant" required>
                                </v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="Description" rules="required">
                                <v-text-field class="register-input" v-model="form.desciption" :error-messages="errors"
                                    label="Description" required>
                                </v-text-field>
                                <validation-provider v-slot="{ errors }" name="Adresse" rules="required">
                                    <v-text-field class="register-input" v-model="form.address" :error-messages="errors"
                                        label="Adresse" required>
                                    </v-text-field>
                                </validation-provider>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="Type de restaurant" rules="required">
                                <v-text-field class="register-input" v-model="form.type" :error-messages="errors"
                                    label="Type de restaurant" required>
                                </v-text-field>
                            </validation-provider>
                            <div class="button-container">
                                <v-btn class="mr-4" type="submit" :disabled="invalid">
                                    Créer mon restaurant
                                </v-btn>
                                <v-btn @click="clear">
                                    Effacer
                                </v-btn>
                            </div>

                        </form>
                        <!-- <div class="container" v-if="savingSuccessful" style="color: green;">
                            <h1>{{ errorMessages }}</h1>
                            <v-btn @click="home">
                                Retourner à l'accueil
                            </v-btn>
                        </div>
                        <div class="container" v-if="errorInRegister" style="color: red;">
                            <h1>{{ errorMessages }}</h1>
                            <v-btn @click="home">
                                Retourner à l'accueil
                            </v-btn>
                        </div> -->
                    </div>
                </validation-observer>

            </v-card>


        </v-container>

        <v-container v-if="this.tokenRole != 'RESTAURANT'">
            <h1>Vous ne pouvez pas accéder à cette page</h1>
        </v-container>


    </v-main>
</template>


<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from 'axios'

setInteractionMode('eager')


extend('required', {
    ...required,
    message: '{_field_} ne doit pas être vide',
})

export default {
    name: 'MyRestauComp',
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            form: {
                name: '',
                description: '',
                address: '',
                type: '',
            },
            tokenJWT: '',
            tokenRole: '',
            tokenId: '',
            hasRestaurant: false,
            restauName: '',
            restauDesc: '',
            restauAddress: '',
            restauType: '',
            restauId: '',
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
        async createRestaurant() {
            try {

                await axios.post('/restaurant/api/restaurants/add', {
                    idOwner: this.tokenId,
                    restaurantName: this.form.name,
                    restaurantDescritpion: this.form.description,
                    restaurantAddress: this.form.address,
                    restaurantType: this.form.type,
                })
            } catch (error) {
                console.log(error)
            }
        },
        clear() {
            this.form.name = ''
            this.form.description = ''
            this.form.address = ''
            this.form.type = ''
            this.$refs.observer.reset()
        },

    },
}
</script>