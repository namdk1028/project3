<template>
  <div class="container-profile">
    <div class="profile-header">
      <div class="header-background">
        <h2 class="header-title">회원정보 수정</h2>
        <div class="container-tabs">
          <button id="tab-userinfo" class="btn-tab" @click="openUserInfo">회원정보 수정</button>
          <button id="tab-logininfo" class="btn-tab" @click="openLoginInfo">아이디 / 비밀번호 변경</button>
        </div>
        </div>
      <div class="header-contents">
        <div class="profile-img">
          <img src="https://lh3.googleusercontent.com/proxy/t4rhb4PfO1RFHoZm_RU0m8uxgiGRFe8H71NV99pabLNYEBBFHjYSo9ZS9tR73DpoGPkCgIywpx1BXeMYEaAEV92vMO0lPh5_c33934ZcdpbNhjj-gHcvZD84tV77p6PGsiITNwKMzAF8tRQ6AB5vmkHIztF1Zqs4KjLzSQYl8XOpTBk8As6cV9AcuV1zbeNiMLfalWZq1WDGYOo46zgi4fJS2a0aovHxApf77pmy1uFKzl330LwXqLfXPSAMrCNVTGBe2FiszSsIt6RoaC718ik_g4shDp8KJoj-Sv0ov_K8igEuw3D13oU9PY5Y9K2HsGCH4Rgv75xGSg0STsKZ">
          <button class="btn-img"><i class="fas fa-camera"></i></button>
        </div>
      </div>
    </div>
    <div class="profile-body">
      <UserInfo v-if="showUserInfo" />
      <LoginInfo v-if="showLoginInfo" />
    </div>
  </div>
</template>

<script>
import LoginInfo from '../components/profile/LoginInfo.vue'
import UserInfo from '../views/user/UserInfo.vue'

export default {
  components: {
    UserInfo,
    LoginInfo,
  },
  data() {
    return {
      title: "Profile",
      showLoginInfo: false,
      showUserInfo: true,
    }
  },
  methods: {
    openUserInfo() {
      this.showUserInfo = true;
      this.showLoginInfo = false;
      console.log("click")
      document.querySelector("#tab-userinfo").style.borderColor = "rgb(241, 195, 195)"
      document.querySelector("#tab-logininfo").style.borderColor = "transparent"
    },
    openLoginInfo() {
      this.showUserInfo = false;
      this.showLoginInfo = true;
      document.querySelector("#tab-userinfo").style.borderColor = "transparent"
      document.querySelector("#tab-logininfo").style.borderColor = "rgb(241, 195, 195)"
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/profile.scss"
</style>