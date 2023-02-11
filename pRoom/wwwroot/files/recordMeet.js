var myRecorder = {
    isactive: 0,
    firstLoad: 0,
    startProgress:0,
    stopProgress:0,
    lastDownloadTime:Date.now(),
    iframe: document.getElementById('fff'),

    setIframe: function () {
        if (!myRecorder.firstLoad) {
            myRecorder.iframe.src = u;
            this.firstLoad = 0;
        }
        else {
            myRecorder.iframe.style.visibility = "visible";
        }
       
    },
    start: function () {
        if (myRecorder.isactive || myRecorder.startProgress) {
            console.log('record is active to');
            return;
        }
        
        myRecorder.isactive = 1;
        myRecorder.startProgress = 1;
        myRecorder.setIframe();
        setTimeout(() => { startCapture(); }, 1500);
    },
    stop: function () {
        if (!myRecorder.isactive || myRecorder.startProgress) {
            console.log('record is deactive to');
            return;
        }
        myRecorder.isactive = 0;
        myRecorder.startProgress = 1;
        stopRecordier();
        
    },
    onStopEnd: function () {
        myRecorder.iframe.src = "";
        mediaRecorder = null;
        // myRecorder.iframe.style.visibility = "hidden";
        console.log('record file download complate : ' );
        setTimeout(() => {
            myRecorder.isactive = 0; myRecorder.startProgress = 0;
        }, 1000);
    },
    clienClick: function () {
        console.log('1');
       // return;
        if (myRecorder.isactive==0) {
            myRecorder.start();
        }
        if (myRecorder.isactive == 1) {
            myRecorder.stop();
        }
    }
   
    
}
var constraints2222 = {
    audio: true,
    //audio: {
    //    echoCancellation: true,
    //    noiseSuppression: true,
    //    sampleRate: 22500
    //},
    video: {
        //mandatory: {
        //    maxWidth: 1600,
        //    maxHeight: 1000,
        //    maxFrameRate: 15,
        //    cursor: "never"
        //},
        cursor: "never",
        frameRate: 15,
        "width": 1400,
        "height": 900
    }
};
var constraints = {

    audio: {
        echoCancellation: false,
        noiseSuppression: false,
        sampleRate: 22500
    },
    video: {

        cursor: "never",
        frameRate: 10

    }
};
//constraints.cursor = "never";
//constraints.frameRate = 5;
//constraints.video.cursor = "never";
constraints.video.frameRate = 10;
let captureStream = null;
async function startCapture() {
    setTimeout(() => { document.title = "torkashvand" }, 1200);
    //setTimeout(() => { document.title = "t1" }, 3000);
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(constraints);
    }
    catch {
        console.log('errroor in captureStream');
        myRecorder.onStopEnd();
        return;
    }
    
    
    document.title = "t1";
    console.log("captureStream start" + captureStream)
   // console.warn(captureStream);
    var mediaStreamTracks = captureStream.getTracks();
    mediaStreamTracks.forEach(track => console.log(track));
    //document.getElementById('fff').src = u;
    setTimeout(() => {
        console.log("on succes ");
        try {
            onSuccess(captureStream);
            myRecorder.startProgress = 0;
        }
        catch {
            console.log('errroor in onsucsess');
            myRecorder.onStopEnd();
            return;
        }
       
    }, 1000);

}
function mixer(stream1, stream2) {
    const ctx = new AudioContext();
    const dest = ctx.createMediaStreamDestination();

    if (stream1.getAudioTracks().length > 0)
        ctx.createMediaStreamSource(stream1).connect(dest);

    if (stream2.getAudioTracks().length > 0)
        ctx.createMediaStreamSource(stream2).connect(dest);

    let tracks = dest.stream.getTracks();
    tracks = tracks.concat(stream1.getVideoTracks()).concat(stream2.getVideoTracks());

    return new MediaStream(tracks)

}
async function startCapture3() {
    setTimeout(() => { document.title = "hhhh " }, 1000);

    let gumStream, gdmStream;
    recordingData = [];

    try {
        gumStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        gdmStream = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: "browser" }, audio: true });

    } catch (e) {
        console.error("capture failure", e);
        return
    }

    captureStream = gumStream ? mixer(gumStream, gdmStream) : gdmStream;


    console.log("captureStream start" + captureStream)
    console.warn(captureStream);
    var mediaStreamTracks = captureStream.getTracks();
    mediaStreamTracks.forEach(track => console.log(track));
    //document.getElementById('fff').src = u;
    setTimeout(() => {
        console.log("on succes ");
        onSuccess(captureStream);
    }, 2000);

}



