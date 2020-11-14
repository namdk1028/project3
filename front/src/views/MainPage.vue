<template>
  <div class='main'>
    <Header />
    <HeartAnimation />
    <Slider />
  </div>
</template>

<script>
import Slider from "../components/main/Slider"
import HeartAnimation from "../components/main/HeartAnimation"
import Header from "../components/common/Header.vue"
export default {
  components: {
    Slider,
    Header,
    HeartAnimation
  },
  mounted: function(){
    this.$socket.emit('initialize-socket', 'yeonsu')
  }
}
</script>

<style>
.main {
  background-color: #fefff8;
}
</style>