<template>
  <div>
    <Title :title="title" />
    <div class="message-body">
      <MessageEach 
      v-for="room in rooms"
      v-bind:room="room" 
      v-bind:key="room.id" 
      v-bind:partner="room.partner"
      v-bind:recentText="room.message" />
    </div>
  </div>
</template>

<script>
import MessageEach from '../components/message/MessageEach.vue'
import Title from '../components/common/Title'

export default {
  data() {
    return {
      title: 'Message',
      rooms: [],
      user: 'yeonsu'
    }
  },
  components: {
    MessageEach,
    Title
  },
  methods: {
  },
  mounted() {
    this.$socket.emit('initialize-socket')
    this.$socket.emit('fetch-chatroom', this.user)
    this.$socket.on('fetch-chatroom-callback', rooms => {
      console.log('방목록 불러오기')
      this.rooms = rooms.rooms;
      console.log(this.rooms)
    })
  }

}
</script>

<style>
.message-body {
  height: 78vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>