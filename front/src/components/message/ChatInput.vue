<template>
  <div class='chat-input'>
    <div class='chat-input-other'>
      <i class="fas fa-plus" type='button'></i>
    </div>
    <div class="chat-input-message">
      <input class="content" type="text" placeholder="메시지를 입력해주세요" >
    </div>
    <div class="chat-input-send">
      <i class="fas fa-paper-plane" type="button"></i>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.chat-input {
  display: flex;
  align-items: center;
}
.chat-input-other {
  width: 15%;
  color: #fca69d;
}
.chat-input-message {
  width: 70%;
  text-align: left;
  font-size: 0.8rem;
}
.chat-input-message .content {
  width: 100%;
  outline: none;
}
.chat-input-send {
  width: 15%;
  color: #fca69d;
}
</style>