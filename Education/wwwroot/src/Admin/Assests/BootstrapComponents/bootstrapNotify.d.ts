
interface contentObject {
    icon?: string,
    url?: string,
    message?: string,
    title?: string,
    target?: string
}
type offset = { x: number, y: number };
type direction = 'top' | 'bottom' | 'left' | 'right';
type fromPlacement = 'top' | 'bottom' | 'right' | 'left';
type alignPlacement = 'left' | 'center' | 'right';
type Placement = { from: fromPlacement, align: alignPlacement };
type notifyType = 'info' | 'danger' | 'success' | 'primary' | 'secondary' | 'light' | 'warning' | 'validate' | 'dark';
interface notifySetting {
    content?: contentObject;
    url_target: string;
    offset: offset | null | number;
    allow_duplicates: boolean;
    allow_dismiss: boolean;
    newest_on_top: boolean;
    template: JQuery | string;
    type: notifyType;
    placement: Placement;
    showProgressbar: any;
    delay: any;
    icon_type: any;
    z_index: number;
    position: string | null,
    element: string | JQuery;
    animate: notifyAnimation;
    spacing: any;
    onShow: any;
    timer: any;
    mouse_over: string | null;
    onShown: (() => void) | null;
    onClose: ((doAnyAction?: boolean) => void) | null;
    onClosed: ((el?: JQuery) => void) | null;
}
interface notifyOptions {
    content?: contentObject;
    url_target?: string;
    offset?: offset | null | number;
    allow_duplicates?: boolean;
    allow_dismiss?: boolean;
    newest_on_top?: boolean;
    template?: JQuery | string;
    type?: notifyType;
    placement?: Placement;
    showProgressbar?: any;
    delay?: any;
    icon_type?: any;
    z_index?: number;
    position?: string | null,
    element?: any;
    animate?: notifyAnimation;
    spacing?: any;
    onShow?: any;
    timer?: any;
    mouse_over?: string | null;
    onShown?: (() => void) | null;
    onClose?: ((doAnyAction?: boolean) => void) | null;
    onClosed?: ((el?: JQuery) => void) | null;
}
interface notifyAnimation {
    start?: string,
    end?: string
    enter?: string;
    exit?: string;
}
interface StringConstructor {
    format: (...params: any[]) => any;
}
type cssProperty = "display" | "margin" | "position" | "transition" | "zIndex";
type FalseOrVoide = false | void;
interface cssObject {
    display: string;
    margin: string;
    position: string;
    transition: string;
    zIndex: number;
    left?: number;
    right?: number;
}
interface notifyObject {
    $ele: JQuery;
    update: (cmd: string, update: any) => void;
    close: (doAnyAction?: boolean) => void;
}
