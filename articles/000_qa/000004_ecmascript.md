# :thinking:ECMAScript

[[toc]]

## 实现原生ajax

## 比如在代码中有a.addEventListener('click', fn1), a.addEventListener('click', fn2)这个时候fn1和fn2会执行吗，假如加上说阻止冒泡呢

## 如何实现点击元素外部关闭元素

## offsetTop和scrollTop和scrollHeight分别代表什么

## 前端如何做权限控制

## cookie有哪些属性

## 模块化（AMD， CMD，CommonJS，ES Module，webpack）对比

## cookie,session,localstorage,sessionstorage有什么区别

## 怎么禁止js访问cookie

## v8引擎 如何执行 js 代码

## AST 以及 AST 有啥应用 (babel/ Tree-shaking 以及之前有人用 AST 来实现 微信小程序动态执行代码)

## img标签间距问题的原理以及如何解决

## Base64 的原理？编码后比编码前是大了还是小了。

## setTimeout的原理

## Javascript中的执行上下文和执行栈

### 执行上下文

执行JavaScrip代码的环境的抽象概念，每当 Javascript 代码在运行的时候，它都是在执行上下文中运行。

### 执行上下文的类型：
* 全局执行上下文
* 函数执行上下文
* Eval函数执行上下文

### 执行栈：
执行栈，也就是在其它编程语言中所说的“调用栈”，是一种拥有 LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。

### Js代码执行过程：
当JavaScript引擎第一次遇到脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部。引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。

### 执行上下文的创建：

#### 1. 创建阶段

1). this绑定  
2). 创建词法环境组件  
3). 创建变量环境组件  

**this绑定**

确定this的值

**词法环境**

词法环境是一种标识符-变量映射的结构。其中包含两个组件：（1）环境记录器（2）外部环境引用

* 环境记录器：是存储变量和函数声明的实际位置
* 外部环境的引用：意味着它可以访问其父级的词法环境

词法环境有两种类型：

* **全局环境**（在全局执行上下文中）是没有外部环境引用的词法环境。全局环境的外部环境引用是 null。它拥有内建的 Object/Array/等、在环境记录器内的原型函数（关联全局对象，比如 window 对象）还有任何用户定义的全局变量，并且 this的值指向全局对象。
* 在**函数环境**中，函数内部用户定义的变量存储在环境记录器中。并且引用的外部环境可能是全局环境，或者任何包含此内部函数的外部函数。

环境记录器也有两种类型：

* **声明式环境记录器**存储变量、函数和参数。
* **对象环境记录器**用来定义出现在全局上下文中的变量和函数的关系。

简而言之，

* 在全局环境中，环境记录器是对象环境记录器。
* 在函数环境中，环境记录器是声明式环境记录器。

>注意：对于函数环境，声明式环境记录器还包含了一个传递给函数的 arguments 对象（此对象存储索引和参数的映射）和传递给函数的参数的 length。

词法环境在伪代码中看起来像这样：
```js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
    }
    outer: <null>
  }
}

FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
    }
    outer: <Global or outer function environment reference>
  }
}
```

**变量环境**
变量环境同样是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。所以它有着上面定义的词法环境的所有属性。在 ES6 中，词法环境组件和变量环境的一个不同就是前者被用来存储函数声明和变量（let 和 const）绑定，而后者只用来存储 var 变量绑定。

我们看点样例代码来理解上面的概念：
```js
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
 var g = 20;
 return e * f * g;
}

c = multiply(20, 30);
```
执行上下文看起来像这样：
```js
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      c: undefined,
    }
    outer: <null>
  }
}

FunctionExectionContext = {
  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>
  }
}
```

关于声明提升：
可能你已经注意到let和const定义的变量并没有关联任何值，但var定义的变量被设成了undefined。这是因为在创建阶段时，引擎检查代码找出变量和函数声明，虽然函数声明完全存储在环境中，但是变量最初设置为 undefined（var 情况下），或者未初始化（let 和 const 情况下）。这就是为什么你可以在声明之前访问 var 定义的变量（虽然是 undefined），但是在声明之前访问 let 和 const 的变量会得到一个引用错误。这就是我们说的变量声明提升。

