(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["log4ts"] = factory();
	else
		root["log4ts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ALL"] = 0] = "ALL";
    LogLevel[LogLevel["TRACE"] = 1] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["WARN"] = 4] = "WARN";
    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 6] = "FATAL";
    LogLevel[LogLevel["OFF"] = 7] = "OFF";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
function logLevelToString(level) {
    return LogLevel[level];
}
exports.logLevelToString = logLevelToString;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LogLevel_1 = __webpack_require__(0);
var BasicLayout_1 = __webpack_require__(8);
var HTMLLayout_1 = __webpack_require__(4);
var ConsoleAppender_1 = __webpack_require__(6);
var DOMAppender_1 = __webpack_require__(7);
var HTMLLayout_2 = __webpack_require__(4);
var LoggerConfig = (function () {
    function LoggerConfig(appender, level, tags) {
        if (level === void 0) { level = LogLevel_1.LogLevel.INFO; }
        this.level = level;
        this.tags = tags;
        this.appenders = [];
        if (appender) {
            this.addAppender(appender);
        }
    }
    LoggerConfig.prototype.addAppender = function (appender) {
        this.appenders.push(appender);
    };
    LoggerConfig.prototype.setLevel = function (level) {
        this.level = level;
    };
    LoggerConfig.prototype.getAppenders = function () {
        return this.appenders;
    };
    LoggerConfig.prototype.getLevel = function () {
        return this.level;
    };
    LoggerConfig.prototype.hasTag = function (tag) {
        if (!this.tags || this.tags.length === 0)
            return true;
        for (var i in this.tags) {
            var t = this.tags[i];
            if (t === tag) {
                return true;
            }
        }
        return false;
    };
    LoggerConfig.createFromJson = function (json) {
        var config = new LoggerConfig(null, LogLevel_1.LogLevel[json.level], json.tags);
        for (var _i = 0, _a = json.layouts; _i < _a.length; _i++) {
            var layout_json = _a[_i];
            var layout = void 0;
            switch (layout_json.type) {
                case "basic":
                    layout = new BasicLayout_1["default"]();
                    break;
                case "html":
                    var color_scheme = layout_json.options && layout_json.options.color_scheme;
                    var colors = void 0;
                    if (typeof color_scheme === "string") {
                        colors = HTMLLayout_2.HTMLLayoutColorTheme[color_scheme];
                    }
                    else {
                        colors = color_scheme;
                    }
                    layout = new HTMLLayout_1["default"](colors);
                    break;
            }
            for (var _b = 0, _c = layout_json.appenders; _b < _c.length; _b++) {
                var appender_json = _c[_b];
                var appender = void 0;
                switch (appender_json.type) {
                    case "console":
                        appender = new ConsoleAppender_1["default"]();
                        break;
                    case "dom":
                        var options = appender_json.options;
                        appender = new DOMAppender_1["default"](options.container_id, options.escape_html, options.buffer_size);
                        break;
                }
                appender.setLayout(layout);
                config.addAppender(appender);
            }
        }
        return config;
    };
    return LoggerConfig;
}());
exports["default"] = LoggerConfig;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};
function escapeHtml(string) {
    return string.replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}
