# Function.prototype.apply

```js
Function.prototype.apply = function(context, parameter) {
  if (typeof context === 'object') {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...parameter);
  delete context[fn];

  return result;
}
```
