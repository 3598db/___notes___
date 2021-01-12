# :star:Performance API 与 HTML文档的生命周期

## 上一个文档卸载相关
unloadEventStart unloadEventEnd

## 重定向相关
redirectStart redirectEnd

## HTTP请求发送之前(包括缓存查询)
fetchStart

## DNS查询(如果是持久化链接或者域名信息能在浏览器host文件中或者windows系统host文件中找到则与fetchStart一致)
domainLookupStart domainLookupEnd

## TCP握手(从开始建立握手,到可能的ssl/tsl握手,到握手结束)
connectStart secureConnectionStart connectEnd

## 握手结束开始发送请求时
requestStart

## 获取资源相关(从开始接收到第一个字节到读取相关)
responseStart responseEnd

## DOM解析相关
### DOM 解析开始
domLoading document.readyState = "loading"
### 文档已被解析,"正在加载"状态结束,但是诸如图像,样式表和框架之类的子资源仍在加载.此时已是可交互状态
domInteractive document.readyState = "interactive"
### DOM树构建完成执行DOMContentLoaded事件
domContentLoadedEventStart domContentLoadedEventEnd
### 文档和所有子资源都已完成加载.表示load状态的事件即将被触发
domComplete document.readyState = "complete"

## 文档加载完成执行load事件相关
loadEventStart loadEventEnd

document.readyState = "loading" -> document.readyState = "interactive" -> DOMContentLoaded -> document.readyState = "complete" -> load
