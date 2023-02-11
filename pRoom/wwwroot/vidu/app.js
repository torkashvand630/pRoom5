var OV;						// OpenVidu object to initialize a session
var session;				// Session object where the user will connect
var publisher;
var screenSubscriber;// Publisher object which the user will publish
var sessionId = board.meetID;//"#bbbbbbbb";				// Unique identifier of the session
var audioEnabled = board.publish;	// True if the audio track of publisher is active
var videoEnabled = false;	// True if the video track of publisher is active
var numOfVideos = 0;
var reconectinMode = 0;
var toktok;// Keeps track of the number of videos that are being shown

 function startSession(startPublish) {
	appUnPublishing();
	try {
		session.disconnect();
	} catch(e){}
	session = undefined;
	OV = undefined;
	document.getElementById('videos').innerHTML = "";
	if (sessionId) {

		 joinRoom(startPublish);
	} else {
		joinRoom(startPublish);
		// The URL has not a session id. Show welcome page
		//showJoinHideSession();
	}
	return;
}
 

 window.addEventListener('beforeunload', function () {
	if (session) session.disconnect();
	if (session3) session.disconnect();
});


 function joinRoom(startPublish) {

	OV = new OpenVidu();
	//OV.setAdvancedConfiguration({
	//	iceServers: [
	//		{ url: "stun:stun.freeswitch.org" },
	//		{
	//			urls: "turns:r2.salampnu.com:443?transport=tcp",
	//			username: "ali",
	//			credential: "ali"
	//		}
	//	]
	//});
	session = OV.initSession();
	session.on('connectionCreated', function (event) {
		 
	});
	session.on('connectionDestroyed', function (event) {
		 
	});
	session.on('streamCreated', function (event) {
		 
		console.log("ssssssssss : ");
		console.log(event);
		console.log(event.stream.streamId);
		var subscriber;
		if (event.stream.typeOfVideo == "SCREEN") {

			if (session3 != 0 && event.stream.connection.connectionId == session3.connection.connectionId)
				console.warn("this is local chreen ; ");

			else {

				var  subscriberScreen = session.subscribe(event.stream, 'screenShareElemnt');
				subscriberScreen.on('videoElementCreated', function (event) {
					screenShareRemoteStatus = 1;
					connectToScreenShare();					 

				});
				subscriberScreen.on('videoElementDestroyed', function (event) {
					console.warn("by sessen 111.. ");
					screenShareRemoteStatus = 0;
					disconnectFromScreenShare();
					 
				});

			}
		}


		else {
			subscriber = session.subscribe(event.stream, 'videos');

			// When the new video is added to DOM, update the page layout to fit one more participant
			subscriber.on('videoElementCreated', function (event) {
				//console.log("fffffffffffffff : ");
				console.warn("event videoElementCreated");
				console.log(event);
				//var videoActive_1 = this.stream.videoActive;
				//console.log(videoActive_1);
				//if (videoActive_1)  
				//	numOfVideos++;
				resizingVideoBox();
			 
				//console.log(event);
				//console.log("camera111 ");
				//var vid = event.target.id;
				//var obj = document.getElementById(vid);
				//console.log(obj);
				//setTimeout(function () {
				//	console.log("timeout");
				//	// event.stream.streamManager.videos[0].video.id;					 
				//	//obj.muted = false;
				//	//obj.play(); 
				//	console.log("timeout 2");
				//}, 15000);

			});
			subscriber.on('videoElementDestroyed', function (event) {
				resizingVideoBox();
				// console.warn("videoElementDestroyed videoElementDestroyed event");
				// console.warn(event);
			});

		}

		// var subscriber2 = session.subscribe(event.stream, 'screen');
		// When the new video is added to DOM, update the page layout to fit one more participant

	});
	session.on('streamPropertyChanged', function (event) {
		console.log("dddddddddddddddddddddddddddddddddddddddddd : ");
		console.warn(event);
		var isLocalStreamPublished = event.stream.isLocalStreamPublished;
		if (isLocalStreamPublished) {
			var videoActive = event.stream.videoActive;
			var audioActive = event.stream.audioActive;
			if (videoActive) document.getElementById('mute-video').style.color = "red";
			else document.getElementById('mute-video').style.color = "black";
			if (audioActive) document.getElementById('mute-audio').style.color = "red";
			else document.getElementById('mute-audio').style.color = "black";
		}
		//var sid = event.stream.streamId;
		var newValue = event.newValue;
		//console.log(sid + " : " + newValue);
		var vid = event.stream.streamManager.id;// event.stream.streamManager.videos[0].video.id;
		//console.log(vid);
		var obj = document.getElementById(vid);
		//var obj = document.getElementById('remote-video-' + sid);
		//if (event.stream.isLocalStreamPublished) {
		//	obj = document.getElementById('local-video-' + sid);
		//	if (obj == undefined) obj = document.getElementById('local-video-undefined' ); 

		//}
		var changedProperty = event.changedProperty;
		if (changedProperty == 'videoActive') {
			if (newValue) {
				obj.style.display = "block";
				obj.parentNode.style.display = "block";
			}


			else {
				obj.style.display = "none";
				obj.parentNode.style.display = "none";
            }
				
		}
		console.log(obj);
		resizingVideoBox();
		// Update the page layout
		//numOfVideos--;
		//updateLayout();
	});
	session.on('streamDestroyed', function (event) {
		console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee :streamDestroyed ");
		 console.warn(event);
		// console.log("dddddddddddddddd : " + event.stream);
		// Update the page layout
		//numOfVideos--;
		//updateLayout();
	});
	session.on('signal', (event) => {
		console.log(event.data); // Message
		//console.log(event.from); // Connection object of the sender
		//console.log(event.type); // The type of message
	});
	session.on('reconnecting', () => console.warn('Oops! Trying to reconnect to the session aliiiiiiiiiiiiiiiiiiiiiiiii'));
	session.on('reconnected', () => {
		console.log('Hurray!----------------------- You successfully reconnected to the session aliiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
		//OV = null;
		//session = null;
		//joinRoom();
	}
		);
	session.on('sessionDisconnected', (event) => {
		if (event.reason === 'networkDisconnect') {
			console.warn('Dang-it... You lost your connection to the session aliiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
		} else {
			console.warn('Dang-it... You lost your connection to the session uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
		}
	});
	getToken(sessionId).then(token => {
		toktok = token;
		//console.warn("token : " + token);
		//token = token.replace("localhost", "95.216.243.5");
		//console.warn("token 2 : " + token);
		// Connect with the token
		session.connect(token)
			.then(() => {

				 
				if (board.publish) {
					if (startPublish) appPublishByDevice();
					//appPublishing();
				}
				else {
					console.log("no publish");
				}

			})
			.catch(error => {
				console.log('There was an error connecting to the session:', error.code, error.message);
			});
	});
}
function appPublishing() {
	console.log("publish");
	console.log(publisher);

	appUnPublishing();
	if (!videoEnabled && !audioEnabled) return;
	console.log("reconectinMode : " + reconectinMode);
	if (reconectinMode == 0) {
		$('#deviceModal').modal('toggle');
		device.start();
	}
	else {
		appPublishByDevice();
    }
	//publisher = undefined;
	
}
function appPublishByDevice() {
	console.log("audio select : " + device.audioDevice);
	console.log("video select : " + device.videoDevice);
	//lastPublishClick = Date.now() / 1000;
	if (audioEnabled && device.audioDevice == undefined) {
		alert("your micrifgone not found");
		audioEnabled = false;
		//return;
	}
	if (videoEnabled && device.videoDevice == undefined) {
		videoEnabled = false;
		alert("your camera not found");
		//return;
	}
	iconDisablVidu(6000, iconViduPanel);
	publisher = OV.initPublisher('videos', {
		audioSource: device.audioDevice ? device.audioDevice : false, // The source of audio. If undefined default audio input
		videoSource: device.videoDevice ? device.videoDevice : false, // The source of video. If undefined default video input
		publishAudio: audioEnabled,  	// Whether to start publishing with your audio unmuted or not
		publishVideo: videoEnabled,  	// Whether to start publishing with your video enabled or not
		resolution: '300*200',  // The resolution of your video
		frameRate: 10,			// The frame rate of your video
		insertMode: 'PREPEND',	// How the video is inserted in target element 'video-container'
		mirror: false       		// Whether to mirror your local video or not
	});

	publisher.on('videoElementCreated', function (event) {
		resizingVideoBox();
		// When your own video is added to DOM, update the page layout to fit it
		//numOfVideos++;
		//updateLayout();
		$(event.element).prop('muted', true); // Mute local video to avoid feedback
		var videoActive = event.target.stream.videoActive;
		var audioActive = event.target.stream.audioActive;
		if (videoActive) document.getElementById('mute-video').style.color = "red";
		else document.getElementById('mute-video').style.color = "black";
		if (audioActive) document.getElementById('mute-audio').style.color = "red";
		else document.getElementById('mute-audio').style.color = "black";
		iconEnableVidu(iconViduPanel);
		setTimeout(function () {
			console.log("timeout");
			console.warn('videoElementCreated');
			console.warn(event);
			
			var streamId = event.target.stream.streamId;
			console.warn("publisher streamId is : " + streamId);
			if (streamId == undefined) {
				
				return;
			}
			var connectionId = event.target.stream.connection.connectionId;
			console.log(streamId);
			var m = { type: "userManager", action: "setStreamId", streamId: streamId, connectionId: connectionId };
			mainApp.sendToServer(m);
			console.log("timeout 2");
		}, 2000);
	});
	publisher.on('videoElementDestroyed', function (event) {
		resizingVideoBox();

		document.getElementById('mute-video').style.color = "black";
		document.getElementById('mute-audio').style.color = "black";
		 
	});

	session.publish(publisher);
	console.warn("publish complate ...");
}
function appUnPublishing() {
	if (publisher == undefined) console.log("unpublish");
	else {
		 
		try {
			session.unpublish(publisher);
		} catch(e){
			console.log("error in : session.unpublish(publisher);")
        }
		
		publisher = undefined;
	}
	//document.getElementById('videos').innerHTML = "";

}
function appPublishToggle() {
	if (publisher == undefined) {
		console.log("unpublish");
		appPublishing();
	}
	else {
		session.unpublish(publisher);
		publisher = undefined;
	}
}
function leaveRoom() {
	$('#deviceJanusModal').modal('toggle');
	device.start();
	return;
	iconDisablVidu(2000, iconViduPanel);

	unpublishOwnFeed();
	 
	//appUnPublishing();
	videoEnabled = false;
	audioEnabled = false;
	 
}



/* AUXILIARY MEHTODS */

function muteAudio() {
	iconDisablVidu(2000, iconViduPanel);
	LocalAudioClick();
	//publishOwnFeed(false);
	return;
	audioEnabled = !audioEnabled;
	if (!audioEnabled && !videoEnabled) {
		leaveRoom();
		return;
	}
	if (publisher == undefined) {
		console.log("unpublish");
		reconectinMode = 0;
		appPublishing();
		return;
	}

	//if (audioEnabled && device.audioDevice == undefined) { 
	//	audioEnabled = false;
	//	alert("your micrifgone not found");
	//	return;
	//}
	if (!audioEnabled) {
		publisher.publishAudio(false);
		return;
	}
	// publisher.publishAudio(audioEnabled);
	reconectinMode = 0;
	$('#deviceModal').modal('toggle');
	device.start();
}
//var lastClick = Date.now() / 1000;
//var lastPublishClick = Date.now() / 1000;
function muteVideo() {
	 
	iconDisablVidu(2000, iconViduPanel);
	webrtClient.localVideoAudioClick();
	//localVideoAudioClick();
	//publishOwnFeed(false);
	return;
	 
	
	  

}


function iconDisablVidu(t, element) {
	 
	//$("#iconPanelVidu").addClass("disabledbutton");
	element.classList.add("disabledbutton");
	 
	setTimeout(function () {
		iconEnableVidu(element);		 
	}, t);
}
function iconEnableVidu(element) {
	//$("#iconPanelVidu").removeClass("disabledbutton");
	element.classList.remove("disabledbutton");
}

function randomString() {
	return Math.random().toString(36).slice(2);
}
 
 
 


//var OPENVIDU_SERVER_URL = "https://cc.salampnu.com:4443";// "https://demos.openvidu.io";
//var OPENVIDU_SERVER_URL = "https://ch.tv1.one";
var OPENVIDU_SERVER_URL ="https://"+ board.mediaServer;// "https://95.216.243.8";  
//var OPENVIDU_SERVER_URL = "https://demos.openvidu.io:4443";
//var OPENVIDU_SERVER_URL = "https://mt2.salampnu.com:80";
//var OPENVIDU_SERVER_SECRET = "YOUR_SECRET";
var OPENVIDU_SERVER_SECRET = board.mediaServerPass;// "YOUR_SECRET";
console.warn("appMedia : " + OPENVIDU_SERVER_URL + " " + OPENVIDU_SERVER_SECRET);

function getToken(mySessionId) {
	return createSession(mySessionId).then(sId => createToken(sId));
}

function createSession(sId) { // See https://openvidu.io/docs/reference-docs/REST-API/#post-apisessions
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: OPENVIDU_SERVER_URL + "/api/sessions",
			//url: "https://OPENVIDUAPP:bb@95.216.243.8:4443/api/sessions",
			data: JSON.stringify({
				//customSessionId: sId, "recordingMode": "ALWAYS", "outputMode": "COMPOSED", "recordingLayout": "BEST_FIT" }),
				customSessionId: sId, "recordingMode": "MANUAL", "outputMode": "COMPOSED", "recordingLayout": "BEST_FIT"
			}),
			//customSessionId: sId  }),
			headers: {
				"Authorization": "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
				"Content-Type": "application/json"
			},
			success: response => resolve(response.id),
			error: (error) => {
				if (error.status === 409) {
					resolve(sId);
				} else {
					console.log("cant acces to this ip : ffffffffffffffffffff");


					 
				}
			}
		});
	});
}

function createToken(sId) { // See https://openvidu.io/docs/reference-docs/REST-API/#post-apitokens
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: OPENVIDU_SERVER_URL + "/api/tokens",
			data: JSON.stringify({ session: sId }),
			headers: {
				"Authorization": "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
				"Content-Type": "application/json"
			},
			success: response => resolve(response.token),
			error: error => reject(error)
		});
	});
}