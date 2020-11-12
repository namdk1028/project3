<template>
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
</template>

<script>
export default {
  props:{
    room: Object
  },
  data() {
    return {
      partner: "kimnayu",
      recentText: '',
      recentDate: '',
      unread: 0
    }
  },
  mounted: function(){
    const recentMsg = this.room.messages
    this.unread = this.room.unread
    console.log(Object.values(recentMsg)[0])
    this.partner = Object.values(recentMsg)[0].reciever
    this.recentText = Object.values(recentMsg)[0].text
    this.recentDate = Object.values(recentMsg)[0].date

  }
}
</script>

<style>
.message-each {
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
</style>