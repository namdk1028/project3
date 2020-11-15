<template>
  <div class="swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <v-dialog
          v-model="dialogProfile"
        >
          <ProfileModal @closeModal="dialogProfile = false" :userData="userData" />
        </v-dialog>
        <v-dialog
          v-model="dialogLike"
          width="70vw"
        >
          <LikeModal @closeModal="dialogLike = false" :userData="userData" @like="like" />
        </v-dialog>
        <v-dialog
          v-model="dialogAlreadyLike"
          width="70vw"
        >
          <AlreadyLikeModal @closeModal="dialogAlreadyLike = false" />
        </v-dialog>
        <v-img v-for="user in users" :key="user.id"
          class='swiper-slide'
          :src=user.src
          aspect-ratio="1.2"
        >
          <div class='swiper-btns'>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="#B2DFDB"
              @click="dialogProfile = true; userData = user;"
            ><i class="fas fa-user main-message"></i>
            </v-btn>
            <div class='swiper-similar'>
              78%
            </div>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="#EF5350"
              @click="likeBtn(user)"
            >
              <v-icon v-if="user.like" color="lime lighten-3">
                mdi-heart
              </v-icon>
              <v-icon v-else>
                mdi-heart
              </v-icon>
            </v-btn>
          </div>
          <div class='swiper-bottom'>
            <h1 class="swiper-bottom-name">{{ user.nickname }}, {{ user.age }} </h1>
            <p class='swiper-bottom-introduce'>{{ user.intro }}</p>
          
          </div>
          </v-img>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import ProfileModal from "../main/ProfileModal"
import LikeModal from "../main/LikeModal"
import AlreadyLikeModal from "../main/AlreadyLikeModal"
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectCube, EffectCoverflow } from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-cube/effect-cube.scss';
import axios from "axios"
import UserApi from "@/api/UserApi.js"
import { mapGetters } from 'vuex';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCube, EffectCoverflow ]);

const SERVER_URL = UserApi.BASE_URL

export default {
  components: {
    ProfileModal,
    LikeModal,
    AlreadyLikeModal,
  },
  data() {
    return {
      dialogProfile: false,
      dialogLike: false,
      dialogAlreadyLike: false,
      userData: {},
      users: [
        {
          id: 1,
          src: "https://img1.yna.co.kr/etc/inner/KR/2019/10/16/AKR20191016056700005_01_i_P2.jpg",
          nickname: '천우희',
          age: '34',
          gender: 0,
          birth: "1987.01.04",
          height: 161,
          body: "날씬",
          hobby1: "영화보기",
          hobby2: "멍때리기",
          blood: 'A형',
          religion: '무교',
          smoke: '안함',
          drink: '가끔',
          education: '대학생 이상',
          job: '배우',
          area: '경기도',
          intro: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          like: true,
        },
        {
          id: 2,
          src: "https://www.newstap.co.kr/news/photo/202001/102741_170863_4955.jpg",
          nickname: '수지',
          age: '28',
          gender: 0,
          birth: "1987.01.04",
          height: 161,
          body: "날씬",
          hobby1: "영화보기",
          hobby2: "멍때리기",
          blood: 'A형',
          religion: '무교',
          smoke: '안함',
          drink: '가끔',
          education: '대학생 이상',
          job: '배우',
          area: '경기도',
          intro: 'HELLO',
          like: false,
        },
        {
          id: 3,
          src: "https://sccdn.chosun.com/news/html/2020/08/22/2020082301001930000129551.jpg",
          nickname: '아이유',
          age: '28',
          gender: 0,
          birth: "1987.01.04",
          height: 161,
          body: "날씬",
          hobby1: "영화보기",
          hobby2: "멍때리기",
          blood: 'A형',
          religion: '무교',
          smoke: '안함',
          drink: '가끔',
          education: '대학생 이상',
          job: '배우',
          area: '경기도',
          intro: 'HELLO',
          like: false,
        },
        {
          id: 4,
          src: "https://lh3.googleusercontent.com/proxy/m9B8jQBoPmKpwUP9fkQVqPKm2BJZ6cJnfiMRxx-R1U7EPxt6DYCcBvwtid5KZhQaMytCX2vBnhCDTBgzlDAoKUhELnC9EwxWF9yS4nfyUcOWeJeiM3Wb8dA",
          nickname: '한소희',
          age: '27',
          gender: 0,
          birth: "1987.01.04",
          height: 161,
          body: "날씬",
          hobby1: "영화보기",
          hobby2: "멍때리기",
          blood: 'A형',
          religion: '무교',
          smoke: '안함',
          drink: '가끔',
          education: '대학생 이상',
          job: '배우',
          area: '경기도',
          intro: 'HELLO',
          like: false,
        },
        {
          id: 5,
          src: "https://img.vogue.co.kr/vogue/2019/05/style_5cc94e4e98ff8.jpg",
          nickname: '사나',
          age: '25',
          gender: 0,
          birth: "1987.01.04",
          height: 161,
          body: "날씬",
          hobby1: "영화보기",
          hobby2: "멍때리기",
          blood: 'A형',
          religion: '무교',
          smoke: '안함',
          drink: '가끔',
          education: '대학생 이상',
          job: '배우',
          area: '경기도',
          intro: 'HELLO',
          like: true,
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      config: "user/config"
    }) 
  },
  
  methods: {
    like(id) {
      this.users[id-1].like = true
      console.log(this.users[id])
    },
    likeBtn(user) {
      if (user.like) {
        this.dialogAlreadyLike = true
      }
      else {
        this.dialogLike = true
      }
      this.userData = user
    },
    swiperDetail() {

    },
    getPartner() {
      axios.get(SERVER_URL+'/profiles/partners/', this.config)
      .then((res) => {
        console.log("check")
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response)
      })
    }
  },
  mounted() {
    this.getPartner()
      new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 400,
          modifier: 1,
          slideShadows: true,
        },
        loop: true,

      });
      console.log(this.users)
    },
}
</script>

<style>
  .swiper {
    font-size: 14px;
    color: #000;
    margin: 0;
    margin-top: 15vh;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    height: 70vh;
  }

  .swiper-container {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 80vw;
    height: 70vh;
    background: white;
    border-radius: 10px 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 20px 0 rgb(140, 140, 140);
  }
  .swiper-similar {
    background-color: rgb(30, 30, 30, 0.8);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px 20px;
    width: 20vw;
    font-size: 1.2rem;
  }
  .swiper-btns {
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 17vh;
    width: 100%;
  }

  .swiper-bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 20vh;
    background-color: white;
    border-radius: 40px 40px 0 0;
    z-index: -1;
  }
  .swiper-bottom-name {
    margin: 1.5rem 0 0 2.2rem;
    text-align: left;
    color: rgb(80, 80, 80);
  }
  .swiper-bottom-introduce {
    margin: 0.5rem 2.2rem 0 2.2rem !important;
    height: 30%;
    overflow: hidden;
    text-align: left;
    color: gray;
    -webkit-line-clamp: 2;
  }

  .main-name {
    margin: 0;
    font-size: 1rem;
    color: #78909C;
  }

  .main-region {
    margin: 0;
    color: gray;
    font-size: 0.8rem;
  }
  
  .main-message {
    font-size: 20px;
  }

</style>