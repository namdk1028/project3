<template>
  <div class="container-profilepic">
      <div class="profilepic-background"></div>
      <div class="profilepic-modal">
          <div class="modal-header">
            프로필 사진 변경
          </div>
          <div class="modal-body">
              <div class="upload-img" @click="clickUploadBtn">
                  <label for="uploadedImg"><i class="far fa-file-image"></i></label>
                  <input type="file" accept="image/png, image/jpeg" id="uploadedImg" @change="previewImg(upload-preview)">
              </div>
              <div class="camera-img" @click="clickCameraBtn">
                  <label for="cameraImg"><i class="fas fa-camera"></i></label>
                  <input type="file" id="cameraImg" @change="previewImg(camera-preview)">
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
            uploadedImg: null,
            cameraImg: null,
            uploadedfile: "",
            uploadedURL: "",
        }
    },
    methods: {
        clickUploadBtn() {
            console.log("dkfhd")
            document.querySelector("#uploadedImg").click();
        },
        previewFile(event, className) {
            var preview = document.querySelector(`.${className}`);
            this.uploadedfile = event.target.files[0];
            this.uploadedURL = URL.createObjectURL(this.uploadedfile);
            preview.style.backgroundImage = `url('${this.url})`;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/profile/profilepic.scss"
</style>