# :star:Generator函数：co模块浅析

## Thunk函数
说到co模块，首先我们要来看看Thunk函数：
>编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做Thunk函数。
## JavaScript 语言的 Thunk 函数
JavaScript 语言是传值调用，它的Thunk函数含义有所不同。**在JavaScript语言中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。**   
任何函数，只要参数有回调函数，就能写成Thunk函数的形式。下面是两段Thunk函数转换器。

* 一个简单的Thunk函数转换器。
```javascript
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};
```
使用上面的转换器，生成 fs.readFile 的 Thunk 函数。
```javascript
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
```
* tj的thunkify包
```javascript
function thunkify(fn){
  return function(){
    var args = new Array(arguments.length);
    var ctx = this;

    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function(done){
      var called;

      args.push(function(){
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
## Thunk函数的自动流程管理
Thunk函数真正的威力，在于可以自动执行Generator函数。

* 一个简单的Generator函数自动执行器
```javascript
function run(gen) {
  const g = gen();

  function next() {
    const r = g.next();
    if (r.done) return;
    r.value(next);
  }

  next();
}
```
## co 函数库的原理
为什么 co 可以自动执行Generator函数？

前面文章说过，Generator函数就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。
1. 回调函数。将异步操作包装成Thunk函数，在回调函数里面交回执行权。
2. Promise 对象。将异步操作包装成Promise对象，用then方法交回执行权。

`co函数库其实就是将两种自动执行器（Thunk函数和Promise对象），包装成一个库。`使用co的前提条件是，Generator函数的yield命令后面，只能是Thunk函数或Promise对象。
