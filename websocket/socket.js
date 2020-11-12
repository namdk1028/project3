//node server setup
const { EFAULT } = require('constants');
const express = require('express');
const app = express();
const cors = require('cors');
const {v4:uuidv4} = require('uuid');

app.set('view engine', 'ejs');

const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    // origin: 'http://k3a507.p.ssafy.io',
    origin: true,
    methods: ['GET', 'POST']
  }
});

server.listen(8000);

app.get('/', function(req, res) {
 res.json({message: "welcome to websocket for ssafy 507"})
})
//firebase settings
const firebase = require('firebase');
const { triggerAsyncId } = require('async_hooks');
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

let socketId = {}
//on socket connection
io.on('connection', (socket) => {
    console.log(`new socket detected, socket id: ${socket.id}`)

    socket.on('disconnect', ()=>{
      console.log(`${socket.id} disconnected`)
    })

    socket.on('initialize-socket', userId => {
      console.log('socket initialization')
      socketId[userId] = socket.id
    })
    //Emit initial event to retrieve userid
    //Function for new message
    //Sending new message **2020.11.10** function confirmed
    socket.on('new-message', messageInfo => {
      //preflight
      io.to(socketId[messageInfo.reciever]).emit('new-message-pre-flight-receiving side')
      io.to(socketId[messageInfo.sender]).emit('new-message-pre-flight-sender')

      const date = new Date()
      const today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
      const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      const messageFormat = {
        'text': messageInfo.text,
        'sender': messageInfo.sender,
        'receiver': messageInfo.reciever,
        'date': today,
        'time': time,
        'isRead': false
      }
      console.log('The following new message detected')

      //check receiver exists in sender's chat log
      const myMessageLogRef = database.ref(`/Logs/${messageInfo.sender}/Receiver`)
      myMessageLogRef.once('value')
      .then(function(snapshot) {
        //if exists add new message
        //and alert reciever
        if (!snapshot.hasChild(messageFormat.receiver)) {
          myMessageLogRef.child(messageFormat.receiver).set('messages')
        }
        let senderMessageFormat = messageFormat
        senderMessageFormat.isRead = true
        const newKey = myMessageLogRef.child(`${messageFormat.reciever}/messages`).push()
        newKey.set(senderMessageFormat)
        //io.to(socketId[messageFormat.sender]).emit('new-message-fin')
      })
      //Update receiver's message 
      const receiverMessageLogRef = database.ref('/Logs')
      receiverMessageLogRef.once('value')
      .then(function(snapshot){
        if (!snapshot.hasChild(messageFormat.receiver)) {
          receiverMessageLogRef.child(`${messageFormat.receiver}/Receiver/${messageFormat.sender}/messages`)
          .push().set(messageFormat)
          receiverMessageLogRef.child(`${messageFormat.receiver}/Receiver/${messageFormat.sender}/unread`)
          .set(1)
        } else {
          const receiverKey = database.ref(`Logs/${messageFormat.receiver}/Receiver/${messageFormat.sender}/messages`).push()
          receiverKey.set(messageFormat)
          //update unread message count
          const unReadCountRef = database.ref(`Logs/${messageFormat.receiver}/Receiver/${messageFormat.sender}/unread`)
          unReadCountRef.transaction(function(unread) {
            return unread + 1;
          })
        }
      io.to(socketId[messageFormat.sender]).emit('new-message-fin', messageFormat)
      io.to(socketId[messageFormat.receiver]).emit('new-message-fin', messageFormat)



        // console.log(io.sockets)
        // console.log('상대방 소켓: ' + socketId[messageFormat.receiver])
        // io.to(socketId[messageFormat.reciever]).emit('new-message-fin')
        // //update message if receiver is on chat
        // const socketIdRef = database.ref(`/socketId/${messageFormat.receiver}`)
        // socketIdRef.once('value').then(function(snapshot) {
        //   const socketId = snapshot.val();
        //   //io.in(socketId).emit('new-message-fin')
        //   io.to(socketId[messageFormat.receiver]).emit('new-message-fin')
        //   //socket.to(messageFormat.reciever).emit('new-message-fin')
        // })
      })
    })
    
    //ChatLog fetcher
    socket.on('fetch-chatlog', chatInfo => {
      console.log('fetching chat logs....')
      const sender = chatInfo.sender;
      const receiver = chatInfo.receiver;
      const chatlogRef = database.ref(`/Logs/${sender}/Receiver/${receiver}`)
      chatlogRef.child('messages').once('value').then(function(snapshot) {
        io.to(socketId[sender]).emit('fetch-chatlog-callback', snapshot.toJSON())
        socket.emit('fetch-chatlog-callback', snapshot.val())
      })
    })

    //Unread message count fetcher
    socket.on('fetch-unread-count', chatInfo => {
      console.log('fetching unread message counts...')
      const sender = chatInfo.sender;
      const receiver = chatInfo.receiver;
      const unreadRef = database.ref(`/Logs/${sender}/Receiver/${receiver}/unread`)
      unreadRef.once('value').then(function(snapshot) {
        console.log('unread value: ' + snapshot.val())
        io.to(sender).emit('fetch-unread-count-callback', snapshot.val());
      })
    })

    //function to read all messages
    socket.on('read-message', chatInfo => {
      console.log('reading all unread messages')
      const sender = chatInfo.sender;
      const receiver = chatInfo.receiver;
      const unreadRef = database.ref(`/Logs/${sender}/Receiver/${receiver}/unread`)
      unreadRef.transaction(function(unread){
        return unread*0;
      })

      //Mark all messages to read.
      const messageRef = database.ref(`/Logs/${sender}/Receiver/${receiver}/messages`)
      messageRef.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          const isReadRef = messageRef.child(childSnapshot.key + '/isRead')
          isReadRef.transaction(function(isRead){
            return isRead = true
          })
        })
      })
    })
    

    //영상통화 발신시 발동되는 함수
    socket.on('callUser', data => {
      console.log("got a call request")
      const caller = data.caller; const callee = data.callee; const signal = data.signalData;
      console.log("calling " + data.callee)
      io.to(socketId[data.callee]).emit('incoming-call', {signalData: signal, from: caller});
    })

    socket.on('acceptCall', data => {
      const signal = data.signalData; const to = data.caller;
      console.log(`${to}에게 연결되었다고 알리기`)
      console.log(io.sockets)
      console.log(socketId[to])
      io.to(socketId[to]).emit('callAccepted', signal)
    })
})

