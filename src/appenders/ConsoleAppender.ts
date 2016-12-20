import {IAppender} from "../IAppender";
import {LogEntry} from "../LogEntry";
import BaseAppender from "./BaseAppender";

export default class ConsoleAppender extends BaseAppender implements IAppender {
    append(entry:LogEntry) {
        if (!console || !console.log) {
            return;
        }

        if (!this.isGroupingAvailable()) {
            this.simpleAppend(entry);
        } else {
            this.complexAppend(entry);
        }
    }

    clear() {
        console.clear();
    }

    protected simpleAppend(entry:LogEntry) {
        console.log(this.layout.format(entry, true));
    }

    protected complexAppend(entry:LogEntry) {

        this.startGroup(this.layout.format(entry, false));

        if (entry.object) {
            this.startGroup("Additional Data");

            console.log(this.layout.formatData(entry));

            console.groupEnd();
        }

        console.log(entry.stack);
        console.groupEnd();
    }

    protected startGroup(msg: any) {
        if(console.groupCollapsed) {
            console.groupCollapsed(msg);
        } else {
            console.group(msg);
        }
    }

    protected isGroupingAvailable(): boolean {
        return !!console.groupCollapsed || !!console.group
    }
}
