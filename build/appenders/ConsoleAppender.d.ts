import { IAppender } from "../IAppender";
import { LogEntry } from "../LogEntry";
import BaseAppender from "./BaseAppender";
export default class ConsoleAppender extends BaseAppender implements IAppender {
    append(entry: LogEntry): void;
    clear(): void;
}
