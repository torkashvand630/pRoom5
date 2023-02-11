
var iconViduPanel = document.getElementById('iconPanelVidu');
var publisher2;
var session2;
var OV2;

var session3 = 0;
var OV3;

var AsessionId = "a" + board.meetID;
var boardHtmlpanel;
var screenSharePanel;


function joinShRoom() {
    //  return;
    OV2 = new OpenVidu();
    OV2.setAdvancedConfiguration({
        iceServers: [
            { url: "stun:stun.freeswitch.org" },
            {
                urls: "turns:r2.salampnu.com:443?transport=tcp",
                username: "ali",
                credential: "ali"
            }
        ]
    });
    session2 = OV2.initSession();
    session2.on('connectionCreated', function (event) {
        //  console.warn("sh   connectionCreated");
        //   console.warn("sh   connectionCreated");
        //  console.warn(event);
    });
    session2.on('connectionDestroyed', function (event) {
        //  console.warn(" sh   connectionDestroyed event");
        //  console.warn(event);
    });
    session2.on('streamCreated', function (event) {
        // Subscribe to the Stream to receive it. HTML video will be appended to element with 'subscriber' id
        //  console.log("sh streamCreated : ");
        //   console.log(event);
        //  console.log(event.stream);
        var screenSubscriber2;
        if (event.stream.typeOfVideo == "SCREEN") {

            if (session3 != 0 && event.stream.connection.connectionId == session3.connection.connectionId)
                console.warn("this is local chreen ; ");

            else {

                screenSubscriber2 = session2.subscribe(event.stream, 'screenShareElemnt');
                screenSubscriber2.on('videoElementCreated', function (event) {
                    connectToScreenShare();
                    //  console.log("sh ggggggggggg : ");
                    //  console.log(event);
                    //   console.log(event.stream);


                    //  console.log("sh not camera ");

                });
                screenSubscriber2.on('videoElementDestroyed', function (event) {
                    screenControler.disconnectFromScreenShare();
                    panelControler.activeBoard();
                    // console.warn("sh videoElement Destroyed videoElement sss Destroyed event");
                    //  console.warn(event);
                });

            }
        }


        else {
            subscriber2 = session2.subscribe(event.stream, 'videos');

            // When the new video is added to DOM, update the page layout to fit one more participant
            subscriber2.on('videoElementCreated', function (event) {
                //  console.log("fffffffffffffff : ");
                // console.log(event);
                //  console.log(event.stream);

                numOfVideos++;
                updateLayout();
                //  console.log("camera ");

            });
            subscriber2.on('videoElementDestroyed', function (event) {
                //  console.warn("videoElementDestroyed videoElementDestroyed event");
                //  console.warn(event);
            });

        }



    });
    session2.on('streamDestroyed', function (event) {
        //console.log("dddddddddddddddd : ");
        //console.warn(event);
        //console.log("dddddddddddddddd : " + event.stream);
        //// Update the page layout
        //numOfVideos--;
        //updateLayout();
    });
    session2.on('signal', (event) => {
        //  console.log(event.data); // Message
        // console.log(event.from); // Connection object of the sender
        //  console.log(event.type); // The type of message
    });
    getToken(AsessionId).then(token => {

        session2.connect(token)
            .then(() => {


            })
            .catch(error => {
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    });


}

 function startScreenShare1000() {
     if (screenControler.screenShareRemoteStatus) {
        console.log("screenShareRemoteStatus = 1;");
        return;
    }
    iconDisablVidu(6000, MainNavBar);
     iconDisablVidu(6000, iconViduPanel);
     publishScreen();
     return;
    OV3 = new OpenVidu();
    //OV3.setAdvancedConfiguration({
    //    iceServers: [
    //        { url: "stun:stun.freeswitch.org" },
    //        {
    //            urls: "turns:r2.salampnu.com:443?transport=tcp",
    //            username: "ali",
    //            credential: "ali"
    //        }
    //    ]
    //});
    session3 = OV3.initSession();
    getToken(sessionId).then(token => {
        console.log("my token : " + sessionId);
        session3.connect(token)
            .then(() => {
                console.log("my token");
                publisher2 = OV3.initPublisher('screenShareElemnt', { videoSource: "screen", publishAudio: false, audioSource: false }, function (error) {

                    if (error.name == 'SCREEN_EXTENSION_NOT_INSTALLED') {
                        showWarning(error.message);
                    } else if (error.name == 'SCREEN_SHARING_NOT_SUPPORTED') {
                        alert('Your browser does not support screen sharing');
                    } else if (error.name == 'SCREEN_EXTENSION_DISABLED') {
                        alert('You need to enable screen sharing extension');
                    } else if (error.name == 'SCREEN_CAPTURE_DENIED') {
                        alert('You need to choose a window or application to share');
                    }
                });
                publisher2.on('videoElementDestroyed', function (event) {
                    
                    disconnectFromScreenShare();
                });
                publisher2.on('videoElementCreated', function (event) {
                   
                    connectToScreenShare();
                    screenShareStatus = 1;
                    iconEnableVidu(iconViduPanel);
                    iconEnableVidu(MainNavBar);
                    

                    publisher2.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
                        
                        session3.unpublish(publisher2);
                        disconnectFromScreenShare(); 

                    })

                });
                session3.publish(publisher2);
                session3.on('streamDestroyed', event => {
                    //  console.warn(event);
                    if (event.stream.typeOfVideo == "SCREEN") {
                        disconnectFromScreenShare();
                    }
                    
                });
            });
    });
}

