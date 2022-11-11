<template>
    <!-- FaqDetail.vue -->
    <div>
        <div v-if="currentFaq" class="edit-form">
            <h4>FAQ</h4>
            <!-- 수정 양식 시작 -->
            <form>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" v-model="currentFaq.title" />
                </div>
                <div class="mt-3 form-group">
                    <label for="content">Content</label>
                    <input type="text" class="form-control" id="content" v-model="currentFaq.content" />
                </div>
            </form>


            <button class="mt-3 btn btn-danger" @click="deleteFaq">Delete
            </button>

            <button type="submit" class="ms-2 mt-3 btn btn-success" @click="updateFaq">
                Update
            </button>

            <router-link :to="'/faq'"><span class="ms-2 mt-3 btn btn-outline-secondary">FAQ List page</span></router-link>
            <p>{{ message }}</p>
        </div>
        <!-- 수정 양식 끝 -->

        <div v-else>
            <br />
            <p>Please click on a Faq…</p>
        </div>
    </div>
</template>

<script>
import FaqDataService from '@/services/FaqDataService';

export default {
    data() {
        return {
            currentFaq:null,
            message:""
        }
    },
    methods: {

        // 삭제 요청하는 함수
        deleteFaq() {
            FaqDataService.delete(this.currentFaq.no)
                .then(response => {
                    console.log(response.data);
                    // 첫페이지 강제이동
                    this.$router.push("/faq");
                })
                .catch(e => {
                    console.log(e);
                })
        },

        // 수정 요청하는 함수
        updateFaq() {
            FaqDataService.update(this.currentFaq.no, this.currentFaq)
                .then(response => {
                    console.log(response.data);
                    this.message ="The Faq was updated successfully"
                })
                .catch(e => {
                    console.log(e);
                })
        },

        // Faq 번호로 조회요청하는 함수
        getFaq(no){
            FaqDataService.get(no)
            .then(response=>{
                // 스프링부트에서 결과를 리턴함 ( Faq 객체 )
                this.currentFaq = response.data;  // data 는 객체로 넘어옴
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
        }

    },
    mounted(){
        // 디버깅
        // alert(this.$route.params.no);
        // console.log(this.$route.params.no);
        this.message="";
        //   this.$route.params.no   : FaqList.vue 에서 no 보낸것을  다음과 같이 받음
        // router/index.js  상세페이지 url 의 매개변수명이 :no  로 되어있어서 다음과 같이 연결
        //    이전페이지에서 전송한 매개변수는 $route.params 안에 있음
        this.getFaq(this.$route.params.no);
    }
}
</script>

<style>
.edit-form{
    max-width: 300px;
    margin: auto;
}
</style>