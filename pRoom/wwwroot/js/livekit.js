//console.warn('dddddddddddddddddddddd2  tt')
const $$$ = (id) => document.getElementById(id);
const state = {
    isFrontFacing: false,
    encoder: new TextEncoder(),
    decoder: new TextDecoder(),
    defaultDevices: new Map(),
    bitrateInterval: undefined,
};
let currentRoom;
let startTime;
const searchParams = new URLSearchParams(window.location.search);
const storedUrl = searchParams.get('url') ?? 'ws://localhost:7880';
const storedToken = searchParams.get('t') ?? '';
/* $$$('url').value = storedUrl;
$$$('token').value = storedToken; */
function updateSearchParams(url, token) {
    const params = new URLSearchParams({ url, token });
    // window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
}

function setVideoElementSize() {
    var videosBox = document.getElementById("videosBox");
    var iconPanelVidu = document.getElementById("iconPanelVidu");
    var sessionPanelPosetion = layout.sessionPanelPosetion;

    let obj = document.getElementById("session");
    if (obj) {
        let numb = obj.childElementCount;
        if (numb < 1) return;
        // console.log(numb)
        //grid-template-columns: repeat(2,1fr);
        var h = videosBox.clientHeight - iconPanelVidu.clientHeight;
        if (layout.sessionPanelPosetion == 4) h = window.innerHeight - 70;

        var w = videosBox.clientWidth;
        //console.log(h + " " + w)
        var res = calculateColumeCount(numb, h - 1, w - 1)
        //obj.style.gridTemplateColumns='repeat('+res+',1fr)'
        let objList = obj.children;
        //var cols = document.getElementsByClassName('col1');
        for (var i = 0; i < objList.length; i++) {
            ((objList[i])).style.width = res.maxWidth + "px";
            ((objList[i])).style.height = res.maxHeight + "px";
        }

    }
    //console.log('t')
}
setInterval(function () {
    //setVideoElementSize()
}, 5000);
function calculateColumeCount(n, h, w) {
    //var i
    h = Math.floor(h)
    wh = Math.floor(w)
    var min = 10000
    var hh = 1
    var max = 0;
    var size = 0;
    var maxHeight = 0;
    var maxWidth = 0;
    for (var i = 1; i <= n; i++) {
        var row = Math.ceil(n / i)
        var h1 = Math.floor(w / i)
        var w1 = Math.floor(h / row)
        //var s=Math.max(h1,w1)-Math.min(h1,w1)
        var min = Math.min(h1, w1)
        if (min > max) {
            //  min=s
            hh = i
            max = min
            size = Math.min(h1, w1);
            maxHeight = w1
            maxWidth = h1
            if (maxHeight > (1.5 * maxWidth)) maxHeight = 1.5 * maxWidth
            if (maxWidth > (1.5 * maxHeight)) maxWidth = 1.5 * maxHeight
        }


    }
    // console.log('size : ' + size)
    //  console.log(' hh : ' + hh)
    var result = { size: size, maxHeight: maxHeight, maxWidth: maxWidth }
    // console.log(result)
    return result;
    var res = h * w
    console.log('res : ' + res)
    var res2 = res / n;// Math.ceil(n/(1/res))
    console.log('res2 : ' + res2)
    var res3 = Math.sqrt(res2)
    console.log('res3 : ' + res3)
    var res4 = Math.floor(h / res3)
    console.log('res4 : ' + res4)
    return res4;
}

