<template>
  <div id="startpage">
    <h1 class="welcome-message">
      <span v-if="loggedIn">
        Hi {{ userName }}, let's learn something!
      </span>
      <span v-else>
        Welcome to <span class="font-weight-light headline text-uppercase">Learn</span><span class="font-weight-black headline text-uppercase">it</span>
      </span>
    </h1>
    <v-container id="filtersearchsection">
      <div id="search">
        <v-icon>search</v-icon>
        <input type="text" v-model="search" placeholder="Search for quizzes" />
      </div>
      <v-layout row wrap justify-space-between align-center class="sameheight">
        <div id="newquizbtn">
          <router-link :to="{path: '/newquiz'}" exact=""><v-btn title="Add new quiz"><v-icon>add</v-icon> New quiz</v-btn></router-link>
        </div>
        <div id="filter">
          <div id="category">
              <v-select v-model="selected" :items="categoryNames" attach chips label="Filter by categories" multiple></v-select>
          </div>
        </div>
        <div id="sort">
          <v-switch v-show="userloggedin" label="Order by progress" v-model="orderbyprogress"></v-switch>
        </div>
      </v-layout>
    </v-container>
    <QuizList v-bind:quizzes="filteredByAll"></QuizList>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuizList from '../components/QuizList.vue'

const _filterByName = function (quizzes, search) {
  return quizzes.filter((quiz) => (quiz.name.toLowerCase()).match((search.toLowerCase()))
  )
}

const _filterByCategory = function (quizzes, selected) {
  if (selected.length === 0) return quizzes
  return quizzes.filter((quiz) =>
    selected.filter((sel) => quiz.categories.includes(sel)).length > 0
  )
}

const _sortByProgress = function (quizzes) {
  return quizzes.sort((a, b) => b.progress - a.progress)
}

export default {
  components: {
    QuizList
  },
  data () {
    return {
      quizzes: [
        { id: '1', name: 'SampleQuiz1 hello', description: 'This is a samplequiz with no backend connection', progress: '0', categories: ['Java'] },
        { id: '2', name: 'SampleQuiz2', description: 'This is a samplequiz with no backend connection', progress: '20', categories: ['Python'] },
        { id: '3', name: 'SampleQuiz3 hell', description: 'This is a samplequiz with no backend connection', progress: '25', categories: ['Java', 'Databases'] },
        { id: '4', name: 'SampleQuiz4', description: 'This is a samplequiz with no backend connection', progress: '95', categories: ['Databases'] }
      ],
      categories: [
        { name: 'Java' },
        { name: 'Python' },
        { name: 'Databases' }
      ],
      search: '',
      selected: [],
      orderbyprogress: false,
      userloggedin: true
    }
  },
  computed: {
    ...mapState('user', {
      loggedIn: state => state.loggedIn,
      userName: state => state.name
    }),
    filteredByAll: function () {
      const filtered = _filterByName(_filterByCategory(this.quizzes, this.selected), this.search)
      if (this.orderbyprogress) return _sortByProgress(filtered)
      else return filtered
    },
    categoryNames: function () {
      return this.categories.map(category => category.name)
    }
  }
}
</script>

<style lang="scss">
  #filtersearchsection{
    margin: 0 auto;
    padding-bottom: 0px;

    .sameheight{
      margin-top: 3%;

      #newquizbtn{
        width: 33%;
        display: inline-block;
      }
      #filter{
        width: 33%;
        display: inline-block;

        #category{
          width: 80%;
          margin: 0 auto;
        }

        .v-list__tile{
          height: 30px;
          font-size: 14px;
        }
      }
      #sort{
          width: 33%;
          display: inline-block;

          .v-input__control{
            margin: 0 0 0 auto;
          }
      }
    }

    #search {
    border: 1px solid #8080804d;
    border-radius: 20px;
    width: 30%;
    margin: 0 auto;
    padding: 10px;

    .input{
      width: 90%;
      padding-left: 3%;
    }

    &:hover{
      border: 1px solid #808080cc;
    }
  }
  }
  .welcome-message {
    margin: 1em auto;
    text-align: center;
  }
</style>
