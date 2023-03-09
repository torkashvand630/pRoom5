var board = {}
var loading = {
    start: function () {
       // loading.sendJoinReauest();
        $('#deviceUnpublisherModal').modal('toggle');
    },
    sendJoinReauest: function (userName,meetID,tpass,type) {
        
        $.ajax({
            url: "/home/join",
            type: "POST",
            data: JSON.stringify({ "meetID": meetID, "userMame": userName, "tpass": tpass, "type": type }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log('succ');
                // console.log(data);
                loading.hamdelJoinResponse(data);

              
            },
            complete: function (data) {
               // console.log('com');
              //  console.log(data);
                

            }
        });

    },
    hamdelJoinResponse: function (data) {
        board = JSON.parse(data);
        if (board.state == 2) {
            board.translate = userMeetInfo.translate;
            $('#deviceUnpublisherModal').modal('toggle');
            loading.initApp();
        }
        if (board.state == 3) {
            document.getElementById("errMessage").innerHTML = "error";
             
        }
        console.log(board)
       
    },
    initApp: function () {
        mainApp.meetInfo.userName = board.userName;
        mainApp.meetInfo.meetID = board.meetID;
        console.log(mainApp);
        layout.load();        
        resizeNewBoard();
        board.isToch = is_touch_enabled();
         
        //if (!board.isRecorder) {
        //    const params = new URL(window.location).searchParams;
        //    var reloadparam = params.get('x');
        //    if ((reloadparam == 0))
        //        mainApp.start();

        //    else $('#deviceUnpublisherModal').modal('toggle');
        //}
        //else {
        //    mainApp.start();
             
        //}
        mainApp.start();

        
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
    },
    sendForm: function () {
        document.getElementById("errMessage").innerText = "";
        var userName = document.getElementById("userName").value;
        if (userName == "" || userName == undefined) {
            document.getElementById("errMessage").innerText = userMeetInfo.translate.front_start_username_empty_message;
            return;
        }
        var tpass = "0";

        if (userMeetInfo.password!="0") tpass= document.getElementById("tpass").value;
        console.log("userName : " + userName);
        console.log("tpass : " + tpass);
        var meetID = userMeetInfo.meetID;
        loading.sendJoinReauest(userName, meetID, tpass, 't');

    }
}