# :thinking:框架

[[toc]]

## 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

## React 中 setState 什么时候是同步的，什么时候是异步的？

## 聊聊 Redux 和 Vuex 的设计思想

## 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

## Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法

## 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

## 在 Vue 中，子组件为何不可以修改父组件传递的 Prop

## 双向绑定和 vuex 是否冲突

## Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

## redux 为什么要把 reducer 设计成纯函数

## Vue 的父组件和子组件生命周期钩子执行顺序是什么

## react-router 里的 `Link` 标签和 `a` 标签有什么区别

## vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

## React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

## vue 渲染大量数据时应该怎么优化？

## vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？

## vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法

## 谈一谈 nextTick 的原理

## Vue 中的 computed 是如何实现的（腾讯、平安）

## Vue 中的 computed 和 watch 的区别在哪里（虾皮）

## v-if、v-show、v-html 的原理是什么，它是如何封装的？

## React 中的 setState 为什么需要异步操作？

解题思路
* 保持内部一致性：props 的更新是异步的，因为re-render父组件的时候，传入子组件的props才变化；为了保持数据一致，state也不直接更新，都是在flush的时候更新
* 将state的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实 DONM，那么它将带来巨大的性能消耗
* 立即更新回来视觉上的不适应，比如在页面打开时候，多个请求发布导致频繁更改Loading 状态，会导致 Loading 图标闪烁

可能追加的面试题
* 什么时候setState会进行同步操作？
* React 官方对于setState特定情况下进行同步操作的优化方案是什么？
* React 中 setState 后想要拿到更新的state值应该怎么处理？

## React 应用如何在重新加载页面时保留数据？
* url
* localStorage

## 使用 React Hooks 的同时为什么需要使用高阶组件？

解题思路
* 反向入坑问题，如果是业务迁移可以说明进行部分改造迁移导致
* 正向说明 Reat Hooks 中不需要高阶组件的写法，例如 Redux 举例
* 自定义 Hook

可能追加的面试题
* 完全用 Hooks 的写法是否可以摒弃高阶组件的写法？
* 怎么使用 Hooks 替代高阶组件？

## Ajax 请求放在 componentDidMount 里进行处理还是放在componentWillMount 里进行处理比较合适？

解题思路
* 服务端渲染
* Event Loop

>JS 是单线程，Ajax 请求不会 "返回" 并且触发当我们正在 rendering 的时候（Ajax  的执行结果会放到任务队列中，等主线程执行完后采取读取任务队列中的任务进行执行），因为理论上放在哪里结果都一样，都会执行两次 render。这样的话，就没必要在componentWillMount中调用 Ajax，以避免理解不到位，对state的结果预计错误。componentDidMount的执行很明了，不会引起歧义，所以在componentDidMount中最合理了。

可能追加的面试题
* 说说 React 官方推荐 Ajax 请求放在 componentDidMount 里进行处理，而不是放在 componentWillMount 里进行处理？
* 如果 Ajax 请求放在 componentWillMount 里进行处理，且 Ajax 的返回结果在 render 之前，那么最终会执行几次 render ?

## React 在语法层面可以做哪些性能优化？

解题思路
* PureComponent + Redux + immutable-js / immutability-helper
* Redux ->  Redux Toolkit
* 组件库按需加载
* 动态 Ployfill
* Tree Shaking
* 路由懒加载
* Hooks useCallback
* React Fragments
* 构建函数中的事件 bind 处理
* 避免使用内联样式属性
* JSX 中合理控制条件渲染的范围（避免无谓的重复渲染）
* key
* 保持 state 中数据必响应的特性

可能追加的面试题
* 深比较和浅比较的区别是什么？
* 平常在 render 时有哪些需要注意的地方？

## React 和 Vue 的区别？

