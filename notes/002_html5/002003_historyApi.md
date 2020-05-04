# :star:History API
[[toc]]
## API

### 向前和向后跳转
* `window.history.back()`
* `window.history.forward()`

### 跳转到 history 中指定的一个点

* `window.history.go(-1)` = `window.history.back()`
* `window.history.go(1)`  = `window.history.forward()`

### 历史堆栈中页面的数量
* `window.history.length;` 

### 添加和修改历史记录中的条目
* `window.history.pushState()`
* `window.history.replaceState()`

> 使用 history.pushState() 可以改变referrer，它在用户发送 XMLHttpRequest 请求时在HTTP头部使用，改变state后创建的 XMLHttpRequest 对象的referrer都会被改变。因为referrer是标识创建  XMLHttpRequest 对象时 this 所代表的window对象中document的URL。


### `pushState(状态对象, [标题], [URL])`
* 状态对象 — 状态对象state是一个JavaScript对象，通过pushState() 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate事件就会被触发，且该事件的state属性包含该历史记录条目状态对象的副本。
状态对象可以是能被序列化的任何东西。原因在于Firefox将状态对象保存在用户的磁盘上，以便在用户重启浏览器时使用，我们规定了状态对象在序列化表示后有640k的大小限制。如果你给 pushState() 方法传了一个序列化后大于640k的状态对象，该方法会抛出异常。如果你需要更大的空间，建议使用 sessionStorage 以及 localStorage.

* 标题 — Firefox 目前忽略这个参数，但未来可能会用到。在此处传一个空字符串应该可以安全的防范未来这个方法的更改。或者，你可以为跳转的state传递一个短标题。

* URL — 该参数定义了新的历史URL记录。注意，调用 pushState() 后浏览器并不会立即加载这个URL，但可能会在稍后某些情况下加载这个URL，比如在用户重新打开浏览器时。新URL不必须为绝对路径。如果新URL是相对路径，那么它将被作为相对于当前URL处理。新URL必须与当前URL同源，否则 pushState() 会抛出一个异常。该参数是可选的，缺省为当前URL。

> 注意 pushState() 绝对不会触发 hashchange 事件，即使新的URL与旧的URL仅哈希不同也是如此。

### `replaceState(状态对象, [标题], [URL])`
history.replaceState() 的使用与 history.pushState() 非常相似，区别在于  replaceState()  是修改了当前的历史记录项而不是新建一个。 **注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项。** （全局浏览器历史记录中会出现新的历史记录，replaceState只是针对当前历史记录，具体表现为back()和forward()的时候并不会出现替换前的历史记录）

replaceState() 的使用场景在于为了响应用户操作，你想要更新状态对象state或者当前历史记录的URL。

### `popstate` 事件回调
window.onpopstate是popstate事件在window对象上的事件处理程序.

每当处于激活状态的历史记录条目发生变化时,popstate事件就会在对应window对象上触发. 如果当前处于激活状态的历史记录条目是由history.pushState()方法创建,或者由history.replaceState()方法修改过的, 则popstate事件对象的state属性包含了这个历史记录条目的state对象的一个拷贝.

调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法).

当网页加载时,各浏览器对popstate事件是否触发有不同的表现,Chrome 和 Safari会触发popstate事件, 而Firefox不会.
```js
window.onpopstate = function(event) {
  debugger;
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
//绑定事件处理函数. 
history.pushState({page: 1}, "title 1", "?page=1");    //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({page: 2}, "title 2", "?page=2");    //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.replaceState({page: 3}, "title 3", "?page=3"); //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 弹出 "location: http://example.com/example.html, state: null
history.go(2);  // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```

### 获取当前状态
`history.state`
