

function setHost() {
    if (board.isHost == 1) {
        console = {};
        console.log = function () { };
        console.warn = function () { }
        console.info = function () { }
        console.Error = function () { }
        console.error = function () { }
        console.debug = function () { }
        window.console = console;
    }
    else board.isHost = 0;
}
setHost();

function setZoom(zoom, el) {
    //board.zoomScale = zoom;
    transformOrigin = [0, 0];
    el = el || instance.getContainer();
    var p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        // el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    // el.style["transformOrigin"] = oString;

}
board.zoomScale2 = 1;
function setZoomOUT() {
    var zoomScale = (90 * board.zoomScale) / 100;
    board.zoomScale = zoomScale;
    var obj = document.getElementById('boardContainer');// document.getElementById('newBoard2');
    setZoom(zoomScale, obj);
    setToolbarPosation();
}
function setZoomIN() {
    var zoomScale = (110 * board.zoomScale) / 100;
    board.zoomScale = zoomScale;
    var obj = document.getElementById('boardContainer');// document.getElementById('newBoard2');
    setZoom(zoomScale, obj);
    setToolbarPosation();
}
//setZoom(5,document.getElementsByClassName('container')[0]);
var zoomScale2 = 10;
function showVal(a) {
    var zoomScale = Number(a) / 10;
    var obj = document.getElementById('whiteboardContainer');
    setZoom(zoomScale, obj);
    //var obj = document.getElementById( 'whiteboardCanvas1');
    //setZoom(zoomScale, obj);
    // var obj = document.getElementById( 'mtc1');
    //setZoom(zoomScale, obj);
}
//document.getElementById('whiteboardContainer').addEventListener("wheel", event => {
//    const delta = Math.sign(event.deltaY);
//    var dir = (delta > 0) ? 0.1 : -0.1;
//    var zoomScale3 = zoomScale2 + dir;
//    if (zoomScale3 >= 0 && zoomScale3 <= 20) {
//        zoomScale2 = zoomScale3;
//        var zoomScale = zoomScale2 / 10;
//        console.info(delta + " : " + zoomScale2);
//        var obj = document.getElementById('whiteboardContainer');
//        setZoom(zoomScale, obj);
//    }

