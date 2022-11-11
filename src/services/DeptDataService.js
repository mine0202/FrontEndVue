
import http from "../http-common";

class DeptDataService {
    // 모든 부서정보 조회 함수 수정
    // getAll() {
        // get 방식 통신 요청 -> @GetMapping("/api/dept")
    //     return http.get("/dept");
    // }
    
    // dname :  부서명 , page : 현재페이지, size : 페이지당 화면에 보여질 개수
    getAll(dname, page, size) {
        // get 방식 통신 요청 -> @GetMapping("/api/dept")
        // 전체조회와 부서명 조회를 같이 하는 함수
        return http.get(`/dept?dname=${dname}&page=${page}&size=${size}`);
    }


    // 부서번호로 조회 요청 함수
        // get 방식 통신 요청 -> @GetMapping("/api/dept/{dno}"), @PathVariable
    get(dno){
        return http.get(`/dept/${dno}`);
    }

    // 부서정보 생성(insert) 요청함수 , 객체를 통으로 받아야함 
        // post 방식 통신 요청 -> @PostMapping("/api/dept")
    create(data){
        return http.post("/dept",data);
    }

    // 부서정보 update 요청함수
        // put 방식 통신 요청 -> @PutMapping("/api/dept/{dno}"), @RequestBody
    update(dno, data){
        return http.put(`/dept/${dno}`,data);
    }

    // 부서정보 delete 요청함수
        // delete 방식 통신 요청 -> @DeleteMapping("/api/dept/deletion/{dno}"),  @PathVariable
    delete(dno){
        return http.delete(`/dept/deletion/${dno}`);
    }

    // 부서정보 전체 삭제요청
        // delete 방식 통신 요청 -> @DeleteMapping("/api/dept/all")
    deleteAll(){
        return http.delete("/dept/all");
    }

    // 부서명  검색 요청 함수
    //  쿼리 스트링 방식 url :  ?변수명=값&변수명2=값2...
    // get 방식 통신 요청 -> @GetMapping("/api/dept") , 쿼리스트링이라서 @RequestParam  사용함 
    // findByDname( dname){
    //     return http.get(`/dept?dname=${dname}`); 
    // }

}

//  클래스를 생성자 호출해서 내보내기
export default new DeptDataService();