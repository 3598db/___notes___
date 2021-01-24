# JavaScript中的$$(*)代表什么和$选择器的由来
你在jsfiddle 里面运行 会发现 $$ 输出的其实是 undefined。 但是现在你新开一个窗口打开console(F2)，输入$$， 然后就在Chrome中就会输出:

```javascript
bound: function () {
  return document.querySelectorAll.apply(document, arguments)
}
```

注:上面的Chrome版本比较旧，其实较新版会输出这个

```javascript
function (selector){
	var elements = new Elements;
	if (arguments.length == 1 && typeof selector == 'string') return Slick.search(this.document, selector, elements);
	var args = Array.flatten(arguments);
	for (var i = 0, l = args.length; i < l; i++){
		var item = args[i];
		switch (typeOf(item)){
			case 'element': elements.push(item); break;
			case 'string': Slick.search(this.document, item, elements);
		}
	}
	return elements;
}
```
在Firefox的开发控制台中$$也是定义了的。这个函数只是开发控制台内部使用的吗？

firebuglite中$$的定义是这样的:
```javascript
this.$$ = function(selector)
{
    return FBL.getElementsBySelector(baseWindow.document, selector);
};
```

因为只是内部使用的。

### 这跟Javascript的历史有关

在很多浏览器的设计工具中有大量的预定义API ，大部分是从Firebug中借鉴的，因为Firebug的设计（大部分）是正确的。

当Firebug在2006年被创立的时侯。当时的Javascript库Prototype.js使用$来表示getElementById()。这个语法糖很方便地抓取到了用户想要的元素。它节省了大量的时间，之后整个框架都使用采用了$语法糖。

在2006年初，jQuery发布了，然后使用基于CSS选择器的$()语法来选择任意元素。在之后的几天，Prototype也发布了自己的CSS选择器引擎，但是$已经在他们的库中被占用了。所以它们换成了$$()。称之为bling-bling 函数。

所以Firebug采用了Prototype的API，因为它在2006年仍然非常流行。在后jQuery的日子里， 它等价于： window.$ = document.querySelectorAll.bind(document) 。有趣的是在Opera的开发工具中，它们也采用$作为querySelectorAll的别名。

[原文地址](https://stackoverflow.com/questions/8981211/what-is-the-source-of-the-double-dollar-sign-selector-query-function-in-chrome-f?utm_source=ourjs.com)
