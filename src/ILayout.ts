import {LogEntry} from "./LogEntry";

export interface ILayout {
    format(entry: LogEntry): string;
}
