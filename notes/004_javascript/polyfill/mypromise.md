# My Promise polyfill (undone
```javascript
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

// Promise构造函数
function _Promise() {
  // 三种状态
  const PENDING = 'pending';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';
  const fn = [].shift.call(arguments);

  // this引用
  const _this = this;
  // 内部状态
  this.PromiseStatus = PENDING;
  // 拒因
  this.PromiseValue = null;
  this.lastReason = null;
  // 回调队列
  this.onResolvedQueue = [];
  this.onRejectedQueue = [];
  this.alwaysExecuteQueue = [];

  // to be resolved
  function resolve(reason) {
    if (isPromise(reason)) {
      const _promise = reason;
      _this.PromiseStatus = _promise.PromiseStatus;

      if (_promise.PromiseStatus === RESOLVED) {
        _promise.then((reason) => resolve(reason));
      } else if (_promise.PromiseStatus === REJECTED) {
        _promise.catch((reason) => resolve(reason));
      }

      return;
    }

    _this.PromiseStatus = RESOLVED;
    _this.PromiseValue = reason;
    _this.lastReason = reason;

    _this.onResolvedQueue.forEach((callback) => {
      _this.lastReason = isFunction(callback) && callback.callback(_this, _this.lastReason);
    });
  }

  function reject(reason) {
    _this.PromiseStatus = REJECTED;
    _this.PromiseValue = reason;
    _this.lastReason = reason;

    _this.onRejectedQueue.forEach((callback) => {
      isFunction(callback) && callback.call(_this, _this.lastReason);
    });
  }

  isFunction(fn) && fn(resolve, reject);

  return this;

}
```
