<template>
    <v-container grid-list-xl>

        <v-layout v-show="quizzes.length === 0" justify-center class="text-xs-center">
            <v-flex v-if="loading" class="text-xs-center">
                <LoadingIndicator></LoadingIndicator>
            </v-flex>
            <v-flex v-else>
                <p>No matching quizzes found.</p>
            </v-flex>
        </v-layout>

        <v-layout row wrap fill-height>
            <v-flex xs12 sm6 md4 v-for="quiz in quizzes" :key='quiz.id'>
                <v-card v-bind:id="'quizcard-'+quiz.id" class="quizcard">
                    <QuizCard v-bind:quiz="quiz"></QuizCard>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import QuizCard from './QuizCard.vue'
import LoadingIndicator from './LoadingIndicator.vue'

export default {
    name: 'QuizList',
    props: ['quizzes'],
    components: {
        QuizCard,
        LoadingIndicator
    },
    computed: {
        ...mapState('quiz', ['loading'])
    }
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
