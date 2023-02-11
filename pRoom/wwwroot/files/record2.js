
var i = 0;
var secret;
getSecret();
function interval() {
    //console.log("start interval : " + i++);
    getMessage();
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
    var reqID = data.req.id;
    window.open("/record/rec2/" + reqID, '_blank');

}

function getSecret() {
    var url_string = window.location.href
    var url = new URL(url_string);
    secret = url.searchParams.get("secret");
    console.log(secret);
    setInterval(function () { interval(); }, 3000);
}