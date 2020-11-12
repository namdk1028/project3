<template>
  <div>
    <Title :title="title" />
    <div class="message-body">
      <MessageEach :number=1 />
      <MessageEach :number=2 />
      <MessageEach :number=3 />
      <MessageEach :number=4 />
      <MessageEach :number=5 />
      <MessageEach :number=6 />
      <MessageEach :number=7 />
      <MessageEach :number=8 />
      <MessageEach :number=9 />
      <MessageEach :number=10 />
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
    }
  },
  components: {
    MessageEach,
    Title
  },
  methods: {
  },
  mounted() {
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