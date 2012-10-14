YUI().use("node-base", "event-delegate", "panel", function (Y) {

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

    var socket = io.connect("http://node.josephj.com");
    socket.on("news", function (data) {
        console.log(data);
        socket.emit("my other event", { my: "data" });
    });


});
