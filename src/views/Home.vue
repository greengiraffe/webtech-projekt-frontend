<template>
  <v-container>
    <h1>Available Quizzes</h1>
    <ul id="allquizzes">
      <li v-for="quiz in quizzes">
          <v-card class="quizdetails">
            <v-card-title>
              <h2 class="quizname">quiz.name</h2>
              <p class="quizdescription">quiz.description</p>
            </v-card-title>
            <v-card-actions>        
              <router-link :to={name: 'quiz', params: {quizid: quiz.id}}>
                <v-btn>Open Quiz</v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
      </li>
    </ul>
  </v-container>
</template>

<script>
import Quiz from '../components/Quiz.vue'

export default {
  components: {
    Quiz
  }
}
</script>
