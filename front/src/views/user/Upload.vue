<template>
  <div>
    <Title :title="title" />
    <div class="pic-box">
      <div class="upload-pic">
        <form enctype="multipart/form-data">
          <div class="text-center">
            <label for="upload-image">
              <div v-if="!uploadImage">
                <img class="icon-pic" src="@/assets/images/icon/album.png">
                <br>
                <small class="image-info">프로필로 등록할<br>사진을 선택해주세요</small>
              </div>
            </label>
            <input
              accept="image/jpg, image/jpeg"
              id="upload-image"
              type="file"
              ref="imageInput"
              @change="onChangeUploadImages"
            />
            <div v-if="uploadImage">
              <img class="upload-image" :src="uploadPreview" />
              <img @click="imageDelete(uploadImage)" class="close-icon" src="@/assets/images/icon/close.png">
            </div>
          </div>
        </form>
      </div>
      
      <div class="upload-pic">
        <form enctype="multipart/form-data">
          <div class="text-center">
            <label for="camera-image">
              <div v-if="!cameraImage">
                <img class="icon-pic" src="@/assets/images/icon/camera2.png">
                <br>
                <small class="image-info">유사도 측정을 위해<br>사진 촬영을 해주세요</small>
              </div>
            </label>
            <input
              accept="image/jpg, image/jpeg"
              capture="camera"
              id="camera-image"
              type="file"
              ref="cameraInput"
              @change="onChangeCameraImages"
            />
            <div v-if="cameraImage">
              <img class="camera-image" :src="cameraPreview" />
              <img class="close-icon" src="@/assets/images/icon/close.png">
            </div>
          </div>
        </form>
      </div>
    </div>
    <v-btn
      width="300px"
      height="38px"
      rounded
      class="mx-auto my-0"
      color="#f1c3c3"
      dark
      @click="checkSimilarity"
    >유사도 측정
    </v-btn>
  </div>
</template>

<script>
import axios from "axios"

import USERAPI from "@/api/UserApi.js"
import Title from "../../components/common/Title";
import { mapState } from 'vuex';

export default {
  name:"Upload",
  components:{
    Title
  },
  data(){
    return{
      title:"사진 등록",
      uploadPreview:null,
      cameraPreview:null,
      
      cameraImage:null,
      uploadImage:null,
    }
  },
  computed:{
    ...mapState('user',['authToken']),

  },
  methods:{
    // onClickImageUpload() {
    //     this.$refs.imageInput.click();
    // },
    onChangeUploadImages(e) {
        // console.log(e.target.files)
        this.uploadImage = this.$refs.imageInput.files[0]

        const file = e.target.files[0];
        this.uploadPreview = URL.createObjectURL(file);
        // .then(()=>{
          const formData = new FormData()
          console.log(this.uploadImage)
          formData.append("image", this.uploadImage)
          console.log(formData)
          for (let key of formData.entries()){
            console.log(`${key}`)
          }
          console.log('요청전')
          console.log(formData)
          axios.post(USERAPI.BASE_URL + '/images/upload/', formData, {
            headers:{
              'Content-Type': 'multipart/form-data',
              'Authorization': `JWT ${this.authToken}`
            }
          })

          .then((res)=>{
            console.log(res)
          }).catch((err)=>{
            console.log('요청후')

            console.log(err)
          })
        // })
    },
    onClickCameraUpload() {
        this.$refs.cameraInput.click();
    },
    onChangeCameraImages(e) {
        this.cameraImage = this.$refs.cameraInput.files[0]
        const file = e.target.files[0];
        this.cameraPreview = URL.createObjectURL(file);
    },
    checkSimilarity(){
      const formData = new FormData()
      console.log(this.uploadImage)
      formData.append("image1", this.uploadImage)
      formData.append("image2", this.cameraImage)

      console.log(formData)
      for (let key of formData.entries()){
        console.log(`${key}`)
      }
      console.log('요청전')
      console.log(formData)
      axios.post(USERAPI.BASE_URL + '/images/analysis/', formData, {
        headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization': `JWT ${this.authToken}`
        }
      }).then((res)=>{
        console.log(res)
      })
    },
    imageDelete(image) {
      console.log(image)
      // const name = e.target.getAttribute("name");
      // image = null
      // this.files = this.files.filter((data) => data.number !== Number(name));
    },
  }

}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/user/upload.scss";
</style>