# :star:浅析Array.prototype.reduce
[[toc]]
## API
```js
array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

## 实现
业务中最多使用这个方法竟然是数组求和:persevere:，按照自己的浅显理解做了个简单的polyfill：
```js
  Array.prototype._reduce = function (callback, initialValue) {
    const array = this;
    let index = 0;
    
    return (function recursion(acc) {
      while (index <= array.length - 1) {
        const current = callback(acc, array[index ++], index, array);
        return recursion(current);
      }

      return acc;
    })(initialValue);
  };
```

## 对运行机制的简单理解
可以看到实现里面核心代码其实也就是递归啦，所以对于常规代码，`reduce`可以看做是一次对数组的遍历，只是循环使用的是命令式的代码，`reduce`可以看做是循环的函数式实现吧，且迭代器的存储实际上不需要开放新的空间存储，显得更优雅了~
```js
let acc = null;
for (let i = 0; i < array.length; i ++) {
  acc = callback(acc, array[i], i array);
}
```


## 应用
实际上`reduce`的实际应用很多种。

先聊一个面试题，上周在面试涂鸦智能的时候有一道题是这样的，一个数组存放了不定长的`Promise`对象，要求：
1. 请求需要按照顺序执行；
2. 前一个返回结果之后才可以继续下一个请求；
3. 后一个`Promise`需要处理前一个`Promise`返回的数据。

当时电话中聊的，没有对数据结构和需求的直观认识，就聊了不定长数组的依次执行需要利用递归来做，结合`asyn/await`或者`promise.then`来处理，后面想想这种场景用数组的`reduce`也可以处理，毕竟万物皆可`reduce`。

```js
[
  Promise.resolve({index: 1}),
  Promise.resolve({index: 2}),
  Promise.resolve({index: 3}),
  Promise.resolve({index: 4}),
  Promise.resolve({index: 5})
]._reduce(async (acc, val) => {
  const before = await acc;
  const current = await val;
  console.log('---------- 业务处理 ---------')
  console.log(before, current);

  return current;
});

// expected output
/*
---------- 业务处理 ---------
undefined {index: 1}
---------- 业务处理 ---------
{index: 1} {index: 2}
---------- 业务处理 ---------
{index: 2} {index: 3}
---------- 业务处理 ---------
{index: 3} {index: 4}
---------- 业务处理 ---------
{index: 4} {index: 5}
*/

```

## 专业的Polyfill:smirk:（害怕
粘一下MDN上专业的实现~
```js
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0; 

      // Steps 3, 4, 5, 6, 7      
      var k = 0; 
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++; 
        }

        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i.  Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(
        //          callbackfn, undefined,
        //          « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}
```
