<template>
  <v-layout class='message'
      v-touch="{
        left: () => swipe('Left'),
        right: () => swipe('Right'),
      }"
    >
    <div class='message-each' @click="$router.push('/chat/'+partner)">
      <div class='message-profile-img'>
        <v-avatar style='background-color: white;' class='mx-auto' size='50'>
          <v-img
              src="https://www.popularitas.com/wp-content/uploads/2018/04/user-hero-blue.png"></v-img>
        </v-avatar>
      </div>
      <div class='message-content'>
        <div class='message-content-username'>
          {{ partner }}
        </div>
        <div class='message-content-body'>
          {{ recentText }}
        </div>
      </div>
      <div class="message-new">
        <div class="message-new-time">
          {{ recentDate }}
        </div>
        <div v-if="unread > 0" class="message-new-number">
          <v-avatar color="#fca69d" size="20">
            {{ unread }}
          </v-avatar>
        </div>
      </div>
    </div>
    <div class='message-delete hide'>
      <h4 class='text' @click='deleteMessage'>삭제</h4>
    </div>
  </v-layout>

</template>

<script>
export default {
  props:{
    room: Object,
    number: Number,
  },
  data() {
    return {
      partner: "kimnayu",
      recentText: '',
      recentDate: '',
      unread: 0
    }
  },
  methods : {
    deleteMessage() {
      console.log("check")
    },
    swipe(direction) {
      const message = document.querySelectorAll('.message-delete')[this.number]
      if (direction == "Left") {
        message.classList.remove('hide')
      }
      else {
        message.classList.add('hide')
      }
    }
  },
  mounted: function(){
    console.log(this.number)
    const recentMsg = this.room.messages
    this.unread = this.room.unread
    // console.log(Object.values(recentMsg)[0])
    this.partner = Object.values(recentMsg)[0].reciever
    this.recentText = Object.values(recentMsg)[0].text
    this.recentDate = Object.values(recentMsg)[0].date
  },

}
</script>

<style>
.message {
  display: flex;
}
.message-each {
  width: 100%;
  height: 12vh;
  display: flex;
  border: white solid 1px;
  cursor: pointer;
  border-bottom: gray 0.2px solid;
}
.message-profile-img {
  width: 25%;
  display: flex;
  align-items: center;
}
.message-content {
  width: 50%;
}
.message-content-username {
  height: 40%;
  display: flex;
  align-items: flex-end;
  font-size: 0.7rem;
  padding-left: 3px;
}
.message-content-body {
  height: 60%;
  text-align: start;
  font-size: 0.65rem;
}
.message-new {
  width: 25%;
}
.message-new-time {
  height: 40%;
  color: gray;
  font-size: 0.7rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.message-new-number {
  height: 60%;
  padding: 5px 20px 0 0;
  display: flex;
  justify-content: flex-end;
  font-size: 0.5rem;
  color: white;
}
.message-delete {
  width: 20%;
  background-color: rgb(241, 195, 195);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
}
.message-delete .text {
  color: white;
}
.hide {
  display: none;
}
</style>