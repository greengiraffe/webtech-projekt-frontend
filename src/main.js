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
if (localStorage.getItem('user_token') !== null) {
  store.commit('setLoggedIn', true)
} else {
  store.commit('setLoggedIn', false)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
