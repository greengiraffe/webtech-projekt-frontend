<template>
    <v-form class="taskform">
        <v-card>
            <h1 v-if="!edit">Edit task</h1>
            <h1 v-else>New task</h1>
            <v-container class="taskdetails">
                <div>
                    <v-layout wrap align-center>
                        <v-flex xs12 sm6 d-flex>
                            <v-select v-model="newtypename" :items="tasktype_names" label="Tasktype"></v-select>
                        </v-flex>
                    </v-layout>
                </div>

                <div v-if="newtypename === ''">
                    <p>Please choose a task type to proceed!</p>

                    <div id="newtexttask" v-if="newtypename === 'text'">
                        <p>Please enter the text and use the Button to indicate where blanks should be set.</p>
                        <v-btn @click="add_answer()">Blank</v-btn>
                        <v-text-field id="blanktext" v-model="newtasktext" label="Task text" required="required" clearable></v-text-field>
                        <div id="blankanswers" v-for="(blank, index) in answerfields" :key="index">
                            <v-flex xs12 sm6 md3>
                                <v-text-field :label="'Answer: '+(index+1)" :v-model="blank.text"></v-text-field></v-flex>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <p>Please enter a question and add a few answers.</p>
                    <v-text-field id="question" v-model="newtasktext" label="Task text" required="required" clearable></v-text-field>
                    <div id="choiceanswers">
                        <h2>Answers</h2>
                        <v-data-table :headers="headers" :items="newanswers" >
                            <template slot="headers" slot-scope="props">
                                <tr>
                                    <th v-for="header in headers" :key="header" >{{header}}</th>
                                    <th><v-btn title="Add new task"><v-icon>add</v-icon></v-btn></th>
                                </tr>
                            </template>
                            <template slot="items" slot-scope="props">
                                <td>
                                    <v-edit-dialog :return-value.sync="props.item.text" lazy @save="save" @cancel="cancel" @open="open" @close="close">
                                        {{ props.item.text }}
                                        <v-text-field slot="input" v-model="props.item.text" label="Edit" multi-line></v-text-field>
                                    </v-edit-dialog>
                                </td>
                                <td id="choiceCheck">
                                    <v-checkbox slot="input" v-model="props.item.choice" autofocus></v-checkbox>
                                </td>
                                <td>
                                    <v-btn flat icon title="Delete this answer" color="#ba1a0e"><v-icon>delete</v-icon></v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </div>
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
            newtypename: '',
            newanswers: [
                {
                    text: 'Answer me',
                    choice: true
                }
            ],
            newtasktext: '',
            nrofanswers: 0,
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
            headers: ['Text', 'Correct choice?'],
        } // how to add tasks and answers in backend? Values? Connection between quiz - task - answer
        // connection between text task and text answer?
    },
    computed: {
        tasktype_names: function () {
            return this.tasktypes.map(tasktype => tasktype.name)
        },
        answerfields: function () {
            return this.newanswers
        }
    },
    methods: {
        add_answer: function () {
            this.nrofanswers++
            var placeholder = '#ANSWER:' + this.nrofanswers + '#'
            this.newtasktext += placeholder
            if (this.newanswers.length < this.nrofanswers) {
                this.newanswers.push({ text: '' })
            }
        }
    }
}
</script>

<style lang="scss">
.taskform > .v-card {
  margin: 5% auto;
  width: 70%;
  padding: 5% 0%;

  .datainput {
    width: 80%;
    margin: 2% auto;

    .small {
      width: 40%;
    }
    > :first-child {
      float: right;
    }
    .btns {
      text-align: center;
    }
  }
}
td:first-child{
    width: 90%;
    text-align: left;
}
td{
    text-align: center;
}
#choiceCheck{
    .v-input__control{
        margin: 0 auto;

        .v-input__slot{
            margin: 0;
        }
        .v-messages{
            display: none;
        }
    }
}
</style>
