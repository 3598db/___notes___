# 科学上网
## 准备
搭建一个ssr节点需要一个国外服务器转发请求, 推荐vultr, 搬瓦工, 其他的没折腾过, 据说谷歌云网速飞起, 但是流量按G收费, 看视频扛不住, pronhub会员还是买一个不限流量的服务器比较靠谱.

## 开始

打开MAC终端
```shell
ssh username@host
```
接下来输入密码就连接成功了, 如遇异常请百度.

下面的shell命令直接复制执行

```shell
yum -y install wget

wget –no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-libev.sh

chmod +x shadowsocks-libev.sh

./shadowsocks-libev.sh 2>&1 | tee shadowsocks-libev.log

// 下面是安装锐速的命令 亲测还是提升蛮多的 后悔没有早点用
wget --no-check-certificate -O appex.sh https://raw.githubusercontent.com/0oVicero0/serverSpeeder_Install/master/appex.sh && bash appex.sh install '2.6.32-642.el6.x86_64'

———————————————————代码分割线———————————————————

一键部署ssr代码(支持SS）如下：

yum -y install wget

wget –no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocksR.sh

chmod +x shadowsocksR.sh

./shadowsocksR.sh 2>&1 | tee shadowsocksR.log
```

在接下来输入端口, 密码, 加密方式等, 静静等待部署完成就可以啦.