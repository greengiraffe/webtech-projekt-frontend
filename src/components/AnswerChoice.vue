<template>
    <div>
            <v-card-text>{{task.text}}</v-card-text>
            <v-spacer></v-spacer>
            <p class="pl-4 pt-3">Choose the correct answer. One or more answers might be correct.</p>
            <ul v-if="task.answers">
                <li v-for="answer in task.answers.data" :key="answer.id" v-bind:class="{ correct: answer.is_correct, false: answer.is_correct === false }">
                    <v-checkbox :label="answer.text" v-model="answer.answer_choice"></v-checkbox>
                </li>
            </ul>
            <v-btn class="mx-auto d-block" @click="verify()">Check</v-btn>
            <div id="verification" v-if="task.verified">
                <p v-if="task.is_correct" style="background-color: lightgreen">
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
    methods: {
        verify () {
            this.$store.dispatch('currentQuiz/verify', this.task)
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
  .v-input__slot {
      margin: 8px 0;
  }
  &.correct {
    background-color: lightgreen;
  }
  &.false {
    background-color: #feb6b6;
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
