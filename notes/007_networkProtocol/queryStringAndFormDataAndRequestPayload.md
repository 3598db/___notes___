# Query String & Form Data & Request Payload

## 1. GET请求
```
RequestURL:http://127.0.0.1:8080/test/test.do?name=mikan&address=street
Request Method:GET
Status Code:200 OK

Request Headers
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

Query String Parameters
name:mikan
address:street
```

GET 请求是被放在 QueryString 中
<!--more-->

## 2. POST请求

### a). 表单与$.ajax原生
```
RequestURL:http://127.0.0.1:8080/test/test.do
Request Method:POST
Status Code:200 OK

Request Headers
Content-Type:application/x-www-form-urlencoded

Form Data
name:mikan
address:street
```
请求被放在了 Form Data 中

### b). 原生XMLHttpRequest
```
RequestURL:http://127.0.0.1:8080/test/test.do
Request Method:POST
Status Code:200 OK

Request Headers
Content-Type:text/plain;charset=UTF-8

Request Payload
name=mikan&address=street
```
默认的Content-Type:text/plain;charset=UTF-8 参数存放在了Request Payload中

### c). 文件上传
```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryda3sd7BGGCFjy3P6

Request Payload
------WebKitFormBoundaryda3sd7BGGCFjy3P6
Content-Disposition: form-data; name="file"; filename="413.png"
Content-Type: image/png


------WebKitFormBoundaryda3sd7BGGCFjy3P6--
```
默认的Content-Type: multipart/form-data; 而且参数存放在了Request Payload

### d). 指定json传输
```
Content-Type: application/json; charset=utf-8

Request Payload
{"option":"ZC","approveMsg":"参数","taskId":"8a948c4c5e363076015e36d0b4980004"}
```
默认的Content-Type: application/json; 而且参数存放在了Request Payload

总结
1. 文件上传我们需要框架的支持,这里就不多说了
2. 我们可以设置ContentType为"application/x-www-form-urlencoded" (通用)
3. ContentType为"application/json" 是以Json格式传输数据,我们后台可以使用@RequestBody 注解接受
4. ContentType为"text/plain" 的,我们可以使用流进行读取