# 其他数组操作

# 扁平化数组
```javascript
const flattenDeep = arr => {
  return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};
```

# 数组去重
1. 利用对象属性不会重复这一特性 (性能最好)
```javascript
function distinct (a,b){
  let arr = a.concat(b)
  let result = []
  let obj = {}
  for (let i of arr) {
    if(!obj[i]){
      result.push(i)
      obj[i] = 1
    }
  }
  return result
}
```

2. Set
```javascript
function distinct(a,b){
   return Array.from(new Set([...a,...b]))
}
```

2. 排序比对相邻元素
```javascript
function distinct(a,b) {
  let arr = a.concat(b)
  arr = arr.sort()
  let result = [arr[0]]
  for (let i = 1,len = arr.length; i < len; i++){
    arr[i] !== arr[i-1] && result.push(arr[i])
  }
  return result;
}
```