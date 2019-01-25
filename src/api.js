import axios from 'axios'
import { getUserToken, refreshTokenIfNecessary, isExpired } from './helpers/auth'

const API_BASE_URL = `https://api.learnit.development.wahlemedia.de/api`
const API_VERSION = 'v1'

axios.defaults.baseURL = `${API_BASE_URL}/${API_VERSION}`

// Add token authorization to every request
axios.interceptors.request.use(
    async function (config) {
        let token = getUserToken()
        if (token !== null && !isExpired(token)) {
            if (!config.url.includes('refresh')) {
                // don't refresh JWT on /refresh route to avoid endless loops
                token = await refreshTokenIfNecessary(token)
            }
            // set auth headers
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    function (error) {
        console.log(error)
        return Promise.reject(error)
    }
)

export default class API {
    // AUTHENTICATION

    static async registerUser (name, email, password, isAdmin) {
        return axios.post('register', {
            name,
            email,
            password,
            'is_admin': isAdmin
        })
    }

    static async loginUser (email, password) {
        return axios.post('login', {
            email,
            password
        })
    }

    static async logoutUser () {
        return axios.post('logout')
    }

    static async getCurrentUser () {
        return axios.get('me')
    }

    static async refreshUser () {
        return axios.get('refresh')
    }

    // CATEGORY

    static async getCategories () {
        return axios.get('categories')
    }

    static async saveCategory (name) {
        return axios.post('categories', {
            name
        })
    }

    static async deleteCategory (id) {
        return axios.delete(`categories/${id}`)
    }

    // TASK

    static async getTasks () {
        return axios.get('tasks')
    }

    static async saveTask (task) {
        return axios.post('tasks', task)
    }

    static async updateTask (taskId, task) {
        return axios.patch(`tasks/${taskId}`, task)
    }

    static async deleteTask (taskId) {
        return axios.delete(`tasks/${taskId}`)
    }

    // QUIZ

    static async getQuiz (id) {
        return axios.get(`quizzes/${id}`)
    }

    static async getQuizzes () {
        return axios.get('quizzes')
    }

    static async saveQuiz (quiz) {
        return axios.post('quizzes', quiz)
    }

    static async updateQuiz (quiz) {
        const id = quiz.id
        delete quiz.id
        return axios.patch(`quizzes/${id}`, quiz)
    }

    static async deleteQuiz (id) {
        return axios.delete(`quizzes/${id}`)
    }

    static async getTasksByQuiz (quizId, taskId) {
        return axios.get(`quizzes/${quizId}/tasks/${taskId}`)
    }

    // TASK TYPE

    static async getTaskTypes () {
        return axios.get('tasktype')
    }

    static async saveTaskType (name) {
        return axios.post('tasktype', {
            name
        })
    }

    // VALIDATE

    static async validateTask (quizId, taskId, answers) {
        return axios.post(`validate`, {
            'quiz_id': quizId,
            'task_id': taskId,
            'answers': answers
        })
    }
}
