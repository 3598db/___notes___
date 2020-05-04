# MessageChannel API
[[toc]]
Channel Messaging API的MessageChannel 接口允许我们创建一个新的消息通道，并通过它的两个MessagePort 属性发送数据。
>Note: 此特性在 Web Worker 中可用。
## 属性
### MessageChannel.port1 只读
返回channel的port1。
### MessageChannel.port2 只读
返回channel的port2。

## 构造函数
### MessageChannel()
返回一个带有两个MessagePort属性的MessageChannel新对象。

## 示例
在以下代码块中，您可以看到使用MessageChannel构造函数实例化了一个channel对象。当iframe加载完毕，我们使用MessagePort.postMessage方法把一条消息和MessageChannel.port2传递给iframe。handleMessage处理程序将会从iframe中（使用MessagePort.onmessage监听事件）接收到信息，将数据其放入innerHTML中。
```js
var channel = new MessageChannel();
var para = document.querySelector('p');
    
var ifr = document.querySelector('iframe');
var otherWindow = ifr.contentWindow;

ifr.addEventListener("load", iframeLoaded, false);
    
function iframeLoaded() {
  otherWindow.postMessage('Hello from the main page!', '*', [channel.port2]);
}

channel.port1.onmessage = handleMessage;
function handleMessage(e) {
  para.innerHTML = e.data;
}
```