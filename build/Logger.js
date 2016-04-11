"use strict";
var LoggerConfig_1 = require("./LoggerConfig");
var LogLevel_1 = require("./LogLevel");
var Utils_1 = require("./Utils");
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
    Logger.loggers = {};
    Logger.config = new LoggerConfig_1["default"]();
    return Logger;
}());
exports.__esModule = true;
exports["default"] = Logger;
