"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseAppender_1 = require("./BaseAppender");
var utils = require("../Utils");
var DOMAppender = (function (_super) {
    __extends(DOMAppender, _super);
    function DOMAppender(id, escape_html) {
        if (escape_html === void 0) { escape_html = false; }
        _super.call(this);
        this.escape_html = escape_html;
        this.el = document.getElementById(id);
    }
    DOMAppender.prototype.append = function (entry) {
        var log = this.layout.format(entry);
        this.el.innerHTML += (this.escape_html ? utils.escapeHtml(log) : log) + '<br>';
    };
    DOMAppender.prototype.clear = function () {
        this.el.innerHTML = '';
    };
    return DOMAppender;
}(BaseAppender_1["default"]));
exports.__esModule = true;
exports["default"] = DOMAppender;
