<template>
    <div id="quiz">
        <v-spacer></v-spacer>
        <h1>{{ quiz.name }}</h1>
        <v-spacer></v-spacer>
        <div v-if='showfront' class=quizfront>
            {{ quiz.description }}
            <div v-if="quiz.progress == 0" class="startquiz">
            <!-- <router-link :to="{path: 'quiz/'+quiz.id+task}" exact> -->
                    <v-btn v-on:click="startquiz">Start Quiz</v-btn>
                <!-- </router-link> -->
            </div>
            <div v-else class="continuequiz">
                <p id="quizprogress">{{ quiz.progress }} %</p>
                <v-btn v-on:click="startquiz">Continue quiz</v-btn>
            </div>
        </div>
        <v-spacer></v-spacer>
        <Question></Question>
    </div>
</template>

<script>
import Question from '../components/Question.vue'

export default {
    data(){
        return{
            showfront: true,
            quiz: {id: '1', name: 'SampleQuiz1 hello', description: 'This is a samplequiz with no backend connection', progress: "5", categories: ["Java"]}

        }
    },
    methods: {
        startquiz: function (event){
            this.showfront = false;
        }
    },
    components: {
        Question
    }
}
</script>
