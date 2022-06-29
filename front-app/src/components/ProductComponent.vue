 <template>
   <!-- <v-container v-if="this.tokenRole == 'RESTAURANT'">-->
    <v-container>
    <!--<ul v-for="productlist in productlists" :key="productlist">-->
        <ul >
            <div class="row">
                <div class="col-sm-3">
                        <h6 class="mb-0">Nom</h6>
                </div>
                <div class="col-sm-7 text-secondary">
                    <!--{{ productlist.name }}-->
                    productlist.name
                </div>
                <div class="col-sm-2">
                    <v-btn @click="productnameEdit">
                        éditer le nom
                    </v-btn>
                </div>
            </div>
        </ul>
        <validation-observer ref="observer" v-slot="{ invalid }" v-if="editProductname">
            <form @submit.prevent="patchProductname" style="margin-top: 5rem;" v-if="!successTrigger">
                <div>
                    <h3>Enter un nouveau nom</h3>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="productname" rules="required">
                            <v-text-field v-model="form.username" :error-messages="errors" label="Nom produit" required>
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
        </validation-observer>




        <validation-observer ref="observer" v-slot="{ invalid }">
            <div class="container">
                <div class="title">
                   Ajouter un Produit
                </div>
                <form @submit.prevent="product" v-if="!savingSuccessful" style="margin-bottom: 2rem;">
                    <validation-provider v-slot="{ errors }" name="id">
                        <v-text-field v-model="id" :error-messages="errors" label="Id">
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="name" rules="required">
                        <v-text-field v-model="name" :error-messages="errors" label="nom" required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="description" rules="required">
                        <v-text-field v-model="description" :error-messages="errors" label="description" required>
                        </v-text-field>
                    </validation-provider>
                     <validation-provider v-slot="{ errors }" name="price" rules="required">
                        <v-text-field v-model="price" :error-messages="errors" label="prix" required>
                        </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="type" rules="required">
                        <v-text-field v-model="type" :error-messages="errors" label="type" required>
                        </v-text-field>
                    </validation-provider>
                    
                    <v-btn class="mr-4" type="submit" :disabled="invalid">
                        submit
                    </v-btn>
                    <v-btn @click="clear">
                        clear
                    </v-btn>
                </form>
                <div class="container" v-if="savingSuccessful" style="color: green;">
                    <h1>{{ errorMessages }}</h1>
                    <v-btn @click="home">
                        Return home
                    </v-btn>
                </div>
                <div class="container" v-if="errorInRegister" style="color: red;">
                    <h1>{{ errorMessages }}</h1>
                    <v-btn @click="home">
                        Return home
                    </v-btn>
                </div>
            </div>
        </validation-observer>

    </v-container>
</template>


<script>
    import { required, digits, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import axios from 'axios'
    setInteractionMode('eager')
    extend('digits', {
        ...digits,
        message: '{_field_} needs to be {length} digits. ({_value_})',
    })
    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })
    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })
    extend('regex', {
        ...regex,
        message: '{_field_} {_value_} does not match {regex}',
    })

    export default {
        name: 'ProductComp',
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        props: {
    value: { type: Object, required: false, default: () => ({}) }
  },
        data() {
            return {
              form: {
                username: '',
            },
            productname: '',
            tokenEmail: '',
            tokenRole: '',
            username: '',
            password: '',
            email: '',
            role: '',

            accPassword: '',
            
            deleteError: false,
            deleteMessage: '',
            editError: false,
            editMessage: '',

            editTrigger: false,
            editProductname: false,
            editPassword: false,
            editEmail: false,
            successMessage: '',
            successTrigger: false,
            }
        },
        mounted() {
            const jwt = require('jose')
            const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
            const decodedjwtToken = jwt.decodeJwt(jwtToken)
            this.tokenUsername = decodedjwtToken.username
            this.tokenEmail = decodedjwtToken.email
            this.tokenId = decodedjwtToken.id
        },
        created() {
            this.getListProduct();
        },
        methods: {
            getListProduct(){
                //`/restaurant/api/restaurants/allProducts/${this.tokenId}`
                axios.get(`/restaurant/api/products/allProducts/62ac6d2d008f56644b5d9d06`, {mode: 'no-cors'})
                .then(response => this.years = response.data)
                .catch(e => this.error = [{ title: "Error de chargement",e }]);
             },

            async patchProductname() {
                await axios.patch('/restaurant/api/product/editProduct', {
                    product: this.productname,
                    newproductname: this.form.username,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
                ).then(() => {
                    document.cookie = "access_token=";
                    this.successTrigger = true
                    this.successMessage = 'Username updated successfully!'
                    // this.login();
                }).catch((res) => {
                    this.editError = true,
                        this.editMessage = res.response.data.message
                })
            },
        },
        productnameEdit() {
            this.editTrigger = true
            this.editProductname = true
        },
        clear() {
            this.name = ''
            this.description = ''
            this.price = ''
            this.type = ''

            this.select = null
            this.$refs.observer.reset()
        },
        
        home() {
            document.location.href = "/";
        }
        }
</script>