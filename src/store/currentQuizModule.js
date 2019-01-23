import API from '../api'

export const currentQuizModule = {
    namespaced: true,
    state: {
        id: 1,
        name: '123',
        description: '',
        thumbnail: '',
        categories: [],
        tasks: [],
        progress: '0' /* NOT BACKEND CONFORM - Progress still to implement */
    },
    getters: {
        id: (state) => {
            return state.quizId
        },
    },
    mutations: {
        setQuiz (state, payload) {
            state.quizId = payload.id || 0
            state.name = payload.name || 0
            state.description = payload.description || 0
            state.tasks = payload.tasks.data || []
            state.categories = payload.categories.data.map(item => item.name) || []
        },
        setTask (state, payload) {
            state.taskId = payload || 0
        }
    },
    actions: {
        async getQuiz ({ commit }, id) {
            const res = await API.getQuiz(id)
            commit('setQuiz', res.data.data)
            console.log(res)
        },
        async getTask ({ commit }) {
            const res = await API.getQuizzes()
            commit('setQuizzes', res.data.data)
        },

    }
}
