<template>
  <div class="navbar">
      <div class="container-navbar">
          <div class="navbar-item">
              <button class="navbar-btn" @click="moveToMain">
                <!-- <img class="navbar-btn-img" src="@/assets/images/navbar/home.png" alt=""> -->
                <homeSVG />
              </button>
          </div>
          <div class="navbar-item">
              <button class="navbar-btn" @click="moveToChat">
                <!-- <img class="navbar-btn-img" src="@/assets/images/navbar/chat.png" alt=""> -->
                <chatSVG />
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
import homeSVG from "@/components/image_svg/homeSVG.vue"
import chatSVG from "@/components/image_svg/chatSVG.vue"

export default {
    name: "Navbar",
    components: {
      homeSVG,
      chatSVG,
    },
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