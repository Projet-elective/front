<template>
    <v-main>
        <div v-if="this.tokenRole == 'RESTAURANT'">
            <v-container>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-md-3">
                                <h3>
                                    Mes Menus
                                </h3>
                            </div>
                            <div class="col-md-3">
                                <v-btn class="mr-4" :to="{ name: 'addMenu' }">
                                    Ajouter un menu
                                </v-btn>
                            </div>
                        </div>
                        <div>
                            <div v-if="myMenus != ''">
                                <div class="text-secondary" v-for="menu in myMenus" :key="menu.name">
                                    <v-card elevation="10" class="profile-container">
                                        Nom du menu : {{ menu.name }}
                                        <ul>
                                            <li>
                                                Entrée : {{ menu.entree.name }}
                                            </li>
                                            <li>
                                                Plat principal: {{ menu.main.name }}
                                            </li>
                                            <li>
                                                Dessert : {{ menu.dessert.name }}
                                            </li>
                                            <li>
                                                Boisson : {{ menu.drink.name }}
                                            </li>
                                            <li>
                                                Prix : {{ menu.price }}
                                            </li>
                                        </ul>
                                        <v-btn @click="deleteMenu(menu._id)">
                                            Supprimer
                                        </v-btn>
                                        <v-btn @click="goToEditMenu(menu)">
                                            éditer
                                        </v-btn>
                                    </v-card>
                                </div>
                            </div>
                            <div v-else>
                                <v-card elevation="10" class="profile-container">
                                    <h3>Aucun menu disponible</h3>
                                </v-card>
                            </div>
                        </div>
                    </div>
                </div>

            </v-container>

        </div>
    </v-main>
</template>
<script>

import axios from 'axios'

export default {
    name: 'MyMenusComp',
    components: {

    },
    data: () => ({
        name: '',
        description: '',
        price: '',
        type: '',
        savingSuccessful: false,
        errorInRegister: false,
        errorMessages: '',
        tokenJWT: '',
        tokenRole: '',
        tokenId: '',
        myMenus: '',
    }),
    mounted() {
        this.fetch()
    },

    methods: {
        getRestaurantByOwner(ownerId) {
            axios.get('/restaurant/api/restaurants/getByOwner/' + ownerId, {
                headers: {
                    'Authorization': `${this.tokenJWT}`
                },
            }).then((res) => {
                if (res.data.restaurant.idOwner == this.tokenId) {
                    this.myMenus = res.data.menus
                    console.log(this.myMenus)

                }
            }).catch((res) => {
                console.log(res)
            })

        },
        async goToEditMenu(menu) {
            this.$router.push({ name: 'editMenu', params: { menu: menu } })
        },

        deleteMenu(id) {
            if (confirm('Comfirmer la suppression du menu')) {
                axios.delete('/restaurant/api/menus/deleteMenu/' + id, {

                    headers: {
                        'Authorization': `${this.tokenJWT}`
                    },
                }, {
                    id: id,
                }

                ).then(() => {
                    this.home()
                }).catch((res) => {
                    console.log(res)

                })
            }

        },
        fetch() {
            const jwt = require('jose')
            const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
            const decodedjwtToken = jwt.decodeJwt(jwtToken)
            this.tokenJWT = jwtToken
            this.tokenRole = decodedjwtToken.role[0]
            this.tokenId = decodedjwtToken.id
            this.getRestaurantByOwner(this.tokenId)
        },
        home() {
            this.fetch()
        },

    },
}
</script>