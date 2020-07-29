# EventLoop

## promisify sleep
```js
function sleep(duration){
  return new Promise(function(resolve){
    setTimeout(resolve, duration);
  })
}
```































