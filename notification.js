var app = require("http").createServer(handler),
    io  = require("./lib/socket.io").listen(app),
    fs  = require("fs");

app.listen(1388);

function handler (req, res) {
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

io.sockets.on("connection", function (socket) {
    socket.on("upload-complete", function (data) {
        console.log(this.id);
        console.log(this);
        socket.emit("show-notification", data);
    });
});