#### 2. 执行阶段
完成对所有这些变量的分配，最后执行代码。

>注意：在执行阶段，如果JavaScript引擎不能在源码中声明的实际位置找到let变量的值，它会被赋值为undefined。

#### 3. 作用域链
当JavaScript在运行的时候，它需要一些空间让它来存储本地变量（local variables）。我们将这些空间称为作用域对象（Scope object），有时候也称作LexicalEnvironment。例如，当你调用函数时，函数定义了一些本地变量，这些变量就被存储在一个作用域对象中。你可以将作用域函数想象成一个普通的JavaScript对象，但是有一个很大的区别就是你不能够直接在JavaScript当中直接获取这个对象。你只可以修改这个对象的属性，但是你不能够获取这个对象的引用。

作用域对象的概念使得JavaScript和C、C++非常不同。在C、C++中，本地变量被保存在栈（stack）中。在JavaScript中，作用域对象是在堆中被创建的（至少表现出来的行为是这样的），所以在函数返回后它们也还是能够被访问到而不被销毁。

正如你做想的，作用域对象是可以有父作用域对象（parent scope object）的。当代码试图访问一个变量的时候，解释器将在当前的作用域对象中查找这个属性。如果这个属性不存在，那么解释器就会在父作用域对象中查找这个属性。就这样，一直向父作用域对象查找，直到找到该属性或者再也没有父作用域对象。我们将这个查找变量的过程中所经过的作用域对象称作作用域链（Scope chain）。

在作用域链中查找变量的过程和原型继承（prototypal inheritance）有着非常相似之处。但是，非常不一样的地方在于，当你在原型链（prototype chain）中找不到一个属性的时候，并不会引发一个错误，而是会得到undefined。但是如果你试图访问一个作用域链中不存在的属性的话，你就会得到一个ReferenceError。

在作用域链的最顶层的元素就是全局对象（Global Object）了。运行在全局环境的JavaScript代码中，作用域链始终只含有一个元素，那就是全局对象。所以，当你在全局环境中定义变量的时候，它们就会被定义到全局对象中。当函数被调用的时候，作用域链就会包含多个作用域对象。

#### 4. this指向
* **new绑定**   
当函数使用new调用的时候，指向新创建的这个对象。
* **显式绑定**   
当使用call, apply时候传入的第一个参数作为this的指向，但如果传入的参数是null，就应用默认绑定规则；如果使用bind, 返回的新函数的this指向传入bind的第一个参数。
* **隐式绑定**   
当函数作为另一个对象的方法来调用的时候，this就指向这个对象；这种情况下要留意绑定丢失，当把一个对象的方法作为值赋值给另一个变量或者作为参数进行传递时，就会发生绑定丢失，从而应用默认绑定规则；如果通过多个object来链式调用这个函数，以最后一个obj为准，比如`a.b.fn()`，fn的this指向的是b。
* **默认绑定**   
函数单独调用，如果函数运行在严格模式下this就绑定到undefined，非严格模式下就绑定到window对象。注意这里的严格模式是指函数内部；而不是函数上层作用域。
* **箭头函数**   
箭头函数没有自己的this，箭头函数的this继承了上层函数的this指向。

## setTimeout、Promise、Async/Await 的区别

## Async/Await如何通过同步的方式实现异步

## JS异步解决方案的发展历程以及优缺点

## Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

## ['1', '2', '3'].map(parseInt) what & why ?

## 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

## ES5/ES6 的继承除了写法以外还有什么区别？

## 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣
>Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()

## 介绍模块化发展历程

## 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

## 下面的代码打印什么内容，为什么？
```js
var b = 10;
(function b(){
  b = 20;
  console.log(b); 
})();
```

## 简单改造下面的代码，使之分别打印 10 和 20。
```js
var b = 10;
(function b(){
  b = 20;
  console.log(b); 
})();
```

## 下面代码输出什么
```js
var a = 10;
(function () {
  console.log(a)
  a = 5
  console.log(window.a)
  var a = 20;
  console.log(a)
})()
```

## 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

