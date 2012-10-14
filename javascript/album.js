YUI().use("_upload_form", "_save_form", "overlay",
          "module-manager", "node-base", "event-delegate", "panel", function (Y) {

    var _socket = io.connect("http://node.josephj.com"),
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
        _socket.emit("upload-complete", {photo_id: data.photo_id});
    });


    var panel = new Y.Panel({
        render: true,
        visible: false,
        centered: true,
        width: 800,
        height: 600,
        zIndex: 2
    });

    Y.delegate("click", function (e) {
        e.preventDefault();
        var link = e.currentTarget.getAttribute("href");
        panel.set("headerContent", e.currentTarget.ancestor("li").one(".title").getHTML())
        panel.set("bodyContent", "<div style='text-align:center'><img src='" + link.replace("_m.jpg", ".jpg") + "'></div>");
        panel.show();
    }, "#list", ".photo-link");

    _socket.on("show-notification", function (data) {
        _overlay.show();
        Y.later(10000, null, function () {
            _overlay.hide();
        });
    });
});
