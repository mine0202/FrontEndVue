<template>
    <!-- DeptDetail.vue -->
    <div>
        <div v-if="currentDept" class="edit-form">
            <h4>Dept</h4>
            <!-- 수정 양식 시작 -->
            <form>
                <div class="form-group">
                    <label for="dname">Dname</label>
                    <input type="text" class="form-control" id="dname" v-model="currentDept.dname" />
                </div>
                <div class="mt-3 form-group">
                    <label for="loc">Loc</label>
                    <input type="text" class="form-control" id="loc" v-model="currentDept.loc" />
                </div>
            </form>


            <button class="mt-3 btn btn-danger" @click="deleteDept">Delete
            </button>

            <button type="submit" class="ms-3 mt-3 btn btn-success" @click="updateDept">
                Update
            </button>

            <router-link :to="'/dept'"><span class="ms-2 mt-3 btn btn-outline-secondary">DeptList page</span></router-link>
            <p>{{ message }}</p>
        </div>
        <!-- 수정 양식 끝 -->

        <div v-else>
            <br />
            <p>Please click on a Dept…</p>
        </div>
    </div>
</template>

<script>
import DeptDataService from '@/services/DeptDataService';

export default {
    data() {
        return {
            currentDept:null,
            message:""
        }
    },
    methods: {

        // 삭제 요청하는 함수
        deleteDept() {
            DeptDataService.delete(this.currentDept.dno)
                .then(response => {
                    console.log(response.data);
                    // 첫페이지 강제이동
                    this.$router.push("/dept");
                })
                .catch(e => {
                    console.log(e);
                })
        },

        // 수정 요청하는 함수
        updateDept() {
            DeptDataService.update(this.currentDept.dno, this.currentDept)
                .then(response => {
                    console.log(response.data);
                    this.message ="The Dept was updated successfully"
                })
                .catch(e => {
                    console.log(e);
                })
        },

        // 부서번호로 조회요청하는 함수
        getDept(dno){
            DeptDataService.get(dno)
            .then(response=>{
                // 스프링부트에서 결과를 리턴함 ( 부서 객체 )
                this.currentDept = response.data;  // data 는 객체로 넘어옴
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
        }

    },
    mounted(){
        // 디버깅
        // alert(this.$route.params.dno);
        // console.log(this.$route.params.dno);
        this.message="";
        //   this.$route.params.dno   : DeptList.vue 에서 dno 보낸것을  다음과 같이 받음
        // router/index.js  상세페이지 url 의 매개변수명이 :dno  로 되어있어서 다음과 같이 연결
        //    이전페이지에서 전송한 매개변수는 $route.params 안에 있음
        this.getDept(this.$route.params.dno);
    }
}
</script>

<style>
.edit-form{
    max-width: 300px;
    margin: auto;
}
</style>