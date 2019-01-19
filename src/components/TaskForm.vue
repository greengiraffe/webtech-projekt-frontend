<template>
    <v-form class="taskform">
        <v-card>
            <h1>New task</h1> <!-- edit *edit task* -> depending on data-->
            <v-container class="taskdetails">
                <div>
                    <v-text-field v-model="text" label="Task text" required="required" clearable>{{ this.text }}</v-text-field>
                </div>
                <div>
                    <v-layout wrap align-center>
                        <v-flex xs12 sm6 d-flex>
                            <v-select :items="tasktype_names" label="Tasktype"></v-select>
                        </v-flex>
                    </v-layout>
                </div>
            </v-container>
        </v-card>
    </v-form>
</template>
<script>
export default {
    data () {
        return {
            text: '',
            tasktypes: [
                { id: 1, name: 'single-choice' },
                { id: 2, name: 'multiple-choice' },
                { id: 3, name: 'text' }
            ]
        }
  },
    computed: {
        tasktype_names: function () {
            return this.tasktypes.map(tasktype => tasktype.name)
    }
    }
}
</script>
