<template>
  <div class="navbar">
      <div class="container-navbar">
          <div class="navbar-item">
              <button class="navbar-btn" @click="moveToMain">
                <!-- <img class="navbar-btn-img" src="@/assets/images/navbar/home.png" alt=""> -->
                <homeSVG v-if="!mainActive" />
                <homefilledSVG v-if="mainActive" />
              </button>
          </div>
          <div class="navbar-item">
              <button class="navbar-btn" @click="moveToChat">
                <!-- <img class="navbar-btn-img" src="@/assets/images/navbar/chat.png" alt=""> -->
                <chatSVG v-if="!chatActive" />
                <chatfilledSVG v-if="chatActive" />
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
import homefilledSVG from "@/components/image_svg/homefilledSVG.vue"
import chatfilledSVG from "@/components/image_svg/chatfilledSVG.vue"

export default {
    name: "Navbar",
    components: {
      homeSVG,
      chatSVG,
      homefilledSVG,
      chatfilledSVG,
    },
    data() {
      return {
        mainActive: true,
        chatActive: false,
        profileActive: false,
      }
    },
    methods: {
      moveToMain() {
        this.$router.push("/main")
        this.mainActive = true;
        this.chatActive = false;
        this.profileActive = false;
      },
      moveToChat() {
        this.$router.push("/message")
        this.mainActive = false;
        this.chatActive = true;
        this.profileActive = false;
      },
      moveToProfile() {
        this.$router.push("/profile")
        this.mainActive = false;
        this.chatActive = false;
        this.profileActive = true;
      },
    },
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/main/navbar.scss";
</style>