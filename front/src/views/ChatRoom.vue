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
        <!-- <ChatBubble :user=user />
        <ChatBubble :user=emoticon />
        <ChatBubble :user="!user" />
        <ChatBubble :user=user />
        <ChatBubble :user="user" />
        <ChatBubble :user=emoticon />
        <ChatBubble :user="!user" />
        <ChatBubble :user=user /> -->
        <ChatBubble 
        v-for="log in chatlog" 
        v-bind:key="log.id" 
        v-bind:user="user" 
        v-bind:chatlog="log"/>
      </div>
      <div class="chat-input">
        <ChatInput 
        v-bind:partner="$route.params.partner"
        v-on:update="updateChatLog"
        />
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
      user: "Kim",
      emoticon: 'emoticon',
      chatlog: '',
    }
  },
  components: {
    ChatBubble,
    ChatInput,
    Title,
  },
  methods: {
    getChat: function(chatlog){
      console.log('chatlog function activated')
      console.log(chatlog)
      this.chatlog = chatlog;
    },
    updateChatLog: function(){
      console.log('updating the chat')
      this.$socket.emit('fetch-chatlog', {'sender': this.user, 'receiver': 'park'});
      this.$socket.on('fetch-chatlog-callback', chatlog => {
        this.getChat(chatlog);
      })
    }
    
  },
  mounted : function() {
      // app_chat_list 의 변화가 발생할때마다 수행되는 영역

      var objDiv = document.getElementById("app_chat_list");
          // 채팅창 스크롤 바닥 유지
          objDiv.scrollTop = objDiv.scrollHeight;
  },
  created: function() {
    const chatInfo = {
        'sender': 'Kim',
        'receiver': 'park'
      };
      this.$socket.emit('fetch-chatlog', chatInfo);
      this.$socket.on('fetch-chatlog-callback', chatlog => {
        this.getChat(chatlog);
      })
    //Testing purpose event handler
    this.$socket.emit('socket-init', 'Kim')
  }
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