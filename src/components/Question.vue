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
                        <Answers v-bind:task_id="task.id"></Answers>
                    </div>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
import Answers from '../components/Answers.vue';

export default {
    name: 'Question',
    components: {
        Answers
    },
    data () {
        return {
            tasks: [
                {
                    id: '1',
                    quiz_id: '1',
                    task_type: 'multiple choice',
                    text: 'What is an animal?',
                    solved: 'false'
                },
                {
                    id: '2',
                    quiz_id: '1',
                    task_type: 'single choice',
                    text: 'What is a tiger?',
                    solved: 'false'
                }
            ],
            answers1: [
                {
                    id: '1',
                    task_id: '1',
                    text: 'banana',
                    correct_choice: 'false',
                    correct_string: null
                },
                {
                    id: '2',
                    task_id: '1',
                    text: 'elephant',
                    correct_choice: 'true',
                    correct_string: null
                },
                {
                    id: '3',
                    task_id: '1',
                    text: 'kangaroo',
                    correct_choice: 'true',
                    correct_string: null
                },
                {
                    id: '4',
                    task_id: '1',
                    text: 'tree',
                    correct_choice: 'false',
                    correct_string: null
                }
            ],
            answers2: [
                {
                    id: '5',
                    task_id: '2',
                    text: 'giraffe',
                    correct_choice: 'false',
                    correct_string: null
                },
                {
                    id: '6',
                    task_id: '2',
                    text: 'elephant',
                    correct_choice: 'false',
                    correct_string: null
                },
                {
                    id: '7',
                    task_id: '2',
                    text: 'tiger',
                    correct_choice: 'true',
                    correct_string: null
                },
                {
                    id: '8',
                    task_id: '2',
                    text: 'monkey',
                    correct_choice: 'false',
                    correct_string: null
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
</style>
