import Vue from 'vue';
import Router from 'vue-router';
import routerUtil from "./routerUtil";
Vue.use(Router);
console.log("env == " + process.env.NODE_ENV);
export default new Router({
    mode: "history",
    base: '/avt/manage/',
    routes: routerUtil.loginSuccessRouter
});