//});
function mmm() {
    whiteboard.addConvas("#whiteboardContainer");
    //console.log("mmmm");
}
function preConvas() {
    //whiteboard.nextConvas("");
    var num = whiteboard.num - 1;
    whiteboard.activeConvas(num);
    //console.log("mmmm");
}
function nextConvas() {
    var num = whiteboard.num + 1;
    whiteboard.activeConvas(num);

}
function toPage(m) {
    if (!board.user.permission.toolBox) return;
    // bboard.activePage(bboard.fileID, m);
    //  whiteboard.activeConvas(m);

    p = { type: 'board', action: 'pageSelect', p: m, f: bboard.fileID, m: '', };
    mainApp.sendToServer(p);
    // fileService.activeFileServer(bboard.fileID, m);

}
window.onload = function () {

}
function createBoardPaging(f) {

    var s = "";// ' <ul style="float:left;margin-bottom: 0px;" class="pagination"> ';
    for (var i = 1; i <= f; i++) {
        // var t = '<li class="page-item"><a onclick="toPage(' + i + ')" id="toPage' + i + '" class="page-link" href="#">' + i + '</a></li>'
        var t = '<option value="' + (i - 1) + '">' + i + '</option>';
        var t = '<option value=' + (i - 1) + '>' + i + '</option>';
        s = s + t;
    }
    s += '</ui>';
    // document.getElementById("boardPagingPanel").innerHTML = s;
    document.getElementById("inputGroupSelect04").innerHTML = s;
}
//document.getElementById('inputGroupSelect04').onchange = function () {
//    var p = document.getElementById('inputGroupSelect04').value;
//    var a = parseInt(p);
//    toPage(a);
//}
function prevPage() {
    var p = document.getElementById('inputGroupSelect04').value;

    var a = parseInt(p);
    if (a == 0) return;

    toPage(a - 1);
}
function nextPage() {
    var p = document.getElementById('inputGroupSelect04').value;
    var a = parseInt(p) + 1;
    var f = bboard.fileList[bboard.fileID];
    //console.log(f);
    if (a < f.pageCount)
        toPage(a);
}
function showToolbar(per) {
    if (board.publish) $(".screanShareIcon").css("display", "block");
    webRtcControler.permission(per);
    if (per.toolBox == 0) {
        document.getElementsByTagName('body')[0].classList.remove("boardEditor");
        //  $(".screanShareIcon").css("display", "none");
        //  $(".screanShareIcon").css("display", "none");
        //whiteboard.permission = 0;//ggggggggg
        //whiteboard.setTool("pen");
        //document.getElementById('boardPagingPanel').classList.add("disabledbutton");
        //document.getElementById('toolbar').style.display = "none";
        //document.getElementsByClassName('boardIcon')[0].style.display = "none";
    }
    if (per.toolBox == 1) {
        document.getElementsByTagName('body')[0].classList.add("boardEditor");
        //  $(".screanShareIcon").css("display", "none");
        //  $(".screanShareIcon").css("display", "none");
        //whiteboard.permission = 1;
        //document.getElementById('boardPagingPanel').classList.remove("disabledbutton");
        //document.getElementById('toolbar').style.display = "block";
        //document.getElementsByClassName('boardIcon')[0].style.display = "block";
    }
    //resizeNewBoard();
    bboard.changePage(bboard.pageID);
    if (per.file == 0) {
        //document.getElementById('fileUploadPanel').style.display = "none";      
        //$('.selectFileToWithboard').hide();
        document.getElementsByTagName('body')[0].classList.remove("file");
    }
    if (per.file == 1) {
        //document.getElementById('fileUploadPanel').style.display = "block";
        //$('.selectFileToWithboard').show();
        document.getElementsByTagName('body')[0].classList.add("file");
    }

    if (per.chat == 0) {
        document.getElementById('chatInputPanel').style.display = "none";
    }
    if (per.chat == 1) {
        document.getElementById('chatInputPanel').style.display = "block";
    }

    //if (per.screen == 0) {
    //    // document.getElementsByClassName('screanShareIcon')[0].style.display = "none";
    //    $(".mute-screen-span").css("display", "none");
    //}
    //if (per.screen == 1) {
    //    // document.getElementsByClassName('screanShareIcon')[0].style.display = "block";
    //    $(".mute-screen-span").css("display", "block");
    //}

    if (per.diagram == 0) {
        //  document.getElementsByTagName('body')[0].classList.remove("diagram");
        // document.getElementsByClassName('diagramIcon')[0].style.display = "none";
        $(".diagramIcon").css("display", "none");
    }
    if (per.diagram == 1) {
        // document.getElementsByTagName('body')[0].classList.add("diagram");
        // document.getElementsByClassName('diagramIcon')[0].style.display = "block";
        $(".diagramIcon").css("display", "block");

    }

    if (per.MathEditor == 0) {
        //  document.getElementsByTagName('body')[0].classList.remove("diagram");
        try {
            document.getElementsByClassName('MathEditorIcon')[0].style.display = "none";
        } catch {}
       
        $(".MathEditorIcon").css("display", "none");
    }
    if (per.MathEditor == 1) {
        // document.getElementsByTagName('body')[0].classList.add("diagram");
        // document.getElementsByClassName('MathEditorIcon')[0].style.display = "block";
        $(".MathEditorIcon").css("display", "block");
    }
    if (per.Develop == 0) {
        //  document.getElementsByTagName('body')[0].classList.remove("diagram");
        try {
            document.getElementsByClassName('MathEditorIcon')[0].style.display = "none";
        } catch {}
       
        $(".developPanelIcon").css("display", "none");
    }
    if (per.Develop == 1) {
        // document.getElementsByTagName('body')[0].classList.add("diagram");
        // document.getElementsByClassName('MathEditorIcon')[0].style.display = "block";
        $(".developPanelIcon").css("display", "block");
    }
    if (per.offic == 0) {
        try {
            document.getElementsByTagName('body')[0].classList.remove("offic");
        } catch {}
        
        //  document.getElementById('fileOfficUploadPanel').style.display = "none";
        //    stylesheet =  window.top.document.styleSheets[0];
        // var stylesheet = document.createElement('style');        
        //  document.head.appendChild(stylesheet);
        //  stylesheet.insertRule(".officItem { display:  none ;}", 1);
        //  $('.officItem').hide();

        //if (document.styleSheets[0] == undefined) {
        //    var head = document.head || document.getElementsByTagName('head')[0];
        //    var style = document.createElement('style');

        //    head.appendChild(style);
        //}
        //document.styleSheets[0].insertRule(cssString, num);

    }
    if (per.offic == 1) {
        //  document.getElementById('fileOfficUploadPanel').style.display = "block";
        //  $('.officItem').show();
        document.getElementsByTagName('body')[0].classList.add("offic");
    }
    if (per.Record) {
        try {
            document.getElementById('recordButton').style.display = 'block';
        } catch {}
      
    } else {
        try {
            document.getElementById('recordButton').style.display = 'none';
        } catch {}
       
    }
}



