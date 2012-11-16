var app   = require("http").createServer(handler),
    io    = require("./lib/socket.io").listen(app),
    fs    = require("fs"),
    users = [];

// 在 1388 建立 WebServer
app.listen(1388);

function handler (req, res) {

    // 讀取當前目錄的 index.html
    fs.readFile(
        __dirname + "/index.html",
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end("Node.js is running...");
            }
            res.writeHead(200);
            res.end(data);
        }
    );
}

// 新建立的 Socket.io 連線
io.sockets.on("connection", function (socket) {

    // 當收到了 upload-success 這個訊息...
    socket.on("upload-success", function (data) {
        io.sockets.emit("show-notification", data);
    });

});
