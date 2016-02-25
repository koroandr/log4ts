import { ILayout } from "./ILayout";
import { LogEntry } from "./LogEntry";
import { ILayoutFunction } from "./ILayout";
export interface IAppender {
    setLayout(layout: ILayout): any;
    setLayoutFunction(layout: ILayoutFunction): any;
    append(entry: LogEntry): any;
    clear(): any;
}
