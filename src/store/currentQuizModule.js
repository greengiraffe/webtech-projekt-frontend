import API from '../api'

export const currentQuizModule = {
    namespaced: true,
    state: {
        id: null,
        activeTask: 0,
        name: '',
        description: '',
        thumbnail: '',
        categories: [],
        tasks: [],
        progress: '0', /* NOT BACKEND CONFORM - Progress still to implement */
        currentTask: {}
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
            state.tasks = payload.tasks ? payload.tasks.data.map ( item => {
                return { showVerification: false, type: { data: { name: '' } } }
            }) : []
            state.thumbnail = payload.thumbnail || 'https://source.unsplash.com/xekxE_VR0Ec/450x300'
            state.categories = payload.categories ? payload.categories.data.map(item => item.name) : []
        },
        addTask (state, payload) {
            payload.selected = false
            state.tasks[payload.order - 1] = payload || {}
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
            res.data.data.tasks.data.forEach(async (item, index) => {
                const task = await API.getTasksByQuiz(id, index)
                if (task.data) {
                    commit('addTask', task.data.data[0])
                }
            })
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
