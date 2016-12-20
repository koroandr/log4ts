import {LogEntry} from "./LogEntry";

export interface ILayout {
    format(entry: LogEntry, include_data: boolean): string;

    formatData(entry: LogEntry): string;
}

export interface ILayoutFunction {
    (entry: LogEntry, include_data: boolean): string;
}

export interface IDataFormatFunction {
    (entry: LogEntry): string;
}