Vue CLIReact Hooks可理解为自动化 shouldComponentUpdate完整的 JavaScript / TypeScript 语法支持先进的开发工具 Lint / 编辑器 AutoHTML 更友好开发效率提升大规模应用程序的鲁棒性（灵活的结构和可扩展性）
除此之外，在语法层面：
* 在复用层面 React 可通过高阶函数、自定义 Hooks 实现。而 Vue 在大部分情况下使用 Mixin。
* Vue 的组件实例有实现自定义事件，父子组件通信可以更解耦。React 万物皆 Props 或者自己实现类似的自定义事件。
* Vue 中可以使用插槽 Slot 分发内容，React 万物皆 Props。
* Vue 中丰富的指令（确实好用，还支持灵活的自定义指令），React 万物皆 JSX。
* Vue 中的计算属性和侦听属性语法糖，React 可在特定的周期函数中进行处理。
* Vue 框架对过渡动画的支持，React 原生没发现该能力。
* Vue 提供一站式服务，React 往往在设计时需要考虑生态应用。
* Vue 全局配置、全局 API 还是挺好用的，比如 Vue.use 可全局在实例中注入对象。
* Vue 中的全局组件非常好用，不需要像 React 那样一遍遍引入组件。
* Vue 的 Template 中使用一些变量数据（例如常量）必须挂载在this上（简直蛋疼），React 中的 JSX 万物皆可 JavaScript。
* React Hooks 新颖式概念和语法设计。
* React Fragments 非常棒，Vue 暂时没发现类似的功能（会造成更多的元素嵌套问题）。

温馨提示：有更好的语法对比请在评论中告知。

可能追加的面试题
* 说说 React 和 Vue 的三个明显的区别？
* 能说说 React 相比 Vue 的优势在哪里？
* 能说说 Vue 相比 React 的优势在哪里？
* 你觉得在什么场景下用 Vue 或 React ?

## Vue CLI 3 有哪些特性？

解题思路
* 图形化界面（vue ui）
* 插件系统
* CLI 服务
* Vue CLI 无需 Eject 即可进行 Webpack 配置（针对 Create React App）
* 可配置化 Polyfill
* 现代模式
* Prefetch / Preload
* webpack-merge / webpack-chain
* 浏览器兼容性
* CSS 预处理器
* 环境变量
* 构建应用 / 库 / Web Components 组件
* 部署（CORS / PWA）
* ...

可能追加的面试题
* 有没有设计过通用的 Vuc CLI 插件？
* 有没有设计过通用的 Vue 脚手架？
* 有研究过 Vue CLI 的源码吗？

## 能对比一下 Create React App 和 Vue CLI 3 吗？

温馨提示：这里指的是默认功能比较，而不是说不能进行功能自定义扩展！
Creat React App 在工程化体系上没有 Vue CLI 3.x 更加的开箱即用，除此之外，Vue CLI 3.x 中的插件体系是一个非常棒的特性，它使自定义脚手架模板变得非常灵活（非常适合企业定制化脚手架）。当然 Create React App 是有它自己的设计理念的，对于简单的应用它是一种优势（不可配置化预先约定）。

## Vue.js 整个实现原理？

解题思路
这里简单的描述一下 Vue 2.x 的运行机制（需要注意分析的是 Runtime + Compiler 的 Vue.js）。

初始化流程：
* 创建 Vue 实例对象
* init过程会初始化生命周期，初始化事件中心，初始化渲染、执行beforeCreate周期函数、初始化 data、props、computed、watcher、执行created周期函数等。
* 初始化后，调用$mount方法对Vue实例进行挂载（挂载的核心过程包括模板编译、渲染以及更新三个过程）。
* 如果没有在 Vue 实例上定义render方法而是定义了template，那么需要经历编译阶段。需要先将template 字符串编译成 render function，template 字符串编译步骤如下 ：
  * parse正则解析template字符串形成 AST（抽象语法树，是源代码的抽象语法结构的树状表现形式）
  * optimize标记静态节点跳过 DIFF 算法（DIFF 算法是逐层进行比对，只有同层级的节点进行比对，因此时间的复杂度只有 O(n)。如果对于时间复杂度不是很清晰的，可以查看我写的文章ziyi2/algorithms-javascript/渐进记号）
  * generate将 AST 转化成render function字符串
