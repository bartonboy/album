YUI.add("_upload_form", function (Y) {

    var _node,
        _api,
        _handleSubmit;

    _handleSubmit = function (e) {
        e.halt();
        var form = this;

        // 基本的表單驗證
        if (!form.one("input[name=file]").get("value")) {
            alert("您未選擇任何檔案！");
            return false;
        }

        form.one("input[type=submit]").set("disabled", true);

        Y.io(form.get("action"), {
            method: "POST",
            form: {
                id: form,
                upload: true
            },
            on: {
                "complete": function (id, o) {
                    form.one("input[type=submit]").set("disabled", false);
                    _api.broadcast("upload-complete", o.responseText);
                }
            }
        });
    };

    _api = new Y.Module({
        selector: "#upload-form",
        init: function () {}
    });

    _api.on("viewload", function (e) {
        _node = this.get("node");
        _node.one("form").on("submit", _handleSubmit);
    });

}, null, {
    "requires": [
        "module",
        "event-base",
        "node-base",
        "io-upload-iframe"
    ]
});
