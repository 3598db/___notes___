# 如何统计字符串中出现最多的字母与个数
```javascript
// reduce解法
let s = 'amjdeswfsw';
Array.prototype.reduce.call(s,(prev,next)=>{
  if(prev[next]) prev[next] ++;
  else prev[next] = 1;
  return prev;
},{});
```
