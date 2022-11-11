<template>
   <div>
     <div v-if="!submitted">
       <div class="mb-3">
         <label for="firstName" class="form-label">First Name</label>
         <input
           type="text"
           class="form-control"
           id="firstName"
           required
           name="firstName"
           v-model="customer.firstName"
         />
       </div>
       <div class="mb-3">
         <label for="lastName" class="form-label">Last Name</label>
         <input
           type="text"
           class="form-control"
           id="lastName"
           required
           name="lastName"
           v-model="customer.lastName"
         />
       </div>
       <div class="mb-3">
         <label for="email" class="form-label">Email</label>
         <input
           type="email"
           class="form-control"
           id="email"
           required
           name="email"
           v-model="customer.email"
         />
       </div>
       <div class="mb-3">
         <label for="phone" class="form-label">Phone</label>
         <input
           type="text"
           class="form-control"
           id="phone"
           required
           name="phone"
           v-model="customer.phone"
         />
       </div>
       <div class="mb-3">
         <button @click="saveCustomer" class="btn btn-primary">Submit</button>
       </div>
     </div>
     <div v-else>
       <div class="alert alert-success" role="alert">
         Save customer successfully!
       </div>
       <button @click="newCustomer" class="btn btn-primary">
         Add New Customer
       </button>
     </div>
   </div>
 </template>

<script>
import CustomerDataService from '@/services/CustomerDataService'

export default {
  data() {
    return {
      customer:{
        cid:null,
        email:"",
        firstName:"",
        lastName:"",
        phone:""
      },
      submitted:false
    }
  },
  
    methods: {

      saveCustomer(){
        let data = {
        email: this.customer.email,
        firstName : this.customer.firstName,
        lastName : this.customer.lastName,
        phone : this.customer.phone
      }
      // insert 요청 함수 호출
      CustomerDataService.create(data)
      // 성공하면 결과가 전송됨
      .then(response=> {
        this.customer.cid= response.data.cid;
        // 콘솔 로그 출력 ( response.data)
        console.log(response.data);
        this.submitted = true;
      })
      .catch(e=>{
        console.log(e);
      })
      },

      // 양식 초기화
      newCustomer(){
        this.submitted=false;
        this.customer={}
      }
    },
}
</script>

<style>
</style>