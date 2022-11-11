<template>
    <!-- EmpDetail.vue -->
    <div>
        <div v-if="currentEmp" class="edit-form">
            <h4>Emp</h4>
            <!-- 수정 양식 시작 -->
            <form>
                <div class="form-group">
                    <label for="ename">Ename</label>
                    <input type="text" class="form-control" id="ename" v-model="currentEmp.ename" />
                </div>
                <div class="mt-3 form-group">
                    <label for="job">job</label>
                    <input type="text" class="form-control" id="job" v-model="currentEmp.job" />
                </div>
                <div class="mt-3 form-group">
                    <label for="manager">manager</label>
                    <input type="number" class="form-control" id="manager" v-model="currentEmp.manager" />
                </div>
                <div class="mt-3 form-group">
                    <label for="hiredate">hiredate</label>
                    <input type="text" class="form-control" id="hiredate" v-model="currentEmp.hiredate" />
                </div>
                <div class="mt-3 form-group">
                    <label for="salary">salary</label>
                    <input type="number" class="form-control" id="salary" v-model="currentEmp.salary" />
                </div>
                <div class="mt-3 form-group">
                    <label for="commission">commission</label>
                    <input type="number" class="form-control" id="commission" v-model="currentEmp.commission" />
                </div>
                <div class="mt-3 form-group">
                    <label for="dno">dno</label>
                    <input type="number" class="form-control" id="dno" v-model="currentEmp.dno" />
                </div>
            </form>

            <button class="ms-1 mt-3 btn btn-danger" @click="deleteEmp">Delete
            </button>

            <button type="submit" class="ms-2 mt-3 btn btn-success" @click="updateEmp">
                Update
            </button>
            
            <router-link :to="'/emp'"><span class="ms-2 mt-3 btn btn-outline-secondary">EmpList page</span></router-link>
                
            
            <p>{{ message }}</p>
        </div>
        <!-- 수정 양식 끝 -->

        <div v-else>
            <br />
            <p>Please click on a Emp…</p>
        </div>
    </div>
</template>

<script>
import EmpDataService from '@/services/EmpDataService';

export default {
    data() {
        return {
            currentEmp:null,
            message:""
        }
    },
    methods: {

        deleteEmp() {
            EmpDataService.delete(this.currentEmp.eno)
                .then(response => {
                    console.log(response);
                    this.$router.push("/emp");
                })
                .catch(e => {
                    console.log(e);
                })
        },

        updateEmp() {

            EmpDataService.update(this.currentEmp.eno, this.currentEmp)
                .then(response => {
                    console.log(response.data)
                    this.message="The Emp was updated successfully."
                })
                .catch(e => {
                    console.log(e);
                })
        },
        // 부서번호로 조회요청하는 함수
        getEmp(eno){
            EmpDataService.get(eno)
            .then(response=>{
                // 스프링부트에서 결과를 리턴함 ( 부서 객체 )
                this.currentEmp = response.data;  // data 는 객체로 넘어옴
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
        }

    },
    mounted(){
        // 디버깅
        // alert(this.$route.params.eno);
        // console.log(this.$route.params.eno);
        this.message="";
        //   this.$route.params.dno   : EmpList.vue 에서 eno 보낸것을  다음과 같이 받음
        //    이전페이지에서 전송한 매개변수는 $route.params 안에 있음
        this.getEmp(this.$route.params.eno);
    }
}
</script>

<style>
.edit-form{
    max-width: 300px;
    margin: auto;
}
</style>