<template>
    <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
            <validation-provider v-slot="{ errors }" name="Last Name" rules="required">
                <v-text-field v-model="lastName" :error-messages="errors" label="Last Name" required>
                </v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="firstName" rules="required">
                <v-text-field v-model="firstName" :error-messages="errors" label="First Name" required>
                </v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="phoneNumber" :rules="{
                required: true,
                digits: 10,
                // regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
            }">
                <v-text-field v-model="phoneNumber" :counter="10" :error-messages="errors" label="Phone Number"
                    required>
                </v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                <v-text-field v-model="email" :error-messages="errors" label="E-mail" required></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="roles" rules="required">
                <v-select v-model="select" :items="roles" :error-messages="errors" label="Select" data-vv-name="select"
                    required></v-select>
            </validation-provider>

            <v-btn class="mr-4" type="submit" :disabled="invalid">
                submit
            </v-btn>
            <v-btn @click="clear">
                clear
            </v-btn>
        </form>
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
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        select: null,
        roles: [
            'None',
            'Deliverer',
            'Restaurant',
            'Developer',
            'Business Service',
            'Technical Service',
        ],
    }),

    methods: {
        submit() {
            this.$refs.observer.validate()
        },
        clear() {
            this.lastName = ''
            this.firstName = ''
            this.phoneNumber = ''
            this.email = ''
            this.select = null
            this.$refs.observer.reset()
        },
    },
}
</script>

