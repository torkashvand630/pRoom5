var signalmessenger = {
    connected:0,
    connection:0,
    connect: function () {

        signalmessenger.connection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.None)
            .withUrl("/chatHub?meetid=" + board.meetID + "&userid=" + board.userName ).build();//.withAutomaticReconnect([0, 2000, 10000, 30000]).build();

        //Disable the send button until connection is established. 
        signalmessenger.start();

        signalmessenger.connection.on("ReceiveMessage", function (message) {
            //console.warn(message)
            mqttClient.parse(message);
           // console.warn(JSON.parse(message))
        });

       
        //$.signalmessenger.connection.hub.reconnecting(function () {
        //    console.warn("reconnecting ....")
        //});

        //$.signalmessenger.connection.hub.reconnected(function () {
        //    console.warn("reconnected")
        //});
        signalmessenger.connection.onreconnected(connectionId => {
            console.warn("reconnected")
        });
        signalmessenger.connection.onclose(error =>  {
            console.warn("dicxonnrct")
            appActions.disconnectRoom();
             
             
            signalmessenger.disconnectError();
            setTimeout(() => {
                signalmessenger.start();
            }, 1000);
        });
        //signalmessenger.connection.hub.disconnected=function () {
        //    console.warn("dicxonnrct")
        //    //if (tryingToReconnect) {
        //    //    notifyUserOfDisconnect(); // Your function to notify user.
        //    //}
        //};
         
    },
    start: function () {
        console.log('try connect to wss ............')
        signalmessenger.connection.start({ transport: 'webSockets' }).then(function () {
            
            console.warn('signal  start ..........................')
           // var m = { type: "join", reConecting: false, role: board.publish };
            if (signalmessenger.connected) {
                // var url = new URL(window.location);
                // url.searchParams.set('x', 1);
                // window.location.href = url.href;
                // window.location.reload(true);
                // return;
                //  m = { type: "join", reConecting: true, role: board.publish };
                signalmessenger.connectionNotify();
            }

          //  mainApp.sendToServer(m);
            if (!signalmessenger.connected) {
                var intervalID2 = setInterval(mqttClient.interval2, 5000);
            }
            signalmessenger.connected = 1;
           
            //m.type = "join";
            //m.reConecting = false;
            //m.role = board.publish;
           
           

        }).catch(function (err) {
            console.error(err.toString());
            setTimeout(function () {
                signalmessenger.start();
            }, 3000); // Restart connection after 5 seconds.
        });
    },
    send: function (m) {
       
        
        try {
             signalmessenger.connection.invoke("SendMessage", m);
        } catch (err) {
            console.error(err);
            signalmessenger.disconnectError();
        }
        //signalmessenger.connection.invoke("SendMessage", m).catch(function (err) {
        //     console.error(err.toString());
        //}); 
    },
    close: function () {
        
        if (signalmessenger.connection.state == 'Disconnected') {
            signalmessenger.start()
            console.log('Disconnected');
            return;
        }
        if (signalmessenger.connection.state == 'Connected') {
            console.log('close')
           // return;
            signalmessenger.connection.stop().then(function () {
                console.log('Closed');
               // connection = null;
            });
            return;
        }
    },
    disconnectError: function () {
        $.notify({
            message: board.translate.connectionLost
        }, {
            placement: {
                from: "top",
                align: "left"
            },
            delay: 2000, 
            type: 'danger'
        });
    },
     connectionNotify: function () {
        $.notify({
            message: board.translate.ServerConnection
        }, {
            placement: {
                from: "top",
                align: "left"
            },
            delay: 2500,
            type: 'success'
        });
    }
     
}