<template>
  <div>
    <Title :title="title" />
    <MessageEach />
    <MessageEach />
    <MessageEach />
    <MessageEach />
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

}
</script>

<style>

</style>