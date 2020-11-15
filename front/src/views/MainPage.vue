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
import { mapState } from 'vuex'

export default {
  components: {
    Slider,
    Header,
    HeartAnimation
  },
  computed: {
    ...mapState('user',['userInfo'])
  },
  mounted: function(){
    console.log(this.userInfo)
    this.$socket.emit('initialize-socket', this.userInfo.id)
  }
}
</script>

<style>
.main {
  background-color: #fefff8;
}
</style>