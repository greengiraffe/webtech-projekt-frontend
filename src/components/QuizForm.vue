<template>
    <v-form class="quizform">
         <v-card>
            <h1>{{ this.newname }}</h1>
            <v-container>
                <div class="datainput">
                    <div class="small">
                        <img :src="imageUrl" height="150" v-if="imageUrl"/>
                        <v-text-field label="Select Image" @click='pickFile' v-model='newthumbnail' prepend-icon='add_a_photo'></v-text-field>
                        <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                    </div>
                    <div class="small">
                        <v-text-field v-model="newname" label="Quizname" required="required" clearable></v-text-field>
                    </div>
                    <div>
                        <v-combobox v-model="newcategories" :items="categories" :search-input.sync="search" hide-selected
                        label="Add one or more categories"  multiple persistent-hint small-chips >
                            <template slot="no-data">
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>
                                    No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                                </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            </template>
                        </v-combobox>
                    </div>
                    <div class="large">
                        <v-text-field v-model="newdescription" label="Description" rows="2" multi-line clearable></v-text-field>
                    </div>
                    <div id="tasks">
                        <h2>Tasks</h2>
                        <div v-if="quiztasks.length === 0" id="notasks">
                            <p >No tasks have been added to this quiz yet.</p>
                            <v-btn title="Add new task"><v-icon>add</v-icon> add a task</v-btn>
                        </div>

                        <v-data-table v-else :headers="taskdetails" :items="quiztasks" class="quiztasks">
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
                    <v-divider style="margin: 5% auto;"></v-divider>
                    <div class="btns">
                        <router-link :to="{name: 'home'}"><v-btn>Cancel</v-btn></router-link>
                        <v-btn>Save</v-btn>
                    </div>
                    <div id="delete" class="text-xs-center">
                        <v-dialog v-model="dialog" width="40%" >
                            <v-btn slot="activator" title="Delete this quiz" ><v-icon color="#ba1a0e" style="margin-right: 5px">delete</v-icon>Delete</v-btn>
                            <v-card>
                                <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>
                                <v-card-text>Do you really want to delete this quiz?</v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" flat @click="dialog = false">Yes</v-btn>
                                    <v-btn color="primary" flat @click="dialog = false">No</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </div>
            </v-container>
         </v-card>
    </v-form>
</template>

<script>
export default {
    props: 'quiz',
    data () {
        return {
            // Models for input data
            newname: 'New Quiz',
            newdescription: '',
            newthumbnail: '',
            newcategories: [],
            // get from backend
            quiz: {
                id: 1,
                name: 'Quiz 1',
                description: '',
                thumbnail: '',
                categories: [
                    {
                        id: 1,
                        name: 'Python',
                        quizzes: 2
                    },
                    {
                        id: 2,
                        name: 'Java',
                        quizzes: 1
                    }
                ]
            },
            quiztasks: [
                {
                    id: '1',
                    text: 'What is an animal?',
                    order: '1',
                    type: {
                        id: 2,
                        name: 'multiple choice'
                    },
                    answers: [
                        {
                            id: 1,
                            order: 1,
                            text: 'a'
                        }
                    ],
                    solved: false
                },
                {
                    id: '2',
                    text: 'What is a tiger?',
                    order: '2',
                    type: {
                        id: 1,
                        name: 'single choice'
                    },
                    answers: [
                        {
                            id: 1,
                            order: 1,
                            text: 'a'
                        }
                    ],
                    solved: false
                }
            ],
            // Stay like this
            taskdetails: ['Order', 'Text', 'Type', 'Solved'],
            // Get from backend
            categories: [
                {
                    id: 1,
                    name: 'Python',
                    quizzes: 2
                },
                {
                    id: 2,
                    name: 'Java',
                    quizzes: 1
                }
            ],
            dialog: false,
            // Check what will be used here -> thumbnail?
            imageUrl: ''

        }
    },
    computed: {
        edit: function () {
            /* TODO: adapt to get data from vuex */
            if (this.quiz) {
                this.name = this.quiz.name
            }
        }
    /* tasks: function(){
        } */
    },
    methods: {
        pickFile () {
            this.$refs.image.click()
        },
        // method by Vuetify
        onFilePicked (e) {
            const files = e.target.files
            if (files[0] !== undefined) {
                this.thumbnail = files[0].name
                if (this.thumbnail.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader()
                fr.readAsDataURL(files[0])
                fr.addEventListener('load', () => {
                    this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server...
                })
            } else {
                this.thumbnail = ''
                this.imageFile = ''
                this.imageUrl = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.quizform > .v-card {
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

  #tasks {
    margin-top: 7%;

    #notasks {
      text-align: center;
    }
  }
}
.v-select-list {
  margin: 0px;
}
.v-dialog {
  .v-card__text {
    padding-bottom: 20px;
  }
  .v-card {
    margin-bottom: 0px;
  }
}
</style>
