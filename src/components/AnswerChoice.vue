<template>
    <div>
        <v-container fluid>
            <p>Choose the correct answer. One or more answers might be correct.</p>
            <ul>
                <li v-for="answer in answers" :key="answer.id">
                    <v-checkbox :label="answer.text" v-model="selected[answer.id]" :disabled="showverification" ></v-checkbox>
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
</template>

<script>
export default {
    name: 'AnswerChoice',
    props: ['task_id'],
    data () {
        return {
            answers: [
                {
                    id: 1,
                    order: 1,
                    text: 'banana'
                },
                {
                    id: 2,
                    order: 2,
                    text: 'elephant'
                },
                {
                    id: 3,
                    order: 3,
                    text: 'kangaroo'
                },
                {
                    id: 4,
                    order: 4,
                    text: 'tree'
                }
            ],
            selected: [],
            showverification: false
        }
    },
    computed: {
        correctlysolved: function () {
            return true // TODO
        }
    },
    methods: {
        verify () {}
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
