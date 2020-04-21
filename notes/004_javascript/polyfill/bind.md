# Function.prototype.bind's Polyfill

## Syntax

### `Function.prototype.bind()`

### Usage
```javascript
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

### Parameters

- `thisArg`   
调用绑定函数时作为`this`参数传递给目标函数的值。 如果使用`new`运算符构造绑定函数，则忽略该值。当使用`bind`在`setTimeout`中创建一个函数（作为回调提供）时，作为`thisArg`传递的任何原始值都将转换为`object`。如果没有提供绑定的参数，则执行作用域的`this`被视为新函数的`thisArg`。

- `arg1, arg2, ...`   
当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

### Return value
返回由指定的`this`值和初始化参数改造的原函数拷贝

---
## Polyfill
```javascript
Function.prototype._bind = function (thisArg, ...params) {
  // function = this
  const fn = this;

  return function (...args) {
    const allArgs = [...params, ...args];

    fn.apply(thisArg, allArgs);
  };

}
```



