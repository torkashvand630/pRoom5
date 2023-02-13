let webRtcControler = {
    isActive: 0,
    lastChangeTime: Date.now(),
    isConnect : 0,
    screenShareSuport: navigator.mediaDevices &&  "getDisplayMedia" in navigator.mediaDevices,
    load: function () {
        //load_script_promise("http://localhost:8080/sample.ts",)//"http://localhost:3000/mediasoup-demo-app.js?v=1.03")//
        //    .then(function (script) {
        //        $('#loadingModal').hide();
        //    });
       // layout.element.sidebar_wrapper.style.display =  "block";
       
        var nName = board.nickName;
        if (nName.length > 5) nName = nName.substring(0, 5)
        appActions.connectWebrtc(board.mediaServer, board.meetID + '&' + board.userName + '&' + nName.trim())//board.mediaServer
        return;
         var obj = { roomId: board.meetID, joinVideo: false, joinAudio: false };
        try {
            window.CLIENT.join(obj);
        } catch {
            console.log('error in join')
        }
        return;
        var obj = document.getElementById('loadingModalHeder');
        setTimeout(() => {
            obj.innerText = 'loading conference script ...';
          //  console.log(window.CLIENT)
        }, 10000)
        load_script_promise( "/js/mediasoup-demo-app-min.js?v=1.06")//"http://localhost:3000/mediasoup-demo-app.js?v=1.03")//
            .then(function (script) {
                $('#loadingModal').hide();
            });
       // $('#loadingModal').hide();
    },
  
    click: function () {
        
        var m = { type: 'panelControler', action: 'Conference' };
        var res = mainApp.sendToServer(m);


        
    },
    start: function () {
        panelControler.activeConference();
        webRtcControler.isActive = 1;
    },
    parse: function (data) {
    },
    onConnectToRoom: function () {
        webRtcControler.isConnect = 1;
        $$$('iconPanelVidu').style.display = 'block';
    },
    onDisonnectToRoom: function () {
        webRtcControler.isConnect = 0;
        $$$('iconPanelVidu').style.display = 'none';
    },
    permission: function (per) {
        
        //if (window.CLIENT) {
        //    var perm = { a: per.audio, v: per.video, s: per.screen }
        //    window.CLIENT.setPermissions(perm)
        //}
        //var ExtraVideo = document.getElementsByClassName("canProduceExtraVideo");
        //console.log(ExtraVideo);
        //if (!per.video) {
        //    try { ExtraVideo[0].style.display = "none"; } catch {}
        //}
        //else try { ExtraVideo[0].style.display = "flex"; } catch { }
        

        var mic = document.getElementById('mute-audio-span');
        var webcam = document.getElementById('mute-video-span');
        //var changwebcam = document.getElementById('soapChangWebcam');
        var share = document.getElementById('mute-screen-span');



        if (mic) {
            if (per.audio) mic.style.display = 'inline';
            else {
                mic.style.display = 'none';
                appActions.disableAudio()
            }
        }
        if (webcam) {
            if (per.video) webcam.style.display = 'inline';
            else {
                webcam.style.display = 'none';
                appActions.disableVideo()
            }
        }
        
        //if (changwebcam) {
        //    if (per.video) changwebcam.style.display = 'block';
        //    else changwebcam.style.display = 'none';
        //}
        if (share) {
            if (per.screen && webRtcControler.screenShareSuport) share.style.display = 'inline';
            else {
                share.style.display = 'none';
                appActions.disableScreen()
            }
        }
        //try {
        //    if (!per.audio && window.CLIENT) {
        //        window.CLIENT.disableMic();
        //    }
        //    if (!per.video && window.CLIENT) window.CLIENT.disableWebcam();
        //    if (!per.screen && window.CLIENT) window.CLIENT.disableShare();
        //} catch {

        //}
       
    },
    firstPermisson: function () {
        var per = board.user.permission;
        webRtcControler.permission(per);
    },

    CHANGEMYPEER: function () {
        var t = Date.now();
        var millis = t - webRtcControler.lastChangeTime;
        var diff = Math.floor(millis / 1000);
        if (diff < 1) {
           
            return;
        }
        
        webRtcControler.lastChangeTime = t;
        setTimeout(() => {
            //  console.log('reeeeww');
            try {
                appActions.setVideoElementSize1();
            } catch { console.warn('window.CLIENT is null'); }
        }, 150)
        setTimeout(() => {
          //  console.log('reeeeww');
            try {
                appActions.setVideoElementSize1();
            } catch { console.warn('window.CLIENT is null'); }
        },1000)
       
        return;
        if (window.CLIENT) {
            try {
                window.CLIENT.chanemypeer();
            } catch { console.warn('window.CLIENT is null');}
           
        }
        else {
          //  console.warn('window.CLIENT is null');
        }
    },
    startScreen: function () {
       // console.log('screen start client')
        webRtcControler.click();
        return;
        var m = { type: 'panelControler', action: 'setDisplayMode', mode:'filmstrip' };
        var res = mainApp.sendToServer(m);
    },
    stopScreen: function () {
        return;
        console.log('screen stop client')
        var m = { type: 'panelControler', action: 'setDisplayMode', mode: 'democratic' };
        var res = mainApp.sendToServer(m);
    },

} 