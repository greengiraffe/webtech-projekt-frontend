<template>
    <div>
        <v-img :src="quiz.thumbnail" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
            <h2 class="mb-2">{{ quiz.name }}</h2>
            <p>{{ quiz.description }}</p>
            <div>
                <v-chip label small v-for="category in this.categories" :key="category.id">{{ category.name }}</v-chip>
            </div>
        </v-card-title>

        <v-card-actions v-if="user.loggedIn">
            <v-btn
                :to="{path: 'quiz/'+quiz.id}"
                title="Start quiz"
                :class="{noadmin: !user.isAdmin}"
                color="green"
                exact
                flat
            >
                <v-icon class="mr-1">play_arrow</v-icon>Start
            </v-btn>
            <v-btn
                v-if="user.isAdmin"
                :to="{path: 'editquiz/'+quiz.id, params: {quiz}}"
                title="Edit this quiz"
                :class="{noadmin_edit: !user.isAdmin}"
                color="deep-orange"
                exact
                flat
            >
                    <v-icon class="mr-1">create</v-icon>Edit
            </v-btn>
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
        categories () {
            return this.quiz.categories.data
        }
    }
}
</script>

<style lang="scss">

</style>
