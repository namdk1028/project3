<template>
  <div class="container-profilepic">
      <div class="profilepic-background" @click="closeModal"></div>
      <div class="profilepic-modal">
          <i @click="closeModal" class="fas fa-times btn-close"></i>
          <div class="modal-header">
            프로필 사진 변경
          </div>
          <div class="modal-body">
              <div class="similarity" v-if="!similarityChecked">
                  <Loading v-if="loading" />
                  <button class="btn btn-similarity" @click="getSimilarity" v-if="!loading">유사도<br>측정하기</button>
              </div>
              <div class="similarity" v-if="similarityChecked">
                  <div class="content-similarity">{{ similarity }}<span>%</span></div>
                  <button class="btn btn-similarity-redo" @click="getSimilarity" v-if="!loading">재측정</button>
              </div>
              <div class="upload-img">
                  <div class="upload-preview" @click="clickUploadBtn"></div>
                  <label><i class="far fa-file-image"></i></label>
                  <input type="file" accept="image/png, image/jpeg" id="uploadedImg" @change="previewUpload">
              </div>
              <div class="border"></div>
              <div class="camera-img">
                  <div class="camera-preview" @click="clickCameraBtn"></div>
                  <label><i class="fas fa-camera"></i></label>
                  <input type="file" accept="image/*" capture="camera" id="cameraImg" @change="previewCamera">
              </div>
          </div>
      </div>

  </div>
</template>

<script>
import UserApi from "@/api/UserApi.js";
import axios from "axios";
import { mapGetters } from "vuex";

import Loading from "@/components/profile/Loading.vue";

export default {
    name: "ProfilePic",
    components: {
        Loading,
    },
    data() {
        return {
            uploadedfile: "",
            uploadedURL: "",
            camerafile: "",
            cameraURL: "",
            loading: false,
            similarityChecked: false,
            similarity: "69"
        }
    },
    computed: {
        ...mapGetters({
            authToken: "user/getAuthToken",
        }),
    },
    methods: {
        closeModal() {
            document.querySelector(".container-profilepic").classList.add("hide")
        },
        clickUploadBtn() {
            document.querySelector("#uploadedImg").click();
        },
        clickCameraBtn() {
            document.querySelector("#cameraImg").click();
        },
        previewUpload(event) {
            var preview = document.querySelector('.upload-preview');
            this.uploadedfile = event.target.files[0];
            this.uploadedURL = URL.createObjectURL(event.target.files[0]);
            preview.style.backgroundImage = `url('${this.uploadedURL}')`;
        },
        previewCamera(event) {
            var preview = document.querySelector('.camera-preview');
            this.camerafile = event.target.files[0];
            this.cameraURL = URL.createObjectURL(event.target.files[0]);
            preview.style.backgroundImage = `url('${this.cameraURL}')`;
        },
        getSimilarity(event) {
            this.loading = true;
                this.similarityChecked = false;
            event.target.disabled = true;
            let formData = new FormData();
            formData.append("image1", this.uploadedfile);
            formData.append("image2", this.camerafile);
            
            axios.post(
                `${UserApi.BASE_URL}/images/analysis/`,
                formData,
                {
                    headers: {
                        Authorization: this.authToken,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            .then((res) => {
                console.log(res)
                this.loading = false
                this.similarityChecked = true;
                event.target.disabled = false;
                this.similarity = parseInt(res.data.similarity);
            })
            .catch((err) => {
                if (err.msg == "fail") {
                    alert("얼굴을 찾을 수 없습니다ㅜㅜ")
                }
                console.log(err)
                this.loading = false;
                event.target.disabled = false;

                })
        },
        saveChanges() {

        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/profile/profilepic.scss"
</style>