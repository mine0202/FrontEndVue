<template>
   <div v-if="currentCustomer">
     <div class="mb-3">
       <label for="firstName" class="form-label">First Name</label>
       <input type="text" class="form-control" id="firstName" required name="firstName"
              v-model="currentCustomer.firstName">
     </div>
     <div class="mb-3">
       <label for="lastName" class="form-label">Last Name</label>
       <input type="text" class="form-control" id="lastName" required name="lastName" v-model="currentCustomer.lastName">
     </div>
     <div class="mb-3">
       <label for="email" class="form-label">Email</label>
       <input type="email" class="form-control" id="email" required name="email" v-model="currentCustomer.email">
     </div>
     <div class="mb-3">
       <label for="phone" class="form-label">Phone</label>
       <input type="text" class="form-control" id="phone" required name="phone" v-model="currentCustomer.phone">
     </div>
     <div class="mb-3">
       <button @click="updateCustomer" class="btn btn-primary me-3">Update</button>
       <button @click="deleteCustomer" class="btn btn-danger">Delete</button>
     </div>
     <div class="alert alert-success" role="alert" v-if="message">
       {{ message }}
     </div>
   </div>
 </template>

<script>
import CustomerDataService from '@/services/CustomerDataService';
export default {
  data() {
    return {
      currentCustomer:null,
      message:""
    }
  },
  methods: {

    
    // 부서번호로 조회요청하는 함수
    getCustomer(cid){
        CustomerDataService.get(cid)
        .then(response=>{
            // 스프링부트에서 결과를 리턴함 ( 부서 객체 )
            this.currentCustomer = response.data;  // data 는 객체로 넘어옴
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        });
    },


    updateCustomer(){
      CustomerDataService.update(this.currentCustomer.cid, this.currentCustomer)
                .then(response => {
                    console.log(response.data);
                    this.message ="The Customer was updated successfully"
                })
                .catch(e => {
                    console.log(e);
                })
    },
    deleteCustomer(){
      CustomerDataService.delete(this.currentCustomer.cid)
                .then(response => {
                    console.log(response.data);
                    // 첫페이지 강제이동
                    this.$router.push("/customer");
                })
                .catch(e => {
                    console.log(e);
                })
    }
  },
  mounted() {
    this.message='';
    this.getCustomer(this.$route.params.cid)
  },
}
</script>

<style>

</style>