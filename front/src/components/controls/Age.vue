<template>
    <div>
        <div class="container-bubbles">
            <span class="bubble bubbleRight age-bubbleRight">{{ sliderTop }}</span>
            <output class="bubble bubbleLeft age-bubbleLeft">{{ sliderBottom }}</output>
        </div>
        <div class="sliderContainer">
            <input type="range" min="20" max="50" v-model="sliderTop" @change="moveRight" class="slider" id="ageTop">
            <input type="range" min="20" max="50" v-model="sliderBottom" @change="moveLeft" class="slider" id="ageBottom">
            
            <div class="multi-slider">
                <div class="track"></div>
                <div class="range age-range"></div>
                <div class="thumb left age-left"></div>
                <div class="thumb right age-right"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Age",
    data() {
        return {
            sliderTop: 50,
            sliderBottom: 20,
        }
    },
    methods: {
                moveRight() {
            this.sliderTop = Math.max(parseInt(this.sliderTop), parseInt(this.sliderBottom))
            // var color = "linear-gradient(90deg, rgb(252, 166, 157) " + (this.sliderTop-20)/30*100 + "%, silver " + (this.sliderTop-20)/30*100 + "%)"
            // var slider = document.querySelector("#sliderTop");
            // slider.style.background = color;

            var range = document.querySelector(".age-range");
            var right = document.querySelector(".age-right");
            var bubble = document.querySelector(".age-bubbleRight")

            var newVal = 100-(this.sliderTop-20)/30*100

            range.style.right = newVal + "%"
            right.style.right = newVal + "%"
            bubble.style.right = newVal + "%"

        },
        moveLeft() {
            this.sliderBottom = Math.min(parseInt(this.sliderTop), parseInt(this.sliderBottom))

            var range = document.querySelector(".age-range");
            var left = document.querySelector(".age-left");
            var bubble = document.querySelector(".age-bubbleLeft")

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
    @import "@/assets/scss/controls/rangeBar.scss"
</style>