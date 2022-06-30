import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import LoginView from '../views/LoginView.vue'
import StatView from '../views/StatView.vue'
import CGVView from '../views/CGVView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'

import AccountView from '../views/AccountView.vue'

import TechServiceView from '../views/TechServiceView.vue'
import OrderView from '../views/OrderView.vue'



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

    path: '/account',
    name: 'account',
    component: AccountView

    path: '/techService',
    name: 'techService',
    component: TechServiceView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
