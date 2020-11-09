<template>
  <div class="container-profile">
    <div class="profile-header">
      <div class="header-background">
        <h2 class="header-title">회원정보 수정</h2>
        <div class="container-tabs">
          <button class="btn-tab">회원정보 수정</button>
          <button class="btn-tab">아이디 / 비밀번호 변경</button>
        </div>
        </div>
      <div class="header-contents">
        <div class="profile-img"><img src="https://lh3.googleusercontent.com/proxy/t4rhb4PfO1RFHoZm_RU0m8uxgiGRFe8H71NV99pabLNYEBBFHjYSo9ZS9tR73DpoGPkCgIywpx1BXeMYEaAEV92vMO0lPh5_c33934ZcdpbNhjj-gHcvZD84tV77p6PGsiITNwKMzAF8tRQ6AB5vmkHIztF1Zqs4KjLzSQYl8XOpTBk8As6cV9AcuV1zbeNiMLfalWZq1WDGYOo46zgi4fJS2a0aovHxApf77pmy1uFKzl330LwXqLfXPSAMrCNVTGBe2FiszSsIt6RoaC718ik_g4shDp8KJoj-Sv0ov_K8igEuw3D13oU9PY5Y9K2HsGCH4Rgv75xGSg0STsKZ"></div>
      </div>
    </div>
    <div class="profile-body">

    </div>
    <!-- <Title :title="title" /> -->
  </div>
</template>

<script>
// import Title from '../components/common/Title'
export default {
  data() {
    return {
      title: "Profile"
    }
  },
  // components: {
  //   Title,
  // }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/profile.scss"
</style>