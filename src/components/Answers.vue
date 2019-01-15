<template>
    <div v-if='answers[0].correct_string === null'>
        <ul>
            <li v-for="answer in answers" :key="answer.id">
                <v-container fluid>
                    <v-checkbox :label="answer.text" v-model="checkbox"></v-checkbox>
                </v-container>
            </li>
        </ul>
    </div>
    <div v-else>
        This is text
    </div>
</template>

<script>
export default {
    name: "Answers",
    props:['task_id'],
    data(){
        return{
            answers: [
                {id: '1', task_id: '1', text:"banana", correct_choice: 'false', correct_string: null},
                {id: '2', task_id: '1', text:"elephant", correct_choice: 'true', correct_string: null},
                {id: '3', task_id: '1', text:"kangaroo", correct_choice: 'true', correct_string: null},
                {id: '4', task_id: '1', text:"tree", correct_choice: 'false', correct_string: null},
            ],
            answers2: [
                {id: '5', task_id: '2', text:"giraffe", correct_choice: 'false', correct_string: null},
                {id: '6', task_id: '2', text:"elephant", correct_choice: 'false', correct_string: null},
                {id: '7', task_id: '2', text:"tiger", correct_choice: 'true', correct_string: null},
                {id: '8', task_id: '2', text:"monkey", correct_choice: 'false', correct_string: null},
            ]
        }
    },
    computed:{
        texttask: function(){
            return (answers[0].correct_string) != null;
        }
    }
}
</script>
