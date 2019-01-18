import Vue from 'vue'
import Vuex from 'vuex'

import API from './api'

Vue.use(Vuex)

const userModule = {
  state: {
    name: null,
    loggedIn: false
  },
  mutations: {
    setLoggedIn (state, payload) {
      console.log(payload)
      state.loggedIn = payload
    },
    setName (state, payload) {
      state.name = payload
    }
  },
  actions: {
    async signup ({ commit }, { name, email, password }) {
      const res = await API.registerUser(name, email, password)
      console.log(res)
      localStorage.setItem('user_token', res.data.meta.token)
      commit('setName', name)
      commit('setLoggedIn', true)
    },

    async login ({ commit }, { email, password }) {
      const res = await API.loginUser(email, password)
      console.log(res)
      localStorage.setItem('user_token', res.data.meta.token)
      commit('setName', name)
      commit('setLoggedIn', true)
    },

    async logout ({ commit }) {
      const res = await API.logoutUser()
      console.log(res)
      localStorage.removeItem('user_token')
      commit('setName', null)
      commit('setLoggedIn', false)
    }
  }
}

export default new Vuex.Store({
  modules: {
    userModule
  }
})
