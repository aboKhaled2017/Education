/// <reference path="./bootstrapNotify.d.ts" />
const notifyTemplate = `
 <div data-notify="container" class="col-xs-11 col-sm-4 alert bootstrapNotify alert-{0}" role="alert">
    <button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button>
    <span data-notify="icon"></span> <span data-notify="title">{1}</span>
    <span data-notify="message">{2}</span>
    <div class="progress" data-notify="progressbar">
      <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
      </div>
    </div>
    <a href="{3}" target="{4}" data-notify="url"></a>
</div>
`;
var defaults: notifySetting = {
    element: 'body',
    position: null,
    type: "info",
    allow_dismiss: true,
    allow_duplicates: true,
    newest_on_top: false,
    showProgressbar: false,
    placement: {
        from: "top",
        align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 9999999999999,
    delay: 5000,
    timer: 1000,
    url_target: '_blank',
    mouse_over: null,
    animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template: notifyTemplate
}
String.format = function (params: string[]) {
    var str: string = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
    }
    return str;
};
function isDuplicateNotification(notification: any) {
    var isDupe = false;

    $('[data-notify="container"]').each(function (i: number, el: HTMLElement) {
        var $el = $(el);
        var title = $el.find('[data-notify="title"]').text().trim();
        var message = $el.find('[data-notify="message"]').html().trim();

        // The input string might be different than the actual parsed HTML string!
        // (<br> vs <br /> for example)
        // So we have to force-parse this as HTML here!
        var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
        var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
        var isSameType = $el.hasClass('alert-' + notification.settings.type);

        if (isSameTitle && isSameMsg && isSameType) {
            //we found the dupe. Set the var and stop checking.
            isDupe = true;
        }
        return !isDupe as FalseOrVoide;
    });

    return isDupe;
}
class Notify {
    private contentObj: { content: contentObject };
    public settings: notifySetting;
    public _defaults: notifySetting;
    public animations: notifyAnimation;
    private $ele: JQuery;
    public notify: notifyObject | null;
    constructor(private element: JQueryStatic, private content: contentObject, private options?: notifyOptions) {
        this.contentObj = {
            content: {
                message: typeof content === 'object' ? content.message : content,
                title: content.title ? content.title : '',
                icon: content.icon ? content.icon : 'pe-7s-bell',
                url: content.url ? content.url : '#',
                target: content.target ? content.target : '-'
            }
        };
        this.notify = null;
        this.$ele = $();
        options = $.extend(true, {}, this.contentObj, options);
        this.settings = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        if ((this.settings.content as contentObject).target === "-") {
            (this.settings.content as contentObject).target = this.settings.url_target;
        }
        this.animations = {
            start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
            end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
        };
        if (typeof this.settings.offset === 'number') {
            this.settings.offset = {
                x: this.settings.offset,
                y: this.settings.offset
            };
        }
        //if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
        if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
            this.init();
        }
    }
    public init() {
        var self = this;
        this.buildNotify();
        if ((this.settings.content as contentObject).icon) {
            this.setIcon();
        }
        if ((this.settings.content as contentObject).url != "#") {
            this.styleURL();
        }
        this.styleDismiss();
        this.placement();
        this.bind();
        this.notify = {
            $ele: this.$ele,
            update: function (command: string, update) {
                var commands: any = {};
                if (typeof command === "string") {
                    commands[command] = update;
                } else {
                    commands = command;
                }
                for (var cmd in commands) {
                    switch (cmd) {
                        case "type":
                            this.$ele.removeClass('alert-' + self.settings.type);
                            this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
                            self.settings.type = commands[cmd];
                            this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
                            break;
                        case "icon":
                            var $icon = this.$ele.find('[data-notify="icon"]');
                            if (self.settings.icon_type.toLowerCase() === 'class') {
                                $icon.removeClass((self.settings.content as contentObject).icon).addClass(commands[cmd]);
                            } else {
                                if (!$icon.is('img')) {
                                    $icon.find('img');
                                }
                                $icon.attr('src', commands[cmd]);
                            }
                            break;
                        case "progress":
                            var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
                            this.$ele.data('notify-delay', newDelay);
                            this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
                            break;
                        case "url":
                            this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
                            break;
                        case "target":
                            this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
                    }
                }
                var posX = this.$ele.outerHeight() as number + parseInt(self.settings.spacing) + parseInt((self.settings.offset as offset).y.toString());
                self.reposition(posX);
            },
            close: function (doAnyAction?: boolean) {
                self.close(doAnyAction);
            }
        };
    }
    public buildNotify() {
        var content = this.settings.content;
        this.$ele = (typeof this.settings.template == "string")
            ? $(String.format(this.settings.template, this.settings.type, (content as contentObject).title, (content as contentObject).message, (content as contentObject).url, (content as contentObject).target))
            : this.settings.template;
        this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
        if (!this.settings.allow_dismiss) {
            this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
        }
        if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
            this.$ele.find('[data-notify="progressbar"]').remove();
        }
    }
    public setIcon() {

        this.$ele.addClass('alert-with-icon');

        if (this.settings.icon_type.toLowerCase() === 'class') {
            this.$ele.find('[data-notify="icon"]').addClass((this.settings.content as contentObject).icon as string);
        } else {
            if (this.$ele.find('[data-notify="icon"]').is('img')) {
                this.$ele.find('[data-notify="icon"]').attr('src', (this.settings.content as contentObject).icon as string);
            } else {
                this.$ele.find('[data-notify="icon"]').append('<img src="' + (this.settings.content as contentObject).icon + '" alt="Notify Icon" />');
            }
        }
    }
    public styleDismiss() {
        this.$ele.find('[data-notify="dismiss"]').css({
            position: 'absolute',
            left: '10px',
            top: '50%',
            marginTop: '-13px',
            zIndex: this.settings.z_index + 2
        });
    }
    public styleURL() {
        this.$ele.find('[data-notify="url"]').css({
            backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: this.settings.z_index + 1
        });
    }
    public placement() {
        var self = this,
            offsetAmt = (this.settings.offset as offset).y,
            css: cssObject = {
                display: 'inline-block',
                margin: '0px auto',
                position: this.settings.position ? this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
                transition: 'all .5s ease-in-out',
                zIndex: this.settings.z_index
            },
            hasAnimation = false,
            settings = this.settings;

        ($('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])') as JQuery)
            .each(function () {
                var h = $(this).outerHeight() as number;
                offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + h + parseInt(settings.spacing));
            });
        if (this.settings.newest_on_top === true) {
            offsetAmt = (this.settings.offset as offset).y;
        }
        css[(this.settings.placement.from) as cssProperty] = offsetAmt + 'px';

        switch (this.settings.placement.align) {
            case "left":
            case "right":
                css[this.settings.placement.align as cssProperty] = (this.settings.offset as offset).x + 'px';
                break;
            case "center":
                css.left = 0;
                css.right = 0;
                break;
        }
        this.$ele.css(css as {}).addClass((this.settings.animate.enter as string));
        $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function (index: number, prefix: string) {
            (self.$ele[0].style as any)[prefix + 'AnimationIterationCount'] = 1;
        });
        if (typeof this.settings.element == "string")
            $(this.settings.element).append(this.$ele);
        else
            this.settings.element.append(this.$ele);

        if (this.settings.newest_on_top === true) {
            offsetAmt = (offsetAmt + parseInt(this.settings.spacing)) + ((this.$ele as JQuery).outerHeight() as number);
            this.reposition(offsetAmt);
        }

        if ($.isFunction(self.settings.onShow)) {
            self.settings.onShow.call(this.$ele);
        }

        this.$ele.one((this.animations.start as string), function () {
            hasAnimation = true;
        }).one((this.animations.end as string), function () {
            if ($.isFunction(self.settings.onShown)) {
                self.settings.onShown.call(this);
            }
        });
        setTimeout(() => {
            if (!hasAnimation) {
                if ($.isFunction(self.settings.onShown)) {
                    self.settings.onShown.call(this.$ele);
                }
            }
        }, 600);
    }
    public bind() {
        var self = this;

        this.$ele.find('[data-notify="dismiss"]').on('click', function () {
            self.close();
        });

        this.$ele.mouseover(function () {
            $(this).data('data-hover', "true");
        }).mouseout(function () {
            $(this).data('data-hover', "false");
        });
        this.$ele.data('data-hover', "false");

        if (this.settings.delay > 0) {
            self.$ele.data('notify-delay', self.settings.delay);
            var timer = setInterval(function () {
                var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
                if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause") || self.settings.mouse_over != "pause") {
                    var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
                    self.$ele.data('notify-delay', delay);
                    self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
                }
                if (delay <= -(self.settings.timer)) {
                    clearInterval(timer);
                    self.close();
                }
            }, self.settings.timer);
        }
    }
    public close(doAnyAction?: boolean) {
        var self = this,
            posX = parseInt(this.$ele.css(this.settings.placement.from)),
            hasAnimation = false;

        this.$ele.data('closing', 'true').addClass((this.settings.animate.exit as string));
        self.reposition(posX);

        if ($.isFunction(self.settings.onClose)) {
            self.settings.onClose.call(this.$ele, doAnyAction);
        }

        this.$ele.one((this.animations.start as string), function () {
            hasAnimation = true;
        }).one((this.animations.end as string), function () {
            $(this).remove();
            if ($.isFunction(self.settings.onClosed)) {
                self.settings.onClosed.call(this);
            }
        });

        setTimeout(function () {
            if (!hasAnimation) {
                self.$ele.remove();
                if (self.settings.onClosed) {
                    self.settings.onClosed(self.$ele);
                }
            }
        }, 600);
    }
    public reposition(posX: number) {
        var self = this,
            notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
            $elements = this.$ele.nextAll(notifies);
        if (this.settings.newest_on_top === true) {
            $elements = this.$ele.prevAll(notifies);
        }
        $elements.each(function () {
            $(this).css(self.settings.placement.from, posX);
            var h: number = $(this).outerHeight() as number;
            posX = (parseInt(posX.toString()) + parseInt(self.settings.spacing)) + h;
        });
    }
}

$.notify = function (content: contentObject, options?: notifyOptions) {
    var plugin = new Notify(this, content, options);
    return plugin.notify;
};
$.notifyDefaults = function (options: {}) {
    defaults = $.extend(true, {}, defaults, options);
    return defaults;
};
$.notifyClose = function (command: string) {
    if (typeof command === "undefined" || command === "all") {
        $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
    } else {
        $('[data-notify-position="' + command + '"]').find('[data-notify="dismiss"]').trigger('click');
    }
};