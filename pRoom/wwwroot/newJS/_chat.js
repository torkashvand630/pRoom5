////console.log("..................")
////console.log(navigator.mediaDevices &&
////    "getDisplayMedia" in navigator.mediaDevices);

////console.log(window.navigator);
jQuery(document).ready(function ($) {
   // console.warn("**************************************************************************************")
    var bsOverlay = $('.bs-canvas-overlay');
    $('[data-toggle="canvas"]').on('click', function () {
        var ctrl = $(this),
            elm = ctrl.is('button') ? ctrl.data('target') : ctrl.attr('href');
        $(elm).addClass('mr-0');
        $(elm + ' .bs-canvas-close').attr('aria-expanded', "true");
        $('[data-target="' + elm + '"], a[href="' + elm + '"]').attr('aria-expanded', "true");
        if (bsOverlay.length)
            bsOverlay.addClass('show'); 
        return false;
    });
    $('.bs-canvas-close').on('click', function () {
        
        var elm;
        if ($(this).hasClass('bs-canvas-close')) {
            elm = $(this).closest('.bs-canvas');
            $('[data-target="' + elm + '"], a[href="' + elm + '"]').attr('aria-expanded', "false");
        } else {
            elm = $('.bs-canvas')
            $('[data-toggle="canvas"]').attr('aria-expanded', "false");
        }
        elm.removeClass('mr-0');
        $('.bs-canvas-close', elm).attr('aria-expanded', "false");
        if (bsOverlay.length)
            bsOverlay.removeClass('show');
        return false;
    });

    $('.bs-canvas-close, .bs-canvas-overlay').on('click', function () {
       // console.warn("**************************************************************************************") 
        return
        var elm;
        if ($(this).hasClass('bs-canvas-close')) {
            elm = $(this).closest('.bs-canvas');
            $('[data-target="' + elm + '"], a[href="' + elm + '"]').attr('aria-expanded', "false");
        } else {
            elm = $('.bs-canvas')
            $('[data-toggle="canvas"]').attr('aria-expanded', "false");
        }
        elm.removeClass('mr-0');
        $('.bs-canvas-close', elm).attr('aria-expanded', "false");
        if (bsOverlay.length)
            bsOverlay.removeClass('show');
        return false;
    });
});
function setChatPanel() {
    var hm = 62;
    if (board.isMobile) hm = 65;
    var h = $("#chatPanel").height() - hm; //document.getElementById('chatPanel').st;
   
    var chatContiner = document.getElementById('chatContiner');
    var h2 = h + "px";
    // console.log("h2 : " + h2); 
    chatContiner.style.height = h2;
    var userPanel = document.getElementById('userPanel'); 
    userPanel.style.height = (h+26)+"px";
}
document.getElementById('menu-toggle').addEventListener("click", function () { 
    chatService.unReadMessage = 0;
    chatService.updateUnReadmessage();
});
var chatService = {
    
    unReadMessage: 0,
    messageIDfordelete: 0,
    //chList=[], 

    parse: function (data) {
        var action = data.action;
        switch (action) {
            case "new":
                chatService.reciveMessage(data);
                break;
            case "delete":
                chatService.deleteMessage(data);
                break;
        }
    },
    sendTextMessage: function () {
      //  $("#session").load("/psd/Home/mmkk");
      //  $("#session").load('http://localhost:8443/fff/index.html');
        
       
        var obj = document.getElementById('chatInput');
        
        var continer = document.getElementById('chatContiner');
        var t = obj.value;
        t = t.trim();
        if (t == "") {
           
            obj.value = '';
            event.preventDefault();
            return;
        }
        if (t == 'disdis') {
            signalmessenger.close();
            obj.value = '';
            event.preventDefault();
            return;
        }
        var m = { "type": "textMessage", "action": "new", "nickName": board.nickName, "text": t };
        mainApp.sendToServer(m);
      
        // var s = '<div><span>' + board.userName + '</span> :  ' + t + '</div>';
        //// console.log(t);
        // continer.innerHTML += s
        obj.value = '';
        event.preventDefault(); // disable normal form submit behavior
       
        return false; // prevent further bubbling of event
    },
   

    reciveMessage: function (m) {
       
       // var obj = document.getElementById('wrapper');
        if (layout.id == 2 && !layout.menuStatus  ) {
            chatService.unReadMessage++;
        }
        chatService.updateUnReadmessage();
        var nickName = m.m.nickName;
        var text = m.m.text;
       // for (i = 1; i < 300; i++)
            this.handelMessage(m.m.id, text , nickName, m.m.userName);



    },
    handelMessage: function (id,text, nickName, userName) {
      
        //var s = '<div class="chatMassageItem" ><p  class="chatMassageItemLine" >' + nickName + ': </p> <p  class="chatMassageItemLine"> ' + text + '</p></div>';
        var continer = document.getElementById('chatContiner');
        continer.innerHTML += chatService.getMessageHtml(id, text, nickName, userName);
        chatService.scroolToEnd();
    },
    scroolToEnd: function () {
        var continer = document.getElementById('chatContiner');
        continer.scrollTop = continer.scrollHeight;
    },
    getMessageHtml: function (id, text, nickName, userName) {
        return '<div id=chatMassageItem_' + id + ' class="chatMassageItem" ><p  class="chatMassageItemLine" > <strong onclick="userManager.userClick(\'' + userName + '\')" class="chatMassageUserName">' + nickName + '  :  </strong><normal id=chatMassageItemText_' + id + '> ' + text + '</normal><strong onclick="chatService.editMessageView(\'' + id + '\')">   <i class="far fa-trash-alt chatMessageTextEdit"></i></strong></p></div>';

    },
    recivechatList: function (chatList) {
        document.getElementById('chatContiner').innerHTML = "";
        var continer = document.getElementById('chatContiner');
        var s = "";
        for (var i = 0; i < chatList.length; i++) {
            var r = chatList[i];

           // this.chList[r.id] = r;
            if (!r.isDelete)
                s += this.getMessageHtml(r.id, r.text, r.nickName, r.userName);
           // this.handelMessage(r.id,r.text, r.nickName, r.userName);
        }
        continer.innerHTML = s;
        continer.scrollTop = continer.scrollHeight;
        chatService.scroolToEnd();
      //  console.warn(chatList);
    },
    updateUnReadmessage: function () {
        var obj = document.getElementById('unReadMessage');
        if (!chatService.unReadMessage) obj.innerText = "";
        else obj.innerText = chatService.unReadMessage;
    },
    editMessageView: function (id) {
       // console.log(id);
        if (!board.publish) return;
        var obj = document.getElementById('chatMassageItemText_' + id);
        if (!obj) return;
        this.messageIDfordelete = id;
        document.getElementById('messageForDelete').innerText = obj.innerText;

        $('#messageModal').modal('toggle');
    },
    deleteMessageToServer: function () {
        if (!board.publish) return;
        var m = { "type": "textMessage", "action": "delete", id: this.messageIDfordelete };
        
        mainApp.sendToServer(m);
        return;
        var obj = document.getElementById('chatMassageItem_' + this.messageIDfordelete);
        if (!obj) return;
       
    },
    deleteMessage: function (m) {
        
        var obj = document.getElementById('chatMassageItem_' + m.id);
        if (!obj) return;
        obj.remove();
        
    }
}