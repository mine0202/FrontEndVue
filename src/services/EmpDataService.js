
import http from "../http-common";

class EmpDataService {
    
    // 모든 사원정보 또는 사원명으로  조회 함수
    getAll(ename, page, size) {
        // get 방식 통신 요청 -> @GetMapping("/api/emp")
        return http.get(`/emp?ename=${ename}&page=${page}&size=${size}`);
    }
    // 사원번호로 조회 요청 함수
        // get 방식 통신 요청 -> @GetMapping("/api/emp/{eno}"), @PathVariable
    get(eno){
        return http.get(`/emp/${eno}`);
    }

    // 사원정보 생성(insert) 요청함수 , 객체를 통으로 받아야함 
        // post 방식 통신 요청 -> @PostMapping("/api/emp")
    create(data){
        return http.post("/emp",data);
    }

    // 사원정보 update 요청함수
        // put 방식 통신 요청 -> @PutMapping("/api/emp/{eno}"), @RequestBody
    update(eno, data){
        return http.put(`/emp/${eno}`,data);
    }

    // 사원정보 delete 요청함수
        // delete 방식 통신 요청 -> @DeleteMapping("/api/emp/deletion/{eno}"),  @PathVariable
    delete(eno){
        return http.delete(`/emp/deletion/${eno}`);
    }

    // 사원정보 전체 삭제요청
        // delete 방식 통신 요청 -> @DeleteMapping("/api/emp/all")
    deleteAll(){
        return http.delete("/emp/all");
    }

   

}

//  클래스를 생성자 호출해서 내보내기
export default new EmpDataService();