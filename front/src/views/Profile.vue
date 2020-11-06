<template>
  <div class="container-profile">
    <div class="profile-header">
      <div class="header-background"></div>
      <div class="header-contents">
        <div class="profile-img"><img src="https://lh3.googleusercontent.com/proxy/VNVQxSPnPmbLae2Er3rIOFVMDoDTAcOPyqCqQXCtYAHwMjq7U83yv8feV5BEJUaBaOZUuNhKSVUQ3PsBcVdyZGfqL22aQqsA59l16hX1PzT_uAzFmNsmCSTyoxPUf5yfTMRCnP380ui6ttNVPeXAgC_cFN6Q95R2pg70mshEdyjvEjuesEz433wpndgiL2PiEEAC_XoWcEf2bKYdlUqZANu3n9BASbWb0nqfQ9sardswtFF20tIo_xQSqtIeDhonpf7IetnJqSzsurYP7qP9e54JcAfsK_67OvTe1UdAlpK4ZF_UKRvEKj9Kg1OxK6ZAJPzJc72WgQ9GgVWynyp6"></div>
        <div class=""></div>
      </div>
    </div>
    <div class="profile-body"></div>
    <!-- <Title :title="title" /> -->
  </div>
</template>

<script>
// import Title from '../components/common/Title'
export default {
  data() {
    return {
      title: "Profile"
    }
  },
  // components: {
  //   Title,
  // }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/profile/profile.scss"
</style>