# :star:Generator函数：异步应用
[[toc]]
## thunk函数

### 在传名调用中的用法
```js
function a(x) {
  return x * 2;
}

a(x + 5);

// thunk函数

function thunk(x) {
  return x + 5;
}

function a(x) {
  return thunk(x) * 2;
}
```

### JS中的用法
```js
// js thunk
fs.readFile(fileName, callback);

function readFile(fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  }
}
```

## thunkify工具函数
```js
// thunkify
function thunkify(fn) {
  return function () {
    return function () {
      const args = [].slice.call(arguments);
      return function (callback) {
        args.push(callback);
        return fn.apply(null, args);
      }
    }
  }
}
```

## thunkify包源码
```js
// thunkify package
// 确保done函数只执行一次
function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
```

## generator函数的自动执行
```js
// generator auto exec

function* g() {
  // ...
}

function autoExec() {
  const g = g();
  let s = g.next();

  while (!s.done) {
    s = g.next();
  }

}  
```

## thunk函数实现generator函数自动执行
```js
function sum(a, b, callback){
  const _ = a + b;
  console.log(_);
  return callback(_);
}

function* gen() {
  yield thunkify(sum)()(1, 2);
  yield thunkify(sum)()(2, 3);
  yield thunkify(sum)()(3, 4);
}

function run(gen) {
  const g = gen();

  const next = function () {
    let res = g.next();
    if (!res.done) {
      res.value(next);
    }
  };

  next();
}

run(gen);
```

## promise实现generator函数自动执行
```
```






