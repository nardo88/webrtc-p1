let localStream;
let remoteStream;
let peerConnection;
const APP_ID = "b9b3451abaa84f78b4eb6dfedffc45f4";
let token = null;
let uid = String(Math.floor(Math.random() * 10000));
let client;
let channel;
// создание stun server
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
    },
  ],
};

console.log(window.location.search.split("=")[1]);

const init = async () => {
  client = await AgoraRTM.createInstance(APP_ID);
  await client.login({ uid, token });

  channel = client.createChannel("main");
  await channel.join();

  channel.on("MemberJoined", handleUserJoined);

  localStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  document.getElementById("user-1").srcObject = localStream;
};

const handleUserJoined = async (MemberId) => {
  console.log("new user", MemberId);
};

const createOffer = async () => {
  peerConnection = new RTCPeerConnection(servers);

  remoteStream = new MediaStream();
  document.getElementById("user-2").srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log("new candidate:", event.candidate);
    }
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
};

// 41:43

init();