var intervalIDkkk = 0;

function kkk() {
    //  session2.publish(publisher2);
    intervalIDkkk = 2;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.....................................................................");
    return;
    publisher2.stream.getMediaStream().addEventListener('inactive', () => {
        //  alert("dddddddd");
        //  console.warn('User pressed the "Stop sharing" button');
        // You can send a signal with Session.signal method to warn other participants
    });
} 

function _viduModulStart() {
    boardHtmlpanel = document.getElementById("boardHtmlpanel");
    screenSharePanel = document.getElementById("screenSharePanel");
    // joinShRoom();
   // console.warn("board.isMobile : " + board.isMobile);
    // if (board.isMobile == 1) return;
    //setInterval(function () {
    //    // var objlist = $("#session video");
    //   // resizingVideoBox();

    //}, 40000);
}
function resizingVideoBox() {
    return;
    var objlist = $('#session video[style*="display: block"]');
    // var objlist = $('#session video');
    var len = objlist.length;
    var bodyClasslist = document.getElementsByTagName('body')[0].classList;
    if (len > 0) {
        if (!bodyClasslist.contains('videos')) {
            document.getElementsByTagName('body')[0].classList.add("videos");
            layout.resizeBoard();
        }
       
    }
    else {
        if (bodyClasslist.contains('videos')) {
            document.getElementsByTagName('body')[0].classList.remove("videos");
            layout.resizeBoard();
        }
       
    }
    var iconPanelVidu = document.getElementById('iconPanelVidu');
    //var per = board.permission.user.permission;
    var hm = 35;
    if (iconPanelVidu.style.display=="none") hm = 0;
    var h = $("#videosBox").height() - hm;
    var w = $("#session").width();
  //  if (layout.sessionPanelPosetion == 1) w = layout.rightPanelwidth-4;
    //console.log("hhh : " + h);
    //console.log("www : " + w);


   
    var t3 = bestMatchCalculate(w, h, len, 0);
    //console.log("t33333333333333333 : " + t3);

    for (var i = 0; i < objlist.length; i++) {
        // console.log(i);

        objlist[i].parentNode.style.width = t3 + "px";
        objlist[i].parentNode.style.height = t3 + "px";
    }
    return;
    // console.log(len);
    if (len == 1) {
        var k = Math.min(h, w);
        // objlist[0].className = "video11";
        objlist[0].style.width = k + "px";
    }
    if (len > 1) {
        var k;
        var q = (w);
        if (h < 280 || len == 2) {
            var q2 = (q / len);
            k = Math.min(h, q2);

        }
        else {
            var h2 = (h) / 2;
            q = ((w * 2));
            //  q = q * 2;
            if (isOdd(len)) len++;
            var q2 = q / (len);
            k = Math.min(h2, q2);
        }
        for (var i = 0; i < objlist.length; i++) {
            // console.log(i);

            objlist[i].style.width = k + "px";
        }

    }
}
function bestMatchCalculate(w, h, n, xxx) {
    var max = Math.max(w, h);
    var min = Math.min(w, h);
    var r = Math.round(max / min);
    //console.log("r : " + r);
    var t = n * r;
    //console.log("t : " + t);
    var t2 = Math.ceil(Math.sqrt(t));
    // t2 = Math.min(t2, n);
    //console.log("t2 : " + t2);
    var t3 = max / t2;
    //console.log("t3 : " + t3);
    var k1 = (Math.ceil(n / t2));
    //console.log("k1 : " + k1);
    var newMin = min / k1;
    //console.log("newMin : " + newMin);
    if (n == 1) t3 = min;
    var t4 = Math.min(newMin, t3);
    //console.log("t4 : " + t4);
    return t4;
    if (newMin < t3) {
        //xxx = xxx+1
        //console.log("callbakk : " + xxx);
        //return bestMatchCalculate(w, h, n, xxx)  
    }
    else {
        return t3;
    }




}

