<template>
  <div>
    <Title :title="title" />
    <div class='chat'>
      <div class='chat-header'>
        <div class='chat-back'>
          <i class="fas fa-chevron-left" @click="$router.push('/message')"></i>
        </div>
        <div class='chat-profile'>
          <v-avatar style='background-color: white;' size='30'>
            <v-img
                src="https://www.popularitas.com/wp-content/uploads/2018/04/user-hero-blue.png"></v-img>
          </v-avatar>
          {{ $route.params.partner }}
        </div>
        <div class='chat-feature'>
          <i class="fas fa-video"></i>
        </div>
      </div>
      <div id="app_chat_list" class='chat-content'>
        <ChatBubble :user=user />
        <ChatBubble :user=emoticon />
        <ChatBubble :user="!user" />
        <ChatBubble :user=user />
        <ChatBubble :user="user" />
        <ChatBubble :user=emoticon />
        <ChatBubble :user="!user" />
        <ChatBubble :user=user />
      </div>
      <div class="chat-input">
        <ChatInput v-bind:partner="$route.params.partner" />
      </div>
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
      title:"Message",
      user: "user",
      emoticon: 'emoticon',
    }
  },
  components: {
    ChatBubble,
    ChatInput,
    Title,
  },
  methods: {
  },
  mounted : function() {
      // app_chat_list 의 변화가 발생할때마다 수행되는 영역

      var objDiv = document.getElementById("app_chat_list");
          // 채팅창 스크롤 바닥 유지
          objDiv.scrollTop = objDiv.scrollHeight;
  },
}
</script>

<style>
.chat {
  height: 78vh;
}

.chat-header {
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
  .chat-back {
    width: 15%;
    cursor: pointer;
  }
  .chat-profile {
    text-align: left;
    width: 70%;
  }
  .chat-feature {
    width: 15%;
    cursor: pointer;
  }
.chat-content {
  height: 80%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.chat-input {
  height: 10%;
  width: 100%;
  background-color: white;
}
</style>