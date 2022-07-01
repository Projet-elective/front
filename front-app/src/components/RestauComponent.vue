<style>
.container-restaurant {
    width: 100%;
    min-height: 650px;
}

.container-restaurant table {
    border-collapse: collapse;
    width: 100%;
}

.container-restaurant table tr{
    border-bottom: 1px solid #ddd;
}
.container-restaurant table td{
    padding: 15px;
}

.head-table td {
    border-bottom: 1px solid rgb(150, 150, 150);
    font-weight: 500;
}

.body-table {
    
}

.body-table td {
    border-bottom: 1px solid rgb(150, 150, 150);
}

.link-button {
    padding: 10px 20px;
    background-color: var(--v-primary-base);
    border-radius: 5px;
    color: white;
    font-weight: 500;
}

.body{
  padding: 5%
}
</style>

<template>
  <v-container>
    <div class="body">
      <template>
        <h1>Nos Restaurants</h1>
            <div class="container-restaurant">
                <table>
                    <thead class="head-table">
                        <tr>
                            <td style="width: 40%">Restaurant</td>
                            <td style="width: 30%">Adresse</td>
                            <td style="width: 15%">Type</td>
                            <td style="width: 15%"></td>
                        </tr>
                    </thead>
            
                    <tbody class="body-table" v-for="restaurant in restaurants" :key="restaurant">
                        <router-view :restaurant-Id="restaurant._id"></router-view>
                        <tr v-if="!restaurant ==''">
                            <td>{{ restaurant.name }}</td>
                            <td>{{ restaurant.address }}</td>
                            <td>{{ restaurant.type }}</td>
                            <button class="link-button" @click="goToMenu(restaurant._id)" v-bind:restaurantId="restaurant._id">{{restaurant.name}}</button>
                        </tr>
                    </tbody> 
                </table>   
            </div>
        
      </template>
    </div>
    
  </v-container> 
</template>

<script>
import axios from 'axios'


  export default {
    name: 'RestauComp',
  
    data (){
     return{
        restaurants:[],
        products:[],
        menus:[],
        cart:[],
      }
    },
    props: {RestaurantId: String},
    created() {
        this.getAllRestaurant();
   
    },
    methods: {
      getAllRestaurant(){
        axios.get(`/restaurant/api/restaurants/`, {mode: 'no-cors'})
        .then(response => this.restaurants = response.data)
        .catch(e => this.error = [{ title: "Error de chargement",e }]);
      },
    

      goToMenu(id){
        const restaurantId= this.restaurants.find(restaurant=> restaurant._id == id)
        this.$router.push({name: `menu`, params:{id: restaurantId}})
      },
    },
  }
</script>
