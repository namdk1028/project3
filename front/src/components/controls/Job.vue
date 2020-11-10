<template>
    <div class="container-btns">
        <div class="wrapper-btn wrapper-left">
            <button class="btn btn-job btn-left" @click="selectOption" value="학생">학생</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-job" @click="selectOption" value="전문직">전문직</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-job" @click="selectOption" value="회사원">회사원</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-job" @click="selectOption" value="자영업자">자영업자</button>
        </div>
        <div class="wrapper-btn">
            <button class="btn btn-job" @click="selectOption" value="프리랜서">프리랜서</button>
        </div>
        <div class="wrapper-btn wrapper-right">
            <button class="btn btn-job btn-right" @click="selectOption" value="무직">무직</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "Job",
    data() {
        return {
            selected: []
        }
    },
    computed: {
        ...mapGetters({
            controlInfo: "control/getControlInfo",
        })
    },
    methods: {
        ...mapMutations({
            setJob: "control/setJob",
        }),
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
            this.setJob(this.selected)
        }
    },
    mounted() {
      var jobs = this.controlInfo.job
      var btns = document.querySelectorAll(".btn-job");
      for (var job of jobs) {
        for (var btn of btns) {
          if (job === btn["value"]) {
            btn.click();
          }
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