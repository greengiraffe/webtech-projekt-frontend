<template>
    <v-container>
        <h2>Available Quizzes</h2>
        <div id="allquizzes">
        <v-layout row wrap >
                <v-card v-for="quiz in allquizzes" :key='quiz.name' v-bind:id="'quizcard-'+quiz.name" class="quizcard">
                    <QuizCard v-bind:quiz="quiz"></QuizCard>
                </v-card>
        </v-layout>
        </div>
    </v-container>
</template>

<script>
    import QuizCard from '../components/QuizCard.vue'

    export default{
        name: 'QuizList',
        components: {
            QuizCard
        },
        data() {
            return{
                allquizzes: [
                    {name: 'SampleQuiz1', description: 'This is a samplequiz with no backend connection'},
                    {name: 'SampleQuiz2', description: 'This is a samplequiz with no backend connection'},
                    {name: 'SampleQuiz3', description: 'This is a samplequiz with no backend connection'},
                    {name: 'SampleQuiz4', description: 'This is a samplequiz with no backend connection'}
                ]
            }
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
