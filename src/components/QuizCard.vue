<template>
    <div>
        <v-img :src="quiz.thumbnail" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
            <div>
                <h2 class="quizname">{{ quiz.name }}</h2>
                <p class="quizdescription">{{ quiz.description }}</p>
                <div class="quizcategories">
                    <p v-if="quiz.categories.length > 1">Categories: </p>
                    <p v-else>Category: </p>
                    <p v-for="category in this.quiz.categories" :key="category.id">{{ category.name }}</p>
                </div>
            </div>
        </v-card-title>

        <v-card-actions v-if="user.loggedIn">
            <v-btn :to="{path: 'quiz/'+quiz.id}" exact title="Start quiz" :class="{noadmin: !user.isAdmin}"><v-icon style="margin-right: 5px">play_arrow</v-icon>Start</v-btn>
            <v-btn :to="{path: 'editquiz/'+quiz.id, params: {quiz}}" exact :class="{noadmin_edit: !user.isAdmin}" v-if="user.isAdmin" title="Edit this quiz"><v-icon style="margin-right: 5px">create</v-icon>Edit</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: ['quiz'],
    computed: {
        ...mapState({
            user: state => state.user
        }),
    }
}
</script>

<style lang="scss">
.router-link-active {
  margin: 0 auto;
}
.editbutton {
  margin-right: 0px;
  margin-left: auto;
}
.noadmin_edit {
  display: none;
}
.noadmin {
  margin: 0 auto;
}

.v-card__actions {
  width: 90%;
  margin: 0 auto;
}
.quizcategories{
    color: grey;

      p{
          display: inline;
          padding-right: 1%;
      }
}
</style>
