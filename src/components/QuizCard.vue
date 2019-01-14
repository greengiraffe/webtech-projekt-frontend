<template>
    <div>
        <v-card-title primary-title>
            <div>
                <h2 class="quizname">{{ quiz.name }}</h2>
                <p class="quizdescription">{{ quiz.description }}</p>
            </div>
        </v-card-title>

        <v-card-actions>        
            <router-link :to="{name: quiz.name, params: {quizid: quiz.id}}">
                <v-btn>Open Quiz</v-btn>
            </router-link>
        </v-card-actions>
    </div>

</template>

<script>
    export default{
        props: ['quiz'],
        data(){
            return{

            }
        }
    }
</script>

<style>
    .router-link-active{
        margin: 0 auto;
    }
</style>
