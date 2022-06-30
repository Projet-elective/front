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
    path: '/menu',
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
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