let chunks = [];
var mediaRecorder = null;


let onSuccess = function (stream) {
    var options2 = {
        audioBitsPerSecond: 22500,
        videoBitsPerSecond: 940000,
    };
    var options3 = { mimeType: "video/webm; codecs=vp9" };
    mediaRecorder = new MediaRecorder(stream, options2);
    mediaRecorder.start();
    setTimeout(() => {
        stopRecordier();
    }, 25*60*1000);
    mediaRecorder.onstop = function (e) {
        console.log('on stop ');
        const blob = new Blob(chunks, { mimeType: "video/webm" });
        //uploadFiles(blob);
        getSeekableBlob(blob, function (jj) {
            download(jj, "jjjj");

        });
        chunks = [];
    }

    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
        console.log('ondataavailable');
        //uploadFiles(chunks);
    }
}

function stopRecordier() {
    console.log("mediaRecorder stop");
    if (!mediaRecorder) {
        myRecorder.onStopEnd();
    };
    if (mediaRecorder.state == "recording")
        mediaRecorder.stop();
    var mediaStreamTracks = captureStream.getTracks();
    mediaStreamTracks.forEach(track => track.stop());

}


function uploadFiles(blob) {



    var formData = new FormData();
    formData.append("files", blob);
    //for (var i = 0; i != files.length; i++) {
    //    formData.append("files", files[i]);
    //}
    formData.append("from", "1");
    formData.append("meetID", meetID);
    formData.append("fileID", 1);

    console.log(formData);
    $.ajax(
        {
            url: "/record/uploadWebm",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {

                console.log(data);
                window.opener.closewindows(rid);
                window.close('', '_parent', '');


            }
        }
    );

}

function getSeekableBlob(inputBlob, callback) {
    // EBML.js copyrights goes to: https://github.com/legokichi/ts-ebml
    if (typeof EBML === 'undefined') {
        throw new Error('Please link: https://cdn.webrtc-experiment.com/EBML.js');
    }

    var reader = new EBML.Reader();
    var decoder = new EBML.Decoder();
    var tools = EBML.tools;

    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        var ebmlElms = decoder.decode(this.result);
        ebmlElms.forEach(function (element) {
            reader.read(element);
        });
        reader.stop();
        var refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
        var body = this.result.slice(reader.metadataSize);
        var newBlob = new Blob([refinedMetadataBuf, body], {
            type: 'video/webm'
        });

        callback(newBlob);
    };
    fileReader.readAsArrayBuffer(inputBlob);
}

function download(recordedChunks, fileName) {
    //var blob = new Blob(recordedChunks, {
    // type: "video/webm"
    //});
    //uploadFiles(recordedChunks);
    //return;
    var d = Date.now() - 15000;
    if (d < myRecorder.lastDownloadTime) {
        console.log("lastMessageTime");
        myRecorder.onStopEnd();
        return;
    }
    myRecorder.lastDownloadTime = Date.now();



    fileName = meetID + "_" + recNumber + "_" + Math.floor(Math.random() * 10000);
    recNumber++;
    var url = URL.createObjectURL(recordedChunks);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = fileName + ".webm";
    a.click();
    window.URL.revokeObjectURL(url);
    mqttClient2.sendcaptureEndMessage(fileName);
    myRecorder.onStopEnd();

}

