import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/directives';
import "babel-polyfill";

// Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'small'
});
// Vue.prototype.$axios = axios;
import request from './utils/request';


Vue.prototype.$request = request ;

import authToken from './utils/authToken';
//user authToken
Vue.prototype.$authToken = authToken;

import BusFactory from './components/bus';
Vue.prototype.$bus = BusFactory(new Vue());
//使用钩子函数对路由进行权限跳转

router.beforeEach((to, from, next) => {

    const userToken = Vue.prototype.$authToken.getToken();
    console.log(userToken)
    if(process.env.NODE_ENV ==="none"){
        next();
    }else if (!userToken && to.path !== '/login') {
        next('/login');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});


new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
