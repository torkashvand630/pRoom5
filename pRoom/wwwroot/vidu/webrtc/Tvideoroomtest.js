
//var server = "ws://localhost/wsc";// "wss://" + board.mediaServer + ":8989/ws";
//var server =  "wss://meet2.salampnu.com/wsc" ;

var server = "wss://" + board.mediaServer +":8989/ws";
//var server = "ws://95.216.243.8:8188/ws";
var janus = null;
var sfutest = null;
var opaqueId = "videoroomtest-" + randomString(12);

var myroom = parseInt(board.meetID);	// Demo room2
var rrrr;
var myusername = board.nickName; 
var myid = null; 
var mystream = null;
// We use this other ID just to map our subscriptions to us 
var mypvtid = null;

var feeds = [];
var bitrateTimer = [];
var capture = null;
var role = 'publisher';
var doSimulcast = (getQueryStringValue("simulcast") === "yes" || getQueryStringValue("simulcast") === "true");
var LocalAudioTrack = false;
var LocalVideoTrack = false;
var localVideoAudioTrack = false;
function localVideoAudioClick() {
    if (!board.user.permission.video) return;
    if (localVideoAudioTrack) {
        //iconDisablVidu(2000, iconViduPanel);
        unpublishOwnFeed();
        return;
    }
    if (LocalAudioTrack) {
        unpublishOwnFeed();
        setTimeout(() => { publishOwnFeed(true, true) }, 2000);
        return;
    }
    publishOwnFeed(true, true);
    return;

    var PreAVal = LocalAudioTrack;
    var PreVVal = LocalVideoTrack;
    if (LocalAudioTrack || LocalVideoTrack) {
        iconDisablVidu(5000, iconViduPanel);
        unpublishOwnFeed();
        setTimeout(() => { publishOwnFeed(PreAVal, !PreVVal) }, 2000);
    }
    else {
        iconDisablVidu(2000, iconViduPanel);
        publishOwnFeed(LocalAudioTrack, true);
    }
}