## 输出以下代码执行的结果并解释为什么
```js
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

## call 和 apply 的区别是什么，哪个性能更好一些

## 输出以下代码的执行结果并解释为什么
```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x)     
console.log(b.x)
```

## 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

## a.b.c.d 和 a['b']['c']['d']，哪个性能更高？

## ES6 代码转成 ES5 代码的实现思路是什么

## 为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因。

## 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少

## 输出以下代码运行结果
```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

// ---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);

// ---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);
```

## input 搜索如何防抖，如何处理中文输入

## var、let 和 const 区别的实现原理是什么

## 介绍下前端加密的常见场景和方法

## 写出如下代码的打印结果
```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

## 请写出如下代码的打印结果
```js
function Foo() {
  Foo.a = function() {
    console.log(1)
  }

  this.a = function() {
    console.log(2)
  }
}

Foo.prototype.a = function() {
  console.log(3)
}

Foo.a = function() {
  console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

## 分别写出如下代码的返回值
```js
String('11') == new String('11');
String('11') === new String('11');
```

## 请写出如下代码的打印结果
```js
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  var name = 'Jack';
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();
```

## 扩展题，请写出如下代码的打印结果
```js
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  name = 'Jack';
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();
```

## 输出以下代码运行结果
```js
1 + "1"

2 * "2"

[1, 2] + [2, 1]

"a" + + "b"
```

## 为什么 for 循环嵌套顺序会影响性能？
```js
var t1 = new Date().getTime()
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 10000; k++) {
    }
  }
}
var t2 = new Date().getTime()
console.log('first time', t2 - t1)

for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 100; k++) {

    }
  }
}
var t3 = new Date().getTime()
console.log('two time', t3 - t2)
```

## 输出以下代码执行结果
```js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();
```

## 输出以下代码执行结果，大致时间就好（不同于上题）
```js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd();
}
main();
```

## 如何实现骨架屏，说说你的思路

## isNaN & Number.isNaN

## Object.is & == & ===

## 解释下 Prototypal Inheritance 与 Classical Inheritance 的区别

## JavaScript 中数组是如何存储的？

解题思路
* 同种类型数据的数组分配连续的内存空间
* 存在非同种类型数据的数组使用哈希映射分配内存空间
温馨提示：可以想象一下连续的内存空间只需要根据索引（指针）直接计算存储位置即可。如果是哈希映射那么首先需要计算索引值，然后如果索引值有冲突的场景下还需要进行二次查找（需要知道哈希的存储方式）。

可能追加的面试题
* JavaScript 中的数组为什么可以不需要分配固定的内存空间？
* JavaScript 中数组的存储和 C / C++ / Java 中数组的存储有什么区别？
* JavaScript 中数组是否可以理解为特殊的对象？
* JavaScript 中数组和 C / C++ / Java 中数组存储在性能上有什么区别？
* JavaScript 中的 Array 和 Node.js 中的 Buffer 有什么区别？
* JavaScript 中的数组何时是连续存储的，何时是哈希存储的？
* 哈希存储的键冲突（散列碰撞）可以有哪些解决方案（开链法、线性探测法、红黑树等）？

## 聊聊继承以及说说 ES5 和 ES6 继承的区别？

## 说说对原生 JavaScript 的理解？

解题思路
* JavaScript 实现包含的几个部分
* JavaScript 的语言类型特性
* 解释性脚本语言（对标编译性脚本语言）
* 面向对象（面向过程）
* 事件驱动 / 异步 IO
* 缺少的关键性功能等（块级作用域 、模块、子类型等）

## 谈谈你对 TypeScript 的理解？

解题思路
* 类型批注和编译时类型检查
* 类
* 接口
* 模块
* 装饰器
* 声明文件（类似于 C 中的头文件）
* 对 ES6 的支持
* 语法提示
* ESLint（TSLint 不推荐）

## JavaScript 中几种迭代语法在 Chrome 等现代浏览器中的性能差异？

解题思路
* 考察 for、for...of、for...in、forEach、while、do...while等
* 可以使用 console.time 和 console.timeEnd 进行测试
* 注意现代浏览器多次执行的性能优化问题
* ++ 和 -- 有没有区别
* 遍历的时候是否存在查找原型链的过程

可能追加的面试题
* 字面量 / 数组 / 对象存储性能有没有什么区别？
* 条件比较多的时候 if-else 和 switch 性能哪个高？
* 高性能的 JavaScript 开发在语法层面你觉得有哪些可以提升性能？
* 如何在代码中减少迭代次数？
* 如何实现一个 Duff 装置？

## 如何提升 JavaScript 变量的存储性能？

解题思路
* 访问字面量和局部变量的速度最快，访问数组元素和对象成员相对较慢
* 由于局部变量存在于作用域链的起始位置，因此访问局部变量比访问跨作用域变量更快，全局变量的访问速度最慢
* 避免使用with和catch，除非是有必要的情况下
* 嵌套的对象成员会明显影响性能，尽量少用，例如window.loacation.href
* 属性和方法在原型链中的位置越深，则访问它的速度也越慢
* 通常来说，需要访问多次的对象成员、数组元素、跨作用域变量可以保存在局部变量中从而提升 JavaScript 执行效率

## 浏览器和 Node.js 的事件循环机制有什么区别？

## 比较一下 TypeScript 和 JavaScript，在什么情况下你觉得需要 TypeScript ?

## 在 JavaScript 中如何实现对象的私有属性?

## async / await 和 Promise 的区别?

## 在 JavaScript 可以有哪几种形式实现继承，各有什么优缺点？

## 防抖函数
在n秒内函数只被执行一次，如果在这个时间内再次被触发，则需要再次计算时间。

**应用场景：**
1. 文本输入框的验证，输入完成之后验证一次即可，不需要每次都发请求验证。
2. size/scroll的触发统计事件。

**实现：**
```javascript
/**
 * 节流函数
 * @param fn 延迟执行函数
 * @param delay 延迟时间
 * @param immediate 是否是立即执行
 */
