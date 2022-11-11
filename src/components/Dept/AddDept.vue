<template>
  <!-- AddDept.vue -->
  <div class="submit-form">
    <!-- 새 양식 폼 시작 -->
    <div v-if="!submitted">
      <!-- 부서 정보 , 바인딩은 v-model  을 사용  -->
      <div class="form-group">
        <label for="dname">Dname</label>
        <input
          type="text"
          class="form-control"
          id="dname"
          required
          v-model="dept.dname"
          name="dname"
        />
      </div>
      <!-- 위치 정보 -->
      <div class="form-group">
        <label for="loc">Loc</label>
        <input
          class="form-control"
          id="loc"
          required
          v-model="dept.loc"
          name="loc"
        />
      </div>

      <button @click="saveDept" class="btn btn-success mt-2">Submit</button>
    </div>
    <!-- 새 양식 폼 끝 -->

    <!-- 양식 제출  -->
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newDept">Add</button>
    </div>
  </div>
</template>

<script>
// axios 공통함수 임포트
import DeptDataService from '@/services/DeptDataService';

export default {
  data(){
    return{
      dept:{
        dno:null,
        dname:"",
        loc:''
      },
      // submit 버튼을 클릭하면 true 가되고 성공메세지가 화면에 출력됨
      submitted:false
    };
  },
  methods:{
    newDept(){
      // 새양식 다시 보여주기 ,  변수초기화
      this.submitted= false;
      this.dept ={}
    },
    saveDept(){
      // 임시 객체 변수에 값을 담아서 springboot 전송
      // 부서번호는 자동생성되므로 빼고 전송함
      let data = {
        dname: this.dept.dname,
        loc : this.dept.loc
      }
      // insert 요청 함수 호출
      DeptDataService.create(data)
      // 성공하면 결과가 전송됨
      .then(response=> {
        this.dept.dno = response.data.dno;
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