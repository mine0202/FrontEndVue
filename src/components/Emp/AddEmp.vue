<template>
  <!-- AddEmp.vue -->
  <div class="submit-form">
    <!-- 새 양식 폼 시작 -->
    <div v-if="!submitted">
      <!-- 사원 정보 , 바인딩은 v-model  을 사용  -->
      <div class="form-group">
        <label for="ename">Ename</label>
        <input type="text" class="form-control" id="ename" required v-model="emp.ename" name="ename" />
      </div>
      <!-- Job 정보 -->
      <div class="form-group">
        <label for="job">Job</label>
        <input class="form-control" id="job" required v-model="emp.job" name="job" />
      </div>
      <!-- manager 정보 -->
      <div class="form-group">
        <label for="manager">Manager</label>
        <input type="number" class="form-control" id="manager" required v-model="emp.manager" name="manager" />
      </div>
      <!-- hiredate 정보 -->
      <div class="form-group">
        <label for="hiredate">Hiredate</label>
        <input  class="form-control" id="hiredate" required v-model="emp.hiredate" name="hiredate" />
      </div>
      <!-- salary 정보 -->
      <div class="form-group">
        <label for="salary">Salary</label>
        <input type="number" class="form-control" id="salary" required v-model="emp.salary" name="salary" />
      </div>
      <!-- commission 정보 -->
      <div class="form-group">
        <label for="commission">Commission</label>
        <input type="number" class="form-control" id="commission" required v-model="emp.commission" name="commission" />
      </div>
      <!-- 사원 dno 정보 -->
      <div class="form-group">
        <label for="eno">Dno</label>
        <input type="number" class="form-control" id="dno" required v-model="emp.dno" name="dno" />
      </div>

      <button @click="saveEmp" class="btn btn-success mt-2">Submit</button>
    </div>
    <!-- 새 양식 폼 끝 -->

    <!-- 양식 제출  -->
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newEmp">Add</button>
    </div>
  </div>
</template>

<script>
// axios 공통함수 임포트
import EmpDataService from '@/services/EmpDataService';

export default {
  data() {
    return {
      emp: {
        eno: null,
        ename: "",
        job: "",
        manager: null,
        salary: null,
        commission: null,
        dno: null,
        hiredate:null
      },
      // submit 버튼을 클릭하면 true 가되고 성공메세지가 화면에 출력됨
      submitted: false
    };
  },
  methods: {
    newEmp() {
      // 새양식 다시 보여주기 ,  변수초기화
      this.submitted = false;
      this.emp = {}
    },
    saveEmp() {
      // 임시 객체 변수에 값을 담아서 springboot 전송
      // 사원번호는 자동생성되므로 빼고 전송함
      let data = {
        ename: this.emp.ename,
        job: this.emp.job,
        manager: this.emp.manager,
        salary: this.emp.salary,
        commission: this.emp.commission,
        dno: this.emp.dno,
        hiredate: this.emp.hiredate
      }
      // insert 요청 함수 호출
      EmpDataService.create(data)
        // 성공하면 결과가 전송됨
        .then(response => {
          this.emp.eno = response.data.eno;
          // 콘솔 로그 출력 ( response.data)
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        })

    }
  }

}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>