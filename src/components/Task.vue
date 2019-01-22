<template>
    <v-tabs dark color="#171e5f" show-arrows>
        <v-tabs-slider color="#3fd6d3"></v-tabs-slider>
        <v-tab v-for="i in tasks.length" :href="'#task-' + i" :key="i">
            Task {{ i }}
        </v-tab>

        <v-tabs-items>
            <v-tab-item v-for="task in tasks" :value="'task-' + task.id" :key="task.id">
                <v-card theme--light>
                    <v-card-text>{{ task.text }}</v-card-text>
                    <div class="answers">
                        <AnswerText v-if="task.type.name==='text'"></AnswerText>
                        <AnswerChoice v-else v-bind:task_id="task.id"></AnswerChoice>
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
.v-card__text {
  padding: 20px;
  padding-bottom: 0px;
}
.v-window{
    width: 60%;
    margin: 4% auto;
}
</style>
