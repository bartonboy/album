/*global window */
// 用匿名函式避免全域變數
(function () {

    var images = document.images, // 可以取得目前頁面上所有的圖片
        socket,
        largestOffset = 0,        // 最大張圖片的索引值
        largestSize = 0,          // 最大張圖片的尺寸（長*寬)
        scriptEl,                 // 動態生成的 script 節點、用來呼叫存檔的 API
        msg,                      // 要顯示給使用者的訊息
        request,                  // 要存檔的路徑
        url,                      // 最大張圖片的網址
        h1,                       // h1 標籤的物件參考
        title = "",               // 圖片標題
        size,                     // for 迴圈要用的的值
        i,
        j;

    if (!images.length) {
        alert("抱歉，本頁找不到任何 <img> 圖檔！");
        return;
    }

    // 檢查所有的圖片，把最大張（長*寬）的找出來、
    // 並將索引值存到 largesetOffset
    for (i = 0, j = images.length; i < j; i ++) {
        size = images[i].width * images[i].height;
        if (largestSize < size) {
            largestSize = size;
            largestOffset = i;
        }
    }

    // 取得最大張圖片的網址與標題
    url = images[largestOffset].getAttribute("src");
    if (document.getElementsByTagName("h1")[0]) {
        h1 = document.getElementsByTagName("h1")[0];
        if (h1) {
            title = (h1.textContent) ? h1.textContent : h1.innerText;
        }
    }

    if (!url) {
        alert("圖檔無法儲存！請嘗試別頁！");
        return false;
    }

    // 顯示訊息、讓使用者有反悔的機會
    msg = [
        "圖檔路徑為：" + url,
        "圖檔標題為：" + title,
        "",
        "您確定要存到到 F2E 的相簿中嗎？"
    ].join("\n");
    if (!window.confirm(msg)) {
        return false;
    }

    // 載入 Socket.IO 的函式庫
    scriptEl = document.createElement("script");
    scriptEl.src = "http://f2eclass.com:1388/socket.io/socket.io.js";
    document.getElementsByTagName("head")[0].appendChild(scriptEl);
    scriptEl.onload = function () {
        socket = io.connect("f2eclass.com:1388");
    };

    // 以 Script Tag Hack (JSONP 的前身) 的方式發送 Request、存檔！
    request = [
        "http://f2eclass.com/service/?method=saveURL",
        "url=" + encodeURIComponent(url),
        "title=" + encodeURIComponent(title),
        "callback=bookmarkCallback"
    ].join("&");
    scriptEl = document.createElement("script");
    scriptEl.src = request;
    document.getElementsByTagName("head")[0].appendChild(scriptEl);

    // 定義 Script Tag Hack 的回傳 Callback
    window.bookmarkCallback = function (data) {
        socket.emit("upload-success", data);
        alert("儲存完畢：http://farm" + data.farm + ".staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_s.jpg");
    };

}());
