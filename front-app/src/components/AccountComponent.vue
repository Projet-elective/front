 <template>
    <v-container>
        <div v-if="!editTrigger">
            <h1 style="text-align: center;">Comptes</h1>
            <v-card>
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Username</h6>
                                </div>
                                <div class="col-sm-7 text-secondary" v-for="test in tests" :key="test.username" >
                                    {{ test.username}}
                                </div>
                                
                                <div class="col-sm-2">
                                    <v-btn @click="usernameEdit">
                                        edit username
                                    </v-btn>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Email</h6>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ tokenEmail }}
                                </div>
                                <div class="col-sm-2">
                                    <v-btn @click="emailEdit">
                                        edit email
                                    </v-btn>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Role</h6>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ tokenRole }}
                                </div>
                                <div class="col-sm-2">
                                    <v-btn @click="passwordEdit">
                                        edit password
                                    </v-btn>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Address</h6>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ tokenAddress }}
                                </div>
                                <div class="col-sm-2">
                                    <v-btn @click="addressEdit">
                                    Modifier l'adresse
                                </v-btn>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <v-btn @click="banEdit">
                                        edit ban
                                    </v-btn>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <v-btn @click="deBanEdit">
                                        edit deban
                                    </v-btn>

                                </div>
                            </div>
                            <validation-observer ref="observer" v-slot="{ invalid }">
                                <form @submit.prevent="deleteAcc" style="margin-top: 5rem;">
                                    <div>
                                        <h3>To delete you account enter your password</h3>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <validation-provider v-slot="{ errors }" name="Password"
                                                rules="required">
                                                <v-text-field v-model="accPassword" :error-messages="errors"
                                                    label="Password" type='password' required>
                                                </v-text-field>
                                            </validation-provider>
                                            <validation-provider v-slot="{ errors }" name="username" rules="required">
                                            <v-text-field v-model="form.username" :error-messages="errors" label="Username" required>
                                            </v-text-field>
                                        </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <v-btn class="mr-4" type="submit" :disabled="invalid">
                                                Delete account
                                            </v-btn>
                                        </div>
                                    </div>
                                    <div class="container" v-if="deleteError" style="color: red;">
                                        <h2>{{ deleteMessage }}</h2>
                                    </div>
                                </form>
                            </validation-observer>



                        </div>
                    </div>
                    <div class="col-sm-2">
                        <v-btn @click="disconnectUser">
                            Disconnect
                        </v-btn>

                    </div>
                </div>
            </v-card>

        </div>
        <validation-observer ref="observer" v-slot="{ invalid }" v-if="editUsername">
            <form @submit.prevent="patchUsername" style="margin-top: 5rem;" v-if="!successTrigger">
                <div>
                    <h3>Enter your new username</h3>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="username" rules="required">
                            <v-text-field v-model="form.username" :error-messages="errors" label="Username" required>
                            </v-text-field>
                        </validation-provider>
                    </div>
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="newusername" rules="required">
                            <v-text-field v-model="form.newusername" :error-messages="errors" label="New Username" required>
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
        <validation-observer ref="observer" v-slot="{ invalid }" v-if="editEmail">
            <form @submit.prevent="patchEmail" style="margin-top: 5rem;" v-if="!successTrigger">
                <div>
                    <h3>Enter your new email</h3>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="email" rules="required">
                            <v-text-field v-model="form.email" :error-messages="errors" label="Email" required>
                            </v-text-field>
                        </validation-provider>
                    </div>
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="username" rules="required">
                            <v-text-field v-model="form.username" :error-messages="errors" label="Username" required>
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
        <validation-observer ref="observer" v-slot="{ invalid }" v-if="editPassword">
            <form @submit.prevent="patchPass" style="margin-top: 5rem;" v-if="!successTrigger">
                <div>
                    <h3>Enter your new password</h3>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="username" rules="required">
                            <v-text-field v-model="form.username" :error-messages="errors" label="Username" required>
                            </v-text-field>
                        </validation-provider>
                    </div>
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="password" rules="required">
                            <v-text-field v-model="form.password" :error-messages="errors" label="password"
                                type='password' required>
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
                <validation-observer ref="observer" v-slot="{ invalid }" v-if="editAddress">
            <form @submit.prevent="patchAddress" style="margin-top: 5rem;" v-if="!successTrigger">
                <div>
                    <h3>Enter your new address</h3>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="address" rules="required">
                            <v-text-field v-model="form.newAddress" :error-messages="errors" label="Address" required>
                            </v-text-field>
                        </validation-provider>
                    </div>
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="username" rules="required">
                            <v-text-field v-model="form.username" :error-messages="errors" label="Username" required>
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
        <validation-observer ref="observer" v-slot="{ invalid }" v-if="editBan">
            <form @submit.prevent="patchBan" style="margin-top: 5rem;" v-if="!successTrigger">
                <div>
                    <h3>Enter your ban username</h3>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="username" rules="required">
                            <v-text-field v-model="form.username" :error-messages="errors" label="Username" required>
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
        <validation-observer ref="observer" v-slot="{ invalid }" v-if="editDeBan">
            <form @submit.prevent="patchDeBan" style="margin-top: 5rem;" v-if="!successTrigger">
                <div>
                    <h3>Enter your deban username</h3>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <validation-provider v-slot="{ errors }" name="username" rules="required">
                            <v-text-field v-model="form.username" :error-messages="errors" label="Username" required>
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

        <div class="container" v-if="editError" style="color: red;">
            <h2>{{ editMessage }}</h2>
        </div>
        <div class="container" v-if="successTrigger" style="color: green;">
            <h2>{{ successMessage }}</h2>
        </div>
    </v-container>