exports.escapeHtml = escapeHtml;
function stringify(object, deep) {
    function cut(obj, deep) {
        if (deep === 0)
            return undefined;
        var result = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    var cutted = cut(obj[key], deep - 1);
                    if (typeof cutted !== undefined) {
                        result[key] = cutted;
                    }
                }
                else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }
    return JSON.stringify(cut(object, deep), null, 2);
}
exports.stringify = stringify;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
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
exports["default"] = BaseAppender;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LogLevel_1 = __webpack_require__(0);
var HTMLLayoutColorTheme;
(function (HTMLLayoutColorTheme) {
    HTMLLayoutColorTheme[HTMLLayoutColorTheme["LIGHT"] = 0] = "LIGHT";
    HTMLLayoutColorTheme[HTMLLayoutColorTheme["DARK"] = 1] = "DARK";
    HTMLLayoutColorTheme[HTMLLayoutColorTheme["SOLARIZED"] = 2] = "SOLARIZED";
})(HTMLLayoutColorTheme = exports.HTMLLayoutColorTheme || (exports.HTMLLayoutColorTheme = {}));
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
exports["default"] = HTMLLayout;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LoggerConfig_1 = __webpack_require__(1);
var LogLevel_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(2);
var Logger = (function () {
    function Logger(tag) {
        this.tag = tag;
    }
    Logger.prototype.log = function (message, object, deep) {
        this.doLog(LogLevel_1.LogLevel.INFO, message, object, deep);
    };
    Logger.prototype.info = function (message, object, deep) {
        this.doLog(LogLevel_1.LogLevel.INFO, message, object, deep);
    };
    Logger.prototype.fatal = function (message, object, deep) {
        this.doLog(LogLevel_1.LogLevel.FATAL, message, object, deep);
    };
    Logger.prototype.error = function (message, object, deep) {
        this.doLog(LogLevel_1.LogLevel.ERROR, message, object, deep);
    };
    Logger.prototype.debug = function (message, object, deep) {
        this.doLog(LogLevel_1.LogLevel.DEBUG, message, object, deep);
    };
    Logger.prototype.warn = function (message, object, deep) {
        this.doLog(LogLevel_1.LogLevel.WARN, message, object, deep);
    };
    Logger.prototype.trace = function (message, object, deep) {
        this.doLog(LogLevel_1.LogLevel.TRACE, message, object, deep);
    };
    Logger.setConfig = function (config) {
        Logger.config = config;
    };
    Logger.getLogger = function (tag) {
        if (!tag) {
            return Logger.getLogger('undefined');
        }
        if (Logger.loggers[tag]) {
            return Logger.loggers[tag];
        }
        else {
            return Logger.loggers[tag] = new Logger(tag);
        }
    };
    Logger.prototype.doLog = function (level, message, object, deep) {
        if (typeof object !== "undefined") {
            message += ' ' + Utils_1.stringify(object, deep || 1);
        }
        if (level >= Logger.config.getLevel() && Logger.config.hasTag(this.tag)) {
            for (var i in Logger.config.getAppenders()) {
                var appender = Logger.config.getAppenders()[i];
                appender.append({
                    message: message,
                    time: new Date(),
                    tag: this.tag,
                    level: level
                });
            }
        }
    };
    return Logger;
}());
Logger.loggers = {};
Logger.config = new LoggerConfig_1["default"]();
exports["default"] = Logger;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BaseAppender_1 = __webpack_require__(3);
var ConsoleAppender = (function (_super) {
    __extends(ConsoleAppender, _super);
    function ConsoleAppender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConsoleAppender.prototype.append = function (entry) {
        console.log(this.layout.format(entry));
    };
    ConsoleAppender.prototype.clear = function () {
        console.clear();
    };
    return ConsoleAppender;
}(BaseAppender_1["default"]));
exports["default"] = ConsoleAppender;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BaseAppender_1 = __webpack_require__(3);
var utils = __webpack_require__(2);
var DOMAppender = (function (_super) {
    __extends(DOMAppender, _super);
    function DOMAppender(id, escape_html, buffer_size) {
        if (escape_html === void 0) { escape_html = false; }
        if (buffer_size === void 0) { buffer_size = 0; }
        var _this = _super.call(this) || this;
        _this.escape_html = escape_html;
        _this.buffer_size = buffer_size;
        _this.buffer = [];
        _this.el = document.getElementById(id);
        return _this;
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
exports["default"] = DOMAppender;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LogLevel_1 = __webpack_require__(0);
/**
 * Simple layout, that formats logs as
 * "{time} {level} [{tag}] - {message}"
 */
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
exports["default"] = BasicLayout;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Logger_1 = __webpack_require__(5);
exports.Logger = Logger_1["default"];
var LoggerConfig_1 = __webpack_require__(1);
exports.LoggerConfig = LoggerConfig_1["default"];


/***/ })
/******/ ]);
});