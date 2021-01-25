# :thinking:网络

[[toc]]

## 简单讲解一下HTTP2的多路复用

## 谈谈你对TCP三次握手和四次挥手的理解

## A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态

## 介绍 HTTPS 握手过程

## HTTPS 握手过程中，客户端如何验证证书的合法性

## 介绍下 HTTPS 中间人攻击

## 介绍下 HTTP1.0、1.1、2.0 协议的区别？

## 永久性重定向（301）和临时性重定向（302）对 SEO 有什么影响

## HTTP 状态码 301 和 302 的应用场景分别是什么

## 接口如何防刷

## 为什么 HTTP1.1 不能实现多路复用

## get请求能传图片吗？
* 通过get传递base64编码的字符串是可以的，但是长度有限制
* 通过表单没有办法传递form-data中不会携带图片

## 如何劫持https的请求，提供思路
* 先用OpenSSL查看下证书，直接调用openssl库识别目标服务器支持的SSL/TLS cipher suite
* 用sslcan识别ssl配置错误，过期协议，过时cipher suite和hash算法
* 分析证书详细数据
* 生成一个证书
* 开启路由功能
* 写转发规则，将80、443端口进行转发给8080和8443端口
* 最后使用arpspoof进行arp欺骗

## HTTP有哪些方法？
* HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法
* HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT

## 这些方法的具体作用是什么？
* GET: 通常用于请求服务器发送某些资源
* HEAD: 请求资源的头部信息, 并且这些头部与 HTTP GET 方法请求时返回的一致. 该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源
* OPTIONS: 用于获取目的资源所支持的通信选项
* POST: 发送数据给服务器
* PUT: 用于新增资源或者使用请求中的有效负载替换目标资源的表现形式
* DELETE: 用于删除指定的资源
* PATCH: 用于对资源进行部分修改
* CONNECT: HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器
* TRACE: 回显服务器收到的请求，主要用于测试或诊断

## GET和POST有什么区别？
* 数据传输方式不同：GET请求通过URL传输数据，而POST的数据通过请求体传输。
* 安全性不同：POST的数据因为在请求主体内，所以有一定的安全性保证，而GET的数据在URL中，通过历史记录，缓存很容易查到数据信息。
* 数据类型不同：GET只允许 ASCII 字符，而POST无限制
* GET无害： 刷新、后退等浏览器操作GET请求是无害的，POST可能重复提交表单
* 特性不同：GET是安全（这里的安全是指只读特性，就是使用这个方法不会引起服务器状态变化）且幂等（幂等的概念是指同一个请求方法执行多次和仅执行一次的效果完全相同），而POST是非安全非幂等

## PUT和POST都是给服务器发送新增资源，有什么区别？
PUT 和POST方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用），而POST方法是非幂等的。除此之外还有一个区别，通常情况下，PUT的URI指向是具体单一资源，而POST可以指向资源集合。

举个例子，我们在开发一个博客系统，当我们要创建一篇文章的时候往往用POST `https://www.jianshu.com/articles`，这个请求的语义是，在articles的资源集合下创建一篇新的文章，如果我们多次提交这个请求会创建多个文章，这是非幂等的。

而PUT `https://www.jianshu.com/articles/820357430`的语义是更新对应文章下的资源（比如修改作者名称等），这个URI指向的就是单一资源，而且是幂等的。

>PS: 『POST表示创建资源，PUT表示更新资源』这种说法是错误的，两个都能创建资源，根本区别就在于幂等性

## PUT和PATCH都是给服务器发送修改资源，有什么区别？
PUT和PATCH都是更新资源，而PATCH用来对已知资源进行局部更新。
当我们要修改文章的作者时，我们可以直接发送PUT `https://www.jianshu.com/articles/820357430`，这个时候的数据应该是:
```javascript
{
  author:'蔡徐坤',
  creationDate: '2019-6-12',
  content: '我写文章像蔡徐坤',
  id: 820357430
}
```
这种直接覆盖资源的修改方式应该用put，但是你觉得每次都带有这么多无用的信息，那么可以发送PATCH `https://www.jianshu.com/articles/820357430`，这个时候只需要:
```javascript
{
  author:'蔡徐坤',
}
```

## http的请求报文是什么样的？
请求报文有4部分组成:
* 请求行
* 请求头部
* 空行
* 请求体

