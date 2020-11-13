<template>
  <div class='like-modal'>
    <div class="like-modal-title">
      사용 가능 코인 : 8 <i class="fas fa-coins"></i>
    </div>
    <div class="like-modal-body">
      <div class='text'><p class='coin'>코인 2개</p>로</div>
      <div class='text'><p class="name">{{ test.name }}</p>님에게</div>
      <div class="text">하트를 보내시겠습니까?</div>
    </div>
    <div class="like-modal-btns">
      <div class="like-modal-obtn" @click="okBtn">
        하트 보내기
      </div>
      <div class="like-modal-xbtn" @click="exitBtn">
        취소

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    test: Object
  },
  methods: {
    okBtn() {
      
    },
    exitBtn() {
      this.$emit('closeModal')
    }
  }

}
</script>

<style>
.like-modal {
  height: 30vh;
  background-color: white;
}
.like-modal-title {
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: rgb(230, 230, 230) 2px solid;
  color: gray;
}
.fa-coins {
  margin-left: 5px;
  color: #ffd700;
}
.like-modal-body {
  height: 50%;
  width: 100%;
  margin: auto;
  color: gray;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.like-modal-body .text {
  display: flex;
  align-items: flex-end;
}
.like-modal-body .coin {
  color: #80CBC4;
  font-size: 1rem;
}
.like-modal-body .name {
  color: #B2DFDB;
  font-size: 1rem;
}
.like-modal-btns {
  height: 25%;
  width: 100%;
  display: flex;
}
.like-modal-obtn { 
  width: 50%;
  background-color: #B2DFDB;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.like-modal-xbtn {
  width: 50%;
  background-color: #E0E0E0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>