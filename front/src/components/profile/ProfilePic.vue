<template>
  <div class="container-profilepic">
      <div class="profilepic-background" @click="closeModal"></div>
      <div class="profilepic-modal">
          <i @click="closeModal" class="fas fa-times btn-close"></i>
          <div class="modal-header">
            프로필 사진 변경
          </div>
          <div class="modal-body">
              <div class="similarity">유사도 %</div>
              <div class="upload-img">
                  <div class="upload-preview" @click="clickUploadBtn"></div>
                  <label><i class="far fa-file-image"></i></label>
                  <input type="file" accept="image/png, image/jpeg" id="uploadedImg" @change="previewUpload">
              </div>
              <div class="border"></div>
              <div class="camera-img">
                  <div class="camera-preview" @click="clickCameraBtn"></div>
                  <label for="cameraImg"><i class="fas fa-camera"></i></label>
                  <input type="file" accept="image/png, image/jpeg" id="cameraImg" @change="previewCamera">
              </div>
          </div>
      </div>

  </div>
</template>

<script>
export default {
    name: "ProfilePic",
    data() {
        return {
            uploadedfile: "",
            uploadedURL: "",
            camerafile: "",
            cameraURL: "",
        }
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
        previewcamera(event) {
            var preview = document.querySelector('.camera-preview');
            this.camerafile = event.target.files[0];
            this.cameraURL = URL.createObjectURL(event.target.files[0]);
            preview.style.backgroundImage = `url('${this.cameraURL}')`;
        },

    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/profile/profilepic.scss"
</style>