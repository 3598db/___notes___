# Object.assign

这个 polyfill 涵盖了主要的应用场景，它创建一个已经选择了原型的新对象，但没有把第二个参数考虑在内。

请注意，尽管在 ES5 中 Object.create支持设置为[[Prototype]]为null，但因为那些ECMAScript5以前版本限制，此 polyfill 无法支持该特性。
```js
if (typeof Object.create !== "function") {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object: ' + proto);
    } else if (proto === null) {
        throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    }

    if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

    function F() {}
    F.prototype = proto;

    return new F();
  };
}
```