const checkPartnerSocketId = function(partnerId) {
  const socketRef = database.ref('/socketId').child(partnerId)
  socketRef.once('value').then(function(snapshot){
    console.log('partner socket id ' + snapshot.val())
  })
}

const isRoomExist = function(caller, callee){
      const roomNumberRef = database.ref(`/Logs/${caller}/Receiver/${callee}/videochatroom`);
      roomNumberRef.once('value').then(function(snapshot) {
          const roomNumber = snapshot.val();
          if (roomNumber != null) {
              return roomNumber;
          } else {
              const newRoomNumber = uuidv4();
              roomNumberRef.set(newRoomNumber);
              const reverseRef = database.ref(`/Logs/${callee}/Receiver/${caller}/videochatroom`);
              reverseRef.set(newRoomNumber);
              videoRooms[newRoomNumber] = [];
              return newRoomNumber;
          }
      })
  };

const setSocketId = function(user){
  database.ref('/socketId').child(user).set(socket.id)
}

//   const checkVideoChatOccupancy = function(userInfo, socket){
//     const roomNumberRef = database.ref(`/Logs/${userInfo.caller}/Receiver/${userInfo.callee}/videochatroom`);
//     roomNumberRef.once('value').then(function(snapshot) {
//       console.log(snapshot.val())
//       const myRoom = videoRooms[snapshot.val()]
//       console.log(myRoom)
//       socket.join(myRoom)
//       if (myRoom.length == 0) {
//         myRoom.push(userInfo.caller);
//         socket.emit('check-initiator-fin', true);
//       } else {
//         myRoom.push(userInfo.caller);
//         socket.emit('check-initiator-fin', false)
//       }
//     })
//   }
