# :star:对象的扩展
[[toc]]
## 属性的简洁表示法
注意，简写的对象方法不能用作构造函数，会报错。

## 属性名表达式
注意，属性名表达式与简洁表示法，不能同时使用，会报错。

注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。

## 方法的 name 属性
如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。

有两种特殊情况：
1. bind方法创造的函数，name属性返回bound加上原函数的名字；
2. Function构造函数创造的函数，name属性返回anonymous。

如果对象的方法是一个 Symbol 值，那么name属性返回的是这个Symbol值的描述。

## 属性的可枚举性和遍历
### 可枚举性
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

目前，有四个操作会忽略enumerable为false的属性。
1. for...in循环：只遍历对象自身的和继承的可枚举的属性。
2. Object.keys()：返回对象自身的所有可枚举的属性的键名。
3. JSON.stringify()：只串行化对象自身的可枚举的属性。
4. Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。

### 属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性。
1. for...in：for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
2. Object.keys(obj)：Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
3. Object.getOwnPropertyNames(obj)：Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
4. Object.getOwnPropertySymbols(obj)：Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
5. Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是Symbol或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
* 首先遍历所有数值键，按照数值升序排列。
* 其次遍历所有字符串键，按照加入时间升序排列。
* 最后遍历所有 Symbol 键，按照加入时间升序排列。

## super 关键字
注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
```js
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
```
上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

## 对象的扩展运算符
### 解构赋值
由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。

解构赋值必须是最后一个参数，否则会报错。

注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。

上面代码中，变量x是单纯的解构赋值，所以可以读取对象o继承的属性；变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，所以变量z可以赋值成功，变量y取不到值。

### 扩展运算符

对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。

如果扩展运算符后面是一个空对象，则没有任何效果。

如果扩展运算符后面不是对象，则会自动将其转为对象。

对象的扩展运算符等同于使用Object.assign()方法。

```js
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
```
上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
```js
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};
```
与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。

扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。

## 链判断运算符
链判断运算符有三种用法。
* obj?.prop // 对象属性
* obj?.[expr] // 同上
* func?.(...args) // 函数或对象方法的调用

## Null 判断运算符
ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。