function debounce(fn, delay, immediate) {
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    let result = undefined;
    timer && clearTimeout(timer);

    if (immediate) {
      const doNow = !timer;

      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (doNow) {
        result = fn.apply(context, args);
      }
    }
    else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
    return result;
  };
}
```
## 节流函数
节流函数和防抖函数一样，都是用于处理高频事件的，优化性能。节流函数是在规定时间段内只执行一次。

**应用场景：**
1. 鼠标点击
2. 拖拽功能
3. 搜索联想

**实现：**
```javascript
/**
 * 节流函数
 * @param fn 延迟执行函数
 * @param delay 延迟时间
 * @param atleast 规定多长时间触发一次
 */
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

## 上下文栈
上下文栈是存放执行环境的。执行环境定义了变量和函数能够访问的其他数据(存储在这个执行环境的变量对象上)，主要分为全局执行环境和函数执行环境。当执行到一个函数的时候就会将这个函数的执行环境压入这个执行栈，当函数执行完成，将就这个这个执行环境出栈，回到上层的执行环境。
* 全局执行环境是栈最底部的一个执行环境，只会在应用程序退出（关闭网页或者浏览器）的时候才会退出
* 局部执行环境里面的代码执行完成了就出栈了，并且被销毁了

## 作用域链
对于每个执行上下文，都有三个重要属性：

1. 确定 this 的值，也被称为 This Binding；
2. LexicalEnvironment（词法环境）组件被创建（作用域链）；
3. VariableEnvironment（变量环境）组件被创建。

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

每个执行环境都会有一个变量对象，用来存储这个环境中声明的变量或者函数。在上下文栈中执行的各个环境之间的变量对象之间会创建一个关系（作用域链）。在当前执行环境中的代码可以访问当前这个变量对象或者变量对象向上关联的变量对象直到全局变量对象上存储的变量和函数。

简而言之：作用域是变量查找的规则，作用域链定义了变量可以查找的范围。变量查找只能从当前作用域开始向上查找而不能向下, 并且变量的查找具有遮蔽效应，在作用域链上进行向上查找的时候，最先找到的同名变量会遮蔽更上层作用域链中的同名变量。

## 闭包
无论通过何种方式将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。   
如果一个函数在创建它的词法作用域之外执行，就会保持对当前词法作用域的引用，就会产生闭包。   
本质上无论何时何地，如果将（访问它们各自词法作用域的）函数当做第一级的值类型到处传递，你就会看到闭包在这些函数中的应用。

关于词法作用域：简单的说，词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况是这样的）。

