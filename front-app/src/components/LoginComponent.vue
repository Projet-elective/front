<template>
    <validation-observer ref="observer" v-slot="{ invalid }">
        <div class="container">
            <div class="title">
                Login form
            </div>

            <form @submit.prevent="login" style="margin-bottom: 2rem;">
                <validation-provider v-slot="{ errors }" name="username" rules="required">
                    <v-text-field v-model="username" :error-messages="errors" label="username" required>
                    </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="password" rules="required">
                    <v-text-field v-model="password" :error-messages="errors" label="Password" type='password' required>
                    </v-text-field>
                </validation-provider>
                <v-btn class="mr-4" type="submit" :disabled="invalid">
                    Login
                </v-btn>
                <v-btn @click="clear">
                    clear
                </v-btn>
            </form>
            <div class="container" v-if="errorInLogin" style="color: red;">
                <h2>{{ messageView }}</h2>
            </div>
            <div class="container">
                <h3>No account ? Create one by clicking this button</h3>
                <v-btn @click="createAccount">
                    Create an account
                </v-btn>
            </div>
        </div>
    </validation-observer>

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

extend('email', {
    ...email,
    message: 'Email must be valid',
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

            await axios.post('http://localhost:8080/api/auth/signin', {
                username: username,
                password: password
            }).then((res) => {
                const token = res.data['accessToken']
                document.cookie = "access_token=" + token
                this.home();
            }).catch((res) => {
                if (res.response.data['message'] == 'Invalid Password !' || res.response.data['message'] == 'User Not found.') {
                    this.messageView = 'Incorrect username or password';
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
            document.location.href = "http://localhost:8090/";
        },
        createAccount() {
            document.location.href = "http://localhost:8090/register";
        }
    },
}
</script>

