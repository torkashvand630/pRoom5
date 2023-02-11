var panelControler = {
    activePanel: "board",
    nextPanel: null,
    selectNextPanel: function () {
        
        console.log("panelControler select next panel : " + panelControler.nextPanel);
        var n = panelControler.nextPanel;
        panelControler.prseAction(n);
        //if (n == "player") panelControler.activePlayer();
        //else panelControler.activeBoard();
        //setTimeout(()=>{ panelControler.nextPanel = null }, 12000);
    },
    parse: function (data) {
        screenControler.requestForDisconnect();
        panelControler.prseAction2(data.action);
    },
    prseAction: function (action) {
        if (screenControler.screenShareStatus) return;
        panelControler.prseAction2(action);
    },
    prseAction2: function (action) {
        
        switch (action) {
            case "board":
                panelControler.activeBoard();
                break;
            case "offic":
                officControler.start();
                break;
            case "Diagram":
                diagramControler.start();
                break;
            case "MathEditor":
                MathEditorControler.start();
                break;
            case "Develop":
                developControler.start();
                break;
            case "vPlayer":
                vPlayer.show();
                break;
            case "Conference":
                webRtcControler.start();
                break;
        }
    },
    activeBoard: function () {
        panelControler.nextPanel = "board";
        
        if (panelControler.activePanel == "board") return;
        panelControler.activePanel = "board";
      //  panelControler.disconectScreenShare();
      //  panelControler.stopPlayer();
        //vPlayer.isHide = 1;

        panelControler.disableAll();
        document.getElementById('boardHtmlpanel').style.visibility = "visible";
        $(".boardIcon").css("color", "red");

       
    },
    activePlayer: function () {
        panelControler.nextPanel = "vPlayer";
        
        if (panelControler.activePanel == "vPlayer") return;
        panelControler.activePanel = "vPlayer";
       // panelControler.disconectScreenShare();
        //vPlayer.isHide = 0;
        panelControler.disableAll();
       // document.getElementById('boardHtmlpanel').style.display = "none";
      //  document.getElementById('screenSharePanel').style.display = "block";       
        //  document.getElementById('screenShareElemnt').style.display = "none";
        document.getElementById('vidioPlayerElement').style.display = "block";
        document.getElementById('vidioPlayerElement').style.visibility = "visible";
      //  $(".farfar").css("color", "black");
        $("vPlayerIconPanel").css("color", "red");
        
    },
    activeScreen: function () {
      //  panelControler.nextPanel = "board";
       // console.log("panelControler : " + panelControler.activePanel);
      // console.log( panelControler.activePanel )
        if (panelControler.activePanel == "screen") return;
        panelControler.activePanel = "screen";
       // panelControler.stopPlayer();
        //vPlayer.isHide = 1;
        panelControler.disableAll();
       // document.getElementById('screenSharePanel').style.display = "block";
        //   document.getElementById('boardHtmlpanel').style.display = "none";
        document.getElementById('screenShareElemnt').style.visibility = "visible";
      //  document.getElementById('vidioPlayerElement').style.display = "none";
      
        $(".screanShareIcon").css("color", "red");

       
    },
    activeDiagram: function () {
        panelControler.nextPanel = "Diagram";
        //console.log("panelControler ................................................................ : " + panelControler.activePanel);
        if (panelControler.activePanel == "Diagram") return;
        panelControler.activePanel = "Diagram";
        
        panelControler.disableAll();
      //  document.getElementById('screenSharePanel').style.display = "block";
        
        // document.getElementById('diagramPanel').style.display = "block";
        document.getElementById('diagramPanel').style.visibility = "visible";

        $(".diagramIcon").css("color", "red");


    },

    activeOffic: function () {
        panelControler.nextPanel = "offic";
        console.log("panelControler : " + panelControler.activePanel);
        if (panelControler.activePanel == "offic") return;
        panelControler.activePanel = "offic";

        panelControler.disableAll();
        //  document.getElementById('screenSharePanel').style.display = "block";

        // document.getElementById('diagramPanel').style.display = "block";
        document.getElementById('officPanel').style.visibility = "visible";

        $(".officIcon").css("color", "red");


    },

    activeMathEditor: function () {
        panelControler.nextPanel = "MathEditor";
        //console.log("panelControler** : " + panelControler.activePanel);
        if (panelControler.activePanel == "MathEditor") return;
        panelControler.activePanel = "MathEditor";

        panelControler.disableAll();
        //  document.getElementById('screenSharePanel').style.display = "block";

        document.getElementById('MathEditorPanel').style.visibility = "visible";


        $(".MathEditorIcon").css("color", "red");


    },
    activeDevelop: function () {
        panelControler.nextPanel = "Develop";
       
        if (panelControler.activePanel == "Develop") return;
        panelControler.activePanel = "Develop";
        panelControler.disableAll();         
        document.getElementById('developPanel').style.visibility = "visible";
        $(".developPanelIcon").css("color", "red");


    },
    activeConference: function () {
        

        if (panelControler.activePanel == "Conference") return;
        panelControler.activePanel = "Conference";
        panelControler.disableAll();
       // document.getElementById('developPanel').style.visibility = "visible";
        baseLayout.parse(layout.id+'4');
        $(".screanShareIcon").css("color", "red");


    },


    disableAll: function () {
        if (panelControler.activePanel != "Conference")
            panelControler.DisconnectConfrance();
        if (panelControler.activePanel != "player")
        panelControler.stopPlayer();

        //document.getElementById('screenShareElemnt').style.display = "none";
        //document.getElementById('vidioPlayerElement').style.display = "none";
        //document.getElementById('screenSharePanel').style.display = "none";
        //document.getElementById('boardHtmlpanel').style.display = "none";
        //document.getElementById('diagramPanel').style.display = "none";
        //document.getElementById('MathEditorPanel').style.display = "none";centerPanelItem 

        $(".centerPanelItem").css("visibility", "hidden");
        document.getElementById('vidioPlayerElement').style.display = "none";
       // $(".vjs-has-started").css("visibility", "hidden");

        diagramControler.isActive = 0;
        MathEditorControler.isActive = 0;
        officControler.isActive = 0;
        webRtcControler.isActive = 0;
        developControler.end();
        $(".farfar").css("color", "black");
    },
    disconectScreenShare: function () {
        if (screenControler.screenShareStatus) {
            screenControler.stopOwnScreenShare();
        }
        else {
            screenControler.disconnectFromScreenShare();
        }
    },
    stopPlayer: function () {
        vPlayer.isActive = 0;
        try {
            vPlayer.stop();
          
        }
        catch {
            console.log('errror in stop player')
        }
       
    },
    DisconnectConfrance: function () {
        webRtcControler.isActive = 0;
        layout.load();
       // webRtcControler.isActive = 0;
    }
}