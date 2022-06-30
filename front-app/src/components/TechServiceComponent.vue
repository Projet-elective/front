<style>
.container-techService {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
}

.container-techService h1 {
    margin-bottom: 2em;
}

</style>
<template>
    <div class="container-techService">
        <h1>Télécharger les logs de connexions des utilisateurs</h1>
        <v-btn x-large color="primary" href="http://localhost:8000/api/auth/getAllLastConnected">
            Télécharger
        </v-btn>
    </div>
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