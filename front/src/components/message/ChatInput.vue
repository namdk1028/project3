<template>
  <div class='chat-input'>
    <Emoticon @addEmoticon="addEmoticon" />
    <div class='chat-input-other' @click="exitEmoticon">
      <i class="fas fa-plus"></i>
    </div>
    <div class="chat-input-message" @click="exitEmoticon">
      <input class="content" type="text" v-model="chat_text" @keypress.enter="test">
    </div>
    <div class="chat-input-emoticon" @click="emoticonBtn">
      <i class="far fa-grin"></i>
    </div>
    <div class="chat-input-send" @click="sendBtn">
      <i class="fas fa-paper-plane"></i>
    </div>
  </div>
</template>

<script>
import Emoticon from "../message/Emoticon"
export default {
  props: {
    partner: String
  },
  data() {
    return {
      chat_text: "",
      myId: 'Kim',
      myPartner: this.partner
    }
  },
  components: {
    Emoticon
  },
  methods: {
    emoticonBtn() {
      var emoticon = document.querySelector(".emoticon")
      emoticon.classList.remove("hide")
    },
    exitEmoticon() {
      document.querySelector('.emoticon').classList.add('hide')
    },
    sendBtn() {
      this.exitEmoticon()
      const messageInfo = {
        'sender': this.myId,
        'reciever': this.myPartner,
        'text': this.chat_text
      }
      this.$socket.emit('new-message', messageInfo)
      this.test()
    },
    addEmoticon() {
    },
    test() {
      console.log(this.chat_text)
      this.chat_text = ''
    },
    reply() {
      this.$socket.emit('reply-init', this.myId)
    }
  },
  created: function() {
    //채팅방 접속 후 socket.id 전송
    console.log(this.myPartner)

    this.$socket.emit('partner-info-request', this.myPartner)
    this.$socket.on('partner-info-reply', partnerSocketId => {
      this.socketInfo.partnerSocketId = partnerSocketId
      console.log(this.socketInfo.partnerSocketId);
    })
  }
}
</script>

<style>
.chat-input {
  display: flex;
  align-items: center;
}
.chat-input-other {
  width: 15%;
  font-size: 1.2rem;
  color: #fca69d;
  cursor: pointer;
}
.chat-input-message {
  width: 60%;
  text-align: left;
  font-size: 0.8rem;
}
.chat-input-message .content {
  width: 100%;
  outline: none;
}
.chat-input-emoticon {
  width: 12%;
  font-size: 1.25rem;
  color: #fca69d;
  cursor: pointer;
}
.chat-input-send {
  width: 13%;
  font-size: 1.25rem;
  color: #fca69d;
  cursor: pointer;
}
</style>