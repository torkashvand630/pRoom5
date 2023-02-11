

var baseLayout = {
    parse: function (a,isClick) {
        switch (a) {
            case "1":
                layout.setLayoutID();
                break;
            case "11":
                baseLayout.layoutChange(1, 1);
                break;
            case "12":
                baseLayout.layoutChange(1, 2);
                break;
            case "13":
                baseLayout.layoutChange(1, 3);
                break;
            case "14":
                baseLayout.layoutChange(1, 4);
                break;
            case "21":
                baseLayout.layoutChange(2, 1);
                break;
            case "22":
                baseLayout.layoutChange(2, 2);
                break;
            case "23":
                baseLayout.layoutChange(2, 3);
                break;
            case "24":
                baseLayout.layoutChange(2, 4);
                break;
        }
        layout.startRender(isClick);
    },
    render: function () {
        layout.resizeBoard();
        layout.setRightPanel();
        //resizingVideoBox();  
    },
    layoutChange: function (id, posetion) {
        layout.id = id;
        layout.sessionPanelPosetion = posetion;

    },
    changLayouInputValue: function () {
        var obj = document.getElementById('layoutDropDownSelect');
        var value = layout.id + '' + layout.sessionPanelPosetion;

        obj.value = value;
    }
};
var layout = {
    id: 1,
    rightPanelwidth: 400,
    sessionPanelPosetion: 1,
    leftPanelWidth: 1,
    sessionPanelheight: 180,
    centerVideoPanelWidth: 400,
    menuStatus: 0,
    element: {
        screenAndBoard: document.getElementById('screenAndBoard'),
        newVideosBox: document.getElementById('newVideosBox'),
        page_content_wrapper: document.getElementById('page-content-wrapper'),
        sidebar_wrapper: document.getElementById('sidebar-wrapper'),
        centerVideoPanel: document.getElementById('centerVideoPanel'),
        MainNavBar: document.getElementById('MainNavBar'),
        wrapper: document.getElementById('wrapper'),
        boardHtmlpanel: document.getElementById('boardHtmlpanel'),

    },
    load: function (orientationchange) {
        layout.setLayoutID();
        layout.startRender(orientationchange);

    },
    startRender: function (isClick) {
       // console.log('start render') 
        layout.setRightPanel(isClick);

        layout.setSessionPanelPosetion(layout.sessionPanelPosetion);
        layout.setWraperCss();

        layout.resizeBoard();
        layout.setMenu();
        baseLayout.changLayouInputValue();

        webRtcControler.CHANGEMYPEER();
    },
    setMenu: function () {

        var w = $("#MainBarMobile").width();

        var obj = document.getElementById('MainBarDesctop');
        if (w >= 600) {
            obj.style.display = "block";
        }
        else {
            obj.style.display = "none";
        }
    },
    reLoad: function (orientationchange) {
        layout.load(orientationchange);
        // layout.resizeBoard();

    },
    setLayoutID: function () {
        if (webRtcControler.isActive) {
            if (w > 1000) layout.id = 1;
            else layout.id = 2;
            return;
        }
        layout.sessionPanelPosetion = 1;
        // return;
        var w = $(window).width();
        var h = $(window).height();
        if (w > 1000) {
            layout.id = 1;
            layout.sessionPanelPosetion = 1;
            if (w > 1400) layout.sessionPanelPosetion = 1;
        }
        else {
            layout.id = 2;
            if (h < 700 && w > 650) {
                layout.sessionPanelPosetion = 3;
            } else layout.sessionPanelPosetion = 2;

        }
        // if (w < 450) layout.rightPanelwidth = w - 100;

    },
    setAutoSessionPanelPosetion: function () {
        var w = $(window).width();
        if (w > 1000) layout.setsessionPanelPosetion = 1;
        else layout.sessionPanelPosetion = 2;
    },
    setSessionPanelPosetion: function (pos) {
        layout.sessionPanelPosetion = pos;
        layout.setWraperCss();
        var displaymode = 'democratic';
        //var newVideosBox = layout.element.newVideosBox;// document.getElementById('newVideosBox');
        //var centerVideoPanel = layout.element.centerVideoPanel;// document.getElementById('centerVideoPanel');
        if (pos == 3) {

            //if (layout.id == 1) layout.element.page_content_wrapper.style.paddingRight = layout.rightPanelwidth + "px";
            //else layout.element.page_content_wrapper.style.paddingRight = "0px";
            $("#videosBox").appendTo($("#centerVideoPanel"));

            //centerVideoPanel.style.display = "block";
            //newVideosBox.style.display = "none";
        }
        if (pos == 1) {
            $("#videosBox").appendTo($("#lpanelVideo"));
            if (layout.id == 2) {
                // if (!layout.menuStatus)
                //   layout.menuToggle();
            }
            //layout.element.page_content_wrapper.style.paddingRight =   "0px";


            //centerVideoPanel.style.display = "none";
            //newVideosBox.style.display = "none";
        }
        if (pos == 2 || pos == 4) {
            //newVideosBox.style.height = layout.sessionPanelheight + "px";
            //layout.element.page_content_wrapper.style.paddingRight = "0px";
            $("#videosBox").appendTo($("#newVideosBox"));
          

            //centerVideoPanel.style.display = "none";
            //newVideosBox.style.display = "block";
            //if (layout.id == 1) newVideosBox.style.paddingRight = layout.rightPanelwidth + "px";
        }
        //if (pos == 4) displaymode = 'filmstrip';
        //try {
        //    if (pos!=4)   window.CLIENT.setDisplayModeMe(displaymode);
        //}
        //catch { }
        layout.setRightPanel();
        //setTimeout(function () { resizingVideoBox(); }, 3000);
        //resizingVideoBox();
    },
    setLeftPanelWidth: function () {
        var w = $(window).width();
        if (layout.id == 2) layout.leftPanelWidth = w;
        else layout.leftPanelWidth = w - layout.rightPanelwidth;
    },
    setRightPanel: function (isClick) {
        if (isClick ) {
            if (layout.id == 1) {
                layout.openRightPanel();
            } else {
                layout.menuStatus = 0;
                layout.element.sidebar_wrapper.style.display = "none";
                layout.element.sidebar_wrapper.style.transform = "translate(600px, 0px)";
            }
            if (layout.id == 1 && layout.sessionPanelPosetion == 3) {
                layout.element.sidebar_wrapper.style.width = "20%";
                layout.element.page_content_wrapper.style.width = "60%";
            }
        }
       
       
        //var h = $(window).height();
        //var list = document.getElementsByClassName("lPanel");
        if (layout.sessionPanelPosetion == 1) {
           
            // console.warn("wwwwwwwwwwwww");
            // document.getElementById('chatContiner').style.height = "100px";
            // document.getElementById('lpanelVideo').style.display = "block";
            //for (var i = 0; i < list.length; i++)
            //    list[i].style.height = h / 3 + "px";
            layout.element.sidebar_wrapper.classList = "element3";
        }
        else {
            layout.element.sidebar_wrapper.classList = "element2";
          
            // document.getElementById('lpanelVideo').style.display = "none";
            //for (var i = 0; i < list.length; i++)
            //    list[i].style.height = h / 2 + "px";
        }
        //setChatPanel();
        //setTimeout(function () {  },100);

        // layout.setLeftPanelWidth();
    },
    menuDisplayed: function () {
        //if (layout.id == 1) layout.element.sidebar_wrapper.style.width = layout.rightPanelwidth + "px";
        layout.setWraperCss();
        return;
        if (layout.id == 1) {
            // document.getElementById('newVideosBox').style.paddingRight = layout.rightPanelwidth + "px";

            //document.getElementById('sidebar-wrapper').style.width = layout.rightPanelwidth + "px";
            //document.getElementById('menu-toggle').style.display = "none";
            if (layout.sessionPanelPosetion == 3) {
                //  document.getElementById('page-content-wrapper').style.paddingRight = layout.rightPanelwidth + "px";
            }
            else {
                //  document.getElementById('page-content-wrapper').style.paddingRight =  "0px";
            }

        }
        else {
            // layout.menuToggle();

            //document.getElementById('newVideosBox').style.paddingRight = "0px";
            //document.getElementById('menu-toggle').style.display = "block";

            if (layout.sessionPanelPosetion == 3) {
                //   document.getElementById('page-content-wrapper').style.paddingRight = "0px";
            }
            else {

                //  document.getElementById('page-content-wrapper').style.paddingRight = "0px";
            }


        }

    },
    setWraperCss: function () {
        var cssClass = "id_" + layout.id + " pos_" + layout.sessionPanelPosetion;
        layout.element.wrapper.classList = cssClass;
    },
    resizeBoard: function () {
        // resizeNewBoard();
        bboard.changePage(bboard.pageID);
        return;
        var w = $(window).width();
        var h = $(window).height() - 67;
        // var newVideosBox = document.getElementById('newVideosBox');
        // var centerVideoPanel = document.getElementById('centerVideoPanel');
        if (layout.id == 1) w = w - layout.rightPanelwidth;
        if (layout.sessionPanelPosetion == 2) {
            layout.element.newVideosBox.style.height = layout.sessionPanelheight + "px";
            h = h - layout.sessionPanelheight;
        }
        if (layout.sessionPanelPosetion == 3) {
            w = w - layout.centerVideoPanelWidth;
        }
        if (layout.sessionPanelPosetion == 1) {

        }
        var w2 = $('#screenAndBoard').width();
        layout.leftPanelWidth = w2;
        // layout.element.screenAndBoard.style.width = layout.leftPanelWidth + "px";
        //layout.element.MainNavBar.style.width = layout.leftPanelWidth + "px";
        var scTruew = layout.leftPanelWidth / board.width;
        var scTrueh = h / (board.height);
        var maxScTrue = scTruew;
        if (scTrueh < maxScTrue) maxScTrue = scTrueh;


        //console.log('scTrue' + maxScTrue);
        var obj2 = document.getElementById('boardContainer');
        // var obj2 = document.getElementById('canvas');
        setZoom(maxScTrue, obj2);
        //var toolbar = document.getElementById('toolbar');
        //var t1 = 1;
        //if (maxScTrue < 1) t1 = 0.9;
        //setZoom(t1/maxScTrue, toolbar);
        board.zoom = maxScTrue;

        var boardContainerWidth = $("#boardContainer").width();
        layout.element.boardHtmlpanel.style.width = (boardContainerWidth * board.zoom) + 4 + "px";
        var boardContainerheight = obj2.clientHeight;// $("#boardContainer").height();
        //console.warn("boardContainerheight : " + boardContainerheight);
        layout.element.boardHtmlpanel.style.height = (boardContainerheight * (board.zoom)) + 30 + "px";

        setTimeout(function () {
            var boardContainerWidth = $("#boardContainer").width();
            layout.element.boardHtmlpanel.style.width = (boardContainerWidth * board.zoom) + 4 + "px";
            var boardContainerheight = obj2.clientHeight;// $("#boardContainer").height();
            //console.warn("boardContainerheight : " + boardContainerheight);
            layout.element.boardHtmlpanel.style.height = (boardContainerheight * (board.zoom)) + 30 + "px";
        }, 1000);

        // moveBoardPanel();
        // if (layout.sessionPanelPosetion!=3)  
        //layout.marginBoard();
    },
    resizeBoardW: function (w) {
        // return;
        //  var w = $(window).width();
        var h = $(window).height() - 67;
        // var newVideosBox = document.getElementById('newVideosBox');
        // var centerVideoPanel = document.getElementById('centerVideoPanel');
        //  if (layout.id == 1) w = w - layout.rightPanelwidth;
        if (layout.sessionPanelPosetion == 2) {
            layout.element.newVideosBox.style.height = layout.sessionPanelheight + "px";
            h = h - layout.sessionPanelheight;
        }
        //if (layout.sessionPanelPosetion == 3) {
        //    w = w - layout.centerVideoPanelWidth;
        //}
        if (layout.sessionPanelPosetion == 1) {

        }
        layout.leftPanelWidth = w;
        // layout.element.screenAndBoard.style.width = layout.leftPanelWidth + "px";
        //layout.element.MainNavBar.style.width = layout.leftPanelWidth + "px";
        var scTruew = layout.leftPanelWidth / board.width;
        var scTrueh = h / (board.height);
        var maxScTrue = scTruew;
        if (scTrueh < maxScTrue) maxScTrue = scTrueh;


        //console.log('scTrue' + maxScTrue);
        //var obj2 = document.getElementById('boardContainer');
        var obj2 = document.getElementById('canvas');
        setZoom(maxScTrue, obj2);
        //var toolbar = document.getElementById('toolbar');
        //var t1 = 1;
        //if (maxScTrue < 1) t1 = 0.9;
        //setZoom(t1/maxScTrue, toolbar);
        board.zoom = maxScTrue;
        var boardContainerWidth = $("#boardContainer").width();
        layout.element.boardHtmlpanel.style.width = (boardContainerWidth * board.zoom) + "px";
        //var boardContainerheight = $("#boardContainer").height();

        //layout.element.boardHtmlpanel.style.height = (boardContainerheight * board.zoom) + "px";
        //  moveBoardPanel();
        // if (layout.sessionPanelPosetion!=3)  
        //layout.marginBoard();
    },
    prepareBoard: function (ww, wh) {
        //if (layout.sessionPanelPosetion == 2) {
        //    document.getElementById('newVideosBox').style.height = layout.sessionPanelheight + "px";
        //    resizingVideoBox();
        //}
        if (screenControler.screenShareStatus) {
            screenControler.stopOwnScreenShare();
        }
        else {
            screenControler.disconnectFromScreenShare();
        }
        board.width = ww;
        board.height = wh;

        //var svgBoard = document.getElementById('svgBoard');
        //if (svgBoard != undefined) {
        //    svgBoard.setAttribute("height", wh);
        //    svgBoard.setAttribute("width", ww);
        //    console.warn(svgBoard);

        //}
        //var whiteboardCanvas1 = document.getElementById('whiteboardCanvas1');
        //if (whiteboardCanvas1 != undefined) {
        //    whiteboardCanvas1.setAttribute("height", wh);
        //    whiteboardCanvas1.setAttribute("width", ww);
        //    console.warn(whiteboardCanvas1);

        //}
        //whiteboard.settings.width = ww;
        //whiteboard.settings.height = wh;

        //var obj2 = document.getElementById('boardContainer');
        //obj2.style.width = board.width + 5 + "px";
        //obj = document.getElementById('whiteboardContainer');
        // obj.style.width = board.width + "px";//gggggggggg
        // obj.style.height = board.height + "px";

        layout.resizeBoard();
    },
    marginBoard: function () {
        var boardContainerWidth = $("#boardContainer").width();
        //console.log("board contaner widht : " + boardContainerWidth);
        var boardContainerWidthScal = boardContainerWidth * board.zoom;
        //console.log("board contaner widht scale : " + boardContainerWidthScal);
        if (layout.leftPanelWidth > boardContainerWidthScal) {
            var dif = (layout.leftPanelWidth - boardContainerWidthScal) / 2;
            document.getElementById('boardHtmlpanel').style.marginLeft = dif + "px";
        }
        else {
            document.getElementById('boardHtmlpanel').style.marginLeft = "0px";
        }
    },
    menuToggle: function () {
        //e.preventDefault();
        chatService.unReadMessage = 0;
        chatService.updateUnReadmessage();
        layout.menuStatus = !layout.menuStatus;
       // console.log(layout.menuStatus);
        if (layout.menuStatus) {
            layout.openRightPanel();
            // layout.element.sidebar_wrapper.style.width = layout.rightPanelwidth + "px";
            //  document.getElementById('page-content-wrapper').style.paddingRight = layout.rightPanelwidth + "px";
        }
        else {
            layout.closeRightPanel();

            //layout.element.sidebar_wrapper.style.width = "0px";
        }
    },
    openRightPanel: function () {
        layout.element.sidebar_wrapper.style.display = "block";
        setTimeout(() => {
             
                layout.element.sidebar_wrapper.style.transform = "translate(0px, 0px)";// "block";
        }, 500)
       
    },
    closeRightPanel: function () {
        layout.element.sidebar_wrapper.style.transform = "translate(600px, 0px)";// "none";
        setTimeout(() => {
            if (layout.menuStatus==0)
            layout.element.sidebar_wrapper.style.display = "none";
        },1500)
    },

    resizeBoardtest1: function () {
        if (layout.id == 1) layout.id = 2;
        else layout.id = 1;
        layout.menuDisplayed();
        layout.resizeBoard();
        return;
        // console.warn(layout.sessionPanelPosetion);
        layout.sessionPanelPosetion = 1;
        // layout.sessionPanelPosetion = 3;
        // console.warn(layout.sessionPanelPosetion);

        layout.resizeBoard();
        layout.setRightPanel();
        setTimeout(function () { resizingVideoBox(); }, 1000);

    },
    resizeBoardtest2: function () {
        layout.setSessionPanelPosetion(2);
        //layout.sessionPanelPosetion = 2;
        //console.warn(layout.sessionPanelPosetion);

        layout.resizeBoard();
        //layout.setRightPanel();
        //setTimeout(function () { resizingVideoBox(); }, 1000);
    },
    resizeBoardtest3: function () {
        var pos = 3;
        if (layout.sessionPanelPosetion == 1) pos = 3;
        else (pos = 1);
        //console.warn(layout.sessionPanelPosetion);
        layout.setSessionPanelPosetion(pos);
        layout.resizeBoard();
        // 
        // layout.setRightPanel();
        // setTimeout(function () { resizingVideoBox(); }, 1000);
    },

    toggle_fullscreen: function () {
        console.log('fullscreen click')
        if (
            document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            element = $('#bodybase').get(0);
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    }

}
document.getElementById('layoutDropDownSelect').onchange = function () {
    var p = document.getElementById('layoutDropDownSelect').value;
    //console.log(p);
    baseLayout.parse(p,true);
}

