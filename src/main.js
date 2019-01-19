import jwtDecode from 'jwt-decode'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Vuetify, {
    iconfont: 'mdi'
})

Vue.config.productionTip = false

// Set logged-in state based on JWT token
const userToken = localStorage.getItem('user_token')
if (userToken !== null) {
    // validate token
    const decodedToken = jwtDecode(userToken)
    console.log(decodedToken)
    store.commit('user/login')
} else {
    store.commit('user/logout')
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
