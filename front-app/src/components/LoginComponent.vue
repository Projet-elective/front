<style scoped>
.login-background {
    width: 100%;
    height: 100%;
    background-color: var(--v-secondary-base);
    padding-top: 5em;
    padding-bottom: 5em;
    box-shadow: 0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%) !important;
}
.login-container {
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

.login-input {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 2em;
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
    margin-top: 5em;
}
</style>
<template>
<div class="login-background">
    <validation-observer ref="observer" v-slot="{ invalid }">
        <div class="login-container">
            <div class="title">
                Connexion
            </div>

            <form @submit.prevent="login" style="margin-bottom: 2rem;">
                <validation-provider v-slot="{ errors }" name="username" rules="required">
                    <v-text-field class="login-input" v-model="username" :error-messages="errors" label="Nom d'utilisateur" required>
                    </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="password" rules="required">
                    <v-text-field class="login-input" v-model="password" :error-messages="errors" label="Mot de passe" type='password' required>
                    </v-text-field>
                </validation-provider>
                <v-btn class="mr-4 login-button" type="submit" :disabled="invalid">
                    Connexion
                </v-btn>
                <v-btn class="clear-button" @click="clear">
                    Effacer
                </v-btn>
            </form>
            <div class="container" v-if="errorInLogin" style="color: red;">
                <h2>{{ messageView }}</h2>
            </div>
            <div class="button-container">
                <h3>Pas de compte ? Créer un compte en cliquant sur ce bouton</h3>
                <v-btn color="primary" class="create-button" @click="createAccount">
                    Créer un compte
                </v-btn>
            </div>
        </div>
    </validation-observer>
</div>
    

</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from 'axios'

setInteractionMode('eager')

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
    ...required,
    message: '{_field_} ne doit pas être vide',
})

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
    ...regex,
    message: '{_field_} {_value_} ne correspondent pas {regex}',
})

extend('email', {
    ...email,
    message: 'L\'adresse mail doit être valide',
})

export default {
    name: 'LoginComp',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        username: '',
        password: '',
        errorInLogin: false,
        messageView: '',
    }),

    methods: {
        async login() {
            const { username, password } = this;

            await axios.post('/auth/api/auth/signin', {
                username: username,
                password: password
            }).then((res) => {
                const token = res.data['accessToken']
                document.cookie = "access_token=" + token
                this.home();
            }).catch((res) => {
                if (res.response.data['message'] == 'Invalid Password !' || res.response.data['message'] == 'Utilisateur non trouvé.') {
                    this.messageView = 'Nom d\'utilisateur ou mot de passe incorrect';
                    this.errorInLogin = true;
                }else{
                    this.messageView = 'Unknown error, please retry later...'
                }

            })
        },
        clear() {
            this.username = ''
            this.password = ''
            this.$refs.observer.reset()
        },
        home() {
            document.location.href = "/";
        },
        createAccount() {
            document.location.href = "/register";
        }
    },
}
</script>

