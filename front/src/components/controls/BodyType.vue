<template>
  <div>
      <div class="container-btns">
          <div class="wrapper-btn wrapper-left">
            <button class="btn btn-body btn-left" @click="selectOption" value="마른">마른</button>
          </div>
          <div class="wrapper-btn">
            <button class="btn btn-body" @click="selectOption" value="슬림 근육">슬림 근육</button>
          </div>
          <div class="wrapper-btn">

            <button class="btn btn-body" @click="selectOption" value="보통">보통</button>
          </div>
          <div class="wrapper-btn">

            <button class="btn btn-body" @click="selectOption" value="근육질">근육질</button>
          </div>
          <div class="wrapper-btn">
            <button class="btn btn-body" @click="selectOption" value="통통">통통</button>
          </div>
          <div class="wrapper-btn wrapper-right">
            <button class="btn btn-body btn-right" @click="selectOption" value="우람">우람</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "BodyType",
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
                console.log(this.selected)
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