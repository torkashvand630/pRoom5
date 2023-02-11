function ddd() {
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.2.0/fabric.min.js";

    console.log("start ..");
    var c = document.getElementById("id_viewer");
    var cArabic = c.getContext("2d");
    var canvas = new fabric.Canvas('id_viewer');
    var activeObject = canvas.getActiveObject();
    console.log(activeObject.type);
  
    cArabic.font = "20px Arial";

    //option 1 : adding right-to-left mark at the end to put the '.' between two strong right to left charachters, so it will treated as right to left.
    var str1 = "این یک آزمایش است." + "\u200F";

    //option 2 : adding right-to-left override at the begining of the text so every neutral charachter afterward becomes righ to left.
    var str2;
    str2 = "\u202E";
    str2 += "این یک آزمایش است.";
    //           you might want to finish the override by 'pop directional formatting' charachter
    str2 += "\u202C";

    cArabic.fillText(str1, 200, 30);
    cArabic.fillText(str2, 200, 70);
}

var vPlayer = {
    //isHide: 1,
    isActive: 0,
    player: null,
    interval: null,
    url: null,
    isLoad: 0,
    ytIsLoad:0,
    admin: null,

    firstLoad: async function (data) {
        //console.log(data); 
        if (board.publish) $(".vPlayerIconPanel").css("display", "block"); // document.getElementById('vPlayerIconPanel').style.display = "block";
        var m = data.m;
        if (m == null) return;
        vPlayer.url = m.url;
        document.getElementById('externalVideoInput').value = m.url;
        if (data.isActive) {
            var userName = m.meetInfo.userName;

            if (userName == board.userName)
            await vPlayer.startPlay();
        }
    },
    show: function () {
        vPlayer.isActive = 1;
       
        panelControler.activePlayer();
    },
    start: async function (force) {
        console.log("start ..");
        console.log(vPlayer.url);
       // if (vPlayer.isActive) return;
       // document.getElementById('vPlayerSource').src = vPlayer.url;
        if (!vPlayer.isLoad) {
            var videocssUrl ="/css/video-js.css";
           

            await load_script_promise("/js/video3.min.js")
                .then(function (script) {
                    

                    vPlayer.isLoad = 1;
                    document.getElementsByTagName("head")[0].insertAdjacentHTML(
                        "beforeend",
                        "<link rel=\"stylesheet\" href='" + videocssUrl + "' />");
                  
                })
            
        }
        if (vPlayer.url.includes("youtube.com") && vPlayer.ytIsLoad==0) {
            await load_script_promise("/js/youtube.js")
                .then(function (script) {
                    vPlayer.ytIsLoad = 1;
                    console.log('youtube js load');
                });
        }
       // await sleep(5000);
        vPlayer.isActive = 1;
        if (force) vPlayer.show();
       // vPlayer.player = videojs.players.myVideo;
        vPlayer.player = videojs('myVideo');
        if (vPlayer.url.includes("youtube.com"))
            vPlayer.player.src({ src: vPlayer.url, type: 'video/youtube' });
        else
        vPlayer.player.src(vPlayer.url);
       
        //if (!vPlayer.isLoad) {
        //    vPlayer.loadScriptForce();
          
        //    await vPlayer.loadScript();
            
        //}
        //vPlayer.show(); 
       
        //vPlayer.player = videojs('my-video');
        //videojs('myVideo').ready(function () {
        //    vPlayer.player = this;
        //    vPlayer.player.src({ type: 'video/youtube', src: vPlayer.url});
        //});
       
        
    },
    stop: function () {
        if (vPlayer.interval != null) {
            clearInterval(vPlayer.interval);
            vPlayer.interval = null; 
        }
        if (vPlayer.player != null) vPlayer.player.pause();
        
    },
    Preparation: async function () {
        //if (!vPlayer.isLoad) {
        //    vPlayer.loadScriptForce();
        //    await vPlayer.loadScript();
        //}
        $('#externalVideoModal').modal('show');
        if (vPlayer.url != null) document.getElementById('videoPlayerButton').style.display = "block";
        else document.getElementById('videoPlayerButton').style.display = "none";
        document.getElementById('externalVideoMessage').innerText = '';
        if (vPlayer.url != null) document.getElementById('externalVideoInput').value = vPlayer.url;
    },
    startPlayToServer: async function () {

        var url = document.getElementById('externalVideoInput').value;
        if (url.trim() == "" || url == null) {
            document.getElementById('externalVideoMessage').innerText = board.translate.player_emptyInputMessage;
            return;
        }

        var m2 = { type: 'panelControler', action: 'vPlayer' };
        var res2 = mainApp.sendToServer(m2);
        var m = { type: 'vPlayer', action: 'setAdmin', mode: 'startPlay', time: 0, url: url };
        console.log(m);
        var res = mainApp.sendToServer(m); 

    },
    continuPlayToServer: async function () {
       
        var url = document.getElementById('externalVideoInput').value;
        if (url.trim() == "" || url == null) {
            document.getElementById('externalVideoMessage').innerText = board.translate.player_emptyInputMessage;
            return;
        }
        var m2 = { type: 'panelControler', action: 'vPlayer' };
        var res2 = mainApp.sendToServer(m2);
       // panelControler.nextPanel = "player";
        var m = { type: 'vPlayer', action: 'setAdmin', mode: 'continuPlay', time: 0, url: vPlayer.url };
        var res = mainApp.sendToServer(m);
      
    },
    startPlay: async function () {
        console.log('startPlay');
        if (vPlayer.url.trim() == "error"  ) {
            document.getElementById('externalVideoMessage').innerText = "eroor in get file";
            return;
        }
        //var url = document.getElementById('externalVideoInput').value;
        //if (url.trim() == "" || url == null) {
        //    document.getElementById('externalVideoMessage').innerText = board.translate.player_emptyInputMessage;
        //    return;
        //}
        
        panelControler.nextPanel = "player";
        $('#externalVideoModal').modal('hide');
        console.log(vPlayer.url);
      //  vPlayer.url = url;
        var m = { type: 'vPlayer', action: 'startPlay', time: 0, url: vPlayer.url };
        var res = mainApp.sendToServer(m);
        await vPlayer.start();
        vPlayer.setEvent();
        vPlayer.interval = setInterval(vPlayer.getStatus, 5000);
    },
    continuPlay: function () {
       
        //var url = document.getElementById('externalVideoInput').value;
        //if (url.trim() == "" || url == null) {
        //    document.getElementById('externalVideoMessage').innerText = board.translate.player_emptyInputMessage;
        //    return;
        //}
       // panelControler.nextPanel = "player";


        $('#externalVideoModal').modal('hide');
        vPlayer.show();
        var m = { type: 'vPlayer', action: 'continuPlay', time: 0, url: vPlayer.url };
        var res = mainApp.sendToServer(m);
        vPlayer.interval = setInterval(vPlayer.getStatus, 5000);
    },
    setEvent: function () {
        
        vPlayer.player.on('play', function () {
           
            var m = { type: 'vPlayer', action: 'play', time: vPlayer.player.currentTime(), url: vPlayer.url  };
            var res = mainApp.sendToServer(m);
        });
        vPlayer.player.on('pause', function () {
            
            var m = { type: 'vPlayer', action: 'pause', time: vPlayer.player.currentTime(), url: vPlayer.url };
            vPlayer.sendMessage(m);
        });
        vPlayer.player.on('seeking', function () {
           
            var m = { type: 'vPlayer', action: 'seeking', time: vPlayer.player.currentTime(), url: vPlayer.url  };
            vPlayer.sendMessage(m);
        });
        vPlayer.player.on('seeked', function () {
            
            var m = { type: 'vPlayer', action: 'seeked', time: vPlayer.player.currentTime(), url: vPlayer.url  };
            vPlayer.sendMessage(m);
        });
        
    },
    sendMessage: function (m) {
        if (vPlayer.interval == null) {
            console.log("player interval is null ");
            return;
        }
        var res = mainApp.sendToServer(m);
    },
    getStatus: function () {
        var m = { type: 'vPlayer', action: 'setTime', time: vPlayer.player.currentTime(), url: vPlayer.url };
        if (vPlayer.player.paused()) {
            //console.log("paus status");
            m.status = "paused";
        }
        else {
            //console.log("play status");
            m.status = "play";
        }
       // console.log(m);
        mainApp.sendToServer(m);
        //setTimeout(() => {
        //    vPlayer.getStatus();
        //},10000);
    },

    parse: async function (data) {
       // console.warn(data);
        var action = data.action;
        var userName = data.meetInfo.userName;
        if (action == 'setAdmin') {
            await vPlayer.setAdminParse(data);
            return;
        }
     //   panelControler.nextPanel = "player";
       
        if (board.userName == userName)  return;
        var url = data.url;
        if (vPlayer.url == null || vPlayer.url != url || !vPlayer.isActive) {
            vPlayer.url = url;
            await vPlayer.start();
        }
        //else panelControler.activePlayer();
      //  if (vPlayer.isActive && panelControler.activePanel) vPlayer.show();         
       
       
        
        switch (data.action) {
            case "play":
                vPlayer.play(data);
                break;
            case "pause":
                vPlayer.pause(data);
                break; 
            case "seeking":
                vPlayer.seeking(data);
                break;
            case "setTime":
                vPlayer.setStatus(data);
                break; 
            case "startPlay":
                panelControler.nextPanel = "player";
                break;
            case "continuPlay":
                panelControler.nextPanel = "player";
                break;
        }
    },
    setAdminParse: async function (data) {
        clearInterval(vPlayer.interval);
        vPlayer.interval = null;
        vPlayer.admin = data.meetInfo.userName;
        if (vPlayer.admin != board.userName) {
            console.warn("vPlayer.admin :"+vPlayer.admin);
            return;
        }
        vPlayer.url = data.url;
        var mode = data.mode;
        console.log(mode);
        if (mode == 'startPlay') {
            await vPlayer.startPlay();
        }
        else {
            vPlayer.continuPlay();
        }
    },


    play: function (data) {
        var time = data.time;
        vPlayer.player.currentTime(time);
        vPlayer.player.play();
    },
    pause: function (data) {
        var time = data.time;
        vPlayer.player.currentTime(time);
        vPlayer.player.pause();
    },
    seeking: function (data) {
        var time = data.time;
        vPlayer.player.currentTime(time);

    },
    setStatus: function (data) {
        var time = data.time;
        var myTime = vPlayer.player.currentTime;
        var v = Math.abs(time - myTime);       
        if (v < 20) return;
        var status = data.status;        
        if (status == "play") vPlayer.play(data);
        else vPlayer.pause(data);
    },

    loadScript:async function () {
        console.log("load script call");
       // for (var i = 1; i < 10; i++) {
         await sleep(2000);
         if (!vPlayer.isLoad) await vPlayer.loadScript();
            //console.log("load script ..  " + i);
            //sleep(2000).then(() => {
            //    console.log("load script ..  " + i);
            //    //if (vPlayer.isLoad) return;
            //    //    else return;
            //});
       // }
            
         console.log("load script call 2222222222222222222222222222222222222222222");
         return;
       // this.loadScript();
        //setTimeout(() => {
        //    if (!vPlayer.isLoad) vPlayer.loadScript();
        //    else return;
        //}, 2000);
    },
    loadScriptForce: function () {
        console.log("scrip load start ........");
        var script = document.createElement('script');
        script.onload = function () {
            vPlayer.isLoad = 1;
            console.log("script is load .........");
        };
        script.src = "/js/video.min.js";

        document.head.appendChild(script); //or something of the likes
        document.getElementsByTagName("head")[0].insertAdjacentHTML(
            "beforeend",
            "<link rel=\"stylesheet\" href=\"/css/video-js.css\" />");
    }
      
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function load_script_promise(url) {
    return new Promise(function (resolve, reject) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.addEventListener('load', function () {
            this.removeEventListener('load', arguments.callee)
            resolve(script)
        })
        script.src = url
        head.appendChild(script)
    })
}