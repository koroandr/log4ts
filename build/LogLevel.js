"use strict";
(function (LogLevel) {
    LogLevel[LogLevel["ALL"] = 0] = "ALL";
    LogLevel[LogLevel["TRACE"] = 1] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["WARN"] = 4] = "WARN";
    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 6] = "FATAL";
    LogLevel[LogLevel["OFF"] = 7] = "OFF";
})(exports.LogLevel || (exports.LogLevel = {}));
var LogLevel = exports.LogLevel;
function logLevelToString(level) {
    return LogLevel[level];
}
exports.logLevelToString = logLevelToString;
