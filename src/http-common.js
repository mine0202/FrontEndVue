//  http-common.js  만듬
//  목적 : axios 와 스프링부트 통신을 위한 기본 설정
import axios from "axios";

// 스프링부트 백엔드 서버를 보통 api로 함
export default axios.create({
    // 스프링부트 주소
    baseURL: "http://localhost:8000/api",
    // 헤더 콘턴트 타입
    headers: {
        "Content-Type":"application/json"
    }
});