# 你不知道的JavaScript（中卷）

# 第一部分 类型与语法

## 第一章 类型

### 1.1 类型

### 1.2 内置类型

JavaScript有7中内置类型：
1. `null`
2. `undefined`
3. `boolean`
4. `number`
5. `string`
6. `object`
7. `symbol`

`function`也是`JavaScript`的一个内置类型。它实际上是`object`的一个“子类型”。具体来说，函数是一个“可调用对象”，它有一个内部属性`[[Call]]`，该属性使其可以被调用。

### 1.3 值和类型
语言引擎不要求变量总是持有与初始值同类型的值。

#### 1.3.1 undefined和undeclared
undefined(初始化为赋值)
undeclared(未初始化)

对于undeclared变量，`typeof`照样返回’undefined‘，不会引起`ReferenceError`。因为`typeof`有一个特殊的防范机制。但是如果`typeof`能返回undeclared，则会让情况清晰很多，不会有这种混淆的情况。

但是es6的出现可能让`typeof`的防范机制失效。因为es6中暂时性死区的出现，导致在声明变量之前访问，会报错。
```javascript
typeof a;

let a = '';
// Uncaught SyntaxError: Unexpected identifier
```

#### 1.3.2 typeof Undeclared

## 第二章 值

### 2.1 数组

数组通过数字进行索引，但有趣的是他们也是对象，所以也可以包含字符串键值和属性（但这些并不计算在数组长度内）。这里有个问题需要特别注意，如果字符串键值能够被强制类型转换成十进制数字的话，它就会被当做数字索引来处理。

**类数组**

NodeList与arguments对象这样有`length`属性但是不是真正意义上的数组。可以用`Array.prototype.slice.call()`或者`Array.from()`进行处理成真正的数组。

### 2.2 字符串
字符串经常被当成字符数组。字符串内部实现究竟有没有使用数字并不好说。

许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但是可以’借用‘数组的**非变更**方法来处理字符串。可惜我们无法’借用‘数组的可变更成员函数，因为字符串是不可变的。（上述方法对于包含复杂字符（Unicode，如星号，多字节字符等）字符串并不适用）

### 2.3 数字

JavaScript中并没有真正意义上的整数，整数就是没有小数的十进制数。JavaScript中的数字类型是双进度浮点数。

#### 2.3.1 数字的语法

数字中，对于.运算符需要给予特别注意，因为它是一个有效的数字字符，会被优先识别为数字字面量的一部分，然后才是对象属性访问运算符。
```javascript
42.toFixed(3); // SyntaxError

(42).toFixed(3); // "42.000"
42..toFixed(3); // "42.000"
42 .toFixed(3); // "42.000"
0.42.toFixed(3); // "0.420"
Number(42).toFixed(3); // "42.000"
```

#### 2.3.2 较小的数值
```javascript
0.1 + 0.2 === 0.3 // false
```
判断`0.1 + 0.2`和`0.3`是否相等的问题。
##### 1). 设置误差范围值，通常称为机器精度，对JavaScript来说这个值通常是2^-52;

在es6开始，该值定义在`Number.EPSILON`中，我们可以直接拿来用，兼容之前的版本也可以polyfill：
```javascript
if (!Number.EPSILON) {
  Number.EPSILON = Math.pow(2, -52);
}
```
可以通过`Number.EPSILON`来比较两个数字是否相等（在指定误差范围内）：
```javascript
function numberCloseEnoughToEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}
```
##### 2). 可以选择投机取巧的方式，每个数 * 10再对比。 :D

#### 2.3.3 整数的安全范围
数字的呈现方式决定了’整数‘的安全范围远远小于`Number.MAX_VALUE`；能够被’安全‘呈现的最大整数是`2^52 - 1`，在es6中被定义为`Number.MAX_SAFE_INTEGER`。   
如果JavaScript需要处理一些比较大的数字，如数据库中的64位ID等，可以用字符串处理。

#### 2.3.4 整数检测
```javascript
// Number.isInteger
if (!Number.isInteger) {
  Number.isInteger = function (num) {
    return typeof num === 'number' && num % 1 === 0;
  }
}

// Number.isSafeInteger
if (!Number.isSafeInteger) {
  Number.isSafeInteger = function (num) {
    return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
  }
}
```

#### 2.3.5 32位有符号整数

### 2.4 特殊数值

#### 2.4.1 不是值的值
* `null`
* `undefined`

#### 2.4.2 undefined
`void _ `表示没有返回值，因此返回的结果是`undefined`。
可以通过这个处理`setTimeout()`返回值的问题。

#### 2.4.3 特殊的数字
1. 不是数字的数字。
    * `NaN` `NaN`是一个特殊值，它和自身不相等，是唯一一个非自反的值（`NaN != NaN // true`）。
2. 无穷数
    * `Infinity` (`Number.POSITIVE_INFINITY`)
    * `-Infinity` (`Number.NEGATIVE_INFINITY`)
3. 零值
    * `+0`
    * `-0`

#### 2.4.4 特殊等式
```javascript
if (!Object.is) {
  Object.is = function (v1, v2) {
    // 判断是否是 -0
    if (v1 === 0 && v2 ===0) {
      return 1 / v1 === 1 / v2;
    }
    // 判断是否是NaN
    if (v1 !== v1) {
      return v2 !== v2;
    }
    //其他
    return v1 === v2;
  }
}
```
### 2.5 值和引用
**简单值**（即标量基本类型值）总是通过值复制的方式来赋值/传递，包括`null`，`undefined`，字符串，数字，布尔，`symbol`。

**复合值**--对象（包括数组和封装对象）和函数，则总是通过引用复制的方式来赋值/传递。

函数参数传递：
```javascript
function fn(x) {}
const a = {};
fn(a);
```
我们向函数传递参数a的时候，实际上是将引用a的一个副本赋值给x，而a仍然指向`{}`

请记住：**我们无法自行决定使用值复制还是引用复制，一切由值的类型来决定。**

1. 如果通过值复制的方式来传递复合值，就需要为其创建一个复本，这样传递的就不再是原始值，如：
```javascript
foo(a.slice());
```
2. 相反，如果要将标量基本类型值传递到函数内并进行更改，就需要将该值封装到一个复合值中，然后通过引用复制的方式传递。
```javascript
function foo(wrapper) {
  wrapper.a = 42;
}

const obj = {
  a: 2;
}

foo(obj);

obj.a // 42
```
