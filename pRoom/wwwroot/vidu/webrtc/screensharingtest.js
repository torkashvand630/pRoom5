
var janusScreen = null;
var screentest = null;
var opaqueId = "screensharingtest-" + randomString(12);

//var myusername = null; 
//var myid = null;

//var capture = null; 
//var role = 'publisher';
var room = null;
var source = null;

var spinner = null;
var desktopClient = null;

// Just an helper to generate random usernames
function randomString(len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var randomString = '';
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
}


$(document).ready(function () {
	// Initialize the library (all console debuggers enabled)
	
	
});
function initDesctop() {
	//document.cookie = 'aaa2=https://meet.salampnu.com:8989/ws ; path=/';
	Janus.init({
		debug: "all", callback: function () {


			if (!Janus.isWebrtcSupported()) {
				console.log("No WebRTC support... ");
				return;
			}
			// Create session
			janusScreen = new Janus(
				{
					server: server,
					success: function () {
						// Attach to VideoRoom plugin
						janusScreen.attach(
							{
								plugin: "janus.plugin.videoroom",
								opaqueId: opaqueId,
								success: function (pluginHandle) {
									//$('#details').remove();
									screentest = pluginHandle;
									Janus.log("Plugin attached! (" + screentest.getPlugin() + ", id=" + screentest.getId() + ")");
									regerterForScreen();
									//preShareScreen();
									// Prepare the username registration
									//$('#screenmenu').removeClass('hide').show();
									//$('#createnow').removeClass('hide').show();
									//$('#create').click(preShareScreen);
									//$('#joinnow').removeClass('hide').show();
									//$('#join').click(joinScreen);
									//$('#desc').focus();
									//$('#start').removeAttr('disabled').html("Stop")
									//	.click(function () {
									//		$(this).attr('disabled', true);
									//		janus.destroy();
									//	});
								},
								error: function (error) {
									Janus.error("  -- Error attaching plugin...", error);
									console.log("Error attaching plugin... " + error);
								},
								consentDialog: function (on) {
									Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
									if (on) {
										// Darken screen
										//$.blockUI({
										//	message: '',
										//	css: {
										//		border: 'none',
										//		padding: '15px',
										//		backgroundColor: 'transparent',
										//		color: '#aaa'
										//	}
										//});
									} else {
										// Restore screen
										//$.unblockUI();
									}
								},
								iceState: function (state) {
									Janus.log("ICE state changed to " + state);
								},
								mediaState: function (medium, on) {
									Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
									if (!on && screenControler.screenShareStatus) {
										console.log("screen share stop by me ...................");
										unpublishOwnFeedScreen();
									}
								},
								webrtcState: function (on) {
									Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
									//$("#screencapture").parent().unblock();
									if (on) {
										//console.log("Your screen sharing session just started: pass the <b>" + room + "</b> session identifier to those who want to attend.");
									} else {
										//console.log("Your screen sharing session just stopped.", function () {
											//janus.destroy();
											//window.location.reload();
										//});
									}
								},
								onmessage: function (msg, jsep) {
									Janus.debug(" ::: Got a message (publisher) :::", msg);
									var event = msg["videoroom"];
									Janus.debug("Event: " + event);
									if (event) {
										if (event === "joined") {
											myid = msg["id"];
											//$('#session').html(room);
											$('#title').html(msg["description"]);
											Janus.log("Successfully joined room " + msg["room"] + " with ID " + myid);
											if (role === "publisher") {
												// This is our session, publish our stream
												Janus.debug("Negotiating WebRTC stream for our screen (capture " + capture + ")");
												
											} else {
												// We're just watching a session, any feed to attach to?
												if (msg["publishers"]) {
													var list = msg["publishers"];
													Janus.debug("Got a list of available publishers/feeds:", list);
													for (var f in list) {
														var id = list[f]["id"];
														var display = list[f]["display"];
														Janus.debug("  >> [" + id + "] " + display);
														newRemoteFeed(id, display)
													}
												}
											}
										} else if (event === "event") {
											// Any feed to attach to?
											if (role === "listener" && msg["publishers"]) {
												var list = msg["publishers"];
												Janus.debug("Got a list of available publishers/feeds:", list);
												for (var f in list) {
													var id = list[f]["id"];
													var display = list[f]["display"];
													Janus.debug("  >> [" + id + "] " + display);
													newRemoteFeed(id, display)
												}
											} else if (msg["leaving"]) {
												// One of the publishers has gone away?
												var leaving = msg["leaving"];
												Janus.log("Publisher left: " + leaving);
												if (role === "listener" && msg["leaving"] === source) {
													console.log("The screen sharing session is over, the publisher left", function () {
														//window.location.reload();
													});
												}
											} else if (msg["error"]) {
												console.log(msg["error"]);
											}
										}
									}
									if (jsep) {
										Janus.debug("Handling SDP as well...", jsep);
										screentest.handleRemoteJsep({ jsep: jsep });
									}
								},
								onlocalstream: function (stream) {
									Janus.debug(" ::: Got a local stream :::", stream);
									//$('#screenmenu').hide();
									//$('#room').removeClass('hide').show();
									if ($('#screenvideo').length === 0) {
										$('#screenShareElemnt').append('<video class="rounded centered" id="screenvideo" width="100%" height="100%" autoplay playsinline muted="muted"/>');
									}
									Janus.attachMediaStream($('#screenvideo').get(0), stream);
									if (screentest.webrtcStuff.pc.iceConnectionState !== "completed" &&
										screentest.webrtcStuff.pc.iceConnectionState !== "connected") {
										screenControler.screenShareStatus = 1;
										screenControler.connectToScreenShare();
										//$("#screencapture").parent().block({
										//	message: '<b>Publishing...</b>',
										//	css: {
										//		border: 'none',
										//		backgroundColor: 'transparent',
										//		color: 'white'
										//	}
										//});
									}
								},
								onremotestream: function (stream) {
									// The publisher stream is sendonly, we don't expect anything here
								},
								oncleanup: function () {
									Janus.log(" ::: Got a cleanup notification :::");
									$('#screenShareElemnt').empty();
									screenControler.screenShareStatus = 0;
									screenControler.disconnectFromScreenShare();
									panelControler.selectNextPanel();
									//panelControler.activeBoard();
									//$("#screencapture").parent().unblock();
									//$('#room').hide();
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
			desktopClient = janusScreen;
		}
	});
	//joinScreen();
}
function unpublishOwnFeedScreen() {
	if (!board.user.permission.screen) return;
	//desktopClient.destroy();
	// Unpublish our stream
	//$('#unpublish').attr('disabled', true).unbind('click');
	var unpublish = { "request": "unpublish" };
	screentest.send({ "message": unpublish });
	//initDesctop();
}
function publishScreen() {
	//var publish = { "request": "publish" };
	//screentest.send({ "message": publish });
	preShareScreen();
	screentest.createOffer(
		{
			media: { video: capture, audioSend: false, videoRecv: false },	// Screen sharing Publishers are sendonly
			success: function (jsep) {
				Janus.debug("Got publisher SDP!", jsep);
				var publish = { request: "configure", audio: false, video: true };
				screentest.send({ message: publish, jsep: jsep });
			},
			error: function (error) {
				Janus.error("WebRTC error:", error);
				console.log("WebRTC error... " + error.message);
			}
		});
}
function checkEnterShare(field, event) {
	var theCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (theCode == 13) {
		preShareScreen();
		return false;
	} else {
		return true;
	}
}

function preShareScreen() {
	if (!Janus.isExtensionEnabled()) {
		console.log("You're using Chrome but don't have the screensharing extension installed: click <b><a href='https://chrome.google.com/webstore/detail/janus-webrtc-screensharin/hapfgfdkleiggjjpfpenajgdnfckjpaj' target='_blank'>here</a></b> to do so", function () {
		//	window.location.reload();
		});
		return;
	}
	 
	capture = "screen";
	if (navigator.mozGetUserMedia) {
		// Firefox needs a different constraint for screen and window sharing
		bootbox.dialog({
			title: "Share whole screen or a window?",
			message: "Firefox handles screensharing in a different way: are you going to share the whole screen, or would you rather pick a single window/application to share instead?",
			buttons: {
				screen: {
					label: "Share screen",
					className: "btn-primary",
					callback: function () {
						capture = "screen";
						shareScreen();
					}
				},
				window: {
					label: "Pick a window",
					className: "btn-success",
					callback: function () {
						capture = "window";
						shareScreen();
					}
				}
			},
			onEscape: function () {
				//$('#desc').removeAttr('disabled', true);
				//$('#create').removeAttr('disabled', true).click(preShareScreen);
				//$('#roomid').removeAttr('disabled', true);
				//$('#join').removeAttr('disabled', true).click(joinScreen);
			}
		});
	} else {
		shareScreen();
	}
}
function regerterForScreen() {
	//myusername = randomString(12);
	var register = {
		request: "join",
		room: myroom,
		ptype: "publisher",
		display: 'screen_' + board.userName
	};
	screentest.send({ message: register });
}
function shareScreen() {
	// Create a new room
	var desc = "ddddddddddddddddddddddddddddddddd";// $('#desc').val();
	role = "publisher";
	return;
	var create = {
		request: "create",
		description: desc,
		bitrate: 500000,
		publishers: 1
	};
	screentest.send({
		message: create, success: function (result) {
			var event = result["videoroom"];
			//Janus.debug("Event: " + event);
			if (event) {
				// Our own screen sharing session has been created, join it
				room = result["room"];
				Janus.log("Screen sharing session created: " + room);
				myusername = randomString(12);
				var register = {
					request: "join",
					room: 1234,
					ptype: "publisher",
					display: 'screen_'+myusername
				};
				screentest.send({ message: register });
			}
		}
	});
}

function checkEnterJoin(field, event) {
	var theCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (theCode == 13) {
		joinScreen();
		return false;
	} else {
		return true;
	}
}

function joinScreen() {
	// Join an existing screen sharing session
	//$('#desc').attr('disabled', true);
	//$('#create').attr('disabled', true).unbind('click');
	//$('#roomid').attr('disabled', true);
	//$('#join').attr('disabled', true).unbind('click');
	//var roomid = myroom;//  $('#roomid').val();
	//if (isNaN(roomid)) {
	//	console.log("Session identifiers are numeric only");
	//	$('#desc').removeAttr('disabled', true);
	//	$('#create').removeAttr('disabled', true).click(preShareScreen);
	//	$('#roomid').removeAttr('disabled', true);
	//	$('#join').removeAttr('disabled', true).click(joinScreen);
	//	return;
	//}
	room = myroom;// parseInt(roomid);
	role = "listener";
	myusername = randomString(12);
	var register = {
		request: "join",
		room: room,
		ptype: "publisher",
		display: myusername
	};
	screentest.send({ message: register });
}
 
