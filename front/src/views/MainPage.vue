<template>
  <div>
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
    this.$socket.emit('ping')
    this.$socket.on('pong', function(){
      console.log('핑핑핑퐁퐁퐁!!!')
    })
  }
}
</script>

<style>

</style>