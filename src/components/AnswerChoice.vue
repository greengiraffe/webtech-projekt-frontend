<template>
    <div>
            <v-card-text>{{task.text}}</v-card-text>
            <v-spacer></v-spacer>
            <p class="pl-4 pt-3">Choose the correct answer. One or more answers might be correct.</p>
            <ul>
                <li v-for="answer in task.answers.data" :key="answer.id">
                    <v-checkbox :label="answer.text" v-model="answer.selected"></v-checkbox>
                </li>
            </ul>

    </div>
</template>

<script>
export default {
    name: 'AnswerChoice',
    props: ['task'],
    data () {
        return {
        }
    },
    computed: {
        correctlysolved: function () {
            return true // TODO
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
