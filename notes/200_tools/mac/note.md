# 备忘录

## 1. "此项目将被立刻删除，您不能撤销此操作。"

>开平英文学馆

终端机运行两个命令：
```
rm -R ~/.Trash
killall Finder
```
退出终端机。

如果它说你没有权限删除，那么就这样：
```
sudo rm -R ~/.Trash
killall Finder
```
祝你好运！
删除废纸篓，finder会自动生成。

## 2. Mac如何显示隐藏文件

**开启**
```
defaults write com.apple.finder AppleShowAllFiles -bool true
```
然后需要**强制退出**访达之后才能生效

**关闭**
```
defaults write com.apple.finder AppleShowAllFiles -bool false
```
同样是重启生效