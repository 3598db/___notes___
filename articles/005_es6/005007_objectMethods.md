# :memo:对象的方法

## Object.assign()
Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
```js
Object.assign(target, ...sources)
```
**描述**
* 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
* Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。
* String类型和 Symbol 类型的属性都会被拷贝。
* 在出现错误的情况下，例如，如果属性不可写，会引发TypeError，如果在引发错误之前添加了任何属性，则可以更改target对象。
* 注意，Object.assign 不会在那些source对象值为 null 或 undefined 的时候抛出错误。

## Object.create()
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。 （请打开浏览器控制台以查看运行结果。）
```js
// 第二个参数是为新建对象谈价不可枚举（默认）属性（需要写成数据属性或者访问器属性的形式）
Object.create(proto[, propertiesObject])
```
```js
var o;

// 创建一个原型为null的空对象
o = Object.create(null);


o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);


o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});


function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码


// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
  console.log(prop)
}
//"q"

delete o.p
//false

//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, {
  p: {
    value: 42, 
    writable: true,
    enumerable: true,
    configurable: true 
  } 
});
```

## Object.defineProperties()
Object.defineProperties() 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
```js
Object.defineProperties(obj, props)
```
## Object.defineProperty()
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
```js
Object.defineProperty(obj, prop, descriptor)
```
**可选键值：**
* configurable：当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
* enumerable：当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。默认为 false。

**数据描述符还具有以下可选键值：**
* value：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
* writable：当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。默认为 false。

**存取描述符还具有以下可选键值：**
* get：属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。默认为 undefined。
* set：属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined。

**描述符默认值汇总**

拥有布尔值的键 configurable、enumerable 和 writable 的默认值都是 false。
属性值和函数的键 value、get 和 set 字段的默认值为 undefined。

**描述符可拥有的键值**

||configurable|enumerable|value|writable|get|set|
|-|-|-|-|-|-|-|
|数据描述符|可以|可以|可以|可以|不可以|不可以|
|存取描述符|可以|可以|不可以|不可以|可以|可以|

## Object.entries()
Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
## Object.freeze()
Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

需要注意的是，如果冻结的对象的属性指向另一个对象，那么可以对这个对象进行增删改，如果不想这样，需要使用“深冻结”。
```js
// 深冻结函数.
function deepFreeze(obj) {

  // 取回定义在obj上的属性名
  var propNames = Object.getOwnPropertyNames(obj);

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    var prop = obj[name];

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj);
}

obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined
```

## Object.fromEntries()
Object.fromEntries() 方法把键值对列表转换为一个对象。是 Object.entries 的反转。

## Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
```js
Object.getOwnPropertyDescriptor(obj, prop)
```
该方法和Object.defineProperty()是对应的。

## Object.getOwnPropertyDescriptors()
Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述符。
```js
Object.getOwnPropertyDescriptors(obj)
```
该方法和Object.defineProperties()是对应的。

```js
// 浅拷贝一个对象
Object.create(
  Object.getPrototypeOf(obj), 
  Object.getOwnPropertyDescriptors(obj) 
);
```
## Object.getOwnPropertyNames()
Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
```js
Object.getOwnPropertyNames(obj)
```

## Object.getOwnPropertySymbols()
Object.getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组。
```js
Object.getOwnPropertySymbols(obj)
```

## Object.getPrototypeOf()
Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
```js
Object.getPrototypeOf(object)
```
>Object.getPrototypeOf(Object)  不是  Object.prototype   
>JavaScript中的 Object 是构造函数（创建对象的包装器）。   
>一般用法是：   
>var obj = new Object();   
>
>所以：   
>Object.getPrototypeOf( Object );               // ƒ () { [native code] }   
>Object.getPrototypeOf( Function );             // ƒ () { [native code] }   
>
>Object.getPrototypeOf( Object ) === Function.prototype;        // true   
>
>Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，返回的当然是函数对象的原型，也就是 Function.prototype。   
>
>正确的方法是，Object.prototype是构造出来的对象的原型。   
>var obj = new Object();   
>Object.prototype === Object.getPrototypeOf( obj );              // true   
>
>Object.prototype === Object.getPrototypeOf( {} );               // true   

## Object.is()
Object.is() 方法判断两个值是否是相同的值。
```js
Object.is(value1, value2);
```
Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：
* 两个值都是 undefined
* 两个值都是 null
* 两个值都是 true 或者都是 false
* 两个值是由相同个数的字符按照相同的顺序组成的字符串
* 两个值指向同一个对象
* 两个值都是数字并且
  * 都是正零 +0
  * 都是负零 -0
  * 都是 NaN
  * 都是除零和 NaN 外的其它同一个数字

**与'=='和'==='的区别**

这种相等性判断逻辑和传统的 == 运算不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 等于 true 的现象），但 Object.is 不会做这种类型转换。

这与 === 运算符的判定方式也不一样。=== 运算符（和== 运算符）将数字值 -0 和 +0 视为相等，并认为 Number.NaN 不等于 NaN。

## Object.isExtensible()
## Object.isFrozen()
## Object.isSealed()
## Object.keys()
## Object.preventExtensions()

## Object.prototype.hasOwnProperty()
## Object.prototype.isPrototypeOf()
## Object.prototype.propertyIsEnumerable()
## Object.prototype.toLocaleString()

## Object.prototype.toString()
## Object.prototype.valueOf()
## Object.seal()
## Object.setPrototypeOf()
## Object.values()