* 编译成render function 后，调用$mount的mountComponent方法，先执行beforeMount钩子函数，然后核心是实例化一个渲染Watcher，在它的回调函数（初始化的时候执行，以及组件实例中监测到数据发生变化时执行）中调用updateComponent方法（此方法调用render方法生成虚拟 Node，最终调用update方法更新 DOM）。
* 调用render方法将render function渲染成虚拟的Node（真正的 DOM 元素是非常庞大的，因为浏览器的标准就把 DOM 设计的非常复杂。如果频繁的去做 DOM 更新，会产生一定的性能问题，而 Virtual DOM 就是用一个原生的 JavaScript 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多，而且修改属性也很轻松，还可以做到跨平台兼容），render方法的第一个参数是createElement(或者说是h函数)，这个在官方文档也有说明。
* 生成虚拟 DOM 树后，需要将虚拟 DOM 树转化成真实的 DOM 节点，此时需要调用update方法，update方法又会调用pacth方法把虚拟 DOM 转换成真正的 DOM 节点。需要注意在图中忽略了新建真实 DOM 的情况（如果没有旧的虚拟 Node，那么可以直接通过createElm创建真实 DOM 节点），这里重点分析在已有虚拟 Node 的情况下，会通过sameVnode判断当前需要更新的 Node节点是否和旧的 Node 节点相同（例如我们设置的key属性发生了变化，那么节点显然不同），如果节点不同那么将旧节点采用新节点替换即可，如果相同且存在子节点，需要调用patchVNode方法执行 DIFF 算法更新 DOM，从而提升   DOM 操作的性能。
需要注意在初始化阶段，没有详细描述数据的响应式过程，这个在响应式流程里做说明。

响应式流程：
* 在init的时候会利用Object.defineProperty方法（不兼容 IE8）监听Vue实例的响应式数据的变化从而实现数据劫持能力（利用了 JavaScript 对象的访问器属性get和set，在未来的 Vue3 中会使用 ES6 的Proxy来优化响应式原理）。在初始化流程中的编译阶段，当render function被渲染的时候，会读取Vue实例中和视图相关的响应式数据，此时会触发getter函数进行依赖收集（将观察者Watcher对象存放到当前闭包的订阅者Dep的subs中），此时的数据劫持功能和观察者模式就实现了一个 MVVM 模式中的  Binder，之后就是正常的渲染和更新流程。
* 当数据发生变化或者视图导致的数据发生了变化时，会触发数据劫持的setter函数，setter会通知初始化依赖收集中的Dep中的和视图相应的Watcher，告知需要重新渲染视图，Wather就会再次通过update方法来更新视图。
可以发现只要视图中添加监听事件，自动变更对应的数据变化时，就可以实现数据和视图的双向绑定了。

可能追加的面试题
* Vue.js 源码的入口主要做了些什么处理？
* Vue.js 中的数据劫持是怎么实现的？浏览器兼容性呢？
* Vue.js 中的依赖收集是怎么处理的？和闭包有什么关联吗？
* Vue.js 中的模板解析需要经历哪几个阶段？
* Vue.js 中的虚拟节点优势是什么？
* Vue.js 中的 DIFF 算法是怎么处理的？
* Vue.js 中 DIFF 算法的时间复杂度是多少？为什么？
* Vue.js 中 computed / watch 实现的原理是什么？
* Vue.js 中有哪些周期函数？这些周期函数都是在什么时机执行的？
* Vue.js 中的 $nextTick 的原理是什么？它主要经历了哪些变化？为什么？
* Vue.js 对 DOM 的更新做了哪些标记优化处理？
* Vue.js 在语法层面可以做哪些优化处理？
* Vue.js 2.x 中的 Proxy 代理主要做了些什么工作？
* Vue.js 2.x 中如何支持 TypeScript ?
* Vue 3.x 的源码相对 Vue 2.x 主要做了哪些变化？
* Vue.js 中的 M / V / VM 分别指的是哪些？
* Vue-loader 主要有哪些特性？
* Vue.js 如何做 ESLint 校验？
* Vue.js 如何做单元测试？
* 了解过 Vue-Router  / Vuex 的源码吗？（感知性问题，不会深入问）
* 发布 / 订阅模式和观察者模式的区别是什么？
* 手写一个发布 / 订阅模式？
* 简述 MVC / MVP / MVVM 的区别？
* 如果熟悉 Nuxt 等可能会问 SSR 的实现原理？
* 平常遇到 Vue.js 报 error / warning 的时候有深入追踪错误栈的习惯吗？
* Vue 2.x 中的数据劫持能否采用发布 / 订阅模式实现？采用观察者模式带来的优势和劣势有哪些？
* Vue 的整个框架的实现原理大致可分为哪几个部分？

