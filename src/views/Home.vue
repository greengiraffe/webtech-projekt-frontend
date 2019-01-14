<template>
  <div id="startpage">
    <h1 class="welcome-message">Welcome to <span class="font-weight-light headline text-uppercase">Learn</span><span class="font-weight-black headline text-uppercase">it</span></h1>
    <QuizList></QuizList>
  </div>
</template>

<script>
  import QuizList from '../components/QuizList.vue'

  export default{
    components:{
      QuizList
    }
  }
</script>

<style>
  .welcome-message{
    margin: 1em auto;
    text-align: center;
  }
</style>
