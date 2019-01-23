<template>
    <div class="about">
        <v-container>
            <v-layout>
                <h1 class="display-3 mt-5 mb-5">About <span class="font-weight-light text-uppercase">Learn</span><span class="font-weight-black text-uppercase">it</span></h1>
            </v-layout>
            <v-layout>
                <v-timeline align-top>
                <v-timeline-item v-for="(item, i) in abouttexts" :color="item.color" :icon="item.icon" :key="i" fill-dot >
                    <v-card :color="item.color" dark >
                    <v-card-title class="title">{{item.title}}</v-card-title>
                    <v-card-text class="white text--primary">
                        <p>{{item.text}}</p>
                    </v-card-text>
                    </v-card>
                </v-timeline-item>
                </v-timeline>
            </v-layout>
      </v-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            abouttexts: [
                {
                    color: 'rgba(23, 30, 95, 0.3)',
                    icon: 'keyboard',
                    title: 'What is LearnIT?',
                    text:
            'LearnIT offers quizzes that help you to learn various things about computing. But learning does not have to be boring, not even learning programming! LearnIT is concepted like a quiz game, so that you wont even notice how many serious topics you covered on the fly! Try out our several quizzes and experience a whole new kind of learning. LearnIT is suitable for everyone - you cannot really fail and will succeed eventually. Just start with the topic that is most interesting for you and learn at your own pace.'
                },
                {
                    color: 'rgba(23, 30, 95, 0.44)',
                    icon: 'face',
                    title: 'Create a user account',
                    text:
            'You will be able to create a user account with which you can always login. It will store the progress you make during your sessions, so that you can easily jump back in where you left off.'
                },
                {
                    color: 'rgba(23, 30, 95, 0.55)',
                    icon: 'check_box',
                    title: 'Find the right quiz',
                    text:
            'If you want to find a quiz suited for you, go ahead and use the search bar on the start page. Other than that you can filter quizzes by categories and order them by your personal progress.'
                },
                {
                    color: 'rgba(23, 30, 95, 0.75)',
                    icon: 'search',
                    title: 'Enjoy different task types',
                    text:
            'Once you can choose a quiz you can start doing the tasks. There are single and multiple choice tasks, as well as fill-in-the-blanks. Every task that you answered correctly will be added to your progress, which is stored for each quiz.'
                },
                {
                    color: 'rgba(23, 30, 95, 0.89)',
                    icon: 'settings',
                    title: 'Admin functionality',
                    text:
            'Only admin users are able to add, edit and delete quizzes. Once editing a quiz, they are also able to add, edit and delete the referring tasks. If you want to participate in LearnIT and become an admin yourself, shoot us a message at wannabeanadmin@learnit.com.'
                },
                {
                    color: '#171e5f',
                    icon: 'developer_board',
                    title: 'Behind the scenes',
                    text:
            'LearnIT is a web application based on the JavaScript framework VueJS (frontend) and the PHP framework Laravel (backend). Vuetify is used for frontend styling and along with it the icons provided by Material design whereas the data is stored in a MySQL database.'
                }
            ]
        }
    }
}
</script>

<style lang="scss">

</style>