function LocalVideoClick() {
    if (!board.user.permission.video) return;
    if (!LocalAudioTrack && LocalVideoTrack) {
        iconDisablVidu(2000, iconViduPanel);
        unpublishOwnFeed();
        return;
    }
    var PreAVal = LocalAudioTrack;
    var PreVVal = LocalVideoTrack;
    if (LocalAudioTrack || LocalVideoTrack) {
        iconDisablVidu(5000, iconViduPanel);
        unpublishOwnFeed();
        setTimeout(() => { publishOwnFeed(PreAVal, !PreVVal) }, 2000);
    }
    else {
        iconDisablVidu(2000, iconViduPanel);
        publishOwnFeed(LocalAudioTrack, true);
    }
}
function LocalAudioClick() {
    if (!board.user.permission.audio) return;
    if (LocalAudioTrack ) {
        iconDisablVidu(2000, iconViduPanel);
        unpublishOwnFeed();
        return;
    }
    if (!LocalAudioTrack  ) {
        iconDisablVidu(2000, iconViduPanel);
        publishOwnFeed(true, false) 
        return;
    }
    return;
    var PreAVal = LocalAudioTrack;
    var PreVVal = LocalVideoTrack;
    if (LocalAudioTrack || LocalVideoTrack) {
        iconDisablVidu(5000, iconViduPanel);
        unpublishOwnFeed();
        setTimeout(() => { publishOwnFeed(!PreAVal, PreVVal) }, 2000);
    }
    else {
        iconDisablVidu(2000, iconViduPanel);
        publishOwnFeed(true, LocalVideoTrack);
    }
}
function publishlocalTrack(audio, vidio) {

}
$(document).ready(function () {

   

});
function confreancInit() {
   // document.cookie = 'aaa=https://meet.salampnu3.com:8989;path=/';
    document.cookie = 'aaa=http://172.18.0.1:8188;path=/';
   // document.cookie = 'aaa=https://meet.salampnu.com:8989;path=/';
   // document.cookie = 'aaa=https://localhost2:8989/ws ; path=/';
    Janus.init({
        debug: "all", callback: function () {

            $(this).attr('disabled', true).unbind('click');

            if (!Janus.isWebrtcSupported()) {
                //console.log("No WebRTC support... ");
                return;
            }

            janus = new Janus(
                {
                    server: server,
                   // iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                   // iceServers: [{ urls: "turn:r1.salampnu.com.com:3478", username: "ali", credential: "ali" }],
                      // iceServers: [{ urls: "turns:meet.salampnu.com.com:446?transport=udp", username: "pion", credential: "ion" }],
                    success: function () {

                        janus.attach(
                            {
                                plugin: "janus.plugin.videoroom",
                                opaqueId: opaqueId,
                                success: function (pluginHandle) {

                                    sfutest = pluginHandle;
                                    Janus.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
                                    Janus.log("  -- This is a publisher/manager");

                                    registerUsername();

                                },
                                error: function (error) {
                                    Janus.error("  -- Error attaching plugin...", error);
                                    console.log("Error attaching plugin... " + error);
                                },
                                consentDialog: function (on) {
                                    Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");

                                },
                                mediaState: function (medium, on) {
                                    Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
                                   
                                },
                                webrtcState: function (on) {
                                    Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");

                                    if (!on)
                                        return;

                                },
                                onmessage: function (msg, jsep) {
                                    Janus.debug(" ::: Got a message (publisher) :::");

                                    Janus.debug(msg);
                                    console.warn("meesage 1");
                                    console.warn(msg);
                                    console.warn(jsep);
                                    var event = msg["videoroom"];
                                    Janus.debug("Event: " + event);
                                    if (event != undefined && event != null) {
                                        if (event === "joined") {
                                            // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                                            myid = msg["id"];
                                            mypvtid = msg["private_id"];
                                            Janus.log("Successfully joined room " + msg["room"] + " with ID " + myid);
                                            //publishOwnFeed(true);
                                            // Any new feed to attach to?
                                            if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
                                                var list = msg["publishers"];
                                                Janus.debug("Got a list of available publishers/feeds:");
                                                Janus.debug(list);
                                                for (var f in list) {
                                                    var id = list[f]["id"];
                                                    var display = list[f]["display"];
                                                    var audio = list[f]["audio_codec"];
                                                    var video = list[f]["video_codec"];
                                                    Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                                                    newRemoteFeed(id, display, audio, video);
                                                }
                                            }
                                        } else if (event === "destroyed") {
                                            // The room has been destroyed
                                            Janus.warn("The room has been destroyed!");
                                            console.log("The room has been destroyed", function () {
                                                //window.location.reload();
                                            });
                                        } else if (event === "event") {
                                            // Any new feed to attach to?
                                            if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
                                                var list = msg["publishers"];
                                                Janus.debug("Got a list of available publishers/feeds:");
                                                Janus.debug(list);
                                                for (var f in list) {
                                                    var id = list[f]["id"];
                                                    var display = list[f]["display"];
                                                    var audio = list[f]["audio_codec"];
                                                    var video = list[f]["video_codec"];
                                                    Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                                                  
                                                    newRemoteFeed(id, display, audio, video);
                                                }
                                            } else if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
                                                // One of the publishers has gone away?
                                                var leaving = msg["leaving"];
                                                Janus.log("Publisher left 1: " + leaving);
                                                var remoteFeed = null;
                                                for (var i = 1; i < 6; i++) {
                                                    if (feeds[i] != null && feeds[i] != undefined && feeds[i].rfid == leaving) {
                                                        remoteFeed = feeds[i];
                                                        break;
                                                    }
                                                }
                                                if (remoteFeed != null) {
                                                    Janus.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");

                                                    feeds[remoteFeed.rfindex] = null;
                                                    remoteFeed.detach();
                                                }
                                            } else if (msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
                                                // One of the publishers has unpublished?
                                                var unpublished = msg["unpublished"];
                                                var ufrid = unpublished;
                                                //document.getElementsByClassName(unpublished)[0].remove();
                                                Janus.log("Publisher left 2: " + unpublished);
                                                if (unpublished === 'ok') {
                                                    // That's us
                                                    sfutest.hangup();
                                                    return;
                                                }
                                                var remoteFeed = null;
                                                for (var i = 1; i < 6; i++) {
                                                    if (feeds[i] != null && feeds[i] != undefined && feeds[i].rfid == unpublished) {
                                                        remoteFeed = feeds[i];
                                                        break;
                                                    }
                                                }
                                                if (remoteFeed != null) {
                                                    Janus.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");

                                                    feeds[remoteFeed.rfindex] = null;
                                                    remoteFeed.detach();
                                                }
                                            } else if (msg["error"] !== undefined && msg["error"] !== null) {
                                                if (msg["error_code"] === 426) {
                                                    // This is a "no such room" error: give a more meaningful description
                                                    console.log(
                                                        "<p>Apparently room <code>" + myroom + "</code> (the one this demo uses as a test room) " +
                                                        "does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.cfg</code> " +
                                                        "configuration file? If not, make sure you copy the details of room <code>" + myroom + "</code> " +
                                                        "from that sample in your current configuration file, then restart Janus and try again."
                                                    );
                                                } else {
                                                    console.log(msg["error"]);
                                                }
                                            }
                                        }
                                    }
                                    if (jsep !== undefined && jsep !== null) {
                                        Janus.debug("Handling SDP as well...");
                                        Janus.debug(jsep);
                                        sfutest.handleRemoteJsep({ jsep: jsep });
                                        // Check if any of the media we wanted to publish has
                                        // been rejected (e.g., wrong or unsupported codec)
                                        var audio = msg["audio_codec"];
                                        if (mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audio) {
                                            // Audio has been rejected
                                            toastr.warning("Our audio stream has been rejected, viewers won't hear us");
                                        }
                                        var video = msg["video_codec"];
                                        if (mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !video) {
                                            // Video has been rejected
                                            toastr.warning("Our video stream has been rejected, viewers won't see us");
                                            // Hide the webcam video
                                            //$('#myvideo').hide();
                                            //$('#videolocal').append(
                                            //	'<div class="no-video-container">' +
                                            //	'<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                                            //	'<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
                                            //	'</div>');
                                        }
                                    }
                                },
                                onlocalstream: function (stream) {
                                    Janus.debug(" ::: Got a local stream :::");
                                    console.warn(stream);
                                    mystream = stream;
                                    Janus.debug(stream);
                                    //$('#videojoin').hide();
                                    //$('#videos').removeClass('hide').show();
                                    //if ($('#myvideo').length === 0) {
                                    var videoTracks = stream.getVideoTracks();

                                    console.warn(videoTracks);
                                    var audioTracks = stream.getAudioTracks();
                                    var displayStyle = "block";
                                    if (videoTracks.length > 0) {
                                        document.getElementById('mute-video').style.color = "red";
                                        LocalVideoTrack = true;
                                    }
                                    else {
                                        document.getElementById('mute-video').style.color = "black";
                                        LocalVideoTrack = false;
                                        displayStyle = "none";
                                    }
                                    if (audioTracks.length > 0) {
                                        document.getElementById('mute-audio').style.color = "red";
                                        LocalAudioTrack = true;
                                    }
                                    else {
                                        document.getElementById('mute-audio').style.color = "black";
                                        LocalAudioTrack = false;
                                    }
                                    if (LocalAudioTrack && LocalVideoTrack) localVideoAudioTrack = true;
                                    else localVideoAudioTrack = false;
                                    var newDiv = document.createElement("div");
                                    newDiv.classList += "videoItemPanel vidioItem_0";
                                    newDiv.id = 'vidioItem_0';
                                    var videoElement = document.createElement('video');
                                    newDiv.appendChild(videoElement);
                                    document.getElementById('videos').appendChild(newDiv);
                                    videoElement.classList = 'rounded centered videoItem';
                                    videoElement.id = 'remoteVideo_0';
                                    videoElement.autoplay = true;
                                    videoElement.controls = true;
                                    videoElement.muted = true;
                                    videoElement.style.maxWidth = '100%';
                                    videoElement.style.display = displayStyle;




                                    //$('#myvvv').append('<video class="rounded centered" id="myvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>');
                                    // Add a 'mute' button
                                    //$('#videolocal').append('<button class="btn btn-warning btn-xs" id="mute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</button>');
                                    //$('#mute').click(toggleMute);
                                    //// Add an 'unpublish' button
                                    //$('#videolocal').append('<button class="btn btn-warning btn-xs" id="unpublish" style="position: absolute; bottom: 0px; right: 0px; margin: 15px;">Unpublish</button>');
                                    //$('#unpublish').click(unpublishOwnFeed);
                                    //}
                                    //$('#publisher').removeClass('hide').html(myusername).show();
                                    Janus.attachMediaStream($('#remoteVideo_0').get(0), stream);
                                    //recorderAddStreem(stream);
                                   
                                    //$("#myvideo").get(0).muted = "muted";
                                    if (sfutest.webrtcStuff.pc.iceConnectionState !== "completed" &&
                                        sfutest.webrtcStuff.pc.iceConnectionState !== "connected") {
                                        //$("#videolocal").parent().parent().block({
                                        //	message: '<b>Publishing...</b>',
                                        //	css: {
                                        //		border: 'none',
                                        //		backgroundColor: 'transparent',
                                        //		color: 'white'
                                        //	}
                                        //});
                                    }

                                    resizingVideoBox()
                                    console.warn(audioTracks);
                                    //if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                                    //	// No webcam
                                    //	$('#myvideo').hide();
                                    //	if ($('#videolocal .no-video-container').length === 0) {
                                    //		$('#videolocal').append(
                                    //			'<div class="no-video-container">' +
                                    //			'<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                                    //			'<span class="no-video-text">No webcam available</span>' +
                                    //			'</div>');
                                    //	}
                                    //} else {
                                    //	$('#videolocal .no-video-container').remove();
                                    //	$('#myvideo').removeClass('hide').show();
                                    //}
                                },
                                onremotestream: function (stream) {
                                    console.log("get remote streem .................................................................**************");
                                    console.warn(remoteFeed);
                                    Janus.debug("Remote feed #" + remoteFeed.rfindex);
                                    var addButtons = false;
                                    if ($('#remoteVideo_' + remoteFeed.rfindex).length === 0) {
                                        var videoT = stream.getVideoTracks();

                                        console.warn(videoT);

                                        var displayStyle = "block";
                                        if (videoT.length < 1) displayStyle = "none";


                                        var newDiv = document.createElement("div");
                                        newDiv.classList += "videoItemPanel vidioItem_" + remoteFeed.rfid;
                                        newDiv.id = "vidioItem_" + remoteFeed.rfid;
                                        var videoElement = document.createElement('video');
                                        newDiv.appendChild(videoElement);
                                       

                                       
                                            document.getElementById('videos').appendChild(newDiv);
                                            videoElement.style.display = displayStyle;
                                            videoElement.classList = 'rounded centered videoItem';
                                        



                                        videoElement.id = 'remoteVideo_' + remoteFeed.rfindex;
                                        videoElement.autoplay = true;
                                        videoElement.controls = true;
                                        videoElement.style.maxWidth = '100%';

                                    }

                                    Janus.attachMediaStream($('#remoteVideo_' + remoteFeed.rfindex).get(0), stream);
                                    
                                    setTimeout(() => { resizingVideoBox(); }, 4000);
                                    var videoTracks = stream.getVideoTracks();
                                    if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                                        // No remote video
                                        //$('#remotevideo' + remoteFeed.rfindex).hide();
                                        if ($('#videoremote' + remoteFeed.rfindex + ' .no-video-container').length === 0) {
                                            $('#videoremote' + remoteFeed.rfindex).append(
                                                '<div class="no-video-container">' +
                                                '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                                                '<span class="no-video-text">No remote video available</span>' +
                                                '</div>');
                                        }
                                    } else {
                                        //$('#videoremote' + remoteFeed.rfindex + ' .no-video-container').remove();
                                        //$('#remotevideo' + remoteFeed.rfindex).removeClass('hide').show();
                                    }
                                    if (!addButtons)
                                        return;
                                    if (Janus.webRTCAdapter.browserDetails.browser === "chrome" || Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
                                        Janus.webRTCAdapter.browserDetails.browser === "safari") {
                                        $('#curbitrate' + remoteFeed.rfindex).removeClass('hide').show();
                                        bitrateTimer[remoteFeed.rfindex] = setInterval(function () {
                                            // Display updated bitrate, if supported
                                            var bitrate = remoteFeed.getBitrate();
                                            $('#curbitrate' + remoteFeed.rfindex).text(bitrate);
                                            // Check if the resolution changed too
                                            //var width = 250;// $("#remotevideo" + remoteFeed.rfindex).get(0).videoWidth;
                                            //var height = 250;// $("#remotevideo" + remoteFeed.rfindex).get(0).videoHeight;
                                            //if (width > 0 && height > 0)
                                            //	$('#curres' + remoteFeed.rfindex).removeClass('hide').text(width + 'x' + height).show();
                                        }, 1000);
                                    }
                                },
                                oncleanup: function () {
                                    //stopRecord();
                                    Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
                                    mystream = null;
                                    $("#vidioItem_0").remove();
                                    LocalAudioTrack = false;
                                    LocalVideoTrack = false;
                                    localVideoAudioTrack = false;
                                    document.getElementById('mute-video').style.color = "black";

                                    document.getElementById('mute-audio').style.color = "black";

                                    resizingVideoBox()
                                    //$('#videolocal').html('<button id="publish" class="btn btn-primary">Publish</button>');
                                    //$('#publish').click(function () { publishOwnFeed(true); });
                                    //$("#videolocal").parent().parent().unblock();
                                    //$('#bitrate').parent().parent().addClass('hide');
                                    //$('#bitrate a').unbind('click');
                                }
                            });
                    },
                    error: function (error) {
                        Janus.error(error);
                        console.log(error, function () {
                            //window.location.reload();
                        });
                    },
                    destroyed: function () {
                        //window.location.reload();
                    }
                });
            //});
        }
    });
}
function checkEnter(field, event) {
    var theCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (theCode == 13) {
        registerUsername();
        return false;
    } else {
        return true;
    }
}

