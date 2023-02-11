meetManager = {
    parse: function (data) {
        // var action = data.action;
        // switch (action) {
        //     case "end":
        //         meetManager.exit();
        //         break;
        // }
    },
    exit: function () {
        //let canvas = document.getElementsByTagName("canvas")[2];
        //console.log(canvas);
        //let ctx = canvas.getContext("2d");

        //ctx.font = '30px fontawesome';
        //ctx.fillText('\uF064\uF065 \uF0a5', 200, 300);
        //return;
        //stopRecordier();finishRecorder();//
        //console.warn("exit555");
        //return;
        if (board.isRecorder)  parent.stopRecordier();
        
        mainApp.AppStatus.isExit = true;
       // mainApp.socket = undefined;
        //if (webrtClient.LocalAudioTrack || webrtClient.LocalVideoTrack) {
        //    try {
        //        webrtClient.stopStream();
        //    }
        //    catch(e){ console.warn("rror"); }

        //}


        //if (screenControler.screenShareStatus) {
        //    try {
        //        screenControler.stopOwnScreenShare();
                
        //    }
        //    catch(e){ console.warn("rror"); }

        //}

        setTimeout(function () {
            var u = "/" + board.lang+ "/room/start/" + board.meetID
            window.location = u;
           // window.location = board.exitUrl;
            return;
            //var u = window.location.protocol + "//" + window.location.host + "/room/start/" + board.meetID;
           
            //if (board.userName != '2')
               
            //else console.log("username is : 2");

        }, 1000);

    },
    end: function () {
        // if (!board.publish || board.isLimit == 0) return;
        // var m = { type: 'meetManager', action: "end" };
        // mainApp.sendToServer(m);
    },
};