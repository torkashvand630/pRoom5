var appKey = "fligbahjpapbhblenooadccecphbhkmb";//
//appKey = "oicncahglhopngphgdbmjmfanbdndpfb";
//appKey = "hlfbgojaemojfcakkgloopnlbjnpjbpc";
//.\chrome.exe --disable-gpu --whitelisted-extension-id=fligbahjpapbhblenooadccecphbhkmb --autoplay-policy=no-user-gesture-required
// --disable-gpu --whitelisted-extension-id=mmobcjfceieidanlokabanhnhakodpcl --autoplay-policy=no-user-gesture-required


function extConnect() {
    var request = { type: "connect", serverID: serverID, mqttServer: mqttServer };
    console.log(request);
    chrome.runtime.sendMessage(appKey, request,
        function (response) {
            console.log(response);

        }
    );
}
extConnect();
var myRecorder = {
    clienClick: function (data) {
        var meetID = data.meetID;
        var host = data.host;
        console.log('meetID : ' + meetID + " host : " + host);
        var request = { rid: 1, duration: 100, action: "start", meetID: meetID, host: host };
        console.log(request);
        chrome.runtime.sendMessage(appKey,  request,
            function (response) {
                console.log(response);
               
            }
        );
        console.log("send request");
        // return;
       
    }
}
var mqttClient2 = {
    client: null,// = mqtt.connect("ws://localhost:8083/mqtt")
    isConnect: false,
    meetStatus: false,
    lastMessageTime: Date.now(),
    sendOption: { qos: 2 },

    connect: function () {
        var o = {   clientId: "recorder_client_" + serverID, username: "recorder_client_" + serverID   };
        var mqttUrl = mqttServer + "/mqtt";//"ws://localhost:9001/mqtt";//board.mediaServer.replace("/ws", "/mqtt");//
        mqttClient2.client = mqtt.connect(mqttUrl, o);
        mqttClient2.client.on('connect', function () {
            if (mqttClient2.isConnect) {
              //  window.location.reload(true);
                return false;
            }
            mqttClient2.isConnect = true;
            var sendSub = 'recorder_get_' + serverID ;
            // var userSub = 'user_' + board.meetID + '_' + board.userName;
            var sub = '{"' + sendSub + '": { "qos": 2 } }';

            mqttClient2.client.subscribe(JSON.parse(sub));
            // mqttClient2.client.subscribe("meet_send_" + board.meetID, { qos:2});
            // mqttClient2.client.subscribe("user_" + board.userName, { qos: 2 });
            console.warn("mqtt connect2 .. ");
            var m = {};
            m.type = "join";
            m.reConecting = false;

            mqttClient2.send(m);
            // var intervalID2 = setInterval(mqttClient2.interval2, 5000);

        });

        mqttClient2.client.on("message", function (topic, payload) {
             console.log("topic : " + topic + " m : " + payload);
            mqttClient2.parse(payload);
            // alert([topic, payload].join(": "))
            // client.end()
        })
        mqttClient2.client.on("error", function () {
            console.log("[MQTT] errror");
        })
        mqttClient2.client.on('offline', function () {
            console.log("[MQTT] Connection offline");

        });
        mqttClient2.client.on("reconnect", () => {
            console.log("RECONNECT");
        });
        mqttClient2.client.reconnecting = true;
        mqttClient2.client.options.reconnectPeriod = 1000;
    } ,
     
    send: function (m) {

        //  mqttClient2.client.publish(serverID + '_' + meetID + '_get_recorder', JSON.stringify(m))
        try {
            mqttClient2.client.publish('recorder_send_' + serverID, JSON.stringify(m), mqttClient2.sendOption)
        }
        catch {
            console.error('mqtt send error');
        }
    },
    parse: function (e) {
        //var d = Date.now() - 7000;
        //if (d < mqttClient2.lastMessageTime) {
        //    console.log("lastMessageTime");
        //    return;
        //}
        //mqttClient2.lastMessageTime = Date.now();
        console.log(e);
        var data = JSON.parse(e);


        switch (data.type) {
            case "start":
                myRecorder.start();
                break;
            case "stop":
                myRecorder.start();
                break;
            case "click":
                myRecorder.clienClick(data);
                break;

        }
    },
    sendcaptureEndMessage: function (name) {
        var m = { type: "captureEnd", meetID: meetID, fileName: name, serverID: serverID };
        try {
            mqttClient2.client.publish('recordMeet', JSON.stringify(m), mqttClient2.sendOption);
        }
        catch {
            console.error('mqtt send error');
        }
    }
}
//mqttClient2.connect();