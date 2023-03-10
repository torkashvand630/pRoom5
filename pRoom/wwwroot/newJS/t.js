//const { idroo } = require("../board_files/my");

var isTabActive;

window.onfocus = function () {
    isTabActive = true;
};

window.onblur = function () {
    isTabActive = false;
};

// test
 
var bboard = {
    bboard: null,
    fboard: null,
    fileList: null,
    dic: {},
    fileID: 0,
    pageID: 0,
    page: null,
    activePage: function (fileID, pageID) {
        return;//gggggggggg
        //console.log("f1 : " + fileID + " p : " + pageID); 
        fileID = Number(fileID);
        pageID = Number(pageID);
        if (fileID != bboard.fileID) bboard.changFile(fileID);
        //console.log("ff : " + bboard.fileID + " pp : " + bboard.pageID);
        bboard.fileID = Number(fileID);
        bboard.pageID = Number(pageID);
        //console.log("f : " + fileID + " p : " + pageID);
        //console.warn(document.getElementById('inputGroupSelect04').value);
        document.getElementById('inputGroupSelect04').value = pageID;
        //console.warn(document.getElementById('inputGroupSelect04').value);
        bboard.clear();
        var p = bboard.dic[fileID][pageID];
        // console.log(p);
        for (var i = 0; i < p.length; i++) {
            var m = p[i];

            whiteboard.handleEventsAndData(m.str.d, true);
        }
        if (fileID != 0) {
            var pageIdbg = Number(pageID) + 1;
            var bgImage = '/files/board/' + board.meetID + '/pic/' + fileID + '/' + pageIdbg + '.png';

            document.getElementById("whiteboardBG").style.backgroundImage = "url(" + bgImage + ")";
           // console.log(bgImage);
        }
        else {
            //  document.getElementById("whiteboardBG").style.backgroundImage = "none";
        }

       


    },
    changePage: function (pageID) {
        if (bboard.fileList == null) return;
        if (bboard.dic[bboard.fileID]== undefined) return;
        bboard.pageID = pageID;
       // idroo.board.deleteAll();
        var p = bboard.dic[bboard.fileID][pageID];
        if (p == undefined) {
            console.error('page not found : ' + pageID);
            return;
        }
        //gggggg
        resizeNewBoard();
        //initNewBoard();

        //console.log(idroo.board.index);



        for (var i = 0; i < p.length; i++) {
            var m = p[i];
           // var m2 = JSON.parse(m);
            //console.log(i);
            //console.log(m.m);
            //var b = m.m.m;
            //if (b) {
            //    if (b[0] < 0 || b[1] < 0) {
            //        console.warn(b);
            //    }
            //}
            try {
                idroo.board.restoreChange(m.m);
            } catch(err) {
                console.error("restoreChange");
                console.log(m.m);

            }
          
            
        }
        boardControler.sendMessage = 1
       // console.log('end page select 1');
        document.getElementById('inputGroupSelect04').value = pageID;
        var c = document.getElementById("canvas");
        
        let canvas = c.firstChild;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (bboard.fileID != 0) {
            
            var pageIdbg = Number(pageID) + 1;
            var bgImage = '/files/board/' + board.meetID + '/pic/' + bboard.fileID + '/' + pageIdbg + '.png';
            idroo.board.setBackground(bgImage)
            return;
            let img = new Image();
            img.onload = function () {
                // image.src = this.src;
               // console.log('w3 : ' + img.width)
               // console.log('h : ' + img.height)
              
                //console.log(c)
               
                ctx.drawImage(img, 0, 0);
               // console.log(ctx)
                //var img = document.getElementById("scream");
               
                   //
                   // canvas.setAttribute('width', img.width);
                   // c.height = img.height+200;
                  //  canvas.width += 200;
                  //  ctx.drawImage(img, 0, 0);
                    // console.log( canvas.toDataURL('image/png'));
                  //  idroo.board.insertImageByURL(500, 500, bgImage)
                    
                
               
                
            };
            img.src = bgImage;
            canvas.style.backgroundImage = "url(" + bgImage + ")";

           
            //console.log(bgImage);
        }
        else {
            canvas.style.backgroundImage = "none";
        }

       
    },
    clear: function () {
        return; //ggggggggg
        var obj = document.getElementById("whiteboardCanvas1");
        var obj2 = document.getElementById("mtc1");
        const context = obj.getContext('2d');
        context.clearRect(0, 0, obj.width, obj.height);
      
        obj2.innerHTML = "";
        document.getElementById("whiteboardBG").style.backgroundImage = "none";
        context.fillText('\uF047', 200, 300);
    },
    addC: function (m) {
        var j = {};
        j.str = {};
        j.str.d = m.d;

        bboard.dic[m.d.fileID][m.d.num].push(j);
        // console.log(bboard.dic);
    },
    test: function () {
        //  bboard.activePage(0, 1);
        //  bboard.activePage(0, 3);
    },
    getBBoard: function (b) {
        //console.log("bbbbbbbb");
        //console.log(b);
        for (var i = 0; i < b.length; i++) {
            var t = b[i];
            for (var j = 0; j < t.length; j++) {
                var k = t[j];
                for (var r = 0; r < k.length; r++) {
                    var e = k[r];
                    //    console.log(e);
                    e.str = JSON.parse(e.str);
                    //   console.log(e);

                }
            }
        }
        //console.log(b);
        bboard.bboard = b;
    },
    setFileList: function (f) {
        return;
        bboard.fileList = f;
        bboard.fboard = {};
        for (var i = 0; i < f.length; i++) {
            var fileID = f[i].fileID;
            var pagecount = f[i].pagecount;
            bboard.fboard[fileID] = {};
            for (var j = 0; j < pagecount; j++) {
                bboard.fboard[fileID][j] = [];
            }
        }


    },
    mlistToDic: function (mList) {
        bboard.createNewDic();
        for (var i = 0; i < mList.length; i++) {
            var m = JSON.parse( mList[i]);
           // console.log(m);
            var fileID = m.f;
            var pageID = m.p;
            //var j = {};
            //j.str = {};
            //j.str.d = m;
            try {
                bboard.dic[fileID][pageID].push(m);
            } catch(err) {
                console.error("push to dic");
                console.log(m);

            }
          

        }
        if (mList.length == 0) {
            bboard.changePage(0);
            //bboard.changFile(bboard.fileID);
            //bboard.activePage(bboard.fileID, bboard.pageID);
        } else {
            var m = JSON.parse( mList[mList.length - 1]);
            var fileID = m.f;
            var pageID = m.p;
            bboard.changFile(fileID);
            try {
                bboard.changePage(pageID);
            } catch(err) {
                console.error("pageselect");
                console.log(pageID);

            }
           
            //bboard.changFile(fileID);
            //bboard.activePage(fileID, pageID);
        }
       
    },
    createNewDic: function () {

        var f = bboard.fileList;

        for (var i = 0; i < f.length; i++) {
            var fileID = f[i].inRoomID;
            bboard.dic[fileID] = {};
            var pagecount = f[i].pageCount;

            for (var j = 0; j <  pagecount; j++) {
                bboard.dic[fileID][j] = [];
            }
        }

        
    },
    dicTodic: function (b) {
        
        var f = bboard.fileList;

        for (var i = 0; i < f.length; i++) {
            var fileID = f[i].inRoomID;
            var pagecount = f[i].pageCount;

            for (var j = 0; j < pagecount; j++) {
                var k = b[fileID][j];
                for (var r = 0; r < k.length; r++) {
                    var e = k[r];

                    b[fileID][j][r].str = JSON.parse(e.str);


                }
            }
        }


        bboard.dic = b;

    },

    addFileToDic: function (f) {
       // console.warn(f);
        var fileID = f.inRoomID;
       // bboard.fileList[fileID] = f;
        bboard.fileList.push(f);
        //console.log("bboard.fileList");
        //console.log(bboard.fileList);
        var pagecount = f.pageCount;
        bboard.dic[fileID] = {};
        for (var j = 0; j < pagecount; j++) {
            bboard.dic[fileID][j] = [];
        }
        //console.log("nnnnnndiiiiiicccccccccccc");
        //console.log(bboard.dic);
        bboard.activePage(fileID, 0);
    },
    reciveMessage: function (data) {
       
      //  console.log(data);
        var fileID = data.f;
        var pageID = data.p;   
       
        var name = data.meetInfo.userName;
        var action = data.action;
        
        if (action == "fileSelect") {
            boardControler.sendMessage = 0;
            bboard.changFile(fileID);
            try {
                bboard.changePage(0);
            } catch(err) {
                console.error("pageselect reciveMessage 0");
                console.log(data);

            }
            boardControler.sendMessage=1
            return;
        }
        if (action == "pageSelect") {
            boardControler.sendMessage = 0;
          
            if (pageID != bboard.pageID) {
              
                try {
                    bboard.changePage(pageID);
                } catch(err) {
                    console.error("pageselect reciveMessage 2");
                    console.log(data);

                }
            }
           
            boardControler.sendMessage = 1
            return;
        }
        if (fileID != bboard.fileID || pageID != bboard.pageID) {
            console.error("pageselect reciveMessage 3");
            console.log(data);
            return;
        }
        try {
            bboard.dic[fileID][pageID].push(data);
        } catch(err) {
            console.error('reciveMessage 1');
            console.log(data);
            return;
        }

       
        if (name == board.userName) {
            return;
        }
      
        
        try {
            idroo.board.restoreChange(data.m);
        } catch(err) {
            console.error('reciveMessage 2');
            
        }
      
         
        return;
       
        if (name != board.userName || action == "pageSelect" || action == "setImage") {

            bboard.addC(data);

            whiteboard.handleEventsAndData(data.d, true);
            if (action == "pageSelect" || action == "setImage") {
                if (screenControler.screenShareRemoteStatus) {
                    screenControler.disconnectFromScreenShare();
                }
                if (screenControler.screenShareStatus) {
                    screenControler.stopOwnScreenShare();
                }
            }
        }
    },
    changFile: function (fileID) {
       // console.log(bboard.fileList);
        board.zoomScale2 = 1;
       
        bboard.fileID = fileID;
        var i;
        for (i = 0; i < bboard.fileList.length; i++)
            if (bboard.fileList[i].inRoomID == fileID) {
                var f = bboard.fileList[i];
                board.width = f.width;
                board.height = f.height;
                resizeNewBoard();
                //console.log(bboard.fileList);
                // console.log(f);
              //  layout.prepareBoard(f.width, f.height);
                createBoardPaging(f.pageCount);
            }

    },
    serverMessDicMapping: function (b) {
       //  bboard.dic = messDic;
        //messDic.forEach((element, index) => {
        //    element.forEach((e, i) => {
        //        console.log(e)
        //    });
        //});
        
        console.log(bboard.dic)
        bboard.changePage(0);
    }

};
var playerBoard = {
    meet: null,
    data: null,
    p: 0,
    w: 0,

    play: function () {
        var d = playerBoard.data;
        //console.log(d);
        playerBoard.p = playerBoard.data[0].d.date;
        //console.log(playerBoard.p);
        //console.log(playerBoard.data[0].d.d);
        var intervalID = setInterval(playerBoard.interval, 100);
    },
    interval: function () {
        // console.log((playerBoard.p)++);

        playerBoard.int2(playerBoard.p)

    },
    int2: function (p) {
        var d = playerBoard.data[(playerBoard.w)++];
        // console.log(p);
        if (d.d.date < p) {
            //console.log("ok");
            playerBoard.handleData(d.d.d);
            playerBoard.int2(p);
        }
        else {
            (playerBoard.w)--;
            (playerBoard.p)++;
            console.warn(p);
            //console.log(d);
        }

    },
    handleData: function (d) {
        // console.log(w);
        whiteboard.handleEventsAndData(d, true);
        //console.log(d);
    }
};
//if (board.publish) showToolbar(1);
 
