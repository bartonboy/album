YUI.add("_photo", function (Y) {

    var _api,
        _node,
        _panel,
        _init,
        _lastImage,
        //================
        // 事件處理函式
        //================
        _handlePhotoClick,
        _handleViewload;

    /**
     * 處理模組的 viewload 事件
     *
     * @method _handleViewload
     * @private
     * @param e {Object} The YUI event object.
     */
    _handleViewload = function (e) {
        _api.log("_handleViewload() 被執行");
        _node = this.get("node");

        _panel = new Y.Panel({
            boundingBox : _node,
            contentBox  : _node.one(".mod-content"),
            render      : true,
            modal       : true,
            visible     : false,
            centered    : true,
            width       : 800
        });

        _api.listen("click-photo", _handlePhotoClick);
    };

    /**
     * 當聽到 click-photo 廣播訊息的處理
     * 需要等到圖片讀取完畢才會顯示（不然無法得到正確的寬高、置中會有問題）
     *
     * @method _handlePhotoClick
     * @private
     * @param name {String} 訊息名稱
     * @param name {String} 來源模組 ID
     * @param name {String} 附帶的資料，有 src 及 title
     */
    _handlePhotoClick = function (name, id, data) {
        var src   = data.src,
            title = data.title,
            img   = new Image();

        _panel.set("bodyContent", "圖片讀取中...");

        // 避免物件參考過多，移除事件與節點
        if (_lastImage) {
            _lastImage.remove(true);
        }

        // 先設定標題
        _panel.set("headerContent", title);

        _panel.show();

        // 圖片讀取需要時間，等到圖片讀取完畢後再調整置中的問題
        img = new Image();
        img.src = data.src;
        img.onload = function () {
            _panel.set("bodyContent", "");
            _lastImage = _node.one(".bd").appendChild(img);
            _panel.centered();
        };
    };

    /**
     * 模組的初始化處理
     *
     * @method _init
     * @private
     */
    _init = function () {
        _api = this;
        _api.log("_init() 被執行");
    };

    // 新增一個模組方便做模組間的資料傳遞
    _api = new Y.Module({
        selector: "#photo",
        init: _init,
        on: {
            viewload: _handleViewload
        }
    });

}, "0.0.1", {
    // 定義此模組會用到的 YUI 功能
    "requires": [
        "panel"
    ]
});
