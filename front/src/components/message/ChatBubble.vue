<template>
  <div>
    <div class='chat-bubble chat-bubble--left'>
      남동규 하이
    </div>
    <div class='chat-bubble chat-bubble--right'>
      하이 김나연
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>
.chat-bubble {
  padding: 10px 14px;
  background-color: #eee;
  margin: 10px 30px;
  border-radius: 9px;
  position: relative;
  animation: 1s ease-in;
}
.chat-bubble::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  top: 50%;
  border-bottom: 0;
  margin-top: -10px;
}
.chat-bubble--left::after{
  left: 0;
  border-right-color: #eee;
  border-left: 0;
  margin-left: -15px;
}
.chat-bubble--right::after {
  right: 0;
  border-left-color: #eee;
  border-right: 0;
  margin-right: -15px;
}

</style>