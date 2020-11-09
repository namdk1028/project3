//node server setup
const { EFAULT } = require('constants');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)

//listening on port 3000
server.listen(3000);
app.set('view engine', 'ejs');

//firebase settings
const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyD9WPO1cEjEfezvW2pkT40ePYLfCk_PDVU",
    authDomain: "chatlogs-84503.firebaseapp.com",
    databaseURL: "https://chatlogs-84503.firebaseio.com",
    projectId: "chatlogs-84503",
    storageBucket: "chatlogs-84503.appspot.com",
    messagingSenderId: "805207672985",
    appId: "1:805207672985:web:7dbc9a8f6c5432b5661008",
    measurementId: "G-2BGTLCPGZF"
  };
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

//on socket connection
io.on('connection', (socket) => {
    console.log(`new socket detected, socket id: ${socket.id}`)
    //Emit initial event to retrieve userid
    var username = ''
    

    //On retrieval of initial event, 
    //if user's socket id exists, renew. 
    //Else set user's socket id
    var userLogRef = database.ref('users'); 
    socket.on('reply-init', function(userId) {
        console.log('received initialization reply')
        username = userId;
        var socketIdRef = database.ref('socketId')
        const chatLogRef = database.ref('/Logs')
        chatLogRef.once('value')
        .then(function(snapshot){
          console.log(snapshot.hasChild(userId))
        })
        socketIdRef.child(username).set(socket.id);
        socketIdRef.once('value')
        .then(function(snapshot) {
            snapshot.val();
        })
    })

    socket.on('partner-info-request', partnerId => {
      console.log('partner info request recieved')
      var socketIdRef = database.ref('socketId').child(partnerId);
      var partnerSocketId = '';
      socketIdRef.once('value')
      .then(function(snapshot) {
        console.log(snapshot.val())
        socket.emit('partner-info-reply', partnerSocketId)
      })
      console.log(partnerSocketId)
    })
    
    //Sending new message
    socket.on('new-message', messageInfo => {
      console.log('new message detected')
      const messageFormat = {
        'text': messageInfo.text,
        'sender': messageInfo.sender,
        'reciever': messageInfo.reciever,
        'date': new Date(),
        'isRead': false
      }

      //check reciver exists in sender's chat log
      const myMessageLogRef = database.ref(`/Logs/${messageInfo.sender}/Receiver`)
      myMessageLogRef.once('value')
      .then(function(snapshot) {
        //if exists add new message
        //and alert reciever
        // console.log(snapshot.val())
        // console.log(snapshot.hasChild('Park'))
        // console.log(snapshot.hasChild('park'))

        if (!snapshot.hasChild(messageFormat.reciever)) {
          myMessageLogRef.child(messageFormat.reciever).set('messages')
        }
        const newKey = myMessageLogRef.child(`${messageFormat.reciever}/messages`).push()
        newKey.set(messageFormat).then(function() {
          console.log('message log recordes successfully')
          const receiverSocketRef = database.ref('socketId').child(messageFormat.reciever)
          receiverSocketRef.once('value')
          .then(function(snapshot){
            //only works if receiver is online
            console.log(`sending message to ${snapshot.val()}`)
            socket.to(snapshot.val()).emit('incoming-message')
          })
          .catch(function(error){
          console.log(error)
          })
        })
      })
      //Update receiver's message 
      const receiverMessageLogRef = database.ref('/Logs')
      receiverMessageLogRef.once('value')
      .then(function(snapshot){
        console.log(snapshot.val())
        console.log(`if receiver exists: ${snapshot.hasChild(messageFormat.reciever)}`)
        if (!snapshot.hasChild(messageFormat.reciever)) {
          receiverMessageLogRef.child(`${messageFormat.reciever}/Receiver/${messageFormat.sender}/messages`)
          .push().set(messageFormat)
          receiverMessageLogRef.child(`${messageFormat.reciever}/Receiver/${messageFormat.sender}/unread`)
          .set(1)
        } else {
          const receiverKey = database.ref(`Logs/${messageFormat.reciever}/Receiver/${messageFormat.sender}/messages`).push()
          receiverKey.set(messageFormat)
          //update unread message count
          const unReadCountRef = database.ref(`Logs/${messageFormat.reciever}/Receiver/${messageFormat.sender}/unread`)
          unReadCountRef.transaction(function(unread) {
            return unread + 1;
          })
        }
      })

    })

    //initialize new chat
    //info contains my id and recipient's user id
    socket.on('start-chat', (info) => {
      const roomForMe = 'chat' + info.info.owner + info.info.recipient;
      const roomForOther = 'chat' + info.info.recipient + info.info.owner;
      console.log(info)
    //   console.log(info)
    //   if (info != undefined){
    //     socketOwner = info.owner;
    //     recipient = info.recipient;
    //   }
      if (!rooms.includes(roomForMe)){
          rooms.push(roomForMe)
      }
      
      if (!rooms.includes(roomForOther)) {
          rooms.push(roomForOther)
          socket.to(roomForOther).emit('new-chat-room', {'sender': info.info.owner})
        
      }
      var socketIdRef = database.ref('socketId')
      socketIdRef.once('value')
      .then(function(snapshot) {
        const recipientSocketId = snapshot.child(info.info.recipient).val()
        const mySocketId = snapshot.child(info.info.owner).val();  
        console.log(recipientSocketId, mySocketId, info.message);
        socket.to(recipientSocketId).emit('update', info.message)
      })
      console.log(info.msg)

    //   socket.join(roomForMe);
    //   const msg = `${socket.id} has joined the ${roomForMe}`
    //   socket.to(roomForMe).emit('user-connected', msg)
    //   socket.to().emit('')
    })

    socket.on('newMessage', (info) => {
        io.to(info.roomId).emit("update", info.msg);
    })

    socket.on('hello-from-vue', ()=> {
        console.log('found vue page')
    })
})