# :star:数组排序
[[toc]]
## 十种常见排序算法可以分为两大类

**非线性时间比较类排序**：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此称为非线性时间比较类排序。   
**线性时间非比较类排序**：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此称为线性时间非比较类排序。

## 算法复杂度
![](https://images2018.cnblogs.com/blog/849589/201804/849589-20180402133438219-1946132192.png)
## 冒泡排序

### 算法描述
1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
3. 针对所有的元素重复以上的步骤，除了最后一个；
4. 重复步骤1~3，直到排序完成。
![](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015223238449-2146169197.gif)

### 代码实现
```javascript
// v1
function bubbleSort(a) {
  const l = a.length;
  for (let j = 0; j < l - 1; j++) {
    for (let i = 0; i < l - 1; i++) {
      if (a[i] > a[i + 1]) {
        const _ = a[i];
        a[i] = a[i + 1];
        a[i + 1] = _;
      }
    }
  }
  return a;
};

// v2
function bubbleSort(a) {
  const l = a.length;
  for (let j = 0; j < l - 1; j++) {
    for (let i = 0; i < l - 1 - i; i++) {
      if (a[i] > a[i + 1]) {
        const _ = a[i];
        a[i] = a[i + 1];
        a[i + 1] = _;
      }
    }
  }
  return a;
};
```
---
## 选择排序

### 算法描述
1. 初始状态：无序区为R[1..n]，有序区为空；
2. 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
3. n-1趟结束，数组有序化了。

### 算法图示
![](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015224719590-1433219824.gif)

### 代码实现
```javascript
function selectionSort(a) {
  const l = a. length;
  for (let i = 0; i < l - 1; i++) {
    let min = a[i];
    let minIndex = i;
    for (let j = i + 1; j < l; j++) {
      if (min > a[j]) {
        min = a[j];
        minIndex = j;
      }
    }
    
    const _ = a[i];
    a[i] = a[minIndex];
    a[minIndex] = _;
  }
  return a;
}
```
---
## 插入排序

### 算法描述
1. 从第一个元素开始，该元素可以认为已经被排序；
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置；
4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
5. 将新元素插入到该位置后；
6. 重复步骤2~5。

### 算法图示
![](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015225645277-1151100000.gif)

```javascript
// for
function insertionSort(a) {
	const l = a. length;
	for (let i = 0; i < l; i ++) {
  	const _ = a[i];
  	for (let j = i - 1; j >= 0; j --) {
      if (a[j] > _) {
      	a[j + 1] = a[j];
        a[j] = _;
      }
    }
  }
	return a;
}

// while
function insertionSort(a) {
	const l = a. length;
	for (let i = 1; i < l; i ++) {
    const _ = a[i];
    let index = i - 1;
    while(index >= 0 && a[index] > _) {
      a[index + 1] = a[index];
      index --;
    }
    a[index + 1] = _
  }
	return a;
}
```
---
## 希尔排序（缩小增量排序）

### 算法描述
1. 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
2. 按增量序列个数k，对序列进行k 趟排序；
3. 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

### 算法图示
![](https://images2018.cnblogs.com/blog/849589/201803/849589-20180331170017421-364506073.gif)

### 代码实现
```javascript
function shellSort(a) {
  const l = a. length;
  let gap = 1;

  while (gap < l / 3) {
    gap = gap * 3 + 1;
  }

  for (; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < l; i++) {
      const _ = a[i];
      for (let j = i - gap; j >= 0; j -= gap) {
        if (a[j] > _) {
          a[j + gap] = a[j];
          a[j] = _;
        }
      }
    }
  }
  
  return a;
}
```
---
## 快速排序

### 算法描述
1. 从数列中挑出一个元素，称为 “基准”（pivot）；
2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

### 算法图示
![](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015230936371-1413523412.gif)

### 代码实现
```javascript
function quickSort(arr, left, right) {
  var len = arr.length,
  partitionIndex,
  left =typeof left !='number' ? 0 : left,
  right =typeof right !='number' ? len - 1 : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex-1);
    quickSort(arr, partitionIndex+1, right);
  }

  function partition(arr, left ,right) {
    var pivot = left,
    index = pivot + 1;
    for (var i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
        swap(arr, i, index);
        index++;
      }       
    }
    swap(arr, pivot, index - 1);
    return index-1;
  }
  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

function quickSort(a, left = 0, right = a.length) {
  if (right - left <= 1) {
    return;
  }

  const sign = right - 1;
  let index = 0;

  for (let i = left; i < right; i++) {
    if (a[sign] > a[i]) {
      const _ = a[left + index];
      a[left + index] = a[i];
      a[i] = _;
      index ++;
    }
  }

  const _ = a[left + index];
  a[left + index] = a[sign];
  a[sign] = _;

  q(a, left, left + index);
  q(a, left + index + 1, right);

  return a;
}
```