## Vue.js 中组件之间通信有哪些方案？

解题思路
* Vuex
* Event Bus
* Pub / Sub
* Emit / On
* provide / inject
* Element UI dispatch / broadcast
* props
* parent / children 实例对象

可能追加的面试题
* Element UI 中 dispatch 和  broadcast 是如何实现的？
* 祖先和子孙之间通信有哪些方案？
* 任意组件之间通信有哪些方案？

## Vue 如何定制化脚手架？需要考虑哪些因素？

## $nextTick 执行的时机和 DOM 渲染的关系是什么？

可能追加的面试题
* 什么是 Event Loop ?
* 宏任务和微任务有什么区别？
* 哪些是宏任务哪些是微任务？
* $nextTick在几个版本迭代中都经历了什么变化？
* 打开新的浏览器窗口时会重新创建一个新的 Network 进程吗？

## Vue 使用的是什么版本，如何配合 TypeScript 工作，TypeScript 有哪些特性？

## Vue 里的 keep-alive 是怎么实现的？

可能追加的面试题
* 设置了 keep-alive 之后对组件渲染的生命周期有什么影响？
* keep-alive 有哪些特性？

## 说说 Vue 里的数据劫持在不同版本里是如何处理的？

## Vue 能做哪些性能优化？

解题思路
* keep-alive
* 路由懒加载
* Preload / Prefetch
* key
* 响应式依赖扁平化
* 减少非必要的响应式依赖
* Object.freeze
* DOM 滚动加载
* v-if / v-show
* computed / watch
* 事件销毁（防止内存泄漏）
* 组件按需引入
* 预渲染
* 按需 Polyfill
* 模板预编译
* 渲染函数
* 官方风格指南 + 官方 ESLint 插件
* ...

可能追加的面试题
* 路由懒加载是如何实现的？
* Coding Split 和哪些 Webpack 配置相关？
* Polyfill 是什么？Vue 支持哪些相关的可配置化信息？
* Vue 中可以使用 JSX 吗？（居然有人不清楚 JSX 是什么）

## React 中受控组件和非受控组件的区别？

解题思路
* 数据由 React 组件 / DOM 节点管理

可能追加的面试题
* 在哪些场景应该使用非受控组件？

## 公司的组件库搭建、设计与维护？

解题思路
* 完整引入 / 按需引入
* 构建流程设计
* 单元测试
* 输出模式（umd / commonjs2 / es6）
* 样式构建
* 国际化 / 工具
* ESLint / Prettier / Stylint
* TypeScript（声明） / JavaScript
* Webpack 配置 / Webpack 分析
* Babel 处理
* Polyfill 注意点
* Markdown 演示 & CI
* 三方库处理方式
* 浏览器兼容性
* Autoprefixer
* Lerna / Single Npm / Multiple Npm
* Single Npm & Template
* Git 钩子处理 & Git 规范
* 语义化版本规范
* 团队 / 范围 / 开发规范 / 代码 Review

可能追加的面试题
* Webpack 构建速度 / 性能优化？
* Webpack 分析工具？
* 组件库的框架设计？
* 构建 Bundle 优化？
* 按需加载功能可以有哪些实现方案？
* 主要负责了哪些组件的设计？
* 主动性的业务组件封装案例？
* 看过 xxx 组件库的源码设计吗？
* 设计组件的时候会考虑对 TypeScript 进行支持吗？
* 业务组件的单元测试一般需要测试什么内容？

## 了解 Element UI 组件的框架设计吗？

