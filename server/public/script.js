// const socket = io('http://localhost:3000'); // Ensure it matches your server URL

const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
  host: 'localhost', // Use your server's IP or domain if deployed
  port: '3001',
  path: '/'
});

const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};

// Ensure ROOM_ID is defined before using it
if (typeof ROOM_ID === 'undefined') {
  console.error("ROOM_ID is not defined. Ensure it's set before emitting events.");
} else {
  myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
  });
}

// Request access to media devices
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream);

  myPeer.on('call', call => {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on('user-connected', userId => {
    console.log(`User connected: ${userId}`);
    connectToNewUser(userId, stream);
  });
}).catch(err => {
  console.error("Error accessing media devices:", err);
});

socket.on('user-disconnected', userId => {
  if (peers[userId]) {
    peers[userId].close();
    delete peers[userId];
  }
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  if (!call) {
    console.error(`Failed to call user: ${userId}`);
    return;
  }

  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
  });
  
  call.on('close', () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}
