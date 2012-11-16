/*global YUI, window*/
YUI.add("_action", function (Y) {

    var _api,
        _node,
        _uploader,
        _init,
        _formNode,
        _timestamp = parseInt((new Date()).getTime(), 10),
        //==============
        // 常數
        //==============
        SWF_URL    = "http://yui.yahooapis.com/3.7.3/build/uploader/assets/flashuploader.swf",
        UPLOAD_URL = "/album/service/index.php?method=upload&r=" + _timestamp,
        SAVE_URL   = "/album/service/?method=saveURL&r=" + _timestamp,
        //===============
        // 函式
        //===============
        _saveCallback,
        //===============
        // 事件處理函式
        //===============
        _handleAllUploadsComplete,
        _handleFormSubmit,
        _handleFileSelect,
        _handleTotalUploadProgress,
        _handleUploadComplete,
        _handleViewload;

    //===============
    // 函式
    //===============
    _saveCallback = function (o) {
        _api.log("_saveCallback() is executed.");
        _formNode.one("input[name=url]").set("value", "");
        _formNode.one("input[type=submit]").set("disabled", false);
        _api.broadcast("upload-success", o);
    };
    //===============
    // 事件處理函式
    //===============
    _handleFormSubmit = function (e) {
        _api.log("_handleFormSubmit() is executed.");
        e.halt();
        var node = this;

        // 基本的表單驗證
        if (!node.one("input[name=url]").get("value")) {
            window.alert("您未輸入 URL!");
            return false;
        }
        node.one("input[type=submit]").set("disabled", true);
        Y.jsonp([
            SAVE_URL,
            "url=" + encodeURIComponent(node.one("input[name=url]").get("value")),
            "callback={callback}"
        ].join("&"), _saveCallback);
    };

    _handleViewload = function () {
        _node = this.get("node");
        _formNode = _node.one("form");

        // 若沒有安裝 Flash、也不支援 HTML5 上傳, 或者是 iOS 系統：一律不使用這個 Uploader
        if (Y.Uploader.TYPE === "none" || Y.UA.ios) {
            _api.log("此瀏覽器無法使用 YUI Uploader！");
            return;
        }
        _api.log("瀏覽器所支援的 Uploader 類型為：" + Y.Uploader.TYPE);

        // 建立 Uploader
        _uploader = new Y.Uploader({
            width             : "100px",    // 按鈕的寬
            height            : "30px",     // 按鈕的高
            multipleFiles     : true,       // 是否要上傳多個檔案
            selectButtonLabel : "上傳檔案", // 顯示在按鈕上的文字
            swfURL            : SWF_URL,    // Flash 檔案所在位置（若支援 HTML5 就不會用到)
            uploadURL         : UPLOAD_URL, // 上傳的位置
            simLimit          : 2,          // 同時上傳數量
            fileFieldName     : "file",
            withCredentials   : false
        });
        // 將按鈕放入指定的 div 中
        _uploader.render(".upload");

        // 步驟 1 - 使用者選取好檔案之後、要將檔案資訊放入列表中
        _uploader.after("fileselect", _handleFileSelect);
        // 步驟 2 - 上傳中 (整體進度) : 更新整體上傳進度
        _uploader.on("totaluploadprogress", _handleTotalUploadProgress);
        // 步驟 3 - 單一檔案上傳完成 : 在列表上顯示上傳完畢
        _uploader.on("uploadcomplete", _handleUploadComplete);
        // 步驟 4 - 所有檔案皆上傳完成 : 處理按鈕文字與 Uploader 讓檔案可以再度上傳
        _uploader.on("alluploadscomplete", _handleAllUploadsComplete);

        _formNode.on("submit", _handleFormSubmit);
    };

    // Step 1 - 使用者選取好檔案即開始上傳
    _handleFileSelect = function (e) {
        _api.log("_handleFileSelect() is executed.");
        var files = e.fileList;
        if (files.length === 0) {
            return;
        }
        if (_uploader.get("fileList").length > 0) {
            _uploader.set("selectButtonLabel", "上傳中..");
            _uploader.set("enabled", false);
            Y.later(1000, null, function () {
                _uploader.uploadAll();
            });
        }
    };

    // 步驟 2 - 上傳中 (整體進度) : 更新整體上傳進度
    _handleTotalUploadProgress = function (e) {
        _uploader.set("selectButtonLabel", "上傳中 (" + e.percentLoaded + "%)");
        _api.log("_handleTotalUploadProgress() is executed.");
    };

    // 步驟 3 - 單一檔案上傳完成 : 在列表上顯示上傳完畢
    _handleUploadComplete = function (e) {
        Y.log("_handleUploadComplete() is executed.");
        _api.broadcast("upload-success", Y.JSON.parse(e.data));
    };

    // 步驟 4 - 所有檔案皆上傳完成 : 顯示訊息、處理按鈕與 Uploader 讓檔案可以再度上傳
    _handleAllUploadsComplete = function (event) {
        _api.log("_handleAllUploadsComplete() is executed.");
        _uploader.set("enabled", true);
        _uploader.set("fileList", []);
    };

    _init = function (api) {
        _api = api;
    };

    // 新增一個模組方便做模組間的資料傳遞
    _api = new Y.Module({
        selector: "#action",
        init: _init,
        on: {
            viewload: _handleViewload
        }
    });

}, "0.0.1", {
    "requires": [
        "jsonp",
        "json-parse",
        "module",
        "uploader"
    ]
});
