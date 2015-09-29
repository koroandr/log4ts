import {ILayout} from "./ILayout";
import {LogEntry} from "./LogEntry";
export interface IAppender {
    setLayout(layout: ILayout);
    append(entry: LogEntry);
    clear();
}
