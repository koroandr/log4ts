"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseAppender_1 = require("./BaseAppender");
var ConsoleAppender = (function (_super) {
    __extends(ConsoleAppender, _super);
    function ConsoleAppender() {
        _super.apply(this, arguments);
    }
    ConsoleAppender.prototype.append = function (entry) {
        console.log(this.layout.format(entry));
    };
    ConsoleAppender.prototype.clear = function () {
        console.clear();
    };
    return ConsoleAppender;
}(BaseAppender_1["default"]));
exports.__esModule = true;
exports["default"] = ConsoleAppender;
