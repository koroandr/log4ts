import {IAppender} from "./IAppender";
import LoggerConfig from "./LoggerConfig";
import {LogLevel} from "./LogLevel";
import {stringify} from "./Utils";

export default class Logger {
    constructor(private tag?: string) {

    }
    public log(message: string, object?: any, deep?: number) {
        this.doLog(LogLevel.INFO, message, object, deep);
    }
    public info(message: string, object?: any, deep?: number) {
        this.doLog(LogLevel.INFO, message, object, deep);
    }
    public fatal(message: string, object?: any, deep?: number) {
        this.doLog(LogLevel.FATAL, message, object, deep);
    }
    public error(message: string, object?: any, deep?: number) {
        this.doLog(LogLevel.ERROR, message, object, deep);
    }
    public debug(message: string, object?: any, deep?: number) {
        this.doLog(LogLevel.DEBUG, message, object, deep);
    }
    public warn(message: string, object?: any, deep?: number) {
        this.doLog(LogLevel.WARN, message, object, deep);
    }
    public trace(message: string, object?: any, deep?: number) {
        this.doLog(LogLevel.TRACE, message, object, deep);
    }

    public static setConfig(config: LoggerConfig) {
        Logger.config = config;
    }

    public static getLogger(tag?: string) {
        if (!tag) {
            return Logger.getLogger('undefined');
        }
        if (Logger.loggers[tag]) {
            return Logger.loggers[tag];
        } else {
            return Logger.loggers[tag] = new Logger(tag);
        }
    }

    private static loggers: {[tag: string]: Logger} = {};

    private doLog(level: LogLevel, message: string, object?: any, deep?: number) {
        if (typeof object !== "undefined") {
            message += ' ' + stringify(object, deep || 1);
        }
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
    }

    private static config: LoggerConfig;
}
