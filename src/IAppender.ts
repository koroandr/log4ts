import {ILayout} from "./ILayout";
import {LogEntry} from "./LogEntry";
import {ILayoutFunction} from "./ILayout";
export interface IAppender {
    setLayout(layout: ILayout);
    setLayoutFunction(layout: ILayoutFunction);
    append(entry: LogEntry);
    clear();
}
