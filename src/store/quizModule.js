import API from '../api'

function filterByCategories (quizzes, categories) {
    if (categories.length === 0) return quizzes
    return quizzes.filter(quiz => {
        const quizCategories = quiz.categories.data.map(c => c.name)
        return categories.some(c => quizCategories.includes(c))
    })
}

function filterByKeyword (quizzes, keyword) {
    if (keyword.length === 0) return quizzes
    return quizzes.filter(quiz => {
        return quiz.name.toLowerCase().includes(keyword.toLowerCase())
    })
}

function sortByProgress (quizzes) {
    return quizzes.sort((a, b) => b.progress - a.progress)
}

export const quizModule = {
    namespaced: true,
    state: {
        quizzes: [],
        categories: [],
        selectedCategories: [],
        searchKeyword: '',
        sortByProgress: false,
        loading: false,
    },
    getters: {
        categoryNames: (state) => {
            return state.categories.map(category => category.name)
        },
        filteredQuizzes: (state) => {
            let filteredQuizzes = filterByCategories(state.quizzes, state.selectedCategories)
            filteredQuizzes = filterByKeyword(filteredQuizzes, state.searchKeyword)
            if (state.sortByProgress) {
                return sortByProgress(filteredQuizzes)
            } else {
                return filteredQuizzes
            }
        },
        filteredByCategories: (state) => {
            return filterByCategories(state.quizzes, state.selectedCategories)
        },
        filteredByKeyword: (state) => {
            return filterByKeyword(state.quizzes, state.searchKeyword)
        },
        sortedByProgress: (state) => {
            return sortByProgress(state.quizzes)
        },
        hasQuizzes: (state) => {
            return state.quizzes.length > 0
        }
    },
    mutations: {
        setQuizzes (state, payload) {
            state.quizzes = payload || []
        },
        setCategories (state, payload) {
            state.categories = payload || []
        },
        setSelectedCategories (state, payload) {
            state.selectedCategories = payload || []
        },
        setSearchKeyword (state, payload) {
            state.searchKeyword = payload || ''
        },
        enableSortByProgress (state, payload) {
            state.sortByProgress = !!payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        addQuiz (state, payload) {
            state.quizzes.push(payload)
        },
        removeQuiz (state, payload) {
            state.quizzes = state.quizzes.filter(quiz => {
                if (quiz.id !== payload) return quiz
            })
        },
        updateQuiz (state, payload) {
            state.quizzes = state.quizzes.map(quiz => {
                if (quiz.id === payload.id) {
                    return payload
                }
                return quiz
            })
        },
        addCategory (state, payload) {
            state.categories.push(payload)
        }
    },
    actions: {
        async getAll ({ commit }) {
            commit('setLoading', true)
            const res = await API.getQuizzes()
            commit('setQuizzes', res.data.data)
            commit('setLoading', false)
        },

        async getCategories ({ commit }) {
            const res = await API.getCategories()
            commit('setCategories', res.data.data)
        },

        async addCategory ({ commit }, category) {
            const res = await API.saveCategory(category)
            commit('addCategory', res.data.data)
            return res
        }
    }
}
