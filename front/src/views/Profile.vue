<template>
  <div class="container-profile">
    <div class="profile-header">
      <div class="header-background">
        <h2 class="header-title">마이페이지</h2>
        <div class="container-tabs">
          <button id="tab-notifications" class="btn-tab" @click="openNotifications">알림함</button>
          <button id="tab-userinfo" class="btn-tab" @click="openUserInfo">회원정보 수정</button>
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
      <NotificationBox />
      <UserInfo v-if="showUserInfo" />
    </div>
  </div>
</template>

<script>
// import LoginInfo from '../components/profile/LoginInfo.vue'
import NotificationBox from "@/components/profile/NotificationBox.vue"
import UserInfo from '../views/user/UserInfo.vue'

export default {
  components: {
    NotificationBox,
    UserInfo,
  },
  data() {
    return {
      title: "Profile",
      showNotifications: true,
      showUserInfo: false,
    }
  },
  methods: {
    openNotifications() {
      this.showNotifications = true;
      this.showUserInfo = false;
      document.querySelector("#tab-notifications").style.borderColor = "rgb(241, 195, 195)"
      document.querySelector("#tab-userinfo").style.borderColor = "transparent"
    },
    openUserInfo() {
      this.showNotifications = false;
      this.showUserInfo = true;
      console.log("click")
      document.querySelector("#tab-notifications").style.borderColor = "transparent"
      document.querySelector("#tab-userinfo").style.borderColor = "rgb(241, 195, 195)"
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/profile.scss"
</style>