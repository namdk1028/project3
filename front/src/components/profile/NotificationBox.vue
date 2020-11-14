<template>
  <div class="container-notificationBox">
      <Notification v-for="user in users" :key="user.i" :user="user" />
  </div>
</template>

<script>
import Notification from "./Notification"

export default {
    name: "NotificationBox",
    components: {
        Notification,
    },
    data() {
        return {
          users: [
          {
            src: "https://img1.yna.co.kr/etc/inner/KR/2019/10/16/AKR20191016056700005_01_i_P2.jpg",
            name: '천우희',
            age: '34',
          },
          {
            src: "https://www.newstap.co.kr/news/photo/202001/102741_170863_4955.jpg",
            name: '수지',
            age: '28',
          },
          {
            src: "https://sccdn.chosun.com/news/html/2020/08/22/2020082301001930000129551.jpg",
            name: '아이유',
            age: '28',
          },
          {
            src: "https://lh3.googleusercontent.com/proxy/m9B8jQBoPmKpwUP9fkQVqPKm2BJZ6cJnfiMRxx-R1U7EPxt6DYCcBvwtid5KZhQaMytCX2vBnhCDTBgzlDAoKUhELnC9EwxWF9yS4nfyUcOWeJeiM3Wb8dA",
            name: '한소희',
            age: '27',
          },
          {
            src: "https://img.vogue.co.kr/vogue/2019/05/style_5cc94e4e98ff8.jpg",
            name: '사나',
            age: '25',
          },
        ]
        }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/notification.scss"
</style>