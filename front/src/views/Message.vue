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
      user: 'Kim'
    }
  },
  components: {
    MessageEach,
    Title
  },
  methods: {
  },
  mounted() {
<<<<<<< HEAD
=======
    this.test()
    this.$socket.emit('fetch-chatroom', this.user)
    this.$socket.on('fetch-chatroom-callback', rooms => {
      this.rooms = rooms;
    })
>>>>>>> b20536bc1e73aa10c448be0af74994fb38e70130
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