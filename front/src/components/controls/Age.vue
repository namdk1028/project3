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
import { mapGetters } from "vuex";

export default {
    name: "Age",
    data() {
        return {
            sliderTop: "",
            sliderBottom: "",
        }
    },
    computed: {
        ...mapGetters ({
            getControlInfo: "control/getControlInfo",
        })
    },
    methods: {
        moveRight() {
            this.sliderTop = Math.max(parseInt(this.sliderTop), parseInt(this.sliderBottom))

            var range = document.querySelector(".age-range");
            var right = document.querySelector(".age-right");
            var bubble = document.querySelector(".age-bubbleRight")

            var newVal = 100-(this.sliderTop-20)/30*100

            range.style.right = newVal + "%"
            right.style.right = newVal + "%"
            bubble.style.right = newVal + "%"
            this.$emit("setMaxAge", this.sliderTop)

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
            this.$emit("setMinAge", this.sliderBottom)


        },
    },
    mounted() {
        this.sliderTop = this.getControlInfo["max_age"];
        this.sliderBottom = this.getControlInfo["min_age"];
        this.moveRight();
        this.moveLeft();
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/controls/rangeBar.scss"
</style>