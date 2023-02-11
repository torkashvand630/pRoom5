

var quiz = {
    currentValue: 0,
    resultArray: null,
    quizData: null,
    isLoad: 0,
    quizStr: null,
    start: function () {
        //if (board.isRecorder) return;
       
        if (!quiz.isLoad) quiz.loadScript();



        console.log("quiz start ");
        if (board.publish)
            $('#quizModal').modal('show');
        else $('#quizviewModal').modal('show');
        document.getElementById('quizMessage').innerText = '';
        document.getElementById('quizViewMessage').innerText = '';
    },
    Preparation: function (quizModel) {
        
       // console.log(quizModel);
        if (quizModel != null) {
          //  document.getElementById('quizIconPanel').style.display = "block";
            $(".quizIconPanel").css("display", "block");
            quiz.quizCreate(quizModel.m.d, false);
        }
        else {
            if (board.publish) $(".quizIconPanel").css("display", "block"); //document.getElementById('quizIconPanel').style.display = "block";
        }
    },
    save: function () {
        document.getElementById('quizMessage').innerText = "";
        var quizText = document.getElementById('quizText').value;
        console.log(quizText);
        if (quizText == null || quizText.trim() == '') {
            document.getElementById('quizMessage').innerText = board.translate.quiz_front_textEmpty;
            return;
        }
       
        var quizoption1 = document.getElementById('quizoption1').value;
        var quizoption2 = document.getElementById('quizoption2').value;
        var quizoption3 = document.getElementById('quizoption3').value;
        var quizoption4 = document.getElementById('quizoption4').value;
        if (quizoption1.trim() == '' || quizoption2.trim() == '') {
            document.getElementById('quizMessage').innerText = board.translate.quiz_front_optionEmpty;
            return;
        }
        var qdata = { quizText: quizText, quizoption1: quizoption1, quizoption2: quizoption2, quizoption3: quizoption3, quizoption4: quizoption4, };

        var m = { type: 'quiz', action: 'quizCreate', qdata: qdata };
        quiz.quizData = m;
        console.log(m);
        document.getElementById('quizFormSavaButton').value = board.translate.edit;
        var res = mainApp.sendToServer(m);
         
        //if (res) 
        document.getElementById('quizMessage').innerText = board.translate.quiz_front_SendCompleted;
        setTimeout(() => {
            document.getElementById('quizMessage').innerText="";
        }, 2000);
        //else document.getElementById('quizMessage').innerText = board.translate.quiz_front_sendError;


    },
    sendAnswer: function () {
        console.log('sendAnswer');
        var m = { type: 'quiz', action: 'answer', answer: quiz.currentValue };
        var res = mainApp.sendToServer(m);
       // if (res) {
            document.getElementById('quizViewMessage').innerText = board.translate.quiz_front_answerSend;

            setTimeout(() => {
                document.getElementById('quizViewMessage').innerText = "";
                $('#quizviewModal').modal('hide');
            }, 2000);
       // }
    
       // else document.getElementById('quizMessage').innerText = board.translate.quiz_front_sendError;
         
       
        //if (document.getElementById('quizoption').checked) {
           
        //    var selected = document.getElementById("quizoption").value
        //    document.getElementById('quizViewMessage').innerText = selected;
        //}
        //else {
        //    document.getElementById('quizViewMessage').innerText = 'یکی از گزینه ها را انتخاب کنید';
        //}
    },
    quizOptionHandleClick: function (myRadio) {
        quiz.currentValue = parseInt( myRadio.value);
        document.getElementById('quizViewsendAnswer').style.display = "inline-block";
        console.log(quiz.currentValue);
    },
    parse: function (data) {
        //if (board.isRecorder) return;
        console.warn(data);
        var action = data.action;
        switch (data.action) {
            case "quizCreate":
                quiz.quizCreate(data, true);
                break;
            case "result":
                quiz.result(data);
                break;
            case "showResultForAll":
                quiz.showResult(data);
                break;
            case "resultdetails":
                quiz.Resultdetails(data);
                break;
        }
    },
    quizCreate: function (data, showmodal) {
     
        if (!quiz.isLoad) quiz.loadScript();
       
       // document.getElementById('quizIconPanel').style.display = "block";
        $(".quizIconPanel").css("display", "block");
        quiz.quizData = data;
        var q = data.qdata;
        var quizText = q.quizText;
        document.getElementById('quizviewText').innerText = quizText;
        var quizoption1 = q.quizoption1;
        var quizoption2 = q.quizoption2;
        var quizoption3 = q.quizoption3;
        var quizoption4 = q.quizoption4;
        
        var s = " <div> " + quizText + " </div>";
        s += " <div> " + board.translate.option + " 1 : " + quizoption1 + " </div>";
        s += " <div> " + board.translate.option + " 2 :  " + quizoption2 + " </div>";


        document.getElementById('quizoptionlable1').innerText = quizoption1;
        document.getElementById('quizoptionlable2').innerText = quizoption2;
        document.getElementById('quizoptionlable3').innerText = quizoption3;
        document.getElementById('quizoptionlable4').innerText = quizoption4;

        if (quizoption3.trim() == '') {
            document.getElementById('quizoptioninput3').style.display = "none";
            document.getElementById('quizoptionlable3').style.display = "none";
        }
        else {
            document.getElementById('quizoptioninput3').style.display = "inline-block";
            document.getElementById('quizoptionlable3').style.display = "inline-block";
            s += " <div> " + board.translate.option + " 3 :  " + quizoption3 + " </div>";
        }

        if (quizoption4.trim() == '') {
            document.getElementById('quizoptioninput4').style.display = "none";
            document.getElementById('quizoptionlable4').style.display = "none";
        }
        else {
            document.getElementById('quizoptioninput4').style.display = "inline-block";
            document.getElementById('quizoptionlable4').style.display = "inline-block";
            s += " <div>  " + board.translate.option + " 4 : " + quizoption4 + " </div>";
        }
        document.getElementById('quizviewTextResult').innerHTML = s;
        if (board.isRecorder) return;
        if (showmodal) $('#quizviewModal').modal('show');
        if (board.publish) quiz.quizFormCreate(data);
    },
    quizFormCreate: function (data) {
        quiz.quizData = data;
        var q = data.qdata;
        var quizText = q.quizText;
        document.getElementById('quizText').innerText = quizText;
        var quizoption1 = q.quizoption1;
        var quizoption2 = q.quizoption2;
        var quizoption3 = q.quizoption3;
        var quizoption4 = q.quizoption4;

        document.getElementById('quizoption1').value = quizoption1;
        document.getElementById('quizoption2').value = quizoption2;
        document.getElementById('quizoption3').value = quizoption3;
        document.getElementById('quizoption4').value = quizoption4;
        document.getElementById('quizFormSavaButton').innerText =   board.translate.edit  ;
       
       
    },
    result: function (data) {
        if (!quiz.isLoad) quiz.loadScript();
        console.log(data);
        var rlist = data.rlist;
        quiz.resultArray = rlist;
        console.log(rlist);
        if (board.publish) {
            quiz.updateResult();
            document.getElementById('showResultForAllPanel').style.display = "block";
        }
           
    },
    showResult: function (data) {
      
        $('#quizResultModal').modal('show');
        var rlist = data.rlist;
        quiz.resultArray = rlist;
        var s = " <div> " +  board.translate.quiz_front_showResultTitle+" </div>";
        
        var labels = [];
        var series = [];
        for (var i = 0; i < rlist.length; i++) {
            var r = rlist[i];
            var value = r[0].Value;
            var count = r.length;
            labels[i] =   board.translate.option   +" "+ value;
            series[i] = count;
            s += " <div>";
            s += board.translate.option + " " + value + " : " + count + " " + board.translate.Person;
            s += " <div>";
            //document.getElementById('quizoptionResult' + value).innerText = count;
        } 
        document.getElementById('quizResult').innerHTML = s;
        document.getElementById('quizviewResult').innerHTML = s;
        quiz.drawChart(labels, series);
        if (board.isRecorder) {
            setTimeout(() => {
                $('#quizResultModal').modal('hide');
            },15000);
        }
        //google.charts.load('current', { 'packages': ['corechart'] });
        //google.charts.setOnLoadCallback(quiz.drawChart);
       // quiz.drawChart();
    },
    GetResultdetails: function () {
        var m = { type: 'quiz', action: 'resultdetails' };
        var res = mainApp.sendToServer(m);
    },
    Resultdetails: function (data) {
        quiz.updateResult();
        var dlist = data.dlist;
        var s = " <div> " + board.translate.quiz_front_ResultdetailsTitle +" </div>";
        for (var i = 0; i < dlist.length; i++) {
            var r = dlist[i];
           
            s += " <div>";
            s += r;
            s += " <div>";
            //document.getElementById('quizoptionResult' + value).innerText = count;
        }
        document.getElementById('quizResult').innerHTML += s;
    },
    updateResult: function () {
       // $('#quizResultModal').modal('toggle');
        var rlist = quiz.resultArray;
        var s = " <div>" + board.translate.quiz_front_showResultTitle +"  </div>";
        for (var i = 0; i < rlist.length; i++) {
            var r = rlist[i];
            var value = r[0].Value;
            var count = r.length;
            s += " <div>";
            s += board.translate.option + " " + value + " : " + count +" "+ board.translate.Person ;
            s += " <div>";
            //document.getElementById('quizoptionResult' + value).innerText = count;
        }
        document.getElementById('quizResult').innerHTML = s;
        //document.getElementById('quizviewResult').innerHTML = s;
    },
    showResultForAll: function (data) {
        var m = { type: 'quiz', action: 'showResultForAll' };
        var res = mainApp.sendToServer(m);
        //if (res) 
        document.getElementById('quizMessage').innerText = board.translate.quiz_front_publishComplate;
        //else document.getElementById('quizMessage').innerText = board.translate.quiz_front_sendError;

         


    },
    loadScript: function () {
        console.log("scrip load start ........");
        var script = document.createElement('script');
        script.onload = function () {
            quiz.isLoad = 1;
            console.log("script is load .........");
        };
        script.src = "/js/chartist.min.js";

        document.head.appendChild(script); //or something of the likes
        var cssUrl = "/css/chartist.min.css";
        document.getElementsByTagName("head")[0].insertAdjacentHTML(
            "beforeend",
            "<link rel=\"stylesheet\" href='" + cssUrl + "' />");
    },
    
    drawChart: function (a,b) {
        new Chartist.Bar('.ct-chart', {
            labels: a,// ['گزینه 1', '2', '3', '4'],
            series: b,//[a, b, c, d]
        }, {
            distributeSeries: true
        });
        
    },
}