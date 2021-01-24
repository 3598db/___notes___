# :memo:继承对比
[[toc]]
## 原型链继承
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
```
原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。

## 借用构造函数继承
使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）
```javascript
function  SuperType(){
  this.color=["red","green","blue"];
}
function  SubType(){
  //继承自SuperType
  SuperType.call(this);
}
var instance = new SubType();
```

缺点：
* 只能继承父类的实例属性和方法，不能继承原型属性/方法
* 无法实现复用，每个子类都有父类实例函数的副本，影响性能

## 组合继承
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
```
缺点：
* 第一次调用SuperType()：给SubType.prototype写入两个属性name，color。
* 第二次调用SuperType()：给instance1写入两个属性name，color。   
实例对象instance1上的两个属性就屏蔽了其原型对象SubType.prototype的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

## 原型式继承

```javascript
function object(obj){
  function F(){}
  F.prototype = obj;
  return new F();
}
```

缺点：
* 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
无法传递参数
* 另外，ES5中存在Object.create()的方法，能够代替上面的object方法。

## 寄生式继承
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
函数的主要作用是为构造函数新增属性和方法，以增强函数。

缺点（同原型式继承）：
* 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
* 无法传递参数
核心：在原型式继承的基础上，增强对象，返回构造函数

## 寄生组合式继承
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
这个例子的高效率体现在它只调用了一次SuperType 构造函数，并且因此避免了在SubType.prototype 上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用instanceof 和isPrototypeOf()。

这是最成熟的方法，也是现在库实现的方法。

## 混入方式继承多个对象
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

## ES6类继承extends
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

## ES6中继承与ES5中继承的区别
* ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.call(this)）；
* ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错；
* ES6会继承父类静态方法；
* ES6实例方法不可枚举；

总的来说ES6继承要规范很多，副作用也少。
