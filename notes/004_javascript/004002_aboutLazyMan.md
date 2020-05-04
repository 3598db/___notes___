# :memo:一个关于LazyMan的故事

其实很久之前都有接触到LazyMan，但是从来没放在心上，扫一眼也没有什么特别的，所有也没有仔细看过。但是昨天在做阿里面试题的时候，还是手写不出来，连往LazyMan那方面想的想法都没有，事后一想，这不就是个LazyMan吗？典型的眼高手低，还浪费了另一道题的时间，可以说教训非常惨痛。下面总结一下昨晚上今天对这道题的想法：
```js
/**
 * 实现一个EatMan
 * 说明：实现一个EatMan，EatMan可以有以下一些行为
 * 示例：
 *  1. EatMan(“Hank”)输出:
 *   Hi! This is Hank!
 *  2. EatMan(“Hank”).eat(“dinner”).eat(“supper”)输出
 *   Hi This is Hank!
 *   Eat dinner~
 *   Eat supper~
 *  3. EatMan(“Hank”).eat('dinner').eatFirst(“lunch”)输出
 *   Eat lunch~
 *   Hi This is Hank!
 *   Eat supper~
 *  4. EatMan(“Hank”).eat('dinner').eatFirst(“lunch”).eatFirst("breakfast")输出
 *   Eat breakfast~
 *   Eat lunch~
 *   Hi This is Hank!
 *   Eat supper~
 */

function EatMan(name){
　　return new _eatman(name);
}
function _eatman(name) {
  this.queue = [() => {
    console.log(`Hi This is ${name}!`);
  }];

  this.eat = function (what) {
    this.queue.push(() => {
      console.log(`Eat ${what}~`);
    });
    return this;
  }

  this.eatFirst = function (what) {
    this.queue.unshift(() => {
      console.log(`Eat ${what}~`);
    });
    return this;
  }

  // callQueue
  return (() => {
    setTimeout(() => {
      this.queue.forEach(fn => fn());
    });
    return this;
  })();
}
```
这个案例确实非常的简单，再换了一种思路后我三分钟就写出来了，其实到目前我还没有查过LazyMan到底是什么，只是心中有这样一个概念，是关于函数的延迟执行。下面给出另一个解法吧，当时一心想用koa中间件的思路，利用compose思路调整函数的执行顺序，钻这个牛角尖钻到死都没有写出来，可能是由于太久没有体验考试这种氛围，稍微有点手忙脚乱。确实蠢到家了。

---
这个案例暂时没有写出来，目前用例还是通过不了，我分析了一下，我当初的想法是想把微任务队列当成需要操作的队列，结果当实例化中的微任务被创建以后，再想往这个微任务队列前插入任务几乎不可能，所以走了死胡同出不来了。我目前还没有好的想法，这确实是一个牛角尖的思路，有一个比较挫的想法是实例化和每个方法的微任务创建都是异步的，放入宏任务队列，这样利用链式操作的过程中创建正确的Promise嵌套层级。这个思路再深入可能已经脱离这个问题点初衷了，后面针对Promise解法有好的想法再更新吧。

**失败的解法：**
```js
function EatMan(name){
　　return new _eatman(name);
}
function _eatman(name) {

  this.singlton = new Promise((resolve) => {
    console.log(`Hi This is ${name}!`);
    resolve();
  });

  this.eat = function (what) {
    this.singlton = this.singlton.then(() => {
      console.log(`Eat ${what}~`);
    });
    return this;
  }

  this.eatFirst = function (what) {
    this.before = new Promise((resolve) => {
      console.log(`Eat ${what}~`);
      resolve(this.singlton);
    });
    return this;
  }

  // callQueue
  return this;
}
```

---
今天更新

