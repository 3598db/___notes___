# 函数的重载

## case 1:
```javascript
function overLoaded () {
  switch (argument.length) {
  case 1:
    foo();
    break;
  case 2:
    bar();
    break;
  default:
    break;
  }
}
```

## case 2:
```javascript
var peopel = {
  value: ['a b', 'a c', 'b c']
};

function createOverLoaded (obj, name, fn) {
  var old = obj[name];
  
  obj[name] = function () {
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments);
    } else if () {
      return old.apply(this, arguments);
    }
  }
 }
```