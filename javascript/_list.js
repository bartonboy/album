/**
 * 照片列表模組
 * 需要考慮換頁、圖片效能等問題
 *
 * @module _list
 */
YUI.add("_list", function (Y) {

    var _api,
        _node,
        _init,
        //================
        // 事件處理函式
        //================
        _handleUploadSuccess,
        _handlePhotoClick,
        _handleViewload;

    _handleUploadSuccess = function (name, id, data) {
        _api.log("_handleUploadSuccess() 被執行");
        var img = "http://farm" + data.farm + ".staticflickr.com/" + data.server + "/";
        img += data.id + "_" + data.secret + "_m.jpg";
        var html = [
            '<li>',
            '    <div class="photo">',
            '        <a href="' + img + '"',
            '           class="photo-link"',
            '           target="_blank"',
            '           style="background-image:url(' + img + ')"></a>',
            '    </div>',
            '</li>'
        ].join("");
        _node.one(".bd ul").insert(html, 0);
    };

    /**
     * 當使用者點選了照片的處理
     *
     * @method _handleViewload
     * @private
     * @param e {Object} The YUI event object.
     */
    _handlePhotoClick = function (e) {
        _api.log("_handlePhotoClick() 被執行 - " + this.get("href"));
        e.preventDefault();

        // 發送一個 click-photo 的廣播
        _api.broadcast("click-photo", {
            src: this.get("href").replace("_m.jpg", "_z.jpg"),
            title: this.get("title")
        });
    };

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

        // 使用 YUI ImageLoader Utility 減少圖片的 Request 數量
        new Y.ImgLoadGroup({
            className: "yui3-image-loader",
            foldDistance: 100
        });

        // 利用 <node>.delegate 處理所有照片的點選事件
        _node.delegate("click", _handlePhotoClick, ".photo-link");
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
        _api.listen("upload-success", _handleUploadSuccess);
    };

    // 新增一個模組方便做模組間的資料傳遞
    _api = new Y.Module({
        selector: "#list",
        init: _init,
        on: {
            viewload: _handleViewload
        }
    });

}, "0.0.1", {
    // 定義此模組會用到的 YUI 功能
    "requires": [
        "event-delegate",
        "node-event-delegate",
        "module",
        "imageloader"
    ]
});