// handles actions from the HTML
const appActions = {

    setVideoElementSize1: function () {
        setVideoElementSize()
    },

    connectWithFormInput: async () => {
        appActions.connectWebrtc(storedUrl, storedToken)
        //state.bitrateInterval = setInterval(renderBitrate, 1000);
    },

    connectWebrtc: async (urlBase, userName) => {
        const url = urlBase;// $$$('url').value;
        const token = userName;// storedToken;// $$$('token').value;//+"&jjjjjj=kkkkkkkkk";
        const simulcast = false;// (<HTMLInputElement>$$$('simulcast')).checked;
        const dynacast = true;// (<HTMLInputElement>$$$('dynacast')).checked;
        const forceTURN = false;// (<HTMLInputElement>$$$('force-turn')).checked;
        const adaptiveStream = true; //(<HTMLInputElement>$$$('adaptive-stream')).checked;
        const shouldPublish = false;// (<HTMLInputElement>$$$('publish-option')).checked;
        const preferredCodec = "vp8";// (<HTMLSelectElement>$$$('preferred-codec')).value as VideoCodec;
        LivekitClient.setLogLevel(LivekitClient.LogLevel.error);
        // updateSearchParams(url, token);
        const roomOpts = {
            adaptiveStream,
            dynacast,
            publishDefaults: {
                simulcast,
                videoSimulcastLayers: [LivekitClient.VideoPresets.h90, LivekitClient.VideoPresets.h216],
                videoCodec: preferredCodec || 'vp8',
            },
            videoCaptureDefaults: {
                resolution: LivekitClient.VideoPresets.h216.resolution,
            },
        };
        roomOpts.videoCaptureDefaults.resolution.frameRate = 8;
        const connectOpts = {
            autoSubscribe: true,
        };
        if (forceTURN) {
            connectOpts.rtcConfig = {
                iceTransportPolicy: 'relay',
            };
        }
        await appActions.connectToRoom(url, token, roomOpts, connectOpts, shouldPublish);
        state.bitrateInterval = setInterval(renderBitrate, 1000);
    },
    connectToRoom: async (url, token, roomOptions, connectOptions, shouldPublish) => {
        const room = new LivekitClient.Room(roomOptions);
        startTime = Date.now();
        await room.prepareConnection(url);
        const prewarmTime = Date.now() - startTime;
        appendLog(`prewarmed connection in ${prewarmTime}ms`);
        room
            .on(LivekitClient.RoomEvent.ParticipantConnected, participantConnected)
            .on(LivekitClient.RoomEvent.ParticipantDisconnected, participantDisconnected)
            .on(LivekitClient.RoomEvent.DataReceived, handleData)
            .on(LivekitClient.RoomEvent.Disconnected, handleRoomDisconnect)
            .on(LivekitClient.RoomEvent.Reconnecting, () => appendLog('Reconnecting to room'))
            .on(LivekitClient.RoomEvent.Reconnected, () => {
                appendLog('Successfully reconnected. server', room.engine.connectedServerAddress);
            })
            .on(LivekitClient.RoomEvent.LocalTrackPublished, () => {
                renderParticipant(room.localParticipant);
                updateButtonsForPublishState();
                renderScreenShare(room);
            })
            .on(LivekitClient.RoomEvent.LocalTrackUnpublished, () => {
                renderParticipant(room.localParticipant);
                updateButtonsForPublishState();
                renderScreenShare(room);
            })
            .on(LivekitClient.RoomEvent.RoomMetadataChanged, (metadata) => {
                appendLog('new metadata for room', metadata);
            })
            .on(LivekitClient.RoomEvent.MediaDevicesChanged, handleDevicesChanged)
            .on(LivekitClient.RoomEvent.AudioPlaybackStatusChanged, () => {
                if (room.canPlaybackAudio) {
                    $$$('start-audio-button')?.setAttribute('disabled', 'true');
                }
                else {
                    $$$('start-audio-button')?.removeAttribute('disabled');
                }
            })
            .on(LivekitClient.RoomEvent.MediaDevicesError, (e) => {
                const failure = LivekitClient.MediaDeviceFailure.getFailure(e);
                appendLog('media device failure', failure);
            })
            .on(LivekitClient.RoomEvent.ConnectionQualityChanged, (quality, participant) => {
                appendLog('connection quality changed', participant?.identity, quality);
            })
            .on(LivekitClient.RoomEvent.TrackSubscribed, (_1, pub, participant) => {
                appendLog('subscribed to track', pub.trackSid, participant.identity);
                renderParticipant(participant);
                renderScreenShare(room);
            })
            .on(LivekitClient.RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                appendLog('unsubscribed from track', pub.trackSid);
                renderParticipant(participant);
                // console.warn('track unpublish')
                renderScreenShare(room);
                setTimeout(() => {
                    renderScreenShare(room);
                    renderParticipant(participant);
                }, 1500);
            })
            .on(LivekitClient.RoomEvent.SignalConnected, async () => {
                const signalConnectionTime = Date.now() - startTime;
                appendLog(`signal connection established in ${signalConnectionTime}ms`);
                if (shouldPublish) {
                    await Promise.all([
                        room.localParticipant.setCameraEnabled(true),
                        room.localParticipant.setMicrophoneEnabled(true),
                    ]);
                    updateButtonsForPublishState();
                }
            });
        try {
            await room.connect(url, token, connectOptions);
            const elapsed = Date.now() - startTime;
            appendLog(`successfully connected to ${room.name} in ${Math.round(elapsed)}ms`, room.engine.connectedServerAddress);
             
            $$$('iconPanelVidu').style.display = 'block'
            setTimeout(() => {
                setVideoElementSize();
            }, 2000);
        }
        catch (error) {
            let message = error;
            if (error.message) {
                message = error.message;
            }
            appendLog('could not connect:', message);
            return;
        }
        currentRoom = room;
        window.currentRoom = room;
        setButtonsForState(true);
        room.participants.forEach((participant) => {
            participantConnected(participant);
        });
        participantConnected(room.localParticipant);
        return room;
    },
    toggleAudio: async () => {
        if (!currentRoom)
            return;
        const enabled = currentRoom.localParticipant.isMicrophoneEnabled;
        setButtonDisabled('mute-audio', true);
        if (enabled) {
            appendLog('disabling audio');
        }
        else {
            appendLog('enabling audio');
            if (!board.user.permission.audio) {
                setButtonDisabled('mute-audio', false);
                //console.log('pesmision error')
                return
            }
        }
        await currentRoom.localParticipant.setMicrophoneEnabled(!enabled);
        setButtonDisabled('mute-audio', false);
        updateButtonsForPublishState();
    },
    disableAudio: async () => {
        if (!currentRoom)
            return;
        const enabled = currentRoom.localParticipant.isMicrophoneEnabled;

        if (!enabled) return
        setButtonDisabled('mute-audio', true);
        await currentRoom.localParticipant.setMicrophoneEnabled(!enabled);
        setButtonDisabled('mute-audio', false);
        updateButtonsForPublishState();
    },
    toggleVideo: async () => {
        if (!currentRoom)
            return;
        setButtonDisabled('mute-video', true);
        const enabled = currentRoom.localParticipant.isCameraEnabled;
        if (enabled) {
            appendLog('disabling video');
        }
        else {
            if (!board.user.permission.video) {
                setButtonDisabled('mute-video', false);
                //console.log('pesmision error')
                return
            }
            appendLog('enabling video');
        }
        await currentRoom.localParticipant.setCameraEnabled(!enabled);
        setButtonDisabled('mute-video', false);
        renderParticipant(currentRoom.localParticipant);
        // update display
        updateButtonsForPublishState();
    },
    disableVideo: async () => {
        if (!currentRoom)
            return;

        const enabled = currentRoom.localParticipant.isCameraEnabled;
        if (!enabled) return
        setButtonDisabled('mute-video', true);

        await currentRoom.localParticipant.setCameraEnabled(!enabled);
        setButtonDisabled('mute-video', false);
        renderParticipant(currentRoom.localParticipant);
        // update display
        updateButtonsForPublishState();
    },
    flipVideo: () => {
        const videoPub = currentRoom?.localParticipant.getTrack(LivekitClient.Track.Source.Camera);
        if (!videoPub) {
            return;
        }
        if (state.isFrontFacing) {
            setButtonState('flip-video-button', 'Front Camera', false);
        }
        else {
            setButtonState('flip-video-button', 'Back Camera', false);
        }
        state.isFrontFacing = !state.isFrontFacing;
        const options = {
            resolution: LivekitClient.VideoPresets.h720.resolution,
            facingMode: state.isFrontFacing ? 'user' : 'environment',
        };
        videoPub.videoTrack?.restartTrack(options);
    },
    shareScreen: async () => {
        if (!currentRoom)
            return;
        const enabled = currentRoom.localParticipant.isScreenShareEnabled;
        if (!enabled) {
            if (!board.user.permission.screen) {

                console.log('pesmision error')
                return
            }
        }
        var opt = {
            width: 1280,
            height: 720,
            frameRate: 7,
            resolution2: {
                width: 1280,
                height: 720,
                frameRate: 7
            }

        }
        appendLog(`${enabled ? 'stopping' : 'starting'} screen share`);
        setButtonDisabled('screenShareIcon', true);
        await currentRoom.localParticipant.setScreenShareEnabled(!enabled, { audio: true, resolution: opt.resolution2 });
        setButtonDisabled('screenShareIcon', false);
        updateButtonsForPublishState();
    },
    disableScreen: async () => {
        if (!currentRoom)
            return;
        const enabled = currentRoom.localParticipant.isScreenShareEnabled;
        if (!enabled) return
        //console.log('requst for stop screen ....')
        appendLog(`${enabled ? 'stopping' : 'starting'} screen share`);
        setButtonDisabled('screenShareIcon', true);
        await currentRoom.localParticipant.setScreenShareEnabled(!enabled, { audio: true });
        setButtonDisabled('screenShareIcon', false);
        updateButtonsForPublishState();
    },
    startAudio: () => {
        currentRoom?.startAudio();
    },
    enterText: () => {
        if (!currentRoom)
            return;
        const textField = $$$('entry');
        if (textField.value) {
            const msg = state.encoder.encode(textField.value);
            currentRoom.localParticipant.publishData(msg, LivekitClient.DataPacket_Kind.RELIABLE);
            ($$$('chat')).value += `${currentRoom.localParticipant.identity} (me): ${textField.value}\n`;
            textField.value = '';
        }
    },
    disconnectRoom: () => {
        if (currentRoom) {
            currentRoom.disconnect();
        }
        if (state.bitrateInterval) {
            clearInterval(state.bitrateInterval);
        }
    },
    handleScenario: (e) => {
        const scenario = e.target.value;
        if (scenario === 'subscribe-all') {
            currentRoom?.participants.forEach((p) => {
                p.tracks.forEach((rp) => rp.setSubscribed(true));
            });
        }
        else if (scenario === 'unsubscribe-all') {
            currentRoom?.participants.forEach((p) => {
                p.tracks.forEach((rp) => rp.setSubscribed(false));
            });
        }
        else if (scenario !== '') {
            currentRoom?.simulateScenario(scenario);
            e.target.value = '';
        }
    },
    handleDeviceSelected: async (e) => {
        const deviceId = e.target.value;
        const elementId = e.target.id;
        const kind = elementMapping[elementId];
        if (!kind) {
            return;
        }
        state.defaultDevices.set(kind, deviceId);
        if (currentRoom) {
            await currentRoom.switchActiveDevice(kind, deviceId);
        }
    },
    handlePreferredQuality: (e) => {
        const quality = e.target.value;
        let q = LivekitClient.VideoQuality.HIGH;
        switch (quality) {
            case 'low':
                q = LivekitClient.VideoQuality.LOW;
                break;
            case 'medium':
                q = LivekitClient.VideoQuality.MEDIUM;
                break;
            case 'high':
                q = LivekitClient.VideoQuality.HIGH;
                break;
            default:
                break;
        }
        if (currentRoom) {
            currentRoom.participants.forEach((participant) => {
                participant.tracks.forEach((track) => {
                    track.setVideoQuality(q);
                });
            });
        }
    },
    handlePreferredFPS: (e) => {
        const fps = +e.target.value;
        if (currentRoom) {
            currentRoom.participants.forEach((participant) => {
                participant.tracks.forEach((track) => {
                    track.setVideoFPS(fps);
                });
            });
        }
    },
};
window.appActions = appActions;
// --------------------------- event handlers ------------------------------- //
function handleData(msg, participant) {
    const str = state.decoder.decode(msg);
    const chat = $$$('chat');
    let from = 'server';
    if (participant) {
        from = participant.identity;
    }
    chat.value += `${from}: ${str}\n`;
}
function participantConnected(participant) {
    appendLog('participant', participant.identity, 'connected', participant.metadata);
    participant
        .on(LivekitClient.ParticipantEvent.TrackMuted, (pub) => {
            appendLog('track was muted', pub.trackSid, participant.identity);
            renderParticipant(participant);
        })
        .on(LivekitClient.ParticipantEvent.TrackUnmuted, (pub) => {
            appendLog('track was unmuted', pub.trackSid, participant.identity);
            renderParticipant(participant);
        })
        .on(LivekitClient.ParticipantEvent.IsSpeakingChanged, () => {
            // renderParticipant(participant);
            
            const { identity, name } = participant;
            //console.log('name is : ' + name)
            
            let obj=$$$(`name-${identity}`); 
            if(obj){
                if (participant.isSpeaking) {
                    // div.classList.add('speaking');
                     obj.style.color="greenyellow"
                 }
                 else {
                     obj.style.color="white"
                     //div.classList.remove('speaking');
                 }
            }
           
        })
        .on(LivekitClient.ParticipantEvent.ConnectionQualityChanged, () => {
            // renderParticipant(participant);
        });
}
function participantDisconnected(participant) {
    appendLog('participant', participant.sid, 'disconnected');
    renderParticipant(participant, true);
    setTimeout(() => {
        renderParticipant(participant, true);
    }, 1500);
}
function handleRoomDisconnect(reason) {
    if (!currentRoom)
        return;
    appendLog('disconnected from room', { reason });
    setButtonsForState(false);
    renderParticipant(currentRoom.localParticipant, true);
    currentRoom.participants.forEach((p) => {
        renderParticipant(p, true);
    });
    renderScreenShare(currentRoom);
    const container = $$$('session');
    if (container) {
        container.innerHTML = '';
    }
    // clear the chat area on disconnect
    //const chat = $$$('chat');
    //chat.value = '';
    currentRoom = undefined;
    window.currentRoom = undefined;
}
// -------------------------- rendering helpers ----------------------------- //
function appendLog(...args) {
    return;
    const logger = $$$('log');
    for (let i = 0; i < arguments.length; i += 1) {
        if (typeof args[i] === 'object') {
            logger.innerHTML += `${JSON && JSON.stringify ? JSON.stringify(args[i], undefined, 2) : args[i]} `;
        }
        else {
            logger.innerHTML += `${args[i]} `;
        }
    }
    logger.innerHTML += '\n';
    (() => {
        logger.scrollTop = logger.scrollHeight;
    })();
}
// updates participant UI
function renderParticipant(participant, remove = false) {
    const container = $$$('session');
    if (!container)
        return;
    const { identity, name } = participant;
    //console.log('name is : ' + name)
    let div = $$$(`participant-${identity}`);
    const cameraPub = participant.getTrack(LivekitClient.Track.Source.Camera);
    const micPub = participant.getTrack(LivekitClient.Track.Source.Microphone);
    const cameraEnabled = cameraPub && cameraPub.isSubscribed && !cameraPub.isMuted;
    const micEnabled = micPub && micPub.isSubscribed && !micPub.isMuted;
    if (!(cameraEnabled || micEnabled)) {
        remove = true
    }
    /* console.warn("gggggggggg")
    console.log(cameraPub)
    console.log(micPub) */
    if (!(cameraPub || micPub)) {
        // console.log("noting to show")
        // return;
    }
    if (!div && !remove) {
        div = document.createElement('div');
        div.id = `participant-${identity}`;
        div.className = 'participant';
        div.innerHTML = `
      <video id="video-${identity}"></video>
      <audio id="audio-${identity}"></audio>
      <div class="info-bar">
        <div id="name-${identity}" class="name">
        </div>
        <div style="text-align: center;">
          <span id="codec-${identity}" class="codec">
          </span>
          
          <span id="bitrate-${identity}" class="bitrate">
          </span>
        </div>
        <div class="right">
          <span id="signal-${identity}"></span>
          <span id="mic-${identity}" class="mic-on"></span>
        </div>
      </div>
      

    `;
        /*  ${participant instanceof LivekitClient.RemoteParticipant &&
             `<div class="volume-control">
         <input id="volume-${identity}" type="range" min="0" max="1" step="0.1" value="1" orient="vertical" />
       </div>`} */
        container.appendChild(div);
        // const sizeElm = $$$(`size-${identity}`);
        const videoElm = $$$(`video-${identity}`);
        /*  videoElm.onresize = () => {
             updateVideoSize(videoElm, sizeElm);
         }; */
    }
    const videoElm = $$$(`video-${identity}`);
    const audioELm = $$$(`audio-${identity}`);
    if (remove) {
        div?.remove();
        if (videoElm) {
            videoElm.srcObject = null;
            videoElm.src = '';
        }
        if (audioELm) {
            audioELm.srcObject = null;
            audioELm.src = '';
        }
        setVideoElementSize()
        return;
    }
    // update properties
    $$$(`name-${identity}`).innerHTML = participant.name;
    if (participant instanceof LivekitClient.LocalParticipant) {
        $$$(`name-${identity}`).innerHTML += ' (you)';
    }
    const micElm = $$$(`mic-${identity}`);
    const signalElm = $$$(`signal-${identity}`);

    /* if (participant.isSpeaking) {
        div.classList.add('speaking');
    }
    else {
        div.classList.remove('speaking');
    } */
    /*  if (participant instanceof LivekitClient.RemoteParticipant) {
         const volumeSlider = $$$(`volume-${identity}`);
         volumeSlider.addEventListener('input', (ev) => {
             participant.setVolume(Number.parseFloat(ev.target.value));
         });
     } */

    if (cameraEnabled) {
        if (participant instanceof LivekitClient.LocalParticipant) {
            // flip
            videoElm.style.transform = 'scale(-1, 1)';
        }
        else if (!cameraPub?.videoTrack?.attachedElements.includes(videoElm)) {
            const renderStartTime = Date.now();
            // measure time to render
            videoElm.onloadeddata = () => {
                const elapsed = Date.now() - renderStartTime;
                let fromJoin = 0;
                if (participant.joinedAt && participant.joinedAt.getTime() < startTime) {
                    fromJoin = Date.now() - startTime;
                }
                appendLog(`RemoteVideoTrack ${cameraPub?.trackSid} (${videoElm.videoWidth}x${videoElm.videoHeight}) rendered in ${elapsed}ms`, fromJoin > 0 ? `, ${fromJoin}ms from start` : '');
            };
        }
        cameraPub?.videoTrack?.attach(videoElm);
    }
    else {
        // clear information display
        // $$$(`size-${identity}`).innerHTML = '';
        if (cameraPub?.videoTrack) {
            // detach manually whenever possible
            cameraPub.videoTrack?.detach(videoElm);
        }
        else {
            videoElm.src = '';
            videoElm.srcObject = null;
        }
    }

    if (micEnabled) {
        if (!(participant instanceof LivekitClient.LocalParticipant)) {
            // don't attach local audio
            audioELm.onloadeddata = () => {
                if (participant.joinedAt && participant.joinedAt.getTime() < startTime) {
                    const fromJoin = Date.now() - startTime;
                    appendLog(`RemoteAudioTrack ${micPub?.trackSid} played ${fromJoin}ms from start`);
                }
            };
            micPub?.audioTrack?.attach(audioELm);
        }
        micElm.className = 'mic-on';
        micElm.innerHTML = '<i class="fas fa-microphone"></i>';
    }
    else {
        micElm.className = 'mic-off';
        micElm.innerHTML = '<i class="fas fa-microphone-slash"></i>';
    }
    setVideoElementSize()
    switch (participant.connectionQuality) {
        case LivekitClient.ConnectionQuality.Excellent:
        case LivekitClient.ConnectionQuality.Good:
        case LivekitClient.ConnectionQuality.Poor:
            signalElm.className = `connection-${participant.connectionQuality}`;
            signalElm.innerHTML = '<i class="fas fa-circle"></i>';
            break;
        default:
            signalElm.innerHTML = '';
        // do nothing
    }
}
function renderScreenShare(room) {
    //console.log("renderScreenShare")

    const div = $$$('screenshare-area');
    if (room.state !== LivekitClient.ConnectionState.Connected) {
        div.style.display = 'none';
        return;
    }
    let participant;
    let screenSharePub = room.localParticipant.getTrack(LivekitClient.Track.Source.ScreenShare);
    let screenShareAudioPub;
    if (!screenSharePub) {
        room.participants.forEach((p) => {
            if (screenSharePub) {
                return;
            }
            participant = p;
            const pub = p.getTrack(LivekitClient.Track.Source.ScreenShare);
            if (pub?.isSubscribed) {
                screenSharePub = pub;
            }
            const audioPub = p.getTrack(LivekitClient.Track.Source.ScreenShareAudio);
            if (audioPub?.isSubscribed) {
                screenShareAudioPub = audioPub;
            }
        });
    }
    else {
        participant = room.localParticipant;
    }
    if (screenSharePub && participant) {
        //console.warn('screen ssssssss 1')
        screenControler.connectToScreenShare()
        div.style.display = 'block';
        const videoElm = $$$('screenshare-video');
        screenSharePub.videoTrack?.attach(videoElm);
        if (screenShareAudioPub) {
            screenShareAudioPub.audioTrack?.attach(videoElm);
        }
        /*  videoElm.onresize = () => {
             updateVideoSize(videoElm, $$$('screenshare-resolution'));
         }; */
        // const infoElm = $$$('screenshare-info');
        // infoElm.innerHTML = `Screenshare from ${participant.identity}`;
    }
    else {
        // console.warn('screen disconnect......................')
        screenControler.disconnectFromScreenShare();
        div.style.display = 'none';
    }
}
function renderBitrate() {
    return;
    if (!currentRoom || currentRoom.state !== LivekitClient.ConnectionState.Connected) {
        return;
    }
    const participants = [...currentRoom.participants.values()];
    participants.push(currentRoom.localParticipant);
    for (const p of participants) {
        const elm = $$$(`bitrate-${p.identity}`);
        let totalBitrate = 0;
        for (const t of p.tracks.values()) {
            if (t.track) {
                totalBitrate += t.track.currentBitrate;
            }
            if (t.source === LivekitClient.Track.Source.Camera) {
                if (t.videoTrack instanceof LivekitClient.RemoteVideoTrack) {
                    const codecElm = $$$(`codec-${p.identity}`);
                    codecElm.innerHTML = t.videoTrack.getDecoderImplementation() ?? '';
                }
            }
        }
        let displayText = '';
        if (totalBitrate > 0) {
            displayText = `${Math.round(totalBitrate / 1024).toLocaleString()} kbps`;
        }
        if (elm) {
            elm.innerHTML = displayText;
        }
    }
}
function updateVideoSize(element, target) {
    target.innerHTML = `(${element.videoWidth}x${element.videoHeight})`;
}
function setButtonState(buttonId, buttonText, isActive, isDisabled = undefined) {
    const el = $$$(buttonId);
    if (!el)
        return;
    if (isDisabled !== undefined) {
        el.disabled = isDisabled;
    }
    el.innerHTML = buttonText;
    if (isActive) {
        el.classList.add('active');
    }
    else {
        el.classList.remove('active');
    }
}
function setButtonDisabled(buttonId, isDisabled) {
    const el = $$$(buttonId);
    el.disabled = isDisabled;
}
//setTimeout(handleDevicesChanged, 100);
function setButtonsForState(connected) {
    const connectedSet = [
        'mute-video',
        'mute-audio',
        'screenShareIcon',
        'disconnect-ws-button',
        'disconnect-room-button',
        'flip-video-button',
        'send-button',
    ];
    const disconnectedSet = ['connect-button'];
    const toRemove = connected ? connectedSet : disconnectedSet;
    const toAdd = connected ? disconnectedSet : connectedSet;
    toRemove.forEach((id) => $$$(id)?.removeAttribute('disabled'));
    toAdd.forEach((id) => $$$(id)?.setAttribute('disabled', 'true'));
}
const elementMapping = {
    'video-input': 'videoinput',
    'audio-input': 'audioinput',
    'audio-output': 'audiooutput',
};
async function handleDevicesChanged() {
    Promise.all(Object.keys(elementMapping).map(async (id) => {
        const kind = elementMapping[id];
        if (!kind) {
            return;
        }
        const devices = await LivekitClient.Room.getLocalDevices(kind);
        const element = $$$(id);
        populateSelect(element, devices, state.defaultDevices.get(kind));
    }));
}
function populateSelect(element, devices, selectedDeviceId) {
    // clear all elements
    element.innerHTML = '';
    for (const device of devices) {
        const option = document.createElement('option');
        option.text = device.label;
        option.value = device.deviceId;
        if (device.deviceId === selectedDeviceId) {
            option.selected = true;
        }
        element.appendChild(option);
    }
}
function updateButtonsForPublishState() {
    if (!currentRoom) {
        return;
    }
    const lp = currentRoom.localParticipant;

    var el = $$$('mute-video');
    if (lp.isCameraEnabled)
        el.style.color = "red"
    else el.style.color = "black"

    var el = $$$('mute-audio');
    if (lp.isMicrophoneEnabled)
        el.style.color = "red"
    else el.style.color = "black"

    var el = $$$('screenShareIcon');
    if (lp.isScreenShareEnabled) {
        el.style.color = "red"
        screenControler.localScreenShareStatus = 1
    }
    else {

        el.style.color = "black"
        screenControler.localScreenShareStatus = 0
    }
    // video
    /*   setButtonState('mute-video', `${lp.isCameraEnabled ? 'Disable' : 'Enable'} Video`, lp.isCameraEnabled);
      // audio
      setButtonState('mute-audio', `${lp.isMicrophoneEnabled ? 'Disable' : 'Enable'} Audio`, lp.isMicrophoneEnabled);
      // screen share
      setButtonState('screenShareIcon', lp.isScreenShareEnabled ? 'Stop Screen Share' : 'Share Screen', lp.isScreenShareEnabled); */
}
async function acquireDeviceList() {
    handleDevicesChanged();
}
//acquireDeviceList();
//# sourceMappingURL=sample.js.map