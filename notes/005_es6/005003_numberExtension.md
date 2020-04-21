# :star:数值的扩展
[[toc]]
## 二进制和八进制表示法
## Number.isFinite(), Number.isNaN()

### Number.isFinite()
Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。注意，如果参数类型不是数值，Number.isFinite一律返回false。

### Number.isNaN()
Number.isNaN()用来检查一个值是否为NaN。如果参数类型不是NaN，Number.isNaN一律返回false。

>它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

## Number.parseInt(), Number.parseFloat()
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

## Number.isInteger()
Number.isInteger()用来判断一个数值是否为整数。

JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。如果参数不是数值，Number.isInteger返回false。

## Number.EPSILON
ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。

## 安全整数和 Number.isSafeInteger()
ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

## Math 对象的扩展
## 指数运算符
## BigInt 数据类型