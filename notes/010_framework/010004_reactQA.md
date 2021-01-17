# react常见问题总结

## 传递函数给组件

### 如何将事件处理器（比如 onClick）传递给组件？
可以将事件处理器和其他函数作为 props 传递给子组件，如果需要在事件处理器中访问父组件，还需要为该函数绑定组件实例。

### 如何为函数绑定组件实例
* 在构造函数中绑定（ES2015）
```js
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}

```
* class 属性（第三阶段提案）
```js
class Foo extends Component {
  // Note: this syntax is experimental and not standardized yet.
  handleClick = () => {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```
* 在 Render 中的绑定
```js
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={this.handleClick.bind(this)}>Click Me</button>;
  }
}
```
* 在 Render 中使用箭头函数
```js
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={() => this.handleClick()}>Click Me</button>;
  }
}
```
>注意：在 render 方法中使用箭头函数或者使用Function.prototype.bind，会在每次组件渲染时创建一个新的函数，这会破坏基于恒等比较的性能优化。

### 可以在 render 方法中使用箭头函数吗？
一般来说是可以的，并且使用箭头函数是向回调函数传递参数的最简单的办法。

但是如果遇到了性能问题，一定要进行优化！

### 为什么绑定是必要的？
纠正函数执行过程中正确的this指向。

### 为什么我的函数每次组件渲染时都会被调用？
确保你在传递一个函数给组件时，没有调用这个函数，正确做法是，传递函数本身（不带括号）。

### 如何传递参数给事件处理器或回调？

### 怎样阻止函数被调用太快或者太多次？
* 节流：基于时间的频率来进行抽样更改 (例如 `_.throttle`)
* 防抖：一段时间的不活动之后发布更改 (例如 `_.debounce`)
* requestAnimationFrame节流：基于 `requestAnimationFrame` 的抽样更改 (例如 raf-schd)

>注意：`_.debounce`、`_.throttle` 和 `raf-schd` 都提供了一个 cancel 方法来取消延迟回调。你需要在 componentWillUnmount 中调用该方法，或者对代码进行检查来保证在延迟函数有效期间内组件始终挂载。

