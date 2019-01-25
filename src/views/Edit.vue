<template>
    <v-container>
        <v-layout>
            <v-flex>
                <div v-if="editquiz">
                    <QuizForm></QuizForm>
                </div>
                <div v-else>
                    <TaskForm v-bind:task="task"></TaskForm>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import QuizForm from '../components/QuizForm.vue'
import TaskForm from '../components/TaskForm.vue'

export default {
    components: {
        QuizForm,
        TaskForm
    },
    props: { quiz: Boolean, task: Object },
    data () {
        return {

        }
    },
    computed: {
        editquiz: function () {
            if (this.$route.path.includes('task')) {
                return false
            } else {
                return true
            }
        }
    }
}
</script>
