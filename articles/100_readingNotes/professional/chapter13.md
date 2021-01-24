# 事件
>Javascript与HTML之间的交互是通过事件实现的. 事件, 就是文档或者浏览器窗口中发生的一些特定的交互瞬间. 可以使用侦听器(或者处理程序)来预订事件, 以便事件发生时执行相应的代码. 这种在传统软件工程中被称为观察者模式的模型, 支持页面的行为(Javascript代码)与页面的外观(HTML和CSS代码)之间的松散耦合.

>Tip: 主要浏览器都已经实现了DOM2级

## 13.1 事件流

> 事件流描述的是从页面中接收事件的顺序.

### 13.1.1 事件冒泡
IE的事件流叫做事件冒泡, 即事件开始是由最具体的元素(文档中嵌套最深的那个节点)接受, 然后逐级向上传播到较为不具体的节点(文档).

### 13.1.2 事件捕获
事件捕获的思想是不太具体的节点应该更早的接受事件, 而具体的节点应该最后接收到事件. 事件捕获的用意在于在事件到达预定目标之前捕获它.

>Tip: DOM2要求从`document`开始捕获, 但是浏览器的实现都是从`window`对象开始的

### 13.1.3 DOM事件流
DOM2级事件规定的事件流包括三个阶段: 事件捕获阶段, 处于目标阶段和事件冒泡阶段. 首先发生的是事件捕获, 为截获事件提供了机会. 然后是实际的目标接收到事件. 最后一个阶段是冒泡阶段, 可以在这个阶段对事件作出响应.
在DOM事件流中, 实际的目标在捕获阶段不会接收到事件. 这意味着在捕获阶段, 事件从`document`到`<html>`再到`<body>`就停止了(针对`html>body>div`结构).下一个阶段是'处于目标'阶段, 于是时间在目标上发生, 并在事件处理中看成是冒泡阶段的一个部分. 然后, 冒泡发生, 事件又传播回文档.

## 13.2 事件处理程序

### 13.2.1 HTML事件处理程序
HTML添加句柄方式 为DOM绑定事件处理程序

### 13.2.2 DOM0级事件处理程序
通过Javascript指定事件处理程序的传统方式, 就是将一个函数赋值给一个事件处理程序属性.

通过把事件处理程序的属性置为`null`可以删除事件处理程序.
e.g.
```javascript
btn.onclick = null;
```

### 13.2.3 DOM2级事件处理程序
DOM2级定义了两个方法用来绑定和移除事件处理程序:
1. `addEventListener()`
2. `removeEventListener()`

Usage:
```javascript
EventTarget.addEventListener(type, listener[, useCapture]);
EventTarget.removeEventListener(type, listener[, useCapture]);
```
>Tip: 事件处理程序中的`this`指向`EventTarget`

### 13.2.4 IE事件处理程序
IE定义了两个方法用来绑定和移除事件处理程序:
1. `attachEvent()`
2. `detachEvent()`

Usage:
```javascript
EventTarget.attachEvent(eventNameWithOn, callback);
EventTarget.detachEvent(eventNameWithOn, callback);
```
因为ie8以前版本不支持事件捕获, 所以事件处理程序都会被绑定到事件冒泡阶段.

>Tip: 事件处理程序中的`this`指向`window`, 而且事件处理程序执行的顺序和绑定的先后顺序**相反**.

### 13.2.5跨浏览器的事件处理程序
事件绑定移除的兼容性写法

## 13.3 事件对象

### 13.3.1 DOM中的事件对象
DOM中所有事件对象都会支持的属性和方法:   

|属性/方法|类型|读/写|说明|
|:---:|:---:|:---:|:---:|
|`bubbles`|`Boolean`|只读|表明事件是否冒泡|
|`cancelable`|`Boolean`|只读|表明是否可以取消事件的默认行为|
|`currentTarget`|`Boolean`|只读|其事件处理程序当前正在处理事件的那个元素|
|`defaultPrevented`|`Boolean`|只读|为`true`表示已经调用了`preventDefault()`(DOM3)|
|`detail`|`Integer`|只读|与事件相关的细节信息|
|`eventPhase`|`Integer`|只读|调用事件处理程序的阶段: `1`表示捕获阶段, `2`表示'处于目标阶段', `3`表示冒泡阶段|
|`preventDefault()`|`Function`|只读|取消事件的默认行为. 如果`cancelable`为`true`, 则可以使用这个方法|
|`stopImmdiatePropagation`()|`Function`|只读|取消事件的进一步捕获或冒泡, 同时阻止任何事件处理程序被调用(DOM3)|
|`stopPropagation()`|`Function`|只读|取消事件的进一步捕获或冒泡. 如果`bubbles`为`true`, 则可以使用这个方法.|
|`target`|`Element`|只读|事件的目标|
|`trusted`|`Boolean`|只读|为`true`表示事件是浏览器生成的. 为`false`表示是由开发人员通过`javascript`创建的(DOM3)|
|`type`|`String`|只读|被触发的事件类型|
|`view`|`AbstractView`|只读|与事件关联的抽象视图. 等同于发生事件的`window`对象|

>Tip: 在事件处理程序内部, 对象`this`始终等于`currentTarget`的值, 而`target`则只包含事件的实际目标.

### 13.3.2 IE中的事件对象
DOM0级方式添加的事件处理程序, `event`对象作为`window`的一个属性存在, 可以通过`window.event`访问, 如果是`attachEvent()`添加的那么就会有一个`event`对象作为参数被传入事件处理函数中(也同时可以通过`window.event`访问).

IE中所有事件对象都会支持的属性和方法:

