# HTTP权威指南

## 第十一章 客户端识别与cookie机制

早期的 Web 站点设计者们(他们都是些注重实际的人)都有自己的用户识别技术
* 承载用户身份信息的 HTTP 首部。
* 客户端 IP 地址跟踪，通过用户的 IP 地址对其进行识别。
* 用户登录，用认证方式来识别用户。
* 胖 URL，一种在 URL 中嵌入识别信息的技术。
* cookie，一种功能强大且高效的持久身份识别技术。

#### 7.5.4 区分命中和未命中的情况
不幸的是，HTTP 没有为用户提供一种手段来区分响应是缓存命中的，还是访问原 始服务器得到的。在这两种情况下，响应码都是 200 OK，说明响应有主体部分。有 些商业代理缓存会在 Via 首部附加一些额外信息，以描述缓存中发生的情况。   
客户端有一种方法可以判断响应是否来自缓存，就是使用 Date 首部。将响应中 Date 首部的值与当前时间进行比较，如果响应中的日期值比较早，客户端通常就可以认为这是一条缓存的响应。客户端也可以通过 Age 首部来检测缓存的响应，通过 这个首部可以分辨出这条响应的使用期(参见附录 C 中的 Age 首部)。

### 7.7 缓存的处理步骤
现代的商业化代理缓存相当地复杂。这些缓存构建得非常高效，可以支持 HTTP 和 其他一些技术的各种高级特性。但除了一些微妙的细节之外，Web 缓存的基本工作 原理大多很简单。对一条 HTTP GET 报文的基本缓存处理过程包括 7 个步骤(参见 图 7-11)。
1. 接收——缓存从网络中读取抵达的请求报文。
2. 解析——缓存对报文进行解析，提取出 URL 和各种首部。
3. 查询——缓存查看是否有本地副本可用，如果没有，就获取一份副本(并将其保
存在本地)。
4. 新鲜度检测——缓存查看已缓存副本是否足够新鲜，如果不是，就询问服务器是
否有任何更新。
5. 创建响应——缓存会用新的首部和已缓存的主体来构建一条响应报文。
6. 发送——缓存通过网络将响应发回给客户端。
7. 日志——缓存可选地创建一个日志文件条目来描述这个事务。



























