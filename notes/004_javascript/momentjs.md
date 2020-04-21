# [momentjs]安利一个时间格式化插件

## 文档
[momentjs](http://momentjs.com/docs/) - 可惜文档是英文的, 读起来有一点费力.

<!--more-->
## 用法
具体的用法官网有, 没有太多时间, 直接放上一个项目在用的案例:

### 描述
查询接口, 需要按时间查询, 支持按天, 按周, 按月, 按年查询, 接口时间格式为'yyyy-mm-dd hh-MM-ss', 且需要传入开始和结束时间 :)
如果没有格式化插件, 自己写还是有点费时间;

### 实现
```javascript
// 按天
// start
moment(time).format('YYYY-MM-DD 00:00:00');
// end
moment(time).format('YYYY-MM-DD 23:59:59');

// 按周
// start
moment(time).day(1).format('YYYY-MM-DD 00:00:00');
// end
moment(time).day(7).format('YYYY-MM-DD 23:59:59');

// 按月
// start
moment(time).startOf('month').format('YYYY-MM-DD 00:00:00');
// end
moment(time).endOf('month').format('YYYY-MM-DD 23:59:59');

// 按天
// start
moment(time).startOf('year').format('YYYY-MM-DD 00:00:00');
// end
moment(time).endOf('year').format('YYYY-MM-DD 23:59:59');

// 其中实例化过程中支持传入的time比较强大
// 具体可以查阅官网文档
```

完.