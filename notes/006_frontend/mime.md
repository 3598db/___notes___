# 多用途Internet邮件扩展（MIME）类型
**多用途Internet邮件扩展（MIME）类型** 是一种标准化的方式来表示文档的性质和格式。 它在`IETF RFC 6838`中进行了定义和标准化。互联网号码分配机构（IANA）是负责跟踪所有官方MIME类型的官方机构，您可以在媒体类型页面中找到最新的完整列表。 浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档；因此服务器设置正确以将正确的MIME类型附加到响应对象的头部是非常重要的。

---

## 语法
### 通用结构
>`type/subtype`
MIME的组成结构非常简单；由类型与子类型两个字符串中间用`'/'`分隔而组成。不允许空格存在。`type`表示可以被分多个子类的独立类别。`subtype`表示细分后的每个类型。
MIME类型对大小写不敏感，但是传统写法都是小写。
### 独立类型
>`text/plain`   
`text/html`   
`image/jpeg`   
`image/png`   
`audio/mpeg`   
`audio/ogg`   
`audio/*`   
`video/mp4`   
`application/*`   
`application/json`   
`application/javascript`   
`application/ecmascript`   
`application/octet-stream`   

独立类型表明了对文件的分类，可以是如下之一：

|类型|描述|典型示例|
|---|---|---|
|`text`|表明文件是普通文本，理论上是人类可读|`text/plain`, `text/html`, `text/css`, `text/javascript`|
|`image`|表明是某种图像。不包括视频，但是动态图（比如动态gif）也使用image类型|`image/gif`, `image/png`, `image/jpeg`, `image/bmp`, `image/webp`, `image/x-icon`, `image/vnd.microsoft.icon`|
|`audio`|表明是某种音频文件|`audio/midi`, `audio/mpeg`, `audio/webm`, `audio/ogg`, `audio/wav`|
|`video`|表明是某种视频文件|`video/webm`, `video/ogg`|
|`application`|表明是某种二进制数据|`application/octet-stream`, `application/pkcs12`, `application/vnd.mspowerpoint`, `application/xhtml+xml`, `application/xml`,  `application/pdf`|

`text`文件类型若没有特定的`subtype`，就使用 `text/plain`。类似的，二进制文件没有特定或已知的 `subtype`，即使用 `application/octet-stream`。
### Multipart 类型
>`multipart/form-data`   
`multipart/byteranges`   

Multipart 类型表示细分领域的文件类型的种类，经常对应不同的 MIME 类型。这是复合文件的一种表现方式。`multipart/form-data` 可用于联系 HTML Forms 和 POST 方法，此外 `multipart/byteranges`使用状态码206 Partial Content来发送整个文件的子集，而HTTP对不能处理的复合文件使用特殊的方式：将信息直接传送给浏览器（这时可能会建立一个“另存为”窗口，但是却不知道如何去显示内联文件。）

---
## 重要的MIME类型
### `application/octet-stream`
这是应用程序文件的默认值。意思是**未知的应用程序文件** ，浏览器一般不会自动执行或询问执行。浏览器会像对待 设置了HTTP头`Content-Disposition` 值为 `attachment` 的文件一样来对待这类文件。
### `text/plain`
文本文件默认值。即使它意味着未知的文本文件，但浏览器认为是可以直接展示的。
>`text/plain`并不是意味着某种文本数据。如果浏览器想要一个文本文件的明确类型，浏览器并不会考虑他们是否匹配。比如说，如果通过一个表明是下载CSS文件的`<link>`链接下载了一个 `text/plain` 文件。如果提供的信息是`text/plain`，浏览器并不会认出这是有效的CSS文件。CSS类型需要使用`text/css`。
### `text/css`
所有的HTML内容都应该使用这种类型。XHTML的其他MIME类型（如`application/xml+html`）现在基本不再使用（HTML5统一了这些格式）。 
>Note: You still need to use application/xml or application/xhtml+xml if you intend to make use of XML’s strict parsing rules, use <![CDATA[…]]> or elements from non‑HTML, non‑SVG or non‑MathML XML namespaces, as text/html’s parsing semantics are subtly incompatible with those of application/xml.
### `JavaScript types`
据 MIME 嗅探标准，下面是有效的 JavaScript MIME 类型
- `application/javascript`
- `application/ecmascript`
### `图片类型`
只有一小部分图片类型是被广泛支持的，Web安全的，可随时在Web页面中使用的：

|MIME 类型|图片类型|
|---|---|
|`image/gif`|GIF 图片 (无损耗压缩方面被PNG所替代)|
|`image/jpeg`|JPEG 图片|
|`image/png`|PNG 图片|
|`image/svg+xml`|SVG图片 (矢量图)|

