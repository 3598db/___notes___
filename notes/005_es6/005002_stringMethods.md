# :star:字符串的新增方法
[[toc]]
## String.fromCodePoint()
静态方法返回使用指定的代码点序列创建的字符串。   
ES5提供`String.fromCharCode()`方法，用于从`Unicode`码点返回对应字符，但是这个方法不能识别码点大于`0xFFFF`的字符。ES6提供了`String.fromCodePoint()`方法，可以识别大于`0xFFFF`的字符，弥补了`String.fromCharCode()`方法的不足。在作用上，正好与下面的`codePointAt()`方法相反。

## String.raw()
处理模板字符串的方法：
* 会再次转义模板字符串，除模板字符串外，会返回字符串转义之前的值
* 会替换变量

**API**
```js
/**
 * 作为函数调用
 * @param callSite 调用点对象{ raw: ['foo', 'bar', 'baz'] }
 * @param substitutions 任意个内插表达式对应的值
 */
String.raw(callSite, ...substitutions)

/**
 * 通过模板字符串调用
 */
String.raw`templateString`
```
**USAGE**
```js
String.raw`Hi\n${2+3}!`;
// 'Hi\n5!'，Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符

String.raw `Hi\u000A!`;             
// "Hi\u000A!"，同上，这里得到的会是 \、u、0、0、0、A 6个字符，
// 任何类型的转义形式都会失效，保留原样输出，不信你试试.length

let name = "Bob";
String.raw `Hi\n${name}!`;             
// "Hi\nBob!"，内插表达式还可以正常运行

// 正常情况下，你也许不需要将 String.raw() 当作函数调用。
// 但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
// 注意这个测试, 传入一个 string, 和一个类似数组的对象
// 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
String.raw({
  raw: ['foo', 'bar', 'baz'] 
}, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'
```

## 实例方法：codePointAt()
## 实例方法：normalize()
## 实例方法：includes(), startsWith(), endsWith()
## 实例方法：repeat()
## 实例方法：padStart()，padEnd()
## 实例方法：trimStart()，trimEnd()
## 实例方法：matchAll()
