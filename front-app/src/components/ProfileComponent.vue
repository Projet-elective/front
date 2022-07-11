 <template>


    <div>

        <div class="profile-background" v-if="tokenExists">
            <div v-if="!editTrigger">
                <v-card elevation="10" class="profile-container">
                    <h1 class="title">Profil</h1>
                    <div class="row">

                        <div class="col-md-8">
                            <div class="card mb-3">
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-5">
                                            <h3 class="mb-0">Nom d'utilisateur</h3>
                                        </div>
                                        <div class="col-md-7 text-secondary">
                                            {{ tokenUsername }}
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-5">
                                            <h3 class="mb-0">Adresse mail</h3>
                                        </div>
                                        <div class="col-md-7 text-secondary">
                                            {{ tokenEmail }}
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-5">
                                            <h3 class="mb-0">Rôle</h3>
                                        </div>
                                        <div class="col-md-7 text-secondary">
                                            {{ tokenRole }}
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <h3 class="mb-0">Adresse</h3>
                                        </div>
                                        <div class="col-md-7 text-secondary">
                                            {{ tokenAddress }}
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

                        <div class="col-md-4">
                            <div class="col-sm-2">
                                <v-btn color="accent" @click="usernameEdit">
                                    Modifier le nom d'utilisateur
                                </v-btn>
                                <v-btn class="create-button" color="accent" @click="emailEdit">
                                    Modifier l'adresse mail
                                </v-btn>
                                <v-btn class="create-button" color="accent" @click="passwordEdit">
                                    Modifier le mot de passe
                                </v-btn>
                                <v-btn class="create-button" color="accent" @click="addressEdit">
                                    Modifier l'adresse
                                </v-btn>
                                <v-btn class="create-button" color="accent" @click="sponsorCodeAdd">
                                    Créer un code de parrainage
                                </v-btn>
                                <v-btn class="create-button" color="accent" @click="sponsorshipAdd">
                                    Ajouter un code de parrainage
                                </v-btn>
                            </div>
                        </div>

                    </div>
                </v-card>

            </div>

            <validation-observer ref="observer" v-slot="{ invalid }" v-if="editUsername">
                <div class="profile-container">
                    <form @submit.prevent="patchUsername" style="margin-top: 5rem;" v-if="!successTrigger">
                        <div>
                            <h3>Entrez votre nouveau nom d'utilisateur</h3>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <validation-provider v-slot="{ errors }" name="username" rules="required">
                                    <v-text-field v-model="form.newUsername" :error-messages="errors"
                                        label="Nouveau nom d'utilisateur" required>
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
                    <v-btn @click="profile" class="create-button">
                        Revenir au profil
                    </v-btn>
                </div>
            </validation-observer>

            <validation-observer ref="observer" v-slot="{ invalid }" v-if="editEmail">
                <div class="profile-container">
                    <form @submit.prevent="patchEmail" style="margin-top: 5rem;" v-if="!successTrigger">
                        <div>
                            <h3>Entrez votre nouvelle adresse mail</h3>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                                    <v-text-field v-model="form.newEmail" :error-messages="errors"
                                        label="Nouvelle adresse mail" required>
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
                    <v-btn @click="profile" class="create-button">
                        Revenir au profil
                    </v-btn>
                </div>
            </validation-observer>

            <validation-observer ref="observer" v-slot="{ invalid }" v-if="editAddress">
                <div class="profile-container">
                    <form @submit.prevent="patchAddress" style="margin-top: 5rem;" v-if="!successTrigger">
                        <div>
                            <h3>Entrez votre nouvelle adresse</h3>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <validation-provider v-slot="{ errors }" name="adresse" rules="required">
                                    <v-text-field v-model="form.newAddress" :error-messages="errors"
                                        label="Nouvelle adresse" required>
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
                    <v-btn @click="profile" class="create-button">
                        Revenir au profil
                    </v-btn>
                </div>
            </validation-observer>

            <validation-observer ref="observer" v-slot="{ invalid }" v-if="editPassword">
                <div class="profile-container">
                    <form @submit.prevent="patchPass" style="margin-top: 5rem;" v-if="!successTrigger">
                        <div>
                            <h3>Entrez votre nouveau mot de passe</h3>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <validation-provider v-slot="{ errors }" name="password" rules="required">
                                    <v-text-field v-model="form.newPassword" :error-messages="errors"
                                        label="Nouveau mot de passe" type='password' required>
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
                    <v-btn @click="profile" class="create-button">
                        Revenir au profil
                    </v-btn>
                </div>
            </validation-observer>
            <validation-observer ref="observer" v-slot="{ invalid }" v-if="editSponsorCode">
                <div class="profile-container">
                    <form @submit.prevent="addSponsorCode" style="margin-top: 5rem;" v-if="!successTrigger">
                        <div>
                            <h3>Entrez un code de parrainage</h3>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <validation-provider v-slot="{ errors }" name="code" rules="required">
                                    <v-text-field v-model="form.sponsorCode" :error-messages="errors"
                                        label="Code de parrainage" required>
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
                    <v-btn @click="profile" class="create-button">
                        Revenir au profil
                    </v-btn>
                </div>
            </validation-observer>
            <validation-observer ref="observer" v-slot="{ invalid }" v-if="editSponsorship">
                <div class="profile-container">
                    <form @submit.prevent="addSponsorship" style="margin-top: 5rem;" v-if="!successTrigger">
                        <div>
                            <h3>Entrez un code de parrainage</h3>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <validation-provider v-slot="{ errors }" name="code" rules="required">
                                    <v-text-field v-model="form.code" :error-messages="errors"
                                        label="Code de parrainage" required>
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
                    <v-btn @click="profile" class="create-button">
                        Revenir au profil
                    </v-btn>
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
        <div v-if="!tokenExists">
            <v-container>
                <h1>Connectez-vous avant d'accéder au profil</h1>
                <v-btn @click="login">
                    Se connecter
                </v-btn>
            </v-container>
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
            tokenExists: true,

            form: {
                newUsername: '',
                newPassword: '',
                newEmail: '',
                newAddress: '',
                sponsorCode: '',
                sponsorship: '',
                code: '',
            },
            tokenUsername: '',
            tokenEmail: '',
            tokenRole: '',
            tokenId: '',
            tokenAddress: '',
            tokenJWT: '',

            username: '',
            password: '',
            email: '',
            role: '',
            code: '',
            test: '',
            sponsored: '',

            accPassword: '',

            editSponsorCode: false,
            editSponsorship: false,

            deleteError: false,
            deleteMessage: '',
            editError: false,
            editMessage: '',

            editTrigger: false,
            editUsername: false,
            editPassword: false,
            editEmail: false,
            editAddress: false,
            successMessage: '',
            successTrigger: false,
        }



    },
    mounted() {
        const i = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        if (i.length > 0) {
            const jwt = require('jose')
            const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
            const decodedjwtToken = jwt.decodeJwt(jwtToken)
            this.tokenUsername = decodedjwtToken.username
            this.tokenEmail = decodedjwtToken.email
            this.tokenId = decodedjwtToken.id
            this.tokenRole = decodedjwtToken.role[0]
            this.tokenAddress = decodedjwtToken.address
            this.tokenExists = true
            this.tokenJWT = jwtToken

        } else {
            this.tokenExists = false
        }
    },
    methods: {

        async deleteAcc() {
            if (confirm('Confirmer la suppression de votre compte')) {
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
            }

        },
        async patchUsername() {
            if (confirm('Confirmer la modification du nom d\'utilisateur')) {
                await axios.patch('/auth/api/auth/patchUser', {

                    username: this.tokenUsername,
                    newusername: this.form.newUsername,
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
            }


        },

        async patchAddress() {
            if (confirm('Confirmer la modification de l\'adresse')) {

                await axios.patch('/auth/api/auth/patchAddress', {

                    username: this.tokenUsername,
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
        async patchEmail() {
            if (confirm('Confirmer la mdoficationde l\'adresse mail')) {

                await axios.patch('/auth/api/auth/patchEmail', {

                    username: this.tokenUsername,
                    newemail: this.form.newEmail,
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
            }

        },
        async patchPass() {
            if (confirm('Confirmer la modification du mot de passe')) {

                await axios.patch('/auth/api/auth/patchPassword', {

                    username: this.tokenUsername,
                    newpassword: this.form.newPassword,
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
            }

        },
        async addSponsorCode() {
            if (confirm('Confirmer l\'ajout du code de parrainage')) {

                await axios.post('sponsor/api/sponsor-code/add', {

                    user: this.tokenId,
                    code: this.form.sponsorCode,
                    role: this.tokenRole,
                    
                }, {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${this.tokenJWT}`
                    },
                }

                ).then(() => {
                    this.successTrigger = true

                    this.successMessage = 'Sponsor Code added successfully!'
                    this.profile()

                }).catch((res) => {
                    this.editError = true,
                        this.editMessage = res.response.data.message

                })
            }

        },
        async addSponsorship() {
            await axios.post('sponsor/api/sponsorship/add', {

                code: this.form.code,
                sponsored: {
                    user: this.tokenId,
                    role: this.tokenRole
                }

            }, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${this.tokenJWT}`
                },
            }

            ).then(() => {
                this.successTrigger = true

                this.successMessage = 'Sponsorship added successfully!'
                this.profile()

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
        addressEdit() {
            this.editTrigger = true
            this.editAddress = true
        },
        sponsorCodeAdd() {
            this.editTrigger = true
            this.editSponsorCode = true
        },
        sponsorshipAdd() {
            this.editTrigger = true
            this.editSponsorship = true
        },

        home() {
            this.$router.push({ name: 'home' })
        },
        login() {
            this.$router.push({ name: 'login' })
        },
        profile() {
            this.$router.go({ name: 'profile' })
        },
        disconnectUser() {
            document.cookie = "access_token=";
            this.home();
        }
    }
}
</script>
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