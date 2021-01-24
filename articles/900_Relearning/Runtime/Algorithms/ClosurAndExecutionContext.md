

# 闭包
我们可以这样简单理解一下，闭包其实只是一个绑定了执行环境的函数，这个函数并不是印在书本里的一条简单的表达式，闭包与普通函数的区别是，它携带了执行的环境，就像人在外星中需要自带吸氧的装备一样，这个函数也带有在程序中生存的环境。

## 闭包组成部分

- 环境部分
  - 环境：函数的词法环境（执行上下文的一部分）
  - 标识符列表：函数中用到的未声明的变量
- 表达式部分：函数体

# 执行上下文

## 执行上下文的组成

- es3
  - scope：作用域，也常常被叫做作用域链。
  - variable object：变量对象，用于存储变量的对象。
  - this value：this 值。
- es5
  - lexical environment：词法环境，当获取变量时使用。
  - variable environment：变量环境，当声明变量时使用。
  - this value：this 值。
- es2018

  - lexical environment：词法环境，当获取变量或者 this 值时使用。
  - variable environment：变量环境，当声明变量时使用。
  - code evaluation state：用于恢复代码执行位置。
  - Function：执行的任务是函数时使用，表示正在被执行的函数。
  - ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。
  - Realm：使用的基础库和内置对象实例。
  - Generator：仅生成器上下文有这个属性，表示当前生成器。









