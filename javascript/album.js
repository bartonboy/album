YUI({
    debug: true,
    errorFn: function () {
    }
}).use(
    "_list",
    "_photo",
    "_action",
    "overlay",
    "module-manager",
    "node-base",
    "event-delegate",
    "panel",
    function (Y) {

        var _socket, // = io.connect("http://socket.f2eclass.com"),
            _manager = new Y.ModuleManager(),
            _overlay = new Y.Panel({
                headerContent:"新訊息通知",
                bodyContent:"有人剛上傳了一張照片！",
                centered: true,
                visible: false,
                width: "300px",
                height: "80px",
                render: true
            });

        _manager.startAll();
        _manager.listen("upload-complete", function (name, id, data) {
            // Send to server.
            // _socket.emit("upload-complete", {photo_id: data.photo_id});
        });


        Y.delegate("click", function (e) {
            e.preventDefault();
        }, "#list", ".photo-link");

        /*_socket.on("show-notification", function (data) {
            _overlay.show();
            Y.later(10000, null, function () {
                _overlay.hide();
            });
        });*/
    }
);
