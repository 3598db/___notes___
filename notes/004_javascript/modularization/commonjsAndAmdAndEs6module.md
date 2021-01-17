# CJS、AMD、CMD与ESM对比

## AMD vs. CMD

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。   
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。   
类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出。   

这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的。   
目前这些规范的实现都能达成浏览器端模块化开发的目的。

区别：
1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible。
2. CMD 推崇依赖就近，AMD 推崇依赖前置。

```js
// CMD
define(function(require, exports, module) {
  var a = require('./a')
  // 依赖可以就近书写
  a.doSomething()
  // 此处略去 100 行
  var b = require('./b')
  // 依赖可以就近书写
  b.doSomething()
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) {
  // 依赖必须一开始就写好
  a.doSomething()
  // 此处略去 100 行
  b.doSomething()
})
```
虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。

3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。

4. 还有一些细节差异，具体看这个规范的定义就好，就不多说了。


# CommonJS规范
CommonJS是通过module.exports定义模块的，但在前端浏览器中并不支持该规范：浏览器中缺少四个Node环境变量（module，exports，require，global）
webpack以及Node是采用CommonJS的规范来写的

## 特点
1. 如果module.exports是基本数据类型，和语言本身一样属于复制，在另一个模块中可以对该模块输出的变量重新赋值，并且不会影响其他模块的变量值。
```
//data.js
module.exports = 2

//test.js
let a = require("./data");
console.log(a);//2
module.exports = {
    b:{
        name:"zhang"
    }
}

//app.js
let http = require("http");
let url =require("url");
let express = require("express");
let app = new express();
let data = require("./data/data")
data = 3;
console.log(data);//3
let test = require("./data/test")
let cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get("/",(req,res)=>{

    res.send("express");//结束服务
})
app.listen(8100,"localhost",()=>{
    console.log("服务启动了")
})
```

2. 对于复杂的数据类型，例如Array，Object属于浅拷贝，即同时指向一个内存空间，因此对一个模块的值的改变可以影响另一个模块。
```
//data.js
module.exports = {
    age:10
}

//test.js
let a = require("./data");
console.log(a.age);//3
module.exports = {
    b:{
        name:"zhang"
    }
}

//app.js
let http = require("http");
let url =require("url");
let express = require("express");
let app = new express();
let data = require("./data/data")
data.age = 3;
console.log(data.age);//3
let test = require("./data/test")
let cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get("/",(req,res)=>{

    res.send("express");//结束服务
})
app.listen(8100,"localhost",()=>{
    console.log("服务启动了")
})
```

3. 当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值，也就是说，CommonJS模块无论加载多少次，都会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存/该模块输出为对象且改变该模块的输出中的属性值
4. 循环加载：CommonJS属于加载时执行，即脚本代码在require时候就会全部执行，一旦出现某个模块被循环加载，只输出(此处的输出代表只在另一个模块中导入循环加载模块的已经执行的已输出内容，即exports中的变量)已经执行的部分，未执行的部分不输出
下述代码执行过程：

