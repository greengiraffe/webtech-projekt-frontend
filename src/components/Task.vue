<template>
    <v-tabs dark color="#171e5f" show-arrows>
        <v-tabs-slider color="#3fd6d3"></v-tabs-slider>
        <v-tab v-for="i in tasks.length" :href="'#task-' + i" :key="i">
            Task {{ i }}
        </v-tab>

        <v-tabs-items>
            <v-tab-item v-for="task in tasks" :value="'task-' + task.id" :key="task.id">
                <v-card theme--light class="pa-3">
                    <div class="answers">
                        <AnswerText v-bind:task="task" v-if="task.type.name === 'text'"></AnswerText>
                        <AnswerChoice v-bind:task="task" v-else></AnswerChoice>
                    </div>
                    <v-btn @click="verify()" class="mx-auto d-block">Check</v-btn>
                    <div id="verification" v-if="showverification">
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

export default {
    name: 'Task',
    components: {
        AnswerChoice,
        AnswerText
    },
    data () {
        return {
            tasks: [
                {
                    id: 1,
                    text: 'What is an animal?',
                    order: 1,
                    type: {
                        id: 2,
                        name: 'multiple choice'
                    },
                    solved: 'false'
                },
                {
                    id: 2,
                    text: 'What is a tiger?',
                    order: 2,
                    type: {
                        id: 1,
                        name: 'single choice'
                    },
                    solved: 'false'
                },
                {
                    id: 3,
                    text: 'Please answer the question.',
                    order: 3,
                    type: {
                        id: 3,
                        name: 'text'
                    },
                    solved: 'false'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.v-window{
    width: 60%;
    margin: 4% auto;
}
</style>