JavaScript采用的是词法作用域，也就是函数可以访问的变量在函数定义时写在哪里就确定了和函数被调用的位置无关。闭包就是函数不在定义的词法作用域内被调用，但是仍然可以访问词法作用域中定义的变量。

函数f 执行上下文维护了一个作用域链，会指向指向checkscope作用域，作用域链是一个数组，结构如下。
```javascript
fContext = {
  Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
```
所以指向关系是当前作用域 --> checkscope作用域--> 全局作用域，即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO（活动对象） 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，这就是闭包实现的关键。

闭包的用处：
* 实现模块化
* 实现属性的私有化

## 函数柯里化

## 内存泄漏
常见的内存泄漏
1. 意外的全局变量
2. 被遗忘的计时器或回调函数
3. 闭包

## 继承

### 1、原型链继承
构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针。

继承的本质就是复制，即重写原型对象，代之以一个新类型的实例。
```javascript
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
}

function SubType() {
  this.subproperty = false;
}

// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType(); 

SubType.prototype.getSubValue = function() {
  return this.subproperty;
}

var instance = new SubType();
console.log(instance.getSuperValue()); // true
```
原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。
```javascript
function SuperType(){
  this.colors = ["red", "blue", "green"];
}
function SubType(){}

SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType(); 
alert(instance2.colors); //"red,blue,green,black"
```

### 2、借用构造函数继承
使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）
```javascript
function  SuperType(){
  this.color=["red","green","blue"];
}
function  SubType(){
  //继承自SuperType
  SuperType.call(this);
}
var instance1 = new SubType();
instance1.color.push("black");
alert(instance1.color);//"red,green,blue,black"

var instance2 = new SubType();
alert(instance2.color);//"red,green,blue"
```
核心代码是SuperType.call(this)，创建子类实例时调用SuperType构造函数，于是SubType的每个实例都会将SuperType中的属性复制一份。

缺点：
* 只能继承父类的实例属性和方法，不能继承原型属性/方法
* 无法实现复用，每个子类都有父类实例函数的副本，影响性能

### 3、组合继承
组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。
```javascript
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType(); 
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function(){
  alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```

缺点：
* 第一次调用SuperType()：给SubType.prototype写入两个属性name，color。
* 第二次调用SuperType()：给instance1写入两个属性name，color。   
实例对象instance1上的两个属性就屏蔽了其原型对象SubType.prototype的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

### 4、原型式继承
利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。
```javascript
function object(obj){
  function F(){}
  F.prototype = obj;
  return new F();
}
```
object()对传入其中的对象执行了一次浅复制，将构造函数F的原型直接指向传入的对象。
```javascript
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
```
缺点：
* 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
无法传递参数
* 另外，ES5中存在Object.create()的方法，能够代替上面的object方法。

### 5、寄生式继承
核心：在原型式继承的基础上，增强对象，返回构造函数
```javascript
function createAnother(original){
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}
```
函数的主要作用是为构造函数新增属性和方法，以增强函数
```javascript
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```
缺点（同原型式继承）：
* 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
* 无法传递参数

### 6、寄生组合式继承
结合借用构造函数传递参数和寄生模式实现继承
```javascript
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance2.colors.push("3"); // ["red", "blue", "green", "3"]
```
这个例子的高效率体现在它只调用了一次SuperType 构造函数，并且因此避免了在SubType.prototype 上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用instanceof 和isPrototypeOf()

这是最成熟的方法，也是现在库实现的方法

### 7、混入方式继承多个对象
```javascript
function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
  // do something
};
```
Object.assign会把 OtherSuperClass原型上的函数拷贝到 MyClass原型上，使 MyClass 的所有实例都可用 OtherSuperClass 的方法。

### 8、ES6类继承extends
extends关键字主要用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。其中constructor表示构造函数，一个类中只能有一个构造函数，有多个会报出SyntaxError错误,如果没有显式指定构造方法，则会添加默认的 constructor方法，使用例子如下。

