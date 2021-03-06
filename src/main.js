import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import App from './App.vue'
import router from './router'
import store from './store'
import { setAuthStatus } from './helpers/auth'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
    iconfont: 'mdi'
})

Vue.config.productionTip = false

// Set logged-in state based on JWT token
setAuthStatus()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
