<template>
  <div class="navbar">
      <div class="container-navbar">
          <div class="navbar-item">
              <button class="navbar-btn">
                <img class="navbar-btn-img" src="@/assets/images/navbar/home.png" alt="">
              </button>
          </div>
          <div class="navbar-item">
                            <button>
                <img class="navbar-btn-img" src="@/assets/images/navbar/chat.png" alt="">
              </button>
          </div>
          <div class="navbar-item">
              <button>
                <img class="navbar-btn-img" src="@/assets/images/navbar/user.png" alt="">
              </button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Navbar",
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/main/navbar.scss";
</style>