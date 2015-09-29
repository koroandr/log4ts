import {IAppender} from "../IAppender";
import {ILayout} from "../ILayout";
import {LogEntry} from "../LogEntry";
import BaseAppender from "./BaseAppender";

export default class ConsoleAppender extends BaseAppender implements IAppender {
    append(entry:LogEntry) {
        console.log(this.layout.format(entry));
    }

    clear() {
        console.clear();
    }
}