</template>


<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from 'axios';


setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

export default {
    name: 'AccountComp',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {

            form: {
                username: '',
                newAddress: '',
            },
            tokenUsername: '',
            tokenEmail: '',
            tokenRole: '',

            username: '',
            password: '',
            email: '',
            address: '',
            newusername: '',
            newpassword: '',
            newemail: '',
            newAddress:'',
            
            role: '',

            accPassword: '',

            deleteError: false,
            deleteMessage: '',
            editError: false,
            editMessage: '',

            editTrigger: false,
            editUsername: false,
            editPassword: false,
            editEmail: false,
            editAddress: false,
            editBan: false,
            editDeBan: false,
            successMessage: '',
            successTrigger: false,
            tests: undefined
        }



    },
    mounted() {

        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.tokenUsername = decodedjwtToken.username
        this.tokenEmail = decodedjwtToken.email
        this.tokenRole = decodedjwtToken.role[0]
        this.getAll()
    },
    methods: {

        async getAll() {
                const test = await axios.get('/auth/api/auth/getAll')  
                this.tests = test.data   
        },
        async deleteAcc() {
            const password = this.accPassword
            await axios.delete('/auth/api/auth/delete', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: this.form.username,
                    password: password
                }
            }).then(() => {
                this.home()
            }).catch((res) => {
                this.deleteError = true,
                    this.deleteMessage = res.response.data.message

            })
        },
        async patchBan() {
            await axios.patch('/auth/api/auth/patchForBan', {

                username: this.form.username,
            }, {

                headers: {
                    'Content-Type': 'application/json'
                },
            }

            ).then(() => {
                this.successTrigger = true
                this.successMessage = 'Ban updated successfully!'
                this.home()

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        async patchDeBan() {
            await axios.patch('/auth/api/auth/patchForDeBan', {

                username: this.form.username,
            }, {

                headers: {
                    'Content-Type': 'application/json'
                },
            }

            ).then(() => {
                this.successTrigger = true
                this.successMessage = 'DeBan updated successfully!'
                this.home()

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        async patchAddress() {
            if (confirm('Confirmer la modification de l\'adresse')) {

                await axios.patch('/auth/api/auth/patchAddress', {

                    username: this.form.username,
                    newaddress: this.form.newAddress,
                }, {

                    headers: {
                        'Content-Type': 'application/json'
                    },
                }

                ).then((res) => {
                    console.log(res)
                    document.cookie = "access_token=";
                    this.successTrigger = true
                    this.successMessage = 'Adresse modifiée !'
                    // this.login();

                }).catch((res) => {
                    this.editError = true,
                        this.editMessage = res.response.data.message

                })
            }

        },
        async patchUsername() {
            await axios.patch('/auth/api/auth/patchUser', {

                username: this.form.username,
                newusername: this.form.newusername,
            }, {

                headers: {
                    'Content-Type': 'application/json'
                },
            }

            ).then(() => {
                this.successTrigger = true
                this.successMessage = 'Username updated successfully!'
                this.home()

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        async patchEmail() {
            await axios.patch('/auth/api/auth/patchEmail', {

                username: this.form.username,
                newemail: this.form.email,
            }, {

                headers: {
                    'Content-Type': 'application/json'
                },
            }

            ).then(() => {
                this.successTrigger = true
                this.successMessage = 'Email updated successfully!'
                this.home()

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        async patchPass() {
            await axios.patch('/auth/api/auth/patchPassword', {

                username: this.form.username,
                newpassword: this.form.password,
            }, {

                headers: {
                    'Content-Type': 'application/json'
                },
            }

            ).then(() => {
                this.successTrigger = true
                this.successMessage = 'Password updated successfully!'
                this.home()

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        usernameEdit() {
            this.editTrigger = true
            this.editUsername = true
        },
        banEdit() {
            this.editTrigger = true
            this.editBan = true
        },
        deBanEdit() {
            this.editTrigger = true
            this.editDeBan = true
        },
        passwordEdit() {
            this.editTrigger = true
            this.editPassword = true
        },
        emailEdit() {
            this.editTrigger = true
            this.editEmail = true
        },
        addressEdit() {
            this.editTrigger = true
            this.editAddress = true
        },
        home() {
            document.location.href = "/";
        },
        login() {
            document.location.href = "/login";
        },
        disconnectUser() {
            document.cookie = "access_token=";
            this.home();
        }
    }
}
</script>