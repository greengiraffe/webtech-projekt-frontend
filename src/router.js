import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Quiz from './components/Quiz.vue'
import Quizform from './components/Quizform.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/quiz/:id',
      component: Quiz,
      props: true
    },
    {
      path: '/newquiz',
      component: Quizform
    },
    {
      path: '/editquiz/:id',
      component: Quizform,
      props: true
    }
  ]
})
