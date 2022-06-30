<template>
    <v-container>
        <v-card>
            <div class="col-md-8">
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-2">
                                <v-btn href="/auth/api/auth/getAllLastConnected">
                                    Download log
                                </v-btn>
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
    name: 'TechServiceComp',
    components: {
    },
    data() {
        return {
        }
    }
}
</script>