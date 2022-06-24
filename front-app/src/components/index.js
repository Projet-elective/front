import Vue from "vue";
import AuthComp from "./AuthComponent.vue"
import LoginComp from "./LoginComponent.vue"

const Components ={
    AuthComp,
    LoginComp
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;

// export { default as AuthComp } from './components/AuthComponent.vue';
// export { default as LoginComp } from './components/LoginComponent.vue';
