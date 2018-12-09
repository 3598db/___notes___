[Elity](https://github.com/Elity)提供的思路
```javascript
export default function VueGlobalError(handle) {
  if (typeof handle !== "function")
    throw new TypeError(handle + " is not a function");
  let VueGlobalErrorHandlePlugin = {};
  VueGlobalErrorHandlePlugin.install = (Vue, options) => {
    Vue.mixin({
      beforeCreate() {
        const methods = this.$options.methods || {};
        Object.keys(methods).forEach(key => {
          let fn = methods[key];
          this.$options.methods[key] = function(...args) {
            let ret = fn.apply(this, args);
            if (ret && typeof ret.catch === "function") {
              return ret.catch(handle);
            } else {
              return ret;
            }
          };
        });
      }
    });
  };
  return VueGlobalErrorHandlePlugin;
}
```
Usage
```javascript
// in main.js

Vue.use(VueGlobalError(err=>{
  // handle global error
}))
```
```javascript
function maybeAsyncError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => Math.random() > 0.5 ? resolve() : reject('async throw error'), 100)
  })
}

// in component
export default {

  method:{
    async fn() {
      throw 'sync throw error'
    },
    async fn1(){
      await maybeAsyncError()
    }
  }

}
```



