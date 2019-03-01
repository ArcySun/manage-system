<template>
    <div id="app">
        <router-view></router-view>
    </div>

</template>
<script>


    import routerUtil from "./router/routerUtil";
    import router from './router';

    export default {
        name: 'App',
        data() {
            return {}
        },
        created() {
            //new login case
            this.$bus.$on('login', msg => {
                if (process.env.NODE_ENV === "none") {
                    router.addRoutes(routerUtil.loginSuccessRouter);
                } else {
                    router.addRoutes(routerUtil.getInitRouter(msg.router));
                }
            });

            if (localStorage.inuserdata) {
                const routerData = JSON.parse(decodeURIComponent(atob(localStorage.inuserdata))).router;
                router.addRoutes(routerUtil.getInitRouter(routerData));
            }
        }

    }
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css"; /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