* 执行c.js的内容
* require(./a.js)：执行a.js的内容
* 在第二步执行a.js的内容时遇到require('./b.js)，故去执行b.js的内容。
* 在执行b.js的内容时，遇到require('./a.js)，遇到循环加载，故只在b中导入执行过的a.js的输出内容且不执行a.js的内容（故在b.js中可访问到a.done，但其值为false），继续执行b.js的内容（在b的内容执行完毕时从上次a中断的位置继续执行，实际上是相当于在a中导入完b.js的内容后，继续执行）
* 输出：b.js-1false
* 输出：b.js-2执行完毕
* .js执行完毕，继续执行a.js中剩余的内容
* 输出：a.js-1true
* 输出：a.js-2执行完毕
* 执行require(./b.js)，由于已经执行过不会再执行b中的代码，所以直接导入b返回值。
* 输出：c.js-1 执行完毕 true true

```
// a.js
exports.done = false
let b = require('./b.js')
console.log('a.js-1', b.done)
exports.done = true
console.log('a.js-2', '执行完毕')

// b.js
exports.done = false
let a = require('./a.js')
console.log('b.js-1', a.done)
exports.done = true
console.log('b.js-2', '执行完毕')

// c.js
let a = require('./a.js')
let b = require('./b.js')

console.log('c.js-1', '执行完毕', a.done, b.done)
```

4. CommonJS加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地磁盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较实用。

# AMD规范
如果在浏览器端采用CommonJS的模块规范，则会一直等待，直到模块加载完毕。这样就会导致浏览器处于’假死’状态。故浏览器端的模块，不能采用’同步加载’，只能采用’异步加载’

Asynchronous Module Definition（AMD）：异步模块定义
AMD使用时需要引入第三方的库文件：RequireJS
在浏览器端模块化开发
在RequireJS推广过程中对模块定义的规范化产出
推崇依赖前置：在定义模块的时候就要声明其依赖的模块，并且会立即加载其依赖的模块。
对于依赖的模块，AMD是提前执行，不过RequireJS从2.0开始，也改成可以延迟执行。
适合在浏览器环境中异步加载模块，可以并行加载多个模块
提高了开发成本，并且不能按需加载，而是必须提前加载所有的依赖。
AMD支持CMD写法，在写时需要引入SeaJS库文件。但更推荐是依赖前置。
AMD 的API默认是一个当多个用，CMD的API严格区分，推崇职责单一。比如AMD里，require分全局require和局部require，都叫 require。CMD里，没有全局require，而是根据模块系统的完备性，提供seajs.use来实现模块系统的加载启动。CMD里，每个API都简单纯粹。
1. 采用require()语句加载模块，但不同于CommonJS，它要求两个参数:require([module],callback)
module：数组。元素是要加载的模块名称/地址
callback：加载成功后的回调函数
2. 采用define(id,dependencies,factory)函数来暴露模块
id（可选）：字符串，模块的标识符，如果没有提供参数，默认为文件名
dependencies（可选）：需要引入的依赖模块，使用相对路径，数组格式
factory（必须）：工厂方法，回调函数，参数为返回来的模块内容，若依赖多个模块，则有多个参数。该函数返回值为当前模块暴露出去的内容。如果该值为对象，则此对象会作为模块的输入值且无法获取依赖模块的内容。如果是函数，则只被执行一次，之后调用该模块时都会从缓存中取出该函数调用值
① 如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中
```
// math.js
　　define(function (){
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
　　　　return {
　　　　　　add: add
　　　　};
　　});
```
② 如果这个模块还依赖其他模块，那么define()函数的第一个参数必须是一个数组，指明该模块的依赖模块的地址/模块名称。
```
// math.js
//先加载test.js模块再执行回调函数
　　define(["./test.js"],function (res){
	console.log(res)
	　　　　var add = function (x,y){
	　　　　　　return x+y;
	　　　　};
	　　　　return {
	　　　　　　add: add
	　　　　};
	　　});

//test.js
define( function() {
    return {
        a:1
    }
});
```

③ 允许输出模块兼容CommonJS规范，这时define方法如下：
3. AMD采用异步加载

# CMD规范
CMD(Common Module Definition)：通用模块定义。它解决的问题和AMD规范是一样的，只不过在模块定义方式和模块加载时机上不同，CMD也需要额外的引入第三方的库文件，SeaJS

CMD是SeaJS在推广过程中对模块定义的规范化产出
推崇依赖就近，只有在用到某一模块的时候才会按需加载。
延迟执行
CMD的API严格区分，推崇职责单一
1. 采用define()方法定义模块：define(id?,dependencies?,factory)
① id：可选，字符串类型，模块标识，如果没有提供参数，默认为文件名。
② dependencies：可选，字符串数组，当前模块依赖的模块地址/名称
③ factory：回调函数，工厂方法，初始化模块需要执行的函数或对象。如果为函数，它只会在最初导入模块时调用一次，module.exports的值/返回值即为模块导出值。如果是对象，则该对象则为模块导出值。
④ 如果③中为函数，则其参数为：(require,exports,module)，CMD推崇依赖就近，则在回调函数中需要时再引入，此时require方法的返回值即为依赖模块导出值。
```
// cmd1.js
define(function(require,exports,module){
    // ...
    module.exports={
        // ..
    }
})

// cmd2.js
define(function(require,exports,module){    
    var cmd2 = require('./cmd1') 
    // cmd2.xxx 依赖就近书写
    module.exports={
        // ...
    }
})
```
2. SeaJS提供seajs.use来加载模块：seajs.use([dependencies],function(){})
① dependencies：字符串数组，依赖的模块地址/名称
② function：依赖的模块都加载成功之后的回调函数，依赖的模块的导出值会以参数的形式传入，从而在回调函数中可以获取到依赖模块的导出值。
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <script src="sea.js"></script>
        <script src="cmd2.js"></script>
        <script src="cmd1.js"></script>
        <script type="text/javascript">
            seajs.use(['cmd2.js','cmd1.js'],function(cmd2,cmd1){
                // ....
            })
        </script>
    </body>
</html>
```

# ES6模块化规范
ES6`模块中的值属于动态只读引用，即不能在引用时改变模块的导出值。
对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
对于动态来说，原始值发生变化，import加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
CommonJS和AMD都只能在运行时确定模块之间的依赖关系。在代码1中，其实质是整体加载fs模块（即加载fs模块的全部方法），生成一个对象导出，即_fs。然后再获取其中的stat,exists,reafFile方法使用。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
ES6模块化是编译时加载。由于ES6导出的不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。在代码2中，其实质是从fs模块中加载三个方法，不需要加载其中的所有方法，这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载。效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
```
//代码1
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

```
//代码2
// ES6模块
import { stat, exists, readFile } from 'fs';
```
