<template>
   <div>
     <div v-if="!submitted">
       <div class="mb-3">
         <label for="question" class="form-label">Question</label>
         <input
           type="text"
           class="form-control"
           id="question"
           required
           name="question"
           v-model="qna.question"
         />
       </div>
       <div class="mb-3">
         <label for="answer" class="form-label">Answer</label>
         <input
           type="text"
           class="form-control"
           id="answer"
           required
           name="answer"
           v-model="qna.answer"
         />
       </div>
       <div class="mb-3">
         <label for="questioner" class="form-label">Questioner</label>
         <input
           type="text"
           class="form-control"
           id="questioner"
           required
           name="questioner"
           v-model="qna.questioner"
         />
       </div>
       <div class="mb-3">
         <label for="answerer" class="form-label">Answerer</label>
         <input
           type="text"
           class="form-control"
           id="answerer"
           required
           name="answerer"
           v-model="qna.answerer"
         />
       </div>
       <div class="mb-3">
         <button @click="saveQna" class="btn btn-primary">Submit</button>
       </div>
     </div>
     <div v-else>
       <div class="alert alert-success" role="alert">
         Save qna successfully!
       </div>
       <button @click="newQna" class="btn btn-primary">
         Add New Qna
       </button>
     </div>
   </div>
 </template>

<script>
import QnaDataService from '@/services/QnaDataService'

export default {
  data() {
    return {
      qna:{
        qno:null,
        question:"",
        answer:"",
        questioner:"",
        answerer:""
      },
      submitted:false
    }
  },
  
    methods: {

      saveQna(){
        let data = {
          question: this.qna.question,
          answer : this.qna.answer,
          questioner : this.qna.questioner,
          answerer : this.qna.answerer
      }
      // insert 요청 함수 호출
      QnaDataService.create(data)
      // 성공하면 결과가 전송됨
      .then(response=> {
        this.qna.qno= response.data.qno;
        // 콘솔 로그 출력 ( response.data)
        console.log(response.data);
        this.submitted = true;
      })
      .catch(e=>{
        console.log(e);
      })
      },

      // 양식 초기화
      newQna(){
        this.submitted=false;
        this.qna={}
      }
    },
}
</script>

<style>
</style>