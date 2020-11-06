<template>
  <div>
    <Title :title="title" />
  </div>
</template>

<script>
import Title from '../components/common/Title'
export default {
  data() {
    return {
      title: "Profile"
    }
  },
  components: {
    Title,
  }
}
</script>

<style>

</style>