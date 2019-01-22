import Vue from 'vue'
import Vuex from 'vuex'

import { userModule as user } from './userModule'
import { quizModule as quiz } from './quizModule'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        quiz
    }
})
