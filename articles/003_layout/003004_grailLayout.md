# :star:圣杯与双飞翼

## 圣杯
主要思路：
1. 三个模块需要设置浮动，其中主模块宽度`100`%；
2. 通过负margin将模块移动到一行，左侧模块`-100%`，右侧模块`-width`；
3. 通过父模块padding腾位置；
4. 通过相对定位将元素移动到父级padding处。
```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<style type="text/css">
	.container{
		padding: 0 300px 0 200px;
	}
	.main{
		border: 5px solid;
		background: green;
		height: 200px;
		box-sizing: border-box;
		float: left;
		width: 100%;
	}
	.left{
		position: relative;
		left: -200px;
		background: blue;
		height: 200px;
		width: 200px;
		float: left;
		margin-left: -100%;
	}
	.right{
		position: relative;
		right: -300px;
		background: red;
		height: 200px;
		width: 300px;
		float: left;
		margin-left: -300px;
	}
</style>
<body>
<div class="container">
	
	<div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>

</div>
</body>
</html>
```

## 双飞翼
主要思路：
1. 三个模块需要设置浮动，其中主模块宽度`100`%；
2. 通过负margin将模块移动到一行，左侧模块`-100%`，右侧模块`-width`；
3. 主模块设置padding占位置；
4. 主模块子元素宽高`100%`即可。
```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<style type="text/css">
	.main{
		background: green;
		height: 200px;
		box-sizing: border-box;
		float: left;
		width: 100%;
		padding: 0 300px 0 200px;
	}
	.left{
		background: blue;
		height: 200px;
		width: 200px;
		float: left;
		margin-left: -100%;
	}
	.right{
		background: red;
		height: 200px;
		width: 300px;
		float: left;
		margin-left: -300px;
	}
	.content{
		background: skyblue;
		box-sizing: border-box;
		border: 5px solid;
		height: 100%;
		width: 100%;
	}
</style>
<body>
<div>
	
	<div class="main">
		<div class="content"></div>
	</div>
	<div class="left"></div>
	<div class="right"></div>

</div>
</body>
</html>
```

## flex
flex弹性盒子实现就比较简单了。
```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<style type="text/css">
	.container{
		display: flex;
	}
	.main{
		background: green;
		height: 200px;
		flex: 1;
	}
	.left{
		order: -1;
		background: blue;
		height: 200px;
		width: 200px;
		
	}
	.right{
		background: red;
		height: 200px;
		width: 300px;
		
	}
</style>
<body>
<div class="container">
	
	<div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>

</div>
</body>
</html>
```

## 绝对定位
通过绝对定位的方式也可以很方便的实现。
```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<style type="text/css">
	.container{
		position: relative;
	}
	.main{
		background: green;
		height: 200px;
		position: absolute;
		left: 200px;
		right: 300px;
	}
	.left{
		background: blue;
		height: 200px;
		width: 200px;
		float: left;
	}
	.right{
		background: red;
		height: 200px;
		width: 300px;
		float: right;
	}
</style>
<body>
<div class="container">
	
	<div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>

</div>
</body>
</html>
```

