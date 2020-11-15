<template>
  <div class="container-notificationBox">
      <!-- <Notification v-for="user in users" :key="user.i" :user="user" /> -->
      <div v-if="newMessages">
        <Notification v-for="msg in newMessages" :key="msg.key" :msg="msg" @clickProfile="onClickProfile" />
      </div>
      <v-dialog v-model="showProfile">
        <ProfileModal @closeModal="showProfile=false" :userData="user" />
      </v-dialog>
  </div>
</template>

<script>
import Notification from "./Notification"
import ProfileModal from "@/components/main/ProfileModal"
import { mapGetters, mapState } from 'vuex';


export default {
    name: "NotificationBox",
    components: {
        Notification,
        ProfileModal,
    },
    computed: {
      ...mapGetters({
        config: "user/config",
        userId: "user/getUserInfo.id",
        nickname: "user/getUserInfo.nickname"
      }),
      ...mapState('user',['userInfo'])
    },
    data() {
        return {
          showProfile: false,
          user: {},
          newMessages: []
        }
    },
    methods: {
      onClickProfile(user) {
        this.user = user;
        this.showProfile = true;
      }
    },
    // 여기 닉네임으로 받나요?? 
    mounted: function(){
      console.log
      this.$socket.emit('fetch-like-log', { 'user': this.userInfo.id });
      this.$socket.on('fetch-like-log-reply', likeMessages => {
        const newMsg = Object.values(likeMessages);
        //key가 보낸사람 아이디, value가 메세지 내용
        this.newMessages = newMsg;
      })
    }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/notification.scss"
</style>