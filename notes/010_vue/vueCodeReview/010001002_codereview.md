# :star:Vue源码解析（二）：响应式处理

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

## defineReactive
```js
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
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

## new Dep
```js
class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }
}
```




