# 常规布局方案总结

## 水平居中
### a) inline-block + text-align
```css
.parent{
  font-size: 0;
  text-align: center;
}
.child{
  font-size: 12px;
  height: 20px;
  display: inline-block;
}
```

### b) table + margin

> tips:此方案兼容至IE8，可以使用`<table/>`代替css写法，兼容性良好
```css
.parent{
}
.child{
  display: table;
  margin: 0 auto;
}
```

### c) absolute + transform
```css
.parent{
  position: relative;
  height: 20px;
}
.child{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

> tips:此方案兼容至IE9，因为`transform`兼容性限制，如果`.child`为定宽元素，可以使用以下写法，兼容性极佳
```css
.parent{
  position: relative;
  height: 20px;
}
.child{
  position: absolute;
  left: 50%;
  width: 100px;
  margin-left: -50px;
}
```
### d) flex + justify-content
```css
.parent{
  display: flex;
  justify-content: center;
}
.child{
}
```

## 垂直居中
### a) table-cell + vertial-align
```css
.parent{
  height: 100px;
  display: table-cell;
  vertical-align: middle;
}
.child{
}
```
### b) absolute + transform
```css
.parent{
  position: relative;
  height: 100px;
}
.child{
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

### c) flex + align-items
```css
.parent{
  height: 100px;
  display: flex;
  align-items: center;
}
.child{
  width: 100%;
}
```

## 水平垂直居中
### a) inline-block + table-cell + text-align + vertical-align
```css
.parent{
  font-size: 0px;
  width: 100px;
  height: 100px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.child{
  font-size: 12px;
  display: inline-block;
}
```

### b) absolute + transform
```css
.parent{
  height: 100px;
  width: 100px;
  position: relative;
}
.child{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

### c) flex
```css
.parent{
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.child{
}
```

### d) absolute + margin (子元素定宽高方案)
```css
.parent{
  position: relative;
  width: 100%;
  height: 100px;
}
.child{
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
}
```

## 一列定宽 一列自适应
### a) float + margin
```css
.left{
	float: left;
  width: 100px;
  height: 100px;
}
.right{
  margin-left: 120px;
  height: 100px;
}
```

### b) float + overflow
> tips: 此方案不管是多列定宽或是不定宽，都可以完美实现，同时可以实现登高布局
```css
.left{
  float: left;
	margin-right: 20px;
}
.right{
  overflow: hidden;
}
```

### c) table
```css
.parent{
  display: table;
  width: 100%;
	table-layout: fixed;
}
.left,.right{
	display: table-cell;
}
.left{
	width: 100px;
	padding-right: 20px;
}
```

### d) flex
```css
.parent{
  display: flex;
}
.left{
}
.right{
  flex: 1;
}
```

## 多列定宽 一列自适应
### a) float + overflow
```css
.left,.center{
	float: left;
	width: 100px;
	margin-right: 20px;
}
.right{
	overflow: hidden;
}
```

### b) table
```css
.parent{
  display: table;
  width: 100%;
	table-layout: fixed;
}
.left,.center,.right{
	display: table-cell;
}
.right{
	width: 100px;
	padding-right: 20px;
}
```

### c) flex
```css
.parent{
	display: flex;
}
.left,.center{
	width: 100px;
	padding-right: 20px;
}
.right{
	flex: 1;
}
```

## 一列不定宽 一列自适应
### a) float + overflow
```css
.left{
	float: left;
	margin-right: 20px;
}
.right{
	overflow: hidden;
}
.left p{
  width: 200px;
}
```

### b) table
```css
.parent{
  display: table;
  width: 100%;
}
.left,.right{
	display: table-cell;
}
.left{
	width: 0.1%;
	padding-right: 20px; 
}
.left p{
  width:200px;
}
```

### c) flex
```css
.parent{
	display: flex;
}
.left{
	margin-right: 20px;
}
.right{
	flex: 1;
}
.left p{
  width: 200px;
}
```

## 多列不定宽 一列自适应
### a) float + overflow
```css
.left,.center{
	float: left;
	margin-right: 20px;
}
.right{
	overflow: hidden;
}
.left p,.center p{
	width: 100px;
}
```

## 圣杯布局
```css
.container {
  width: 500px;
  margin: 50px auto;
}
.wrapper {
  padding: 0 100px 0 100px;
  box-sizing: border-box;
}
.col {
  position: relative;
  float: left;
}
.header,.footer {
  height: 50px;
}
.main {
  width: 100%;
  height: 200px;
}
.left {
  width: 100px;
  height: 200px;
  margin-left: -100%;
  left: -100px;
}
.right {
  width: 100px;
  height: 200px;
  margin-left: -100px;
  right: -100px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
  overflow: hidden;
}
```

## 双飞翼
```css
.col {
  float: left;
}
.header {
  height: 50px;
}
.main {
  width: 100%;
}
.main-wrap {
  margin: 0 100px 0 100px;
  height: 200px;
}
.left {
  width: 100px;
  height: 200px;
  margin-left: -100%;
}
.right {
  width: 100px;
  height: 200px;
  margin-left: -100px;
}
.footer {
  height: 50px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
  overflow: hidden;
}
```




















