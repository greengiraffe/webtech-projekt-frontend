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
        loading: true,
        progress: '0', /* NOT BACKEND CONFORM - Progress still to implement */
        currentTask: {}
    },
    getters: {
        id: (state) => {
            return state.quizId
        },
        tasks: (state) => {
            return state.tasks
        },
        loading: (state) => {
            return state.loading
        }
    },
    mutations: {
        setQuiz (state, payload) {
            state.id = payload.id || null
            state.name = payload.name || ''
            state.description = payload.description || ''
            state.tasks = payload.tasks ? payload.tasks.data.map(item => {
                return { showVerification: false, type: { data: { name: '' } }, id: item.id, order: item.order }
            }) : []
            state.thumbnail = payload.thumbnail || 'https://source.unsplash.com/xekxE_VR0Ec/450x300'
            state.categories = payload.categories ? payload.categories.data : []
        },
        addTask (state, payload) {
            payload.task.selected = false
            state.tasks[payload.index] = payload.task
            console.log(state)
        },
        addCategory (state, payload) {
            state.categories.push(payload)
        },
        setCategories (state, payload) {
            state.categories = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        }
    },
    actions: {
        async getQuiz ({ commit }, id) {
            commit('setLoading', true)
            const res = await API.getQuiz(id)
            commit('setQuiz', res.data.data)
            let count = res.data.data.tasks.data.length
            res.data.data.tasks.data.forEach(async (item, index) => {
                const task = await API.getTasksByQuiz(id, index + 1)
                if (task.data) {
                    commit('addTask', { task: task.data.data[0], index: index })
                    count--
                    if (count === 0) {
                        commit('setLoading', false)
                    }
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
            const res = await API.updateQuiz({
                id: quiz.id,
                name: quiz.name,
                categories: quiz.categories
            })
            commit('quiz/updateQuiz', res.data.data, { root: true })
            return res
        }

    }
}
