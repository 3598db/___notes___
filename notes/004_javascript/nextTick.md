# 从EventLoop看Vue的nextTick
>关于JavaScript的`event loop`知识点，可阅读**JavaScript并发模型与Event Loop**，这里就不着重介绍。在此，再推荐一篇关于`event loop`的文章。

在对JavaScript的`event loop`有一定了解后，我们就来进入今天的主题，关于vue的`nextTick`。
在vue中，数据监测都是通过`Object.defineProperty`来重写里面的set和get方法实现的，vue更新DOM是异步的，每当观察到数据变化时，vue就开始一个队列，将同一事件循环内所有的数据变化缓存起来，等到下一次`event loop`，将会把队列清空，进行dom更新，内部使用的`microtask MutationObserver`来实现的。   
虽然数据驱动建议避免直接操作dom，但有时也不得不需要这样的操作，这时就该`Vue.nextTick(callback)`出场了，它接受一个回调函数，在dom更新完成后，这个回调函数就会被调用。不管是`vue.nextTick`还是`vue.prototype.$nextTick`都是直接用的`nextTick`这个闭包函数。

```javascript
export const nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc
  function nextTickHandler () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }
  //other code
})()
```
`callbacks`就是缓存的所有回调函数，`nextTickHandler`就是实际调用回调函数的地方。
```javascript
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve()
  var logError = err => { console.error(err) }
  timerFunc = () => {
    p.then(nextTickHandler).catch(logError)
    if (isIOS) setTimeout(noop)
  }
} else if (typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  var counter = 1
  var observer = new MutationObserver(nextTickHandler)
  var textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
} else {
  timeFunc = () => {
    setTimeout(nextTickHandle, 0)
  }
}
```
为让这个回调函数延迟执行，vue优先用`promise`来实现，其次是html5的`MutationObserver`，然后是`setTimeout`。前两者属于`microtask`，后一个属于`macrotask`。下面来看最后一部分
```javascript
return function queueNextTick(cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) cb.call(ctx)
    if (_resolve) _resolve(ctx)
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```
这就是我们真正调用的`nextTick`函数，在一个`event loop`内它会将调用`nextTick`的cb回调函数都放入`callbacks`中，`pending`用于判断是否有队列正在执行回调，例如有可能在`nextTick`中还有一个`nextTick`，此时就应该属于下一个循环了。最后几行代码是`promise`化，可以将`nextTick`按照`promise`方式去书写（暂且用的较少）。
`nextTick`就这么多行代码，但从代码里面可以更加充分的去理解`event loop`机制。

参考资料：https://juejin.im/post/59b499e86fb9a00a4e677825
