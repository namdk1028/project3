<template>
<div>
    <div class="container-bubbles">
        <span class="bubble bubbleRight height-bubbleRight">{{ sliderTop }}</span>
        <output class="bubble bubbleLeft height-bubbleLeft">{{ sliderBottom }}</output>
    </div>
    <div class="sliderContainer">
        <input type="range" min="140" max="200" v-model="sliderTop" @change="moveRight" class="slider" id="heightTop">
        <input type="range" min="140" max="200" v-model="sliderBottom" @change="moveLeft" class="slider" id="heightBottom">
        
        <div class="multi-slider">
            <div class="track"></div>
            <div class="range height-range"></div>
            <div class="thumb left height-left"></div>
            <div class="thumb right height-right"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Height",
    data() {
        return {
            sliderTop: 200,
            sliderBottom: 140,
        }
    },
    methods: {
        moveRight() {
            this.sliderTop = Math.max(parseInt(this.sliderTop), parseInt(this.sliderBottom))

            var range = document.querySelector(".height-range");
            var right = document.querySelector(".height-right");
            var bubble = document.querySelector(".height-bubbleRight")

            var newVal = 100-(this.sliderTop-140)/60*100

            range.style.right = newVal + "%"
            right.style.right = newVal + "%"
            bubble.style.right = newVal + "%"

        },
        moveLeft() {
            this.sliderBottom = Math.min(parseInt(this.sliderTop), parseInt(this.sliderBottom))

            var range = document.querySelector(".height-range");
            var left = document.querySelector(".height-left");
            var bubble = document.querySelector(".height-bubbleLeft")

            var newVal = (this.sliderBottom-140)/60*100

            range.style.left = newVal + "%"
            left.style.left = newVal + "%"
            bubble.style.left = newVal + "%"
            // bubble.style.left = `calc(${ newVal }% + (${ 5 - newVal * 0.2}px))`;

        },
    },
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/controls/rangeBar.scss"
</style>