参考链接
* Vue CLI 3结合Lerna进行UI框架设计

## 组件库要做按需加载，觉得应该怎么做？

解题思路
* Single Npm
* Lerna
* Multi Entry Syntax

## 如何自动屏蔽 Input 的自动密码填充？

## 命令式编程（Imperative）

* 命令式编程的主要思想是关注计算机执行的步骤，即一步一步告诉计算机先做什么再做什么。
* 实现一个需求需要知道该这么做，然后通过计算机指令一步一步实现。

## 声明式编程（Declarative）

* 分类：
  * 1）领域特定语言（Domain Specific Language，DSL）：html css sql regExp
  * 2）函数式编程（Functional Program，FP）
* 声明式编程是以数据结构的形式来表达程序执行的逻辑。它的主要思想是告诉计算机应该做什么，但不指定具体要怎么做。让底层的软件/计算机/等去解决如何去实现它们。是一种对于命令式编程更高的抽象。

## 函数式编程（Functional）

* 函数式编程在声明式编程的范畴内。
* 函数式编程最重要的特点是“函数是一等公民”，即函数可以出现在任何地方，比如你可以把函数作为参数传递给另一个函数，也可以将函数作为返回值。
* 函数式编程核心概念：
  * 不可变性(Immutability)
  * 纯函数(Pure Functions)：也可以称为`无副作用性（Side-Effect）`
    * 不修改参数，返回新的对象
    * 无状态，包括不引入其他状态
    * 输入输出稳定
  * 数据转换(Data Transformations)
  * 高阶函数 (Higher-Order Functions)
  * 递归
  * 组合
    * 链式调用
    * compose

## React是什么
* React是一个简单的javascript UI库，用于构建高效、快速的用户界面。
* 它遵循组件设计模式、声明式编程范式和函数式编程概念，以使前端应用程序更高效。
* 它使用虚拟DOM来有效地操作DOM。
* 它遵循从高阶组件到低阶组件的单向数据流。

## React 和 Angular 有什么不同

## 什么是虚拟DOM及其工作原理

## 什么是JSX

## 组件和不同类型

* 函数/无状态/展示组件
  * 函数或无状态组件是一个纯函数，它可接受接受参数，并返回react元素。
  * 这些都是没有任何副作用的纯函数。
  * 这些组件没有状态或生命周期方法。
* 类/有状态组件
  * 类或有状态组件具有状态和生命周期方可能通过setState()方法更改组件的状态。
  * 类组件是通过扩展React创建的。
  * 它在构造函数中初始化，也可能有子组件。
* 受控组件
  * 受控组件是在 React 中处理输入表单的一种技术。表单元素通常维护它们自己的状态，而react则在组件的状态属性中维护状态。我们可以将两者结合起来控制输入表单。这称为受控组件。因此，在受控组件表单中，数据由React组件处理。
* 非受控组件
  * 大多数情况下，建议使用受控组件。有一种称为非受控组件的方法可以通过使用Ref来处理表单数据。在非受控组件中，Ref用于直接从DOM访问表单值，而不是事件处理程序。
* 容器组件
  * 容器组件是处理获取数据、订阅 redux 存储等的组件。它们包含展示组件和其他容器组件，但是里面从来没有html
* 高阶组件
  * 高阶组件是将组件作为参数并生成另一个组件的组件。 Redux connect是高阶组件的示例。 这是一种用于生成可重用组件的强大技术。

## Props 和 State
* Props 是只读属性，传递给组件以呈现UI和状态，我们可以随时间更改组件的输出。

## 什么是 PropTypes
随着时间的推移，应用程序会变得越来越大，因此类型检查非常重要。PropTypes为组件提供类型检查，并为其他开发人员提供很好的文档。如果react项目不使用 Typescript，建议为组件添加 PropTypes。

## 如何更新状态和不更新状态

