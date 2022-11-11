
import http from "../http-common";

class QnaDataService {
    // 모든 qna 정보 조회 함수
    getAll(searchSelect,searchKeyword, page, size) {
        // get 방식 통신 요청 -> @GetMapping("/api/qna")
        return http.get(`/qna?searchSelect=${searchSelect}&searchKeyword=${searchKeyword}&page=${page}&size=${size}`); 
    }

    // title 로 조회 요청 함수
        // get 방식 통신 요청 -> @GetMapping("/api/qna/{qno}"), @PathVariable
    get(qno){
        return http.get(`/qna/${qno}`);
    }

    // qna 생성(insert) 요청함수 , 객체를 통으로 받아야함 
        // post 방식 통신 요청 -> @PostMapping("/api/qna")
    create(data){
        return http.post("/qna",data);
    }

    // qna정보 update 요청함수
        // put 방식 통신 요청 -> @PutMapping("/api/qna/{qno}"), @RequestBody
    update(qno, data){
        return http.put(`/qna/${qno}`,data);
    }

    // qna정보 delete 요청함수
        // delete 방식 통신 요청 -> @DeleteMapping("/api/qna/deletion/{qno}"),  @PathVariable
    delete(qno){
        return http.delete(`/qna/deletion/${qno}`);
    }


}

//  클래스를 생성자 호출해서 내보내기
export default new QnaDataService();