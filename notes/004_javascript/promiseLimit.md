# :star:Promise并发控制
[[toc]]
## 用法
```js
const pLimit = require('p-limit');

const limit = pLimit(1);

const input = [
	limit(() => fetchSomething('foo')),
	limit(() => fetchSomething('bar')),
	limit(() => doSomething())
];

(async () => {
	// Only one promise is run at once
	const result = await Promise.all(input);
	console.log(result);
})();
```
通过调用pLimit方法传入并发限制参数得到一个limit函数，再通过limit包装回调函数的方式返回一个Promise对象，看起来和Promise对象一样使用，可以正常触发Promise.all方法。

## 主要实现思路分析
如果需要实现限制有限个Promise并发，首先需要考虑是是Promise实例化的问题，因为如果Promise实例化内容是同步的，如果所有的Promise被同步执行，控制并发也无从谈起。所以pLimit主要做的就是接管Promise的实例化，将Promise实例化与任务执行等一系列任务封装在一个惰性函数中，通过活动对象数量标记，超出数量的任务在队列内等待，后续如果有空间，任务直接出队执行，实例化Promise。利用这样一种方式，从而一定程度时候上控制Promise的“并发数量”。

## 简化代码
```js
const pLimit = function (concurrency) {

  // 对concurrency边界情况进行处理 我们假设concurrency没有问题

  // 队列
  const queue = [];
  // 活跃状态的Promise个数
  const activeCount = 0;

  // 出队一个run封装函数并执行
  const next = function () {
    activeCount --;

    if (queue.length) {
      queue.shift()(); 
    }
  }

  // Promise生成器
  const run = function (fn, resolve, ...args) {
    // 活跃对象+1
    activeCount ++;

    // Promise实例化
    const result = new Promise(() => {
      return fn(...args);
    });

    // 利用值穿透传递结果
    resolve(result);

    // 执行完毕之后活跃对象-1 并执行下一个
    result.then(next, next);
  }

  // 任务入队
  const enqueue = function (fn, resolve, ...args) {
    // 如果没有达到限制数量 直接执行
    if (activeCount < concurrency) {
      run(fn, resolve, ...args);
    // 如果超出限制数量 入队等待执行
    } else {
      queue.push(run.bind(null, fn, resolve, ...args););
    }
  }

  // 显式返回一个Promise对象
  // 并将resolve方法传入 用于穿透传值
  const generator = function (fn, ...args) {
    return new Promise((resolve) => {
     enqueue(fn, resolve, ...args);
    })
  };

  return generator;
}
```