
import http from "../http-common";

class FaqDataService {
    // 모든 FAQ 정보 조회 함수
    getAll(title, page, size) {
        // get 방식 통신 요청 -> @GetMapping("/api/faq")
        return http.get(`/faq?title=${title}&page=${page}&size=${size}`);
    }
    // title 로 조회 요청 함수
        // get 방식 통신 요청 -> @GetMapping("/api/faq/{no}"), @PathVariable
    get(no){
        return http.get(`/faq/${no}`);
    }

    // FAQ 생성(insert) 요청함수 , 객체를 통으로 받아야함 
        // post 방식 통신 요청 -> @PostMapping("/api/faq")
    create(data){
        return http.post("/faq",data);
    }

    // FAQ정보 update 요청함수
        // put 방식 통신 요청 -> @PutMapping("/api/faq/{no}"), @RequestBody
    update(no, data){
        return http.put(`/faq/${no}`,data);
    }

    // FAQ정보 delete 요청함수
        // delete 방식 통신 요청 -> @DeleteMapping("/api/faq/deletion/{no}"),  @PathVariable
    delete(no){
        return http.delete(`/faq/deletion/${no}`);
    }

    // FAQ정보 전체 삭제요청
        // delete 방식 통신 요청 -> @DeleteMapping("/api/faq/all")
    deleteAll(){
        return http.delete("/faq/all");
    }

    // title  검색 요청 함수
    //  쿼리 스트링 방식 url :  ?변수명=값&변수명2=값2...
    // get 방식 통신 요청 -> @GetMapping("/api/faq") , 쿼리스트링이라서 @RequestParam  사용함 
    // findByTitle( title){
    //     return http.get(`/faq?title=${title}`); 
    // }

}

//  클래스를 생성자 호출해서 내보내기
export default new FaqDataService();