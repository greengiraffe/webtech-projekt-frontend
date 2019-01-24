<template>
    <v-tabs dark color="#171e5f" show-arrows>
        <v-tabs-slider color="#3fd6d3"></v-tabs-slider>
        <v-tab v-for="i in quiz.tasks.length" :onclick="() => {this.$store.activeTask = i}" :href="'#task-' + i" :key="i">
            Task {{ i }}
        </v-tab>

        <v-tabs-items>
            <v-tab-item v-for="task in quiz.tasks" :value="'task-' + task.order" :key="task.id">
                <v-card theme--light class="pa-3">
                    <div class="answers">
                        <AnswerText v-bind:task="task" v-if="task.type.data.name === 'text'"></AnswerText>
                        <AnswerChoice v-bind:task="task" v-else></AnswerChoice>
                    </div>
                    <v-btn class="mx-auto d-block">Check</v-btn>
                    <div id="verification" v-if="task.showverification">
                        <p v-if="correctlysolved" style="background-color: lightgreen">
                            Congratulations! You solved the task correctly.
                        </p>
                        <p v-else style="background-color: #feb6b6">
                            Sorry, this was not completely correct. Try again later.
                        </p>
                    </div>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
import AnswerChoice from '../components/AnswerChoice.vue'
import AnswerText from '../components/AnswerText.vue'
import { mapState } from 'vuex'

export default {
    name: 'Task',
    components: {
        AnswerChoice,
        AnswerText
    },
    computed: {
        ...mapState({
            quiz: state => state.currentQuiz,
        })
    },
}
</script>

<style lang="scss" scoped>
.v-window{
    width: 60%;
    margin: 4% auto;
}
</style>
