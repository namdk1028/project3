<template>
    <div class="container-btns">
        <div class="wrapper-btn wrapper-left">
            <button class="btn btn-body btn-left" @click="selectOption" value="학생">학생</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-body" @click="selectOption" value="전문직">전문직</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-body" @click="selectOption" value="회사원">회사원</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-body" @click="selectOption" value="자영업자">자영업자</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-body" @click="selectOption" value="프리랜서">프리랜서</button>
        </div>
        <div class="wrapper-btn wrapper-right">
            <button class="btn btn-body btn-right" @click="selectOption" value="무직">무직</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Job",
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
    @import "@/assets/scss/controls/optionButtons.scss";
    .btn {
        padding: 5px 5px !important;
    }
</style>