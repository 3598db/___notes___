# compose

* 面向过程
* 函数组合(reduce)
* 函数交织(aop)
* Promise(sequence)
* Generator(yield)

# 什么是compose
compose就是执行一系列的任务,如果有一个任务队列,就是从队头开始一次执行队列中的任务

* 第一个函数是多元的(接受多个参数),后面的函数都是单元的(接受一个参数)
* 执行顺序的自右向左的
* 所有函数的执行都是同步的

1. 面向过程
```js
const compose = function (...fns) {
    const fn = fns.pop();
    return function (..._args) {
        let result = fn.apply(null, _args);
          let _fn = null;

          while (fns.length > 0) {
               _fn = fns.pop();
               result = _fn(result);
          }  
          return result;
    }
}
```
2. 函数组合
```js
const compose = function (...fns) {
    return function (...args) {
          return fns.reverse().reduce(function (acc, fn) {
               return fn(acc.apply(null, args));
          }, fns.shift())
     }
}
```
3. aop

4. Promise
```js
const compose = function (...fns) {
    return function (...args) {
          return fns.reverse().reduce(function (acc, fn) {
              return acc.then(res => fn(res));
         }, Promise.resolve(fns.shift().apply(null, args)))
     }
}
```

5. Generator
```js
function* genFunc(fns, ...args) {
    let result = fns.pop()(...args);
    while (fns.length > 0) {
          result = yield fns.pop()(result);
     }
}

function compose(...fns) {
    return function (...args) {
          let gen = genFunc(fns, ...args);
          let res = null;
           let value = null;
          while (!res.done) {
               res = gen.next(value);
               !res.done && (value = res.value);
          }
          return value;
     }
}
```
