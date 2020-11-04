<template>
  <div>
    <Title :title="title" />
    <div class='chat'>
      <div class='chat-back'>
        <i class="fas fa-chevron-left" type='button' @click="$router.push('/message')"></i>
      </div>
      <div class='chat-profile'>
        <v-avatar style='background-color: white;' size='30'>
          <v-img
              src="https://www.popularitas.com/wp-content/uploads/2018/04/user-hero-blue.png"></v-img>
        </v-avatar>
        {{ $route.params.partner }}
      </div>
      <div class='chat-feature'>
        <i class="fas fa-video" type="button"></i>
      </div>
    </div>
    <hr>
    <div class='chat-content'>
      <ChatBubble />
    </div>
    <div class="chat-input">
      <ChatInput />
    </div>
  </div>
</template>

<script>
import ChatBubble from "../components/message/ChatBubble"
import ChatInput from "../components/message/ChatInput"
import Title from "../components/common/Title"

export default {
  data() {
    return {
      title:"Kimnayu"
    }
  },
  components: {
    ChatBubble,
    ChatInput,
    Title
  }

}
</script>

<style>
.chat {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chat-back {
  width: 15%;
}
.chat-profile {
  text-align: left;
  width: 70%;
}
.chat-feature {
  width: 15%;;
}
.chat-content {
  height: 400px;
}
.chat-input {
  height: 50px;
  width: 100%;
  background-color: white;
}
</style>