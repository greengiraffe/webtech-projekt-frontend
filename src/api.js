import axios from 'axios'

const API_BASE_URL = `https://api.learnit.development.wahlemedia.de/api`
const API_VERSION = 'v1'

axios.defaults.baseURL = `${API_BASE_URL}/${API_VERSION}`
axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')

function getToken () {
    return localStorage.getItem('user_token')
}

// Add token authorization to every request
axios.interceptors.request.use(
    function (config) {
        const token = getToken()
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, function (error) {
        console.log(error)
        return Promise.reject(error)
    })

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

    static async logoutUser (email, password) {
        return axios.post('logout')
    }

    /* eslint-disable */
  static async getCurrentUser (email, password) {
    const url = `${API_URL}/me`
  }

  static async refreshUser (name, email, password) {
    const url = `${API_URL}/refresh`
  }

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