var mainApp = {
    ddd: "ssssssss",

    meetInfo: {
        userName: board.userName,
        meetID: board.meetID
    },
    AppStatus: {
        connection: false,
        reConecting: false,
        isExit: false
    },
    userName: 'ali',
    protocol: location.protocol === "https:" ? "wss:" : "ws:",
    wsUri: null,// this.protocol + "//" + window.location.host,
    socket: null,
    socketing: function () {
        if (mainApp.AppStatus.isExit) return;
        //console.log("start socketing");
        protocol = location.protocol === "https:" ? "wss:" : "ws:";
        this.wsUri = protocol + "//" + window.location.host;
        if (this.socket) {
            this.socket.close(3001);
        } else {
            //console.log("wsUrl = : " + this.wsUri);
            document.cookie = 'ali=aaaaaaaaa ; path=/';
            this.socket = new WebSocket(this.wsUri);
            this.socket.onopen = e => {
                //console.log("socket opened", e);
                this.AppStatus.connection = true;
                var m = {};
                m.type = "join";
                m.reConecting = mainApp.AppStatus.reConecting;
                m.role = board.publish;
                //console.log("join reqest " + m);
                //console.log(m);
                this.sendToServer(m);
                //var m2 = {};
                //m2.type = "getStatus";
                //this.sendToServer(m2);
                if (this.AppStatus.reConecting) {
                    $.notify({
                        message: board.translate.ServerConnection
                    }, {
                        placement: {
                            from: "top",
                            align: "left"
                        },
                        delay: 3000,
                        type: 'success'
                    });
                }


            };

            this.socket.onclose = function (e) {
                mainApp.AppStatus.connection = false;

                if (e.code == 3001) {
                    //console.log('ws closed');
                    this.socket = null;
                } else {
                    this.socket = null;
                    //console.log('ws closed  connection error');
                }


            };

            this.socket.onmessage = function (e) {
                if (!mainApp.AppStatus.connection) {
                    //console.warn("4444444444444444444444444444444444444444444444444444444444444444  gggggggggggggggggg 4444444444444444444444444444444444444444444444444444")
                    return;
                }
                if (mainApp.AppStatus.isExit) {
                    //console.warn("5  gggggggggggggggggg 4444444444444444444444444444444444444444444444444444")
                    return;
                }
                var data = JSON.parse(e.data);
                switch (data.type) {
                    case "board":
                        CBoard.parse(data);
                        break;
                    case "meetSatus":
                        mainApp.handleMeetStatus(data);
                        break;
                    case "file":
                        fileService.parse(data);
                        break;
                    case "activeFile":
                        fileService.activeFile(data.fileID);
                        break;
                    case "fileList":
                        //console.log(data);
                        break;

                    case "textMessage":
                        chatService.parse(data);
                        break;

                    case "userManager":
                        userManager.parse(data);
                        break;
                    case "meetManager":
                        meetManager.parse(data);
                        break;
                    case "quiz":
                        quiz.parse(data);
                        break;
                    case "vPlayer":
                        vPlayer.parse(data);
                        break;
                    case "panelControler":
                        panelControler.parse(data);
                        break;
                    case "diagram":
                        diagramControler.parse(data);
                        break;
                    case "MathEditor":
                        MathEditorControler.parse(data);
                        break;
                    case "offic":
                        officControler.parse(data);
                        break;
                }

                // //console.log(e);
                // $('#msgs').append(e.data + '<br />');
            };

            this.socket.onerror = function (e) {
                console.error(e.data);
                $.notify({
                    message: board.translate.connectionLost
                }, {
                    placement: {
                        from: "top",
                        align: "left"
                    },
                    delay: 3000,
                    type: 'danger'
                });
            };
        }
    },
    handleMeetStatus: function (data) {
       
        board.MeetStatus = 1;
        // console.log(data);
        var chatList = data.meet.chatMD.chatList;
        chatService.recivechatList(chatList);
        userManager.DefaultPermission = data.meet.permission;
        var fileList = data.meet.filesModel.fileList;
        bboard.fileList = fileList;
        fileService.handelFileList(fileList);

        developControler.lastFile = data.meet.developMD.lastFile;

        // var dic;

        // var base64Decoded = window.atob(data.meet.base64data);
        //var tstr = pako.ungzip(base64Decoded, { to: 'string' });
        //  var bordJason = JSON.parse(tstr);
        // //console.log(bordJason);
        //  var mlist = bordJason.mList;// data.meet.board.mList;
        //  //console.log("mlist"); //console.log(mlist);
        // dic = bordJason.dic;
        var mListOrg = data.meet.board.mList;
        //var messDic = data.meet.board.messDic;
        //console.log("mlistorg"); //console.log(mListOrg);
        var userDic = data.meet.userManager.userDic;


        userManager.setUserList(userDic);
         bboard.mlistToDic(mListOrg);
       // bboard.serverMessDicMapping(messDic);
        quiz.Preparation(data.meet.quizModel);
        vPlayer.firstLoad(data.meet.vPlayerModel);
        var activePanel = data.meet.activePanel;
        var diagramLastMessage = data.meet.diagramData.LastMessage;
        MathEditorControler.lastMessage = data.meet.MathEditorData.LastMessage;
        if (diagramLastMessage != "") diagramControler.lastMessage = JSON.parse(diagramLastMessage);
        //if (activePanel == 'diagram') diagramControler.start();
        //if (activePanel == 'MathEditor') MathEditorControler.start();
        //if (activePanel == 'board') panelControler.activeBoard();
        //if (activePanel == 'vPlayer') vPlayer.start();
        //officControler.renderFileList(data.meet.offic);
        panelControler.prseAction(activePanel);

        // if (board.publish) quiz.quizFormCreate(quizModel.m.d)



        //  console.warn(dic);

        // var b = data.meet.board.s;
        // //console.log("b");
        //  //console.log(b);
        //  var dic = data.meet.board.dic;
        //  //console.log("dic");
        ////console.log(dic);
        // //console.log(dic[0][1]);
        //  var bj = JSON.parse(b);
        // //console.log(bj);
        //  //console.log(bj[1][0][1]);
        //  bboard.bboard = bj;
        // var bfilleorglist = data.meet.board.bfileorglist;

        // bboard.setFileList(bfilleorglist);
        // bboard.dicTodic(dic);

        //bboard.changFile(0);
        //   CBoard.parseMlist(mlist);  
        // bboard.getBBoard(bj);
        // bboard.activePage(data.meet.board.lastFileID, data.meet.board.lastPageID);

        // device.start();

        //  if (!board.isHost) return;
        // webrtClient.startApp();
        messageQueue.readAll();
        mqttClient.meetStatus = true;
        //setTimeout(() => {
           

        //}, 1000)
       // $('#loadingModal').hide();
       // recordControler.getFileListRequest();
        
        webRtcControler.load();
        return;
        if (!board.isRecorder)
        webRtcControler.load();
        if (board.isRecorder) {
            //  webrtClient.startApp();
           
           

        }
        return;

        if (!mainApp.AppStatus.reConecting && !board.isRecorder) {

            //if (reconectinMode == 0 && ((board.user.permission.audio && audioEnabled) || (board.user.permission.video && videoEnabled))) {
            //    $('#deviceModal').modal('toggle');
            //    device.start();
            //}
            //else {
            //    $('#deviceUnpublisherModal').modal('toggle');
            //}
            $('#deviceUnpublisherModal').modal('toggle');
        }
        else {
            webrtClient.startApp();
        }
        if (board.isRecorder) {
            //  webrtClient.startApp();
          //  deviceUnpublisher.save();

        }
        mqttClient.meetStatus = true;
        //  startSession();
        //  bboard.fileID = 0;
        //  bboard.pageID = 1;
    },

    sendToServer: function (m) {
       // console.log(m);
        //var type = m.type;
        //if (type == 'board') {

        //    if (boardControler.sendMessage == 0) {
        //        console.error("send message in incorrect page");
        //        console.log(m);
        //        return;
        //    }
        //}

        if (mainApp.AppStatus.isExit) {
            //console.warn("exit");
            // return 0;
        }
        // //console.log(m);
        //var m = { type: "secondTicks", owner: name, roomName: activeRoom.roomName, roomType: roomType, List: secondTickList };
        m.meetInfo = this.meetInfo;
        //mqttClient.send(m);
        mqttClient.send(JSON.stringify(m));
        return;
        if (this.AppStatus.connection) {
            try {
                mainApp.socket.send(JSON.stringify(m));
                return 1;
            } catch (err) {
                console.log(err);
                return 0;
            }

        }
        else {
            this.AppStatus.reConecting = true;
            mainApp.socket = null;

            //console.log("error in send message1");
            mainApp.socketing();
        }


    },

    sendPing: function () {

        var m = { "type": "ping" };
        //  //console.log("ping send 1");
        this.sendToServer(m);
        // //console.log("ping send 2");
    },

    interval2: function () {

        mainApp.sendPing();

    },

    start: function () {
        signalmessenger.connect();
      //  mqttClient.connect();
        return;
        this.socketing();
        var intervalID2 = setInterval(mainApp.interval2, 10000);
    },
    promisFunction: function () {
        var promise = document.querySelector('video').play();

        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }
    }
};

