<template>

    <div class="register-background">
        <validation-observer ref="observer" v-slot="{ invalid }">
            <div class="register-container">
                <div class="title">
                    Modifier un produit
                </div>

                <form @submit.prevent="editProduct" style="margin-bottom: 2rem;">
                    <validation-provider v-slot="{ errors }" name="name" rules="required">
                        <v-text-field class="register-input" v-model="productName" :error-messages="errors" label="Nom"
                            required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="desciption" rules="required">
                        <v-text-field class="register-input" v-model="productDesc" :error-messages="errors"
                            label="Description" required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="price" rules="required|numeric">
                        <v-text-field class="register-input" v-model="productPrice" :error-messages="errors"
                            label="Prix" required></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="type" rules="required">
                        <v-text-field class="register-input" v-model="productType" :error-messages="errors" label="Type"
                            required></v-text-field>
                    </validation-provider>

                    <div class="button-container">
                        <v-btn class="mr-4" type="submit" :disabled="invalid">
                            Modifier
                        </v-btn>
                    </div>

                </form>
            </div>
        </validation-observer>

        <div class="container" v-if="error" style="color: red;">
            <h1>{{ errorMessages }}</h1>
            <v-btn @click="myProducts">
                Voir mes produits
            </v-btn>

        </div>
    </div>

</template>


<script>
import { required, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from 'axios'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} ne doit pas être vide',
})
extend('numeric', {
    ...numeric,
    message: '{_field_} needs to be a number. ({_value_})',
})

export default {
    name: 'editProductView',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            name: '',
            description: '',
            price: '',
            type: '',
            productId: this.$route.params.product._id,
            productName: this.$route.params.product.name,
            productDesc: this.$route.params.product.description,
            productPrice: this.$route.params.product.price,
            productType: this.$route.params.product.type,
            errorMessages: '',
            error: false
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
        async editProduct() {

            try {
                await axios.patch('/restaurant/api/products/editProduct/' + `${this.productId}`, {

                    name: this.productName,
                    description: this.productDesc,
                    price: this.productPrice,
                    type: this.productType,

                }, {

                    headers: {
                        'Authorization': `${this.tokenJWT}`
                    },
                })
                this.myProducts()


            } catch (error) {
                console.log(error)
                this.error = true
                this.errorMessages = 'Erreur lors de la modification du produit'

            }
        },
        myProducts() {
            this.$router.push({ name: 'myProducts'})
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

