<template>
  <div id="startpage">
    <h1 class="welcome-message">Welcome to <span class="font-weight-light headline text-uppercase">Learn</span><span class="font-weight-black headline text-uppercase">it</span></h1>
    <div id="filtersearchsection">
      <div id="search">
        <v-icon>search</v-icon>
        <input type="text" v-model="search" placeholder="Search for quizzes" />
      </div>
      <div id="filter">
        <div id="category">
           <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">Sort by categories</div>
                <v-checkbox v-for='category in categories' :key='category.name' v-model="selected" :label='category.name' :value='category.name'></v-checkbox>
            </v-expansion-panel-content>
           </v-expansion-panel>
        </div>
      </div>
      <div id="sort">
        <v-switch v-show="userloggedin" label="Order by progress" v-model="orderbyprogress"></v-switch>
      </div>
    </div>
    <QuizList v-bind:quizzes="filteredByAll"></QuizList>
  </div>
</template>

<script>
  import QuizList from '../components/QuizList.vue'

  var _filterByName = function(quizzes, search){
    return quizzes.filter((quiz) => (quiz.name.toLowerCase()).match((search.toLowerCase()))
    );
  }

  var _filterByCategory = function(quizzes, selected){
    if(selected.length === 0) return quizzes;
    return quizzes.filter((quiz) => 
        selected.filter((sel) => quiz.categories.includes(sel)).length > 0
    )
  }

  var _sortByProgress = function(quizzes){
    return quizzes.sort((a, b) => b.progress-a.progress)
  }

  export default{
    components:{
      QuizList
    },
    data(){
      return{
        quizzes: [
          {name: 'SampleQuiz1 hello', description: 'This is a samplequiz with no backend connection', progress: "0", categories: ["Java"]},
          {name: 'SampleQuiz2', description: 'This is a samplequiz with no backend connection', progress: "20", categories:["Python"]},
          {name: 'SampleQuiz3 hell', description: 'This is a samplequiz with no backend connection', progress: "25", categories:["Java", "Databases"]},
          {name: 'SampleQuiz4', description: 'This is a samplequiz with no backend connection', progress: "95", categories:["Databases"]}
        ],
        categories:[
          {name: 'Java'},
          {name: 'Python'},
          {name: 'Databases'}
        ],
        search:'',
        selected: [],
        orderbyprogress: false,
        userloggedin: true
      }
    },
    computed:{      
      filteredByAll: function(){
        var filtered = _filterByName(_filterByCategory(this.quizzes, this.selected), this.search);
        if(this.orderbyprogress) return _sortByProgress(filtered);
        else return filtered
      }
    }
  }
  
</script>

<style lang=<style lang="scss">
  .welcome-message {
    margin: 1em auto;
    text-align: center;
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
  .v-expansion-panel {
	width: 15%;
	margin: 0px 10px 0px auto;

    .v-expansion-panel__body{
      z-index: 2;
      position: absolute;
      width: 15%;
    }

    .v-label{
      font-size: 14px;
    }
    .v-input--selection-controls{
      width: 90%;
      margin-left: 10%;
      margin-bottom: 0px;

      .v-input__slot{
        margin-bottom: 0px;
      }
    }
  }

  #sort{
    .v-input__control{
      margin: 10px 20px 0px auto;
    }
  }
</style>
