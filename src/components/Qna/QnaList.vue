<template>
    <div>

        <!-- search 관련 div 시작 -->
        <div class="col-md-8">
            <div class="input-group mb-3">
                <div class="col-2">
                    <select class="form-select" v-model="searchSelect">
                        <option>question</option>
                        <option>questioner</option>
                    </select>
                </div>

                <div class="col-9">
                    <input type="text" class="form-control" placeholder="Search by Question" v-model="searchKeyword" @keyup.enter="retrieveQna">
                </div>

                <div class="input-group-append col-1">
                    <button class="btn btn-outline-secondary" type="button" @click=" page = 1; retrieveQna();">
                        Search
                    </button>
                </div>
            </div>
        </div>
        <!-- search 관련 div 끝 -->


        <!--    Todo : page 바 시작 -->
        <div class="col-md-12">
            <div class="mb-3">
                Items per Page:
                <select v-model="pageSize" @change="handlePageSizeChange($event)">
                    <option v-for="size in pageSizes" :key="size" :value="size">
                        <!--            size : 3, 6, 9 -->
                        {{ size }}
                    </option>
                </select>
            </div>

            <b-pagination v-model="page" :total-rows="count" :per-page="pageSize" prev-text="Prev" next-text="Next"
                @change="handlePageChange"></b-pagination>
        </div>
        <!--   Todo : page 바 끝 -->

        <!-- 테이블 목록 시작 -->
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                    <th scope="col">Questioner</th>
                    <th scope="col">Answerer</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody v-for="(data, index) in qna" :key="index">
                <tr>
                    <td>{{ data.question }}</td>
                    <td>{{ data.answer }}</td>
                    <td>{{ data.questioner }}</td>
                    <td>{{ data.answerer }}</td>
                    <td>
                        <router-link :to="'/qna/' + data.qno"><span class="badge bg-success">Edit</span>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import QnaDataService from '@/services/QnaDataService';

export default {
    data() {
        return {
            qna: [],
            searchSelect: "question",
            searchKeyword: "",


            // 페이징을 위한 변수정의
            page: 1,  // 현재 페이지
            count: 0,  // 전체 데이터 건수
            pageSize: 3, //  한페이지당 몇개를 보여줄지 결정하는 변수
            pageSizes: [3, 6, 9] // select box  에 넣을 기본 데이터
        }
    },

    methods: {

        handlePageSizeChange(event) {
            // event.target.value   클릭한 곳에서 값을 가져옴
            this.pageSize = event.target.value;
            this.page = 1;
            // 재조회 함수 호출
            this.retrieveQna();
        },

        // 페이지 숫자를 눌렀을 때 실행, 위 코딩 @change="handlePageChange" 에는 매개 변수가 표현되어있지 않지만 값이 넘어옴
        handlePageChange(value) {
            this.page = value;
            this.retrieveQna();  // 재조회
        },

        // 함수명 : retrieveQna()
        // 매개변수 : this.searchQuestion ( question 검색어 )
        //           this.page ( 현재 페이지 번호 )
        //           this.pageSize (  페이지 당 개수)
        // 리턴값 : 없음
        retrieveQna() {
            // getAll() 변경 getAll(dname, page, size) , page는 0번부터 시작하므로 -1 해줌
            QnaDataService.getAll(this.searchSelect,this.searchKeyword, this.page - 1, this.pageSize)

                //  axios 성공하면  .then  결과전송됨
                .then(response => {

                    // this.qna = response.data;  data 에 4가지(qna, totalItems, ...) 정보가 들어오므로 변경해줌
                    //  let 이나 const  {속성명, 속성명2} = 데이터 객체 배열 ( 모던 자바 문법 구조분해할당)
                    const { qna, totalItems } = response.data; // springboot 의 전송된 맵 정보
                    this.qna = qna;        // 스프링부트에서 전송한 데이터
                    this.count = totalItems; // 스프링부트에서 전송한 페이지 정보 (총 건수 )

                    // 디버깅 콘솔에 정보 출력
                    console.log(response.data);
                })
                // 실패하면 .catch() 에 에러가 전송됨
                .catch(e => {
                    console.log(e);

                })
        },

    },

    mounted() {
        this.retrieveQna();
    },
}
</script>

<style>

</style>