function registerUsername() {
    myusername = 'alipppppppp';
    var register = { "request": "join", "room": myroom, "ptype": "publisher", "display": myusername };

    sfutest.send({ "message": register });


}

function publishOwnFeed(useAudio, useVideo) {

    sfutest.createOffer(
        {

            media: {
                audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: useVideo,
                audio: {
                    deviceId: {
                        exact: device.audioDevice
                    }
                },
                video: {
                    width: 200,
                    height:200,
                    deviceId: {
                        exact: device.videoDevice
                    }
                } 
                //video: "lowres"
            },	// Publishers are sendonly

            simulcast: doSimulcast,
            success: function (jsep) {
                Janus.debug("Got publisher SDP!");
                Janus.debug(jsep);
                var publish = { "request": "configure", "audio": useAudio, "video": useVideo};

                sfutest.send({ "message": publish, "jsep": jsep });
            },
            error: function (error) {
                Janus.error("WebRTC error:", error);
                if (useAudio) {
                    //publishOwnFeed(false);
                } else {
                    console.log("WebRTC error... " + JSON.stringify(error));
                    //$('#publish').removeAttr('disabled').click(function () { publishOwnFeed(true); });
                }
            }
        });
}

function toggleMute() {
    var muted = sfutest.isAudioMuted();
    Janus.log((muted ? "Unmuting" : "Muting") + " local stream...");
    if (muted)
        sfutest.unmuteAudio();
    else
        sfutest.muteAudio();
    muted = sfutest.isAudioMuted();
    $('#mute').html(muted ? "Unmute" : "Mute");
}