此处的类型划分有一定的争议，有人认为此处应该增加WebP（`image/webp`），但是每个新增的图片类型都会增加代码的数量，这会带来一些新的安全问题，所以浏览器供应商对于添加类型非常小心。另外的一些图片种类可以在Web文档中找到。比如很多浏览器支持 icon 类型的图标作为favicons或者类似的图标，并且浏览器在MIME类型中的 `image/x-icon` 支持ICO图像。
>Footnote1 尽管 `image/vnd.microsoft.icon` 在ANA注册, 它仍然不被广泛支持，`image/x-icon` 被作为替代品使用。
### `音频与视频类型`
HTML并没有明确定义被用于`<audio>`和`<video>`元素所支持的文件类型，所以在web上使用的只有相对较小的一组类型。 文章 `Media formats supported by the HTML audio and video elements` 解释了可以被使用的解码器或视频文件格式。
### `multipart/form-data`
`multipart/form-data` 可用于HTML表单从浏览器发送信息给服务器。作为多部分文档格式，它由边界线（一个由'--'开始的字符串）划分出的不同部分组成。每一部分有自己的实体，以及自己的 HTTP 请求头，`Content-Disposition`和 `Content-Type` 用于文件上传领域，最常用的 (`Content-Length` 因为边界线作为分隔符而被忽略）。
```
Content-Type: multipart/form-data; boundary=aBoundaryString
(other headers associated with the multipart document as a whole)
--aBoundaryString
Content-Disposition: form-data; name="myFile"; filename="img.jpg"
Content-Type: image/jpeg
(data)
--aBoundaryString
Content-Disposition: form-data; name="myField"
(data)
--aBoundaryString
(more subparts)
--aBoundaryString--
```
如下所示的表单:
```
<form action="http://localhost:8000/" method="post" enctype="multipart/form-data">
  <input type="text" name="myTextField">
  <input type="checkbox" name="myCheckBox">Check</input>
  <input type="file" name="myFile">
  <button>Send the file</button>
</form>
```
会发送这样的请求:
```
POST / HTTP/1.1
Host: localhost:8000
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=---------------------------8721656041911415653955004498
Content-Length: 465
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myTextField"
Test
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myCheckBox"
on
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myFile"; filename="test.txt"
Content-Type: text/plain
Simple file.
-----------------------------8721656041911415653955004498--
```
### `multipart/byteranges`
`multipart/byteranges` 用于把部分的响应报文发送回浏览器。当发送状态码206 Partial Content 时，这个MIME类型用于指出这个文件由若干部分组成，每一个都有其请求范围。就像其他很多类型`Content-Type`使用分隔符来制定分界线。每一个不同的部分都有`Content-Type`这样的HTTP头来说明文件的实际类型，以及 `Content-Range`来说明其范围。
```
HTTP/1.1 206 Partial Content
Accept-Ranges: bytes
Content-Type: multipart/byteranges; boundary=3d6b6a416f9b5
Content-Length: 385
--3d6b6a416f9b5
Content-Type: text/html
Content-Range: bytes 100-200/1270
eta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="vieport" content
--3d6b6a416f9b5
Content-Type: text/html
Content-Range: bytes 300-400/1270
-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: "Open Sans", "Helvetica
--3d6b6a416f9b5--
```

---

## 设置正确的MIME类型的重要性
很多web服务器使用默认的 `application/octet-stream` 来发送未知类型。出于一些安全原因，对于这些资源浏览器不允许设置一些自定义默认操作，导致用户必须存储到本地以使用。常见的导致服务器配置错误的文件类型如下所示：
- RAR编码文件。在这种情况，理想状态是，设置真实的编码文件类型；但这通常不可能（可能是服务器所未知的类型或者这个文件包含许多其他的不同的文件类型）。这这种情况服务器将发送 `application/x-rar-compressed` 作为MIME类型，用户不会将其定义为有用的默认操作。
- 音频或视频文件。只有正确设置了MIME类型的文件才能被 `<video>` 或`<audio>` 识别和播放。 可参照 `use the correct type for audio and video`。
- 专有文件类型。是专有文件时需要特别注意。使用 `application/octet-stream` 作为特殊处理是不被允许的：对于一般的MIME类型浏览器不允许定义默认行为（比如“在Word中打开”）

---

## MIME 嗅探
在缺失 MIME 类型或客户端认为文件设置了错误的 MIME 类型时，浏览器可能会通过查看资源来进行MIME嗅探。每一个浏览器在不同的情况下会执行不同的操作。因为这个操作会有一些安全问题，有的 MIME 类型表示可执行内容而有些是不可执行内容。浏览器可以通过请求头 `Content-Type` 来设置 `X-Content-Type-Options` 以阻止MIME嗅探。

---

## 其他传送文件类型的方法
MIME类型不是传达文档类型信息的唯一方式： 有时会使用名称后缀，特别是在Microsoft Windows系统上。并非所有的操作系统都认为这些后缀是有意义的（特别是Linux和Mac OS），并且像外部MIME类型一样，不能保证它们是正确的。 魔术数字。不同类型的文件的语法通过查看结构来允许文件类型推断。例如，每个GIF文件以47 49 46 38十六进制值[GIF89]或89 50 4E 47 [.PNG]的PNG文件开头。 并非所有类型的文件都有幻数，所以这也不是100％可靠的方式。