setTimeout(() => {

    //window.close('', '_parent', '');
    //window.open('', '_self').close();
    //var customWindow = window.open('', '_blank', '');
    //customWindow.close();
    //console.warn("requst for win close : " + rid);
    //window.opener.closewindows(rid);
}, 10000);

function closeWindows() {
   // window.close('', '_parent', '');
}
//var startQS = getParameterByName('start');
//var recNumber = getParameterByName('fileCount');
//if (!recNumber) recNumber = 0;
if (startQS == 1) {
    setTimeout(() => {
        myRecorder.start();
        mqttClient2.lastMessageTime = Date.now();
    },500)
  
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var mqttClient2 = {
    client: null,// = mqtt.connect("ws://localhost:8083/mqtt")
    isConnect: false,
    meetStatus: false,
    lastMessageTime: Date.now(),
    sendOption: { qos: 2 },

    connect: function () {
        var o = {
            clientId: "recorder_get_" + serverID + '_' + meetID , username: serverID + '_' + meetID + '_recorder' };
        var mqttUrl = mqttServer + "/mqtt";//"ws://localhost:9001/mqtt";//board.mediaServer.replace("/ws", "/mqtt");//
        mqttClient2.client = mqtt.connect(mqttUrl, o);
        mqttClient2.client.on('connect', function () {
            if (mqttClient2.isConnect) {
                window.location.reload(true);
                return false;
            }
            mqttClient2.isConnect = true;
            var sendSub = 'recorder_get_' + serverID + '_' + meetID;
           // var userSub = 'user_' + board.meetID + '_' + board.userName;
            var sub = '{"' + sendSub + '": { "qos": 2 } }';

            mqttClient2.client.subscribe(JSON.parse(sub));
            // mqttClient2.client.subscribe("meet_send_" + board.meetID, { qos:2});
            // mqttClient2.client.subscribe("user_" + board.userName, { qos: 2 });
            console.warn("mqtt connect2 .. ");
            var m = {};
            m.type = "join";
            m.reConecting = false;
            
            mqttClient2.send(m);
           // var intervalID2 = setInterval(mqttClient2.interval2, 5000);
            
        });

        mqttClient2.client.on("message", function (topic, payload) {
            // console.log("topic : " + topic + " m : " + payload);
            mqttClient2.parse(payload);
            // alert([topic, payload].join(": "))
            // client.end()
        })
        mqttClient2.client.on("error", function () {

        })
        mqttClient2.client.on('offline', function () {
            console.log("[MQTT] Connection offline");
            
        });

    },
    interval2: function () {

        mqttClient2.sendPing();

    },
    sendPing: function () {

        var m = { "type": "ping" };
       
        mqttClient2.send(m);
        console.log(m);
        //  //console.log("ping send 1");
      //  mainApp.sendToServer(m);
        // //console.log("ping send 2");
    },
    send: function (m) {

      //  mqttClient2.client.publish(serverID + '_' + meetID + '_get_recorder', JSON.stringify(m))
        try {
            mqttClient2.client.publish(serverID + '_' + meetID + '_get_recorder', JSON.stringify(m), mqttClient2.sendOption)
        }
        catch {
            console.error('mqtt send error');
        }
    },
    parse: function (e) {
        var d = Date.now() - 7000;
        if (d < mqttClient2.lastMessageTime) {
            console.log("lastMessageTime");
            return;
        }
        mqttClient2.lastMessageTime = Date.now();
        console.log(e);
        var data = JSON.parse(e);
       

        switch (data.type) {
            case "start":
                myRecorder.start();
                break;
            case "stop":
                myRecorder.start();
                break;
            case "click":
                myRecorder.clienClick();
                break;
             
        }
    },
    sendcaptureEndMessage: function (name) {
        var m = { type: "captureEnd", meetID: meetID, fileName: name, serverID: serverID };
         try {
             mqttClient2.client.publish('recordMeet', JSON.stringify(m), mqttClient2.sendOption);
         }
         catch {
             console.error('mqtt send error');
         }
    }
}
mqttClient2.connect();