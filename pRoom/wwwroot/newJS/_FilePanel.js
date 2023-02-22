
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          //  console.log(reader.result.toString());
            const base64String = reader.result
                .replace("data:", "")
                .replace(/^.+,/, "");

            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}
async function startFileUpload() {
    if (document.querySelector('#file-input').files.length == 0) {
        alert('Error : No file selected');
        return;
    }

    var file = document.querySelector('#file-input').files[0];
    var mime_types = ['image/jpeg', 'image/png', "application/pdf", "application/x-pdf"];

    // validate MIME type
    if (mime_types.indexOf(file.type) == -1) {
        alert('Error : Incorrect file type');
        return;
    }
    document.getElementById('fileUploadMessage').innerHTML = board.translate.fileManagement_startUpload;
    document.getElementById('loadFileXml').style.display = "none";
    //const result = await getBase64(file).catch(e => Error(e));
    //if (result instanceof Error) {
    //    console.log('Error: ', result.message);
    //    return;
    //}
    //console.log(result);
    //var m = { type: 'fileuploadMqtt', data: result };
    //mainApp.sendToServer(m);
    //return
     
    //fr = new FileReader();
    //fr.addEventListener("loadend", function () {       
    //    console.log("file upload send :" + fr.result.byteLength + " bytes");
    //    const int8Array = new Int8Array(fr.result);
    //    const data = [];
    //    for (var i = 0; i < int8Array.length; i++) { 
    //        data.push(int8Array[i]);
    //    } 
    //    var m = { type: 'fileuploadMqtt', data: data };
    //    mainApp.sendToServer(m);        
    //});
    //fr.readAsArrayBuffer(file);
    //return;


    var data = new FormData();
    data.append("from", mainApp.meetInfo.userName);
    data.append("meetID", mainApp.meetInfo.meetID);

    data.append('files', document.querySelector('#file-input').files[0]);
   
    var request = new XMLHttpRequest();
    request.open('post', '/fileUp/uploadFile');


    request.upload.addEventListener('progress', function (e) {
        var percent_complete = (e.loaded / e.total) * 100;
        percent_complete += "  ";
        document.getElementById('fileUploadMessage').innerHTML = board.translate.fileManagement_startUpload + " : " + percent_complete.substring(0, 3)+ " %";
       // console.log(percent_complete);
    });


    request.addEventListener('load', function (e) {
        document.getElementById('fileUploadMessage').innerHTML = board.translate.fileManagement_uploadComplate;
       // setTimeout(function () {
          //  document.getElementById('fileUploadMessage').innerHTML = "";
      //  }, 5000)
       // console.log(request.status);
       // console.log(request.response);
    });

    // send POST request to server side script
    request.send(data);
    document.querySelector('#file-input').value = '';
}
function startFileOfficUpload() {
    if (document.querySelector('#file-offic-input').files.length == 0) {
        alert('Error : No file selected');
        return;
    }

    var file = document.querySelector('#file-offic-input').files[0];
    console.log(file);
    console.log(file.name);
    console.log(file.type);
    var ext = file.name.split('.').pop().toUpperCase();
    console.log(ext);
  //  var mime_types = ['image/jpeg', 'image/png', "application/pdf", "application/x-pdf"];

    // validate MIME type
    if (officControler.WordFile.indexOf(ext) == -1 && officControler.PowerPointFile.indexOf(ext) == -1 && officControler.ExcelFile.indexOf(ext) == -1 ) {
        document.getElementById('fileOfficUploadMessage').innerHTML = 'Error : Incorrect file type';
        console.log('Error : Incorrect file type');
        return;
    }
    document.getElementById('fileOfficUploadMessage').innerHTML = board.translate.fileManagement_startUpload;

    var data = new FormData();
    data.append("from", mainApp.meetInfo.userName);
    data.append("meetID", mainApp.meetInfo.meetID);

    data.append('files', document.querySelector('#file-offic-input').files[0]);

    var request = new XMLHttpRequest();
    request.open('post', '/fileUp/uploadOfficFile');


    request.upload.addEventListener('progress', function (e) {
        var percent_complete = (e.loaded / e.total) * 100;
        console.log(percent_complete);
    });


    request.addEventListener('load', function (e) {
        if (request.response == "ok")
            document.getElementById('fileOfficUploadMessage').innerHTML = board.translate.fileManagement_uploadComplate;
        else
            document.getElementById('fileOfficUploadMessage').innerHTML = "error in upload";
        setTimeout(function () {
            document.getElementById('fileOfficUploadMessage').innerHTML = "";
        }, 5000)
       // console.log(request.status);
        // console.log(request.response);
    });

    // send POST request to server side script
    request.send(data);
    document.querySelector('#file-offic-input').value = '';
}

