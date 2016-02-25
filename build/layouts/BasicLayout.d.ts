import { ILayout } from "../ILayout";
import { LogEntry } from "../LogEntry";
export default class BasicLayout implements ILayout {
    format(entry: LogEntry): string;
    private formatDate(date);
}
