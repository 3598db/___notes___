# :thinking:浏览器

[[toc]]

## 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化。
两者都是浏览器渲染流水线上的重要流程：
* 回流：涉及DOM树变更，流程更长，需要调整DOM树（非常耗时），计算样式，重新生成图层树，重新绘制。
* 重绘：只涉及样式计算，流程较短，计算样式，重新生成图层树，重新绘制。
* 优化：尽量少操作DOM，或者一次性操作；使用`display:none`，或者`documentFragment`；少触发强制布局。

## 说说浏览器和Node事件循环的区别

浏览器端的事件循环：

浏览器异步流程的处理模型，即浏览器底层有一个异步队列，当浏览器压栈执行代码的时候，如果需要暂时无法处理的任务，将会把任务放进异步队列中，等待压栈执行，如果执行时继续发现有无法执行的任务，将会继续把任务放进丢进异步队列中，重复此过程，其中浏览器端为保证一些任务的执行效率问题，将任务颗粒度细化为微任务和宏任务。

Node端的事件循环：

Node异步非阻塞I/O模型的基石，一共分为6个过程：
1. timers阶段
2. I/O callbacks阶段
3. idle,prepare阶段
4. poll阶段
5. check阶段
6. close callback阶段

## cookie和token都存放在header中，为什么不会劫持token？

CSRF安全问题的主要原因是，cookie会在浏览器请求cookie path匹配的请求时自动携带，属于浏览器默认行为，常会被用来冒用用户身份做一些敏感操作。而token放在header中属于业务行为，需要在业务代码中完成，如果是CSRF攻击伪造的单个请求将不会带上

## 浏览器缓存读取规则

* 强缓存：
  * HTTP 1.0: Expires
  * HTTP 1.1: Cache-Control
* 协商缓存
  * If-Modifies-Since/Last-Modify
  * If-None-Match/Etag

## 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？

* 资源请求可以跨域
* 

## 介绍下如何实现 token 加密

#### 为什么操作dom慢

* 渲染流水线很长

## 如何实现浏览器多个标签页之间的通信
* websocket
* localstorage
* postmessage

## 扫描二维码登录网页是什么原理

## display

## 实现一个宽高自适应的正方形

## 如何生成一次性链接