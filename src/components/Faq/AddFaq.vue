<template>
  <!-- AddFaq.vue -->
  <div class="submit-form">
    <!-- 새 양식 폼 시작 -->
    <div v-if="!submitted">
      <!-- Faq 정보 , 바인딩은 v-model  을 사용  -->
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="faq.title"
          name="title"
        />
      </div>
      <!-- content 정보 -->
      <div class="form-group">
        <label for="content">Content</label>
        <input
          class="form-control"
          id="content"
          required
          v-model="faq.content"
          name="content"
        />
      </div>

      <button @click="saveFaq" class="btn btn-success mt-2">Submit</button>
    </div>
    <!-- 새 양식 폼 끝 -->

    <!-- 양식 제출  -->
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newFaq">Add</button>
    </div>
  </div>
</template>

<script>
// axios 공통함수 임포트
import FaqDataService from '@/services/FaqDataService';

export default {
  data(){
    return{
      faq:{
        no:null,
        title:"",
        content:''
      },
      // submit 버튼을 클릭하면 true 가되고 성공메세지가 화면에 출력됨
      submitted:false
    };
  },
  methods:{
    newFaq(){
      // 새양식 다시 보여주기 ,  변수초기화
      this.submitted= false;
      this.faq ={}
    },
    saveFaq(){
      // 임시 객체 변수에 값을 담아서 springboot 전송
      // 부서번호는 자동생성되므로 빼고 전송함
      let data = {
        title: this.faq.title,
        content : this.faq.content
      }
      // insert 요청 함수 호출
      FaqDataService.create(data)
      // 성공하면 결과가 전송됨
      .then(response=> {
        this.faq.no = response.data.no;
        // 콘솔 로그 출력 ( response.data)
        console.log(response.data);
        this.submitted = true;
      })
      .catch(e=>{
        console.log(e);
      })
      
    }
  }
 
}
</script>

<style>
.submit-form{
  max-width: 300px;
  margin: auto;
}
</style>