function pdfFileClick(t) {

    //  disconnectFromScreenShare();
}
function boardClick() {
   // panelControler.nextPanel = "board";
   // console.log("screenShareRemoteStatus : " + screenControler.screenShareRemoteStatus);
    //if (screenControler.screenShareRemoteStatus) {
    //    var m = { type: 'panelControler', action: 'board' };
    //    var res = mainApp.sendToServer(m);
    //  //  fileService.activeFileServer(bboard.fileID, bboard.pageID);
    //    return;
    //}
    //if (layout.sessionPanelPosetion == 2) {
    //    document.getElementById('newVideosBox').style.height = layout.sessionPanelheight + "px";
    //    resizingVideoBox();
    //}
   // panelControler.disconectScreenShare();
    var m = { type: 'panelControler', action: 'board' };
    var res = mainApp.sendToServer(m);
   // panelControler.activeBoard();
   

}
  

function moveCenterPanel() {
    if (layout.sessionPanelPosetion == 2) {
        var h6 = $("#screenSharePanel").height();
        //console.log("h6 : " + h6);
        var h7 = $(window).height();
        //console.log("borad h : " + h7);
        var h8 = (h7 - (h6 + 90));
        //console.log("borad h8 : " + h8);
        if (h8 > 180) {
            if (h8 > 500) h8 = 500;
            document.getElementById('newVideosBox').style.height = h8 + "px";
        }
        resizingVideoBox();
   }

}
function moveBoardPanel() {
    if (layout.sessionPanelPosetion == 2) {
        var h6 = $("#boardContainer").height() * board.zoom;

        //console.log("h6 : " + h6);
        var h7 = $(window).height();
        //console.log("borad h : " + h7);
        var h8 = (h7 - (h6 + 90));
        //console.log("borad h8 : " + h8);
        if (h8 > 180) {
            if (h8 > 500) h8 = 500;
            document.getElementById('newVideosBox').style.height = h8 + "px";
        }
        resizingVideoBox();
    }

} 
function initNewBoard() {
    idroo.board.unlock();
    idroo.board.init(); 
    var editor = { "nr": 6, "id": 1218010, "pic": null, "name": "javad6", "mouse": [0, 0], "active": [] };
    idroo.board.editors[editor.nr] = editor;
    var accesslevel2 = "own";
    //setTimeout(() => {
    ui.toolbar.setLevel(accesslevel2);
    ui.aside.setLevel(accesslevel2);
    ui.clipboard.setLevel(accesslevel2);
    ui.keyboard.setLevel(accesslevel2);
    ui.phone.setLevel(accesslevel2);
}
function resizeNewBoard() {
   // console.log("resizeNewBoard");
    if (panelControler.activePanel != "board") return;
    //return;
   // console.log("bord withe : " + board.width);
    var newBoard2 = document.getElementById('newBoard2');
    var newBoard = document.getElementById('newBoard');
    var obj2 = document.getElementById('boardContainer');
    setZoom(1, obj2);
    board.zoomScale2 = 1;
   
    var w = $(window).width();
    var h = $(window).height() - 67;
    // var newVideosBox = document.getElementById('newVideosBox');
    // var centerVideoPanel = document.getElementById('centerVideoPanel');
    w = w - layout.rightPanelwidth;
    var w2 = $('#screenAndBoard').width()-0;
   
    setZoom(1, obj2);
    var uiToolbar = document.getElementById('uiToolbar');
    var canvas1 = document.getElementById('canvas');
     
    uiToolbar.style.width = (w2 + 0) + "px";
    canvas1.style.width = board.width + "px";// (w2 - 0) + "px";
    canvas1.style.height = board.height + "px";// "100%";//(h - 70) + "px";
    obj2.style.height = board.height + "px";// "100%";//(h - 70) + "px";
    obj2.style.width = board.width + "px";// (w2 - 0) + "px";

    //idroo.board.unlock();

    //idroo.board.init();
    initNewBoard();

    var h2 = $('#screenAndBoard').height() - 32;
    if (board.user.permission.toolBox) {
       // h2 = h2 - 75;
       // document.getElementById("uiToolbar").style.display = "block";
    }
    else {
       // document.getElementById("uiToolbar").style.display = "none";
    }
    newBoard2.style.height = h2 + "px";
    newBoard.style.height = h2 + "px";
    var scTruew = (w2-2) / board.width;
    var scTrueh = (h2-2) / (board.height);
    var maxScTrue = scTruew;
    if (scTrueh < maxScTrue) maxScTrue = scTrueh;

    //console.log('scTrue' + maxScTrue);
    
   
    if (board.user.permission.toolBox) {
       // obj2.classList.remove("disabledbutton");
        obj2.style.pointerEvents = "all";
    }
    else {
       // obj2.classList.add("disabledbutton");
        obj2.style.pointerEvents = "none";
    }

    setZoom(maxScTrue, obj2);
    board.zoomScale = maxScTrue;
  //  document.getElementById('boardHtmlpanel').style.display = "block";
    setToolbarPosation();
    
}
function setToolbarPosation() {
    if (board.user.permission.toolBox) {

    }
    var obj2 = document.getElementById('boardContainer');
    var w2 = $('#screenAndBoard').width() - 0;
    var h2 = $('#screenAndBoard').height() - 32;
    var toolbar = document.getElementById('toolbar');
    let w3 = $('#boardContainer').width() + 6;
    if (w2 > w3) {
        var min = Math.min((w2 - w3), 30);
       // console.log('min : ' + min);
        obj2.style.marginLeft = min + "px";
        toolbar.style.width = "28px";
        toolbar.style.top = '30px'
    }
    else {
        let h3 = $('#boardContainer').height() + 30
        if (h2 > h3) {
            toolbar.style.width = "100%"
            toolbar.style.top = (h3 +2 ) + 'px'
        }
        else {
            toolbar.style.width = "28px";
            toolbar.style.top = '30px'
        }
        obj2.style.marginLeft = "0px";
       // console.log('min no neeed');
    }

};
$(document).ready(function () {
    
    $(".menu-toggle").click(function (e) {
        layout.menuToggle();

        // if (layout.id==1)
        // $("#wrapper").toggleClass("menuDisplayed");

    });
   // $('#loadingModal').modal('toggle');
    // document.getElementById('boardHtmlpanel').style.display = "none";
    
    layout.load();
    //if (layout.id == 2) layout.menuStatus = 1;
    resizeNewBoard();
    //if (layout.id == 2) layout.element.sidebar_wrapper.style.display = "none";


    //var w3 = 400;
    //var w = $(window).width();
    //var h22 = $(window).height();
    //var list = document.getElementsByClassName("lPanel");
    //if (w > 1000) {
    //    board.isMobile = 0;
    //    document.getElementById('page-content-wrapper').style.paddingRight = w3 + "px";
    //    $("#wrapper").toggleClass("menuDisplayed");
    //    document.getElementById('menu-toggle').style.display = "none";
    //    for (var i = 0; i < list.length; i++)
    //        list[i].style.height = h22 / 3 + "px";
    //}
    //else {
    //    board.isMobile = 1;
    //    document.getElementById('lpanelVideo').style.display = "none";
    //    for (var i = 0; i < list.length; i++)
    //        list[i].style.height = h22 / 2 + "px";
    //}
   // setChatPanel();
    
    //console.log('w is : ' + w);
    //if (w < 450) {
    //    w3 = w - 100;
    //}
    //var style = document.createElement('style');
    //style.type = 'text/css';
    //style.innerHTML = '#wrapper.menuDisplayed #sidebar-wrapper { width: ' + w3 + 'px;  }  #wrapper.menuDisplayed #page-content-wrapper {  padding-right: 0px;  }';//' + w3 + '
    //document.getElementsByTagName('head')[0].appendChild(style);
    //$(".menu-toggle").click(function (e) {
    //    e.preventDefault();
    //    $("#wrapper").toggleClass("menuDisplayed");

    //});
     

    
    //whiteboard.loadWhiteboard("#whiteboardContainer", {
    //    whiteboardId: board.meetID,
    //    username: board.userName,
    //    sendFunction: function (content) {
    //        if (!whiteboard.permission) return;
    //       // if (content.t == "cursor") return;
    //        content["at"] = "";
    //        content["num"] = bboard.pageID;
    //        content["fileID"] = bboard.fileID;
    //        content["del"] = 0;
    //        if (board.isMobile) {
    //            if (content["t"] == "pen") {
    //                // console.log(content["d"]);
    //                var d = content["d"];
    //                var z = 1 / board.zoom;
    //                var j = [d[0] * z, d[1] * z, d[2] * z, d[3] * z];
    //                // console.log(j);
    //                //  content["d"] = j;
    //            }
    //        }
    //        // signaling_socket.emit('drawToWhiteboard', content);
    //        var m = { "type": "board", "board": "draw", "d": content };
    //        content["type"] = "board";
    //        content["board"] = "draw";
    //        mainApp.sendToServer(m);
    //        bboard.addC(m);

    //    }
    //});
    //whiteboard.PreparationBoard();
    //whiteboard.setTool("pen");
    //document.getElementById('stroke-width-slider').setAttribute("data-value", "5");
    board.isToch = is_touch_enabled();
    //console.log("is toch screen : " + board.isToch);
    
   // viduAppUi.renserToolbox(board.user.permission);
    if (!board.isRecorder) {
        const params = new URL(window.location).searchParams;
        var reloadparam = params.get('x'); 
        if ((reloadparam == 0))
            mainApp.start();
            
        else $('#deviceUnpublisherModal').modal('toggle');
    }
    else {
        mainApp.start();
      //  $('#loadingModal').hide();
    }
     
 
   // mainApp.start();
    _viduModulStart(); 


    var screenAndBoard = document.getElementById('screenAndBoard');
    new ResizeSensor(screenAndBoard, function () {
        //console.log('Changed to ' + screenAndBoard.clientWidth);//screenAndBoard.clientWidth-20
        layout.resizeBoard();
        webRtcControler.CHANGEMYPEER();
    });
    var centerVideoPanel = document.getElementById('centerVideoPanel');
    new ResizeSensor(centerVideoPanel, function () {
      //  console.log('Changed to ' + element.clientWidth);
       // resizingVideoBox();
        webRtcControler.CHANGEMYPEER();
    });
    var sidebar_wrapper = layout.element.sidebar_wrapper;// document.getElementById('centerVideoPanel');
    new ResizeSensor(sidebar_wrapper, function () {
        //console.log('Changed to sidebar_wrapper' + sidebar_wrapper.clientWidth);
      //  resizingVideoBox();
        webRtcControler.CHANGEMYPEER();
    });
    $("#stroke-width-slider").slider().set(5, 1);

    var noSleep = new NoSleep(); 
    noSleep.enable();
    

    var f1 = function () {
       // console.log("f1");
        return 0;
    }
  //  console.log(  fff(f1, 2000, 5));
   // console.log("f....................................................222222");
    //setTimeout(() => { document.title = "hhhh " }, 3000);
    
});
function fff(resolve, onSucsess, reject, time, tryCount) {
    console.log("fff");
    if (resolve()) {
        onSucsess();
        return "ok";
    }
    if (tryCount > 1)
        setTimeout(() => {


            fff(resolve, time, tryCount - 1);

        }, time);
    else {
        reject();
        return "no";
    }
   
}
function getWithboardeData() {
    // $.get(subdir + "/loadwhiteboard", { wid: whiteboardId, at: accessToken }).done(function (data) {
    //    //  whiteboard.loadData(data)
    //     playerBoard.data = data;
    //});

}
function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
} 
function mobileAndTabletcheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
function reportWindowSize() {
   // console.warn("reload by size");
    // window.location.reload(true);
    layout.reLoad(false);
}
window.addEventListener("orientationchange", function () {
    console.warn("orientationchange");
    layout.reLoad(true);
   // window.location.reload(true);
});
window.onresize = reportWindowSize;
var MainNavBar = document.getElementById('MainNavBar');
document.getElementById('boardContainer').addEventListener('touchmove', function (e) {
    //if (e.touches.length > 2) {
      // alert('use + and - icon to zoom in board   ' + e.touches.length);
   // }
});