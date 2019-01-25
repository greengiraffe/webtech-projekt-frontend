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
            state.tasks = []
            state.thumbnail = payload.thumbnail || 'https://source.unsplash.com/xekxE_VR0Ec/450x300'
            state.categories = payload.categories ? payload.categories.data.map(item => item.name) : []
        },
        addTask (state, payload) {
            payload.task.quiz = state.id
            state.tasks[payload.index] = payload.task
            // could save answers state at some point
            if (payload.task.answers && payload.task.answers.data) {
                payload.task.answers.data.forEach(answer => {
                    answer.answer_choice = answer.answer_choice || 0
                    answer.answer_text = answer.answer_text || null
                })
            }
        },
        verifyTask (state, payload) {
            let task = state.tasks.filter(task => task.id === payload.task)[0]
            task.answers.data.forEach(answer => {
                let result = payload.answers.filter(result => result.answer_id === answer.id)[0]
                console.log(answer)
                if (task.type.data.name === 'text') {

                } else {
                    answer.is_correct = result.is_correct.choice
                }
            })
            task.is_correct = task.answers.data.reduce((ac, answer) => ac && (answer.is_correct || answer.is_correct === null)
            task.verified = true
            console.log(state)
        },
        sortTasks (state) {
            state.tasks.sort((a, b) => { return a.order - b.order })
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
                        commit('sortTasks')
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
            const res = await API.updateQuiz(quiz)
            commit('quiz/updateQuiz', res.data.data, { root: true })
            return res
        },
        async verify ({ commit }, task) {
            const res = await API.validateTask(task.quiz, task.id, task.answers.data)
            console.log(res)
            commit('verifyTask', { task: task.id, answers: res.data })
            return res.data
        }
    }
}