var fileService = {
    fileList: null,
    openFilePanelModal: function () {
        $('#filePanelModal').modal('toggle');
    },
    parse: function (data) {
        var action = data.action;
        switch (action) {
            case "file":
                fileService.handleReciveFile(data);
                break;
            case "setImage":
                fileService.setImageParse(data);
                break;
        }
    },

    handelFileList: function (fileList) {
        //  bboard.fileList = fileList;
       
        fileService.fileList = fileList;
        //var obj = document.getElementById('filePanel');
        //obj.innerHTML = "";
        try {
            var table = document.getElementById('PdfFiletable');
            var rowCount = table.rows.length;

            for (var j = rowCount - 1; j >= 0; j--) {
                table.deleteRow(j);
            }
        } catch (e) {
            console.log(e);
        }
        for (var i = 0; i < fileList.length; i++) {
            var r = fileList[i];
            if (r.pageCount > 0)
                fileService.renderFileToHtmlElement(board.meetID, r.inRoomID, r.name, r.ext);
            else {
                console.warn("page count is 0 : "  );
                console.log(r)
            }
        }

    },

    handleReciveFile: function (data) {
       // console.log('handleReciveFile');
       // console.log(data);
        
       
        if (data.res != "ok") {
            setTimeout(function () {
                document.getElementById('fileUploadMessage').innerHTML = "error in convert your file";
                document.getElementById('loadFileXml').style.display = "block";
            }, 2000)
           
            return;
        }
        else {
            setTimeout(function () {
                document.getElementById('fileUploadMessage').innerHTML = "convert complate";
                document.getElementById('loadFileXml').style.display = "block";
            }, 2000)
           
        }

    
        var k = { id: 0, inRoomID: data.fileID, ext: data.ext, name: data.fileName, pageCount: data.pdfPageCount, width: data.width, height: data.height, d: null };
       // console.log("fifle file fffffffffffffffff");
       // console.log(k);
        bboard.addFileToDic(k);
        fileService.renderFileToHtmlElement(board.meetID, data.fileID, data.fileName, data.ext);
    },
    renderFileToHtmlElement: function (meetID, fileID, fileName, ext) {
        //var obj = document.getElementById('filePanel');
        //var s = "";
        //var selectSpan = '<span class="fileItem" onclick="fileService.activeFileServer(' + fileID + ',0)" style="padding: 0px 7px;color: green;cursor: pointer;">select</span>';

        var dl =  "/files/board/" + meetID + "/pdf/" + fileID + ext;
       // s += '<div>' + fileID + ' -   file ' + fileID + selectSpan + '    <a style="padding:0px 7px;"  href="' + dl + '" target="_blank"> download </a><a onclick="fileService.activeFileServer(' + fileID + ',0)" >' + fileName + '</a></div>';
       // obj.innerHTML += s;

        selectSpan = '<a class="fileItem" href="#" onclick="fileService.activeFileServer(' + fileID + ',0)"  ><i class="fa fa-edit"  ></i> </a>';
        var table = document.getElementById('PdfFiletable');

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var r = '<span>' + fileID + '</span>';
        cell1.innerHTML = r;

        cell1 = row.insertCell(1);
        // r = '<span>select</span>';
        cell1.innerHTML = selectSpan;

        cell1 = row.insertCell(2);
        r = '<span>' + fileName + '</span>';
        cell1.innerHTML = r;

        cell1 = row.insertCell(3);
        r = '<a href="' + dl + '"  target="_blank"><i class="fas fa-download"></i></a>';
        cell1.innerHTML = r;


    },
    activeFile: function (id) {
        //  var id = data.fileID;

        if (id == 0) {
            defultSlide();

            return;
        }
        for (var i = 0; i < fileService.fileList.length; i++) {
            var r = fileService.fileList[i];
            if (r.d.fileID == id) {
                fileService.FileToBoard(r.d);
                return;
            }
        }
    },
    FileToBoard: function (data) {

        console.log("file : " + data.pdfPageCount + " : " + data.pdfOrder + " w is " + data.width + " h is : " + data.height);
        prepareBoard(data.width, data.height);
        // board.meetID = data.meetID;
        newPdf(data.pdfPageCount, data.pdfOrder);

    },
    activeFileServer: function (fileID, pageID) {
       // panelControler.disconectScreenShare();
        boardClick();
       // console.log(fileID);
        var p = { type: 'board', action: 'fileSelect', p: 0, f: fileID, m: '', };
       // var m = { "type": "board", "board": "draw", "d": { "t": "pageSelect", "drawId": 1, "at": "", "num": pageID, "fileID": fileID, "del": 0, "type": "board", "board": "draw" } }
        mainApp.sendToServer(p);
    },

    setImageParse: function (data) {
        var action = data.action;
        switch (action) {
            case "set":
                fileService.setImage(data);
                break;
            case "clearImage":
                fileService.clearImage(data);
                break;
        }

    },
    setImage: function (data) {

        console.warn("setImage");
        var p = "/files/board/" + board.meetID + "/img/" + data.fileID + "/" + data.imgId + ".jpg";
        console.log(p);
        document.getElementById('whiteboardBG').style.backgroundImage = "url(" + p + ")";
        console.log(data);
    },
    clearImage: function (data) {
        console.warn("clearImage");
        document.getElementById("whiteboardBG").style.backgroundImage = "none";
        console.log(data);
    },
    clearImageRequstToServer: function () {
        var m = { "type": "board", "board": "draw", "d": { "t": "setImage", "action": "clearImage", "num": bboard.pageID, "fileID": bboard.fileID, "type": "board", "board": "draw" } }
        console.log(m);
        mainApp.sendToServer(m);
    },
};
function uploadFiles(inputId) {


    var input = document.getElementById(inputId);
    var files = input.files;
    if (files.length < 1) return;
    var formData = new FormData();
    formData.append("files", files[0]);
    //for (var i = 0; i != files.length; i++) {
    //    formData.append("files", files[i]);
    //}
    formData.append("from", mainApp.meetInfo.userName);
    formData.append("meetID", mainApp.meetInfo.meetID);

    console.log(formData);
    $.ajax(
        {
            url:  "/fileUp/uploadFile",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                var resData = JSON.parse(data);
                console.log(resData);
                document.getElementById('fileUploadMessage').innerHTML = "upload complate";
                setTimeout(function () {
                    document.getElementById('fileUploadMessage').innerHTML = "";
                }, 5000)
                //   document.getElementById("dldl").href = resData.data;

            }
        }
    );
    document.getElementById('fileUploadMessage').innerHTML = "file upload start .......";
}
function uploadimgs(inputId) {


    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }
    formData.append("from", mainApp.meetInfo.userName);
    formData.append("fileID", bboard.fileID);
    formData.append("meetID", mainApp.meetInfo.meetID);
    formData.append("pageID", bboard.pageID);

    console.log(formData);
    $.ajax(
        {
            url: "/fileUp/uploadImg",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                var resData = JSON.parse(data);
                console.log(resData);
                //   document.getElementById("dldl").href = resData.data;

            }
        }
    );
}