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
```js
str.codePointAt(pos)
```
JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。对于这种4个字节的字符，JavaScript 不能正确处理，字符串长度会误判为2，而且charAt()方法无法读取整个字符，charCodeAt()方法只能分别返回前两个字节和后两个字节的值。ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

## 实例方法：normalize()
许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode 提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。

这两种表示方法，在视觉和语义上都等价，但是 JavaScript 

ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
## 实例方法：includes(), startsWith(), endsWith()
传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- **includes()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

## 实例方法：repeat()
repeat方法返回一个新字符串，表示将原字符串重复n次。

## 实例方法：padStart()，padEnd()
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

## 实例方法：trimStart()，trimEnd()
ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

## 实例方法：matchAll()

## 实例方法：indexOf()
indexOf() 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。
```js
str.indexOf(searchValue [, fromIndex])
```

### 使用 indexOf 统计一个字符串中某个字母出现的次数
```js
// 翻译：生存还是毁灭？这是个问题。（莎士比亚《哈姆雷特》）
var str = 'To be, or not to be, that is the question.';
var count = 0;
var pos = str.indexOf('e');

while (pos !== -1) {
  count++;
  pos = str.indexOf('e', pos + 1);
}

console.log(count); // displays 4
```
