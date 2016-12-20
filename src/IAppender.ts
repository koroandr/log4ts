import {ILayout, IDataFormatFunction} from "./ILayout";
import {LogEntry} from "./LogEntry";
import {ILayoutFunction} from "./ILayout";

export interface IAppender {
    setLayout(layout: ILayout);
    setLayoutFunction(layout: ILayoutFunction, format_data: IDataFormatFunction);
    append(entry: LogEntry);
    clear();
}
