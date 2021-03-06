import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import LoginView from '../views/LoginView.vue'
import StatView from '../views/StatView.vue'
import CGVView from '../views/CGVView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import RestauView from '../views/RestauView.vue'
import CartView from '../views/CartView.vue'
import MenuView from '../views/MenuView.vue'

import AccountView from '../views/AccountView.vue'

import TechServiceView from '../views/TechServiceView.vue'
import OrderView from '../views/OrderView.vue'
import ContactView from '../views/ContactView.vue'
import MyRestaurantView from '../views/MyRestaurantView.vue'
import addProductView from '../views/addProductView.vue'
import editProductView from '../views/editProductView.vue'
import addMenuView from '../views/addMenuView.vue'
import editMenuView from '../views/editMenuView.vue'
import MyProductsView from '../views/MyProductsView.vue'
import MyMenusView from '../views/MyMenusView.vue'
import logsView from '../views/logsView.vue'
import DevView from '../views/DevView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView //change to a menu list or smthg similar
  },
  {
    path: '/register',
    name: 'register',
    component: AuthView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {

    path: '/stat',
    name: 'stat',
    component: StatView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/cgv',
    name: 'cgv',
    component: CGVView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },

  {
    path: '/restaurant',
    name: 'restaurant',
    props: true,
    component: RestauView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/menu/:id',
    name: 'menu',
    props: true,
    component: MenuView
  },

  {

    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/techService',
    name: 'techService',
    component: TechServiceView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView

  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/myRestaurant',
    name: 'myRestaurant',
    component: MyRestaurantView
  },
  {
    path: '/myRestaurant/addProduct',
    name: 'addProduct',
    component: addProductView,
  },
  {
    path: '/myRestaurant/editProduct',
    name: 'editProduct',
    component: editProductView,
  },
  {
    path: '/myRestaurant/addMenu',
    name: 'addMenu',
    component: addMenuView,
  },
  {
    path: '/myRestaurant/editMenu',
    name: 'editMenu',
    component: editMenuView,
  },
  {
    path: '/myRestaurant/myProducts',
    name: 'myProducts',
    component: MyProductsView,
  },
  {
    path: '/myRestaurant/myMenus',
    name: 'myMenus',
    component: MyMenusView,
  },
  {
    path: '/logs',
    name: 'logs',
    component: logsView,
  },
  {
    path: '/dev',
    name: 'dev',
    component: DevView,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
