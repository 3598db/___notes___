# 面向对象的程序设计

## 6.1 理解对象

### 6.1.1 属性类型
ECMAScript中有两种属性: 数据属性和访问器属性

1.数据属性
* [[Configurable]]: 能否通过`delete`删除属性从新定义,能否修改属性的特性,或者能否把属性修改为访问器属性
* [[Enumerable]]: 是否可枚举
* [[Writable]]: 能否修改属性的值 
* [[Value]]: 属性数据值

2.访问器属性
* [[Configurable]]: 能否通过`delete`删除属性从新定义,能否修改属性的特性,或者能否把属性修改为访问器属性
* [[Enumerable]]: 是否可枚举
* [[Get]]: 读取时调用的函数
* [[Set]]: 写入时调用的函数

数据属性与访问器属性均需要`Object.defineProperty()`方法定义

### 6.1.2 定义多个属性
```
Object.defineProperties(target, {
  ...property: {
    ...properties
  }
});
```

### 6.1.2 读取属性的特性
```
Object.getOwnPropertyDescriptor()

@return {
  configurable,
  value,
  writable,
  enumerable,
} || {
  configurable,
  value,
  get,
  set
}
```
## 6.2 创建对象

### 6.2.1 工厂模式
```javascript
function createPerson(name) {
  const o = new Object();
  o.name = name;
  o.getName = () => { this.name };

  return o;
}
```

### 6.2.2 构造函数模式
```javascript
function Person(name) {
  this.name = name;
  this.getName = () => { this.name };
}
```
`new` 操作符步骤
1. 创建一个新对象
2. 将构造函数的作用域赋给新对象
3. 执行构造函数中的代码
4. 返回新对象

@TODO 模拟`new`操作符

1.将构造函数当做函数
```javascript
const person = new Person('gmz');
person.getName(); // 'gmz'

Person('mzg');
window.getName(); // 'mzg'

const o = new Object();
Person.call(o, 'zmg');
o.getName(); // 'zmg'
```
2.构造函数的问题
构造函数中的函数随着每次实力化都要从新创建一次,造成资源浪费

### 6.2.3 原型模式

1.理解原型对象
```
Person的prototype -> Person.perototype对象   
Person.perototype.constructor -> Person  
person.__proto__ -> Person.perototype对象  

isPrototypeOf()   
@return Boolean

Object.getPrototypeOf()   
@return Object 

hasOwenProperty()
@return Boolean
```

2.原型与`in`操作符

`in`: 如果该属性在对象中能访问到返回`true`,无论该对象存在于实例还是原型中

> ECMAScript5中将`constructor`和`prototype`的[[Enumerable]]置为`fales`

`Object.keys()`方法接收一个对象作为参数,返回所有可枚举属性的字符串数组   
`Object.getOwnPropertyNames()`可以获得所有实例属性,不论是否可枚举

3.更简单的原型语法
```
Person.prototype = {
  constructor: Person,
  ...
}
```

4.原型的动态性
实例与原型之间是松散连接关系, 如果重写整个原型, 将会修改实例中的`[[prototype]]`指针, 这样就会切断构造函数与最初原型之间的联系, 请记住: 实例中的指针仅指向原型, 而不是指向构造函数

5.原生对象的原型
可以通过原生对象的原型给原生对象添加方法, 但是不建议这么做

6.原型对象的问题
原型模式的最大问题是由其共享的本性所导致的, 即原型中的所有属性是被很多实例共享

### 6.2.4 组合使用构造函数模式和原型模式
构造函数模式用于定义实例属性, 而原型模式用于定义方法和共享的属性
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype = {
  category: 'human beings',
  getName: () => { this.name };
}
```

### 6.2.5 动态原型模式
```javascript
function Person(name) {
  this.name = name;

  if (typeof this.getName !== 'function') {
    Person.prototype.getName = () => { this.name };
  }
}
```

### 6.2.6 寄生构造函数模式
```javascript
function Person(name) {
  const o = new Object();
  o.name = name;
  o.getName = () => { this.name };

  return o;
}

const friend = new Person('gmz');
friend.getName(); // 'gmz'
```
> 构造函数在不返回值的情况下, 默认会返回新对象实例. 而通过在构造函数的末尾添加`return`语句, 可以重写调用构造函数时返回的值.

e.g.
```javascript
function SpecialArray() {
  const values = new Array();
  values.push.apply(values, arguments);

  values.toPipedString = function () {
    return this.join('|');
  };

  return values;
}

