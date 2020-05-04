# :memo:Vue源码解析（二）：响应式处理
[[toc]]
## 数据逻辑结构
```js
{
  parent: {
    child: true
    // 观察者
    __ob__: Observer : {
      // 依赖中心
      dep: Dep : {
        id: 0,
        // 订阅集合
        subs: [Watcher]
      },
      value: this
      vmCount: 0
    }
  }
  // 观察者
  __ob__: Observer : {
      // 依赖中心
      dep: Dep : {
        id: 0,
        // 订阅集合
        subs: [Watcher]
      },
      value: this
      vmCount: 0
    }
}

```
在递归遍历对象的时候，对于对象的每一个层级都会去实例化一个观察者，并且在实例化每一个观察者的时候会实例化订阅中心，挂载value，vmCount属性。

```js
// 监听对象
export function observe (value: any, asRootData: ?boolean): Observer | void {
  // 如果不是对象或者是vnode返回
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  // 如果已经被监听 返回监听对象
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  // shouldObserve & !isServerRendering & (isArray | isPlainObject) & isExtensible & !_isVue
  // 实例监听对象
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```
## Observer
```js
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    // 将data挂在value上
    this.value = value
    // 每个__ob__对象会有一个Dep对象
    // 每个组件会对应一个__ob__对象
    this.dep = new Dep()
    this.vmCount = 0
    // 把自己挂载在data.__ob__上
    def(value, '__ob__', this)

    // 数组
    if (Array.isArray(value)) {
      // 保留数组的原型方法
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    // 非数组
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

}
```

```js
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  // 每个value都会对于一个闭包Dep依赖对象
  var dep = new Dep();

  // Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
  var property = Object.getOwnPropertyDescriptor(obj, key);
  // 不可配置
  if (property && property.configurable === false) {
    return
  }

  // 满足预定义的getter/setter
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  // 定义子观察者
  var childOb = !shallow && observe(val);
  // 数据劫持
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      // 依赖收集
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (customSetter) {
        customSetter();
      }
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
```

## Dep
```js
let uid = 0
class Dep {
  // 静态属性
  static target: ?Watcher;
  // Dep对象id
  id: number;
  // 收集的watcher
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  // 收集watcher
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 将watcher从依赖队列中删除
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // 调用watcher的addDep方法
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

```
## Watcher
```js
class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  // get求值 依赖收集
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    debugger;
    return value
  }

  // 向该指令添加一个依赖项。
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  // 清理依赖项收集
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  // 订阅者接口
  // 将会在依赖更新时被调用
  update () {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  // 调度器任务接口 将会被调度器调用
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // 即使值是相同的，深度观察者和对象/数组上的观察者也应该触发，因为值可能已经发生了突变
        isObject(value) ||
        this.deep
      ) {
        // 设置新值
        const oldValue = this.value
        this.value = value
        // 自定义watcher逻辑
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  // watcher求值 仅被lazy watchers调用
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  // 将自己从所有依赖项的订阅列表中删除
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
```


