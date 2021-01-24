# Function.prototype.call

```js
Function.prototype.call = function (context, ...params) {
  if (typeof context === 'object') {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...params);
  delete context.fn;

  return result;
}
```
