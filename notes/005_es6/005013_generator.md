# :star:Generator函数：协议与语法
[[toc]]
## 概括：可迭代协议与迭代器协议

* **可迭代协议：**
要成为可迭代对象， 一个对象必须实现 `@@iterator` 方法。这意味着对象（或者它原型链上的某个对象）必须有一个键为 `@@iterator` 的属性，可通过常量 `Symbol.iterator` 访问该属性

|属性|值|
|-|-|
|`[Symbol.iterator]`|返回一个符合**迭代器协议**的对象的无参数函数。|

* **迭代器协议：**
只有实现了一个拥有以下语义（semantic）的 `next()` 方法，一个对象才能成为迭代器：

|属性|值|
|-|-|
|next| `next()`方法必须返回一个对象，该对象应当有两个属性： `done` 和 `value`，如果返回了一个非对象值（比如 `false` 或 `undefined`），则会抛出一个 `TypeError` 异常（`"iterator.next() returned a non-object value"`）。|

## Iterator接口与for...of
遍历器（Iterator）就是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
### for...of本质
`for...of`的本质是一个`while`循环，所以下面`for...of`代码实质上执行的是下面的`while`逻辑。
```js
const iterator = function* () {
  yield 1;
  yield 2;
  yield 3;
}();

// for...of
for (let item of iterator) {
  cosole.log(item);
}

// while
let step = iterator.next();
while(!step.done) {
  console.log(step.value);
  step = iterator.next();
}
```

### 原生具备Iterator接口的数据结构如下：
* `Array`
* `Map`
* `Set`
* `String`
* `TypedArray`
* 函数的`arguments`对象
* `NodeList`对象

### 调用Iterator的场合
* 解构赋值
* 扩展运算符
* `for...of`
* `yield*`
* `Array.from`
* `new Map`, `new WeakMap`, `new Set`, `new WeakMap`, `Promise.all`, `Promise.race`

### 对比for...of，for...in的缺点
* 数组的键名是数字，但是`for...in`循环是以字符串作为键名`“0”`、`“1”`、`“2”`等等。
* `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
* 某些情况下，`for...in`循环会以任意顺序遍历键名。

## Generator函数

### API
* `Generator.prototype.next()`：
  * 含义：返回一个由 `yield`表达式生成的值；
  * 返回值是一个对象，有`done`（`false`时可省略）和`value`属性（`done`为`true`时省略）；
  * 如果传入了参数，那么这个参数会传给上一条执行的`yield`语句左边的变量。
* `Generator.prototype.return()`：
  * 含义：返回给定的值并结束生成器；
  * 如果对已经处于“完成”状态的生成器调用`return(value)`，则生成器将保持在“完成”状态；
  * 如果没有提供参数，则返回对象的`value`属性与最后的`.next()`方法相同（`{value: undefined, done: true}`）；
  * 如果提供了参数，则参数将被设置为返回对象的`value`属性的值（`{value: ${value}, done: true}`）。
* `Generator.prototype.throw()`：
  * 含义：向生成器抛出一个错误；
  * 调用前必须先至少执行一次`.next()`；
  * 如果Generator函数状态改变之后即`done: true`，错误将不会被捕获；
  * 如果Generator函数内部没有`try...catch`块，错误将会冒泡到上层被外层的`try...catch`捕获；
  * `throw`方法被捕获以后，会附带执行下一条`yield`表达式。也就是说，会附带执行一次`next`方法。

### next()、throw()、return() 的共同点
`next()`、`throw()`、`return()`这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式。

### 示例

#### 生成器函数不能当构造器使用
会抛错`"TypeError: * is not a constructor"`

那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this？
```js
function* gen() {
  yield 'init';
  yield this.name = 'gen';
  yield this.getName = function() {return this.name;}
}

const g = gen();
g.next();
g.next();
g.next();
g.name // undefined
// ---------- 改造（1） ----------
// 通过改变generator函数的this指向，将属性方法挂载在指定对象上
const object = Object.create(null);
const g = gen.call(object);
g.next();
g.next();
g.next();
object.name; // 'gen'
// ---------- 改造（2） ----------
// 若果将传入的对象改为gen.prototype就可以将属性挂在原型对象上
const g = gen.call(gen.prototype);
g.next();
g.next();
g.next();
g.name; // 'gen'
```

#### yield*
一般是使用`yield`来返回Generator函数执行结果，但是如果用的是`yield*`，则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
```js
function* concat(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}
// 等同于
function* concat(iter1, iter2) {
  for(let item of iter1) {
    yield item;
  }
  for(let item of iter2) {
    yield item;
  }
}
```
上面代码说明，`yield*`后面的Generator函数（没有`return`语句时），不过是`for...of`的一种简写形式，完全可以用后者替代前者。

#### 快速部署Iterator接口
对于类似数组的对象（存在数值键名和`length`属性），部署`Iterator`接口，有一个简便方法，就是`Symbol.iterator`方法直接引用数组的`Iterator`接口。
```js
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

arrayLike[Symbol.iterator] = [][Symbol.iterator];

[...arrayLike]; // [1, 2, 3]
```
另外，使用`Array.from`方法也可以快速将其转为数组。

### 应用
* 使用 Generater 扁平化数组
```js
// 多维数组
const ins = [[1, 3, 2 ,[8, 9, 7]], [6, 5, 4]];

// ---------- 常规方式 ----------
function flat(array) {
  let res = [];
  for (let i = 0; i < array.length; i ++ ) {
    if (Array.isArray(array[i])) {
      res = res.concat(flat(array[i]));
    } else {
      res.push(array[i]);
    }
  }
  return res;
}

flat(ins);
// ---------- 通过Generator函数遍历 ----------
function* interArray(array) {
  for (let item of array) {
    if (Array.isArray(item)) {
      yield* interArray(item);
    } else {
      yield item;
    }
  }
}

// MDN
function* iterArr(arr) {
  if (Array.isArray(arr)) {
    for(let i=0; i < arr.length; i++) {
      yield* iterArr(arr[i]);
    }
  } else {
    yield arr;
  }
}

[...interArray(ins)]
```
* 利用 Generator 函数和for...of循环，实现斐波那契数列
```js
// ---------- 自己写的 ----------
// 错误的地方：相加的操作应该放在返回结果之后
function* Fibonacci() {
  let [first, second] = [0, 1];
  while(true) {
    // yield second;
    // [first, second] = [second, first + second];
    yield third = first + second;
    [first, second] = [second, third];
  }
}

for (let i of Fibonacci()) {
  console.log(i);
  if (i > 10000) {
    break;
  }
}

// ---------- 阮一峰 ----------
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

```

* 利用 Generator 函数为对象生成遍历器
```js
const obj = {
  a: 1,
  b: 2,
};

// 利用闭包
obj[Symbol.iterator] = function () {
  const obj = this;
  return {
    next() {
      let value = '';
      for (let key in obj) {
        value = obj[key]
      }
      return {
        value,
        done
      }
    }
  }
}

// 利用Generator函数
obj[Symbol.iterator] = function* () {
  for (let key in this) {
    yield obj[key];
  }
}
```
* yield*语句遍历完全二叉树
* 模拟的遍历器类
* 遍历器指针结构

### 生成器对象是一个可迭代对象还是一个迭代器？
生成器对象( `generator = function* (){}()` )对象既是一个可迭代对象又是一个迭代器：
1. `generator[Symbol.iterator]`存在且`generator[Symbol.iterator]() === generator` (可迭代对象)
2. `generator.next`存在 (迭代器)

