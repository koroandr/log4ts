"use strict";
var LogLevel_1 = require("./LogLevel");
var Logger = (function () {
    function Logger(tag) {
        this.tag = tag;
    }
    Logger.prototype.log = function (message) {
        this.doLog(LogLevel_1.LogLevel.INFO, message);
    };
    Logger.prototype.info = function (message) {
        this.doLog(LogLevel_1.LogLevel.INFO, message);
    };
    Logger.prototype.fatal = function (message) {
        this.doLog(LogLevel_1.LogLevel.FATAL, message);
    };
    Logger.prototype.error = function (message) {
        this.doLog(LogLevel_1.LogLevel.ERROR, message);
    };
    Logger.prototype.debug = function (message) {
        this.doLog(LogLevel_1.LogLevel.DEBUG, message);
    };
    Logger.prototype.warn = function (message) {
        this.doLog(LogLevel_1.LogLevel.WARN, message);
    };
    Logger.prototype.trace = function (message) {
        this.doLog(LogLevel_1.LogLevel.TRACE, message);
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
    Logger.prototype.doLog = function (level, message) {
        if (level >= Logger.config.getLevel()) {
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
    return Logger;
}());
exports.__esModule = true;
exports["default"] = Logger;
