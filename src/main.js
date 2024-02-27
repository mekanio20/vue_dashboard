import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { appAxios } from './api'
import store from './store'
import './style.css'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)
    
app.use(router)
app.use(store)
app.use(VueApexCharts)
app.config.globalProperties.$appAxios = appAxios
app.mount('#app')
