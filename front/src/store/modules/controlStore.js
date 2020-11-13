import axios from "axios";

import USERAPI from "@/api/UserApi"
import cookies from "vue-cookies";
// import router from '@/router';



export default {
  namespaced: true,
  state: {
    controlInfo: {
      area: "모든 지역",
      max_age: 50,
      min_age: 20,
      max_height: 200,
      min_height: 140,
      body: ["마른"],
      education: [],
      job: [],
      religion: [],
      drink: "상관 없음",
      smoke: "상관 없음",
    },
    profile_saved:false,
    image_saved:false,
    authToken: null,
    userInfo: Object,
    // userInfo: {
    //   gender: "",
    //   birth: "",
    //   nickname: "",
    //   area: "",
    //   hobby1: "",
    //   hobby2: "",
    //   height: "",
    //   blood: "",
    //   religion: "",
    //   drink: "",
    //   smoke: "",
    //   education: "",
    //   body: "",
    //   job: "",
    //   intro: "",
    // },
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
    // isLoggedIn: (state) => !!state.authToken,

    getControlInfo(state) {
      return state.controlInfo;
    },
    config: (state) => ({
      headers: {
        Authorization: `${state.authToken}`,
      },
    }),
  },
  mutations: {
    SET_UNACTIVE_USER(state, res) {
      cookies.set("auth-token", res.data.token);
      state.authToken = res.data.token
    },
    SET_ACTIVE_USER(state, res) {
      console.log(res.data)
      state.authToken = res.data.token

      cookies.set("auth-token", res.data.token);
      state.userInfo = res.data.profile;
      if (res.data.user.profile_saved === 1){
        state.profile_saved = true
        if (res.data.user.image_saved === 1){
          state.image_saved = true
        }
      }
    },
    setRegion(state, region) {
      state.controlInfo.area = region;
    },
    setMaxAge(state, max_age) {
      state.controlInfo.max_age = max_age;
    },
    setMinAge(state, min_age) {
      state.controlInfo.min_age = min_age;
    },
    setMaxHeight(state, max_height) {
      state.controlInfo.max_height = max_height;
    },
    setMinHeight(state, min_height) {
      state.controlInfo.min_height = min_height;
    },
    setBody(state, body) {
      state.controlInfo.body = body;
    },
    setEducation(state, education) {
      state.controlInfo.education = education;
    },
    setJob(state, job) {
      state.controlInfo.job = job;
    },
    setReligion(state, religion) {
      state.controlInfo.religion = religion;
    },
    setDrink(state, drink) {
      state.controlInfo.drink = drink;
    },
    setSmoke(state, smoke) {
      state.controlInfo.smoke = smoke;
    },
  },
  actions: {
    login({ commit }, res) {
      if (res.data.user.profile_saved === 1) {
        console.log('프로필정보 있음')
        commit("SET_ACTIVE_USER", res);
        console.log('프로필정보 저장')

        // if (res.data.user.image_saved === 1){
          // router.push({name:"Main"})
        // }else{
          // router.push({name})
          // console.log('사진등록 페이지로 푸쉬')
        // }
      }else if(res.data.user.profile_saved === 0){
        console.log('프로필정보 없음')

        commit("SET_UNACTIVE_USER", res);
        // router.push({name:"Userinfo"})
      }
    },
    updateControls() {

    },
    addUserInfo({getters,UserData}){
      axios.post(USERAPI.BASE_URL + '/profiles/', UserData, getters.config)
      .then((res)=>{
        console.log('정보저장')
        console.log(res)
      })
    }
  },
};
