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
                                <div class="col-sm-7 text-secondary" v-if="getAll">
                                    {{ getAll()}}
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
        <div class="container" v-if="editError" style="color: red;">
            <h2>{{ editMessage }}</h2>
        </div>
        <div class="container" v-if="successTrigger" style="color: green;">
            <h2>{{ successMessage }}</h2>
            <v-btn @click="login">
                Login
            </v-btn>
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
            },
            tokenUsername: '',
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
            editUsername: false,
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
        this.tokenRole = decodedjwtToken.role[0]
    },
    methods: {

        async getAll() {
            try{
                const test = await axios.get('http://localhost:8080/api/auth/getAll')       
                    console.log(test)
                    res.send(test)
            }catch(error) {
                this.getError = true,
                    this.getMessage = res.response.data.message

            }
        },
        async deleteAcc() {
            const password = this.accPassword
            await axios.delete('http://localhost:8080/api/auth/delete', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: this.tokenUsername,
                    password: password
                }
            }).then(() => {
                document.cookie = "access_token=";
                this.home();

            }).catch((res) => {
                this.deleteError = true,
                    this.deleteMessage = res.response.data.message

            })
        },
        async patchUsername() {
            await axios.patch('http://localhost:8080/api/auth/patchUser', {

                username: this.tokenUsername,
                newusername: this.form.username,
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
        async patchEmail() {
            await axios.patch('http://localhost:8080/api/auth/patchEmail', {

                username: this.tokenUsername,
                newemail: this.form.email,
            }, {

                headers: {
                    'Content-Type': 'application/json'
                },
            }

            ).then(() => {
                document.cookie = "access_token=";
                this.successTrigger = true
                this.successMessage = 'Email updated successfully!'
                // this.login();

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        async patchPass() {
            await axios.patch('http://localhost:8080/api/auth/patchPassword', {

                username: this.tokenUsername,
                newpassword: this.form.password,
            }, {

                headers: {
                    'Content-Type': 'application/json'
                },
            }

            ).then(() => {
                document.cookie = "access_token=";
                this.successTrigger = true
                this.successMessage = 'Password updated successfully!'

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        usernameEdit() {
            this.editTrigger = true
            this.editUsername = true
        },
        passwordEdit() {
            this.editTrigger = true
            this.editPassword = true
        },
        emailEdit() {
            this.editTrigger = true
            this.editEmail = true
        },

        home() {
            document.location.href = "http://localhost:8090/";
        },
        login() {
            document.location.href = "http://localhost:8090/login";
        },
        disconnectUser() {
            document.cookie = "access_token=";
            this.home();
        }
    }
}
</script>