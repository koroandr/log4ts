
import {ILayout} from "../ILayout";
import {ILayoutFunction} from "../ILayout";
export default class BaseAppender {
    setLayout(layout: ILayout) {
        this.layout = layout;
    }
    setLayoutFunction(layout: ILayoutFunction) {
        this.layout = {
            format: layout
        }
    }

    protected layout: ILayout;
}
