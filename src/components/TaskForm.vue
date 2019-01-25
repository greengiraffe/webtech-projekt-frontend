<template>
    <v-form class="taskform">
        <v-card>
            <h1 v-if="!edit">Edit task</h1>
            <h1 v-else>New task</h1>
            <v-container class="taskdetails">
                <div>
                    <v-layout wrap align-center>
                        <v-flex class="tasktypesel" xs12 sm4 d-flex>
                            <v-select v-model="newtypename" :items="tasktype_names" label="Tasktype"></v-select>
                        </v-flex>
                    </v-layout>
                </div>

                <div v-if="newtypename === ''">
                    <p class="desc">Please choose a task type to proceed!</p>
                </div>

                <div id="newtexttask" v-else-if="newtypename === 'text'">
                    <p class="desc">Please enter the text and use the Button to indicate where blanks should be set.</p>
                    <p class="desc">Use the answers delete button, to remove it from the text or clear the complete line.</p>
                    <div id="questiontext">
                        <v-btn id="blankbtn" @click="add_answer()">Blank</v-btn>
                        <v-text-field id="blanktext" v-model="newtasktext" label="Task text" required="required" multi-line rows="1" clearable></v-text-field>
                    </div>
                    <div id="blankanswers" v-for="(blank, index) in answerfields" :key="index">
                        <v-text-field :label="'Answer: '+(index+1)" :v-model="blank.text"></v-text-field>
                        <v-btn flat icon title="Delete this answer" color="#ba1a0e" @click="delete_answer(blank, (index+1))"><v-icon>delete</v-icon></v-btn>
                    </div>
                </div>

                <div v-else>
                    <p class="desc">Please enter a question and add a few answers.</p>
                    <div id="question">
                        <v-text-field v-model="newtasktext" label="Question" required="required" multi-line rows='1' clearable></v-text-field>
                    </div>
                    <div id="choiceanswers">
                        <v-spacer></v-spacer>
                        <h2>Answers</h2>
                        <v-data-table :headers="headers" :items="answerfields" >
                            <template slot="headers" slot-scope="props">
                                <tr>
                                    <th v-for="header in headers" :key="header" >{{header}}</th>
                                    <th><v-btn title="Add new answer" @click="add_answer()"><v-icon>add</v-icon></v-btn></th>
                                </tr>
                            </template>
                            <template slot="no-data">
                                <td colspan="3">
                                    <v-alert :value="true" color="grey">Please add new answers by using the <v-icon>add</v-icon> sign.</v-alert>
                                </td>
                            </template>
                            <template slot="items" slot-scope="props">
                                <td>
                                    <v-text-field class="answertxt" slot="input" v-model="props.item.text" multi-line rows="1"></v-text-field>
                                </td>
                                <td id="choiceCheck">
                                    <v-checkbox slot="input" v-model="props.item.choice" autofocus></v-checkbox>
                                </td>
                                <td>
                                    <v-btn flat icon title="Delete this answer" color="#ba1a0e" @click="delete_answer(props.item)"><v-icon>delete</v-icon></v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </div>
                </div>
            </v-container>

            <div class="btns text-xs-center">
                <router-link :to="{path: quizroute}"><v-btn>Cancel</v-btn></router-link>
                <v-btn @click="save_task">Save</v-btn>
                    </div>
                    <div id="delete" class="text-xs-center">
                        <v-dialog v-model="dialog" width="40%" >
                            <v-btn slot="activator" title="Delete this task" ><v-icon color="#ba1a0e" style="margin-right: 5px">delete</v-icon>Delete</v-btn>
                            <v-card>
                                <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>
                                <v-card-text>Do you really want to delete this task?</v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" flat @click="dialog = false">Yes</v-btn>
                                    <v-btn color="primary" flat @click="dialog = false">No</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>

        </v-card>
    </v-form>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TaskForm',
    data () {
        return {
            props: { task: Object },
            newtasktext: '',
            newtypename: '',
            newanswers: [],
            nrofanswers: 0,
            edit: false,
            tasktypes: [
                { id: 1, name: 'single-choice' },
                { id: 2, name: 'multiple-choice' },
                { id: 3, name: 'text' }
            ],
            headers: ['Text', 'Correct choice?'],
        }
    },
    computed: {
        tasktype_names: function () {
            return this.tasktypes.map(tasktype => tasktype.name)
        },
        answerfields: function () {
            return this.newanswers
        },
        quizroute: function () {
            return this.$route.path.replace('/newtask', '')
        },
        ...mapState({
            quiz: state => state.currentQuiz
        }),
    },
    methods: {
        add_answer: function () {
            if (this.newtypename === 'text') {
                if (this.newtasktext.length === 0) {
                    this.nrofanswers = 0
                }
                this.nrofanswers++
                var placeholder = '#ANSWER:' + this.nrofanswers + '#'
                this.newtasktext += placeholder
                if (this.newanswers.length < this.nrofanswers) {
                    this.newanswers.push({ text: '' })
                }
            } else {
                this.newanswers.push({ text: '', choice: false })
            }
        },
        delete_answer: function (answer, index) {
            this.newanswers.pop(answer)
            if (this.newtypename === 'text') {
                this.newtasktext = this.newtasktext.replace('#ANSWER:' + index + '#', '')
                var i
                for (i = index + 1; i <= this.nrofanswers; i++) {
                    this.newtasktext = this.newtasktext.replace('#ANSWER:' + i + '#', '#ANSWER:' + (i - 1) + '#')
                }
                this.nrofanswers--
            }
        },
        check_if_editing: function () {
            if (this.task !== undefined) {
                this.newtasktext = this.task.text
                this.newtypename = this.task.tasktype
                this.newanswers = this.task.answers
            }
        },
        save_task: function () {
            let task = {

            }

            this.$store.commit('currentQuiz/addTask', task)
        }
    },
    beforeMount () {
        this.check_if_editing()
    }
    // Save task -> get current quiz and add task
}
</script>

<style lang="scss" >
.taskform > .v-card {
  margin: 5% auto;
  width: 70%;
  padding: 5% 0%;

  .tasktypesel{
      margin: 0 auto;
      margin-bottom: 5%;
  }
  .desc{
      text-align: center;
      margin-bottom: 0px
  }
  h2{
      text-align: center;
  }
  #questiontext{
      margin-top: 3%;
  }
  #blankbtn{
      float: right;
      margin-top: 2%;
  }
  #blanktext{
      width: 85%;
      margin-top: 0px;
  }
  #blankanswers{
      .v-text-field{
          width: 30%;
          float: left;
      }
      .v-btn{
          margin-top: 16px;
      }
      clear:both;
  }
}

#question{
    width: 94%;
    margin: 2% auto;
}
.v-textarea{
    font-size: 14px;
}
#choiceanswers{
    td:first-child{
        width: 90%;
        text-align: left;
    }
    th:first-child{
        width: 90%;
    }
    td{
        text-align: center;
        .v-alert{
            text-align: center;
        }
    }
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
.answertxt{
    font-size: 14px;
	padding-top: 0px;
	margin-top: 0px;

    .v-input__slot{
        margin-bottom: 0px;
    }
    .v-text-field__details{
        display: none;
    }
    textarea{
        padding-bottom: 0px;
    }
}
.answertxt > .theme--light.v-text-field > .v-input__control > .v-input__slot::before {
	border-color: white;
}
</style>
