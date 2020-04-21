# call&apply's Polyfill

## Syntax
---
### `Function.prototype.call()`

### Usage
```javascript
fun.call(thisArg, arg1, arg2, ...)
```

### Parameters
- `thisArg`   
在`fun`函数运行时指定的`this`值。需要注意的是，指定的`this`值并不一定是该函数执行时真正的`this`值，如果这个函数处于非严格模式下，则指定为`null`和`undefined`的`this`值会自动指向全局对象(浏览器中就是`window`对象)，同时值为原始值(数字，字符串，布尔值)的`this`会指向该原始值的自动包装对象。

- `arg1, arg2, ...`   
指定的参数列表。

### Return value
返回值是你调用的方法的返回值，若该方法没有返回值，则返回`undefined`。

---
### `Function.prototype.apply()`

### Usage
```javascript
func.apply(thisArg, [argsArray])
```

### Parameters
- `thisArg`   
可选的。在`func`函数运行时使用的`this`值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为`null`或`undefined`时会自动替换为指向全局对象，原始值会被包装。
- `argsArray`   
可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给`func`函数。如果该参数的值为`null`或 `undefined`，则表示不需要传入任何参数。从ECMAScript 5开始可以使用类数组对象。

### Return value
调用有指定`this`值和参数的函数的结果。

---
## Polyfill

```javascript
// call
Function.prototype._call = function (context, ...params) {
  if (typeof context === 'object') {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...params);
  delete context.fn;

  return result;
}

// apply
Function.prototype._apply = function(context, parameter) {
  if (typeof context === 'object') {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...parameter);
  delete context[fn];

  return result;
}

```
