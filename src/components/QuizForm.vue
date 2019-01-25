<template>
    <v-form class="quizform">
         <v-card>
            <v-img class="thumb-preview" :src="quiz.thumbnail || 'https://source.unsplash.com/xekxE_VR0Ec/450x300'" aspect-ratio="8"/>

             <v-card-title>
                <h1>{{ this.quiz.name || "New Quiz" }}</h1>
             </v-card-title>

            <v-container>
                <div class="datainput">
                    <v-text-field v-model="quiz.name" label="Quizname" required="required" clearable></v-text-field>
                    <v-text-field v-model='quiz.thumbnail' label="Add an image URL" prepend-icon='add_a_photo'></v-text-field>
                    <div>
                        <v-combobox
                            v-model="currentCategories"
                            :items="allCategories"
                            :search-input.sync="categorySearch"
                            cache-items
                            hide-selected
                            label="Add one or more categories"
                            multiple
                            persistent-hint
                            chips
                            deletable-chips
                        >
                            <template slot="no-data">
                                <v-list-tile>
                                    <v-list-tile-content>
                                    <v-list-tile-title>
                                        No results matching "<strong>{{ categorySearch }}</strong>". Press <kbd>enter</kbd> to create a new one
                                    </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-combobox>
                    </div>

                    <div class="large">
                        <v-textarea v-model="quiz.description" label="Description" rows="2"></v-textarea>
                    </div>

                    <div id="tasks">
                        <h2>Tasks</h2>
                        <div v-if="quiz.tasks.length === 0" id="notasks">
                            <p>No tasks have been added to this quiz yet.</p>
                            <v-btn title="Add new task" :to="{path: 'quiz/'+quiz.id+'/newtask', params: [false, task]}" ><v-icon>add</v-icon> add a task</v-btn>
                        </div>

                        <v-data-table v-else :headers="taskdetails" :items="quiz.tasks" class="quiztasks">
                            <template slot="headers" slot-scope="props">
                                <tr>
                                    <th v-for="header in taskdetails" :key="header" >{{header}}</th>
                                    <th><v-btn title="Add new task" @click="saveQuiz" :to="{path: 'quiz/'+quiz.id+'/newtask', params: [false, task]}"><v-icon>add</v-icon></v-btn></th>
                                </tr>
                            </template>
                            <template slot="items" slot-scope="props">
                                <tr v-for="task in quiz.tasks" :key="task.id">
                                    <td>{{task.order}}</td>
                                    <td>{{task.text}}</td>
                                    <td>{{task.type.name}}</td>
                                    <td>{{task.solved}}</td>
                                    <td>
                                        <v-btn flat icon title="Edit this task" :to="{path: '/edit/quiz/'+quiz.id+'/task', params: [false, task]}"><v-icon>create</v-icon></v-btn>
                                        <v-btn flat icon title="Delete this task" color="#ba1a0e" @click="deleteTask(task)"><v-icon>delete</v-icon></v-btn>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                    </div>

                    <v-divider style="margin: 5% auto;"></v-divider>

                    <div class="btns">
                        <v-btn :to="{name: 'home'}">Cancel</v-btn>
                        <v-btn @click="saveQuiz" class="indigo accent-4 white--text">Save</v-btn>
                    </div>

                    <div v-if="quiz.id !== null" id="delete" class="text-xs-center">
                        <v-dialog v-model="showDeleteDialog" width="40%" >
                            <v-btn slot="activator" title="Delete this quiz" ><v-icon color="#ba1a0e" style="margin-right: 5px">delete</v-icon>Delete</v-btn>
                            <v-card>
                                <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>
                                <v-card-text>Do you really want to delete this quiz?</v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" flat @click="deleteQuiz">Yes</v-btn>
                                    <v-btn color="primary" flat @click="showDeleteDialog = false">No</v-btn>
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
import { mapState } from 'vuex'
export default {
    name: 'QuizForm',
    data () {
        return {
            categorySearch: null,
            // Stay like this
            taskdetails: ['Order', 'Text', 'Type', 'Solved'],
            showDeleteDialog: false,
        }
    },
    computed: {
        ...mapState({
            quiz: state => state.currentQuiz,
            allCategories: state => {
                return state.quiz.categories.map(c => {
                    // Combobox handles objects with text & value properties
                    return {
                        text: c.name,
                        value: c.id,
                    }
                })
            },
        }),
        currentCategories: {
            get () {
                return this.$store.state.currentQuiz.categories.map(c => {
                    // Combobox handles objects with text & value properties
                    return {
                        text: c.name,
                        value: c.id,
                    }
                })
            },
            set (categories) {
                let cats = categories.map(c => {
                    // Transform back to usual category shape

                    // New categories are just strings instead of objects, so
                    // transform them to objects
                    let id = typeof c === 'string' ? null : c.value
                    let name = typeof c === 'string' ? c : c.text
                    return { name, id }
                })
                this.$store.commit('currentQuiz/setCategories', cats)
            }
        },
        isThumbUrl () {
            // Dumb check if it is an actual image URL, just for demo purposes
            return this.quiz.thumbnail.includes('http')
        }
    },
    methods: {
        saveQuiz () {
            // Note that categories are { text, value } objects here!
            console.log(this.currentCategories)
            const existingCategories = this.currentCategories
                .filter(cat => {
                    if (cat.value !== null) return cat
                })
                .map(cat => cat.value)

            let newCategories = this.currentCategories
                .filter(cat => {
                    if (cat.value === null) return cat
                })

            Promise.all(newCategories.map(cat => {
                return this.$store.dispatch('quiz/addCategory', cat.text)
            }))
                .then(responses => {
                    if (responses || responses.length !== 0) {
                        newCategories = responses.map(res => res.data.data)
                    }
                    this.quiz.categories = [...newCategories, ...existingCategories]
                })
                .catch(() => {
                    this.quiz.categories = existingCategories
                })
                .finally(() => {
                    if (this.quiz.id !== null) {
                        // editing quiz
                        this.$store.dispatch('currentQuiz/updateQuiz', this.quiz)
                    } else {
                        this.$store.dispatch('currentQuiz/addQuiz', this.quiz)
                    }

                    this.$router.push({ name: 'home' })
                })
        },
        deleteQuiz () {
            this.$store.dispatch('currentQuiz/deleteQuiz', this.quiz.id)
            this.$router.push({ name: 'home' })
        },
        selectCategory (c) {
            console.log(c)
        },
        deleteTask (task) {
            this.quiz.tasks = this.quiz.tasks.filter(t => t !== task)
        }
    }
}
</script>

<style lang="scss" scoped>
.quizform > .v-card {
  margin: 5% auto;
  width: 70%;

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

.thumb-preview {
    max-width: 100%;
}
</style>
