
import {IAppender} from "./IAppender";
import {LogLevel} from "./LogLevel";
export default class LoggerConfig {
    constructor(appender?: IAppender, private level: LogLevel = LogLevel.INFO) {
        if (appender) {
            this.addAppender(appender);
        }
    }
    public addAppender(appender: IAppender) {
        this.appenders.push(appender);
    }

    public setLevel(level: LogLevel) {
        this.level = level;
    }

    public getAppenders() {
        return this.appenders;
    }

    public getLevel() {
        return this.level;
    }

    private appenders: IAppender[] = [];
}
