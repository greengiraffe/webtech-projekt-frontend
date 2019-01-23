<template>
    <div>
        <v-card-text>Fill in the blanks. You have to add one or more words.</v-card-text>
        <v-layout align-center pa-3>
        <div v-for="(text, index) in compute_blank_text" :key="index">
            <v-text-field class="answerfield px-2 pt-0 text-xs-center" v-if="text.includes('ANSWER:')" :v-model="getanswernumber(text)"></v-text-field>
            <p v-else>{{ text }}</p>
        </div>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'AnswerText',
    props: { task: Object },
    data () {
        return {
            text: 'This is an #ANSWER:1# text with some #ANSWER:2#.',
            useranswers: []
        }
    },
    computed: {
        compute_blank_text: function () {
            var textarray = this.text.split('#')
            return textarray
        }
    },
    methods: {
        getanswernumber: function (text) {
            return text.split(':')[1]
        }
    }
}
</script>

<style lang="scss">
.answerfield{
    width: 120px;
    .v-text-field{

    }
}

</style>
