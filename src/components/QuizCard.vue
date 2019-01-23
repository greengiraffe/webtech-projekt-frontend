<template>
    <div>
        <v-img :src="quiz.thumbnail || 'https://source.unsplash.com/xekxE_VR0Ec/450x300'" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
            <h2 class="mb-2 fullWidth">{{ quiz.name }}</h2>
            <p class="fullWidth">{{ quiz.description }}</p>
            <div class="fullWidth">
                <v-chip label small v-for="category in this.categories" :key="category.name">{{ category.name }}</v-chip>
            </div>
        </v-card-title>

        <v-card-actions v-if="user.loggedIn" class="card-actions">
            <v-btn
                :to="{path: 'quiz/'+quiz.id}"
                title="Start quiz"
                color="indigo accent-4 white--text"
                exact
                depressed
            >
                <v-icon class="mr-1">play_arrow</v-icon>Start
            </v-btn>
            <v-btn
                v-if="user.isAdmin"
                @click="setCurrentQuiz"
                :to="{path: 'editquiz/'+quiz.id, params: {quiz}}"
                title="Edit this quiz"
                class="indigo lighten-5"
                exact
                depressed
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
    },
    methods: {
        setCurrentQuiz () {
            this.$store.dispatch('currentQuiz/getQuiz', this.quiz.id)
            // this.$store.commit('currentQuiz/getQuiz', this.quiz.id)
        }
    }
}
</script>

<style lang="scss">
    .fullWidth {
        width: 100%;
    }
    .card-actions {
        justify-content: space-between
    }
</style>
