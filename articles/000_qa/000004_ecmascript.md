# :thinking:ECMAScript

[[toc]]

## 实现原生ajax

## 比如在代码中有a.addEventListener('click', fn1), a.addEventListener('click', fn2)这个时候fn1和fn2会执行吗，假如加上说阻止冒泡呢

## 如何实现点击元素外部关闭元素

## offsetTop和scrollTop和scrollHeight分别代表什么

## 前端如何做权限控制

## cookie有哪些属性

## 模块化（AMD， CMD，CommonJS，ES Module，webpack）

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

#### 2. 作用域链
当JavaScript在运行的时候，它需要一些空间让它来存储本地变量（local variables）。我们将这些空间称为作用域对象（Scope object），有时候也称作LexicalEnvironment。例如，当你调用函数时，函数定义了一些本地变量，这些变量就被存储在一个作用域对象中。你可以将作用域函数想象成一个普通的JavaScript对象，但是有一个很大的区别就是你不能够直接在JavaScript当中直接获取这个对象。你只可以修改这个对象的属性，但是你不能够获取这个对象的引用。

作用域对象的概念使得JavaScript和C、C++非常不同。在C、C++中，本地变量被保存在栈（stack）中。在JavaScript中，作用域对象是在堆中被创建的（至少表现出来的行为是这样的），所以在函数返回后它们也还是能够被访问到而不被销毁。

正如你做想的，作用域对象是可以有父作用域对象（parent scope object）的。当代码试图访问一个变量的时候，解释器将在当前的作用域对象中查找这个属性。如果这个属性不存在，那么解释器就会在父作用域对象中查找这个属性。就这样，一直向父作用域对象查找，直到找到该属性或者再也没有父作用域对象。我们将这个查找变量的过程中所经过的作用域对象称作作用域链（Scope chain）。

在作用域链中查找变量的过程和原型继承（prototypal inheritance）有着非常相似之处。但是，非常不一样的地方在于，当你在原型链（prototype chain）中找不到一个属性的时候，并不会引发一个错误，而是会得到undefined。但是如果你试图访问一个作用域链中不存在的属性的话，你就会得到一个ReferenceError。

在作用域链的最顶层的元素就是全局对象（Global Object）了。运行在全局环境的JavaScript代码中，作用域链始终只含有一个元素，那就是全局对象。所以，当你在全局环境中定义变量的时候，它们就会被定义到全局对象中。当函数被调用的时候，作用域链就会包含多个作用域对象。

#### 3. this指向

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

## Async/Await 如何通过同步的方式实现异步

## JS 异步解决方案的发展历程以及优缺点

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

