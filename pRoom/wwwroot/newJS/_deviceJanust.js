
var deviceUnpublisher = {
    save: function () {
        mainApp.start();
       
       
      //  webrtClient.startApp();
    },
}; 
var iconDevicePanel = document.getElementById("iconDevicelPanel");
var device = {
    videoDevice: undefined,
    audioDevice: undefined,
    isClose: 0,

    settings: function () {
        acquireDeviceList();
        $('#deviceJanusModal').modal('toggle');
        device.start();
    },

    save: function () {
        return;
        iconDisablVidu(1000, iconViduPanel);
        device.isClose = 1;
        //appUnPublishing();
        console.log("device modal save");
        console.log(device.videoDevice);
        console.log(device.audioDevice);
      //  videoElement.srcObject = undefined;
        // audioElement.srcObject = undefined;
        if (window.stream) {
            window.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        //if (!OV) {
        //  //  startSession(1);
        //    // appPublishByDevice();
        //}
        //else
        //    appPublishByDevice();
    },
    close: function () {
        return;
        device.isClose = 1;
      //  videoElement.srcObject = undefined;
        // audioElement.srcObject = undefined;
        if (window.stream) {
            window.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        //leaveRoom();
        //if (!OV) {
        //    startSession(0);
        //    // appPublishByDevice();
        //}
        console.log("device modal close");
        // appPublishByDevice();
    },
    start: function () {

        return;
        device.isClose = 0;
        //if (board.user.permission.audio) document.getElementById('selectAudioInputText').style.display = "block";
        //else document.getElementById('selectAudioInputText').style.display = "none";
        //if (board.user.permission.video) document.getElementById('selectVideoInputText').style.display = "block";
        //else document.getElementById('selectVideoInputText').style.display = "none";
       // iconDisablVidu(2000, iconDevicePanel);
        if (webrtClient.LocalAudioTrack || webrtClient.LocalVideoTrack) webrtClient.stopStream();
        if (window.stream) {
            window.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
       // videoElement.srcObject = undefined;
        //  audioElement.srcObject = undefined;
        selectors = [];
        if (board.user.permission.audio) {
            selectors.push(audioInputSelect);
            document.getElementById('audioSourceSelect').style.display = "block";
        }
        else document.getElementById('audioSourceSelect').style.display = "none";
        if (board.user.permission.video) {
            selectors.push(videoSelect);
            document.getElementById('videoSourceSelect').style.display = "block";
            //document.getElementById('videoSelectElement').style.display = "block";
        }
        else {
            document.getElementById('videoSourceSelect').style.display = "none";
            //document.getElementById('videoSelectElement').style.display = "none";
        }

        navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
        //  startdevice();
         return;
        //  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
        setTimeout(function () {
            if (device.isClose == 1) {
                console.log("device is close ....");
                return;
            }
            if (audioInputSelect.length > 0) {
                console.log("ffffffffffffffffffffffffffffffffffff 111111111");
                device.audioDevice = audioInputSelect.value;
            }

            if (videoSelect.length > 0) {
                device.videoDevice = videoSelect.value;
                console.log("ffffffffffffffffffffffffffffffffffff222222222222");
            }
            else {
                console.log("ffffffffffffffffffffffffffffffffffff 333333333333333333333333");
            }
            startdevice();
        }, 1200);


        //  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);

    },
};

'use strict';

//const videoElement = document.getElementById('videoSelectElement');
//  const audioElement = document.getElementById('audioSelectElement');
const audioInputSelect = document.querySelector('select#audioSource');

const videoSelect = document.querySelector('select#videoSource');
const selectorss = [audioInputSelect, videoSelect];
var selectors = [audioInputSelect];


function gotDevices(deviceInfos) {
    return;
    // Handles being called several times to update labels. Preserve values.
    const values = selectors.map(select => select.value);
    selectors.forEach(select => {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    });
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput' && board.user.permission.audio) {
            if (!device.audioDevice) device.audioDevice = deviceInfo.deviceId;
            option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
            audioInputSelect.appendChild(option);

        } else if (deviceInfo.kind === 'videoinput' && board.user.permission.video) {
            if (!device.videoDevice) device.videoDevice = deviceInfo.deviceId;
            option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        } else {
            console.log('Some other kind of source/device: ', deviceInfo);
        }
    }
    //const option2 = document.createElement('option');
    //option2.value = "vedio devoice test id";
    //option2.text = "vedio devoice test";
    //videoSelect.appendChild(option2);
    selectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
            select.value = values[selectorIndex];
        }
    });
}

//   gotDevices();

function gotStream(stream) {
  //  window.stream = stream; // make stream available to console
   // videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
  //  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function startdevice() {
    //videoElement.srcObject = undefined;
    //audioElement.srcObject = undefined;
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    //return;
    //const constraints = {
    //    audio: device.audioDevice ? { deviceId: { exact: device.audioDevice } } : undefined,
    //    video: device.videoDevice ? { deviceId: { exact: device.videoDevice } } : undefined
    //};
    // const constraints;

    const constraints = {
        audio: { deviceId: device.audioDevice ? { exact: device.audioDevice } : undefined },
        video: { deviceId: device.videoDevice ? { exact: device.videoDevice } : undefined }
    };
    if (!board.user.permission.video)
        constraints.video = false;
    if (!board.user.permission.audio)
        constraints.audio = false;
    //const audioSource = audioInputSelect.value;
    //const videoSource = videoSelect.value;
    //const constraints = {
    //    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    //    video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    //};

    console.log(constraints);
    //video: { deviceId: device.videoDevice ? { exact: device.videoDevice } : undefined }
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices);
    // navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

//audioInputSelect.onchange = function () {
//    //   const audioSource = audioInputSelect.value;
//   // iconDisablVidu(2000, iconDevicePanel);
//    device.audioDevice = audioInputSelect.value;
//  //  startdevice();
//    console.log("audio select : " + device.audioDevice);
//}


//videoSelect.onchange = function () {
//    //  const videoSource = videoSelect.value;
//   // iconDisablVidu(2000, iconDevicePanel);
//    device.videoDevice = videoSelect.value;
//    console.log("video select : " + device.videoDevice);
//  //  startdevice();
//}
