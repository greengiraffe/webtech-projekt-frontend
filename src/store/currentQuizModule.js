import API from '../api'

export const currentQuizModule = {
    namespaced: true,
    state: {
        id: null,
        name: '',
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
            state.id = payload.id || null
            state.name = payload.name || ''
            state.description = payload.description || ''
            state.tasks = payload.tasks ? payload.tasks.data : []
            state.thumbnail = payload.thumbnail || 'https://source.unsplash.com/xekxE_VR0Ec/450x300'
            state.categories = payload.categories ? payload.categories.data : []
        },
        setTask (state, payload) {
            state.taskId = payload || 0
        },
        addCategory (state, payload) {
            state.categories.push(payload)
        },
        setCategories (state, payload) {
            state.categories = payload
        }
    },
    actions: {
        async getQuiz ({ commit }, id) {
            const res = await API.getQuiz(id)
            commit('setQuiz', res.data.data)
        },
        async getTask ({ commit }) {
            const res = await API.getQuizzes()
            commit('setQuizzes', res.data.data)
        },
        async addQuiz ({ commit }, quiz) {
            delete quiz.id
            const res = await API.saveQuiz(quiz)
            commit('quiz/addQuiz', res.data.data, { root: true })
            return res
        },
        async deleteQuiz ({ commit }, id) {
            const res = await API.deleteQuiz(id)
            commit('quiz/removeQuiz', id, { root: true })
            return res
        },
        async updateQuiz ({ commit }, quiz) {
            const res = await API.updateQuiz(quiz)
            commit('quiz/updateQuiz', res.data.data, { root: true })
            return res
        }

    }
}
