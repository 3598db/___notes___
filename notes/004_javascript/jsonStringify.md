# :star:JSON.stringify总结
[[toc]]
## API
```js
JSON.stringify(value[, replacer [, space]])
```
## 参数
* **@params value** 将要序列化成 一个 JSON 字符串的值
* **@params replacer** 
  * 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；当返回JSON字符串中的value, 如下所示：
    * 如果返回一个 `Number`, 转换成相应的字符串作为属性值被添加入 JSON 字符串;
    * 如果返回一个 `String`, 该字符串作为属性值被添加入 JSON 字符串。
    * 如果返回一个 `Boolean`, "true" 或者 "false" 作为属性值被添加入 JSON 字符串。
    * 如果返回任何其他对象，该对象递归地序列化成 JSON 字符串，对每个属性调用 `replacer` 方法。除非该对象是一个函数，这种情况将不会被序列化成 JSON 字符串。
    * 如果返回 `undefined`，该属性值不会在 JSON 字符串中输出。
  * 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
  * 如果该参数为 `null` 或者未提供，则对象所有的属性都会被序列化
* **@params space** 
  * 指定缩进用的空白字符串，用于美化输出（pretty-print）；
  * 如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格;
  * 如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；
  * 如果该参数没有提供（或者为 `null`），将没有空格。

## 规则
* 转换值如果有 toJSON() 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是该对象被序列化，而是调用 toJSON 方法后的返回值会被序列化。
* 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
* `undefined`、任意的函数以及 `symbol` 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。函数、`undefined` 被单独转换时，会返回 `undefined`，如`JSON.stringify(function(){})` or `JSON.stringify(undefined)`.
* 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
* 所有以 `symbol` 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
* `Date` 日期调用了 `toJSON()` 将其转换为了 `string` 字符串（同`Date.toISOString()`），因此会被当做字符串处理。
* `NaN` 和 `Infinity` 格式的数值及 `null` 都会被当做 `null`。
* 其他类型的对象，包括 `Map`/`Set`/`WeakMap`/`WeakSet`，仅会序列化可枚举的属性。
  * 数组的string类型属性是不可被enumerable（列举）的。 `let a = ['foo', 'bar']; a['baz'] = 'quux'; // a: [ 0: 'foo', 1: 'bar', baz: 'quux' ]; JSON.stringify(a); // '["foo","bar"]'`

## 简而言之的规则分类
* `toJSON`
* 包装类型
* `undefined` & `function` & `symbol`
* 循环引用
* `[symbol]`属性
* `Date`
* `NaN` & `Infinity` & `null`

## 栗子
```js
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'

JSON.stringify({x: 5, y: 6});              
// "{"x":5,"y":6}"

JSON.stringify([new Number(1), new String("false"), new Boolean(false)]); 
// '[1,"false",false]'

JSON.stringify({x: undefined, y: Object, z: Symbol("")}); 
// '{}'

JSON.stringify([undefined, Object, Symbol("")]);          
// '[null,null,null]' 

JSON.stringify({[Symbol("foo")]: "foo"});                 
// '{}'

JSON.stringify({[Symbol.for("foo")]: "foo"}, [Symbol.for("foo")]);
// '{}'

JSON.stringify(
    {[Symbol.for("foo")]: "foo"}, 
    function (k, v) {
        if (typeof k === "symbol"){
            return "a symbol";
        }
    }
);
// undefined 

// 不可枚举的属性默认会被忽略：
JSON.stringify( 
    Object.create(
        null, 
        { 
            x: { value: 'x', enumerable: false }, 
            y: { value: 'y', enumerable: true } 
        }
    )
);
// "{"y":"y"}"
```

## 如何序列化自引用对象？
使用Douglas Crockford的cycle.js

它在全局JSON对象上新增了2个方法：
* `JSON.decycle`（将自引用的属性`myself:obj` 替换为`myself:{$ref: "$"}`）
* `JSON.retrocycle`

使用示例：
```js
var circularReference = {};
circularReference.myself = circularReference;
JSON.decycle(circularReference);
// { "$ref": "$" }
```

