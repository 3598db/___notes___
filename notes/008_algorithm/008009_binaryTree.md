# :memo:二叉树
[[toc]]

## 二叉树的先序，中序，后序遍历
先序遍历表示先访问根节点，然后访问左节点，最后访问右节点。

中序遍历表示先访问左节点，然后访问根节点，最后访问右节点。

后序遍历表示先访问左节点，然后访问右节点，最后访问根节点。

### 递归实现
递归实现相当简单，代码如下
```js
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
var traversal = function(root) {
  if (root) {
    // 先序
    console.log(root); 
    traversal(root.left);
    // 中序
    // console.log(root); 
    traversal(root.right);
    // 后序
    // console.log(root);
  }
};
```
对于递归的实现来说，只需要理解每个节点都会被访问三次就明白为什么这样实现了。

### 非递归实现

自写版本：主要是利用栈结构完成递归。
```js
// 先序
function _pre(root) {
  const stack = [];
  stack.push(root);
  while (stack.length) {
    let root = stack.pop();
    console.log(root);
    root.left ? stack.push(root.left) : void 0;
    root.right ? stack.push(root.right) : void 0;
  }
}

// 中序
function _mid(root) {
  const stack = [];
  while (stack.length || root) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      console.log(leaf);
      right = root.rght;
    }
  }
}

// 后序
function _pos(root) {
  const stack = [];
  const rootStack = [];

  stack.push(root);
  
  while (stack.length) {

    root = stack.pop();
    rootStack.push(root);

    root.left ? stack.push(root.left) : void 0;
    root.right ? stack.push(root.right) : void 0;
  }

  while (rootStack.length) {
    root = rootStack.pop();
    console.log(root)
  }

}
```

## 前驱节点
```js
function predecessor(node) {
  if (!node) return 
  // 结论 1
  if (node.left) {
    return getRight(node.left)
  } else {
    let parent = node.parent
    // 结论 2 3 的判断
    while(parent && parent.right === node) {
      node = parent
      parent = node.parent
    }
    return parent
  }
}
function getRight(node) {
  if (!node) return 
  node = node.right
  while(node) node = node.right
  return node
}
```

## 后继节点
```js
function successor(node) {
  if (!node) return 
  // 结论 1
  if (node.right) {
    return getLeft(node.right)
  } else {
    // 结论 2
    let parent = node.parent
    // 判断 parent 为空
    while(parent && parent.left === node) {
      node = parent
      parent = node.parent
    }
    return parent
  }
}
function getLeft(node) {
  if (!node) return 
  node = node.left
  while(node) node = node.left
  return node
}
```

## 树的深度
```js
var maxDepth = function(root) {
  if (!root) return 0 
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```
