<template>
  <div>
    <Title :title="title" />
    <div class="message-body">
      <MessageEach 
      v-for="(room, idx) in rooms"
      v-bind:room="room" 
      v-bind:key="idx"
      :number="idx"
      />
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
      this.rooms = Object.values(rooms);
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