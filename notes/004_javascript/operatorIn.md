# in 运算符

先总结一下MDN中对[in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)运算符的解释。

>如果指定的属性在指定的对象或其原型链中，in运算符返回true。
<!-- more -->

## 数组
```javascript
	var array = [ 'john', 'kat', 'jack' ];

	0 in array // true
	3 in array // true;
	4 in array // false;
	'john' in array // false;
	length in array // true; 和索引一样是数组的属性

	console.log( array );

	0 : "john"
	1 : "kat"
	2 : "jack"
	length : 3
	__proto__ : Array(0)
```
## 对象
```javascript
	'PI' in Math // true

	var obj = {
		name : 'jack',
		age : 40,
	}

	name in obj // true;
	'jack' in obj // false
```

`in`操作符右边必须是对象，string这种简单数据类型字面量声明方式`in`操作符不可用
```javascript
	length in new String( 'jack' ) // true;
	length in 'jack'; // TypeError
```

## 对被删除或值为 undefined 的属性使用in
i)如果你使用 delete 运算符删除了一个属性，则 in 运算符对所删除属性返回 false。
ii)如果你只是将一个属性的值赋值为undefined，而没有删除它，则 in 运算仍然会返回true。

## 继承属性
如果一个属性是从原型链上继承来的，in 运算符也会返回 true。

## for in 循环中的一些问题

for...in遍历数组会遍历出原型链上的方法。
>`for...in`循环只遍历可枚举属性。像`Array`和`Object`使用内置构造函数所创建的对象都会继承自`Object.prototype`和`String.prototype`的不可枚举属性，例如`String`的`indexOf()`方法或`Object`的`toString()`方法。循环将遍历对象本身的所有可枚举属性，以及对象从其构造函数原型中继承的属性（更接近原型链中对象的属性覆盖原型属性）。

```javascript
var array = [ 'jack', 40 ];

for ( var i = 0; i < array.length; i ++ ) {
	console.log( i , typeof i );
}

0 'number'
1 'number'

for ( var i in array ) {
	console.log( i , typeof i );
}

0 string
1 string
```
>数组索引只是具有整数名称的枚举属性，并且与通用对象属性相同。不能保证`for...in`将以任何特定的顺序返回索引。`for...in`循环语句将返回所有可枚举属性，包括非整数类型的名称和继承的那些。

```javascript
//给Array对象添加原型
Array.prototype.size = 0;

for ( var i in array ) {
	console.log( i , typeof i );
}

0 string
1 string
size string
```
如果真的需要用for in遍历数组，可以通过`hasOwnProperty`方法判断是否是`Array`对象自身的属性，也可以通过`propertyIsEnumerable`方法判断该属性是否可以枚举，该方法不能判断通过原型链继承的属性，可以通过这个方法判断是否是对象自身的属性。

```javascript
for ( var i in array ) {
	if ( array.hasOwnProperty( i ) ) {
		console.log( i );
	}
}

0 string
1 string
```
