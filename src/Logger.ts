import {IAppender} from "./IAppender";
import LoggerConfig from "./LoggerConfig";
import {LogLevel} from "./LogLevel";
export default class Logger {
    constructor(private tag?: string) {

    }
    public log(message: string) {
        this.doLog(LogLevel.INFO, message);
    }
    public info(message: string) {
        this.doLog(LogLevel.INFO, message);
    }
    public fatal(message: string) {
        this.doLog(LogLevel.FATAL, message);
    }
    public error(message: string) {
        this.doLog(LogLevel.ERROR, message);
    }
    public debug(message: string) {
        this.doLog(LogLevel.DEBUG, message);
    }
    public warn(message: string) {
        this.doLog(LogLevel.WARN, message);
    }
    public trace(message: string) {
        this.doLog(LogLevel.TRACE, message);
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

    private doLog(level: LogLevel, message: string) {
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
