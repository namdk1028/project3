<template>
  <div class="container-controldetails">
    <div class="control-item">
        <p class="control-title">학력</p>
        <Education />
    </div>
    <div class="control-item">
        <p class="control-title">직업</p>
    </div>
    <div class="control-item">
        <p class="control-title">종교</p>
    </div>
    <div class="control-item">
        <p class="control-title">음주 여부</p>
    </div>
    <div class="control-item">
        <p class="control-title">흡연 여부</p>
    </div>
  </div>
</template>

<script>
import Education from "@/components/controls/Education.vue"

export default {
    name: "ControlDetail",
    components: {
      Education,
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/controls/controlDetails.scss", "@/assets/scss/controls/controlModal.scss"
  // @import "@/assets/scss/controls/controlModal.scss"
</style>