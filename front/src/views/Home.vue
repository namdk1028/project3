<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  mounted: function(){
    const userId = 'yeonsu'
    this.$socket.emit('socket-init', userId)
  }
}
</script>
