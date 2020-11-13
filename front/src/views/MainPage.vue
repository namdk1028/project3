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
  }
}
</script>

<style>

</style>