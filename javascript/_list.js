YUI.add("_list", function (Y) {

    var _api,
        _node,
        _init,
        //================
        // Event Handler
        //================
        _handleViewload;

    _handleViewload = function (e) {
        _node = this;
        new Y.ImgLoadGroup({
            className: "yui3-image-loader",
            foldDistance: 100
        });
        _node.delegate("click", function (e) {
            e.preventDefault();
            _api.log("clicked.");
        }, ".photo-link");
    };

    _init = function () {
        _api = this;
        _api.log("_init() is executed.");
    };

    _api = new Y.Module({
        selector: "#list",
        init: _init,
        on: {
            viewload: _handleViewload
        }
    });

}, "0.0.1", {
    "requires": [
        "node-event-delegate",
        "module",
        "imageloader"
    ]
});
