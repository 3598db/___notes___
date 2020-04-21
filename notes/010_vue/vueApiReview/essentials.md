## 基础
### 介绍
#### Vue.js是森么
#### 起步
#### 声明式渲染
#### 条件与循环
#### 处理用户输入
#### 组件化应用构建
### Vue实例
#### 创建一个vue实例
#### 数据与方法
1. 目前2.x版本基于对象getter setter
值得注意的是只有当实例被创建时就已经存在于 data 中的属性才是响应式的。也就是说如果你添加一个新的属性，那么对 他的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。
这里唯一的例外是使用 `Object.freeze()`，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化。
2. Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 `$`，以便与用户定义的属性区分开来。
#### 实例声明周期钩子
#### 生命周期图示
![](https://cn.vuejs.org/images/lifecycle.png)
### 模板语法
Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。
在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。
如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染 (render) 函数，使用可选的 JSX 语法。
#### 插值
##### 文本
##### 原始HTML
注意，你不能使用 `v-html` 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位。
！你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。
##### 特性
##### 使用 JavaScript 表达式
这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式。
！模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 `Math` 和 `Date` 。你不应该在模板表达式中试图访问用户定义的全局变量。
#### 指令
指令 (Directives) 是带有 `v-` 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (`v-for`是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
##### 参数
一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind` 指令可以用于响应式地更新 HTML 特性:
```html
<a v-bind:href="url">...</a>
```
在这里 `href` 是参数，告知 `v-bind` 指令将该元素的 `href` 特性与表达式 `url` 的值绑定。
另一个例子是 `v-on` 指令，它用于监听 DOM 事件：
```html
<a v-on:click="doSomething">...</a>
```
在这里参数是监听的事件名。
##### 动态参数 (2.6.0+)
从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：
```html
<a v-bind:[attributeName]="url"> ... </a>
```
这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 `data` 属性 `attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。
同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：
```html
<a v-on:[eventName]="doSomething"> ... </a>
```
同样地，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`。
**对动态参数的值的约束**
动态参数预期会求出一个字符串，异常情况下值为 `null`。这个特殊的 `null` 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。
**对动态参数表达式的约束**
!动态参数表达式有一些语法约束，因为某些字符，例如空格和引号，放在 HTML 特性名里是无效的。同样，在 DOM 中使用模板时你需要回避大写键名。
例如，下面的代码是无效的：
```html
<!-- 这会触发一个编译警告 --> <a v-bind:['foo' + bar]="value"> ... </a>
```
变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。
另外，如果你在 DOM 中使用模板 (直接在一个 HTML 文件里撰写模板)，需要留意浏览器会把特性名全部强制转为小写：
```html
<!-- 在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]` --> <a v-bind:[someAttr]="value"> ... </a>
```
##### 修饰符
#### 缩写
##### v-bind 缩写
##### v-on 缩写
---
### 计算属性和侦听器
#### 计算属性
模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：
```html
<div id="example"> {{ message.split('').reverse().join('') }} </div>
```
在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 `message `的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。
所以，对于任何复杂逻辑，你都应当使用**计算属性**。
##### 基础例子
##### 计算属性缓存vs方法
你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：
```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```
```javascript
// 在组件中 methods: { reversedMessage: function () { return this.message.split('').reverse().join('') } }
```
我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要` message `还没有发生改变，多次访问 `reversedMessage`计算属性会立即返回之前的计算结果，而不必再次执行函数。
这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：
相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。
```javascript
computed: { now: function () { return Date.now() } }
```
我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。
##### 计算属性vs侦听属性
Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。细想一下这个例子：
```html
<div id="demo">{{ fullName }}</div>
```
```javascript
var vm = new Vue({ el: '#demo', data: { firstName: 'Foo', lastName: 'Bar', fullName: 'Foo Bar' }, watch: { firstName: function (val) { this.fullName = val + ' ' + this.lastName }, lastName: function (val) { this.fullName = this.firstName + ' ' + val } } })
```
上面代码是命令式且重复的。将它与计算属性的版本进行比较：
```javascript
var vm = new Vue({ el: '#demo', data: { firstName: 'Foo', lastName: 'Bar' }, computed: { fullName: function () { return this.firstName + ' ' + this.lastName } } })
```
##### 计算属性的 setter
计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
```javascript
// ... computed: { fullName: { // getter get: function () { return this.firstName + ' ' + this.lastName }, // setter set: function (newValue) { var names = newValue.split(' ') this.firstName = names[0] this.lastName = names[names.length - 1] } } } // ...
```
现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName`也会相应地被更新。
#### 侦听器
虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
---
### Class 与 Style 绑定
操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。
#### 绑定 HTML Class
##### 对象语法
##### 数组语法
##### 用在组件上
#### 绑定内联样式
##### 对象语法
##### 数组语法
##### 自动添加前缀
##### 多重值(2.3.0+)

---

### 条件渲染
#### v-if
##### 在 `<template>` 元素上使用 v-if 条件渲染分组
因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。
#### v-else
`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。
##### v-else-if(2.1.0+)
类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。
##### 用key 管理可复用的元素
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` 属性即可。
##### v-show
##### v-if vs v-show
`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。
#### v-if 与 v-for 一起使用
不推荐同时使用 `v-if` 和 `v-for`。请查阅风格指南以获取更多信息。
当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。请查阅列表渲染指南 以获取详细信息。
---
### 列表渲染
#### 用 v-for 把一个数组对应为一组元素
我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名。
在 `v-for` 块中，我们可以访问所有父作用域的属性。`v-for` 还支持一个可选的第二个参数，即当前项的索引。
你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法。
#### 在 v-for 里使用对象
!在遍历对象时，会按 `Object.keys()` 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。
#### 维护状态
当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个类似 Vue 1.x 的 `track-by="$index"`。
这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性：
```html
<div v-for="item in items" v-bind:key="item.id"> <!-- 内容 --> </div>
```
建议尽可能在使用 `v-for` 时提供 `key attribute`，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。
因为它是 Vue 识别节点的一个通用机制，`key` 并不仅与 `v-for` 特别关联。后面我们将在指南中看到，它还具有其它用途。
!不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。
#### 数组更新检测
##### 变异方法 (mutation method)
Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`
##### 替换数组
变异方法，顾名思义，会改变调用了这些方法的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如 `filter()`、`concat()` 和 `slice()` 。它们不会改变原始数组，而总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：
```javascript
example1.items = example1.items.filter(function (item) { return item.message.match(/Foo/) })
```
你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。
##### 注意事项
由于 JavaScript 的限制，Vue 不能检测以下数组的变动：
1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`
#### 对象变更检测注意事项
还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除。对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式属性。
有时你可能需要为已有对象赋值多个新属性，比如使用 `Object.assign()` 或 `_.extend()`。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：
```javascript
Object.assign(vm.userProfile, { age: 27, favoriteColor: 'Vue Green' })
```
你应该这样做：
```javascript
vm.userProfile = Object.assign({}, vm.userProfile, { age: 27, favoriteColor: 'Vue Green' })
```
#### 显示过滤/排序后的结果
#### 在 v-for 里使用值范围
`v-for` 也可以接受整数。在这种情况下，它会把模板重复对应次数。
#### 在 `<template>` 上使用 v-for
类似于 `v-if`，你也可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容。
#### v-for 与 v-if 一同使用
#### 在组件上使用 v-for
---
### 事件处理
#### 监听事件
#### 事件处理方法
#### 内敛处理器中的方法
有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法
```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)"> Submit </button>
```
#### 事件修饰符
- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`
使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。
>2.1.4 新增
```html
<!-- 点击事件将只会触发一次 --> <a v-on:click.once="doThis"></a>
```
不像其它只能对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到自定义的组件事件上。如果你还没有阅读关于组件的文档，现在大可不必担心。
>2.3.0 新增
Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。
```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 --> <!-- 而不会等待 `onScroll` 完成 --> <!-- 这其中包含 `event.preventDefault()` 的情况 --> <div v-on:scroll.passive="onScroll">...</div>
```
这个 `.passive` 修饰符尤其能够提升移动端的性能。
不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你不想阻止事件的默认行为。
#### 按键修饰符
##### 按键码
#### 系统修饰符
##### .exact 修饰符
##### 鼠标按钮修饰符
---
### 表单输入绑定
#### 基本用法
你可以用 v-model 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。
!`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。
v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。
!对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 v-model 不会在输入法组合文字过程中得到更新。如果你也想处理这个过程，请使用 input 事件。
##### 文本
##### 多行文本
##### 复选框
##### 单选按钮
##### 选择框
!如果 v-model 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。
#### 值绑定
##### 复选框
##### 单选按钮
##### 选择框的选项
#### 修饰符
##### .lazy
##### .number
##### .trim
#### 在组件上使用v-model
---
### 组件基础
#### 基本示例
#### 组件的复用
##### data必须是一个函数
一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝。
#### 组件的组织
#### 通过 Prop 向子组件传递数据
#### 单个根元素
#### 监听子组件事件
##### 使用事件抛出一个值
##### 在组件上使用 v-model
自定义事件也可以用于创建支持 v-model 的自定义输入组件。记住：
```html
<input v-model="searchText">
```
等价于：
```html
<input v-bind:value="searchText" v-on:input="searchText = $event.target.value" >
```
当用在组件上时，v-model 则会这样：
```html
<custom-input v-bind:value="searchText" v-on:input="searchText = $event" ></custom-input>
```
为了让它正常工作，这个组件内的 `<input>` 必须：
- 将其 value 特性绑定到一个名叫 value 的 prop 上
- 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
写成代码之后是这样的：
```javascript
Vue.component('custom-input', { props: ['value'], template: ` <input v-bind:value="value"      v-on:input="$emit('input', $event.target.value)"    > ` })
```
现在 v-model 就应该可以在这个组件上完美地工作起来了：
```html
<custom-input v-model="searchText"></custom-input>
```
#### 通过插槽分发内容
#### 动态组件
#### 解析 DOM 模板时的注意事项
有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。
这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：
```html
<table> <blog-post-row></blog-post-row> </table>
```
这个自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的 `is` 特性给了我们一个变通的办法：
```html
<table> <tr is="blog-post-row"></tr> </table>
```
需要注意的是**如果我们从以下来源使用模板的话，这条限制是*不存在*的**：
- 字符串 (例如：`template: '...'`)
- 单文件组件 (`.vue`)
- `<script type="text/x-template">`
