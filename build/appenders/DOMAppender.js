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
    function DOMAppender(id, escape_html, buffer_size) {
        if (escape_html === void 0) { escape_html = false; }
        if (buffer_size === void 0) { buffer_size = 0; }
        _super.call(this);
        this.escape_html = escape_html;
        this.buffer_size = buffer_size;
        this.buffer = [];
        this.el = document.getElementById(id);
    }
    DOMAppender.prototype.append = function (entry) {
        if (!this.el)
            return;
        var log = this.layout.format(entry);
        this.buffer.push((this.escape_html ? utils.escapeHtml(log) : log));
        if (this.buffer_size && this.buffer.length > this.buffer_size) {
            this.buffer.shift();
        }
        this.el.innerHTML = this.buffer.join('<br/>');
    };
    DOMAppender.prototype.clear = function () {
        this.el.innerHTML = '';
        this.buffer = [];
    };
    return DOMAppender;
}(BaseAppender_1["default"]));
exports.__esModule = true;
exports["default"] = DOMAppender;
