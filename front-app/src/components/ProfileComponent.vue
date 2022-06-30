 <style scoped>
.profile-background {
    width: 100%;
    height: 100%;
    background-color: var(--v-secondary-base);
    padding-top: 5em;
    padding-bottom: 5em;
}
.profile-container {
    width: 80%;
    padding: 2em;
    background-color: white;
    border-radius: 25px;
    margin: auto;
}

.title {
    margin-bottom: 1.5em;
    margin-top: 1.5em;
    text-align: center;
    font-size: 3em !important;
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
 <template>
    <div class="profile-background">
        <div v-if="!editTrigger">  
            <v-card elevation="10" class="profile-container">
                <h1 class="title">Profil</h1>
                <div class="col-md-8">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Nom d'utilisateur</h6>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ tokenUsername }}
                                </div>
                                <div class="col-sm-2">
                                    <v-btn color="accent" @click="usernameEdit">
                                        Modifier le nom d'utilisateur
                                    </v-btn>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Adresse mail</h6>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ tokenEmail }}
                                </div>
                                <div class="col-sm-2">
                                    <v-btn color="accent" @click="emailEdit">
                                        Modifier l'adresse mail
                                    </v-btn>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Rôle</h6>
                                </div>
                                <div class="col-sm-7 text-secondary">
                                    {{ tokenRole }}
                                </div>
                                <div class="col-sm-2">
                                    <v-btn color="accent" @click="passwordEdit">
                                        Modifier le mot de passe
                                    </v-btn>

                                </div>
                            </div>
                            <validation-observer ref="observer" v-slot="{ invalid }">
                                <form @submit.prevent="deleteAcc" style="margin-top: 5rem;">
                                    <div>
                                        <h3>Pour supprimer votre compte insérer votre mot de passe</h3>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <validation-provider v-slot="{ errors }" name="Password"
                                                rules="required">
                                                <v-text-field v-model="accPassword" :error-messages="errors"
                                                    label="Mot de passe" type='password' required>
                                                </v-text-field>
                                            </validation-provider>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <v-btn color="error" class="mr-4" type="submit" :disabled="invalid">
                                                Supprimer le compte
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
            <div class="profile-container">
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
            </div>
        </validation-observer>
        <validation-observer ref="observer" v-slot="{ invalid }" v-if="editEmail">
            <div class="profile-container">
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
            </div>
            
        </validation-observer>
        <validation-observer ref="observer" v-slot="{ invalid }" v-if="editPassword">
            <div class="profile-container">
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
            </div>
        </validation-observer>
        <div class="container" v-if="editError" style="color: red;">
            <h2>{{ editMessage }}</h2>
        </div>
        <div class="container" v-if="successTrigger" style="color: green;">
            <h2>{{ successMessage }}</h2>
            <v-btn @click="login">
                Se connecter
            </v-btn>
        </div>
    </div>
</template>


<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from 'axios';


setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} ne doit pas être vide',
})

export default {
    name: 'ProfileComp',
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

        async deleteAcc() {
            const password = this.accPassword
            await axios.delete('/auth/api/auth/delete', {
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
            await axios.patch('/auth/api/auth/patchUser', {

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
                this.successMessage = 'Nom d\'utilisateur modifié !'
                // this.login();

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        async patchEmail() {
            await axios.patch('/auth/api/auth/patchEmail', {

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
                this.successMessage = 'Adresse mail modifié !'
                // this.login();

            }).catch((res) => {
                this.editError = true,
                    this.editMessage = res.response.data.message

            })

        },
        async patchPass() {
            await axios.patch('/auth/api/auth/patchPassword', {

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