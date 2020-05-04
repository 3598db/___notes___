# :memo:Vue源码解析（一）：主流程
[[toc]]

## new Vue
```js {3}
function Vue (options) {
  // _init由initMixin挂载
  this._init(options);
}
```

## Vue.prototype._init
```js {36}
Vue.prototype._init = function (options?: Object) {
  const vm: Component = this
  // a uid
  vm._uid = uid++

  // 一个标志，以避免被观察到
  vm._isVue = true
  // 合并options
  // 将options挂载到$option上
  // 如果说是一个组件
  if (options && options._isComponent) {
    // 优化内部组件实例化，因为动态选项合并非常慢，并且没有内部组件选项需要特殊处理。
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }

  vm._renderProxy = vm

  // 揭露真实的自我
  vm._self = vm
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```

## Vue.prototype.$mount
```js {6}
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

## mountComponent
```js {20}
function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
  }
  callHook(vm, 'beforeMount')

  let updateComponent

  updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }

  // 我们将其设置为观察者构造函数中的vm._watcher，因为观察者的初始修补程序可能
  // 会调用$forceUpdate（例如，在子组件的已挂接钩子内部），这取决于已经定义的vm._watcher
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // 手动安装的实例，自动安装的调用被调用，以在其插入的钩子中创建渲染的子组件
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

## new Watcher
```js {60}
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
    this.expression = ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
      }
    }
    this.value = this.lazy ? undefined : this.get()
  }
}
```

## Watcher.prototype.get
```js {6}
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
  return value
}
```

## updateComponent
```js {2}
updateComponent = function () {
  vm._update(vm._render(), hydrating);
};
```

## Vue.prototype._render
```js {24}
// 通过renderMixin混入
Vue.prototype._render = function (): VNode {
  const vm: Component = this
  const { render, _parentVnode } = vm.$options

  if (_parentVnode) {
    vm.$scopedSlots = normalizeScopedSlots(
      _parentVnode.data.scopedSlots,
      vm.$slots,
      vm.$scopedSlots
    )
  }

  // 设置父vnode。 这使渲染功能可以访问占位符节点上的数据。
  vm.$vnode = _parentVnode
  // render自身
  let vnode
  try {
    // 无需维护堆栈，因为所有渲染fns都彼此分开调用。 修补父组件时，将调用嵌套组件的渲染fns。

    // render方法核心逻辑
    // 调用vm实例的render函数返回一个vnode
    currentRenderingInstance = vm
    vnode = render.call(vm._renderProxy, vm.$createElement)

  } catch (e) {
    handleError(e, vm, `render`)
    // 返回错误渲染结果，或返回先前的vnode以防止导致空白组件的渲染错误
    vnode = vm._vnode
    
  } finally {
    currentRenderingInstance = null
  }
  // 如果返回的数组仅包含一个节点，则允许它
  if (Array.isArray(vnode) && vnode.length === 1) {
    vnode = vnode[0]
  }
  // 如果渲染函数出错，则返回空的vnode
  if (!(vnode instanceof VNode)) {
    vnode = createEmptyVNode()
  }
  // 设置parent
  vnode.parent = _parentVnode
  return vnode
}
```

## render.call()
```js {3}
(function anonymous() {
  with(this) {
    return _c('sel', [], {}, 1)
  }
})
```

## reactiveGetter
```js {5}
function reactiveGetter () {
  var value = getter ? getter.call(obj) : val;
  // 触发依赖收集 其实每一次求值都会重新收集一次
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
}
```

## Dep.prototype.depend
```js {4}
Dep.prototype.depend = function depend () {
  // 调用watcher对象的addDep方法
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};
```

## Watcher.prototype.addDep
```js {9}
Watcher.prototype.addDep = function addDep (dep: Dep) {
  var id = dep.id;
  // 我觉得目前这么做的目的主要是每次get求值都会触发依赖收集
  // 防止重复订阅
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
```

## Dep.prototype.addSub
```js {3}
// 将watcher放入依赖集合
Dep.prototype.addSub = function addSub (sub: Watcher) {
  this.subs.push(sub);
};
```
