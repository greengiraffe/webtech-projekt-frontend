import axios from 'axios'
import { getUserToken, refreshTokenIfNecessary } from './helpers/auth'

const API_BASE_URL = `https://api.learnit.development.wahlemedia.de/api`
const API_VERSION = 'v1'

axios.defaults.baseURL = `${API_BASE_URL}/${API_VERSION}`

// Add token authorization to every request
axios.interceptors.request.use(
    async function (config) {
        let token = getUserToken()
        if (token !== null) {
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
    /* eslint-disable */

  // TASK

  static async getTasks () {
    const url = `${API_URL}/tasks`
  }

  static async saveTask (text) {
    const url = `${API_URL}/tasks`
  }

  // CATEGORY

  static async getCategories () {
    const url = `${API_URL}/categories`
  }

  static async saveCategory (name) {
    const url = `${API_URL}/category`
  }

  // QUIZ

  static async getQuizzes (name, email, password) {
    const url = `${API_URL}/quizzes`
  }

  static async saveQuiz (name, description, categories) {
    // TODO missing Postman description
    const url = `${API_URL}/quiz`
  }

  static async getQuiz (id) {
    const url = `${API_URL}/quizzes/${id}`
  }

  static async deleteQuiz (id) {
    const url = `${API_URL}/quizzes/${id}`
  }

  // TASK TYPE

  static async getTaskTypes () {
    const url = `${API_URL}/tasktype`
  }

  static async saveTaskType (name) {
    const url = `${API_URL}/tasktype`
  }
}
