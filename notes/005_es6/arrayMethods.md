
# :star:数组的方法
## Array.from()
* Array.from() 方法从一个类似数组(拥有一个 length 属性和若干索引属性的任意对象)或可迭代对象创建一个新的，浅拷贝的数组实例
* Array.from(arrayLike[, mapFn[, thisArg]])
参数

arrayLike
想要转换成数组的伪数组对象或可迭代对象。
mapFn 可选
如果指定了该参数，新数组中的每个元素会执行该回调函数。
thisArg 可选
可选参数，执行回调函数 mapFn 时 this 对象。
* 在 ES2015 中， Class 语法允许我们为内置类型（比如 Array）和自定义类新建子类（比如叫 SubArray）。这些子类也会继承父类的静态方法，比如 SubArray.from()，调用该方法后会返回子类 SubArray 的一个实例，而不是 Array 的实例。

## Array.isArray()
* 用于确定传递的值是否是一个 Array。 
* 鲜为人知的事实：其实 Array.prototype 也是一个数组。
## ~~Array.observe()~~
## Array.of()
方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。 
## Array.prototype.concat()
方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组
## Array.prototype.copyWithin()
## Array.prototype.entries()
## Array.prototype.every()
## Array.prototype.fill()
## Array.prototype.filter()
## Array.prototype.find()
## Array.prototype.findIndex()
## Array.prototype.flat()
## Array.prototype.flatMap()
## Array.prototype.forEach()
## Array.prototype.includes()
## Array.prototype.indexOf()
## Array.prototype.join()
## Array.prototype.keys()
## Array.prototype.lastIndexOf()
## Array.prototype.map()
## Array.prototype.pop()
## Array.prototype.push()
## Array.prototype.reduce()
## Array.prototype.reduceRight()
## Array.prototype.reverse()
## Array.prototype.shift()
## Array.prototype.slice()
## Array.prototype.some()
## Array.prototype.sort()
## Array.prototype.splice()
## Array.prototype.toLocaleString()
## Array.prototype.toSource()
## Array.prototype.toString()
## Array.prototype.unshift()
## Array.prototype.values()
## Array.prototype[@@iterator]()
## Array.unobserve() 
## get Array[@@species]


