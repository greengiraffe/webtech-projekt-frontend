<template>
    <v-form class="taskform">
        <v-card>
            <h1 v-if="!edit">Edit task</h1>
            <h1 v-else>New task</h1>
            <v-container class="taskdetails">
                <div>
                    <v-textarea v-if="!edit" v-model="this.task.text" label="Task text" required="required" clearable></v-textarea>
                    <v-textarea v-else v-model="this.newtext" rows='1' label="Task text" required="required" clearable></v-textarea>
                </div>
                <div>
                    <v-layout wrap align-center>
                        <v-flex xs12 sm6 d-flex>
                            <v-select v-model="newtypename" :items="tasktype_names" label="Tasktype"></v-select>
                        </v-flex>
                    </v-layout>
                </div>
                <div>
                    <v-text-field v-model="this.neworder" label="Order"></v-text-field>
                </div>

                <div class="answers">
                    <h1>Answers</h1>

                    <v-data-table :headers="taskdetails" :items="quiztasks" class="quiztasks">
                            <template slot="headers" slot-scope="props">
                                <tr>
                                    <th v-for="header in taskdetails" :key="header" >{{header}}</th>
                                    <th><v-btn title="Add new task"><v-icon>add</v-icon></v-btn></th>
                                </tr>
                            </template>
                            <template slot="items" slot-scope="props">
                                <tr v-for="task in quiztasks" :key="task.id">
                                    <td>{{task.order}}</td>
                                    <td>{{task.text}}</td>
                                    <td>{{task.type.name}}</td>
                                    <td>{{task.solved}}</td>
                                    <td>
                                        <v-btn flat icon title="Edit this task"><v-icon>create</v-icon></v-btn>
                                        <v-btn flat icon title="Delete this task" color="#ba1a0e"><v-icon>delete</v-icon></v-btn>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                </div>
            </v-container>
        </v-card>
    </v-form>
</template>
<script>
export default {
    data () {
        return {
            props: ['edit'],
            newtext: '',
            neworder: 0,
            newtypename: '',
            edit: false,
            task: {
                id: 1,
                text: 'This is a task',
                order: 1
            },
            tasktypes: [
                { id: 1, name: 'single-choice' },
                { id: 2, name: 'multiple-choice' },
                { id: 3, name: 'text' }
            ],
            answerdetailsChoice: ['Text', 'Correct choice?'],
            answerdetailsText: ['Text']
        } // how to add tasks and answers in backend? Values? Connection between quiz - task - answer
        // connection between text task and text answer?
    },
    computed: {
        tasktype_names: function () {
            return this.tasktypes.map(tasktype => tasktype.name)
        }
    }
}
</script>
