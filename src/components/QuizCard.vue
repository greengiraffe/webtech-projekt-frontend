<template>
    <div>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
            <div>
                <h2 class="quizname">{{ quiz.name }}</h2>
                <p class="quizdescription">{{ quiz.description }}</p>
            </div>
        </v-card-title>

        <v-card-actions>
            <router-link :to="{path: 'quiz/'+quiz.id}" exact class="startbutton" :class="{noadmin: !isadmin}">
               <v-btn title="Start quiz"><v-icon style="margin-right: 5px">play_arrow</v-icon>Start</v-btn>
            </router-link>
            <router-link :to="{path: 'editquiz/'+quiz.id, params: {quiz}}" class="editbutton" :class="{noadmin_edit: !isadmin}" exact>
                <v-btn v-if="isadmin" title="Edit this quiz"><v-icon style="margin-right: 5px">create</v-icon>Edit</v-btn>
            </router-link>
        </v-card-actions>
    </div>
</template>

<script>
export default {
    props: ['quiz'],
    data () {
        return {
            user: {
                name: 'user',
                email: 'user@user.com',
                is_admin: true
            }
        }
  },
    computed: {
        isadmin: function () {
            return this.user.is_admin
    }
    }
}
</script>

<style>
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
</style>
