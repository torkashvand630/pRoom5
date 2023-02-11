var recordControler = {
    isActive: 0,
    element: {        
        recordStatus: document.getElementById('recordStatus'),
        recordButton: document.getElementById('recordButton'),
        recordFileList: document.getElementById('recordFileList'), 
        recordRequstMessage: document.getElementById('recordRequstMessage'),
        meetLiveDiv: document.getElementById('meetLiveDiv')
    },

    onClick: function () {
        $('#recordModal').modal('toggle');
      
    },
    request: function () {
        var host = window.location.protocol + "//" + window.location.host;
        var m = { type: 'click', meetID: board.meetID, host: host };
       
       
        var recordServerMessag = { type: 'record', 'meetID': board.meetID };
        console.log(m);
        try {
          //  mqttClient.client.publish("recordMeet", JSON.stringify(recordServerMessag), mqttClient.sendOption)
            mqttClient.client.publish('recorder_get_' + board.serverID, JSON.stringify(m), mqttClient.sendOption)
            recordControler.element.recordRequstMessage.innerHTML = "your request send . wait for it to be processed ...";
            setTimeout(() => {
                recordControler.element.recordRequstMessage.innerHTML = "";
            }, 5000);
        }
        catch(err) {
            console.log('error in record request');
        }
    },
    getFileListRequest: function () {
       // if (board.user.permission.Record) {
            var userSub = 'user_' + board.meetID + '_' + board.userName;
            var m = { type: 'getFileListRequest', 'meetID': board.meetID, topic: userSub };
            mqttClient.client.publish("recordMeet_" + board.serverID, JSON.stringify(m), mqttClient.sendOption)
           // console.log(m)
       // }
      
    },
    setRecordeStatus: function (b) {
       
       // if (b == recordControler.isActive) return;
        if (b ) {
            recordControler.isActive = 1;
           // $(".recordIcon").css("color", "red");
            var obj = document.getElementById('recordIcon');
            if (obj) {
                obj.style.color = "red";
                obj.title='click to stop recording'
            }
            recordControler.element.recordButton.textContent = "click to stop recording";
            recordControler.element.recordStatus.textContent = "recording";
            if (board.live)
            recordControler.element.meetLiveDiv.style.display = "block";
        }
        else {
            recordControler.isActive = 0;
            //$(".recordIcon").css("color", "black");
            var obj = document.getElementById('recordIcon');
            if (obj) {
                obj.style.color = "black";
                obj.title = 'click to start recording'
            }
            recordControler.element.recordButton.textContent = "click to start recording";
            recordControler.element.recordStatus.textContent = "stop";
            if (board.live)
                recordControler.element.meetLiveDiv.style.display = "none";
        }
    },
    getFileList: function (m) {
        var fileList = m.fileList;
        if (fileList) {
            console.log(fileList);
            var s = '<table style="width:100%">'
            s += '<tr>'
            s += '<td> id </td>';
            s += '<td> open </td>';
            s += '<td> name </td>';

            s += '</tr>'
            var i = 1;
            fileList.forEach(element => {
                var dl = board.recordServer + element
                s += '<tr>'
                s += '<td> ' + i + ' </td>';
                s += '<td> <a target="_blank" href="' + dl + '">open</a> </td>';
                s += '<td> ' + element + ' </td>';

                s += '</tr>'
                i++;
            });
            s += '</table>'
            recordControler.element.recordFileList.innerHTML = s;
            return;
           // var s='<ui>'
            //for (var i = 0; i < fileList.length; i++) {
            //    var link = board.recordServer + fileList[i];
            //    s += '<li><a target="_blank" href="'+link+'" >' + fileList[i]+'</a></li>'
            //}
            //s += '<ui>'
            //recordControler.element.recordFileList.innerHTML = s;
        }
    },

    parse: function (m) {
       
        var action = m.action;
        switch (action) {
            case "fileList":
                recordControler.getFileList(m)
                break;
        }
    }
}