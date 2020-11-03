<template>
  <v-app id='app'>
    <h1>HELLO</h1>
    <router-view />
    <Header />
    <Navbar />
  </v-app>
</template>

<script>
import Header from "@/views/Header.vue"
import Navbar from "@/views/Navbar.vue"

export default {
  name: 'App',

  components: {
    Header,
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 375px;
  position: relative;
  margin: auto;
  background-color: lightgray;
  p {
    margin: 0;
  }
}

</style>