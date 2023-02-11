 

webrtClient = {
    localVideo: document.getElementById("local-video"),
    startBtn: document.getElementById("startBtn"),
    simulcast: false,
    myUserName: null,
    clientLocal: null,
    localStream: null,
    localStream_2: null,
    clientLocal_2: null,
    serverUrl: board.mediaServer,// "ws://95.216.243.8:7000/ws",bnv
    // serverUrl: "ws://95.216.243.8:7000/ws",
    session: "meet_" + board.meetID,
    sessionScreen: "screen_" + board.meetID,
    LocalAudioTrack: false,
    LocalVideoTrack: false,
    localVideoAudioTrack: false,

    signalLocal: null,
    signalLocalScreen: null,
    streamDic: {},
    meterRefreshlist: {},

    localVideoAudioClick: function () {
        if (!board.user.permission.video) return;
        if (webrtClient.localVideoAudioTrack) {
            //iconDisablVidu(2000, iconViduPanel);
            webrtClient.stopStream();
            return;
        }
        //if (this.LocalAudioTrack) {
        //    this.stopStream();
        //  //  setTimeout(() => { publishOwnFeed(true, true) }, 2000);
        //    return;
        //}
        this.start(true, true);


    },

    videoClick: function () {
        iconDisablVidu(3000, iconViduPanel);
        if (!board.user.permission.video) return;
        var v = webrtClient.LocalVideoTrack; var a = webrtClient.LocalAudioTrack;
       
        if (!v && !a) {
            this.start(1, 1);
            return;
        }
        if (!a && v) {
            this.stopStream();
            return;
        }
        if (a && !v) {
            this.addTrack(0, 1);
            //this.stopStream();
            //setTimeout(()=>{ this.start(true, true);}, 1000);
            return;
        }
        if (a && v) {
            // this.removeTrack();
            this.stopStream();
            setTimeout(() => { this.start(1, 0); }, 2000);
            return;
        }
    },
    audioClick: function () {
        iconDisablVidu(3000, iconViduPanel);
        if (!board.user.permission.audio) return;
        var v = webrtClient.LocalVideoTrack; var a = webrtClient.LocalAudioTrack;
        
        if (!v && !a) {
            this.start(1, 0);
            return;
        }
        if (!a && v) {
            this.addTrack(1, 0);
            //this.stopStream();
            //setTimeout(() => { this.start(true, true); }, 2000);
            return;
        }
        if (a && !v) {
            this.stopStream();

            return;
        }
        if (a && v) {
            this.stopStream();
            setTimeout(() => { this.start(0, 1); }, 2000);
            return;
        }
    },
    startApp_1: function () {
       
        webrtClient.signalLocal = new Signal.IonSFUJSONRPCSignal(webrtClient.serverUrl);
        this.clientLocal = new IonSDK.Client(webrtClient.signalLocal);
        webrtClient.signalLocal.onopen = () => this.clientLocal.join(webrtClient.session);
        webrtClient.signalLocal.onclose = () => {
            console.warn("websocket cloooos 1111");
        }
        webrtClient.signalLocal.onerror = () => {
            console.warn("websocket erroor 1111");
        }

        this.clientLocal.ontrack = (track, stream) => {

            //console.log(stream);
            //stream.getTracks().forEach(function (track) {
            //    console.log(track.getSettings());
            //})
            //stream.getTracks().forEach(function (track) {
            //    console.log(track.getConstraints());
            //})
            //  stream.addEventListener("ended", () => console.log("addEventListener streem!"));
            stream.oninactive = function () {
             //   console.log("stream.oninactive");
                document.getElementById("vidioItem_" + stream.id).remove();
               // webrtClient.deactiveMeterRefresh(stream.id);
                resizingVideoBox();
            }
            this.addStream(stream, 0);
            //stream.onended = function () {
            //    console.log("remote streem ended");
            //}
            //console.log(stream);
            //console.log(track);
            //track.addEventListener('ended', () => {
            //    console.log("enddddddddddddddddd");
            //    console.log(track);
            //    //   document.getElementById("st_"+track.id).remove();
            //})
            //  if (track.kind === "video") {

            //track.onended = function () {
            //    console.log("enddddddddddddddddd222");
            //    document.getElementById("vidioItem_" + track.id).remove();

            //}              
            //   }
        };


    },

    startApp_2: function () {
        
        webrtClient.signalLocalScreen = new Signal.IonSFUJSONRPCSignal(webrtClient.serverUrl);
        this.clientLocal_2 = new IonSDK.Client(webrtClient.signalLocalScreen);
        webrtClient.signalLocalScreen.onopen = () => this.clientLocal_2.join(webrtClient.sessionScreen);


        this.clientLocal_2.ontrack = (track, stream) => {
            const tracks = stream.getTracks();
           
            console.log(tracks);
            tracks.forEach(function (t) {
                console.log(t);
            });
            console.warn(stream);
            iconDisablVidu(4000, MainNavBar);
            iconDisablVidu(4000, iconViduPanel);
           
            //stream.addEventListener("ended", () => console.log("addEventListener streem!"));
            stream.oninactive = function () {
               
                document.getElementById("st_" + stream.id).remove();
                screenControler.screenShareRemoteStatus = 0;
                screenControler.disconnectFromScreenShare();
                panelControler.selectNextPanel();
            }


            //track.addEventListener('ended', () => {
            //    //console.log("enddddddddddddddddd screen");
            //    //console.log(track.id);
            //    //   document.getElementById("st_"+track.id).remove();
            //})
            if (track.kind === "video") {
                screenControler.screenShareRemoteStatus = 1;
                var x = document.createElement("VIDEO");
                x.srcObject = stream;
                x.src = stream;
                x.style.width = "99%";
                x.id = "st_" + stream.id;
                x.autoplay = true;
                document.getElementById('screenShareElemnt').appendChild(x);
                screenControler.connectToScreenShare();
                //  setTimeout(() => { screenControler.connectToScreenShare() }, 3000);
                //track.onended = function () {
                //    //console.log(track.id);
                //    //document.getElementById("st_" + track.id).remove();

                //}

                //return;


            }
        };


    },

    addTrack: function (audio, video) {
        var videoDev = false;
        if (video) {
            videoDev = { deviceId: device.videoDevice }
        }
        var audioDev = false;
        if (audio) {
            audioDev = { deviceId: device.audioDevice }
        }
        IonSDK.LocalStream.getUserMedia({ resolution: "qvga", simulcast: false, audio: audioDev, video: videoDev })
            .then((stream) => {
                var t = stream.getTracks()[0];
                
                webrtClient.localStream.addTrack(t);
                webrtClient.addStream(webrtClient.localStream, 1);
                webrtClient.localStream.publishTrack(t);
            });
    },

    removeTrack: function () {
        const tracks = webrtClient.localStream.getTracks();

        tracks.forEach(function (t) {
            if (t.kind == 'video') {
                

                webrtClient.localStream.removeTrack(t);
                t.stop();
                webrtClient.LocalVideoTrack = 0;
                document.getElementById('mute-video').style.color = "black";
                webrtClient.addStream(webrtClient.localStream, 1);
                // webrtClient.clientLocal.publish(webrtClient.localStream);
            }
        });
    },

    startApp: function () {
        // clientLocal_2.close();
        if (this.clientLocal)
            this.clientLocal.close();
        if (this.clientLocal_2)
            this.clientLocal_2.close();
        this.startApp_1();
        this.startApp_2();
        var pingInterval1 = setInterval(webrtClient.pingInterval, 20000);

    },
    stopStream: function () {
        this.localStream.unpublish();

        const tracks = this.localStream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });



    },
    addStream: function (stream, isLocal) {
        var audio = 0; var video = 0;
        const tracks = stream.getTracks();
       
       

        tracks.forEach(function (t) {
            if (t.kind == 'video') video = 1;
            if (t.kind == 'audio') audio = 1;
            
        });
        if (isLocal) {
            if (video == 1) {
                this.LocalVideoTrack = 1;
                document.getElementById('mute-video').style.color = "red";
            }
            else {
                // this.LocalVideoTrack = 0;
            }
            if (audio == 1) {
                this.LocalAudioTrack = 1;
                document.getElementById('mute-audio').style.color = "red";
            }
            else {
                // this.LocalAudioTrack = 0;
            }
            var m = { type: "userManager", action: "addStream", streamId: stream.id, video: video, audio: audio };
            mainApp.sendToServer(m);
        }
        var id = 'vidioItem_' + stream.id;
        if (document.getElementById(id)) {
            document.getElementById(id).remove();
            
            // return;
        }
        var x = document.createElement("VIDEO");
        x.srcObject = stream;
        x.src = stream;
        x.style.width = "99%";
        x.id = "st_" + stream.id;
        x.autoplay = true;
        x.classList = 'rounded centered videoItem';
        if (isLocal) x.muted = true;
        var newDiv = document.createElement("div");

        newDiv.id = id;
        newDiv.appendChild(x);
        var videos_panel = document.getElementById('videos');//.appendChild(newDiv);

        var displayStyle = "block";
        if (video) {
            videos_panel.appendChild(newDiv);
            newDiv.classList += "videoItemPanel vidioItem_0";

        }
        else {
            displayStyle = "none";
            videos_panel.insertBefore(newDiv, videos_panel.firstChild);
        }
        x.style.maxWidth = '100%';
        x.style.display = displayStyle;
       // webrtClient.handleSuccess(stream);
        resizingVideoBox();
    },
    start: function (audio, video) {
        var videoDev = false;
        if (video) {
            videoDev = { deviceId: device.videoDevice }
        }
        var audioDev = false;
        if (audio) {
            audioDev = { deviceId: device.audioDevice }
        }
        IonSDK.LocalStream.getUserMedia({ resolution: "qvga", simulcast: false, audio: audioDev, video: videoDev })
            .then((stream) => {
                stream.id = "screen" + stream.id;
                //stream.getTracks().forEach(function (track) {
                //    track.contentHint = 'fffffffffffffffffffffff';
                //    track.applyConstraints({ contentHint: 'ggggggggggggggggg' });
                //    console.log(track);
                //})


               
                //console.log(this.clientLocal);
                webrtClient.localStream = stream;
                webrtClient.clientLocal.publish(stream);
                stream.oninactive = function () {
                  
                    webrtClient.LocalVideoTrack = 0;
                    webrtClient.LocalAudioTrack = 0;
                    document.getElementById('mute-video').style.color = "black";
                    document.getElementById('mute-audio').style.color = "black";
                    // webrtClient.localVideoAudioTrack = false;
                    document.getElementById("vidioItem_" + stream.id).remove();
                  //  webrtClient.deactiveMeterRefresh(stream.id);
                    resizingVideoBox();
                    m = { type: "userManager", action: "removeStream" };
                    mainApp.sendToServer(m);
                }

                this.addStream(stream, 1);


                // webrtClient.localVideoAudioTrack = true;



            })
            .catch(console.error);

    },

    startScreen: function () {
        if (navigator.mediaDevices.getDisplayMedia) {
            IonSDK.LocalStream.getDisplayMedia({ video: true, resolution: 'vga', audio: true }).then(stream => {
                //  stream.ttt = "hhh";
                this.localStream_2 = stream;
                //  stream.oninactive = {}; stream.oninactive.name = "hhhhhhhhh";
              
                stream.oninactive = function () {
                   
                    document.getElementById("st_" + stream.id).remove();
                    stream.unpublish();
                    screenControler.screenShareStatus = 0;
                    screenControler.disconnectFromScreenShare();
                    panelControler.selectNextPanel();
                    clearInterval(intervalID2);
                };
                this.clientLocal_2.publish(stream);
                var x = document.createElement("VIDEO");
                x.srcObject = stream;
                x.src = stream;
                x.style.width = "99%";
                x.id = "st_" + stream.id;
                x.autoplay = true;
                document.getElementById('screenShareElemnt').appendChild(x);
                screenControler.screenShareStatus = 1;
                screenControler.connectToScreenShare();
                var m = { type: 'panelControler', action: 'screen' };
                var res = mainApp.sendToServer(m);
                var intervalID2 = setInterval(webrtClient.interval, 3000);
            });
            /*  navigator.mediaDevices.getDisplayMedia({video: true}).then(stream => {
               console.log(stream);
               clientLocal.publish(stream);
             }); */
        }
    },
    stopScreen: function () {
        this.localStream_2.unpublish();
        const tracks = this.localStream_2.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

    },
    interval: function () {
       
        var m = { type: 'panelControler', action: 'screen' };
        var res = mainApp.sendToServer(m);
    },
    pingInterval: function () {
        var m = { method: 'ping' };


        try {
            webrtClient.signalLocal.socket.send(JSON.stringify(m));
            webrtClient.signalLocalScreen.socket.send(JSON.stringify(m));
           // console.log('ping interval ');
        } catch {
            console.log('ping interval erroor');
        }
    },
    reset: function () {

    },
    handleSuccess: function (stream) {
        return;
        //https://webrtc.github.io/samples/src/content/getusermedia/volume/
        let meterRefresh = null;
        if (webrtClient.meterRefreshlist[stream.id]) {
            console.warn("meterFefresh is exist : " + stream.id);
            return;
        }
        else {
            webrtClient.meterRefreshlist[stream.id] = 1;
        }
        //var stObjTest = webrtClient.streamDic[stream.id];
        //if (stObjTest) {
        //    if (stObjTest.meterRefresh) {
        //        console.warn("meterFefresh is exist : " + stream.id);
        //        return;
        //    }
        //}
        // window.AudioContext = window.AudioContext || window.webkitAudioContext;
        //  window.audioContext = new AudioContext();
        // Put variables in global scope to make them available to the
        // browser console.
        // window.stream = stream;
        console.warn("stream add meterrefresh : " + stream.id);
        const soundMeter  = new SoundMeter(new AudioContext());
        soundMeter.connectToSource(stream, function (e) {
            if (e) {
                console.log(e);
                return;
            }
            meterRefresh = setInterval(() => {
               // console.log(stream.active);
               // console.warn(stream.id + " : " + soundMeter.instant.toFixed(2));
                var stObj = webrtClient.streamDic[stream.id];
                if (stObj) {
                    var isActive = 0;
                    if (soundMeter.instant.toFixed(2) > 0.01) {
                        isActive = 1;
                      //  console.warn("oooooooooooooo " + stObj.name);
                    }
                    else isActive = 0;
                    stObj.isActive = isActive;
                    webrtClient.setStreamIsActiveIcon(stObj);
                   // stObj.meterRefresh = meterRefresh;
                }

                if (!stream.active) {
                    console.warn("stream.active false " + stream.id);
                    clearInterval(meterRefresh);
                }
 
            }, 1500);
            //stream.oninactive += function gg(){
            //    console.warn("bbbbbbbbbbbbbbbbbb ");
            //    clearInterval(meterRefresh);
            //}
        });
    },
    setStreamIsActiveIcon: function (stObj) {
        var icon = document.getElementById('streamIcon_' + stObj.name);
        if (icon != undefined) {
            if (stObj.isActive) icon.style.color = "green";
            else icon.style.color = "black";
        }
    },
    deactiveMeterRefresh: function (streamID) {
        var stObj = webrtClient.streamDic[streamID];
        if (stObj) {
          //  clearInterval(stObj.meterRefresh);
        }
    }
}



