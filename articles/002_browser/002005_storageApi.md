# :star:LocalStorage & SessionStorage API
[[toc]]
## storage
作为 Web Storage API 的接口，Storage 提供了访问特定域名下的会话存储或本地存储的功能，例如，可以添加、修改或删除存储的数据项。

如果你想要操作一个域名的会话存储，可以使用 Window.sessionStorage；如果想要操作一个域名的本地存储，可以使用 Window.localStorage。

## 属性
### Storage.length 只读
返回一个整数，表示存储在 Storage 对象中的数据项数量。

## 方法
### Storage.key()
该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名。

### Storage.getItem()
该方法接受一个键名作为参数，返回键名对应的值。

### Storage.setItem()
该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。

### Storage.removeItem()
该方法接受一个键名作为参数，并把该键名从存储中删除。

### Storage.clear()
调用该方法会清空存储中的所有键名。

## 示例
### 通过StorageEvent响应存储的变化
无论何时，Storage 对象发生变化时（即创建/更新/删除数据项时，重复设置相同的键值不会触发该事件，Storage.clear() 方法至多触发一次该事件），StorageEvent事件会触发。**在同一个页面内发生的改变不会起作用**——在相同域名下的其他页面（如一个新标签或 iframe）发生的改变才会起作用。在其他域名下的页面不能访问相同的 Storage 对象。

在事件结果页面中的 JavaScript 如下所示（可见 events.js）：
```js
window.addEventListener('storage', function(e) {  
  document.querySelector('.my-key').textContent = e.key;
  document.querySelector('.my-old').textContent = e.oldValue;
  document.querySelector('.my-new').textContent = e.newValue;
  document.querySelector('.my-url').textContent = e.url;
  document.querySelector('.my-storage').textContent = e.storageArea;
});
```
这里，我们为 window 对象添加了一个事件监听器，在当前域名相关的 Storage 对象发生改变时该事件监听器会触发。正如你在上面看到的，此事件相关的事件对象有多个属性包含了有用的信息——改变的数据项的键，改变前的旧值，改变后的新值，改变的存储对象所在的文档的 URL，以及存储对象本身。
