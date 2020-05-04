# new

```javascript
function new() {
  let instance = {};
  let shift = Array.prototype.shift;
  let constructor = shift.call(arguments);

  instace.__proto__ = constructor.prototype;

  // 实现继承
  let result = constructor.apply(instance, arguments);

  return typeof result === 'object' ? result : instance;
}
```
