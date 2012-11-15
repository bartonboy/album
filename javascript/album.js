YUI().use(
    "_list",
    "_photo",
    "_action",
    "overlay",
    "module-manager",
    "node-base",
    "substitute",
    function (Y) {

        var _socket,
            _manager,
            _overlay,
            _handleUploadSuccess;

        _handleUploadSuccess = function (name, id, data) {
            _api.log("_handleUploadSuccess() 被執行");
            var src,
                pattern;
            pattern = "http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_m.jpg";
            src = Y.substitute(pattern, data);
            // 告知 Server 有人上傳成功了
            _socket.emit("upload-complete", {"src": src});
        };

        _overlay = new Y.Panel({
            headerContent:"新訊息通知",
            bodyContent:"有人剛上傳了一張照片！",
            centered: true,
            visible: false,
            width: "300px",
            height: "80px",
            render: true
        });

        _manager = new Y.ModuleManager();
        _manager.startAll();
        _manager.listen("upload-success", _handleUploadSuccess);
        _socket = io.connect("http://socket.f2eclass.com"),
        _socket.on("show-notification", function (data) {
            _overlay.show();
            Y.later(10000, null, function () {
                _overlay.hide();
            });
        });
    }
);
