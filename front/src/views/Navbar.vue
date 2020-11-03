<template>
  <div class="navbar">
      <div class="container-navbar">
          <div class="navbar-item">
              <button class="navbar-btn" @click="moveToMain">
                <img class="navbar-btn-img" src="@/assets/images/navbar/home.png" alt="">
              </button>
          </div>
          <div class="navbar-item">
              <button class="navbar-btn" @click="moveToChat">
                <img class="navbar-btn-img" src="@/assets/images/navbar/chat.png" alt="">
              </button>
          </div>
          <div class="navbar-item">
              <button class="navbar-btn" @click="moveToProfile">
                <img class="navbar-btn-img" src="@/assets/images/navbar/user.png" alt="">
              </button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
      moveToMain() {
        this.$router.push("/main")
      },
      moveToChat() {
        this.$router.push("/message")
      },
      moveToProfile() {
        this.$router.push("/profile")
      },
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/main/navbar.scss";
</style>