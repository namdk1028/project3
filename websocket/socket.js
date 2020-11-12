//node server setup
const { EFAULT } = require('constants');
const express = require('express');
const app = express();
const cors = require('cors');
const {v4:uuidv4} = require('uuid');

//app.set('view engine', 'ejs');
//app.use(cors());

//const server = require('http').Server(app);
const io = require('socket.io')(3030, {
  cors: {
    // origin: 'http://k3a507.p.ssafy.io',
    origin: true,
    methods: ['GET', 'POST']
  }
});

//server.listen(3030);

//app.get('/', function(req, res) {
//  res.json({message: "welcome to websocket for ssafy 507"})
//})
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

let rooms = [];

//on socket connection
io.on('connection', (socket) => {
    console.log(rooms)
    console.log(`new socket detected, socket id: ${socket.id}`)
    //Emit initial event to retrieve userid
    //Function for new message
    //Sending new message **2020.11.10** function confirmed
    socket.on('new-message', messageInfo => {
      console.log(rooms)
      const date = new Date()
      const today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
      const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      const messageFormat = {
        'text': messageInfo.text,
        'sender': messageInfo.sender,
        'reciever': messageInfo.reciever,
        'date': today,
        'time': time,
        'isRead': false
      }
      console.log('The following new message detected')
      console.log(messageFormat)
      checkPartnerSocketId(messageFormat.reciever)

      //check receiver exists in sender's chat log
      const myMessageLogRef = database.ref(`/Logs/${messageInfo.sender}/Receiver`)
      myMessageLogRef.once('value')
      .then(function(snapshot) {
        //if exists add new message
        //and alert reciever
        if (!snapshot.hasChild(messageFormat.reciever)) {
          myMessageLogRef.child(messageFormat.reciever).set('messages')
        }
        let senderMessageFormat = messageFormat
        senderMessageFormat.isRead = true
        const newKey = myMessageLogRef.child(`${messageFormat.reciever}/messages`).push()
        newKey.set(senderMessageFormat).then(function() {
          console.log('message log recorded successfully')
          //Inform sender that message has been updated
          io.to(messageFormat.sender).emit('new-message-fin')
        })
        .catch(function(error){
          console.log(error)
        })
      })
      //Update receiver's message 
      const receiverMessageLogRef = database.ref('/Logs')
      receiverMessageLogRef.once('value')
      .then(function(snapshot){
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
        //update message if receiver is on chat
        const socketIdRef = database.ref(`/socketId/${messageFormat.reciever}`)
        socketIdRef.once('value').then(function(snapshot) {
          const socketId = snapshot.val();
          console.log('상대방 소켓: ' + socketId)
          io.to(socketId).emit('new-message-fin')
          socket.to(messageFormat.reciever).emit('new-message-fin')
        })
      })
    })
    
    //ChatLog fetcher
    socket.on('fetch-chatlog', chatInfo => {
      console.log(rooms)
      console.log('fetching chat logs....')
      const sender = chatInfo.sender;
      const receiver = chatInfo.receiver;
      const chatlogRef = database.ref(`/Logs/${sender}/Receiver/${receiver}`)
      chatlogRef.child('messages').once('value').then(function(snapshot) {
        console.log(snapshot.val())
        console.log(rooms)
        io.to(sender).emit('fetch-chatlog-callback', snapshot.val())
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
    //채팅방 fetcher
    socket.on('fetch-chatroom', user => {
      console.log(rooms)
      const chatRoomRef = database.ref(`/Logs/${user}/Receiver`)
      chatRoomRef.once('value').then(function(snapshot){
        console.log(snapshot.val())
        socket.emit('fetch-chatroom-callback', snapshot.val())
      })
    })

    //영상통화 발신시 발동되는 함수
    socket.on('callUser', data => {
      console.log("got a call request")
      const caller = data.caller; const callee = data.callee; const signal = data.signalData;
      const socketIdRef = database.ref('/socketId/' + callee);
      socketIdRef.once('value').then(function(snapshot){
        console.log(snapshot.val())
        console.log(callee)
      io.to(snapshot.val()).emit('incoming-call', {signalData: signal, from: caller});
      io.to(snapshot.val()).emit('connection-test')
      })
    })

    socket.on('acceptCall', data => {
      const signal = data.signalData; const to = data.caller;
      socket.to(data.caller).emit('callAccpeted', signal)
    })

    socket.on('answerthephone', user=>{
      socket.to(user).emit('request-answer');
    })

    socket.on('initialize-socket', userId => {
      console.log('socket initialization')
      if (rooms.includes(userId)){
        socket.join(userId)
        console.log(`${userId}가 ${userId}에 입장했습니다.`)
      } else {
        rooms.push(userId)
        socket.join(userId)
        console.log(`${userId}가 ${userId}에 입장했습니다.`)
      }
      console.log('current room status\n' + `rooms: ${rooms}`)
      const socketRef = database.ref('/socketId')
      socketRef.once('value').then(function(snapshot) {
        if (snapshot.hasChild(userId)){
          socketRef.child(userId).set(socket.id);
        } else {
          socketRef.child(userId).set(socket.id)
        }
      })
    })

    // socket.on('check-initiator', userInfo => {
    //   console.log('User Info')
    //   console.log(userInfo)
    //   checkVideoChatOccupancy(userInfo, socket);
    // })

    // socket.on('calling', data => {
    //   socket.broadcast.emit('incoming-call', data.data);
    // })

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