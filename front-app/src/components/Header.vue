<template>
  <v-app-bar app color="primary lighten-1">
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          width=25%
        />
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <ul class="navigation-links">
      <template v-if="user && user.role === 'client'">
        <li>
          <v-btn text :to="{ name: 'cart' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Panier</span>
              <v-icon>mdi-cart-outline</v-icon>
            </div>
          </v-btn>
        </li>
        <li>
          <v-btn text :to="{ name: 'restaurant' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Restaurant</span>
              <v-icon>mdi-cart-outline</v-icon>
            </div>
          </v-btn>
        </li>
      </template>
      <template v-if="user && user.role === 'tech'">
        <li>
          <v-btn text :to="{ name: 'logs' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Logs</span>
              <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
            </div>
          </v-btn>
        </li>
      </template>
      <template v-if="user && user.role === 'restaurant'">
        <li>
          <v-btn text :to="{ name: 'logs' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Logs</span>
              <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
            </div>
          </v-btn>
        </li>
        <li>
          <v-btn text :to="{ name: 'commande' }">
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
              <v-icon>mdi-cart-outline</v-icon>
            </div>
          </v-btn>
        </li>
        <li>
          <v-btn text :to="{ name: 'restaurant' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Restaurant</span>
              <v-icon>mdi-cart-outline</v-icon>
            </div>
          </v-btn>
        </li>
      </template>
      <template v-if="user && user.role === 'delivery'">
        <li>
          <v-btn text :to="{ name: 'delivery' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Livraison</span>
              <v-icon>mdi-cart-outline</v-icon>
            </div>
          </v-btn>
        </li>
      </template>
      <template v-if="user && user.role === 'dev'">
        <li>
          <v-btn text :to="{ name: 'composant' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Composant</span>
              <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
            </div>
          </v-btn>
        </li>
      </template>
      <template v-if="user && user.role === 'commercial'">
        <li>
          <v-btn text :to="{ name: 'account' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Logs</span>
              <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
            </div>
          </v-btn>
        </li>
        <li>
          <v-btn text :to="{ name: 'stat' }">
            <div class="d-flex flex-column-reverse d-lg-block">
              <span class="mr-2">Statistique</span>
              <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
            </div>
          </v-btn>
        </li>
      </template>
      <template>
        <li>
          <v-btn text class="font-weight-bold" :to="{ name: 'register' }">
            <span class="mr-2"> S'enregistrer</span>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-btn>
        </li>
        <li>
          <v-btn text class="font-weight-bold" :to="{ name: 'login' }">
            <span class="mr-2"> Se connecter</span>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
        </li>
      </template>
    </ul>
  </v-app-bar>
</template>

<script>

export default {
  name: 'NavBar',
  components: {
   
  },
  data () {
    return {
      loginDialog: false
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