function unpublishOwnFeed() {
    // Unpublish our stream
    //$('#unpublish').attr('disabled', true).unbind('click');
    var unpublish = { "request": "unpublish" };
    sfutest.send({ "message": unpublish });
}

function newRemoteFeed(id, display, audio, video) {
    if (!display) return;
    var remoteFeed = null;
    if (display.startsWith("screen")) {
        iconDisablVidu(6000, MainNavBar);
    }
    var preScreenShareStatus = screenControler.screenShareStatus;
    janus.attach(
        {
            plugin: "janus.plugin.videoroom",
            opaqueId: opaqueId,
            success: function (pluginHandle) {
                remoteFeed = pluginHandle;
              
                //remoteFeed.svcStarted = true;
                remoteFeed.simulcastStarted = false;
                Janus.log("Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
                Janus.log("  -- This is a subscriber");
                // We wait for the plugin to send us an offer
                var subscribe = { "request": "join", "room": myroom, "ptype": "subscriber", "feed": id, "private_id": mypvtid };
                // In case you don't want to receive audio, video or data, even if the
                // publisher is sending them, set the 'offer_audio', 'offer_video' or
                // 'offer_data' properties to false (they're true by default), e.g.:
                // 		subscribe["offer_video"] = false;
                // For example, if the publisher is VP8 and this is Safari, let's avoid video
                if (Janus.webRTCAdapter.browserDetails.browser === "safari" &&
                    (video === "vp9" || (video === "vp8" && !Janus.safariVp8))) {
                    if (video)
                        video = video.toUpperCase()
                    toastr.warning("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
                    subscribe["offer_video"] = false;
                }
                remoteFeed.videoCodec = video;
                remoteFeed.send({ "message": subscribe });
            },
            error: function (error) {
                Janus.error("  -- Error attaching plugin...", error);
                console.log("Error attaching plugin... " + error);
            },
            onmessage: function (msg, jsep) {
                console.warn("new remote Message ...........................................");
                console.warn(msg);
                console.warn(jsep);
                Janus.debug(" ::: Got a message (subscriber) :::");
                Janus.debug(msg);
                var event = msg["videoroom"];
                Janus.debug("Event: " + event);
                if (msg["error"] !== undefined && msg["error"] !== null) {
                    console.log(msg["error"]);
                } else if (event != undefined && event != null) {
                    if (event === "attached") {
                        // Subscriber created and attached
                        for (var i = 1; i < 6; i++) {
                            if (feeds[i] === undefined || feeds[i] === null) {
                                feeds[i] = remoteFeed;
                                remoteFeed.rfindex = i;
                                break;
                            }
                        }
                        remoteFeed.rfid = msg["id"];
                        remoteFeed.rfdisplay = msg["display"];
                        //if (remoteFeed.spinner === undefined || remoteFeed.spinner === null) {
                        //	var target = document.getElementById('videoremote' + remoteFeed.rfindex);
                        //	remoteFeed.spinner = new Spinner({ top: 100 }).spin(target);
                        //} else {
                        //	remoteFeed.spinner.spin();
                        //}
                        Janus.log("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
                        $('#remote' + remoteFeed.rfindex).removeClass('hide').html(remoteFeed.rfdisplay).show();
                    } else if (event === "event") {
                        // Check if we got an event on a simulcast-related event from this publisher
                        var substream = msg["substream"];
                        var temporal = msg["temporal"];
                        if ((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
                            if (!remoteFeed.simulcastStarted) {
                                remoteFeed.simulcastStarted = true;
                                // Add some new buttons
                                //addSimulcastButtons(remoteFeed.rfindex, remoteFeed.videoCodec === "vp8");
                            }
                            // We just received notice that there's been a switch, update the buttons
                            //updateSimulcastButtons(remoteFeed.rfindex, substream, temporal);
                        }
                    } else {
                        // What has just happened?
                    }
                }
                if (jsep !== undefined && jsep !== null) {
                    Janus.debug("Handling SDP as well...");
                    Janus.debug(jsep);
                    // Answer and attach
                    remoteFeed.createAnswer(
                        {
                            jsep: jsep,
                            // Add data:true here if you want to subscribe to datachannels as well
                            // (obviously only works if the publisher offered them in the first place)
                            media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
                            success: function (jsep) {
                                Janus.debug("Got SDP!");
                                Janus.debug(jsep);
                                var body = { "request": "start", "room": myroom };
                                remoteFeed.send({ "message": body, "jsep": jsep });
                            },
                            error: function (error) {
                                Janus.error("WebRTC error:", error);
                                console.log("WebRTC error... " + JSON.stringify(error));
                            }
                        });
                }
            },
            webrtcState: function (on) {
                Janus.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
            },
            onlocalstream: function (stream) {
                // The subscriber stream is recvonly, we don't expect anything here
            },
            onremotestream: function (stream) {
                
                console.warn(remoteFeed);
                Janus.debug("Remote feed #" + remoteFeed.rfindex);
                var addButtons = false;
                if ($('#remoteVideo_' + remoteFeed.rfindex).length === 0) {
                    var videoT = stream.getVideoTracks();

                    console.warn(videoT);
                
                    var displayStyle = "block";
                if (videoT.length < 1) displayStyle = "none";


                    var newDiv = document.createElement("div");
                    newDiv.classList += "videoItemPanel vidioItem_" + remoteFeed.rfid;
                    newDiv.id = "vidioItem_" + remoteFeed.rfid;
                    var bitrateDiv = document.createElement("div");
                    bitrateDiv.classList += "bitrateDiv" ;
                    bitrateDiv.id = "bitrateDiv_" + remoteFeed.rfid;
                    var videoElement = document.createElement('video');
                    newDiv.appendChild(videoElement);
                   
                    if (display.startsWith("screen")) {
                        var displayName = display.split("_")[1];
                        if (displayName == board.userName) {
                            console.log("displayName is : " + displayName);
                            return;
                        }
                        else console.log(displayName + " : " + board.userName);
                        console.log("***************************************************************************************************************************");
                        isScreenShare = true;
                        //console.log("***************************************************************************************************************************2222222222");
                        if (screenControler.screenShareStatus) return;
                        screenControler.screenShareRemoteStatus = 1;
                        newDiv.classList = "vidioItem_" + remoteFeed.rfid;
                        document.getElementById('screenShareElemnt').appendChild(videoElement);
                        document.getElementById('screenShareElemnt').appendChild(bitrateDiv);
                         
                    }

                    else {
                        document.getElementById('videos').appendChild(newDiv);
                        videoElement.style.display = displayStyle;
                        videoElement.classList = 'rounded centered videoItem';
                        newDiv.appendChild(bitrateDiv);
                      
                    }
                    bitrateTimer[remoteFeed.rfindex] = setInterval(function () {
                        // Display updated bitrate, if supported
                        var bitrate = remoteFeed.getBitrate();
                        console.log(bitrate);
                        $('#bitrateDiv_' + remoteFeed.rfid).text(bitrate);
                        // Check if the resolution changed too
                        //var width = 250;// $("#remotevideo" + remoteFeed.rfindex).get(0).videoWidth;
                        //var height = 250;// $("#remotevideo" + remoteFeed.rfindex).get(0).videoHeight;
                        //if (width > 0 && height > 0)
                        //	$('#curres' + remoteFeed.rfindex).removeClass('hide').text(width + 'x' + height).show();
                    }, 2000);

                   
                    videoElement.id = 'remoteVideo_' + remoteFeed.rfindex;
                    videoElement.autoplay = true;
                    videoElement.controls = true;
                    videoElement.style.maxWidth = '100%';
                    //recorderAddStreem(stream);
                }

                Janus.attachMediaStream($('#remoteVideo_' + remoteFeed.rfindex).get(0), stream);
                remoteFeed.send({ message: { request: "configure", temporal_layer: 0 } });
                remoteFeed.send({ message: { request: "configure", spatial_layer: 0 } });
              
                var audioTracks = stream.getAudioTracks();
                console.warn(audioTracks);
              //  addAudioTrack(audioTracks[0]);

                if (display.startsWith("screen")) {
                    setTimeout(() => { screenControler.connectToScreenShare() }, 3000);
                }
                setTimeout(() => {  resizingVideoBox(); },4000);
                var videoTracks = stream.getVideoTracks();
                if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                    // No remote video
                    //$('#remotevideo' + remoteFeed.rfindex).hide();
                    if ($('#videoremote' + remoteFeed.rfindex + ' .no-video-container').length === 0) {
                        $('#videoremote' + remoteFeed.rfindex).append(
                            '<div class="no-video-container">' +
                            '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                            '<span class="no-video-text">No remote video available</span>' +
                            '</div>');
                    }
                } else {
                    //$('#videoremote' + remoteFeed.rfindex + ' .no-video-container').remove();
                    //$('#remotevideo' + remoteFeed.rfindex).removeClass('hide').show();
                }
               



                if (!addButtons)
                    return;
                if (Janus.webRTCAdapter.browserDetails.browser === "chrome" || Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
                    Janus.webRTCAdapter.browserDetails.browser === "safari") {
                    //$('#curbitrate' + remoteFeed.rfindex).removeClass('hide').show();
                    //bitrateTimer[remoteFeed.rfindex] = setInterval(function () {
                    //    // Display updated bitrate, if supported
                    //    var bitrate = remoteFeed.getBitrate();
                    //    $('#bitrateDiv_' + remoteFeed.rfid).text(bitrate);
                    //    // Check if the resolution changed too
                    //    //var width = 250;// $("#remotevideo" + remoteFeed.rfindex).get(0).videoWidth;
                    //    //var height = 250;// $("#remotevideo" + remoteFeed.rfindex).get(0).videoHeight;
                    //    //if (width > 0 && height > 0)
                    //    //	$('#curres' + remoteFeed.rfindex).removeClass('hide').text(width + 'x' + height).show();
                    //}, 1000);
                }
            },
            oncleanup: function () {
                console.warn("ali");
                //stopRecord();
                console.warn(display);
                console.warn(remoteFeed);
                Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
                //if (remoteFeed.spinner !== undefined && remoteFeed.spinner !== null)
                //	remoteFeed.spinner.stop();
                //remoteFeed.spinner = null;
                if (display.startsWith("screen")) {
                    console.log('preScreenShareStatus' + preScreenShareStatus);
                    //console.warn("ali2");
                    //var obj = document.getElementById('remoteVideo_' + remoteFeed.rfindex);
                    //console.log(obj);
                    //console.warn("ali3");
                    $('#remoteVideo_' + remoteFeed.rfindex).remove();
                    //if (preScreenShareStatus) return;
                    screenControler.screenShareRemoteStatus = 0;
                    screenControler.disconnectFromScreenShare();
                    panelControler.selectNextPanel();
                }
                $('.vidioItem_' + remoteFeed.rfid).remove();
                resizingVideoBox();
                //$('#waitingvideo' + remoteFeed.rfindex).remove();
                //$('#novideo' + remoteFeed.rfindex).remove();
                //$('#curbitrate' + remoteFeed.rfindex).remove();
                //$('#curres' + remoteFeed.rfindex).remove();
                if (bitrateTimer[remoteFeed.rfindex] !== null && bitrateTimer[remoteFeed.rfindex] !== null)
                    clearInterval(bitrateTimer[remoteFeed.rfindex]);
                bitrateTimer[remoteFeed.rfindex] = null;
                remoteFeed.simulcastStarted = false;
                //$('#simulcast' + remoteFeed.rfindex).remove();
            }
        });
}

// Helper to parse query string
function getQueryStringValue(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
