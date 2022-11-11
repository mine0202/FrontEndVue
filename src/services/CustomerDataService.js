
import http from "../http-common";

class customerDataService {
    // 모든 customer 정보 조회 함수
    getAll(email, page, size) {
        // get 방식 통신 요청 -> @GetMapping("/api/customer")
        return http.get(`/customer?email=${email}&page=${page}&size=${size}`);
    }
    // title 로 조회 요청 함수
        // get 방식 통신 요청 -> @GetMapping("/api/customer/{cid}"), @PathVariable
    get(cid){
        return http.get(`/customer/${cid}`);
    }

    // customer 생성(insert) 요청함수 , 객체를 통으로 받아야함 
        // post 방식 통신 요청 -> @PostMapping("/api/customer")
    create(data){
        return http.post("/customer",data);
    }

    // customer정보 update 요청함수
        // put 방식 통신 요청 -> @PutMapping("/api/customer/{cid}"), @RequestBody
    update(cid, data){
        return http.put(`/customer/${cid}`,data);
    }

    // customer정보 delete 요청함수
        // delete 방식 통신 요청 -> @DeleteMapping("/api/customer/deletion/{cid}"),  @PathVariable
    delete(cid){
        return http.delete(`/customer/deletion/${cid}`);
    }


}

//  클래스를 생성자 호출해서 내보내기
export default new customerDataService();