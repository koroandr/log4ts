"use strict";
var LogLevel_1 = require("../LogLevel");
var BasicLayout = (function () {
    function BasicLayout() {
    }
    BasicLayout.prototype.format = function (entry) {
        return this.formatDate(entry.time) + ' ' + LogLevel_1.logLevelToString(entry.level) + ' [' + entry.tag + '] - ' + entry.message;
    };
    BasicLayout.prototype.formatDate = function (date) {
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            ' ' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds());
    };
    return BasicLayout;
}());
exports.__esModule = true;
exports["default"] = BasicLayout;
