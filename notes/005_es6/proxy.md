# :star:Proxy
[[toc]]
## 概述
Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

## API
```js
const proxy = new Proxy(target, handler);
```

## 参数
* `target`：要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
* `handler`：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

## 方法
`Proxy.revocable()`：创建一个可撤销的`Proxy`对象。

## handler对象的方法
handler对象是一个容纳一批特定属性的占位符对象。它包含有Proxy的各个捕获器（trap）。所有的陷阱是可选的。如果没有定义某个陷阱，那么就会保留源对象的默认行为。
* **`handler.getPrototypeOf()`**：`Object.getPrototypeOf`方法的陷阱。
    * @params：`target`
    * @returns：对象或者`null`
    * 在 JavaScript 中，下面这五种操作（方法/属性/运算符）可以触发 JS 引擎读取一个对象的原型，也就是可以触发`getPrototypeOf()`代理方法的运行
        * `Object.getPrototypeOf()`
        * `Reflect.getPrototypeOf()`
        * `__proto__`
        * `Object.prototype.isPrototypeOf()`
        * `instanceof`
* **`handler.setPrototypeOf()`**：`Object.setPrototypeOf`方法的陷阱。
    * @params：`target` `prototype`
    * @returns：如果成功修改了`[[Prototype]]`, `setPrototypeOf`方法返回`true`,否则返回`false`
    * 这个方法可以拦截以下操作：
        * `Object.setPrototypeOf()`
        * `Reflect.setPrototypeOf()`
* **`handler.isExtensible()`**：`Object.isExtensible`方法的陷阱。
    * @params：`target`
    * @returns：必须返回一个`Boolean`值或可转换成`Boolean`的值
    * 该方法会拦截目标对象的以下操作：
        * `Object.isExtensible()`
        * `Reflect.isExtensible()`
* **`handler.preventExtensions()`**：`Object.preventExtensions`方法的陷阱。
    * @params：`target`
    * @returns：`Boolean`
    * 这个陷阱可以拦截这些操作：
        * `Object.preventExtensions()`
        * `Reflect.preventExtensions()`
    * `Object.isExtensible`与`Object.preventExtensions`结果互斥
* **`handler.getOwnPropertyDescriptor()`**：`Object.getOwnPropertyDescriptor`方法的陷阱。
    * @params：`target` `prop`
    * @returns：必须返回一个`object`或`undefined`
    * 这个陷阱可以拦截这些操作：
        * `Object.getOwnPropertyDescriptor()`
        * `Reflect.getOwnPropertyDescriptor()`
* **`handler.defineProperty()`**：`Object.defineProperty`方法的陷阱。
    * @params：`target` `property` `descriptor`
    * @returns：必须以一个`Boolean`返回，表示定义该属性的操作成功与否
    * 该方法会拦截目标对象的以下操作：
        * `Object.defineProperty()`
        * `Reflect.defineProperty()`
        * `proxy.property='value'`
    * 只有以下属性才有用，非标准的属性将会被无视：
        * `enumerable`
        * `configurable`
        * `writable`
        * `value`
        * `get`
        * `set`
* **`handler.has()`**：`in`操作符的陷阱。
    * @params：`target` `prop`
    * @returns：`Boolean`
    * 这个钩子可以拦截下面这些操作：
        * 属性查询：`foo in proxy`
        * 继承属性查询：`foo in Object.create(proxy)`
        * `with` 检查：`with(proxy) { (foo); }`
        * `Reflect.has()`
* **`handler.get()`**：属性读取操作的陷阱。
    * @params：`target` `property` `receiver`
    * @returns：任何值
    * 该方法会拦截目标对象的以下操作：
        * 访问属性：`proxy[foo]`和 `proxy.bar`
        * 访问原型链上的属性：`Object.create(proxy)[foo]`
        * `Reflect.get()`
* **`handler.set()`**：属性设置操作的陷阱。
    * @params：`target` `property` `value` `receiver`
    * @returns：`set()`方法应当返回一个布尔值。`
        * 返回`true`代表属性设置成功。
        * 在严格模式下，如果`set()`方法返回`false`，那么会抛出一个`TypeError`异常。
    * 该方法会拦截目标对象的以下操作：
        * 指定属性值：`proxy[foo] = bar`和`proxy.foo = bar`
        * 指定继承者的属性值：`Object.create(proxy)[foo] = bar`
        * `Reflect.set()`
* **`handler.deleteProperty()`**：`delete`操作符的陷阱。
    * @params：`target` `property`
    * @returns：必须以一个`Boolean`返回，表示了该属性是否被成功删除
    * 该方法会拦截以下操作：
        * 删除属性：`delete proxy[foo]`和`delete proxy.foo`
        * `Reflect.deleteProperty()`
* **`handler.ownKeys()`**：`Object.getOwnPropertyNames`方法和`Object.getOwnPropertySymbols`方法的陷阱。
    * @params：`target`
    * @returns：必须返回一个可枚举对象
    * 该拦截器可以拦截以下操作：
        * `Object.getOwnPropertyNames()`
        * `Object.getOwnPropertySymbols()`
        * `Object.keys()`
        * `Reflect.ownKeys()`
* **`handler.apply()`**：函数调用操作的陷阱。
    * @params：`target` `thisArg` `argumentsList`
    * @returns：任何值
    * 该方法会拦截目标对象的以下操作:
        * `proxy(...args)`
        * `Function.prototype.apply()` 和 `Function.prototype.call()`
        * `Reflect.apply()`
* **`handler.construct()`**：`new`操作符的陷阱。
    * @params：`target` `argumentsList` `newTarget`
    * @returns：必须返回一个对象
    * 该拦截器可以拦截以下操作:
        * `new proxy(...args)`
        * `Reflect.construct()`

## 实践
### 1). `get()`的利用
**利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作**
```js
const pipe = function (value) {
  const fnStack = [];
  const proxy = new Proxy({}, {
    get(target, property) {
      if (property === 'get') {
        return fnStack.reduce((val, fn) => fn(val), value)
      }
      fnStack.push(window[property]);
      return proxy;
    }
  });

  return proxy;
}

const double = n => n * 2;
const pow    = n => n * n;
const reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
```

## `this`问题
虽然`Proxy`可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在`Proxy`代理的情况下，目标对象内部的`this`关键字会指向`Proxy`代理。

## 与`Object.defineProperty`的对比
* Proxy直接代理对象的增删改等操作，相对于`Object.defineProperty`的`getter`与`setter`强大很多；
* 可以代理数组，代理函数，并且可以实现多达13种类型的拦截操作；
* Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。
