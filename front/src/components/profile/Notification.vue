<template>
  <div class="container-notification">
      <div class="notification-header">
        <div class="profile-img">
          <img :src="user.src" @click="moveToProfile">
          <div class="notification-icon"><i class="fas fa-heart"></i></div>
        </div>
      </div>
      <div class="notification-content">
        <div class='notification-content-body'>
          <!-- <span class="notification-username" @click="moveToProfile">{{ user.name }}</span>님이 호감을 표시하셨습니다. -->
          <span class="notification-username" @click="moveToProfile">{{ msg.by }}</span>님이 호감을 표시하셨습니다.
          <div @click="$router.push(`/chat/${msg.senderNickname}`)">대화하기</div>
        </div>
        <div class="notification-time">
          1시간 전
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Notification",
    components: {
    },
    data() {
        return {
          showProfile: false,
        }
    },
    props: {
      user: Object,
      msg: Object
    },
    methods: {
      moveToProfile() {
        this.$emit("clickProfile", this.user);
      },
    }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/notification.scss"
</style>