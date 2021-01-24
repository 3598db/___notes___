# :star:神奇的pointer-events

>pointer-events CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 target。

## API
```css
/* Keyword values */
pointer-events: auto;
pointer-events: none;
pointer-events: visiblePainted; /* SVG only */
pointer-events: visibleFill;    /* SVG only */
pointer-events: visibleStroke;  /* SVG only */
pointer-events: visible;        /* SVG only */
pointer-events: painted;        /* SVG only */
pointer-events: fill;           /* SVG only */
pointer-events: stroke;         /* SVG only */
pointer-events: all;            /* SVG only */

/* Global values */
pointer-events: inherit;
pointer-events: initial;
pointer-events: unset;
```

## 应用场景
最常用的就是`pointer-events: none;`这个属性了，可以直接屏蔽DOM节点上绑定的事件，创造出类似击穿的效果。

目前发现一些应用场景可以使用此属性：
* 输入框上悬浮提示但是又不干扰输入框聚焦输入；
* 全屏水印效果
