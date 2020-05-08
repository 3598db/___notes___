# :memo:优化

## 网络层面

### DNS 解析
### TCP 连接
### HTTP 请求/响应
1. 减少请求次数
2. 减少单词请求所花费的时间

措施：资源压缩和合并

优化对象：webpack

webpack性能瓶颈
* webpack构建过程太花时间
* webpack打包的体积太大

webpack优化策略：
1. loader：
* 限定范围
* 开启缓存

2. 分离第三方库：
CommonsChunkPlugin
DllPlugin






