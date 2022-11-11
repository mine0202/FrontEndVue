<template>
    <div>
        <!--  검색어 시작 -->
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title" v-model="searchTitle"
                    @keyup.enter="retrieveGalleryDb" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="page = 1; retrieveGalleryDb()">
                        Search
                    </button>
                </div>
            </div>
        </div>
        <!-- 검색어 끝 -->

        <!-- upload 시작 -->
        <div class="row justify-content-md-center">
            <div class="col-12">
                <!-- 페이징 양식 시작  -->
                <div class="col-md-12">
                    <!-- 셀렉트 박스 : 기본 페이지 변경  -->
                    <!-- change :  handlePageSizeChange($event), 1페이지당 개수 변경 시 실행되는 이벤트 -->
                    <!--           $event : html 태그의 기본 이벤트, 이 객체로 현재 선택 또는 클릭한 html태그(양식)를 알 수 있음.  -->
                    <!-- event.target (현재 사용자가 선택한 양식(여기서는 셀렉트 박스내 목록을 의미 )  -->
                    <div class="mb-3">
                        Items per Page:
                        <select v-model="pageSize" @change="handlePageSizeChange($event)">
                            <option v-for="size in pageSizes" :key="size" :value="size">
                                {{ size }}
                            </option>
                        </select>
                    </div>

                    <!-- b-pagination : bootstrapVue 의 페이지 번호 컨트롤  -->
                    <!-- total-rows : 전체 데이터 개수  -->
                    <!-- per-page : 1페이지 당 개수  -->
                    <!-- prev-text="화면에 보일 글자" -->
                    <!-- next-text="화면에 보일 글자" -->
                    <!-- change : handlePageChange(), 페이지 번호 변경 시 실행되는 이벤트  -->
                    <b-pagination v-model="page" :total-rows="count" :per-page="pageSize" prev-text="Prev"
                        next-text="Next" @change="handlePageChange"></b-pagination>
                </div>
                <!-- 페이징 양식 끝 -->

                <!-- 이미지명 입력 박스 시작-->
                <div class="mb-3 col-md-5">
                    <label for="galleryTitle" class="form-label">갤러리 이름</label>
                    <input type="text" class="form-control" id="galleryTitle" required  name="galleryTitle" 
                        v-model="galleryTitle" />
                </div>
                <!-- 이미지명 입력 박스 끝-->

                <!-- 이미지 선택 상자 시작 -->
                <div class="mb-3 col-md-5">
                    <label class="btn btn-default p-0">
                        <!--  파일 선택상자  -->
                        <input type="file" accept="image/*" ref="file" @change="selectImage" />
                    </label>
                </div>
                <!-- 이미지 선택 상자 끝 -->


                <!-- upload 버튼 : insert 문 실행 시작 -->
                <div class="mb-3">
                    <!-- <!— 서버에 insert 문 호출 —> -->
                    <button type="submit" class="btn btn-success btn-sm float-left" :disabled="!currentImage"  @click="upload">
                        Upload
                    </button>
                </div>
                <!-- upload 버튼 : insert 문 실행 끝 -->


                <!-- 미리보기 이미지 시작 -->
                <div v-if="previewImage">
                    <div>
                        <img class="preview my-3" :src="previewImage" alt="" />
                    </div>
                </div>
                <!-- 미리보기 이미지 끝 -->

            </div>
        </div>
        <!-- upload 끝 -->


        <!-- 서버에러 메세지가 있을 경우 아래 출력 시작 -->
        <div v-if="message" class="alert alert-secondary" role="alert">
            {{ message }}
        </div>
        <!-- 서버에러 메세지가 있을 경우 아래 출력 끝 -->

        <!-- <!— 쇼핑 카트 형태 디자인 시작 —> -->
        <!-- <!— v-for 시작 —> -->
        <div class="row">
            <div class="col-sm-4 mt-3" v-for="(data, index) in galleryDb" :key="index">
                <div class="card">
                    <img :src="data.fileUrl" class="card-img-top" alt="강의" />
                    <div class="card-body">
                        <h5 class="card-title">{{ data.galleryTitle }}</h5>
                        <!-- <p class="card-text">
                            {{ data.fileContent }}
                        </p> -->
                        <a  @click="deleteImage(data.gid)">
                            <!-- <!— <i class="fas fa-trash" /> —> -->
                            <button type="button" class="btn btn-outline-danger">Delete</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- <!— 쇼핑 카트 형태 디자인 끝 —> -->
    </div>
</template>

<script>
import GalleryDbDataService from '@/services/GalleryDbDataService';

export default {
    data() {
        return {
            currentImage: undefined,   // 현재 이미지
            previewImage: undefined,   // 미리보기 이미지
            searchTitle: "",           // 이미지 명으로 검색하는 변수
            message: "",               // 서버쪽 메세지를 저장할 변수
            galleryDb: [],                 // 이미지 객체 배열

            // 스프링 부트에 요청할 변수, 이미지명(galleryTitle) 
            galleryTitle: "",

            // 페이징 변수
            page: 1,
            count: 0,
            pageSize: 3,
            pageSizes: [3, 6, 9]
        }
    },

    methods: {

        // 조회함수
        retrieveGalleryDb() {
            GalleryDbDataService.getFiles(this.searchTitle, this.page - 1, this.pageSize)
                //  axios 성공하면  .then  결과전송됨
                .then(response => {
                    const { galleryDb, totalItems } = response.data;
                    this.galleryDb = galleryDb;
                    this.count = totalItems;
                    console.log(response.data);
                })
                // 실패하면 .catch() 에 에러가 전송됨
                .catch(e => {
                    console.log(e);

                })
        },

        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.retrieveFileDb();
        },

        handlePageChange(value) {
            this.page = value;
            this.retrieveFileDb();
        },

        //    upload 함수
        upload() {
            if(this.galleryTitle==""){
                alert("갤러리 이름을 입력하세요");
            }
            else{

                GalleryDbDataService.upload(
                this.galleryTitle,
                // this.fileContent,
                this.currentImage
            )
                .then(response => {
                    // 서버쪽 성공메세지 저장
                    this.message = response.data.message;

                    // 잘 들어갔는지 axios 함수로 화면에 재조회
                    return GalleryDbDataService.getFiles(
                        this.searchTitle, this.page - 1, this.pageSize
                    )
                })
                // 재조회가 성공하면 실행되는 then()
                .then(response2 => {
                    const { galleryDb, totalItems } = response2.data;
                    this.galleryDb = galleryDb;
                    this.count = totalItems;
                    console.log(response2.data);
                })
                .catch(e => {
                    console.log(e)
                    // 서버쪽에서 실패메세지를 받아서화면에 출력
                    this.message = "Could not upload the image!" + e;
                    this.currentImage = undefined;  // 초기화
                })
            }
        },

        // 파일 선택 상자에서 선택한 이미지를 저장하는 함수
        selectImage() {

            // this.$refs : refs 속성이 있는 컨트롤이 선택됨
            // 첫번째 선택한 이미지를 변수에 저장
            this.currentImage = this.$refs.file.files.item(0);

            // .createObjectURL()  이미지 주소만 참조해서 이미지 보여주기함수
            this.previewImage = URL.createObjectURL(this.currentImage);
            this.message = "";
        },


        deleteImage(gid) {
            GalleryDbDataService.deleteFiles(gid)
            .then(response=>{
                console.log(response);
                this.message="정상적으로 삭제되었습니다.";

                // 삭제후 재조회
                this.retrieveGalleryDb();
            })
            .catch(e=>{
                console.log(e);
                this.message="삭제시 에러가 발생했습니다."+ e.message;

            })
        },

    },
    mounted() {
        this.retrieveGalleryDb();
    },

}
</script>

<style>
.preview{
    max-width: 200px;
}
</style>