var CBoard = {
    c : {  //create an object to draw
        x: 200,  //x value
        y: 100,  //y value
        r: 10 //radius
    },
    first: true,
    canvas: null,
    ctx: null,
    MousePointer: false,
    parseMlist: function (mlist) {
        //playerBoard.data = mlist;
        //try {
        //    //  playerBoard.prepal();
        //} catch(e){

        //}
        ////console.log(mlist);
        //for (var i = 0; i < mlist.length; i++) {
        //    var r = mlist[i];
        //    // console.warn(r);
        //    //  CBoard.parse(r.d);
        //}

    },
    parse: function (data) {
        // //console.log(data);
        bboard.reciveMessage(data);
    },
    parseMouse: function (data) {
       // console.log('mouse move9')
        var x = data.m.m[0]
        var y = data.m.m[1]
       // console.log(CBoard.first)
        if (CBoard.first) {
            CBoard.first = false;
            CBoard.canvas = document.getElementsByTagName("canvas")[3];
            CBoard.ctx = CBoard.canvas.getContext("2d");
            CBoard.ctx.font = '16px fontawesome';
           
            //CBoard.ctx.arc(CBoard.c.x, CBoard.c.y, CBoard.c.r, 0, Math.PI * 2);
            //CBoard.ctx.closePath();
            //CBoard.ctx.fill();
        }        
            CBoard.c.x = x;
        CBoard.c.y = y;
        var fontSize = 16 * (1 / board.zoomScale);
        
        CBoard.ctx.font = fontSize+'px fontawesome';
       

        //console.log(CBoard.ctx);
        
        CBoard.ctx.clearRect(0, 0, CBoard.canvas.width, CBoard.canvas.height);
        CBoard.ctx.fillText(data.name, CBoard.c.x, CBoard.c.y);
      
       // console.log(x); 
       // bboard.reciveMessage(data);
    },
    activeMousePointer: function(obj) {
        console.log('mouse is active');
       
        board.shortName = board.nickName.substring(0,2)
        CBoard.MousePointer = !CBoard.MousePointer;
        if (CBoard.MousePointer) obj.style.color = 'red';
        else obj.style.color = 'green';

    }
}; 