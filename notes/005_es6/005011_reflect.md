# :star:Reflect
[[toc]]
## 概述
与大多数全局对象不同，Reflect不是一个构造函数。你不能将其与一个new运算符一起使用，或者将Reflect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）。

## 方法
Reflect对象提供以下13个静态函数，它们具有与处理器对象方法相同的名称。这些方法中的一些与 Object 上的对应方法相同。
* `Reflect.apply()`：对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和`Function.prototype.apply()`功能类似；
* `Reflect.construct()`：对构造函数进行`new`操作，相当于执行`new target(...args)`；
* `Reflect.defineProperty()`：和`Object.defineProperty()`类似；
* `Reflect.deleteProperty()`：作为函数的`delete`操作符，相当于执行`delete target[name]`；
* `Reflect.enumerate()`：该方法会返回一个包含有目标对象身上所有可枚举的自身字符串属性以及继承字符串属性的迭代器，`for...in`操作遍历到的正是这些属性；
* `Reflect.get()`：获取对象身上某个属性的值，类似于`target[name]`；
* `Reflect.getOwnPropertyDescriptor()`：类似于`Object.getOwnPropertyDescriptor()`；
* `Reflect.getPrototypeOf()`：类似于`Object.getPrototypeOf()`；
* `Reflect.has()`：判断一个对象是否存在某个属性，和 `in`运算符的功能完全相同；
* `Reflect.isExtensible()`：类似于`Object.isExtensible()`；
* `Reflect.ownKeys()`：返回一个包含所有自身属性（不包含继承属性）的数组。(类似于`Object.keys()`，但不会受`enumerable`影响)；
* `Reflect.preventExtensions()`：类似于`Object.preventExtensions()`。返回一个Boolean；
* `Reflect.set()`：将值分配给属性的函数。返回一个`Boolean`，如果更新成功，则返回`true`；
* `Reflect.setPrototypeOf()`：类似于`Object.setPrototypeOf()`。

## 设计理念
`Reflect`对象与`Proxy`对象一样，也是ES6为了操作对象而提供的新API。`Reflect`对象的设计目的有这样几个。
1. 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。
2. 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。
3. 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。
4. `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。
