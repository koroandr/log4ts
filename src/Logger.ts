import LoggerConfig from "./LoggerConfig";
import {LogLevel} from "./LogLevel";

export default class Logger {
    constructor(private tag?: string) {

    }
    public log(message: string, object?: any, deep?: number) {
        this.doLog(this.getStack(), LogLevel.INFO, message, object, deep);
    }
    public info(message: string, object?: any, deep?: number) {
        this.doLog(this.getStack(), LogLevel.INFO, message, object, deep);
    }
    public fatal(message: string, object?: any, deep?: number) {
        this.doLog(this.getStack(), LogLevel.FATAL, message, object, deep);
    }
    public error(message: string, object?: any, deep?: number) {
        this.doLog(this.getStack(), LogLevel.ERROR, message, object, deep);
    }
    public debug(message: string, object?: any, deep?: number) {
        this.doLog(this.getStack(), LogLevel.DEBUG, message, object, deep);
    }
    public warn(message: string, object?: any, deep?: number) {
        this.doLog(this.getStack(), LogLevel.WARN, message, object, deep);
    }
    public trace(message: string, object?: any, deep?: number) {
        this.doLog(this.getStack(), LogLevel.TRACE, message, object, deep);
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

    private getStack() {
        if(Logger.config.captureStack()) {
            var err = new Error();
            return err["stack"] || err["stacktrace"];
        }


        return null;
    }

    private doLog(stack: any, level: LogLevel, message: string, object?: any, deep?: number) {
        if (level >= Logger.config.getLevel() && Logger.config.hasTag(this.tag)) {
            for (var i in Logger.config.getAppenders()) {
                var appender = Logger.config.getAppenders()[i];
                appender.append({
                    message: message,
                    object: object,
                    deep: deep || 1,
                    time: new Date(),
                    tag: this.tag,
                    level: level,
                    stack: stack
                });
            }
        }
    }

    private static config: LoggerConfig = new LoggerConfig();
}
