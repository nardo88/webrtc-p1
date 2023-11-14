let localStream;
let remoteStream;
let peerConnection;

const init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  document.getElementById("user-1").srcObject = localStream;
};

const createOffer = async () => {
  peerConnection = new RTCPeerConnection({});
};

// 19:17

init();