```javascript
class Rectangle {
  // constructor
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  // Getter
  get area() {
    return this.calcArea()
  }
  
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.area);
// 输出 200

-----------------------------------------------------------------
// 继承
class Square extends Rectangle {

  constructor(length) {
    super(length, length);
    
    // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }
}

const square = new Square(10);
console.log(square.area);
// 输出 100
```
extends继承的核心代码如下，其实现和上述的寄生组合式继承方式一样
```javascript
function _inherits(subType, superType) {
  // 创建对象，创建父类原型的一个副本
  // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  // 指定对象，将新创建的对象赋值给子类的原型
  subType.prototype = Object.create(superType && superType.prototype, {
    constructor: {
      value: subType,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  
  if (superType) {
    Object.setPrototypeOf 
      ? Object.setPrototypeOf(subType, superType) 
      : subType.__proto__ = superType;
  }
}
```
### 总结

**1、函数声明和类声明的区别**   
函数声明会提升，类声明不会。首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个ReferenceError。
```javascript
let p = new Rectangle(); 
// ReferenceError

class Rectangle {}
```

**2、ES5继承和ES6继承的区别**   
* ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到`this`上（`Parent.call(this)`）.
* ES6的继承有所不同，实质上是先创建父类的实例对象`this`，然后再用子类的构造函数修改`this`。因为子类没有自己的`this`对象，所以必须先调用父类的`super()`方法，否则新建实例报错。

## 原型与原型链

**我所理解的原型和原型链**

每个普通对象都有一个原型对象，这个对象靠一个内部指针`[[Prototype]]`指向这个原型对象，这个内部指针有个不规范的实现`__proto__`，这个是各大浏览器厂商为对象原型实现的`get`&`set`，方便开发者获取和对对象原型赋值。ES6有更好的方式来实现；

1. `get: getPrototypeOf`
2. `set: setPrototypeOf`
3. `create: Object.create`

原型链指的是如果在寻找对象属性或者方法的过程中，如果该对象有原型并且是一个对象，那么就会继续在这个原型对象中寻找。因为原型对象的原型依旧可能是一个对象，就构成了一个链式的关系，即为原型链。

关于构造函数，每个普通函数都有一个`prototype`属性，如果它指向一个对象，那么当该构造函数实例化之后，该实例对象的`__proto__`就会指向构造函数的`prototype`对象。

## let / const / var
||var|let|const|
|---|---|---|---|
|变量提升|Y|N|N|
|覆盖全局变量|Y|N|N|
|重复声明|Y|N|N|
|暂时性死区|N|Y|Y|
|块级作用域|N|Y|Y|
|只申明不初始化|Y|Y|N|
|重新赋值|Y|Y|N|

## Iterator描述
如果使用 TypeScript 的写法，遍历器接口（Iterable）、指针对象（Iterator）和next方法返回值的规格可以描述如下。
```javascript
interface Iterable {
  [Symbol.iterator]() : Iterator,
}

interface Iterator {
  next(value?: any) : IterationResult,
}

interface IterationResult {
  value: any,
  done: boolean,
}
```

## Symbol
1. Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

2. 内置的 Symbol 值
Symbol.hasInstance -- 指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。

Symbol.iterator -- 指向该对象的默认遍历器方法。

Symbol.toPrimitive -- 指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值

Symbol.toStringTag -- 指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。

## Set
它类似于数组，但是成员的值都是唯一的，没有重复的值。

### 遍历操作
Set 结构的实例有四个遍历方法，可以用于遍历成员。

 - Set.prototype.keys()：返回键名的遍历器
 - Set.prototype.values()：返回键值的遍历器
 - Set.prototype.entries()：返回键值对的遍历器
 - Set.prototype.forEach()：使用回调函数遍历每个成员

#### （1）keys()，values()，entries()
keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

#### （2）forEach()
Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。

#### （3）遍历的应用
扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。

## WeakSet
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值；
其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

## Map
ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

### 遍历方法
Map 结构原生提供三个遍历器生成函数和一个遍历方法。

 - Map.prototype.keys()：返回键名的遍历器。
 - Map.prototype.values()：返回键值的遍历器。
 - Map.prototype.entries()：返回所有成员的遍历器。
 - Map.prototype.forEach()：遍历 Map 的所有成员。

需要特别注意的是，Map 的遍历顺序就是插入顺序。

## WeakMap
WeakMap结构与Map结构类似，也是用于生成键值对的集合。

WeakMap与Map的区别有两点。

首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。

其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