const colors = new SpecialArray('g', 'm', 'z');
colors.toPipedString(); // 'g|m|z'
```
> 关于寄生构造函数模式, 有一点需要说明: 首先, 返回的对象与构造函数或者构造函数的原型属性之间没有关系; 也就是说, 构造函数返回的对象与在构造函数外部创建的对象没有什么不同, 为此, 不能依赖`instanceof`操作符来确定对象类型.

### 6.2.7 稳妥构造函数模式
```javascript
function Person(name) {
  const o = new Object();
  o.getName = () => { name };
}
```

## 6.3 继承
>许多OO语言都支持两种继承方式: 接口继承和实现继承. 接口继承只继承方法签名, 而实现继承则继承实际的方法. 如前所述, 由于函数没有签名, 在ECMAScript中无法实现接口继承.

### 6.3.1 原型链
ECMAScript中描述了原型链的概念, 并将原型链作为实现继承的主要方法. 其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法. 简单回顾一下构造函数, 原型和实例的关系: 每个构造函数都有一个原型对象, 原型对象都包含一个指向构造函数的指针, 而实例都包含一个指向原型对象的内部指针. 那么, 假如我们让原型对象等于另一个类型的实例, 结果会怎么样呢? 显然, 此时的原型对象将包含一个指向另一个原型的指针, 相应地, 另一个原型中也包含着一个指向另一个构造函数的指针. 假如另一个原型又是另一个类型的实例, 那么上述关系依然成立, 如此层层递进, 就构成了实例与原型的链条. 这就是所谓原型链的基本概念.
```javascript
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = () => { this.property }

function SubType() {
  this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = () => { this.subproperty }

const instance = new SubType();
instance.getSuperValue() // true
```
>需要注意`instance.constructors`现在指向的是`SuperType`. 因为`SubType`的原型指向另一个对象--`SuperType`的原型, 而这个原型对象的`constructor`属性指向的`SuperType`.


1.别忘记默认的原型   
所有引用类型都默认继承了Object

2.确定原型和实例的关系
```javascript
instance instanceof Object;    // true
instance instanceof SuperType; // true
instance instanceof SubType;   // true

Object.prototype.isPrototypeOf(instance);     // true
SuperType.prototype.isPrototypeOf(instance);  // true
SubType.prototype.isPrototypeOf(instance);    // true
```

3.谨慎的定义方法   
子类型有时候需要覆盖超类型中的某种方法, 或者需要添加超类型中不存在的某个方法. 但是不管怎么样, 给原型添加方法的代码一定要放在替换原型的语句之后.

4.原型链的问题   
一) 包含引用类型的原型属性会被所有实例共享. 在通过原型来实现继承时, 原型实际上会变成另一个类型的实例. 于是, 原先的实力属性也就顺理成章的变成了现在的原型属性了.
二) 在创建子类型的实例时, 不能向超类型的构造函数传递参数. 实际上, 应该说是没有办法在不影响所有对象实例的情况下, 给超类型的构造函数传递参数.

### 6.3.2 借用构造函数
在子类构造函数的内部调用超类型的构造函数.
```javascript
function SuperType() {
  this.colors = ['red', 'blue'];
}

function SubType() {
  SuperType.call(this);
}

const instanceOne = new SubType();
instanceOne.colors.push('black');

instanceOne.colors; // ['red', 'blue', 'black']

const instanceTwo = new SubType();
instanceTwo.colors; // ['red', 'blue']
```

1.传递参数
```javascript
function SuperType(name) {
  this.name = name;
}

function SubType() {
  SuperType.call(this, 'gmz');
}

const instance = new SubType();
instance.name; // 'gmz'
```

2.借用构造函数的问题
一) 没有函数复用
二) 无法继承原型链中的属性方法

### 6.3.3 组合继承
```javascript
function SuperType(name) {
  this.colors = ['red', 'blue'];
  this.name = name;
}

SuperType.prototype.getName = () => { this.name };

function SubType(name) {
  SuperType.call(this, name);
}

// 实际上此步会在SubType.prototype上创建不必要的构造函数属性
SubType.prototype = new SuperType();

const instance = new SubType('gmz');
instance.getName(); // 'gmz'
```

### 6.3.4 原型式继承
```javascript
function object(o) {
  function fn() {}

  fn.prototype = o;

  return new fn();
}

// ECMAScript5 规范了该方法
Object.create()
```

### 6.3.5 寄生式继承
```javascript
function createAnother(original) {
  const clone = object(original);
  clone.sayHi = () => { 'hi' };

  return clone;
}
```

### 6.3.6 寄生组合式继承
```javascript
function inheritPrototype(subType, superType) {
  const prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}


function SuperType(name) {
  this.colors = ['red', 'blue'];
  this.name = name;
}

SuperType.prototype.getName = () => { this.name };

function SubType(name) {
  SuperType.call(this, name);
}

inheritPrototype(SubType, SuperType);

const instance = new SubType('gmz');
instance.getName(); // 'gmz'
```
