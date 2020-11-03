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
                <Age />
            </div>
            <div class="control-item">
                <Height />
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-detail">세부 설정</button>
        </div>
      </div>
  </div>
</template>

<script>
import Age from "@/components/controls/Age.vue"
import Height from "@/components/controls/Height.vue"

export default {
    components: {
        Age,
        Height,
    },
    data() {
        return {
            sliderBottom: 20, 
            sliderTop: 50, 
        }
    },
    methods: {
        closeControls() {
            document.querySelector(".container-controls").classList.add("hide");
        },
        confirmChanges() {

        },
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/controls/controlModal.scss"
</style>