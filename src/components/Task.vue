<template>
    <v-tabs dark color="#171e5f" show-arrows>
        <v-tabs-slider color="#3fd6d3"></v-tabs-slider>
        <v-tab v-for="i in quiz.tasks.length" :onclick="() => {this.$store.activeTask = i}" :href="'#task-' + i"
               :key="i">
            Task {{ i }}
        </v-tab>

        <v-tabs-items>
            <v-tab-item v-for="(task, index) in tasks" :value="'task-' + (index + 1)" :key="index">
                <v-card theme--light class="pa-3">
                    <div class="answers">
                        <div v-if="task.type.data.name === ''"></div>
                        <AnswerText v-bind:task="task" v-else-if="task.type.data.name === 'text'"></AnswerText>
                        <AnswerChoice v-bind:task="task" v-else></AnswerChoice>
                    </div>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
  import AnswerChoice from '../components/AnswerChoice.vue'
  import AnswerText from '../components/AnswerText.vue'
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'Task',
    components: {
      AnswerChoice,
      AnswerText
    },
    computed: {
      ...mapState({
        quiz: state => state.currentQuiz,
      }),
      ...mapGetters({
        tasks: 'currentQuiz/tasks'
      })
    }
  }
</script>

<style lang="scss" scoped>
    .v-window {
        width: 60%;
        margin: 4% auto;
    }
</style>
