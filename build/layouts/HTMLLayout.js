"use strict";
var LogLevel_1 = require("../LogLevel");
(function (HTMLLayoutColorTheme) {
    HTMLLayoutColorTheme[HTMLLayoutColorTheme["LIGHT"] = 0] = "LIGHT";
    HTMLLayoutColorTheme[HTMLLayoutColorTheme["DARK"] = 1] = "DARK";
    HTMLLayoutColorTheme[HTMLLayoutColorTheme["SOLARIZED"] = 2] = "SOLARIZED";
})(exports.HTMLLayoutColorTheme || (exports.HTMLLayoutColorTheme = {}));
var HTMLLayoutColorTheme = exports.HTMLLayoutColorTheme;
var HTMLLayout = (function () {
    function HTMLLayout(colors_theme) {
        if (colors_theme === HTMLLayoutColorTheme.LIGHT) {
            this.colors = {
                time: 'black',
                level: 'dark red',
                tag: 'dark green',
                message: 'black'
            };
        }
        else if (colors_theme === HTMLLayoutColorTheme.DARK) {
            this.colors = {
                time: 'white',
                level: 'red',
                tag: 'green',
                message: 'white'
            };
        }
        else if (colors_theme === HTMLLayoutColorTheme.SOLARIZED) {
            this.colors = {
                time: '#839496',
                level: '#dc322f',
                tag: '#859900',
                message: '#839496'
            };
        }
        else {
            this.colors = colors_theme;
        }
    }
    HTMLLayout.prototype.format = function (entry) {
        return '<span' + this.getTimeStyle() + '>' + this.formatDate(entry.time) + '</span> ' +
            '<span' + this.getLevelStyle() + '>' + LogLevel_1.LogLevel[entry.level] + '</span> ' +
            '<span' + this.getTagStyle() + '>[' + entry.tag + ']</span> ' +
            '<span' + this.getMessageStyle() + '>' + entry.message + '</span>';
    };
    HTMLLayout.prototype.getTimeStyle = function () {
        if (!this.colors) {
            return '';
        }
        return this.getStyle(this.colors.time);
    };
    HTMLLayout.prototype.getLevelStyle = function () {
        if (!this.colors) {
            return '';
        }
        return this.getStyle(this.colors.level);
    };
    HTMLLayout.prototype.getTagStyle = function () {
        if (!this.colors) {
            return '';
        }
        return this.getStyle(this.colors.tag);
    };
    HTMLLayout.prototype.getMessageStyle = function () {
        if (!this.colors) {
            return '';
        }
        return this.getStyle(this.colors.message);
    };
    HTMLLayout.prototype.getStyle = function (color) {
        return ' style="color: ' + color + '"';
    };
    HTMLLayout.prototype.formatDate = function (date) {
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
    return HTMLLayout;
}());
exports.__esModule = true;
exports["default"] = HTMLLayout;
