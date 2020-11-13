import axios from "axios";

import cookies from "vue-cookies";
import USERAPI from "@/api/UserApi"
import router from '@/router';


export default {
  namespaced: true,
  state: {
    profile_saved:false,
    image_saved:false,
    authToken: null,
    // userInfo: Object,
    userInfo: {},
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
    config: (state) => ({
      headers: {
        Authorization: `JWT ${state.authToken}`,
      },
    }),
    getUserInfo(state) {
      return state.userInfo;
    }
  },
  mutations: {
    SET_ACTIVE_USER(state, res) {
      state.userInfo = res.data.profile;
    },
    SET_PROFILE(state,userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login({ commit,state }, res) {
      router.push({name:"Loading"})
      cookies.set("auth-token", res.data.token);
      state.authToken = res.data.token
      if (res.data.user.profile_saved === 1) {
        state.profile_saved = true
        commit("SET_ACTIVE_USER", res);
        if (res.data.user.image_saved === 1){
          state.image_saved = true
          router.push({name:"Main"})
        }else{
          router.push({name:"Upload"})
        }
      }else if(res.data.user.profile_saved === 0){
        console.log('프로필정보 없음')
        commit("SET_UNACTIVE_USER", res);
        // router.push({name:"Userinfo"})
      }
    },
    addUserInfo({commit,getters},UserData){
      return new Promise((resolve, reject) => {
        axios.post(USERAPI.BASE_URL + '/profiles/', UserData, getters.config)
          .then((res)=>{
            commit("SET_PROFILE", res.data)
            
            resolve()
          })
          .catch(()=>{
            reject()
          })
        })
      },

    updateProfile(userData, getters) {
      axios.put(`${USERAPI.BASE_URL}/profiles/`, userData, getters.config)
      .then(res => {
        this.userInfo = userData
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  
    }
  }
}
