var officControler = {
    isActive: 0,
    officIframe: document.getElementById('office_form'),
    lastMessage: null,
    getMessage: 0,
    sendMessage: 0,
    file: '',
    fileList: [],
    ui: 'min',//atlas
    firstLoad: 1,
    wopiUri: board.officeServer,
    queryStr: board.user.permission.offic ? "" : "&permission=readonly",
    WordFile: ['DOCX', 'DOC', 'DOT', 'ODT', 'FODT', 'RTF', 'TXT', 'HTML', 'HTM'],
    PowerPointFile: ['PPTX', 'PPT', 'PPS', 'POT', 'ODP', 'FODP'],
    ExcelFile: ['XLSX', 'ODS' , 'FODS' ],

    Click: function () {

        $('#fileOfficPanelModal').modal('toggle');
        return;

        if (screenControler.screenShareRemoteStatus || screenControler.screenShareStatus) {
            boardClick();
            return;
        }
        if (officControler.isActive == 1)
            officControler.end();
        else {
            var m = { type: 'panelControler', action: 'offic', file: officControler.file };
            var res = mainApp.sendToServer(m);
        }
        // diagramControler.start();
    },

    start: function (force) {
        if (officControler.file == "") return;
        // allowMessage = 0;
        //setTimeout(() => {
        //    allowMessage = 1;
        //},10000)
       
        panelControler.activeOffic();
       // if (officControler.isActive) return;
        officControler.isActive = 1;
        if (force || officControler.firstLoad) {


            officControler.firstLoad = 0;
            var fn = board.meetID + "_" + officControler.file;
            var u ="WOPISrc="+ window.location.protocol + "//" + window.location.host +"/wopi/files/"
           // fn = btoa(fn);
           // fn = btoa(unescape(encodeURIComponent(fn)));
           // var url = encodeURI("https://p.learn100.ir/wopi/files/" + fn);
            // if (officControler.officIframe.src == null || officControler.officIframe.src == undefined || officControler.officIframe.src == "") {
            //  console.log('layout.id ' + layout.id + ' layout.sessionPanelPosetion ' + layout.sessionPanelPosetion);
            //  officControler.officIframe.src = board.officeServer + "/loleaflet/dist/loleaflet.html?file_path=file:///opt/collaboraoffice6.4/share/template/common/internal/board/" + board.meetID + "/offic/" + officControler.file + officControler.queryStr;
            officControler.officIframe.action = officControler.wopiUri + u + fn + officControler.queryStr;
            if (layout.id == 1 && layout.sessionPanelPosetion == 3) {

                baseLayout.parse('11');
            }
            officControler.submit();
        }
        //  }



    },

    setPermissen: function (per) {
        officControler.queryStr = per ? "" : "&permission=readonly";
        //if (!(diagramControler.diagramIframe.src == null || diagramControler.diagramIframe.src == undefined || diagramControler.diagramIframe.src == "")) {
        //    diagramControler.diagramIframe.src = "/webapp/index.html?embed=0&ui=" + diagramControler.ui + "&spin=0&proto=json";
        //}
    },
    end: function () {

        // diagramControler.isActive = 0;
        boardClick();
    },

    renderFileList: function (offic) {
       
        officControler.fileList = offic.filelist;
        officControler.file = offic.activeFile;
        //var obj = document.getElementById('fileOfficPanel');
        //obj.innerHTML = "";
        try {
            var table = document.getElementById('officFiletable');
            var rowCount = table.rows.length;

            for (var i = 0; i < rowCount; i++) {                              
                    table.deleteRow(i);                   
            }
        } catch (e) {
            console.log(e);
        }


        for (var i = 0; i < officControler.fileList.length; i++) {
            var r = officControler.fileList[i];
            officControler.renderFileToHtmlElement(board.meetID, i+1, r.name, r.ext);
        }
    },
    renderFileToHtmlElement: function (meetID, i, fileName, ext) {
        //var obj = document.getElementById('fileOfficPanel');
        //var s = "";
        //var selectSpan = '<span class="officItem"   onclick="officControler.activeFileServer(\'' + fileName + '\')" style="padding: 0px 7px;color: #182aff;font-weight: bold;cursor: pointer;">SELECT</span>';

        var dl = "/files/board/" + meetID + "/offic/" + fileName;
      //  s += '<div>' + i + ' -   file ' + i + selectSpan + '    <a style="padding:0px 7px;"  href="' + dl + '" target="_blank"> download </a><a onclick="officControler.activeFileServer("' + fileName + '")" >' + fileName + '</a></div>';
        selectSpan = '<a class="officItem" href="#" onclick="officControler.activeFileServer(\'' + fileName + '\')"  ><i class="fa fa-edit"  ></i> </a>';
        var table = document.getElementById('officFiletable');

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var r = '<span>' + i + '</span>';
        cell1.innerHTML = r;

        cell1 = row.insertCell(1);
        // r = '<span>select</span>';
        cell1.innerHTML = selectSpan;

          cell1 = row.insertCell(2);
          r = '<span>' + fileName + '</span>';
        cell1.innerHTML = r;
         
        cell1 = row.insertCell(3);
        r = '<a href="' + dl +'" target="_blank"><i class="fas fa-download"></i></a>';
        cell1.innerHTML = r;
        
      //  obj.innerHTML += s;
    },
    activeFileServer: function (fileName) {
        // panelControler.disconectScreenShare();
        //var m = { type: 'panelControler', action: 'offic' };
        //var res = mainApp.sendToServer(m);

        var p = { type: 'offic', action: 'fileSelect', fileName: fileName };
        // var m = { "type": "board", "board": "draw", "d": { "t": "pageSelect", "drawId": 1, "at": "", "num": pageID, "fileID": fileID, "del": 0, "type": "board", "board": "draw" } }
        mainApp.sendToServer(p);
    },

    parse: function (data) {
        var action = data.action;
         
        if (action == "fileSelect") {
            var wopiUri = data.wopiUri;
          
            officControler.wopiUri = wopiUri;
            var fileName = data.fileName;

            if (officControler.file != fileName || officControler.firstLoad) {
                officControler.file = fileName;

                officControler.start(1);
            }
            else {
                officControler.isActive = 1;
                panelControler.activeOffic();
            }
            return;
        }
        if (action == "uploadFile") {
            var r = data.file;
            officControler.fileList.push(r);
            officControler.renderFileToHtmlElement(board.meetID, officControler.fileList.length, r.name, r.ext);
        }

    },

    submit: function () {
        var frameholder = document.getElementById('frameholder');
        var office_frame = document.createElement('iframe');
        office_frame.name = 'office_frame';
        office_frame.id = 'office_frame';
        office_frame.style.height = "100%";
        office_frame.style.width = "100%";
        // The title should be set for accessibility
        office_frame.title = 'Office Online Frame';
        // This attribute allows true fullscreen mode in slideshow view
        // when using PowerPoint Online's 'view' action.
        office_frame.setAttribute('allowfullscreen', 'true');
        frameholder.appendChild(office_frame);
        document.getElementById('office_form').submit();
    }
}