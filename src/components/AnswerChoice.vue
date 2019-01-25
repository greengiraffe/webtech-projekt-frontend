<template>
    <div>
            <v-card-text>{{task.text}}</v-card-text>
            <v-spacer></v-spacer>
            <p class="pl-4 pt-3">Choose the correct answer. One or more answers might be correct.</p>
            <ul v-if="task.answers">
                <li v-for="answer in task.answers.data" :key="answer.id">
                    <v-checkbox :label="answer.text" v-model="answer.selected"></v-checkbox>
                </li>
            </ul>
            <v-btn class="mx-auto d-block" @click="verify()">Check</v-btn>
            <div id="verification" v-if="this.showverification">
                <p v-if="correctlysolved" style="background-color: lightgreen">
                    Congratulations! You solved the task correctly.
                </p>
                <p v-else style="background-color: #feb6b6">
                    Sorry, this was not completely correct. Try again later.
                </p>
            </div>
    </div>
</template>

<script>
export default {
    name: 'AnswerChoice',
    props: ['task'],
    data () {
        return {
            showverification: false
        }
    },
    computed: {
        correctchoice: function () {
            const correctAnswers = this.selected
                .map(sel => this.answers.find(answer => answer.text === sel))
                .filter(
                    answer => answer !== undefined && answer.correct_choice
                )
            return correctAnswers.map(corrA => corrA.text)
        },
        nrcorrectanswers: function () {
            return this.answers.filter(answer => answer.correct_choice)
                .length
        },
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

<style lang="scss" scoped>
li {
  list-style-type: none;

  .v-input--selection-controls {
    padding: 0;
    margin: 0;
  }
}
.v-card__text {
  padding: 20px;
  padding-bottom: 0px;
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
