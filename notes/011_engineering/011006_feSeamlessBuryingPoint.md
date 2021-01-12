# [读]200行代码实现前端无痕埋点

tracker.js
```js
import extend from 'extend';
import {
    getEvent,
    getEventListenerMethod,
    getBoundingClientRect,
    stringify,
    getDomPath,
} from './utils'

const DefaultOptions = {
    useClass: false,
    per: 0.01,
    events: ['click'],
};

class Tracker {
    constructor() {
        this._isInstall = false;
        this._options = {};
    }

    config(options = {}) {
        options = extend(true, {}, DefaultOptions, options);
        options.event = DefaultOptions.event;
        this._options = options;
        return this;
    }

    _captureEvents() {
        const self = this;
        const events = this._options.events;
        const eventMethodObj = getEventListenerMethod();
        for (let i = 0, j = events.length; i < j; i++) {
            let eventName = events[i];
            document.body[eventMethodObj.addMethod](eventMethodObj.prefix + eventName, function (event) {
                const eventFix = getEvent(event);
                if (!eventFix) {
                    return;
                }
                self._handleEvent(eventFix);
            }, false)
        }
    }

    _handleEvent(event) {
        const per = parseFloat(this._options.per);
        if (!this.hit(per)) {
            return;
        }
        const domPath = getDomPath(event.target, this._options.useClass);
        const rect = getBoundingClientRect(event.target);
        if (rect.width == 0 || rect.height == 0) {
            return;
        }
        let t = document.documentElement || document.body.parentNode;
        const scrollX = (t && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft;
        const scrollY = (t && typeof t.scrollTop == 'number' ? t : document.body).scrollTop;
        const pageX = event.pageX || event.clientX + scrollX;
        const pageY = event.pageY || event.clientY + scrollY;
        const data = {
            domPath: encodeURIComponent(domPath),
            trackingType: event.type,
            offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
            offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
        };
        this.send(data);
    }

    send(data = {}) {
        console.log('data', data);
        const image = new Image(1, 1);
        image.onload = function () {
            image = null;
        };
        image.src = `/?${stringify(data)}`;
    }

    hit(per = 0.01) {
        return Math.random() < per;
    }

    install() {
        if (this._isInstall) {
            return this;
        }
        this._captureEvents();
        this._isInstall = true;
        return this;
    }
}

export default Tracker;
```

utils.js
```js
import extend from 'extend';

export const getEvent = (event) => {
    event = event || window.event;
    if (!event) {
        return event;
    }
    if (!event.target) {
        event.target = event.srcElement;
    }
    if (!event.currentTarget) {
        event.currentTarget = event.srcElement;
    }
    return event;
}

export const getEventListenerMethod = () => {
    let addMethod = 'addEventListener', removeMethod = 'removeEventListener', prefix = '';
    if (!window.addEventListener) {
        addMethod = 'attachEvent';
        removeMethod = 'detachEvent';
        prefix = 'on';
    }
    return {
        addMethod,
        removeMethod,
        prefix,
    }
}

export const getBoundingClientRect = (element) => {
    const rect = element.getBoundingClientRect();
    const width = rect.width || rect.right - rect.left;
    const heigth = rect.heigth || rect.bottom - rect.top;
    return extend({}, rect, {
        width,
        heigth,
    });
}

export const stringify = (obj) => {
    let params = [];
    for (let key in obj) {
        params.push(`${key}=${obj[key]}`);
    }
    return params.join('&');
}

export function getDomPath(element, useClass = false) {
    if (!(element instanceof HTMLElement)) {
        console.warn('input is not a HTML element!');
        return '';
    }
    let domPath = [];
    let elem = element;
    while (elem) {
        let domDesc = getDomDesc(elem, useClass);
        if (!domDesc) {
            break;
        }
        domPath.unshift(domDesc);
        if (querySelector(domPath.join('>')) === element || domDesc.indexOf('body') >= 0) {
            break;
        }
        domPath.shift();
        const children = elem.parentNode.children;
        if (children.length > 1) {
            for (let i = 0; i < children.length; i++) {
                if (children[i] === elem) {
                    domDesc += `:nth-child(${i + 1})`;
                    break;
                }
            }
        }
        domPath.unshift(domDesc);
        if (querySelector(domPath.join('>')) === element) {
            break;
        }
        elem = elem.parentNode;
    }
    return domPath.join('>');
}

export function getDomDesc(element, useClass = false) {
    const domDesc = [];
    if (!element || !element.tagName) {
        return '';
    }
    if (element.id) {
        return `#${element.id}`;
    }
    domDesc.push(element.tagName.toLowerCase());
    if (useClass) {
        const className = element.className;
        if (className && typeof className === 'string') {
            const classes = className.split(/\s+/);
            domDesc.push(`.${classes.join('.')}`);
        }
    }
    if (element.name) {
        domDesc.push(`[name=${element.name}]`);
    }
    return domDesc.join('');
}

export function querySelector(queryString) {
    return document.getElementById(queryString) || document.getElementsByName(queryString)[0] || document.querySelector(queryString);
}
```