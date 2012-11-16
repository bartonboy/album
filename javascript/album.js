/*global window, YUI */
// 此 JavaScript 負責初始化 (指定本頁所需 Module)
// 以及串起 Socket.IO 及其他模組間的訊息傳遞。
YUI().use("_list", "_photo", "_action", "overlay", "module-manager", "node-base", "substitute", function (Y) {

        var _socket,      // Socket.IO 連線。
            _lastPhotoId, // 最新上傳的 Flickr 照片 ID、用來區隔是否為自己上傳。
            _manager,     // Y.ModuleManager 的 Instance、用來訂閱及發送廣播訊息。
            _overlay,     // Y.Overlay 的 Instance、用來顯示 Socket.IO 送過來的訊息。
            //===============
            // 事件處理函式
            //===============
            _handleShowNotification, // 處理 "show-notification" 訊息 (由 Socket.IO)
            _handleUploadSuccess;    // 處理 "upload-success" 訊息 (由 Module 架構)


        // 上傳照片成功 (upload-succes) 的處理事件（只有上傳者自己會觸發）
        _handleUploadSuccess = function (name, id, data) {
            Y.log("_handleUploadSuccess() 被執行", "info", "album");
            _lastPhotoId = data.id;
            // 告知 Socket.IO 照片上傳成功了，並且把照片一併送出
            _socket.emit("upload-success", data);
        };

        // 收到伺服器傳來的訊息（上傳者自己也會收到）
        _handleShowNotification = function (data) {
            Y.log("_handleShowNotification() 被執行", "info", "album");
            // 排除上傳者、以免顯示「有人上傳了一張照片」的累贅訊息。
            if (_lastPhotoId === data.id) {
                return;
            }
            _lastPhotoId = data.id;
            var src,     // 欲顯示圖片的 URL
            src = "http://farm" + data.farm + ".staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_s.jpg";
            // 對其他人顯示訊息。
            _overlay.setStdModContent(
                Y.WidgetStdMod.BODY,
                '<p style="margin-bottom: 2px;" class="clearfix"><img width="75" height="75" src="' + src + '" align="left">有人上傳了一張照片喔！</p>',
                Y.WidgetStdMod.BEFORE
            );
            if (_overlay.get("visible")) {
                _overlay.set("align", {
                    points : [
                        Y.WidgetPositionAlign.BR,
                        Y.WidgetPositionAlign.BR
                    ]
                });
            } else {
                _overlay.show();
                _manager.broadcast("receive-notification", data);
            }
        };

        // 建立 Module Manager 訂閱來自 _action 模組上傳成功的訊息
        _manager = new Y.ModuleManager();
        _manager.startAll();
        _manager.listen("upload-success", _handleUploadSuccess);

        // 建立 Socket.io ，透過 Server 傳遞訊息、讓瀏覽者知道有新的照片上傳
        _socket = io.connect(window.location.hostname + ":1388");
        _socket.on("show-notification", _handleShowNotification);

        // 建立 Overlay (新訊息通知)
        _overlay = new Y.Panel({
            headerContent : "新訊息通知",
            visible       : false,
            width         : "300px",
            render        : true,
            align         : {
                points : [
                    Y.WidgetPositionAlign.BR,
                    Y.WidgetPositionAlign.BR
                ]
            }
        });
        _overlay.on("visibleChange", function (e) {
            if (e.newVal === false) {
                _overlay.set("bodyContent", "");
            }
        });
    }
);
