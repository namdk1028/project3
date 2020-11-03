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
                <div class="container-bubbles">
                    <span class="bubble bubbleRight">{{ sliderTop }}</span>
                    <output class="bubble bubbleLeft">{{ sliderBottom }}</output>
                </div>
                <div class="sliderContainer">
                    <input type="range" min="20" max="50" v-model="sliderTop" @change="moveRight" class="slider" id="sliderTop">
                    <input type="range" min="20" max="50" v-model="sliderBottom" @change="moveLeft" class="slider" id="sliderbottom">
                    
                    <div class="multi-slider">
                        <div class="track"></div>
                        <div class="range"></div>
                        <div class="thumb left"></div>
                        <div class="thumb right"></div>
                    </div>
                </div>
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
import Height from "@/components/controls/Height.vue"

export default {
    components: {
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
        moveRight() {
            this.sliderTop = Math.max(parseInt(this.sliderTop), parseInt(this.sliderBottom))
            // var color = "linear-gradient(90deg, rgb(252, 166, 157) " + (this.sliderTop-20)/30*100 + "%, silver " + (this.sliderTop-20)/30*100 + "%)"
            // var slider = document.querySelector("#sliderTop");
            // slider.style.background = color;

            var range = document.querySelector(".range");
            var right = document.querySelector(".right");
            var bubble = document.querySelector(".bubbleRight")

            var newVal = 100-(this.sliderTop-20)/30*100

            range.style.right = newVal + "%"
            right.style.right = newVal + "%"
            bubble.style.right = newVal + "%"

        },
        moveLeft() {
            this.sliderBottom = Math.min(parseInt(this.sliderTop), parseInt(this.sliderBottom))

            var range = document.querySelector(".range");
            var left = document.querySelector(".left");
            var bubble = document.querySelector(".bubbleLeft")

            var newVal = (this.sliderBottom-20)/30*100

            range.style.left = newVal + "%"
            left.style.left = newVal + "%"
            bubble.style.left = newVal + "%"
            // bubble.style.left = `calc(${ newVal }% + (${ 5 - newVal * 0.2}px))`;

        },
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/controls/controlModal.scss"
</style>