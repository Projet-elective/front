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
                        <v-text-field class="register-input" v-model="entree" :error-messages="errors" label="Entrée"
                            required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="main" rules="required">
                        <v-text-field class="register-input" v-model="main" :error-messages="errors"
                            label="Plat de résistance" required></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="drink" rules="required">
                        <v-text-field class="register-input" v-model="drink" :error-messages="errors" label="Boisson"
                            required></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="dessert" rules="required">
                        <v-text-field class="register-input" v-model="dessert" :error-messages="errors" label="Dessert"
                            required></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="price" rules="required">
                        <v-text-field class="register-input" v-model="price" :error-messages="errors" label="Prix"
                            required></v-text-field>
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
        entree: '',
        main: '',
        dessert: '',
        price: '',
        drink:'',
        savingSuccessful: false,
        errorInRegister: false,
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
        async addMenu() {
            const { name, entree, main,drink, dessert, price } = this;
            await axios.post('../restaurant/api/menus/addMenu/', {
                idUser: this.tokenId,
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
                this.errorMessages = 'Menu added';
                this.savingSuccessful = true
                this.errorInRegister = false

            }).catch((res) => {
                console.log(res)
                this.errorMessages = 'Error in add'
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
    },
}
</script>

