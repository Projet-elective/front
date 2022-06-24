<template>
    <validation-observer ref="observer" v-slot="{ invalid }">
        <div class="container">
            <div class="title">
                Register form
            </div>

            <form @submit.prevent="login" v-if="!savingSuccessful" style="margin-bottom: 2rem;">
                <validation-provider v-slot="{ errors }" name="username" rules="required">
                    <v-text-field v-model="username" :error-messages="errors" label="username" required>
                    </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="password" rules="required">
                    <v-text-field v-model="password" :error-messages="errors" label="Password" type='password' required>
                    </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field v-model="email" :error-messages="errors" label="E-mail" required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="roles" rules="required">
                    <v-select v-model="select" :items="roles" :error-messages="errors" label="Role Selection"
                        data-vv-name="role" required></v-select>
                </validation-provider>

                <v-btn class="mr-4" type="submit" :disabled="invalid">
                    submit
                </v-btn>
                <v-btn @click="clear">
                    clear
                </v-btn>
            </form>
            <div class="success container" v-if="savingSuccessful">
                <h1>{{errorMessages}}</h1>
                <v-btn @click="home">
                    Return home
                </v-btn>
            </div>
            <div class="error container" v-if="errorInRegister">
                <h1>{{errorMessages}}</h1>
                <v-btn @click="home">
                    Return home
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
        errorMessages:'',
    }),

    methods: {
        async login() {
            const { username, password, email, select } = this;
            const role = []
            role.push(select)

            const res = await fetch(
                "http://localhost:8080/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        email,
                        role,

                    })
                }
            );
            const data = await res.json();
            if (data['message'] == 'User was registered successfully!') {
                this.errorMessages = data['message'];
                this.savingSuccessful = true;
                this.errorInRegister = false;
            } else {
                this.errorMessages = data['message'];
                this.errorInRegister = true;
                this.savingSuccessful = false;
                this.clear();

            }
        },
        clear() {
            this.username = ''
            this.password = ''
            this.email = ''
            this.select = null
            this.$refs.observer.reset()
        },
        home() {
            document.location.href = "http://localhost:8090/";
        }
    },
}
</script>

