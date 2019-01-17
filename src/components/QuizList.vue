<template>
    <v-container>
        <div id="quizzes">
        <v-layout row wrap >
                <v-card v-for="quiz in quizzes" :key='quiz.name' v-bind:id="'quizcard-'+quiz.name" class="quizcard">
                    <QuizCard v-bind:quiz="quiz"></QuizCard>
                </v-card>
        </v-layout>
        </div>
    </v-container>
</template>

<script>
import QuizCard from '../components/QuizCard.vue'

export default {
  name: 'QuizList',
  props: ['quizzes'],
  components: {
    QuizCard
  },
  data () {
    return {

    }
  },
  computed: {

  }
}

</script>

<style>
    .v-card{
        margin-right: 3%;
        margin-bottom: 3%;
    }
    h2{
        text-align: center;
        margin-bottom: 2%;
    }
</style>
