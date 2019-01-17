const API_BASE_URL = `https://api.learnit.development.wahlemedia.de/api`
const API_VERSION = 'v1'

const API_URL = `${API_BASE_URL}/${API_VERSION}`

export const API = {

  // AUTHENTICATION

  async registerUser (name, email, password) {
    const url = `${API_URL}/register`
  },

  async loginUser (email, password) {
    const url = `${API_URL}/login`
  },

  async getCurrentUser (email, password) {
    const url = `${API_URL}/me`
  },

  async logoutUser (email, password) {
    const url = `${API_URL}/logout`
  },

  async refreshUser (name, email, password) {
    const url = `${API_URL}/refresh`
  },

  // TASK

  async getTasks () {
    const url = `${API_URL}/tasks`
  },

  async saveTask (text) {
    const url = `${API_URL}/tasks`
  },

  // CATEGORY

  async getCategories () {
    const url = `${API_URL}/categories`
  },

  async saveCategory (name) {
    const url = `${API_URL}/category`
  },

  // QUIZ

  async getQuizzes (name, email, password) {
    const url = `${API_URL}/quizzes`
  },

  async saveQuiz (name, description, categories) {
    // TODO missing Postman description
    const url = `${API_URL}/quiz`
  },

  async getQuiz (id) {
    const url = `${API_URL}/quizzes/${id}`
  },

  async deleteQuiz (id) {
    const url = `${API_URL}/quizzes/${id}`
  },

  // TASK TYPE

  async getTaskTypes () {
    const url = `${API_URL}/tasktype`
  },

  async saveTaskType (name) {
    const url = `${API_URL}/tasktype`
  }

}