![](https://user-gold-cdn.xitu.io/2019/6/14/16b545c9bac2897b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

* 请求行包括：请求方法字段、URL字段、HTTP协议版本字段。它们用空格分隔。例如，GET /index.html HTTP/1.1。
* 请求头部:请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔
User-Agent：产生请求的浏览器类型。
Accept：客户端可识别的内容类型列表。
Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。
* 请求体: post put等请求携带的数据

## HTTP的响应报文是什么样的？
请求报文有4部分组成:

* 响应行
* 响应头
* 空行
* 响应体

![](https://user-gold-cdn.xitu.io/2019/6/14/16b545c9bae12825?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 聊一聊HTTP的部首有哪些？
>内容很多，重点看标『☆』内容

### 通用首部字段（General Header Fields）：请求报文和响应报文两方都会使用的首部

* Cache-Control  控制缓存 ☆
* Connection 连接管理、逐条首部 ☆
* Upgrade  升级为其他协议
* via 代理服务器的相关信息
* Wraning 错误和警告通知
* Transfor-Encoding 报文主体的传输编码格式 ☆
* Trailer 报文末端的首部一览
* Pragma 报文指令
* Date 创建报文的日期

### 请求首部字段（Reauest Header Fields）:客户端向服务器发送请求的报文时使用的首部

* Accept 客户端或者代理能够处理的媒体类型 ☆
* Accept-Encoding 优先可处理的编码格式
* Accept-Language 优先可处理的自然语言
* Accept-Charset 优先可以处理的字符集
* If-Match 比较实体标记（ETage） ☆
* If-None-Match 比较实体标记（ETage）与 If-Match相反 ☆
* If-Modified-Since 比较资源更新时间（Last-Modified）☆
* If-Unmodified-Since比较资源更新时间（Last-Modified），与 If-Modified-Since相反 ☆
* If-Rnages 资源未更新时发送实体byte的范围请求
* Range 实体的字节范围请求 ☆
* Authorization web的认证信息 ☆
* Proxy-Authorization 代理服务器要求web认证信息
* Host 请求资源所在服务器 ☆
* From 用户的邮箱地址
* User-Agent 客户端程序信息 ☆
* Max-Forwrads 最大的逐跳次数
* TE 传输编码的优先级
* Referer 请求原始放的url
* Expect 期待服务器的特定行为

### 响应首部字段（Response Header Fields）:从服务器向客户端响应时使用的字段

* Accept-Ranges 能接受的字节范围
* Age 推算资源创建经过时间
* Location 令客户端重定向的URI ☆
* vary  代理服务器的缓存信息
* ETag 能够表示资源唯一资源的字符串 ☆
* WWW-Authenticate 服务器要求客户端的验证信息
* Proxy-Authenticate 代理服务器要求客户端的验证信息
* Server 服务器的信息 ☆
* Retry-After 和状态码503 一起使用的首部字段，表示下次请求服务器的时间

### 实体首部字段（Entiy Header Fields）:针对请求报文和响应报文的实体部分使用首部

* Allow 资源可支持http请求的方法 ☆
* Content-Language 实体的资源语言
* Content-Encoding 实体的编码格式
* Content-Length 实体的大小（字节）
* Content-Type 实体媒体类型
* Content-MD5 实体报文的摘要
* Content-Location 代替资源的yri
* Content-Rnages 实体主体的位置返回
* Last-Modified 资源最后的修改资源 ☆
* Expires 实体主体的过期资源 ☆

## 聊一聊HTTP的状态码有哪些？

### 2XX 成功

* 200 OK，表示从客户端发来的请求在服务器端被正确处理 ☆
* 201 Created 请求已经被实现，而且有一个新的资源已经依据请求的需要而建立
* 202 Accepted 请求已接受，但是还没执行，不保证完成请求
* 204 No content，表示请求成功，但响应报文不含实体的主体部分
* 206 Partial Content，进行范围请求 ☆

### 3XX 重定向

* 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
* 302 found，临时性重定向，表示资源临时被分配了新的 URL ☆
* 303 see other，表示资源存在着另一个 URL，应使用 GET 方法丁香获取资源
* 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
* 307 temporary redirect，临时重定向，和302含义相同

### 4XX 客户端错误

* 400 bad request，请求报文存在语法错误 ☆
* 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息 ☆
* 403 forbidden，表示对请求资源的访问被服务器拒绝 ☆
* 404 not found，表示在服务器上没有找到请求的资源 ☆
* 408 Request timeout, 客户端请求超时
* 409 Confict, 请求的资源可能引起冲突

### 5XX 服务器错误

* 500 internal sever error，表示服务器端在执行请求时发生了错误 ☆
* 501 Not Implemented 请求超出服务器能力范围，例如服务器不支持当前请求所需要的某个功能，或者请求是服务器不支持的某个方法
* 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求
* 505 http version not supported 服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本

## 同样是重定向307，303，302的区别？
302是http1.0的协议状态码，在http1.1版本的时候为了细化302状态码又出来了两个303和307。
303明确表示客户端应当采用get方法获取资源，他会把POST请求变为GET请求进行重定向。
307会遵照浏览器标准，不会从post变为get。

## HTTP的keep-alive是干什么的？
在早期的HTTP/1.0中，每次http请求都要创建一个连接，而创建连接的过程需要消耗资源和时间，为了减少资源消耗，缩短响应时间，就需要重用连接。在后来的HTTP/1.0中以及HTTP/1.1中，引入了重用连接的机制，就是在http请求头中加入Connection: keep-alive来告诉对方这个请求响应完成后不要关闭，下一次咱们还用这个请求继续交流。协议规定HTTP/1.0如果想要保持长连接，需要在请求头中加上Connection: keep-alive。

keep-alive的优点：

* 较少的CPU和内存的使用（由于同时打开的连接的减少了）
* 允许请求和应答的HTTP管线化
* 降低拥塞控制 （TCP连接减少了）
* 减少了后续请求的延迟（无需再进行握手）
* 报告错误无需关闭TCP连

## HTTPS是如何保证安全的？

过程比较复杂，我们得先理解两个概念：  
**对称加密**：即通信的双方都使用同一个秘钥进行加解密，比如特务接头的暗号，就属于对称加密   
对称加密虽然很简单性能也好，但是无法解决首次把秘钥发给对方的问题，很容易被hacker拦截秘钥。   
**非对称加密**：
1. 私钥 + 公钥= 密钥对
2. 即用私钥加密的数据,只有对应的公钥才能解密,用公钥加密的数据,只有对应的私钥才能解密
3. 因为通信双方的手里都有一套自己的密钥对,通信之前双方会先把自己的公钥都先发给对方 
4. 然后对方再拿着这个公钥来加密数据响应给对方,等到到了对方那里,对方再用自己的私钥进行解密

非对称加密虽然安全性更高，但是带来的问题就是速度很慢，影响性能。

解决方案：   
那么结合两种加密方式，将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双方可以使用对称加密来进行沟通。

此时又带来一个问题，中间人问题：   
如果此时在客户端和服务器之间存在一个中间人,这个中间人只需要把原本双方通信互发的公钥,换成自己的公钥,这样中间人就可以轻松解密通信双方所发送的所有数据。

所以这个时候需要一个安全的第三方颁发证书（CA），证明身份的身份，防止被中间人攻击。

证书中包括：签发者、证书用途、使用者公钥、使用者私钥、使用者的HASH算法、证书到期时间等

但是问题来了，如果中间人篡改了证书，那么身份证明是不是就无效了？这个证明就白买了，这个时候需要一个新的技术，数字签名。

数字签名就是用CA自带的HASH算法对证书的内容进行HASH得到一个摘要，再用CA的私钥加密，最终组成数字签名。

当别人把他的证书发过来的时候,我再用同样的Hash算法,再次生成消息摘要，然后用CA的公钥对数字签名解密,得到CA创建的消息摘要,两者一比,就知道中间有没有被人篡改了。

这个时候就能最大程度保证通信的安全了。

## HTTP2相对于HTTP1.x有什么优势和特点？

### 二进制分帧
帧：HTTP/2 数据通信的最小单位消息：指 HTTP/2 中逻辑上的 HTTP 消息。例如请求和响应等，消息由一个或多个帧组成。

流：存在于连接中的一个虚拟通道。流可以承载双向消息，每个流都有一个唯一的整数ID

HTTP/2 采用二进制格式传输数据，而非 HTTP 1.x 的文本格式，二进制协议解析起来更高效。

### 服务器推送
服务端可以在发送页面HTML时主动推送其它资源，而不用等到浏览器解析到相应位置，发起请求再响应。例如服务端可以主动把JS和CSS文件推送给客户端，而不需要客户端解析HTML时再发送这些请求。

服务端可以主动推送，客户端也有权利选择是否接收。如果服务端推送的资源已经被浏览器缓存过，浏览器可以通过发送RST_STREAM帧来拒收。主动推送也遵守同源策略，服务器不会随便推送第三方资源给客户端。

### 头部压缩
HTTP/1.x会在请求和响应中中重复地携带不常改变的、冗长的头部数据，给网络带来额外的负担。

HTTP/2在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键－值对，对于相同的数据，不再通过每次请求和响应发送

首部表在HTTP/2的连接存续期内始终存在，由客户端和服务器共同渐进地更新;
每个新的首部键－值对要么被追加到当前表的末尾，要么替换表中之前的值。

>你可以理解为只发送差异数据，而不是全部发送，从而减少头部的信息量

![](https://user-gold-cdn.xitu.io/2019/6/14/16b545c9bb7dd617?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 多路复用
HTTP 1.x 中，如果想并发多个请求，必须使用多个 TCP 链接，且浏览器为了控制资源，还会对单个域名有 6-8个的TCP链接请求限制。
HTTP2中：

* 同域名下所有通信都在单个连接上完成。
* 单个连接可以承载任意数量的双向数据流。
* 数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装

![](https://user-gold-cdn.xitu.io/2019/6/14/16b545c9bb69de5e?imageslim)

## TCP建立连接的三次握手🤝🤝🤝

TCP为了保证数据可靠的传输 在建立连接前需要进行必要的三次握手 其主要目的是为了验证双方的收发信能力正常

* 第一次握手：验证客户端发信能力正常
* 第二次握手：验证服务端收信能力、发信能力正常 
* 第三次握手：验证客户端收信能力正常

![](https://user-gold-cdn.xitu.io/2018/6/26/1643a1dd6df4813b?imageslim)

其二目的：传输信令
其三目的：如果上层是https协议 还可以交换数字证书

## TCP断开连接的四次挥手👋👋👋👋

TCP为了保证数据传输的完整性与有效性 在断开连接前需要进行必要的四次挥手 其目的是为了确认双方状态
* 第一次挥手：客户端数据传输完毕 请求服务端关闭 并进入等待关闭状态
* 第二次挥手：服务端确认关闭请求 进入等待关闭状态
* 第三次挥手：服务端数据传输完成 请求客户端关闭
* 第四次挥手：客户端进入time_wait状态 服务端关闭

![](https://user-gold-cdn.xitu.io/2018/6/26/1643a20296de1ff0?imageslim)

上面有一个非常特殊的状态`time_wait`，它是主动关闭的一方在回复完对方的挥手后进入的一个长期状态，这个状态标准的持续时间是4分钟，4分钟后才会进入到closed状态，释放套接字资源。不过在具体实现上这个时间是可以调整的。
它就好比主动分手方要承担的责任，是你提出的要分手，你得付出代价。这个后果就是持续4分钟的`time_wait`状态，不能释放套接字资源(端口)，就好比守寡期，这段时间内套接字资源(端口)不得回收利用。
它的作用是重传最后一个ack报文，确保对方可以收到。因为如果对方没有收到ack的话，会重传fin报文，处于`time_wait`状态的套接字会立即向对方重发ack报文。
同时在这段时间内，该链接在对话期间于网际路由上产生的残留报文(因为路径过于崎岖，数据报文走的时间太长，重传的报文都收到了，原始报文还在路上)传过来时，都会被立即丢弃掉。4分钟的时间足以使得这些残留报文彻底消逝。不然当新的端口被重复利用时，这些残留报文可能会干扰新的链接。
4分钟就是2个MSL，每个MSL是2分钟。MSL就是`maximium segment lifetime`——最长报文寿命。这个时间是由官方RFC协议规定的。至于为什么是2个MSL而不是1个MSL，我还没有看到一个非常满意的解释。
四次挥手也并不总是四次挥手，中间的两个动作有时候是可以合并一起进行的，这个时候就成了三次挥手，主动关闭方就会从`fin_wait_1`状态直接进入到`time_wait`状态，跳过了`fin_wait_2`状态。

## 关于网络模型是通俗理解
* 物理层   
这就叫做"实体层"，它就是把电脑连接起来的物理手段。它主要规定了网络的一些电气特性，作用是负责传送0和1的电信号。
* 数据链路层 -- 基于mac地址   
有了数据包的定义、网卡的MAC地址、广播的发送方式，"链接层"就可以在多台计算机之间传送数据了。
* 网络层 -- 基于ip协议   
这就导致了"网络层"的诞生。它的作用是引进一套新的地址，使得我们能够区分不同的计算机是否属于同一个子网络。这套地址就叫做"网络地址"，简称"网址"。
* 传输层 -- 提供端口到端口   
"传输层"的功能，就是建立"端口到端口"的通信。相比之下，"网络层"的功能是建立"主机到主机"的通信。只要确定主机和端口，我们就能实现程序之间的交流。
* 应用层 -- 基于数据格式   
"应用层"的作用，就是规定应用程序的数据格式。

## 什么是CSRF
CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

## CSRF的特点

* 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
* 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
* 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
* 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。

## 防护策略
* 阻止不明外域的访问
  * Origin Header
  * Referer Header
  * Samesite Cookie
* 提交时要求附加本域才能获取的信息
  * CSRF Token
  * 双重Cookie验证

## CSRF Token
前面讲到CSRF的另一个特征是，攻击者无法直接窃取到用户的信息（Cookie，Header，网站内容等），仅仅是冒用Cookie中的信息。

而CSRF攻击之所以能够成功，是因为服务器误把攻击者发送的请求当成了用户自己的请求。那么我们可以要求所有的用户请求都携带一个CSRF攻击者无法获取到的Token。服务器通过校验请求是否携带正确的Token，来把正常的请求和攻击的请求区分开，也可以防范CSRF的攻击。

### 原理
CSRF Token的防护策略分为三个步骤：
1. 将CSRF Token输出到页面中
首先，用户打开页面的时候，服务器需要给这个用户生成一个Token，该Token通过加密算法对数据进行加密，一般Token都包括随机字符串和时间戳的组合，显然在提交时Token不能再放在Cookie中了，否则又会被攻击者冒用。因此，为了安全起见Token最好还是存在服务器的Session中，之后在每次页面加载时，使用JS遍历整个DOM树，对于DOM中所有的a和form标签后加入Token。这样可以解决大部分的请求，但是对于在页面加载之后动态生成的HTML代码，这种方法就没有作用，还需要程序员在编码时手动添加Token。
2. 页面提交的请求携带这个Token
对于GET请求，Token将附在请求地址之后，这样URL 就变成 `http://url?csrftoken=tokenvalue`。 而对于 POST 请求来说，要在 form 的最后加上：`<input type=”hidden” name=”csrftoken” value=”tokenvalue”/>`
复制代码这样，就把Token以参数的形式加入请求了。
3. 服务器验证Token是否正确
当用户从客户端得到了Token，再次提交给服务器的时候，服务器需要判断Token的有效性，验证过程是先解密Token，对比加密字符串以及时间戳，如果加密字符串一致且时间未过期，那么这个Token就是有效的。
这种方法要比之前检查Referer或者Origin要安全一些，Token可以在产生并放于Session之中，然后在每次请求时把Token从Session中拿出，与请求中的Token进行比对，但这种方法的比较麻烦的在于如何把Token以参数的形式加入请求。
下面将以Java为例，介绍一些CSRF Token的服务端校验逻辑，代码如下：
```java
HttpServletRequest req = (HttpServletRequest)request; 
HttpSession s = req.getSession(); 
 
// 从 session 中得到 csrftoken 属性
String sToken = (String)s.getAttribute(“csrftoken”); 
if(sToken == null){ 
   // 产生新的 token 放入 session 中
   sToken = generateToken(); 
   s.setAttribute(“csrftoken”,sToken); 
   chain.doFilter(request, response); 
} else{ 
   // 从 HTTP 头中取得 csrftoken 
   String xhrToken = req.getHeader(“csrftoken”); 
   // 从请求参数中取得 csrftoken 
   String pToken = req.getParameter(“csrftoken”); 
   if(sToken != null && xhrToken != null && sToken.equals(xhrToken)){ 
       chain.doFilter(request, response); 
   }else if(sToken != null && pToken != null && sToken.equals(pToken)){ 
       chain.doFilter(request, response); 
   }else{ 
       request.getRequestDispatcher(“error.jsp”).forward(request,response); 
   } 
}
```

这个Token的值必须是随机生成的，这样它就不会被攻击者猜到，考虑利用Java应用程序的java.security.SecureRandom类来生成足够长的随机标记，替代生成算法包括使用256位BASE64编码哈希，选择这种生成算法的开发人员必须确保在散列数据中使用随机性和唯一性来生成随机标识。通常，开发人员只需为当前会话生成一次Token。在初始生成此Token之后，该值将存储在会话中，并用于每个后续请求，直到会话过期。当最终用户发出请求时，服务器端必须验证请求中Token的存在性和有效性，与会话中找到的Token相比较。如果在请求中找不到Token，或者提供的值与会话中的值不匹配，则应中止请求，应重置Token并将事件记录为正在进行的潜在CSRF攻击。

### 分布式校验
在大型网站中，使用Session存储CSRF Token会带来很大的压力。访问单台服务器session是同一个。但是现在的大型网站中，我们的服务器通常不止一台，可能是几十台甚至几百台之多，甚至多个机房都可能在不同的省份，用户发起的HTTP请求通常要经过像Ngnix之类的负载均衡器之后，再路由到具体的服务器上，由于Session默认存储在单机服务器内存中，因此在分布式环境下同一个用户发送的多次HTTP请求可能会先后落到不同的服务器上，导致后面发起的HTTP请求无法拿到之前的HTTP请求存储在服务器中的Session数据，从而使得Session机制在分布式环境下失效，因此在分布式集群中CSRF Token需要存储在Redis之类的公共存储空间。

由于使用Session存储，读取和验证CSRF Token会引起比较大的复杂度和性能问题，目前很多网站采用Encrypted Token Pattern方式。这种方法的Token是一个计算出来的结果，而非随机生成的字符串。这样在校验时无需再去读取存储的Token，只用再次计算一次即可。

这种Token的值通常是使用UserID、时间戳和随机数，通过加密的方法生成。这样既可以保证分布式服务的Token一致，又能保证Token不容易被破解。

在token解密成功之后，服务器可以访问解析值，Token中包含的UserID和时间戳将会被拿来被验证有效性，将UserID与当前登录的UserID进行比较，并将时间戳与当前时间进行比较。

## Samesite Cookie属性
防止CSRF攻击的办法已经有上面的预防措施。为了从源头上解决这个问题，Google起草了一份草案来改进HTTP协议，那就是为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax，下面分别讲解：

**Samesite=Strict**

这种称为严格模式，表明这个 Cookie 在任何情况下都不可能作为第三方 Cookie，绝无例外。比如说 `b.com` 设置了如下 Cookie：
```http
Set-Cookie: foo=1; Samesite=Strict
Set-Cookie: bar=2; Samesite=Lax
Set-Cookie: baz=3
```
复制代码我们在 `a.com` 下发起对 `b.com` 的任意请求，foo 这个 Cookie 都不会被包含在 Cookie 请求头中，但 bar 会。举个实际的例子就是，假如淘宝网站用来识别用户登录与否的 Cookie 被设置成了 Samesite=Strict，那么用户从百度搜索页面甚至天猫页面的链接点击进入淘宝后，淘宝都不会是登录状态，因为淘宝的服务器不会接受到那个 Cookie，其它网站发起的对淘宝的任意请求都不会带上那个 Cookie。

**Samesite=Lax**

这种称为宽松模式，比 Strict 放宽了点限制：假如这个请求是这种请求（改变了当前页面或者打开了新页面）且同时是个GET请求，则这个Cookie可以作为第三方Cookie。比如说 `b.com` 设置了如下Cookie：
```http
Set-Cookie: foo=1; Samesite=Strict
Set-Cookie: bar=2; Samesite=Lax
Set-Cookie: baz=3
```
复制代码当用户从 `a.com` 点击链接进入 `b.com` 时，foo 这个 Cookie 不会被包含在 Cookie 请求头中，但 bar 和 baz 会，也就是说用户在不同网站之间通过链接跳转是不受影响了。但假如这个请求是从 `a.com` 发起的对 `b.com` 的异步请求，或者页面跳转是通过表单的 post 提交触发的，则bar也不会发送。

生成Token放到Cookie中并且设置Cookie的Samesite，Java代码如下：
```java
private void addTokenCookieAndHeader(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
  //生成token
  String sToken = this.generateToken();
  //手动添加Cookie实现支持“Samesite=strict”
  //Cookie添加双重验证
  String CookieSpec = String.format("%s=%s; Path=%s; HttpOnly; Samesite=Strict", this.determineCookieName(httpRequest), sToken, httpRequest.getRequestURI());
  httpResponse.addHeader("Set-Cookie", CookieSpec);
  httpResponse.setHeader(CSRF_TOKEN_NAME, token);
}
```
复制代码代码源自OWASP Cross-Site_Request_Forgery #Implementation example

### 我们应该如何使用SamesiteCookie

如果SamesiteCookie被设置为Strict，浏览器在任何跨域请求中都不会携带Cookie，新标签重新打开也不携带，所以说CSRF攻击基本没有机会。

但是跳转子域名或者是新标签重新打开刚登陆的网站，之前的Cookie都不会存在。尤其是有登录的网站，那么我们新打开一个标签进入，或者跳转到子域名的网站，都需要重新登录。对于用户来讲，可能体验不会很好。

如果SamesiteCookie被设置为Lax，那么其他网站通过页面跳转过来的时候可以使用Cookie，可以保障外域连接打开页面时用户的登录状态。但相应的，其安全性也比较低。

另外一个问题是Samesite的兼容性不是很好，现阶段除了从新版Chrome和Firefox支持以外，Safari以及iOS Safari都还不支持，现阶段看来暂时还不能普及。

而且，SamesiteCookie目前有一个致命的缺陷：不支持子域。例如，种在topic.a.com下的Cookie，并不能使用a.com下种植的SamesiteCookie。这就导致了当我们网站有多个子域名时，不能使用SamesiteCookie在主域名存储用户登录信息。每个子域名都需要用户重新登录一次。

总之，SamesiteCookie是一个可能替代同源验证的方案，但目前还并不成熟，其应用场景有待观望。

### 总结
简单总结一下上文的防护策略：
* CSRF自动防御策略：同源检测（Origin 和 Referer 验证）。
* CSRF主动防御措施：Token验证 或者 双重Cookie验证 以及配合Samesite Cookie。
* 保证页面的幂等性，后端接口不要在GET页面中做用户操作。

## XSS
### 一、 什么是XSS攻击？
Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。

而由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，或者利用这些信息冒充用户向网站发起攻击者定义的请求。

在部分情况下，由于输入的限制，注入的恶意脚本比较短。但可以通过引入外部的脚本，并由浏览器执行，来完成比较复杂的攻击策略。
这里有一个问题：用户是通过哪种方法“注入”恶意脚本的呢？

不仅仅是业务上的“用户的 UGC 内容”可以进行注入，包括 URL 上的参数等都可以是攻击的来源。在处理输入时，以下内容都不可信：
* 来自用户的 UGC 信息
* 来自第三方的链接
* URL 参数
* POST 参数
* Referer （可能来自不可信的来源）
* Cookie （可能来自其他子域注入）

### 二、 根据攻击来源，XSS攻击可以分为三类

根据攻击的来源，XSS 攻击可分为存储型、反射型和 DOM 型三种。
类型|存储区|插入点
-|-|-
存储型 XSS|后端数据库|HTML
反射型 XSS|URL|HTML
DOM 型 XSS|后端数据库/前端存储/URL|前端 JavaScript

存储区：恶意代码存放的位置。  
插入点：由谁取得恶意代码，并插入到网页上。

#### 存储型XSS  
存储型 XSS 的攻击步骤：
1. 攻击者将恶意代码提交到目标网站的数据库中。
2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

#### 反射型XSS
反射型 XSS 的攻击步骤：
1. 攻击者构造出特殊的 URL，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见。

#### DOM型XSS
DOM 型 XSS 的攻击步骤：
1. 攻击者构造出特殊的 URL，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL。
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

### 三、 预防XSS攻击：
防止 HTML 中出现注入；防止 JavaScript 执行时，执行恶意代码。

通过前面的介绍可以得知，XSS 攻击有两大要素：
1. 攻击者提交恶意代码。
2. 浏览器执行恶意代码。
针对第一个要素：我们是否能够在用户输入的过程，过滤掉用户输入的恶意代码呢？

#### 输入过滤
在用户提交时，由前端过滤输入，然后提交到后端。这样做是否可行呢？

答案是不可行。一旦攻击者绕过前端过滤，直接构造请求，就可以提交恶意代码了。

那么，换一个过滤时机：后端在写入数据库前，对输入进行过滤，然后把“安全的”内容，返回给前端。这样是否可行呢？

我们举一个例子，一个正常的用户输入了 `5 < 7` 这个内容，在写入数据库前，被转义，变成了 `5 &lt; 7`。
问题是：在提交阶段，我们并不确定内容要输出到哪里。
这里的“并不确定内容要输出到哪里”有两层含义：
1. 用户的输入内容可能同时提供给前端和客户端，而一旦经过了 escapeHTML()，客户端显示的内容就变成了乱码( `5 &lt; 7` )。
2. 在前端中，不同的位置所需的编码也不同。

* 当 5 &lt; 7 作为 HTML 拼接页面时，可以正常显示：
```html
<div title="comment">5 &lt; 7</div>
```

* 当 `5 &lt; 7` 通过 Ajax 返回，然后赋值给 JavaScript 的变量时，前端得到的字符串就是转义后的字符。这个内容不能直接用于 Vue 等模板的展示，也不能直接用于内容长度计算。不能用于标题、alert 等。


所以，输入侧过滤能够在某些情况下解决特定的 XSS 问题，但会引入很大的不确定性和乱码问题。在防范 XSS 攻击时应避免此类方法。

当然，对于明确的输入类型，例如数字、URL、电话号码、邮件地址等等内容，进行输入过滤还是必要的。

既然输入过滤并非完全可靠，我们就要通过“防止浏览器执行恶意代码”来防范 XSS。这部分分为两类：
1. 防止 HTML 中出现注入。
2. 防止 JavaScript 执行时，执行恶意代码。

#### 预防存储型和反射型 XSS 攻击
存储型和反射型 XSS 都是在服务端取出恶意代码后，插入到响应 HTML 里的，攻击者刻意编写的“数据”被内嵌到“代码”中，被浏览器所执行。

预防这两种漏洞，有两种常见做法：
1. 改成纯前端渲染，把代码和数据分隔开。
2. 对 HTML 做充分转义。

#### 纯前端渲染
纯前端渲染的过程：
1. 浏览器先加载一个静态 HTML，此 HTML 中不包含任何跟业务相关的数据。
2. 然后浏览器执行 HTML 中的 JavaScript。
3. JavaScript 通过 Ajax 加载业务数据，调用 DOM API 更新到页面上。

在纯前端渲染中，我们会明确的告诉浏览器：下面要设置的内容是文本（.innerText），还是属性（.setAttribute），还是样式（.style）等等。浏览器不会被轻易的被欺骗，执行预期外的代码了。

但纯前端渲染还需注意避免 DOM 型 XSS 漏洞（例如 onload 事件和 href 中的 javascript:xxx 等，请参考下文”预防 DOM 型 XSS 攻击“部分）。

在很多内部、管理系统中，采用纯前端渲染是非常合适的。但对于性能要求高，或有 SEO 需求的页面，我们仍然要面对拼接 HTML 的问题。

#### 转义 HTML
如果拼接 HTML 是必要的，就需要采用合适的转义库，对 HTML 模板各处插入点进行充分的转义。

常用的模板引擎，如 doT.js、ejs、FreeMarker 等，对于 HTML 转义通常只有一个规则，就是把 & < > " ' / 这几个字符转义掉，确实能起到一定的 XSS 防护作用，但并不完善：

XSS 安全漏洞|简单转义是否有防护作用
-|-
HTML 标签文字内容|有
HTML 属性值|有
CSS 内联样式|无
内联 JavaScript|无
内联 JSON|无
跳转链接|无

所以要完善 XSS 防护措施，我们要使用更完善更细致的转义策略。
例如 Java 工程里，常用的转义库为 org.owasp.encoder。以下代码引用自 org.owasp.encoder 的官方说明。
```html
<!-- HTML 标签内文字内容 -->
<div><%= Encode.forHtml(UNTRUSTED) %></div>

<!-- HTML 标签属性值 -->
<input value="<%= Encode.forHtml(UNTRUSTED) %>" />

<!-- CSS 属性值 -->
<div style="width:<= Encode.forCssString(UNTRUSTED) %>">

<!-- CSS URL -->
<div style="background:<= Encode.forCssUrl(UNTRUSTED) %>">

<!-- JavaScript 内联代码块 -->
<script>
  var msg = "<%= Encode.forJavaScript(UNTRUSTED) %>";
  alert(msg);
</script>

<!-- JavaScript 内联代码块内嵌 JSON -->
<script>
var __INITIAL_STATE__ = JSON.parse('<%= Encoder.forJavaScript(data.to_json) %>');
</script>

<!-- HTML 标签内联监听器 -->
<button
  onclick="alert('<%= Encode.forJavaScript(UNTRUSTED) %>');">
  click me
</button>

<!-- URL 参数 -->
<a href="/search?value=<%= Encode.forUriComponent(UNTRUSTED) %>&order=1#top">

<!-- URL 路径 -->
<a href="/page/<%= Encode.forUriComponent(UNTRUSTED) %>">

<!--
  URL.
  注意：要根据项目情况进行过滤，禁止掉 "javascript:" 链接、非法 scheme 等
-->
<a href='<%=
  urlValidator.isValid(UNTRUSTED) ?
    Encode.forHtml(UNTRUSTED) :
    "/404"
%>'>
  link
</a>
```
可见，HTML 的编码是十分复杂的，在不同的上下文里要使用相应的转义规则。

### 预防 DOM 型 XSS 攻击
DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。

在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。

如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。

DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，`<a>` 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。

```html
<!-- 内联事件监听器中包含恶意代码 -->
<img onclick="UNTRUSTED" onerror="UNTRUSTED" src="data:image/png,">

<!-- 链接内包含恶意代码 -->
<a href="UNTRUSTED">1</a>

<script>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
</script>
```
复制代码如果项目中有用到这些的话，一定要避免在字符串中拼接不可信数据。

# 其他 XSS 防范措施
虽然在渲染页面和执行 JavaScript 时，通过谨慎的转义可以防止 XSS 的发生，但完全依靠开发的谨慎仍然是不够的。以下介绍一些通用的方案，可以降低 XSS 带来的风险和后果。

## Content Security Policy
严格的 CSP 在 XSS 的防范中可以起到以下的作用：

* 禁止加载外域代码，防止复杂的攻击逻辑。
* 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
* 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
* 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
* 合理使用上报可以及时发现 XSS，利于尽快修复问题。

关于 CSP 的详情，请关注前端安全系列后续的文章。

## 其他安全措施
* HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
* 验证码：防止脚本冒充用户提交危险操作。

## HTTP历史发展
版本|产生时间|内容|发展现状
-|-|-|-
HTTP/0.9|1991年|不涉及数据包传输，规定客户端和服务器之间通信格式，只能GET请求|没有作为正式的标准
HTTP/1.0|1996年|传输内容格式不限制，增加PUT、PATCH、HEAD、 OPTIONS、DELETE命令|正式作为标准
HTTP/1.1|1997年|持久连接(长连接)、节约带宽、HOST域、管道机制、分块传输编码|2015年前使用最广泛
HTTP/2|2015年|多路复用、服务器推送、头信息压缩、二进制协议等|逐渐覆盖市场

## HTTP特点：
1. 无状态：协议对客户端没有状态存储，对事物处理没有“记忆”能力，比如访问一个网站需要反复进行登录操作
2. 无连接：HTTP/1.1之前，由于无状态特点，每次请求需要通过TCP三次握手四次挥手，和服务器重新建立连接。比如某个客户机在短时间多次请求同一个资源，服务器并不能区别是否已经响应过用户的请求，所以每次需要重新响应请求，需要耗费不必要的时间和流量。
3. 基于请求和响应：基本的特性，由客户端发起请求，服务端响应
4. 简单快速、灵活
5. 通信使用明文、请求和响应不会对通信方进行确认、无法保护数据的完整性

## HTTPS有如下特点：
1. 内容加密：采用混合加密技术，中间者无法直接查看明文内容
2. 验证身份：通过证书认证客户端访问的是自己的服务器
3. 保护数据完整性：防止传输的内容被中间人冒充或者篡改

## TCP三次握手
![](/img/tcp-handshake.jpg)

## TCP四次挥手
![](/img/tcp-wave.jpg)

## TCP报文
![](/img/tcp-message.jpeg)

## TSL握手
![](/img/tsl-handshake.jpeg)
