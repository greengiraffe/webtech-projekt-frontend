<template>
    <v-container grid-list-xl>
        <v-layout row wrap id="quizzes">
            <v-flex xs12 sm6 md4 v-for="quiz in quizzes" :key='quiz.id'>
                <v-card v-bind:id="'quizcard-'+quiz.id" class="quizcard">
                    <QuizCard v-bind:quiz="quiz"></QuizCard>
                </v-card>
            </v-flex>
        </v-layout>
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
        return {}
    },
    computed: {}
}
</script>

<style scoped>
.v-card {
  margin-bottom: 3%;
}
h2 {
  text-align: center;
  margin-bottom: 2%;
}
</style>
