"use strict";
var BaseAppender = (function () {
    function BaseAppender() {
    }
    BaseAppender.prototype.setLayout = function (layout) {
        this.layout = layout;
    };
    BaseAppender.prototype.setLayoutFunction = function (layout) {
        this.layout = {
            format: layout
        };
    };
    return BaseAppender;
}());
exports.__esModule = true;
exports["default"] = BaseAppender;
