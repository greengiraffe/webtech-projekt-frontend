<template>
    <div id="quiz">
        <v-spacer></v-spacer>
        <div class="btnback">
            <router-link :to="{name: 'home'}"><v-btn>Back</v-btn></router-link>
            <h1>{{ quiz.name }}</h1>
        </div>
        <v-spacer></v-spacer>
        <div v-if='showfront' class=quizfront>
            <div class="quizcategories">
                <p v-if="quiz.categories.length > 1">Categories: </p>
                <p v-else>Category: </p>
                <p v-for="category in quiz.categories" :key="category.id">{{category.name}}</p>
            </div>
            <p>{{ quiz.description }}</p>
            <div v-if="quiz.progress == 0" class="startquiz">
            <!-- <router-link :to="{path: 'quiz/'+quiz.id+task}" exact> -->
                <v-btn v-on:click="startquiz" :loading="loading">Start Quiz</v-btn>
                <!-- </router-link> -->
            </div>
            <div v-else class="continuequiz">
                <p id="quizprogress">{{ quiz.progress }} %</p>
                <v-btn v-on:click="startquiz" :loading="loading">Continue quiz</v-btn>
            </div>
        </div>
        <v-spacer></v-spacer>
        <Task v-if='!showfront'></Task>
    </div>
</template>

<script>
import Task from '../components/Task.vue'
import { mapState, mapGetters } from 'vuex'

export default {
    data () {
        return {
            showfront: true,
        }
    },
    mounted () {
        this.$store.dispatch('currentQuiz/getQuiz', this.$route.params.id)
    },
    methods: {
        startquiz: function (event) {
            this.showfront = false
        }
    },
    computed: {
        ...mapState({
            quiz: state => state.currentQuiz,
        }),
        ...mapGetters({
            loading: 'currentQuiz/loading'
        })
    },
    components: {
        Task
    }
}
</script>

<style lang="scss">
.btnback {
  margin-top: 1em;
}
h1 {
  margin: 0 auto;
  margin-bottom: 1%;
  text-align: center;
}
.quizfront {
  text-align: center;

  p {
    width: 70%;
    margin: 0 auto;
  }
  #quizprogress {
    display: block;
    height: 2.5em;
    width: 2.5em;
    line-height: 2.5em;

    -moz-border-radius: 50%;
    border-radius: 50%;

    background-color: #171e5f;
    color: white;
    text-align: center;
    font-size: 2em;
    margin: 3% auto;
  }
  .quizcategories{
      margin: 3%;
      text-align: center;
      color: grey;

      p{
          display: inline;
          padding-right: 1%;
      }
  }
}
</style>
