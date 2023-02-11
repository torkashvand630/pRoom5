 
var diagramControler = {
    isActive: 0,
    diagramIframe: document.getElementById('diagramIframe'),
    lastMessage: null,
    getMessage: 0,
    sendMessage: 0,
    ui: 'min',//atlas

    diagramClick: function () {
        //if (screenControler.screenShareRemoteStatus || screenControler.screenShareStatus) {
        //    boardClick();
        //    return;
        //}
        if (diagramControler.isActive == 1)
            diagramControler.end();
        else {
            var m = { type: 'panelControler', action: 'Diagram' };
            var res = mainApp.sendToServer(m);
        }
       // diagramControler.start();
    },
    start: function () {

        // allowMessage = 0;
        //setTimeout(() => {
        //    allowMessage = 1;
        //},10000)
        panelControler.activeDiagram();
        if (diagramControler.isActive) return;
        diagramControler.isActive = 1;
        if (diagramControler.diagramIframe.src == null || diagramControler.diagramIframe.src == undefined || diagramControler.diagramIframe.src == "")
        {
            console.log('layout.id ' + layout.id + ' layout.sessionPanelPosetion ' + layout.sessionPanelPosetion);
            diagramControler.diagramIframe.src =  "/webapp/index.html?embed=0&ui=" + diagramControler.ui + "&spin=0&proto=json";
            if (layout.id == 1 && layout.sessionPanelPosetion == 3) {

                baseLayout.parse('11');
            }
        }
        else {
            if (diagramControler.lastMessage != null)
                diagramControler.diagramIframe.contentWindow.parentMessage(diagramControler.lastMessage);
        }

         
    },
    setPermissen: function (per) {
        if (per == 1) {
            diagramControler.ui = 'atlas';
        }
        else {
            diagramControler.ui = 'min';
        }
     
        if (!(diagramControler.diagramIframe.src == null || diagramControler.diagramIframe.src == undefined || diagramControler.diagramIframe.src == "")) {
            diagramControler.diagramIframe.src = "/webapp/index.html?embed=0&ui=" + diagramControler.ui + "&spin=0&proto=json";
        }
    },
    end: function () {
        
       // diagramControler.isActive = 0;
        boardClick();
    },
    iframeMessage: function (m) {
       
        if (!board.user.permission.diagram) {
            console.log(' diagram permissen eerroorr');
            diagramControler.sendLastMessage();
            return;
        }
        console.log('fff');
        console.log(m);
        var m = { type: 'diagram', m: m };
        if (diagramControler.getMessage == 1)
            mainApp.sendToServer(m);
        else {
            diagramControler.sendLastMessage();
        }
        // var iframe = document.getElementById("iframeId");
       // diagramControler.diagramIframe.contentWindow.parentMessage('kkkkkkkkk');
    },
    iframeMessageLoadComplate: function () {
        console.log("iframeMessageLoadComplate");
        diagramControler.sendMessage = 1;
        diagramControler.sendLastMessage();
        setTimeout(() => {
            diagramControler.getMessage = 1;
            diagramControler.sendLastMessage();
        }, 2000);
       
    },
    sendLastMessage: function () {
        if (diagramControler.lastMessage != null)
            diagramControler.diagramIframe.contentWindow.parentMessage(diagramControler.lastMessage);
    },
    parse: function (data) {
        diagramControler.lastMessage = data;
        var name = data.meetInfo.userName;
        if (name == board.userName) {
            console.log("this is my message");
            return;
        }
        if (diagramControler.isActive == 0)
        {
            diagramControler.start();
            return;
        }
        if (diagramControler.sendMessage == 0) return;
        console.warn('get diagram data from server .....');
        console.log(data);
        diagramControler.diagramIframe.contentWindow.parentMessage(data);
    },

}