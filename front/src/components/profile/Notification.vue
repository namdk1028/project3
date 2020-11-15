<template>
  <div class="container-notification">
      <div class="notification-header">
        <div class="profile-img">
          <img :src="src" @click="moveToProfile">
          <div class="notification-icon"><i class="fas fa-heart"></i></div>
        </div>
      </div>
      <div class="notification-content">
        <div class='notification-content-body'>
          <span class="notification-username">{{ msg.senderNickName }}</span>님이 호감을 표시하셨습니다.
          <div @click="$router.push(`/chat/${msg.senderNickname}`)">대화하기</div>
        </div>
        <div class="notification-time">
          1시간 전
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Notification",
    components: {
    },
    data() {
        return {
          showProfile: false,
          user: {},
        }
    },
    computed: {
      // src: `https://firebasestorage.googleapis.com/v0/b/focused-zephyr-294413.appspot.com/o/${this.msg.nickname}?alt=media`
    },
    props: {
      msg: Object,
    },
    methods: {
      moveToProfile() {
        this.$emit("clickProfile", this.user);
      },
      getUserProfile() {
        axios.get(`https://j3a507.p.ssafy.io/profiles/${this.msg.id}/`,{
          headers: {
            Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDIsInVzZXJuYW1lIjoiXHViMGE4XHViM2Q5XHVhZGRjZ29vZ2xlIiwiZXhwIjoxNjA1OTYzOTc5LCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNjA1MzU5MTc5fQ.xB_N9qx9AK6GSTx03FnNWhQWgaakg_XqY2Vy8NCQeN0"
          }
        })
        .then (res => {
          this.user = res.data
        })
        .catch (err => {
          console.log(err.response)
        })
      }
    },
    mounted() {
      this.getUserProfile()
    }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/notification.scss"
</style>