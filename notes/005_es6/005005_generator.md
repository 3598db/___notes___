# :star:Generator函数：异步应用
[[toc]]
## thunk函数
编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做Thunk函数。
### 在传名调用中的用法
```js
function a(x) {
  return x * 2;
}

a(x + 5);

// thunk函数
function thunk() {
  return x + 5;
}

function a(thunk) {
  return thunk() * 2;
}
```

### JS中的用法
JavaScript语言是传值调用，它的Thunk函数含义有所不同。在JavaScript语言中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。
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
任何函数，只要参数有回调函数，就能写成Thunk函数的形式。
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
下面提供了一种generator函数自动执行的思路，只要在持续循环的过程中检查generator函数是否执行完，如果没有执行完，就持续调用generator迭代器的`next`方法，
```js
function* gen() {
  yield (function () {
    console.log(1);
  }())
  yield (function () {
    console.log(2);
  }())
  yield (function () {
    console.log(3);
  }())
}

function run(gen) {
  const g = gen();
  let s = g.next();

  while (!s.done) {
    s = g.next();
  }
}

run(genAsync); // 1, 2, 3
```
但这种方式只能针对同步流程，如果涉及到异步任务，就无法保证执行流程的顺序。
```js
function* genAsync() {
  yield setTimeout(() => {
    console.log(1);
  }, 3000);
  yield setTimeout(() => {
    console.log(2);
  }, 2000);
  yield setTimeout(() => {
    console.log(3);
  }, 1000);
}

run(genAsync); // 3, 2, 1
```

## thunk函数实现generator函数自动执行
针对generator函数的执行流程控制，最主要的是调用generator迭代器`next`方法调用的时机，而thunk函数刚好合适。
```js
// 求和函数
function sum(a, b, callback){
  const result = a + b;
  console.log(result);
  return callback(result);
}

// generator函数 yield函数后面必须要跟一个thunk函数，此thunk函数暴露
// 一个函数用来接收callback函数。只要我们在自动执行器中为thunk函数封装
// 一个回调函数来调用generator迭代器的next方法，即可以保证generator函
// 数的正确执行顺序。
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
控制generator迭代器`next`函数执行时机，还有另外一个方式，就是使用Promise对象。
```js
function* gen() {
  yield Promise.resolve({name: 'a'});
  yield Promise.resolve({name: 'b'});
  yield Promise.resolve({name: 'c'});
}

// 与thunk函数实现有点相似，主要还是需要在正确的时机调用迭代器的next方法
// 只是thunk函数使用是回调函数，而promise使用的是then链
function run(gen) {
  const g = gen();
  function next() {
    const p = g.next();
    if (!p.done) {
      p.value.then(() => {
        next();
      });
    }
  }

  next();
}

run(gen);
```

## 对thunk函数、promise对象实现generator自动执行的简单理解
如果在自动执行generator函数的时候遇到异步任务，为了能保证流程前后执行的顺序，特别需要考虑的就是迭代器`next`方法的调用时机。当然最好的调用时机就是在异步任务结束之后。仔细看上面两种实现方式，调用`next`方法的时机一种是回调，一种是promise对象的`then`方法，这两种都是js处理异步问题的经典方案。如果使用的是thunk方案，需要用`yield`命令返回一个thunk函数，这样就可以通过构造callback函数的方式，在合适的时机调用`next`方法，同理如果使用的是promise方案，则需要通过`yield`命令返回promise对象，这样就可以通过`then`链构造类似于回调函数的操作。所以递归以上操作即可以完成generator函数的自动执行。