function isOdd(num) { return num % 2; }
viduAppUi = {
    mute_video: document.getElementById('mute-video-span'),
    mute_audio: document.getElementById('mute-audio-span'),
    device_settings_span: document.getElementById('device-settings-span'),
    renserToolbox: function (per) {
        //viduAppUi.mute_video = document.getElementById('mute-video-span');
        //viduAppUi.mute_audio = document.getElementById('mute-audio-span');
        //viduAppUi.leave_room = document.getElementById('leave-room-span');
        //console.log('viduAppUi');
        //console.log(per);
       // viduAppUi.mute_audio.style.display = 'none';
       
        showToolbar(per);
        return;
        //console.log('viduAppUi2');
        //document.getElementById('mute-video').style.display = 'none';
        // viduAppUi.mute_audio.display = 'none';
        if (per.audio) viduAppUi.mute_audio.style.display = 'inline';
        else viduAppUi.mute_audio.style.display = 'none';
        if (per.video) viduAppUi.mute_video.style.display = 'inline';
        else viduAppUi.mute_video.style.display = 'none';
        if (per.audio || per.video) {
            viduAppUi.device_settings_span.style.display = 'inline';
            var iconPanelVidu = document.getElementById('iconPanelVidu');
            iconPanelVidu.style.display = "block";
        }
        else {
            var iconPanelVidu = document.getElementById('iconPanelVidu');
            iconPanelVidu.style.display = "none";
            viduAppUi.device_settings_span.style.display = 'none';
        }
        if (!per.screen) {
            if (screenControler.screenShareStatus)
                screenControler.stopOwnScreenShare();

        }
        resizingVideoBox();
       // if (publisher == undefined) return;
        if (!per.video && !per.audio) {
           
            //var sessionPanel = document.getElementById('session');
            //sessionPanel.style.height=
            //   appUnPublishing();
            if (webrtClient.LocalAudioTrack || webrtClient.LocalVideoTrack)
                webrtClient.stopStream();

            return;
        } 
        if (!per.video && webrtClient.LocalVideoTrack) {
            webrtClient.stopStream();
            return;
        }
        if (!per.audio && webrtClient.LocalAudioTrack) {
            webrtClient.stopStream();
            return;
        }
        //if (per.video) videoEnabled = true;
        //else videoEnabled = false;
    },

};
