import Vue from 'vue'
import Vuex from 'vuex'

import API from './api'

Vue.use(Vuex)

const userModule = {
  namespaced: true,
  state: {
    name: null,
    email: null,
    loggedIn: false
  },
  mutations: {
    login (state) {
      state.loggedIn = true
    },
    logout (state) {
      state.loggedIn = false
    },
    setUser (state, payload) {
      state.name = payload ? payload.name : null
      state.email = payload ? payload.email : null
    }
  },
  actions: {
    async signup ({ commit }, { name, email, password }) {
      const res = await API.registerUser(name, email, password)
      localStorage.setItem('user_token', res.data.meta.token)
      commit('login')
      commit('setUser', { name, email })
    },

    async login ({ commit, state }, { email, password }) {
      const res = await API.loginUser(email, password)
      localStorage.setItem('user_token', res.data.meta.token)
      commit('login')
      commit('setUser', {
        name: res.data.data.name,
        email: res.data.data.email
      })
    },

    async logout ({ commit }) {
      await API.logoutUser()
      localStorage.removeItem('user_token')
      commit('logout')
      commit('setUser', null)
    }
  }
}

export default new Vuex.Store({
  modules: {
    user: userModule
  }
})
