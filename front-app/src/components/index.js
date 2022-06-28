import Vue from "vue";
import AuthComp from "./AuthComponent.vue"
import LoginComp from "./LoginComponent.vue"
import FooterComp from "./FooterComp.vue"
import HeaderComp from "./HeaderComp.vue"
import ProfilComp from "./ProfilComp.vue"
import DevComp from "./DevComp.vue"

const Components ={
    AuthComp,
    LoginComp,
    FooterComp,
    HeaderComp,
    ProfilComp,
    DevComp
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;

