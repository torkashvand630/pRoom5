
var constraints = {
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
//constraints.cursor = "never";
//constraints.frameRate = 5;
//constraints.video.cursor = "never";
//constraints.video.frameRate = 5;
let captureStream = null;
function addAudioTrack(track) {
    console.warn("track add befor");
    console.log(track);
    captureStream.addTrack(track);
    console.warn("track add end");
}
async function startCapture() {
    setTimeout(() => { document.title = "hhhh " }, 1000);
    captureStream = await navigator.mediaDevices.getDisplayMedia(constraints);
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
setTimeout(() => { startCapture(); }, 2000);
let chunks = [];
var mediaRecorder = null;
let onSuccess = function (stream) {
    //var options2 = {
    //    audioBitsPerSecond: 32000,
    //    videoBitsPerSecond: 940000,
    //}
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    setTimeout(() => {
        stopRecordier();
    }, 200000);
    mediaRecorder.onstop = function (e) {

        const blob = new Blob(chunks, { mimeType: "video/webm" });
        download(blob, "jjjj");
        uploadFiles(blob);
        getSeekableBlob(blob, function (jj) {
            download(jj, "jjjj");

        });
        chunks = [];
    }

    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
        //uploadFiles(chunks);
    }
}

function stopRecordier() {
    console.log("mediaRecorder stop");
    if (mediaRecorder.state == "recording")
        mediaRecorder.stop();
    var mediaStreamTracks = captureStream.getTracks();
    mediaStreamTracks.forEach(track => track.stop());

}


function uploadFiles(blob) {

    return;

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
   // uploadFiles(recordedChunks);
    var url = URL.createObjectURL(recordedChunks);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = fileName + ".webm";
    a.click();
    window.URL.revokeObjectURL(url);

}