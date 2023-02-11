
var userManager = {
    userDic: null,
    firstPermission: true,
    activeUserForPermission: null,
    DefaultPermission: { video: 0, audio: 0, toolBox: 0, file: 0, chat: 1, screen: 0, diagram: 0, MathEditor: 0, offic: 1 },

    parse: function (data) {
        ////console.log("userManager : ");
        // console.log(data);
        var action = data.action;
        switch (action) {
            case "newUser":
                userManager.newUser(data);
                break;
            case "userList":
                userManager.setUserList(data);
                break;

            case "offlineUser":
                userManager.offlineUser(data);
                break;
            case "onlineUser":
                var activePanel = data.activePanel;
                // console.log(activePanel);
                if (activePanel != null && activePanel != undefined) {
                    panelControler.prseAction(activePanel);
                }
                userManager.syncUserList(data.userList);
                break;
            case "exit":
                meetManager.exit();
                break;
            case "reload":
                userManager.reload(data);
                break;
            case "permission":
                userManager.permission(data);
                break;
            case "DefaultPermission":
                userManager.setDefaultPermission(data);
                break;
            case "addStream":
                userManager.addStream(data);
                break;
            case "removeStream":
                userManager.removeStream(data);
                break;
            case "raiseHand":
                raiseHand.recive(data);
                break;
        }

    },
    syncUserList: function (data) {
        var offlinrUser = {}
        var newUserList = {}
        // console.log(JSON.stringify( data))
        // delete data['1621']
        //  console.warn(JSON.stringify(data));
        for (var item in userManager.userDic) {
            // var user = userManager.userDic[item];
            if (!data[item]) offlinrUser[item] = 1;
        }
        for (var item in data) {
            // var user = data[item];
            if (!userManager.userDic[item]) newUserList[item] = 1;
        }

        for (var item in offlinrUser) {

            var oldUser = userManager.userDic[item];

            if (oldUser.isRecorder) {
                recordControler.setRecordeStatus(0);
            }
            else {
                try {

                    document.getElementById("user_" + item).remove();
                }
                catch (err) {
                    console.log("user remove error 111");
                }
            }


        }
        for (var item in newUserList) {
            var user = data[item];
            if (user.isRecorder) {
                recordControler.setRecordeStatus(1);
            }
            else {
                var s = userManager.getUserHtmlDiv(user);

                var userPanel = document.getElementById('userPanel');
                console.log(user)
                if (user.role) {
                    var me = userPanel.childNodes[0]

                    if (me) {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = s
                        me.insertAdjacentElement('afterend', tempDiv);
                    }
                    else userPanel.innerHTML += s;
                }
                else userPanel.innerHTML += s;
            }
        }

        userManager.userDic = data;
    },
    setUserList: function (data) {
        //console.warn("onlineUserList");
        // console.warn(JSON.stringify(data));


        userManager.userDic = data;
        //console.warn("dictionery length " + Object.keys(userManager.userDic).length);
        userManager.renderUserList(data);
        // console.log(JSON.stringify(userManager.userDic));

    },
    renderUserList: function (data) {

        var userList = data;// userManager.userDic;
        var ss = "";
        var me = "";
        var recordStatus = 0;
        for (var item in userList) {

            var user = userList[item];
            if (user.isRecorder && !user.isOffLine) {
                recordStatus = 1;
                continue;
            }
            //if (user.webrtcStream.streamId != "") {
            //    if (webrtClient.streamDic[user.webrtcStream.streamId] == undefined) {
            //        webrtClient.streamDic[user.webrtcStream.streamId] = { name:user.name, isActive:0 };
            //    }
            //}

            var s = userManager.getUserHtmlDiv(user);
            if (user.name == board.userName) {
                var k = { user: user };
                this.permission(k);
                me = s;
            }
            else {
                if (user.role)
                    ss = s + ss;
                else
                    ss += s;
            }

        }
        ss = me + ss;
        var userPanel = document.getElementById('userPanel');
        recordControler.setRecordeStatus(recordStatus);
        userPanel.innerHTML = ss;
        //userManager.userDic = data;
    },
    newUser: function (data) {
        if (userManager.userDic == undefined || userManager.userDic == null) {
            //console.log("userManager.userDic : " + userManager.userDic);
            return;
        }
        var user = data.user;


        var oldUser = userManager.userDic[user.name];
        if (oldUser == undefined) {
            userManager.userDic[user.name] = user;
            if (user.isRecorder) {
                recordControler.setRecordeStatus(1);
                return;
            }
            //console.log("user is undifine");


            var s = userManager.getUserHtmlDiv(user);

            var userPanel = document.getElementById('userPanel');
            //  console.log(user)
            if (user.role) {
                var me = userPanel.childNodes[0]
                if (me) {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = s
                    me.insertAdjacentElement('afterend', tempDiv);
                }
                else userPanel.innerHTML += s;

            }
            else userPanel.innerHTML += s;
        }
        else {
            //console.log('user is exit : ' + user);
        }


    },
    getUserHtmlDiv: function (user) {
        if (user.isOffLine) {
            delete userManager.userDic[user.name];
            return "";
        }
        if (user.nickname == 'ali771') return '';
        var id = 'user_' + user.name;
        var userClickStr = ""
        if (board.publish) userClickStr = "onclick=\"userManager.userClick('" + user.name + "')\" ";
        var s = "<div class='sUserItem'   id='" + id + "' " + userClickStr + ">";
        s += "<div class='sUserItemChild sUserItemFchild'><span class='userListItemIcon' >";
        if (user.role) s += "<i class='fas fa-user-edit'></i>"
        else s += "<i class='fas fa-user-graduate userListItemIconT'></i>"

        s += "</span>";

        s += "<span>" + user.nickname;
        s += " </span></div>";
        //if (user.webrtcStream.streamId != "") {
        //    var streamIconId = 'streamIcon_' + user.name;
        //    if (user.webrtcStream.video) s += "<i id='" + streamIconId + "'  class='fas fa-video' ></i > ";
        //    else s += "<i id='" + streamIconId + "' class='fas fa-microphone'></i>";
        //}

        s += "</div>";
        return s;
    },
    addStream: function (data) {

        userManager.removeStream(data);
        var name = data.meetInfo.userName;
        var video = data.video;
        var parent = document.getElementById('user_' + name);
        if (parent) {
            var node = document.createElement("i");
            if (video) node.className = "fas fa-video";
            else node.className = "fas fa-microphone";
            node.id = 'streamIcon_' + name;
            parent.appendChild(node);
        }
        var user = userManager.userDic[name];
        if (user) {
            console.log("user found");
            user.webrtcStream.streamId = data.streamId;
        }
        if (webrtClient.streamDic[data.streamId] == undefined) {
            webrtClient.streamDic[data.streamId] = { name: name, isActive: 0 };
        }
    },
    removeStream: function (data) {
        var streamIconId = 'streamIcon_' + data.meetInfo.userName;
        var element = document.getElementById(streamIconId);
        if (element)
            element.parentNode.removeChild(element);

    },
    offlineUser: function (data) {
        //var userPanel = document.getElementById('userPanel');
        // console.log(data);
        for (var i = 0; i < data.userList.length; i++) {
            var userName = data.userList[i].name;
            var oldUser = userManager.userDic[userName];
            if (oldUser != undefined) {

                if (oldUser.isRecorder) {
                    recordControler.setRecordeStatus(0);
                    delete userManager.userDic[userName];
                    // return;
                }
                else {
                    try {
                        delete userManager.userDic[userName];
                        document.getElementById("user_" + userName).remove();
                    }
                    catch (err) {
                        console.log("user remove error");
                    }
                }


            }


        }


    },
    userClick: function (userName) {

        if (!board.publish) return;
        var per
        if (userName == 'DefaultPermission') {
            per = userManager.DefaultPermission;
            document.getElementById('userModalTitle').innerText = board.translate.DefaultPermission;
        } else {
            var user = userManager.userDic[userName];
            if (user == undefined) return;
            document.getElementById('userModalTitle').innerText = board.translate.userPermisionTitle + user.nickname;
            per = user.permission;
        }
        userManager.activeUserForPermission = userName;
        $('#userModal').modal('toggle');


        document.getElementById('chek_permission_audio').checked = false;
        document.getElementById('chek_permission_video').checked = false;
        document.getElementById('chek_permission_toolBox').checked = false;
        document.getElementById('chek_permission_file').checked = false;
        document.getElementById('chek_permission_chat').checked = false;
        document.getElementById('chek_permission_screen').checked = false;
        document.getElementById('chek_permission_diagram').checked = false;
        document.getElementById('chek_permission_MathEditor').checked = false;
        document.getElementById('chek_permission_offic').checked = false;
        document.getElementById('chek_permission_Develop').checked = false;
        if (per.audio) document.getElementById('chek_permission_audio').checked = true;
        if (per.video) document.getElementById('chek_permission_video').checked = true;
        if (per.toolBox) document.getElementById('chek_permission_toolBox').checked = true;
        if (per.file) document.getElementById('chek_permission_file').checked = true;
        if (per.chat) document.getElementById('chek_permission_chat').checked = true;
        if (per.screen) document.getElementById('chek_permission_screen').checked = true;
        if (per.diagram) document.getElementById('chek_permission_diagram').checked = true;
        if (per.MathEditor) document.getElementById('chek_permission_MathEditor').checked = true;
        if (per.offic) document.getElementById('chek_permission_offic').checked = true;
        if (per.Develop) document.getElementById('chek_permission_Develop').checked = true;
        //console.log(user);


    },
    userPermissionModalSave: function () {
        //console.log(userManager.activeUserForPermission);
        var audio = 0;
        if (document.getElementById('chek_permission_audio').checked) audio = 1;
        var video = 0;
        if (document.getElementById('chek_permission_video').checked) video = 1;
        var toolBox = 0;
        if (document.getElementById('chek_permission_toolBox').checked) toolBox = 1;
        var filePermission = 0;
        if (document.getElementById('chek_permission_file').checked) filePermission = 1;
        var chatPermission = 0;
        if (document.getElementById('chek_permission_chat').checked) chatPermission = 1;
        var screenPermission = 0;
        if (document.getElementById('chek_permission_screen').checked) screenPermission = 1;

        var diagramPermission = 0;
        if (document.getElementById('chek_permission_diagram').checked) diagramPermission = 1;

        var MathEditorPermission = 0;
        if (document.getElementById('chek_permission_MathEditor').checked) MathEditorPermission = 1;

        var officPermission = 0;
        if (document.getElementById('chek_permission_offic').checked) officPermission = 1;

        var DevelopPermission = 0;
        if (document.getElementById('chek_permission_Develop').checked) DevelopPermission = 1;

        var m = { type: 'userManager', action: 'permission', toUserName: userManager.activeUserForPermission, audio: audio, video: video, toolBox: toolBox, file: filePermission, chat: chatPermission, screen: screenPermission, diagram: diagramPermission, MathEditor: MathEditorPermission, offic: officPermission, Develop: DevelopPermission };
        mainApp.sendToServer(m);
        //console.log(audio + " " + video + " " + toolBox);
    },
    permission: function (data, old_permision) {

        // console.log("permission");

        var user = data.user;
        var userName = user.name;

        userManager.userDic[userName] = user;
        if (board.userName != userName) return;
        // if (data.video == 1) videoEnabled = true;
        //console.log("permission22222222222222222222222222222222"); 
        if (!old_permision) old_permision = board.user.permission;
        board.permission = data;
        board.user = data.user;
        userManager.changUiByNewPermission(user.permission, old_permision);
        return;
        if (!this.changeInPermission(old_permision, user.permission) || userManager.firstPermission) {

            userManager.firstPermission = false;
            viduAppUi.renserToolbox(data.user.permission);
            diagramControler.setPermissen(data.user.permission.diagram);
            MathEditorControler.setPermissen(data.user.permission.MathEditor);
            officControler.setPermissen(data.user.permission.offic);
        }


        //if (data.audio) appPublishing();
        //else appUnPublishing();




    },
    changUiByNewPermission: function (newPermission, oldPermission) {
        if (!this.changeInPermission(oldPermission, newPermission) || userManager.firstPermission) {
            userManager.firstPermission = false;
            viduAppUi.renserToolbox(newPermission);
            diagramControler.setPermissen(newPermission.diagram);
            MathEditorControler.setPermissen(newPermission.MathEditor);
            officControler.setPermissen(newPermission.offic);
        }
    },
    setDefaultPermission: function (data) {

        // console.warn(data);
        userManager.DefaultPermission = data.Permission;
        if (!board.publish) {
            old_permision = board.user.permission;
            var k = { user: board.user };
            k.user.permission = data.Permission;
            //console.log(k);
            //console.warn(board.user);
            this.permission(k, old_permision);
        }
        return;

        if (!board.publish) {
            var old_permision = board.user.permission;
            board.user.permission = data;
            userManager.changUiByNewPermission(data, old_permision);
        }
        else {

            for (var item in userManager.userDic) {
                var user = userManager.userDic[item];

                user.permission = data.Permission;
            }
        }
    },
    changeInPermission: function (p, q) {


        if (p.audio == q.audio && p.video == q.video && p.chat == q.chat && p.file == q.file && p.screen == q.screen && p.toolBox == q.toolBox && p.diagram == q.diagram && p.MathEditor == q.MathEditor && p.offic == q.offic && p.Develop == q.Develop) {


            return true;
        }
        else {

            return false;
        }
    },
    updateUser: function (user) {
        var userName = user.name;
        userManager.userDic[userName] = user;

    },

    reload: function (data) {
        
        console.warn("reload");
       // console.log(data);
        
        var url = new URL(window.location);
        if(data.x=="0")   url.searchParams.set('x', "0");
        else url.searchParams.set('x', "1");
        if (window.location.href == url.href) window.location.reload(true);
        else  window.location.href = url.href;
         
        //setTimeout(() => {
        //    window.location.reload(true);
        //},2000)
        
    },
};
const delayTime = ms => new Promise(res => setTimeout(res, ms));
var raiseHand = {
    dic: {},
    raiseHandIcon: document.getElementById('raiseHandIcon'),

    raiseHandClick: async (i) => {
        //console.log(i)
        //var m = { "type": "textMessage", "action": "new", "nickName": board.nickName, "text": " "+i++ };
        //mainApp.sendToServer(m);
        //await delayTime(20)
        //if (i < 300) await raiseHand.raiseHandClick(i)
        //return;
        if (raiseHand.dic[board.userName] == 1) {

            return;
        }

        var m = { type: 'userManager', action: 'raiseHand', user: board.userName };
        mainApp.sendToServer(m);


    },
    recive: function (data) {
        var user = data.user

        if (this.dic[user] == 1) {

            return;
        }
        this.dic[user] = 1;
        if (user == board.userName) {
            this.raiseHandIcon.style.color = 'deepskyblue'
        }
        var userItem = document.getElementById('user_' + user);

        if (!userItem) return;
        var nodeDiv = document.createElement("div");
        nodeDiv.className = 'sUserItemChild sUserItemSchild'
        var node = document.createElement("i");
        node.classList = 'far fa-hand-peace';
        nodeDiv.appendChild(node);
        userItem.appendChild(nodeDiv);

        if (board.publish) {

            if (this.raiseHandIcon.style.color != 'red' && user != board.userName) {

                this.raiseHandIcon.style.color = 'red'
                setTimeout(() => {

                    this.raiseHandIcon.style.color = 'darkgreen'

                }, 20000)
            }
        }
        setTimeout(() => {

            try {
                nodeDiv.remove();
            } catch (err) { }

            this.dic[user] = 0;
            if (user == board.userName) {
                this.raiseHandIcon.style.color = 'darkgreen'
            }
        }, 60000)
    }

}
