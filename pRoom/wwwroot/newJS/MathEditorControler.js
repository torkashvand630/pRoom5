var MathEditorControler = {
    isActive: 0,
    MathEditorIframe: document.getElementById('MathEditorIframe'),
    lastMessage: 'JGpqalxzdW17a30gClxcIFxwcm9ke3B9ICQ=',
    getMessage: 0,
    sendMessage: 0,
    ui: 'min',//atlas
    iframSrc:  "/VisualMathEditor/VisualMathEditor.html?style=black&runLocal",
    iframSrcDefult : '',
    iframSrcLimit:  '/VisualMathEditor/jaxEditor/index.html',// "/VisualMathEditor/mylatex/index.html",
    isLimit: 1,
    permission: 1,
    onClick: function () {
        //if (screenControler.screenShareRemoteStatus || screenControler.screenShareStatus) {
        //    console.log("math click and screen is active");
        //    boardClick();
        //    return;
        //}
        //console.log("math click");
        if (MathEditorControler.isActive == 1)
            MathEditorControler.end();
        else {
            var m = { type: 'panelControler', action: 'MathEditor' };
            var res = mainApp.sendToServer(m);
        }
       // MathEditorControler.start();
        // diagramControler.start();
    },
    start: function (force) {
        MathEditorControler.init();
        // allowMessage = 0;
        //setTimeout(() => {
        //    allowMessage = 1;
        //},10000)
        panelControler.activeMathEditor();
        if (MathEditorControler.isActive) return;
        MathEditorControler.isActive = 1;
        // if (!board.user.permission.MathEditor) return;
        if (force || MathEditorControler.MathEditorIframe.src == null || MathEditorControler.MathEditorIframe.src == undefined || MathEditorControler.MathEditorIframe.src == "") {

            MathEditorControler.MathEditorIframe.src = MathEditorControler.iframSrcDefult;//runLocal
            if (layout.id == 1 && layout.sessionPanelPosetion == 3 && board.user.permission.MathEditor) {

                baseLayout.parse('11');
            }
            if (MathEditorControler.isLimit==0) {
                if (MathEditorControler.lastMessage != null && MathEditorControler.sendMessage )
                    setTimeout(() => {
                        MathEditorControler.MathEditorIframe.contentWindow.parentMessage(MathEditorControler.lastMessage);
                    },1000);
                  
            }
        }
        else {
           // return;
            if (MathEditorControler.lastMessage != null && MathEditorControler.sendMessage)
                MathEditorControler.MathEditorIframe.contentWindow.parentMessage(MathEditorControler.lastMessage);

        }
       


    },
    end: function () {

        // diagramControler.isActive = 0;
        boardClick();
    },
    iframeMessage: function (m) {

        if (!board.user.permission.MathEditor) {
            console.log(' MathEditor permissen eerroorr');
            MathEditorControler.sendLastMessage();
            return;
        }
       // var img = m.img;
        //decodedString = atob(img);
        //document.getElementById('videos').innerHTML = decodedString;
      //  console.log('fff');
       //  console.log(m);
        
        var m = { type: 'MathEditor', m: m };
        if (MathEditorControler.getMessage == 1)
            mainApp.sendToServer(m);
        // var iframe = document.getElementById("iframeId");
        // diagramControler.diagramIframe.contentWindow.parentMessage('kkkkkkkkk');
    },
    iframeMessageLoadComplate: function () {
        console.log("iframeMessageLoadComplate math");
      
       
      //  MathEditorControler.sendLastMessage();
        setTimeout(() => {
            MathEditorControler.sendMessage = 1;
           MathEditorControler.sendLastMessage();
            MathEditorControler.getMessage = 1;
          //  MathEditorControler.setPermissen(board.user.permission.MathEditor);
          
           
        }, 1000);

    },
    sendLastMessage: function () {
        if (MathEditorControler.lastMessage != null)
            MathEditorControler.MathEditorIframe.contentWindow.parentMessage(MathEditorControler.lastMessage);
    },
    parse: function (data) {
        MathEditorControler.lastMessage = data.m;
        var name = data.meetInfo.userName;
        if (name == board.userName) {
            console.log("this is my message");
            return;
        }
        if (MathEditorControler.isActive == 0) {
            MathEditorControler.start();
            return;
        }
        if (MathEditorControler.sendMessage == 0) return;
        console.warn('get diagram data from server .....');
        console.log(data);
        MathEditorControler.MathEditorIframe.contentWindow.parentMessage(data.m);
    },
    init: function () {
        var per = board.user.permission.MathEditor;
        var w = $("#screenAndBoard").width();
        if ( w>10) {
            MathEditorControler.iframSrcDefult = MathEditorControler.iframSrc;
            MathEditorControler.isLimit = 0;
        }
        else {
            MathEditorControler.iframSrcDefult = MathEditorControler.iframSrcLimit;
            MathEditorControler.sendMessage = 1;
            MathEditorControler.isLimit = 1;
        }
    },
    setPermissen: function (per) {
       // MathEditorControler.init();
        if (per != MathEditorControler.permission) {
            MathEditorControler.permission = per;
            //if (MathEditorControler.isActive) {
            //    MathEditorControler.isActive = 0;
            //    MathEditorControler.MathEditorIframe.src = null;
            //    MathEditorControler.start(true);

            //}
        }
       
    },
}