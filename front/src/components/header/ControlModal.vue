<template>
  <div class="container-controls hide">
      <div class="background-controls" @click="closeControls"></div>
      <div class="modal-controls">
        <div class="modal-header">
            <button class="btn-close" @click="closeControls">✖</button>
            <p class="header-title">나의 이상형 찾기</p>
            <button class="btn-confirm" @click="confirmChanges">✔</button>
        </div>
        <div class="modal-body">
            <div class="control-item">
                <p class="control-title">지역</p>
                <select class="select">
                    <option selected>모든 지역</option>
                    <option>서울</option>
                    <option>경기도</option>
                </select>
            </div>
            <div class="control-item">
                <p class="control-title">나이</p>
                <!-- <input type="range" name="foo">
                <output for="foo" onforminput="value = foo.valueAsNumber;"></output> -->
                <div class="sliderContainer">
                    <input type="range" min="20" max="50" value="25" class="slider">
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        closeControls() {
            document.querySelector(".container-controls").classList.add("hide");
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/main/controlModal.scss"
</style>