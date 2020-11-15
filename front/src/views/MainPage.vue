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
import { mapGetters } from "vuex"

export default {
  components: {
    Slider,
    Header,
    HeartAnimation
  },
  computed: {
    ...mapGetters ({
      myId: "user/userInfo.id"
    })
  },
  mounted: function(){
    this.$socket.emit('initialize-socket', this.myId)
  }
}
</script>

<style>
.main {
  background-color: #fefff8;
}
</style>