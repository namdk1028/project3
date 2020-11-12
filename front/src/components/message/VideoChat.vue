<template>
    <div>
        <video playsInline muted id="my-video" autoPlay></video>
        <video v-if="callAccepted=true" playsInline id="partner-video" autoPlay></video>
        <button @click='exit'>Exit</button>
        <button v-if="incomingCall == true" @click="acceptCall">Accept Call</button>
    </div>
</template>

<script>
const Peer = require('simple-peer');
//const {v4:uuidv4} = require('uuid');

export default {
    props: {
        caller:String,
        callee:String,
    },
    data(){
        return {
            stream: '',
            callAccepted: false,
            incomingCall: false,
            from: '',
            callerSignal: '',
        }
        
    },
    methods: {
        setStream: function(stream){
            const myVideo = document.querySelector('#my-video');
            this.stream = stream;
            if (myVideo) {
                myVideo.srcObject = stream;
            }
        },
        callPeer: function(){
            const myPeer = new Peer({
                initiator: true,
                trickle: false, 
                stream: this.stream
            });
            myPeer.on('signal', data => {
                const callInfo = {
                    caller: this.caller,
                    callee: this.callee,
                    signalData: data
                }
                this.$socket.emit('callUser', callInfo);
            })

            myPeer.on('stream', stream => {
                const partnerVideo = document.querySelector('#partner-video');
                if (partnerVideo) {
                    partnerVideo.srcObject = stream;
                }
            })

            this.$socket.on('callAccepted', signal => {
                this.callAccepted = true;
                myPeer.signal(signal);
            })

        },
        acceptCall: function(){
            this.callAccepted = true;
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: this.stream,
            })

            peer.on("signal", data => {
                this.$socket.emit("acceptCall", {signalData: data, caller: this.from})
            })

            peer.on('stream', stream => {
                const partnerVideo = document.querySelector('#partner-video');
                partnerVideo.srcObject = stream
            })

            peer.signal(this.callerSignal);
        },

        exit: function(){
            this.$emit('endcall');
        }
        
    },
    mounted: function(){
        navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(stream => {
            this.setStream(stream);
        })

        this.$socket.on('incoming-call', data => {
            this.incomingCall = true
            this.from = data.from
            this.callerSignal = data.signalData
        })
    }
}
</script>

<style>

</style>