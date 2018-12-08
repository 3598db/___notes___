## 自定义事件

### 一. createEvent
@parameter eventType:事件种类 共五种
1. Events:包括所有的事件. 
2. HTMLEvents: `abort`, `blur`, `change`, `error`, `focus`, `load`, `reset`, `resize`, `scroll`, `select`, `submit`, `unload`
3. UIEvents: `DOMActivate`, `DOMFocusIn`, `DOMFocusOut`, `keydown`, `keypress`, `keyup`
4. MouseEvents: `click`, `mousedown`, `mousemove`, `mouseout`, `mouseover`, `mouseup`
5. MutationEvents: `DOMAttrModified`, `DOMNodeInserted`, `DOMNodeRemoved`,`DOMCharacterDataModified`, `DOMNodeInsertedIntoDocument`, `DOMNodeRemovedFromDocument`, `DOMSubtreeModified`

#### e.g. 
```javascript
const event = document.createEvent('MouseEvents');
```
---
### 二. initEvent
在createEvent后必须初始化，为大家介绍5种对应的初始化方法
1. HTMLEvents 和 通用 Events:
```javascript
initEvent( type, bubbles, cancelable );
```
2. UIEvents:
```javascript
initUIEvent( type, bubbles, cancelable, windowObject, detail );
```
3. MouseEvents:
```javascript
initMouseEvent( type, bubbles, cancelable, windowObject, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget );
```
4. MutationEvents:
```javascript
initMutationEvent( type, bubbles, cancelable, relatedNode, prevValue, newValue, attrName, attrChange );
```

#### e.g. 
```javascript
event.initEvent( 'mousemove', true, false );
```
---
### 三. dispatchEvent | fireEvent
在初始化完成后就可以随时触发需要的事件了，为大家介绍target.dispatchEvent(event) | target.fireEvent(eventType)

#### e.g. 
```javascript
target.dispatchEvent(event);
target.fireEvent('onmousemove');
```
 