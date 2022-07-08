<template>
  <v-container>
    <v-app-bar app color="primary lighten-3">

      <div class="d-flex align-center" style="width:150px;">
        <router-link to="/">
          <v-img alt="Logo" class="shrink mr-2" contain src="../assets/logo_header.png" width=10% />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <ul class="navigation-links">
        <template v-if="this.tokenRole == 'CLIENT'">
          <li>
            <v-btn text :to="{ name: 'order' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Commande</span>
                <v-icon>mdi-cart-outline</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'restaurant' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Restaurant</span>
                <v-icon>mdi-silverware-fork-knife</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'cart' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Panier</span>
                <v-icon>mdi-cart-outline</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'profile' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">profile</span>
                <v-icon>mdi-account</v-icon>
              </div>
            </v-btn>
          </li>
        </template>

        <template v-if="this.tokenRole == 'TECH'">
          <li>
            <v-btn text :to="{ name: 'techService' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Logs</span>
                <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'profile' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">profile</span>
                <v-icon>mdi-account</v-icon>
              </div>
            </v-btn>
          </li>
        </template>

        <template v-if="this.tokenRole == 'RESTAURANT'">
          <li>
            <v-btn text :to="{ name: 'logs' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Logs</span>
                <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'order' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Commande</span>
                <v-icon>mdi-cart-outline</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'stat' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Statistique</span>
                <v-icon>mdi-chart-donut</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'myRestaurant' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">My Restaurant</span>
                <v-icon>mdi-silverware-fork-knife</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'profile' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">profile</span>
                <v-icon>mdi-account</v-icon>
              </div>
            </v-btn>
          </li>
        </template>

        <template v-if="this.tokenRole == 'DELIVERY'">
          <li>
            <v-btn text :to="{ name: 'order' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Livraison</span>
                <v-icon>mdi-truck-delivery</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'profile' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">profile</span>
                <v-icon>mdi-account</v-icon>
              </div>
            </v-btn>
          </li>
        </template>

        <template v-if="this.tokenRole == 'DEV'">
          <li>
            <v-btn text :to="{ name: 'composant' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Composant</span>
                <v-icon>mdi-square-rounded-outline</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'profile' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">profile</span>
                <v-icon>mdi-account</v-icon>
              </div>
            </v-btn>
          </li>
        </template>

        <template v-if="this.tokenRole == 'COMMERCIAL'">
          <li>
            <v-btn text :to="{ name: 'account' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Comptes</span>
                <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'stat' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Statistique</span>
                <v-icon>mdi-chart-donut</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text :to="{ name: 'profile' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">profile</span>
                <v-icon>mdi-account</v-icon>
              </div>
            </v-btn>
          </li>
        </template>

        <template v-if="this.tokenRole == ''">
          <li>
            <v-btn text :to="{ name: 'restaurant' }">
              <div class="d-flex flex-column-reverse d-lg-block">
                <span class="mr-2">Restaurant</span>
                <v-icon>mdi-silverware-fork-knife</v-icon>
              </div>
            </v-btn>
          </li>
          <li>
            <v-btn text class="font-weight-bold" :to="{ name: 'login' }">
              <span class="mr-2"> Se connecter</span>
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </li>

        </template>

        <!-- <template v-else>
          <li>
            <v-btn text class="font-weight-bold" :to="{ name: 'profile' }">
              <span class="mr-2">Compte</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </li>

          <li>
            <v-btn text class="font-weight-bold" :to="{ name: 'unlogin' }">
              <span class="mr-2"> Se deconnecter</span>
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </li>
        </template> -->
      </ul>
    </v-app-bar>
  </v-container>
</template>

<script>

export default {
  name: 'HeaderComp',
  components: {

  },
  mounted() {
    const i = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
    if (i) {
      const jwt = require('jose')
      const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
      const decodedjwtToken = jwt.decodeJwt(jwtToken)
      this.tokenUsername = decodedjwtToken.username
      this.tokenRole = decodedjwtToken.role[0]
    }


  },
  data() {
    return {
      loginDialog: false,
      tokenRole: '',
      tokenUsername: '',
    }
  },

}
</script>
<style scoped>
.navigation-links {
  display: flex;
}

.navigation-links li {
  list-style: none;
}

.top-2 {
  position: relative;
  top: 1.6px;
}
</style>
