# AMD

<!--
修改本文档请以注释的方式保留原文，以便其它翻译者指正以及对本文档更新。
-->

<!-- **This is a copy of the ["AMD" document in the repo](https://github.com/amdjs/amdjs-api/blob/master/AMD.md), kept here to maintain historical links. If this document differs from the one in the repo, the repo version is the correct one.** -->
<!--
**本文是[源"AMD"文档](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)的一份拷贝，以维护历史链接。文中任何与源文档不一致之处，以源文档为准。** 
-->
**本文是[源仓库里的"AMD"文档](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)的一份拷贝，放在这里是用来维护历史链接。文中任何与源仓库里的文档不一致之处，以源仓库里的文档为准。**  

<!-- The Asynchronous Module Definition (**AMD**) API specifies a mechanism for defining modules such that the module and its dependencies can be asynchronously loaded. This is particularly well suited for the browser environment where synchronous loading of modules incurs performance, usability, debugging, and cross-domain access problems. -->
<!--
异步模块定义（**AMD**）的编程接口提供了定义模块，及异步加载该模块的依赖的机制。它非常适合于在浏览器环境中使用，浏览器的同步加载模块机制会带来性能、可用性、调试和跨域访问的问题。-->
异步模块定义规范（**AMD**）制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。  

<!-- It is unrelated to the technology company [AMD](http://en.wikipedia.org/wiki/Advanced_Micro_Devices) and the processors it makes. -->
<!--与科技公司[AMD](http://en.wikipedia.org/wiki/Advanced_Micro_Devices) 及其制造的处理器无关。-->
此AMD与科技公司[AMD](http://en.wikipedia.org/wiki/Advanced_Micro_Devices) 及其制造的AMD处理器无关。  

<!-- * [Tests](https://github.com/amdjs/amdjs-tests)
* [Discussion](https://groups.google.com/group/amd-implement) -->

* [测试](https://github.com/amdjs/amdjs-tests)
* [讨论](https://groups.google.com/group/amd-implement)

<!-- # API Specification -->

# API说明

<!-- ## define() function <a name="define"></a> -->

## define() 函数 <a name="define"></a>

<!-- The specification defines a single function "define" that is available as a free variable or a global variable. The signature of the function: -->

本规范只定义了一个函数 "define"，它是全局变量。函数的描述为：

```javascript
    define(id?, dependencies?, factory);
```

### id <a name="define-id"></a>

### 名字 <a name="define-id"></a>

<!-- The first argument, id, is a string literal. It specifies the id of the module being defined. This argument is optional, and if it is not present, the module id should default to the id of the module that the loader was requesting for the given response script. When present, the module id MUST be a "top-level" or absolute id (relative ids are not allowed). -->

第一个参数，id，是个字符串。它指的是定义中模块的名字，这个参数是可选的。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名**必须**是“顶级”的和绝对的（不允许相对名字）。

<!-- #### module id format <a name="define-id-notes"></a> -->

#### 模块名的格式 <a name="define-id-notes"></a>

<!-- Module ids can be used to identify the module being defined, and they are also used in the dependency array argument. Module ids in AMD are a superset of what is allowed in [CommonJS Module Identifiers](http://wiki.commonjs.org/wiki/Modules/1.1.1#Module_Identifiers). Quoting from that page:

* A module identifier is a String of "terms" delimited by forward slashes.
* A term must be a camelCase identifier, ".", or "..".
* Module identifiers may not have file-name extensions like ".js".
* Module identifiers may be "relative" or "top-level". A module identifier is "relative" if the first term is "." or "..".
* Top-level identifiers are resolved off the conceptual module name space root.
* Relative identifiers are resolved relative to the identifier of the module in which "require" is written and called. -->

模块名用来唯一标识定义中模块，它们同样在依赖数组中使用。AMD的模块名规范是[CommonJS模块名规范](http://wiki.commonjs.org/wiki/Modules/1.1.1#Module_Identifiers)的超集。引用如下：

* 模块名是由一个或多个单词以正斜杠为分隔符拼接成的字符串
* 单词须为驼峰形式，或者"."，".."
* 模块名不允许文件扩展名的形式，如".js"
* 模块名可以为 "相对的" 或 "顶级的"。如果首字符为"."或".."则为"相对的"模块名
* 顶级的模块名从根命名空间的概念模块解析
* 相对的模块名从 "require" 书写和调用的模块解析

<!-- The CommonJS module id properties quoted above are normally used for JavaScript modules. -->

上文引用的CommonJS模块id属性常被用于JavaScript模块。

<!-- Relative module ID resolution examples:

* if module `"a/b/c"` asks for `"../d"`, that resolves to `"a/d"`
* if module `"a/b/c"` asks for `"./e"`, that resolves to `"a/b/e"` -->

相对模块名解析示例：
* 如果模块 `"a/b/c"` 请求 `"../d"`, 则解析为`"a/d"`
* 如果模块 `"a/b/c"` 请求 `"./e"`, 则解析为`"a/b/e"`

<!-- If [[Loader-Plugins]] are supported in the AMD implementation, then "!" is used to separate the loader plugin's module id from the plugin's resource id. Since plugin resource ids can be extremely free-form, most characters should be allowed for plugin resource ids. -->

如果AMD的实现支持[[加载器插件(Loader-Plugins)]],则"!"符号用于分隔加载器插件模块名和插件资源名。由于插件资源名可以非常自由地命名，大多数字符都允许在插件资源名使用。

（译注：[关于Loader-Plugins](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins)）

<!-- ### dependencies <a name="define-dependencies"></a> -->


### 依赖 <a name="define-dependencies"></a>

<!-- The second argument, dependencies, is an array literal of the module ids that are dependencies required by the module that is being defined. The dependencies must be resolved prior to the execution of the module factory function, and the resolved values should be passed as arguments to the factory function with argument positions corresponding to indexes in the dependencies array. -->

第二个参数，dependencies，是个定义中模块所依赖模块的数组。依赖模块必须根据模块的工厂方法优先级执行，并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入（定义中模块的）工厂方法中。


<!-- The dependencies ids may be relative ids, and should be resolved relative to the module being defined. In other words, relative ids are resolved relative to the module's id, and not the path used to find the module's id. -->

依赖的模块名如果是相对的，应该解析为相对定义中的模块。换句话来说，相对名解析为相对于模块的名字，并非相对于寻找该模块的名字的路径。

<!-- This specification defines three special dependency names that have a distinct resolution. If the value of "require", "exports", or "module" appear in the dependency list, the argument should be resolved to the corresponding free variable as defined by the CommonJS modules specification. -->

本规范定义了三种特殊的依赖关键字。如果"require","exports", 或 "module"出现在依赖列表中，参数应该按照CommonJS模块规范自由变量去解析。


<!-- The dependencies argument is optional. If omitted, it should default to ["require", "exports", "module"]. However, if the factory function's arity (length property) is less than 3, then the loader may choose to only call the factory with the number of arguments corresponding to the function's arity or length. -->

依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的形参个数小于3，加载器会选择以函数指定的参数个数调用工厂方法。

<!-- ### factory <a name="define-factory"></a> -->

### 工厂方法 <a name="define-factory"></a>

<!-- The third argument, factory, is a function that should be executed to instantiate the module or an object. If the factory is a function it should only be executed once. If the factory argument is an object, that object should be assigned as the exported value of the module. -->

第三个参数，factory，为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

<!-- If the factory function returns a value (an object, function, or any value that coerces to true), then that value should be assigned as the exported value for the module. -->

如果工厂方法返回一个值（对象，函数，或任意强制类型转换为true的值），应该为设置为模块的输出值。

<!-- #### Simplified CommonJS wrapping <a name="commonjs-wrap"></a> -->

#### 简单的 CommonJS 转换 <a name="commonjs-wrap"></a>

<!-- If the dependencies argument is omitted, the module loader MAY choose to scan the factory function for dependencies in the form of require statements (literally in the form of require("module-id")). The first argument must literally be named require for this to work. -->

如果依赖性参数被忽略，模块加载器**可以**选择扫描工厂方法中的require语句以获得依赖性（字面量形为require("module-id")）。第一个参数必须字面量为require从而使此机制正常工作。

<!-- In some situations module loaders may choose not to scan for dependencies due to code size limitations or lack of toString support on functions (Opera Mobile is known to lack toString support for functions). -->

在某些情况下，因为脚本大小的限制或函数不支持toString方法（Opera Mobile是已知的不支持函数的toString方法），模块加载器可以选择扫描不扫描依赖性。

<!-- If the dependencies argument is present, the module loader SHOULD NOT scan for dependencies within the factory function. -->

如果有依赖参数，模块加载器**不应该**在工厂方法中扫描依赖性。

<!-- ## define.amd property <a name="defineAmd"></a> -->

## define.amd 属性 <a name="defineAmd"></a>

<!-- To allow a clear indicator that a global define function (as needed for script src browser loading) conforms to the AMD API, any global define function SHOULD have a property called "amd" whose value is an object. This helps avoid conflict with any other existing JavaScript code that could have defined a define() function that does not conform to the AMD API. -->

为了清晰的标识全局函数（为浏览器加载script必须的）遵从AMD编程接口，任何全局函数**应该**有一个"amd"的属性，它的值为一个对象。这样可以防止与现有的定义了define函数但不遵从AMD编程接口的代码相冲突。

<!-- The properties inside the define.amd object are not specified at this time. It can be used by implementers who want to inform of other capabilities beyond the basic API that the implementation supports. -->

当前，define.amd对象的属性没有包含在本规范中。实现本规范的作者，可以用它通知超出本规范编程接口基本实现的额外能力。

<!-- Existence of the define.amd property with an object value indicates conformance with this API. If there is another version of the API, it will likely define another property, like define.amd2, to indicate implementations that conform to that version of the API. -->

define.amd的存在表明函数遵循本规范。如果有另外一个版本的编程接口，那么应该定义另外一个属性，如define.amd2，表明实现只遵循该版本的编程接口。

<!-- An example of how it may be defined for an implementation that allows loading more than one version of a module in an environment: -->

一个如何定义同一个环境中允许多次加载同一个版本的模块的实现：

```javascript
    define.amd = {
      multiversion: true
    };
```
<!-- The minimum definition: -->

最简短的定义：

```javascript
    define.amd = {};
```

<!-- ## Transporting more than one module at a time <a name="transporting"></a> -->

## 一次输出多个模块 <a name="transporting"></a>

<!-- Multiple define calls can be made within a single script. The order of the define calls SHOULD NOT be significant. Earlier module definitions may specify dependencies that are defined later in the same script. It is the responsibility of the module loader to defer loading unresolved dependencies until the entire script is loaded to prevent unnecessary requests. -->

在一个脚本中可以使用多次define调用。这些define调用的顺序**不应该**是重要的。早一些的模块定义中所指定的依赖，可以在同一脚本中晚一些定义。模块加载器负责延迟加载未解决的依赖，直到全部脚本加载完毕，防止没必要的请求。

<!-- # Examples <a name="examples"></a> -->

# 例子 <a name="examples"></a>

<!-- ## Using require and exports -->

## 使用 require 和 exports

<!-- Sets up the module with ID of "alpha", that uses require, exports and the module with ID of "beta": -->

创建一个名为"alpha"的模块，使用了require，exports，和名为"beta"的模块:

```javascript
   define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
       exports.verb = function() {
           return beta.verb();
           //Or:
           return require("beta").verb();
       }
   });
```

<!-- An anonymous module that returns an object literal: -->

一个返回对象的匿名模块：

```javascript
   define(["alpha"], function (alpha) {
       return {
         verb: function(){
           return alpha.verb() + 2;
         }
       };
   });
```

<!-- A dependency-free module can define a direct object literal: -->

一个没有依赖性的模块可以直接定义对象：


```javascript
   define({
     add: function(x, y){
       return x + y;
     }
   });
```

<!-- A module defined using the simplified CommonJS wrapping: -->

一个使用了简单CommonJS转换的模块定义：

```javascript
   define(function (require, exports, module) {
     var a = require('a'),
         b = require('b');

     exports.action = function () {};
   });
```

<!-- # Global Variables <a name="global"></a> -->

# 全局变量 <a name="global"></a>

<!-- This specification reserves the global variable "define" for use in implementing this specification, the package metadata asynchronous definition API and is reserved for other future CommonJS APIs. Module loaders SHOULD not add additional methods or properties to this function. -->

本规范保留全局变量"define"以用来实现本规范。包额外信息异步定义编程接口是为将来的CommonJS API保留的。模块加载器**不应**在此函数添加额外的方法或属性。

<!-- This specification reserves the global variable "require" for use by module loaders. Module loaders are free to use this global variable as they see fit. They may use the variable and add any properties or functions to it as desired for module loader specific functionality. They can also choose not to use "require" as well. -->

本规范保留全局变量"require"被模块加载器使用。模块加载器可以在合适的情况下自由地使用该全局变量。它可以使用这个变量或添加任何属性以完成模块加载器的特定功能。它同样也可以选择完全不使用"require"。


<!-- # Usage notes <a name="usage"></a> -->

# 使用注意 <a name="usage"></a>

<!-- It is recommended that define calls be in the literal form of 'define(...)' in order to work properly with static analysis tools (like build tools). -->

为了使静态分析工具（如build工具）可以正常工作，推荐使用字面上形如的'define(...)'。

<!-- # Relation to CommonJS <a name="commonjs-relation"></a> -->

# 与CommonJS的关系 <a name="commonjs-relation"></a>

<!-- A version of this API started on the CommonJS wiki as a transport format, as Modules Transport/C, but it changed over time to also include a module definition API. Consensus was not reached on the CommonJS list about recommending this API as a module definition API. The API was transferred over to its own wiki and discussion group. -->

一个关于本API的wiki开始在CommonJS wiki中创建了，作为中转的格式，模块中转。但是为了包含模块定义接口，随着时间而不断改变。在CommonJS列表中关于推荐本API作为模块定义API尚未达成一致。本API被转移到它自己的wiki和讨论组中。

<!-- AMD can be used as a transport format for CommonJS modules as long as the CommonJS module does not use computed, synchronous require('') calls. CommonJS code that use computed synchronous require('') code can be converted to use the callback-style [[require]] supported in most AMD loaders. -->

AMD可以作为CommonJS模块一个中转的版本只要CommonJS没有被用来同步的require调用。使用同步require调用的CommonJS代码可以被转换为使用回调风格的AMD模块加载器。
