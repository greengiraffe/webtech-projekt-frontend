<template>
    <div id="quiz">
        <v-spacer></v-spacer>
        <div class="btnback">
            <router-link :to="{name: 'home'}"><v-btn>Back</v-btn></router-link>
            <h1>{{ quiz.name }}</h1>
        </div>
        <v-spacer></v-spacer>
        <div v-if='showfront' class=quizfront>
            <p>{{ quiz.description }}</p>
            <div v-if="quiz.progress == 0" class="startquiz">
            <!-- <router-link :to="{path: 'quiz/'+quiz.id+task}" exact> -->
                    <v-btn v-on:click="startquiz">Start Quiz</v-btn>
                <!-- </router-link> -->
            </div>
            <div v-else class="continuequiz">
                <p id="quizprogress">{{ quiz.progress }} %</p>
                <v-btn v-on:click="startquiz">Continue quiz</v-btn>
            </div>
        </div>
        <v-spacer></v-spacer>
        <Question v-if='!showfront'></Question>
    </div>
</template>

<script>
import Question from '../components/Question.vue';

export default {
    data () {
        return {
            showfront: true,
            quiz: {
                id: 1,
                name: 'Typoblindtext',
                description:
          'Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen. Manchmal Sätze, die alle Buchstaben des Alphabets enthalten - man nennt diese Sätze »Pangrams«. Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog. Oft werden in Typoblindtexte auch fremdsprachige Satzteile eingebaut (AVAIL® and Wefox™ are testing aussi la Kerning), um die Wirkung in anderen Sprachen zu testen. In Lateinisch sieht zum Beispiel fast jede Schrift gut aus. Quod erat demonstrandum. Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb. 204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind mittlerweile auch Âçcèñtë, die in neueren Schriften aber fast immer enthalten sind. Ein wichtiges aber schwierig zu integrierendes Feld sind OpenType-Funktionalitäten. Je nach Software und Voreinstellungen können eingebaute Kapitälchen, Kerning oder Ligaturen (sehr pfiffig) nicht richtig dargestellt werden.Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks',
                thumbnail: '',
                categories: [
                    {
                        id: 1,
                        name: 'Java',
                        quizzes: 5
                    }
                ],
                tasks: [
                    {
                        id: 1,
                        text: '',
                        order: 1
                    }
                ],
                progress: '20' /* NOT BACKEND CONFORM - Progress still to implement */
            }
        }
  },
    methods: {
        startquiz: function (event) {
            this.showfront = false
    }
    },
    components: {
        Question
    }
}
</script>

<style lang="scss">
.btnback {
  margin-top: 1em;
}
h1 {
  margin: 0 auto;
  margin-bottom: 1%;
  text-align: center;
}
.quizfront {
  text-align: center;

  p {
    width: 70%;
    margin: 0 auto;
  }
  #quizprogress {
    display: block;
    height: 2.5em;
    width: 2.5em;
    line-height: 2.5em;

    -moz-border-radius: 50%; /* or 50% */
    border-radius: 50%; /* or 50% */

    background-color: #171e5f;
    color: white;
    text-align: center;
    font-size: 2em;
    margin: 3% auto;
  }
}
</style>
