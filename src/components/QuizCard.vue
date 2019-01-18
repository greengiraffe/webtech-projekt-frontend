<template>
    <div>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
            <div>
                <v-if></v-if>
                <h2 class="quizname">{{ quiz.name }}</h2>
                <p class="quizdescription">{{ quiz.description }}</p>
            </div>
        </v-card-title>

        <v-card-actions>
            <router-link :to="{path: 'quiz/'+quiz.id}" exact>
               <v-btn title="Start quiz"><v-icon style="margin-right: 5px">play_arrow</v-icon>Start</v-btn>
            </router-link>
            <router-link :to="{path: 'editquiz/'+quiz.id, params: {quiz: 'quiz'}}" class="editbutton" exact>
                <v-btn title="Edit this quiz"><v-icon style="margin-right: 5px">create</v-icon>Edit</v-btn>
            </router-link>
        </v-card-actions>
    </div>

</template>

<script>
export default {
  props: ['quiz'],
  data () {
    return {

    }
  }
}
</script>

<style>
    .router-link-active{
        margin: 0 auto;
    }
    .editbutton{
        margin-right: 0px;
        margin-left: auto;
    }
</style>
