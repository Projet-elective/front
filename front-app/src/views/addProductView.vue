<!-- <template>


    <validation-observer ref="observer" v-slot="{ invalid }">
        <div class="profile-container">
            <form @submit.prevent="addProduct" style="margin-top: 5rem;">
                <div>
                    <h3>Enter a test</h3>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="name" rules="required">
                            <v-text-field v-model="form.name" :error-messages="errors" label="test" required>
                            </v-text-field>
                        </validation-provider>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <v-btn class="mr-4" type="submit" :disabled="invalid">
                            Save
                        </v-btn>
                    </div>
                </div>
            </form>
        </div>
    </validation-observer>
</template>


<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
// import axios from 'axios'

setInteractionMode('eager')


extend('required', {
    ...required,
    message: '{_field_} ne doit pas être vide',
})

export default {
    name: 'addProductView',
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data(){
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
        }
    },
    mounted() {
        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenJWT = jwtToken
        this.tokenRole = decodedjwtToken.role[0]
        this.tokenId = decodedjwtToken.id

    },
    methods: {
        async addProduct() {

        },
    },
} -->

<template>

    <div class="register-background">
        <validation-observer ref="observer" v-slot="{ invalid }">
            <div class="register-container">
                <div class="title">
                    Ajouter un produit
                </div>

                <form @submit.prevent="addProduct" v-if="!savingSuccessful" style="margin-bottom: 2rem;">
                    <validation-provider v-slot="{ errors }" name="name" rules="required">
                        <v-text-field class="register-input" v-model="name" :error-messages="errors" label="Nom"
                            required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="desciption" rules="required">
                        <v-text-field class="register-input" v-model="description" :error-messages="errors"
                            label="Description" required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="price" rules="required">
                        <v-text-field class="register-input" v-model="price" :error-messages="errors" label="Prix"
                            required></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="type" rules="required">
                        <v-text-field class="register-input" v-model="type" :error-messages="errors" label="Type"
                            required></v-text-field>
                    </validation-provider>

                    <div class="button-container">
                        <v-btn class="mr-4" type="submit" :disabled="invalid">
                            Ajouter un produit
                        </v-btn>
                        <!-- <v-btn @click="clear">
                            Effacer
                        </v-btn> -->
                    </div>

                </form>
                <div class="container" v-if="savingSuccessful" style="color: green;">
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
                </div>
            </div>
        </validation-observer>
    </div>

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
    name: 'AuthComp',
    components: {
        ValidationProvider,
        ValidationObserver,
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
        restaurantId:'',
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
                    this.restaurantId = res.data.restaurant._id

                }

            }).catch((res) => {
                console.log(res)
            })

        },
        async addProduct() {
            const { name, description, price, type } = this;
            await axios.post('../restaurant/api/products/addProduct/', {
                idRestaurant: this.restaurantId,
                idUser: this.tokenId,
                name: name,
                description: description,
                price: price,
                type: type
            }, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            }).then((res) => {
                console.log(res)
                this.errorMessages = res.data;
                this.savingSuccessful = true
                this.errorInRegister = false

            }).catch((res) => {
                console.log(res)
                this.errorMessages = 'Erreur lors de l\'ajout du produit'
                this.errorInRegister = true
                this.savingSuccessful = false


            })
        },

        // clear() {
        //     this.name = '',
        //         this.description = '',
        //         this.price = '',
        //         this.type = '',
        //         this.$refs.observer.reset()
        // },
        home() {
            document.location.href = "/myRestaurant";
        },
    },
}
</script>



<style scoped>
.register-background {
    width: 100%;
    height: 100%;
    background-color: var(--v-secondary-base);
    padding-top: 5em;
    padding-bottom: 5em;
    box-shadow: 0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%) !important;
}

.register-container {
    width: 60%;
    padding: 2em;
    background-color: white;
    border-radius: 25px;
    margin: auto;
}

.title {
    margin-bottom: 3em;
    text-align: center;
    font-size: 2em !important;
}

.register-input {
    margin-left: 15%;
    margin-right: 15%;
}

.login-button {
    margin-left: 15%;
    margin-top: 2em;
}

.clear-button {
    margin-top: 2em;
}

.create-button {
    margin-top: 2em;
}

.button-container {
    margin-top: 4em;
    margin-left: 15%;
}
</style>

