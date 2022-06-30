 
 <template> 
    <ul class="navigation-links">
        <template v-if="this.tokenRole == 'CLIENT'">
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
                <v-icon>mdi-chart-donut</v-icon>
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
            <v-btn text :to="{ name: 'delivery' }">
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
    </ul>
</template>

<script>


export default {
  name: 'DeliveryComp',
  components: {
  },
  mounted() {
    const i = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
    if(i){
      const jwt = require('jose')
      const jwtToken = document.cookie.split('; ').find(row => row.startsWith('access_token'))?.split('=')[1];
      console.log(jwtToken)
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