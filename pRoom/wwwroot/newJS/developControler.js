
var developControler = {
    isActive: 0,
    isLoad: 0,
    ifram: document.getElementById('developFrame'),
    Interval: null,
    lastFile: 'html',


    onClick: function () {
        //if (screenControler.screenShareRemoteStatus || screenControler.screenShareStatus) {
        //    boardClick();
        //    return;
        //}
        if (developControler.isActive == 1)
            developControler.end();
        else {
            var m = { type: 'panelControler', action: 'Develop' };
            var res = mainApp.sendToServer(m);
        }
        // diagramControler.start();
    },
    start: function () {

        // allowMessage = 0;
        //setTimeout(() => {
        //    allowMessage = 1;
        //},10000)
        panelControler.activeDevelop();
        if (developControler.isActive) return;
        developControler.isActive = 1;
        if (layout.id == 1 && layout.sessionPanelPosetion == 3 ) {

            baseLayout.parse('11');
        }
        //return;
        if (!developControler.isLoad) {
            load_script_promise("/monaco/dist/monaco.bundle.js?v=1.01")
                .then(function (script) {
                    developControler.isLoad = 1;
                    window.loadComplate('meet_' + board.meetID);
                    //developControler.selectLanguageFile(developControler.lastFile);
                  
                    developControler.setConsole();
                  
                    developControler.selectLanguageFile();
                   // $('#nav-home-tab').tab('show');
                });
        }
        developControler.Interval = setInterval(developControler.frameRefresh, 3000);
    },
    end: function () {
        clearInterval(developControler.Interval);
        developControler.isActive = 0;
    },
    fileClick: function (lang) {
       // console.log(window.example);
       // console.log(window.example.ydoc.getText('monaco').toString());
        var m = { type: 'Develop', action: 'selectLanguage', lang: lang };
        var res = mainApp.sendToServer(m);
       
        // kkpppp(type);
    },
    parse: function (data) {
        var action = data.action;
        switch (action) {
            case "selectLanguage":
                developControler.selectLanguage(data);
                break;
        }
    },
    selectLanguage: function (data) {
        var lang = data.lang;
        developControler.lastFile = lang;
        developControler.selectLanguageFile();
    },
    selectLanguageFile: function () {
        document.getElementById('monaco-editor-tab-html').classList.remove("active");
        document.getElementById('monaco-editor-tab-java').classList.remove("active");
        document.getElementById('monaco-editor-tab-css').classList.remove("active");
        document.getElementById('nav-tab-html').classList.remove("active");
        document.getElementById('nav-tab-java').classList.remove("active");
        document.getElementById('nav-tab-css').classList.remove("active");

        document.getElementById('monaco-editor-tab-' + developControler.lastFile).classList.add("show");
        document.getElementById('monaco-editor-tab-' + developControler.lastFile).classList.add("active");
        document.getElementById('nav-tab-' + developControler.lastFile).classList.add("active");
       // document.getElementById('nav-tab-' + developControler.lastFile).click();
        return;
        //var theme = 'vs';
        //if (lang == 'javascript') theme = 'vs-dark';

        ////  if (lang == 'css') theme = 'hc-black'; 
        //selectLanguage(lang, theme);
    },


    frameRefresh: function () {

       // console.log('interval');
        document.getElementById("developFrameConsole").innerHTML = "";
        try {
            //var html = window.example.ydoc.getText('html').toString(); 
            var html =  window.example.htmlEditor.getValue(); 
           // var java = '<script>' + window.example.ydoc.getText('java').toString() + '</script>';
            var java = '<script>' + window.example.javaEditor.getValue() + '</script>';
            //console.warn(java);
           // var css = '<style>' + window.example.ydoc.getText('css').toString() + '</style>';
            var css = '<style>' + window.example.cssEditor.getValue() + '</style>';
            var h = css + html + java;
            // developControler.ifram.src = "data:text/html;charset=utf-8," + escape(css + html + java);
           // var s = "<html><head></head><body><div>Test_Div</div></body></html>";
            // $("#developFrame").contents().find('html').html(css + html + java);
            developControler.replaceIframeContent(  h);

        } catch (err) { console.log(err) }

    }, 
    setConsole: function () {
        var developIframeWindow = developControler.ifram.contentWindow;
        developIframeWindow.console.log = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
        
        developIframeWindow.console.warn = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
        developIframeWindow.console.error = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.style.color = "red";
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };

        developIframeWindow.console.trace = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.style.color = "red";
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
        developIframeWindow.console.info = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            span.style.color = "green";
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
        developControler.ifram.onerror = function (val) {
            var divId = document.getElementById("developFrameConsole");
            var span = document.createElement("div");
            //span.style.color = "red";
            span.appendChild(document.createTextNode(val));
            divId.appendChild(span);
        };
    },
    replaceIframeContent: function ( newHTML) {
        developControler.ifram.src = "about:blank";
        developControler.ifram.contentWindow.document.open();
        developControler.ifram.contentWindow.document.write(newHTML);
        developControler.ifram.contentWindow.document.close();
    },
    editorChange: function () {
        console.log('editor change');
    }
}