YUI.add("_save_form", function (Y) {

    var _node,
        _formNode,
        _api,
        _saveCallback,
        _handleSubmit;

    _saveCallback = function (o) {
        _formNode.one("input[type=submit]").set("disabled", false);
        _api.broadcast("upload-complete", o);
    };

    _handleSubmit = function (e) {
        e.halt();
        _formNode = this;

        // 基本的表單驗證
        if (!_formNode.one("input[name=url]").get("value")) {
            alert("您未輸入 URL!");
            return false;
        }
        _formNode.one("input[type=submit]").set("disabled", true);
        Y.jsonp([
            "/album/service/?method=saveURL",
            "url=" + encodeURIComponent(_formNode.one("input[name=url]").get("value")),
            "title=" + encodeURIComponent(_formNode.one("input[name=title]").get("value")),
            "description=" + encodeURIComponent(_formNode.one("textarea[name=description]").get("value")),
            "tags=" + encodeURIComponent(_formNode.one("input[name=tags]").get("value")),
            "callback={callback}"
        ].join("&"), _saveCallback);
    };

    _api = new Y.Module({
        selector: "#save-form",
        init: function () {}
    });

    _api.on("viewload", function (e) {
        _node = this.get("node");
        _node.one("form").on("submit", _handleSubmit);
    });

}, null, {
    "requires": [
        "module",
        "jsonp"
    ]
});
