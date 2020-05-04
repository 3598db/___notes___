# CURL常用的十种方式
[[toc]]
## 1. 获取页面内容
当我们不加任何选项使用 curl 时，默认会发送 GET 请求来获取链接内容到标准输出。

`curl http://www.codebelief.com`
## 2. 显示 HTTP 头
如果我们只想要显示 HTTP 头，而不显示文件内容，可以使用 `-I` 选项：

`curl -I http://www.codebelief.com`
输出为：
```
HTTP/1.1 200 OK
Server: nginx/1.10.3
Date: Thu, 11 May 2017 08:24:45 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 24206
Connection: keep-alive
X-Powered-By: Express
Cache-Control: public, max-age=0
ETag: W/"5e8e-Yw5ZdnVVly9/aEnMX7fVXQ"
Vary: Accept-Encoding
也可以同时显示 HTTP 头和文件内容，使用 -i 选项：
```
`curl -i http://www.codebelief.com`
输出为：
```
HTTP/1.1 200 OK
Server: nginx/1.10.3
Date: Thu, 11 May 2017 08:25:46 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 24206
Connection: keep-alive
X-Powered-By: Express
Cache-Control: public, max-age=0
ETag: W/"5e8e-Yw5ZdnVVly9/aEnMX7fVXQ"
Vary: Accept-Encoding

<!DOCTYPE html>
<html lang="en">
......
</html>
```
## 3. 将链接保存到文件
我们可以使用 > 符号将输出重定向到本地文件中。   
`curl http://www.codebelief.com > index.html`   
也可以通过 curl 自带的 `-o/-O` 选项将内容保存到文件中。   
`-o`（小写的 o）：结果会被保存到命令行中提供的文件名  
`-O`（大写的 O）：URL 中的文件名会被用作保存输出的文件名   
`curl -o index.html http://www.codebelief.com`   
`curl -O http://www.codebelief.com/page/2/`   
注意：使用 `-O` 选项时，必须确保链接末尾包含文件名，否则 curl 无法正确保存文件。如果遇到链接中无文件名的情况，应该使用 `-o` 选项手动指定文件名，或使用重定向符号。

## 4. 同时下载多个文件
我们可以使用 -o 或 -O 选项来同时指定多个链接，按照以下格式编写命令：   
`curl -O http://www.codebelief.com/page/2/ -O http://www.codebelief.com/page/3/`   
或者：   
`curl -o page1.html http://www.codebelief.com/page/1/ -o page2.html http://www.codebelief.com/page/2/`   

## 5. 使用 -L 跟随链接重定向
如果直接使用 curl 打开某些被重定向后的链接，这种情况下就无法获取我们想要的网页内容。例如：   
`curl http://codebelief.com`   
会得到如下提示：   
```
<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>nginx/1.10.3</center>
</body>
</html>
```
而当我们通过浏览器打开该链接时，会自动跳转到 `http://www.codebelief.com`。此时我们想要 curl 做的，就是像浏览器一样跟随链接的跳转，获取最终的网页内容。我们可以在命令中添加 `-L` 选项来跟随链接重定向：   
`curl -L http://codebelief.com`   
这样我们就能获取到经过重定向后的网页内容了。   

## 6. 使用 -A 自定义 User-Agent
我们可以使用 `-A` 来自定义用户代理，例如下面的命令将伪装成安卓火狐浏览器对网页进行请求：   
`curl -A "Mozilla/5.0 (Android; Mobile; rv:35.0) Gecko/35.0 Firefox/35.0" http://www.baidu.com`   
下面我们会使用 -H 来实现同样的目的。

## 7. 使用 -H 自定义 header
当我们需要传递特定的 header 的时候，可以仿照以下命令来写：   
`curl -H "Referer: www.example.com" -H "User-Agent: Custom-User-Agent" http://www.baidu.com`   
可以看到，当我们使用 `-H` 来自定义 User-Agent 时，需要使用 "User-Agent: xxx" 的格式。   
我们能够直接在 header 中传递 `Cookie`，格式与上面的例子一样：   
`curl -H "Cookie: JSESSIONID=D0112A5063D938586B659EF8F939BE24" http://www.example.com`   
另一种方式会在下面介绍。

## 8. 使用 -c 保存 Cookie
当我们使用 cURL 访问页面的时候，默认是不会保存 Cookie 的。有些情况下我们希望保存 Cookie 以便下次访问时使用。例如登陆了某个网站，我们希望再次访问该网站时保持登陆的状态，这时就可以现将登陆时的 Cookie 保存起来，下次访问时再读取。   
`-c` 后面跟上要保存的文件名。   
`curl -c "cookie-example" http://www.example.com`

## 9. 使用 -b 读取 Cookie
前面讲到了使用 `-H` 来发送 Cookie 的方法，这种方式是直接将 Cookie 字符串写在命令中。如果使用 `-b` 来自定义 Cookie，命令如下：   
`curl -b "JSESSIONID=D0112A5063D938586B659EF8F939BE24" http://www.example.com`   
如果要从文件中读取 Cookie，`-H` 就无能为力了，此时可以使用 `-b` 来达到这一目的：   
`curl -b "cookie-example" http://www.example.com`   
即 `-b` 后面既可以是 Cookie 字符串，也可以是保存了 Cookie 的文件名。   

## 10. 使用 -d 发送 POST 请求
我们以登陆网页为例来进行说明使用 cURL 发送 POST 请求的方法。假设有一个登录页面 `www.example.com/login`，只需要提交用户名和密码便可登录。我们可以使用 cURL 来完成这一 POST 请求，`-d` 用于指定发送的数据，`-X` 用于指定发送数据的方式：   
`curl -d "userName=tom&passwd=123456" -X POST http://www.example.com/login`   
在使用 -d 的情况下，如果省略 -X，则默认为 POST 方式：   
`curl -d "userName=tom&passwd=123456" http://www.example.com/login`   
强制使用 GET 方式   
发送数据时，不仅可以使用 POST 方式，也可以使用 GET 方式，例如：    
`curl -d "somedata" -X GET http://www.example.com/api`   
或者使用 -G 选项：   
`curl -d "somedata" -G http://www.example.com/api`   
从文件中读取 data   
`curl -d "@data.txt" http://www.example.com/login`   
带 Cookie 登录   
当然，如果我们再次访问该网站，仍然会变成未登录的状态。我们可以用之前提到的方法保存 Cookie，在每次访问网站时都带上该 Cookie 以保持登录状态。   
`curl -c "cookie-login" -d "userName=tom&passwd=123456" http://www.example.com/login`   
再次访问该网站时，使用以下命令：   
`curl -b "cookie-login" http://www.example.com/login`   
这样，就能保持访问的是登录后的页面了。   
