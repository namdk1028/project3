<template>
    <div class="container-btns">
        <div class="wrapper-btn wrapper-left">
            <button class="btn btn-body btn-left" @click="selectOption" value="고등학교">고등학교 졸업</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-body" @click="selectOption" value="대학교 졸업">대학교 졸업</button>
        </div>
        <div class="wrapper-btn wrapper-right">
            <button class="btn btn-body btn-right" @click="selectOption" value="석사">대학원 이상</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Education",
    data() {
        return {
            selected: []
        }
    },
    methods: {
        selectOption(event) {
            if (this.selected.includes(event.target.value)) {
                var index = this.selected.indexOf(event.target.value)
                this.selected.splice(index, 1)
                event.target.style.background = "white"
                event.target.style.borderTop = "1px solid rgb(211, 211, 211)"
                event.target.style.borderBottom = "1px solid rgb(211, 211, 211)"
                event.target.style.borderRight = "1px solid rgb(211, 211, 211)"
                event.target.style.color = "#2c3e50"


            }
            else {
                this.selected.push(event.target.value)
                event.target.style.background = "rgb(252, 166, 157)"
                event.target.style.borderTop = "1px solid rgb(252, 166, 157)"
                event.target.style.borderBottom = "1px solid rgb(252, 166, 157)"
                event.target.style.borderRight = "1px solid rgb(252, 166, 157)"
                event.target.style.color = "white"
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/controls/optionButtons.scss"
</style>