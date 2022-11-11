<!--   < 누르면 기본폼 만들기 -->

<template>
    <!-- EmpList.vue -->
    <div class="list row">
    <!--  검색어 시작 -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- 검색어 입력  -->
        <!-- searchEname을 기존에는 함수였으나 변수로 변경 검색을 retrieveEmp() 로 변경-->
        <input type="text" class="form-control" placeholder="Search by Ename" v-model="searchEname" @keyup.enter="retrieveEmp" />
        <!-- 검색어 버튼  -->
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click=" page = 1; retrieveEmp() ">
            Search
          </button>
        </div>
      </div>
    </div>
    <!-- 검색어 끝 -->
    
    <!-- 페이징 + 전체 목록 시작  -->
    <!-- 페이징 양식 시작  -->
    <div class="col-md-12">
      <!-- 셀렉트 박스 : 기본 페이지 변경  -->
      <!-- change :  handlePageSizeChange($event), 1페이지당 개수 변경 시 실행되는 이벤트 -->
      <!--           $event : html 태그의 기본 이벤트, 이 객체로 현재 선택 또는 클릭한 html태그(양식)를 알 수 있음.  -->
      <!-- event.target (현재 사용자가 선택한 양식(여기서는 셀렉트 박스내 목록을 의미 )  -->
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <!-- b-pagination : bootstrapVue 의 페이지 번호 컨트롤  -->
      <!-- total-rows : 전체 데이터 개수  -->
      <!-- per-page : 1페이지 당 개수  -->
      <!-- prev-text="화면에 보일 글자" -->
      <!-- next-text="화면에 보일 글자" -->
      <!-- change : handlePageChange(), 페이지 번호 변경 시 실행되는 이벤트  -->
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div>
    <!-- 페이징 양식 끝 -->


    <!-- 전체 목록 조회 시작 -->
    <div class="col-md-6">
      <h4 class="emp">Emp List</h4>
      <ul class="list-group">
          <li class="list-group-item list-group-item-action" 
          :class="{ active: index == currentIndex }" 
          v-for="(data, index) in emp"
          :key="index" @click="setActiveEmp(data, index)">
          {{ data.ename }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllEmp">
        Remove All
      </button>
    </div>
    <!-- 전체 목록 조회 끝 -->

    <!-- 클릭하면 오른쪽 간략한 상세 목록 시작-->
    <div class="col-md-6">
      <div v-if="currentEmp">
        <h4>Emp</h4>
        <div>
          <label><strong>Eno:</strong></label> {{ currentEmp.eno }}
        </div>
        <div>
          <label><strong>Ename:</strong></label> {{ currentEmp.ename }}
        </div>
        <div>
          <label><strong>Job:</strong></label> {{ currentEmp.job }}
        </div>
        <div>
          <label><strong>Manager:</strong></label> {{ currentEmp.manager }}
        </div>
        <div>
          <label><strong>Salary:</strong></label> {{ currentEmp.salary }}
        </div>
        <div>
          <label><strong>Commission:</strong></label> {{ currentEmp.commission }}
        </div>
        <div>
          <label><strong>Dno:</strong></label> {{ currentEmp.dno }}
        </div>

        <router-link :to="'/emp/' + currentEmp.eno"><span class="badge bg-success">Edit</span></router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Emp...</p>
      </div>
    </div>
    <!-- 클릭 오른쪽 간략한 상세 목록 끝 -->

  </div>
</template>

<script>
// axios 공통함수 불러오기
import EmpDataService from '@/services/EmpDataService';


export default {
  // 변수 정의하는 곳 : data(), 초기화
  data(){
    return{
      emp:[],  // 스프링부트에서 오는 데이터 넣는 빈 배열
      currentEmp: null,  // 클릭했을때 들어갈 데이터 
      currentIndex : -1,  
      searchEname:"",  //   속성 초기화

      page:1,
      count:0,
      pageSize:3,
      pageSizes:[3,6,9]
    }
  },
  // 함수 정의하는 곳 : metods:
  methods:{

    
    // axios 부서명으로 like 검색 함수
    // searchEname(){
    //   // 디버그
    //   // alert(this.ename)
    //   // dname 이 data 에 바인딩되어있으므로 this.dname 으로 불러옴
    //   EmpDataService.findByEname(this.ename)
      
    //   .then(response=>{
    //     this.emp = response.data; // like 검색결과를 변수에 저장
    //     console.log(response.data)
    //   })
    //   .catch(e=>{
    //     console.log(e)
    //   })
    // },

    handlePageSizeChange(event){
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveEmp();
    },

    handlePageChange(value){
      this.page = value;
      this.retrieveEmp();
    },


    // axios , 모든 부서정보 조회 요청 함수
    retrieveEmp(){
      EmpDataService.getAll(this.searchEname, this.page-1, this.pageSize)
    //  axios 성공하면  .then  결과전송됨
      .then(response=>{
        const{emp , totalItems} = response.data;
        this.emp = emp;
        this.count = totalItems;
        console.log(response.data);
      })
      // 실패하면 .catch() 에 에러가 전송됨
      .catch( e => {
        console.log(e);
      })
    },
    // 목록을 클릭했을때 현재 부서객체, 인덱스번호를 저장하는 함수
    setActiveEmp(data, index){
      this.currentEmp = data;
      this.currentIndex = index;
    },
    // axios 모든 부서 정보 삭제 요청함수 
    removeAllEmp(){
      EmpDataService.deleteAll()
    //  axios 성공하면  .then  결과전송됨
      .then(response=>{
        // 디버깅 콘솔에 정보 출력
        console.log(response.data);
        
        // currentDept , currentIndex 초기화
        this.currentEmp = null; 
        this.currentIndex = -1;
        // 전체 목록 재조회
        this.retrieveEmp();
        
      })
      // 실패하면 .catch() 에 에러가 전송됨
      .catch( e => {
        console.log(e);
      })
    }
  },
  // 화면이 뜨자마자 실행되는 이벤트, 라이프사이클 함수 - mounted(), created()
  mounted(){
    this.retrieveEmp(); // 화면이 뜨자마자 전체목록이 실행되면서 화면에 나옴
  }
}
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.emp {
  color: skyblue;
  font-weight: bold;
}
</style>