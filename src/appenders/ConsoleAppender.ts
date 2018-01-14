import {IAppender} from "../IAppender";
import {ILayout} from "../ILayout";
import {LogEntry} from "../LogEntry";
import BaseAppender from "./BaseAppender";

export default class ConsoleAppender extends BaseAppender implements IAppender {
    constructor(private console?: Console) {
        super();
    }

    append(entry:LogEntry) {
        this.getConsole().log(this.layout.format(entry));
    }

    clear() {
        this.getConsole().clear();
    }

    private getConsole(): Console {
        return this.console || console;
    }
}
