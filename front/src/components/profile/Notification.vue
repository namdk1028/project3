<template>
  <div class="container-notification">
      <div class="notification-header">
        <div class="profile-img">
          <v-dialog v-model="showProfile">
            <ProfileModal @closeModal="showProfile=false" />
          </v-dialog>
          <!-- <img :src=user.src @click="showProfile=true; user=user;"> -->
          <div class="notification-icon"><i class="fas fa-heart"></i></div>
        </div>
      </div>
      <div class="notification-content">
        <!-- <div class='notification-content-username'>
          나연
        </div> -->
        <div class='notification-content-body'>
          <!-- <span class="notification-username" @click="moveToProfile">{{ user.name }}</span>님이 호감을 표시하셨습니다. -->
          <span class="notification-username" @click="moveToProfile">{{ msg.by }}</span>님이 호감을 표시하셨습니다.
        </div>
        <div class="notification-time">
          1시간 전
        </div>
      </div>
  </div>
</template>

<script>
import ProfileModal from "@/components/main/ProfileModal"

export default {
    name: "Notification",
    components: {
      ProfileModal,
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
        console.log("유저페이지로 이동")
      },
    },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/notification.scss"
</style>