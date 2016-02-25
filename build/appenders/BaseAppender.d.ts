import { ILayout } from "../ILayout";
import { ILayoutFunction } from "../ILayout";
export default class BaseAppender {
    setLayout(layout: ILayout): void;
    setLayoutFunction(layout: ILayoutFunction): void;
    protected layout: ILayout;
}
