# 类型转换

## StringToNumber

## NumberToString

## 装箱转换
每一种基本类型 Number、String、Boolean、Symbol 在对象中都有对应的类，所谓装箱转换，正是把基本类型转换为对应的对象，它是类型转换中一种相当重要的种类。前文提到，全局的 Symbol 函数无法使用 new 来调用，但我们仍可以利用装箱机制来得到一个 Symbol 对象，我们可以利用一个函数的 call 方法来强迫产生装箱。

symbol强制装箱
```js
var symbolObject = (function(){ return this; }).call(Symbol("a")); 
console.log(typeof symbolObject); //object 
console.log(symbolObject instanceof Symbol); //true 
console.log(symbolObject.constructor == Symbol); //true
```

使用内置的 Object 函数，我们可以在 JavaScript 代码中显式调用装箱能力。

每一类装箱对象皆有私有的 Class 属性，这些属性可以用 Object.prototype.toString 获取：

## 拆箱转换
在 JavaScript 标准中，规定了 ToPrimitive 函数，它是对象类型到基本类型的转换（即，拆箱转换）。对象到 String 和 Number 的转换都遵循“先拆箱再转换”的规则。通过拆箱转换，把对象变成基本类型，再从基本类型转换为对应的 String 或者 Number。拆箱转换会尝试调用 valueOf 和 toString 来获得拆箱后的基本类型。如果 valueOf 和 toString 都不存在，或者没有返回基本类型，则会产生类型错误 TypeError。

```js
var o = { 
  valueOf : () => {console.log("valueOf"); return {}}, 
  toString : () => {console.log("toString"); return {}} 
} 

o * 2 
// valueOf 
// toString 
// TypeError
```

到 String 的拆箱转换会优先调用 toString。我们把刚才的运算从 o*2 换成 String(o)，那么你会看到调用顺序就变了。

```js
var o = { 
  valueOf : () => {console.log("valueOf"); return {}}, 
  toString : () => {console.log("toString"); return {}} 
} 

String(o) 
// toString 
// valueOf 
// TypeError
```

规范指出，类型转换的内部实现是通过ToPrimitive ( input [ , PreferredType ] )方法进行转换的，这个方法的作用就是将input转换成一个非对象类型。

参数preferredType是可选的，它的作用是，指出了input被期待转成的类型。

如果不传preferredType进来，默认的是'number'。

如果preferredType的值是"string"，那就先执行"toString", 后执行"valueOf"。否则，先执行"valueOf", 后执行"toString"。

由此可见，"toString", "valueOf"的执行顺序，取决于preferred的值。

规范原文请移步：http://www.ecma-international.org/ecma-262/#sec-toprimitive

再回到我们的例子
```js
var o = {
  valueOf : () => {console.log("valueOf"); return {}},
  toString : () => {console.log("toString"); return {}}
}

o + ""
```
类型转换时，把对象o进行转换，调用toPrimitive方法，即toPrimitive(o[ , PreferredType ] )。关键的点是，preferredType是否被传值，传的是什么值？

我们再去看下规范，看看加法运算符的规则。

加法运算符运算过程中有两行代码很重要，如下
```
Let lprim be ? ToPrimitive(lval).
Let rprim be ? ToPrimitive(rval).
```

可以看出，调用ToPrimitive方法时，第二个参数是没有传参的。

所以preferredType取默认的值"number"。最终先执行"valueOf", 后执行"toString"。

# 除了这七种语言类型，还有一些语言的实现者更关心的规范类型。
- List 和 Record： 用于描述函数传参过程。
- Set：主要用于解释字符集等。
- Completion Record：用于描述异常、跳出等语句执行过程。
- Reference：用于描述对象属性访问、delete 等。
- Property Descriptor：用于描述对象的属性。
- Lexical Environment 和 Environment Record：用于描述变量和作用域。
- Data Block：用于描述二进制数据。

# 关于undefined
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
前两段写的很明确了。
undefined is a property of the global object; i.e., it is a variable in global scope. The initial value of undefined is the primitive value undefined.
In modern browsers (JavaScript 1.8.5 / Firefox 4+), undefined is a non-configurable, non-writable property per the ECMAScript 5 specification. Even when this is not the case, avoid overriding it.
在ES5之前的时候，undefined是可以被赋值的。在现代浏览器当中已经把undefined设置为一个non-configurable, non-writable属性的值了。


