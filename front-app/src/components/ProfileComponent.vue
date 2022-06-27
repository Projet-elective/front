 <template>
    <v-container>
        <h1 style="text-align: center;">Profile page</h1>
        <v-card>
            <div class="col-md-8">
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Username</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {{ username }}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {{ email }}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Role</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {{ role }}
                            </div>
                        </div>
                        <validation-observer ref="observer" v-slot="{ invalid }">
                            <form @submit.prevent="deleteAcc" style="margin-top: 5rem;">
                                <div>
                                    <h3>To delete you account enter your password</h3>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <validation-provider v-slot="{ errors }" name="password" rules="required">
                                            <v-text-field v-model="password" :error-messages="errors" label="Password"
                                                type='password' required>
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
            </div>
        </v-card>
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
    name: 'ProfileComp',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        username: '',
        password: '',
        email: '',
        role: '',
        deleteError: false,
        deleteMessage: '',
        editError: false,
        editMessage: '',

    }),
    mounted() {

        const jwt = require('jose')
        const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
        const decodedjwtToken = jwt.decodeJwt(jwtToken)
        this.username = decodedjwtToken.username
        this.email = decodedjwtToken.email
        this.role = decodedjwtToken.role[0]
    },
    methods: {

        async deleteAcc() {
            const passWord = this.password
            console.log(passWord)
            await axios.delete('http://localhost:8080/api/auth/delete', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: this.username,
                    password: passWord
                }
            }).then(() => {
                document.cookie = "access_token=";
                this.home();

            }).catch((res) => {
                this.deleteError = true,
                    this.deleteMessage = res.response.data.message

            })
        },
        home() {
            document.location.href = "http://localhost:8090/";
        },
    }
}
</script>