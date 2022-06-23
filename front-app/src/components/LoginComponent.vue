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
            <div class="error container" v-if="errorInRegister">
                <h1>{{ errorMessages }}</h1>
                <v-btn @click="home">
                    Return home
                </v-btn>
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
        errorInRegister: false,
        errorMessages: '',
    }),

    methods: {
        async login() {
            const { username, password } = this;

            const res = await fetch(
                "http://localhost:8080/api/auth/signin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    })
                }
            );
            const data = await res.json();
            if (data['message'] == 'User Not found.' || data['message'] == 'Invalid Password!') {
                this.errorMessages = 'Incorrect username or password';
                this.errorInRegister = true;
            } else if (res.status == 200){
                document.cookie= "access_token=" + data['accessToken']                
                this.home();
            }
        },
        clear() {
            this.username = ''
            this.password = ''
            this.$refs.observer.reset()
        },
        home() {
            document.location.href = "http://localhost:8081/";
        },
        createAccount(){
            document.location.href = "http://localhost:8081/register";
        }
    },
}
</script>

