# 面向对象的程序设计

## 6.1 理解对象

### 6.1.1 属性类型
ECMAScript中有两种属性: 数据属性和访问器属性

1.数据属性
* [[Configurable]]: 能否通过`delete`删除属性从新定义,能否修改属性的特性,或者能否把属性修改为访问器属性
* [[Enumerable]]: 是否可枚举
* [[Writable]]: 能否修改属性的值 
* [[Value]]: 属性数据值

2.访问器属性
* [[Configurable]]: 能否通过`delete`删除属性从新定义,能否修改属性的特性,或者能否把属性修改为访问器属性
* [[Enumerable]]: 是否可枚举
* [[Get]]: 读取时调用的函数
* [[Set]]: 写入时调用的函数

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
```
function createPerson() {
  var o = new Object();
  o.name = name;
  o.getName = () => { this.name };

  return o;
}
```
### 6.2.2 构造函数模式
```
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
```
var person = new Person('gmz');
person.getName() // 'gmz'

Person('mzg');
window.getName() // 'mzg'

var o = new Object();
Person.call(o, 'zmg');
o.getName() // 'zmg'
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

`in`: 如果该属性在对象中能访问到返回`true`,无论该对象存在于实例还是原型中

> ECMAScript5中将`constructor`和`prototype`的[[Enumerable]]置为`fales`

`Object.keys()`方法接收一个对象作为参数,返回所有可枚举属性的字符串数组   
`Object.getOwnPropertyNames()`可以获得所有实例属性,不论是否可枚举

3.更简单的原型语法
```
Person.prototype = {
  constructor: Person,
  ...
}
```

4.原型的动态性


