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
<template>
<div class="register-background">
    <validation-observer ref="observer" v-slot="{ invalid }">
        <div class="register-container">
            <div class="title">
                Inscription
            </div>

            <form @submit.prevent="login" v-if="!savingSuccessful" style="margin-bottom: 2rem;">
                <validation-provider v-slot="{ errors }" name="username" rules="required">
                    <v-text-field class="register-input" v-model="username" :error-messages="errors" label="Nom d'utilisateur" required>
                    </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="password" rules="required">
                    <v-text-field class="register-input" v-model="password" :error-messages="errors" label="Password" type='Mot de passe' required>
                    </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field class="register-input" v-model="email" :error-messages="errors" label="Adresse mail" required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="roles" rules="required">
                    <v-select class="register-input" v-model="select" :items="roles" :error-messages="errors" label="Sélection du rôle"
                        data-vv-name="role" required></v-select>
                </validation-provider>
                <div class="button-container">
                    <v-btn class="mr-4" type="submit" :disabled="invalid">
                        S'inscrire
                    </v-btn>
                    <v-btn @click="clear">
                        Effacer
                    </v-btn>
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
    name: 'AuthComp',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        username: '',
        password: '',
        email: '',
        select: null,
        roles: [
            'client',
            'restaurant',
            'delivery',
            'dev',
            'commercial',
            'tech',
        ],
        savingSuccessful: false,
        errorInRegister: false,
        errorMessages: '',
    }),

    methods: {
        async login() {
            const { username, password, email, select } = this;
            const role = []
            role.push(select)
            await axios.post('/auth/api/auth/signup', {
                username: username,
                password: password,
                email: email,
                roles: role
            }).then((res) => {
                    this.errorMessages = res.data['message'];
                    this.savingSuccessful = true
                    this.errorInRegister = false

            }).catch((res) => {
                this.errorMessages = res.response.data['message']
                this.errorInRegister = true
                this.savingSuccessful = false


            })
        },

        clear() {
            this.username = ''
            this.password = ''
            this.email = ''
            this.select = null
            this.$refs.observer.reset()
        },
        home() {
            document.location.href = "/";
        }
    },
}
</script>

