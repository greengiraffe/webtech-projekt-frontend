<template>
    <div v-if='answers[0].correct_string === null'>
        <v-container fluid>
            <p>Choose the correct answer. One or more answers might be correct.</p>
            <ul>
                <li v-for="answer in answers" :key="answer.id">
                    <v-checkbox :label="answer.text" v-model="selected" :value="answer.text" :disabled="showverification"></v-checkbox>
                </li>
            </ul>
            <v-btn @click="verify()">Check</v-btn>
        </v-container>
        <div id="verification" v-if="showverification">
            <p v-if="correctlysolved" style="background-color: lightgreen">
                Congratulations! You solved the task correctly.
            </p>
            <p v-else style="background-color: #feb6b6">
                Sorry, this was not completely correct. Try again later.
            </p>
        </div>
    </div>
    <div v-else>
        This is text
    </div>
</template>

<script>
export default {
    name: 'Answers',
    props: ['task_id'],
    data () {
        return {
            answers: [
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
            ],
            selected: [],
            showverification: false
        }
    },
    computed: {
    // checks whether a task is of type text or choice
        texttask: function () {
            return this.answers[0].correct_string !== null
        },
        // returns an array with the text of all correctly chosen answers, based on the selected answers
        // TODO: change back to boolean
        correctchoice: function () {
            const correctAnswers = this.selected
                .map(sel => this.answers.find(answer => answer.text === sel))
                .filter(
                    answer => answer !== undefined && answer.correct_choice === 'true'
                )
            return correctAnswers.map(corrA => corrA.text)
        },
        // returns the number of all answers that are marked with correct_choice in the answers array
        // TODO: change back to boolean
        nrcorrectanswers: function () {
            return this.answers.filter(answer => answer.correct_choice === 'true')
                .length
        },
        // returns if task solved correctly
        correctlysolved: function () {
            if (
                this.selected.length === this.nrcorrectanswers &&
        this.correctchoice.length === this.nrcorrectanswers
            ) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        verify () {
            this.showverification = true
            this.highlightChosen()
        },
        highlightChosen () {
            const chosenCheck = document.querySelectorAll('[aria-checked="true"]')
            const tagName = 'li'
            let color

            for (let i = 0; i < chosenCheck.length; i++) {
                let element = chosenCheck[i]
                const value = element.getAttribute('value')
                // determine whether to color red or green
                if (this.correctchoice.includes(value)) {
                    color = 'lightgreen'
                } else {
                    color = '#feb6b6'
                }

                while (element && element.parentNode) {
                    element = element.parentNode
                    if (element.tagName && element.tagName.toLowerCase() === tagName) {
                        element.style.backgroundColor = color
                        break
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
li {
  list-style-type: none;

  .v-input--selection-controls {
    padding: 0;
    margin: 0;
  }
}

.v-tabs,
.v-content__wrap {
  background-color: #f2f2f2;
}
.v-window {
  width: 60%;
  margin: 4% auto;

  .v-card {
    background: white;
    margin: 0px;

    .v-card__text {
      font-size: 20px;
    }
  }

  #verification p {
    height: 3em;
    text-align: center;
    vertical-align: middle;
    line-height: 3em;
    font-size: 16px;
  }
}
</style>
