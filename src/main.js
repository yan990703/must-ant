/*
=========================================================
Muse - Vue Ant Design Dashboard - v1.0.0
=========================================================

Product Page: https://www.creative-tim.com/product/vue-ant-design-dashboard
Copyright 2021 Creative Tim (https://www.creative-tim.com)
Coded by Creative Tim

=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
*/

import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import 'boxicons/css/boxicons.min.css';
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import DashboardRTLLayout from './layouts/DashboardRTL.vue'
import router from './router'
// import './plugins/click-away'
import './scss/app.scss';
// 0、引入通信库axios
import axios from 'axios';
import {io} from "socket.io-client";
import store from './store';


Vue.prototype.$socket = io("192.168.0.121:3001", {autoConnect: false});
Vue.prototype.$axios = axios;

// 配置全局域名
axios.defaults.baseURL = "http://192.168.0.121:3001/user";


Vue.use(Antd);

Vue.config.productionTip = false

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("layout-dashboard-rtl", DashboardRTLLayout);
// 全局注册组件（也可以使用局部注册）

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')