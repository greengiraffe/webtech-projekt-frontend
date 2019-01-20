import API from '../api'

export const userModule = {
    namespaced: true,
    state: {
        name: null,
        email: null,
        loggedIn: false,
        isAdmin: false
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
            state.isAdmin = payload ? payload.isAdmin : null
        }
    },
    actions: {
        async signup ({ commit }, { name, email, password, isAdmin }) {
            const res = await API.registerUser(name, email, password, isAdmin)
            localStorage.setItem('user_token', res.data.meta.token)
            commit('login')
            commit('setUser', { name, email, isAdmin })
        },

        async login ({ commit }, { email, password }) {
            const res = await API.loginUser(email, password)
            localStorage.setItem('user_token', res.data.meta.token)
            commit('login')
            commit('setUser', {
                name: res.data.data.name,
                email: res.data.data.email,
                isAdmin: res.data.data['is_admin']
            })
        },

        async logout ({ commit }) {
            await API.logoutUser()
            localStorage.removeItem('user_token')
            commit('logout')
            commit('setUser', null)
        },

        async setCurrentUser ({ commit }) {
            const res = await API.getCurrentUser()
            commit('setUser', {
                name: res.data.data.name,
                email: res.data.data.email,
                isAdmin: res.data.data['is_admin']
            })
        },

        async refreshToken ({ commit }) {
            const res = await API.refreshUser()
            localStorage.setItem('user_token', res.data.meta.token)
        }
    }
}
