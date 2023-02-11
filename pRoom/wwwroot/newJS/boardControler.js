var boardControler = {
    intervalID: null,
    pageId: 0,
    sendMessage:1,
    click: function () {
        var r = { type: "board", action: "pageSelect", p: 2,   m: "" };
        mainApp.sendToServer(r);
        return;
        if (boardControler.intervalID == null) {

            boardControler.intervalID = setInterval(boardControler.setInterval, 2000);
        }
        else {
            clearInterval(boardControler.intervalID);
            boardControler.intervalID = null;
            console.log('board controler interval stop')
        }
    },
    setInterval: function () {
        console.log('board controler interval');
        boardControler.pageId++;
        if (boardControler.pageId > 6) boardControler.pageId = 0;
        toPage(boardControler.pageId);
    }
}