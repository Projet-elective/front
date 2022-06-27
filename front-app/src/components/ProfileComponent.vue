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
                                Kenneth Valdez
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                fip@jukmuh.al
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Role</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                (239) 816-9029
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <a class="btn btn-info" target=""
                                    href="#">Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-container>
</template>


<script>

export default {
    name: 'ProfileComp',
    components: {

    },
    data: ()=>({
    username:'',
    email: '',
    role:'',

    }),
    mounted(){
        console.log('mounted')
        
    }
}
</script>