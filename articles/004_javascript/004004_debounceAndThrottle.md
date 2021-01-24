# :star:防抖与节流
[[toc]]
## Debounce - 防抖

以下是完善版本   
\-  **支持参数传递**   
\-  **修正this上下文**   
\-  **支持立即执行**   
\-  **支持取消**   

```javascript
function debounce(fn, timeout, immediate) {
  var timer, result;

  function debounced() {
    var args = [].slice.call(arguments);
    var _this = this;

    if (timer) clearTimeout(timer);

    if (immediate) {
      var callNow = !timer;
      
      // 此处主要还是控制timeout时间内不可
      // 以重复immediate触发
      timer = setTimeout(function () {
        timer = null;
      }, timeout);

      if (callNow) result = fn.apply(_this, args);
    } else {
      timer = setTimeout(function () {
        fn.apply(_this, args);
      }, timeout);
    }

    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
};
```

## throttle - 节流

### 时间戳实现
```javascript
function throttle(fn, wait) {
  var prev = 0;
  return function () {
    var now = new Date().getTime();
    var args = [].slice.call(arguments);

    if (now - prev > wait) {
      fn.apply(this, args);
      prev = now;
    }
  };
}
```

### 定时器实现
```javascript
function throttle(fn, wait) {
  var timer;
  return function () {
    var args = [].slice.call(arguments);
    var _this = this;
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;

        fn.apply(_this, args);
      }, wait);
    }
  }

}
```

### 专业版本
```js
function throttle(fn, delay, atleast) {
  let timer = null;
  let previous = null;
  return function() {
    let context = this, args = arguments;
    let now = +new Date();
    if (!previous) previous = now;
    if (now - previous < atleast) {
      fn.apply(context, args);
      previous = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    }
  }
}
```