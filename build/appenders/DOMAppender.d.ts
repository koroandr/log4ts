import BaseAppender from "./BaseAppender";
import { IAppender } from "../IAppender";
import { LogEntry } from "../LogEntry";
export default class DOMAppender extends BaseAppender implements IAppender {
    private escape_html;
    constructor(id: string, escape_html?: boolean);
    append(entry: LogEntry): void;
    clear(): void;
    private el;
}
