<template>
  <v-container>
    <div>
    <v-data-iterator
      :items="restaurants">
      <template v-slot:header>
        <v-row>
          <v-spacer></v-spacer>
          <v-col style="flex-grow: 0;">
            <v-chip-group
              v-model="selectedTypes"
              active-class="orange--text text--accent-4"
            >
              <v-chip
                filter
                outlined
                v-for="t in types"
                :key="t.name" v-text="t.name"
              />
            </v-chip-group>
          </v-col>
          
        </v-row>
      </template>
      <template v-slot:default="props">
        <v-row class="my-6">
          <v-col
            class="col-xl-6 col-12"
            v-for="restaurant in props.items"
            :key="restaurant._id"
          >
          <router-link :to="{name:'shop-restaurant',params:{id:restaurant._id}}" style="text-decoration: none;">
            <restaurant :value="restaurant"/>
          </router-link>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
  </v-container>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'RestauComp',
    data: () => ({
      restaurants: [] 
    }),
    created() {
        this.getAllRestaurant();
    },
    methods: {
        getAllRestaurant(){
            axios.get(`/restaurant/api/restaurants/`, {mode: 'no-cors'})
            .then(response => this.weeks = response.data)
            .catch(e => this.error = [{ title: "Error de chargement",e }]);
        },
    },
  }
</script>
