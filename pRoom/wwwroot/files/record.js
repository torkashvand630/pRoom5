
var i = 0;
var b = 1;
 
var reqID = 0;
 
setInterval(function () { interval(); }, 3000);
function interval() {
    if(b)   getMessage();
}
function getMessage() {
    $.ajax({
        url: "/record/getMessage",
        type: "POST",

        data: JSON.stringify({ secret: secret }),
        dataType: "json",
       
        contentType: "application/json",
        success: function (data) {
            
            console.log(data);
            parseResult(data);
        },
        complete: function (data) {
            //console.log("aa");
          //  console.log(data);
            //console.log(data.responseText);
            //// window.open(data.responseText, '_blank');
          //  console.log(data.responseText);
          //  parseResult(data.responseText);

            //console.log("bb");
        }
    });
}
function parseResult(data) {
    console.log(data.state);
    if (data.state != "ok") {
        console.log(data.message);
       
        return;
    }
     reqID = data.req.id;
    b = 0;
    //window.open("/record/rec/" + reqID, '_blank');
    var myWindow = window.open("/record/rec/?id=" + reqID + "&userName=" + username, "_blank", "toolbar=yes,scrollbars=yes,resizable=no,top=0,left=0,width=1300,height=800");
    wList[reqID] = myWindow;
    var duration = data.req.duration + 7;
    console.warn("duratin :" + duration);
    var t = duration*60*1000;
    setTimeout(() => {
       
        closewindows(reqID);
    },t);
    console.log(wList);

}

function getSecret() {
    var url_string = window.location.href;
    var res = url_string.split("/");
    console.log(res[3]);
    return;
    var url = new URL(url_string);
    secret = url.searchParams.get("secret");
    var userNameTemp = url.searchParams.get("userName");
    if (userNameTemp != null && userNameTemp != undefined) userName = userNameTemp;
    console.log(secret);
    setInterval(function () { interval(); }, 3000);
}
var wList = [];
function closewindows(reqIDIN) {
    if (reqIDIN != reqID) return;
    b = 1;
    console.warn("requst for win close : " + reqID);
    if (wList[reqID] != null && wList[reqID] != undefined) {
        try {
            wList[reqID].close();
        } catch{
            console.warn("error in close windows : " + reqID);
        }
       
    }
}