<template>
  <div id="startpage">
    <v-container id="filtersearchsection">
        <v-layout>
            <v-flex>
                <h1 class="display-3 pt-3 mt-5 mb-5">
                <span v-if="user.loggedIn">
                    Hi {{ user.name }}, let's learn something!
                </span>
                <span v-else>
                    Welcome to <span class="font-weight-light text-uppercase">Learn</span><span class="font-weight-black text-uppercase">it</span>
                </span>
                </h1>
            </v-flex>
        </v-layout>

        <v-layout justify-center>
            <v-flex xs9 sm4>
                <v-text-field solo append-icon="search" v-model="searchKeyword" placeholder="Search for quizzes"></v-text-field>
            </v-flex>
        </v-layout>

      <v-layout row wrap justify-space-between align-center class="sameheight">

        <div v-if="user.isAdmin" id="newquizbtn">
          <v-btn :to="{path: '/newquiz'}" exact class="indigo accent-4 white--text" @click="setNewQuiz"><v-icon>add</v-icon> New quiz</v-btn>
        </div>

        <div id="filter">
          <div :class="{noadmin: !user.isAdmin}" id="category">
              <v-select v-model="selectedCategories" :items="categoryNames" attach chips label="Filter by categories" multiple></v-select>
          </div>
        </div>
        <div id="sort">
          <v-switch v-show="user.loggedIn" label="Order by progress" v-model="sortByProgress"></v-switch>
        </div>
      </v-layout>
    </v-container>

    <QuizList v-bind:quizzes="filteredQuizzes"></QuizList>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import QuizList from '../components/QuizList.vue'

export default {
    components: {
        QuizList
    },
    computed: {
        ...mapState({
            user: state => state.user,
            quizzes: state => state.quiz.quizzes,
            categories: state => state.quiz.categories,
        }),
        ...mapGetters('quiz', [
            'filteredQuizzes',
            'categoryNames'
        ]),
        searchKeyword: {
            // The vuex-way to handle 2-way-binding with v-model,
            // see https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
            get () {
                return this.$store.state.quiz.searchKeyword
            },
            set (keyword) {
                this.$store.commit('quiz/setSearchKeyword', keyword)
            }
        },
        selectedCategories: {
            get () {
                return this.$store.state.quiz.selectedCategories
            },
            set (categories) {
                this.$store.commit('quiz/setSelectedCategories', categories)
            }
        },
        sortByProgress: {
            get () {
                return this.$store.state.quiz.sortByProgress
            },
            set (isEnabled) {
                this.$store.commit('quiz/enableSortByProgress', isEnabled)
            }
        }
    },
    methods: {
        setNewQuiz () {
            this.$store.commit('currentQuiz/setQuiz', {})
        }
    }
}
</script>

<style lang="scss">
#filtersearchsection {
  margin: 0 auto;
  padding-bottom: 0px;

  .sameheight {
    margin-top: 3%;

    #newquizbtn {
      width: 33%;
      display: inline-block;
    }
    #filter {
      width: 33%;
      display: inline-block;

      #category {
        width: 80%;
        margin: 0 auto;
      }

      .v-list__tile {
        height: 30px;
        font-size: 14px;
      }
    }
    .noadmin {
      margin: 0 !important;
    }
    #sort {
      width: 33%;
      display: inline-block;

      .v-input__control {
        margin: 0 0 0 auto;
      }
    }
  }
}
</style>
