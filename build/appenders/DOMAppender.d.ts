import BaseAppender from "./BaseAppender";
import { IAppender } from "../IAppender";
import { LogEntry } from "../LogEntry";
export default class DOMAppender extends BaseAppender implements IAppender {
    private escape_html;
    private buffer_size;
    constructor(id: string, escape_html?: boolean, buffer_size?: number);
    append(entry: LogEntry): void;
    clear(): void;
    private buffer;
    private el;
}
