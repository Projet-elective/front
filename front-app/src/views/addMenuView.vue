<template>

    <div class="register-background">
        <validation-observer ref="observer" v-slot="{ invalid }">
            <div class="register-container">
                <div class="title">
                    Ajouter un menu
                </div>

                <form @submit.prevent="addMenu" v-if="!savingSuccessful" style="margin-bottom: 2rem;">
                    <validation-provider v-slot="{ errors }" name="name" rules="required">
                        <v-text-field class="register-input" v-model="name" :error-messages="errors" label="Nom"
                            required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="Entrée" rules="required">
                        <v-select class="register-input" v-model="entree" :items="myEntrees" item-text="name"
                            item-value="_id" :error-messages="errors" label="Choisir une entrée" data-vv-name="entree"
                            required></v-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="main" rules="required">
                        <v-select class="register-input" v-model="main" :items="myMains" item-text="name"
                            item-value="_id" :error-messages="errors" label="Choisir un plat principal"
                            data-vv-name="main" required></v-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="drink" rules="required">
                        <v-select class="register-input" v-model="drink" :items="myDrinks" item-text="name"
                            item-value="_id" :error-messages="errors" label="Choisir une boisson" data-vv-name="drink"
                            required></v-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="dessert" rules="required">
                        <v-select class="register-input" v-model="dessert" :items="myDesserts" item-text="name"
                            item-value="_id" :error-messages="errors" label="Choisir un dessert" data-vv-name="dessert"
                            required></v-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="price" rules="required">
                        <v-text-field class="register-input" type="number" v-model="price" :error-messages="errors"
                            label="Prix" required></v-text-field>
                    </validation-provider>

                    <div class="button-container">
                        <v-btn class="mr-4" type="submit" :disabled="invalid">
                            Ajouter un menu
                        </v-btn>
                        <!-- <v-btn @click="clear">
                            Effacer
                        </v-btn> -->
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
    </div>

</template>

<script>
import { required, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from 'axios'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: ' Ce champ est requis',
})
extend('numeric', {
    ...numeric,
    message: '{_field_} needs to be a number. ({_value_})',
})


export default {
    name: 'addMenuView',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        name: '',
        entree: '',
        main: '',
        dessert: '',
        price: '',
        drink: '',
        savingSuccessful: false,
        errorInRegister: false,
        errorMessages: '',
        tokenJWT: '',
        tokenRole: '',
        tokenId: '',
        restauId: '',
        myProducts: [],
        myEntrees: [],
        myMains: [],
        myDrinks: [],
        myDesserts: [],
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
            await axios.get('../restaurant/api/restaurants/getByOwner/' + ownerId, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            }).then((res) => {
                if (res.data.restaurant.idOwner == this.tokenId) {
                    this.restauId = res.data.restaurant._id
                    this.myProducts = res.data.products
                }
                for (let i = 0; i < this.myProducts.length; i++) {
                    const prod = this.myProducts
                    if (prod[i].type == 'Entrée') {
                        this.myEntrees.push(prod[i])
                    }
                    if (prod[i].type == 'Plat principal') {
                        this.myMains.push(prod[i])
                    }
                    if (prod[i].type == 'Boisson') {
                        this.myDrinks.push(prod[i])
                    }
                    if (prod[i].type == 'Dessert') {
                        this.myDesserts.push(prod[i])
                    }

                }
            }).catch((res) => {
                console.log(res)
            })

        },
        async addMenu() {
            const { name, entree, main, drink, dessert, price } = this;
            axios.post('../restaurant/api/menus/addMenu/', {
                idRestaurant: this.restauId,
                name: name,
                entree: entree,
                main: main,
                drink: drink,
                dessert: dessert,
                price: price,
            }, {
                headers: {
                    'authorization': `${this.tokenJWT}`
                }
            }).then(() => {
                this.home()

            }).catch((res) => {

                console.log(res)

            })
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