## 组件生命周期方法
* componentWillMount - 在渲染前调用,在客户端也在服务端，它只发生一次。
* componentDidMount - 在第一次渲染后调用，只在客户端。
* componentWillReceiveProps - 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
* shouldComponentUpdate - 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 可以在你确认不需要更新组件时使用。
* componentWillUpdate - 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
* componentDidUpdate - 在组件完成更新后立即调用。在初始化时不会被调用。
* componentWillUnMount - 组件从 DOM 中移除的时候立刻被调用。
* getDerivedStateFromError - 这个生命周期方法在ErrorBoundary类中使用。实际上，如果使用这个生命周期方法，任何类都会变成ErrorBoundary。这用于在组件树中出现错误时呈现回退UI，而不是在屏幕上显示一些奇怪的错误。
* componentDidCatch - 这个生命周期方法在ErrorBoundary类中使用。实际上，如果使用这个生命周期方法，任何类都会变成ErrorBoundary。这用于在组件树中出现错误时记录错误。

## 超越继承的组合
在React中，我们总是使用组合而不是继承。我们已经在函数式编程部分讨论了什么是组合。这是一种结合简单的可重用函数来生成高阶组件的技术。

## 如何在React中应用样式
* 外部样式表
* 内联样式
* 定义样式对象并使用它

## 什么是Redux及其工作原理
* Redux 是 React的一个状态管理库，它基于flux。 Redux简化了React中的单向数据流。 Redux将状态管理完全从React中抽象出来。
* 工作流程
  * 在React中，组件连接到 redux ，如果要访问 redux，需要派出一个包含 id和负载(payload) 的 action。action 中的 payload 是可选的，action 将其转发给 Reducer。
  * 当reducer收到action时，通过 swithc...case 语法比较 action 中type。 匹配时，更新对应的内容返回新的 state。
  * 当Redux状态更改时，连接到Redux的组件将接收新的状态作为props。当组件接收到这些props时，它将进入更新阶段并重新渲染 UI。

## 什么是React路由器及其工作原理

* react-router-dom 组件
  * `BrowserRouter` 和 `HashRouter` 是路由器。
  * `Route` 用于路由匹配。
  * `Link` 组件用于在应用程序中创建链接。 它将在HTML中渲染为锚标记。
  * `NavLink`是突出显示当前活动链接的特殊链接。
  * `Switch` 不是必需的，但在组合路由时很有用。
  * `Redirect` 用于强制路由重定向

## 什么是错误边界

* ErrorBoundary类
  * 实现getDerivedStateFromError静态方法
  * 实现componentDidCatch钩子

## 什么是 Fragments
在React中，我们需要有一个父元素，同时从组件返回React元素。有时在DOM中添加额外的节点会很烦人。使用 Fragments，我们不需要在DOM中添加额外的节点。我们只需要用 `<React.Fragment></React.Fragment>` 或才简写 `<></>`来包裹内容就行了。

## 什么是传送门(Portals)
默认情况下，所有子组件都在UI上呈现，具体取决于组件层次结构。Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

## 什么是 Context
有时我们必须将props 传递给组件树，即使所有中间组件都不需要这些props 。上下文是一种传递props 的方法，而不用在每一层传递组件树。

## 什么是 Hooks

## 如何提高性能
我们可以通过多种方式提高应用性能，以下这些比较重要：
* 适当地使用shouldComponentUpdate生命周期方法。 它避免了子组件的不必要的渲染。 如果树中有100个组件，则不重新渲染整个组件树来提高应用程序性能。
* 使用create-react-app来构建项目，这会创建整个项目结构，并进行大量优化。
* 不可变性是提高性能的关键。不要对数据进行修改，而是始终在现有集合的基础上创建新的集合，以保持尽可能少的复制，从而提高性能。
* 在显示列表或表格时始终使用Keys，这会让React的更新速度更快
* 代码分离是将代码插入到单独的文件中，只加载模块或部分所需的文件的技术。

## 如何在重新加载页面时保留数据

## 如何从React中调用API
我们使用redux-thunk在React中调用API。因为reduce是纯函数，所以没有副作用，比如调用API。
因此，我们必须使用redux-thunk从 action creators 那里进行 API 调用。Action creator 派发一个action，将来自API的数据放入action 的 payload 中。Reducers 接收我们在上面的redux循环中讨论的数据，其余的过程也是相同的。
