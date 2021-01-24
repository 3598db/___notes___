# :star:HTML5新特性
[[toc]]
## 标签类

### HTML5标准新增的标签
- 结构元素   
  - `<header>`
  - `<nav>`
  - `<footer>`
  - `<article>`

  - etc ...
- 其他元素
  - `<audio>`
  - `<video>`
  - `<canvas>`
  - 智能表单元素
    - `<number>`
    - `<range>`
    - `<search>`
    - `<email>`

    - etc.
  - etc.
---
### 废除的标签
- 纯表现元素 (可以通过样式替代)
  - `<big>`
  - `<center>`
  - `<font>`

  - etc.
- 对浏览器性能有负面影响的元素
  - `<frameset>`
  - `<frame>`
  - `<noframes>`

  - etc.

---
## 新增的API

### 1. Canvas API    
**Canvas**   
上文提到的canvas元素可以为页面提供一块画布来展示图形。结合Canvas API，就可以在这块画布上动态生成和展示各种图形、图表、图像以及动画了。Canvas本质上是位图画布，不可缩放，绘制出来的对象不属于页面DOM结构或者任何命名空间。不需要将每个图元当做对象存储，执行性能非常好。

**SVG**   
SVG是html5的另一项图形功能，它是一种标准的矢量图形，是一种文件格式，有自己的API。html5引入了内联SVG，使得SVG元素可以直接出现在html标记中。

**Video Audio**   
audio和video元素的出现让html5的媒体应用多了新选择，开发人员不必使用插件就能播放音频和视频。对于这两个元素，html5规范提供了通用、完整、可脚本化控制的API。
html5规范出来之前，在页面中播放视频的典型方式是使用Flash、QuickTime或者Windows Media插件往html中嵌入音频视频，相对这种方式，使用html5的媒体标签有两大好处:
- 作为浏览器原生支持的功能，新的audio和video元素无需安装。
- 媒体元素想Web页面提供了通用、集成和可脚本化控制的API。

---
### 2. Geolocation API
html5的Geolocation API（地理定位API），可以请求用户共享他们的位置。使用方法非常简单，如果用户同意，浏览器就会返回位置信息，该位置信息是通过支持html5地理定位功能的底层设备（如笔记本电脑或手机）提供给浏览器的。位置信息由纬度、经度坐标和一些其他元数据组成。

---
### 3. Communication API
出于安全方面的考虑，运行在同一浏览器中的框架、标签页、窗口间的通信一直都受到了严格的限制。然而，现实中存在一些合理的让不同站点的内容能在浏览器内进行交互的需求。这种情形下，如果浏览器内部能提供直接的通信机制，就能更好地组织这些应用。
html5中引入了一种新功能，跨文档消息通信，可以确保iframe、标签页、窗口间安全地进行跨源通信。

---
### 4. XMLHttpRequest Level2
XMLHttpRequest API使得Ajax技术成为可能，作为XMLHttpRequest的改进版，XMLHttpRequest Level2在功能上有了很大的改进。主要两个方面:
- 跨源XMLHttpRequest
- 进度事件
过去，XMLHttpRequest仅限于同源通信，XMLHttpRequest Level2通过CORS实现了跨源XMLHttpRequest。跨源HTTP请求包含一个Origin头部，它为服务器提供HTTP请求的源信息。

---
### 5. WebSockets API
WebSockets是html5中最强大的通信功能，它定义了一个全双工通信信道，仅通过Web上的一个Socket即可进行通信。  
**WebSockets握手**   

为了建立WebSockets通信，客户端和服务器在初始握手时，将HTTP协议升级到WebSocket协议。一旦连接建立成功，就可以在全双工模式下在客户端和服务器之间来回传递WebSocket消息。   

**WebSockets接口**   
除了对WebSockets协议定义外，该规范还同时定义了用于JavaScript应用程序的WebSocket接口。WebSockets接口的使用很简单。要连接远程主机，只需要新建一个WebSocket实例，提供希望连接的对端URL。

---
### 6. Forms API
**新表单元素**   
- tel元素，表示电话号码。
- email元素，表示电子邮件地址文本框。
- url元素，表示网页的url。
- search元素，用于搜索引擎，比如在站点顶部显示的搜索框。
- range元素，特定值范围内的数值选择器，典型的显示方式是滑动条。
- number元素，只包含数值的字段。

**未来的表单元素**   
- color元素，颜色选择器，基于调色盘或者取色板进行选择。
- datetime元素，显示完整的日期和时间，包括时区。
- datetime-local，显示日期和时间。
- time元素，不含时区的时间选择器和指示器。
- date元素，日期选择器。
- week元素，某年中的周选择器。
- month元素，某年中的月选择器。

---
### 7. 拖放API
如果网页元素的draggable元素为true，这个元素就是可以拖动的。

---
### 8. Web Workers API
Javascript是单线程的。因此，持续时间较长的计算，回阻塞UI线程，进而导致无法在文本框中填入文本，单击按钮等，并且在大多数浏览器中，除非控制权返回，否则无法打开新的标签页。该问题的解决方案是Web Workers，可以让Web应用程序具备后台处理能力，对多线程的支持性非常好。

但是在Web Workers中执行的脚本不能访问该页面的window对象，也就是Web Workers不能直接访问Web页面和DOM API。虽然Web Workers不会导致浏览器UI停止响应，但是仍然会消耗CPU周期，导致系统反应速度变慢。

---
### 9. Web Storage API
Web Storage是html5引入的一个非常重要的功能，可以在客户端本地存储数据，类似html4的cookie，但可实现功能要比cookie强大的多。
**sessionStorage**   
sessionStorage将数据保存在session中，浏览器关闭数据就消失。
**localStorage**   
localStorage则一直将数据保存在客户端本地，除非手动删除，否则一直保存。

---
## Notes