|属性/方法|类型|读/写|说明|
|:---:|:---:|:---:|:---:|
|`cancelBubble`|`Boolean`|读写|默认值是`false`, 但将其设置为`true`就可以取消事件冒泡|
|`returnValue`|`Boolean`|读写|默认值是`true`, 但将其设置为`false`就可以取消事件的默认行为|
|`srcElement`|`Element`|只读|事件的目标|
|`type`|`String`|只读|被触发的事件的类型|

### 13.3.3 夸浏览器的时间对象
访问事件对象的兼容性写法

### 附:
事件绑定移除和访问事件对象兼容性写法
```javascript
const EventUtils = {
  addHandler(el, type, handler) {
    if (el.addEventListener) {
      el.addEventListener(type, handler, false);
    } else if (el.attachEvent) {
      el.attachEvent(`on${type}`, handler);
    } else {
      el[`on${type}`] = handler;
    }
  },
  removeHandler(el, type, handler) {
    if (el.removeEventListener) {
      el.removeEventListener(type, handler, false);
    } else if (el.detachEvent) {
      el.detachEvent(`on${type}`, handler);
    } else {
      el[`on${type}`] = null;
    }
  },
  getEvent(event) {
    return event ? event : window.event;
  },
  getTarget(event) {
    return event.target || event.srcElement;
  },
  preventDefault(event) {
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false;
    }
  },
  stopPropagation(event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true;
    }
  }
};
```

## 13.4 事件类型

### 13.4.1 UI事件
- load: 当页面完全加载后在window上触发 当所有框架都加在完毕时在框架集上触发 当图像加载完毕时在img上触发 或者当嵌入的内容加载完毕时在object上触发
- unload: 当页面完全卸载后在window上触发 当所有框架都卸载后在框架集上触发 或者当嵌入的内容卸载完毕后在object上触发
- abort: 当用户停止下载过程时 如果嵌入的内容没有加载完 则在object上触发
- error: 当发生js错误时在window上触发 当无法加载图像时在img元素上面触发 当无法加载嵌入内容时在object元素上面触发 或者当有一个或多个框架无法加载时在框架集上触发
- select: 当用户选择文本框中的一或者多个字符时触发
- resize: 当窗口或者框架的大小变化时在window或者框架上触发
- scroll: 当用户滚动带滚动条的元素中的内容时 在该元素上触发 body元素中包含所加载页面的滚动条

#### 1. load事件   
case ONE   
`window.onload`
当页面完全加载后(包括所有的头像 js文件 css文件等外部资源) 就会触发window上面的load事件

case TWO   
`image.onload`
>Tip: 新元素不一定要从添加到文档后才开始下载 只要设置了src就会开始下载 同样的功能也可以使用DOM0级的Image对象实现

case THREE   
`script.onload & link.onload`
>Tip: 与图像不同的是 只有在设置了script的src或者link标签的href 并将该元素添加到文档后 才会开始下载资源

#### 2. unload事件   

#### 3. resize事件   
>Tip: 可以通过**节流**方式优化性能

#### 3. scroll事件   

### 13.4.2 焦点事件
主要有6个焦点事件
- blur: 在元素失去焦点时触发 这个事件不会冒泡
- DOMFocusIn 废弃
- DOMFocusOut 废弃
- focus: 在元素获得焦点时触发 这个事件不会冒泡
- focusin: 在元素获得焦点时触发 这个事件与HTML事件focus等价 但他冒泡
- focusout: 在元素失去焦点时触发 这个事件时HTML事件blur的通用版本

当元素从页面中的一个元素移动到另一个元素 会依次触发下列事件:
1. focusout 在失去焦点的元素上触发
2. focusin 在获得焦点的元素上触发
3. blur 在失去焦点的元素上触发
4. DOMFocusOut 在失去焦点的元素上触发
5. foucs 在获得焦点的元素上触发
6. DOMFocusIn 在获得焦点的元素上触发

### 13.4.3 鼠标与滚轮事件
DOM3级定义了9个鼠标事件:
- click
- dbclick
- mousedown
- mouseenter(DOM3) 在鼠标光标从元素外部首次移动到元素范围之内时触发 这个事件不冒泡
- mouseleave(DOM3) 在位于元素上方的鼠标光标移动到元素范围之外时触发 这个事件不冒泡 而且在光标移动到后代元素上不会触发
- mousemove
- mouseout 在鼠标指针位于一个元素上方 然后用户将其移入另一个元素时触发 又移入的另一个元素可能位于前一个元素的外部 也可能是这个元素的子元素
- mouseover 在鼠标指针位于一个元素外部 然后用户将其首次移入另一个元素边界之内时触发
- mouseup 

只有在同一个元素上相继触发mousedown和mouseup事件 才会触发click事件 如果mousedown或mouseup中的一个被取消 就不会触发click事件 类似的 只有触发两次click事件 才会触发一次dbclick事件 如果有代码阻止了连续两次触发click事件 那么不会触发dbclick事件 这四个事件触发的顺序始终如下

1. mousedown
2. mouseup
3. click
4. mousedown
5. mouseup
6. click
7. dbclick

#### 1. 客户区坐标位置
clientX clientY

#### 2. 页面坐标位置
pageX pageY

#### 3. 屏幕坐标位置
screenX screenY

#### 4. 修改键

#### 5. 相关元素
```javascript
EventUtil = {
  getRelationTarget(event) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) {
      return event.toElement;
    } else if (event.fromElement) {
      return event.fromElement;
    } else {
      return null;
    }
  }
}
```

#### 6. 鼠标按钮

#### 7. 更多的事件信息

#### 8. 鼠标滚轮事件

#### 9. 触摸设备

#### 10. 无障碍问题

### 13.4.4 键盘与文本事件






