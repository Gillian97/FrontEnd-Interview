手写代码

# 算法

## 不使用四则运算实现和

异或运算看做是不进位和运算

```javascript
function sum (a, b) {
  if (a == 0) return b
  if (b == 0) return a
  // 不进位相加结果
  let newA = a ^ b
  // 进位产生的数字
  let newB = (a & b) << 1
  // 再将两者进行相加
  return sum(newA, newB)
}
```



## 二分查找

有序数组查找第一个大于等于目标值的元素下标(位置从1开始)

```javascript
/**
 * 二分查找
 * @param n int整型 数组长度
 * @param v int整型 查找值
 * @param a int整型一维数组 有序数组
 * @return int整型
 */
function upper_bound_( n ,  v ,  a ) {
    // 不存在目标元素
    if(v > a[n-1]) return n+1;
    let left = 0, right = n -1, mid;
    // 最后只有一个值符合条件
    // 注意修改二分查找的细微判断条件
    while(left < right){
        mid = left + Math.floor((right - left)/2);
        if(a[mid] < v){
            left = mid+ 1;
        }else if(a[mid] >= v){
            right = mid;
        }
    }
    return left+1;
}
module.exports = {
    upper_bound_ : upper_bound_
};
```

最长无重复子串

```javascript
// 找到左右长度， 然后取最长
function maxLength( arr ) {
    // write code here
    let n = arr.length;
    let set = new Set() // 存储左右指针之间的不同元素集合
    let right = 0;
    let maxL = 0;
    for(let i = 0;i<n;i++){
        while(!set.has(arr[right])){
            set.add(arr[right])
            right++;
        }
        maxL = Math.max(maxL, set.size)
        set.delete(arr[i])
    }
    return maxL
}
```



## 两数之和

```javascript
// 答案唯一, 返回元素下标
function anwser (arr, target) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    map[arr[i]] = i
  }
  for (let i = 0; i < arr.length; i++) {
    var d = target - arr[i]
    if (map[d]) return [i, map[d]];
  }
  return false;
}
```

## 数组扁平化/去重/排序

```javascript
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=> a-b )
```



## 移动零

```javascript
function zeroMove (arr) {
  let n = arr.length;
  let j = 0;
  for (let i = 0; i < n - j; i++) {
    if (arr[i] == 0) {
      arr.push(0);
      arr.splice(i, 1);
      i--;
      j++;
    }
  }
  return arr;
}
```

## 合法括号检查

```javascript
// leetcode 20
var isValid = function (str) {
    let stack = [];
    let note = { "(": ")", "[": "]", "{": "}" }
    for (let s of str) {
        if (note.hasOwnProperty(s)) {
            stack.push(s)
        } else {
            let ele = stack[stack.length - 1]
            if (stack.length == 0 || note[ele] != s) return false;
            stack.pop()
        }
    }
    return stack.length == 0;
};
```

## 回溯算法

### 子集

```javascript
var subsets = function (nums) {
    // 做选择 撤销选择
    let path = [], res = []
    helper(nums, path, res);
    res.push([])
    return res
};

var helper = (choice, path, res) => {
    if (choice.length == 0) return;
    for (let i = 0; i < choice.length; i++) {
        path.push(choice[i])
        res.push(path.slice())
        helper(choice.slice(i + 1), path, res)
        path.pop()
    }
}
```

### 全排列

数组元素全排列

```javascript
var permute = function (nums) {
    let path = [], res = [];
    helper(nums, path, res)
    return res;
};

var helper = (choice, path, res) => {
    if (choice.length == 0) {
        res.push(path.slice())
        return;
    }
    for (let i = 0; i < choice.length; i++) {
        path.push(choice[i])
        let cp = choice.slice();
        choice.splice(i, 1)
        helper(choice, path, res)
        path.pop();
        choice = cp;
    }
}
```

### 组合总数

元素相加==目标值的元素组合数目

```javascript
var combinationSum = function (nums, target) {
    let path = [], res = [], obj = {}
    helper(nums, path, res, target, obj)
    return res;
};

var helper = (ch, path, res, s, obj) => {
    if (s == 0) {
        let arr = path.slice().sort((a, b) => a - b);
        if (!obj.hasOwnProperty(arr.join(''))) {
            res.push(arr);
            obj[arr.join('')] = true;
        }
        return;
    }
    for (let i = 0; i < ch.length; i++) {
        let t = s - ch[i];
        if (t < 0) continue;
        path.push(ch[i])
        helper(ch, path, res, t, obj);
        path.pop()
    }
}
```

### 单词搜索

二维数组寻找单词

```javascript
// leetcode 79
var exist = function (board, word) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == word[0]) {
                let res = helper(board, word, 0, i, j, {})
                if (res) return true;
            }
        }
    }
    return false;
};

var helper = (board, word, w, i, j, obj) => {
    let key = i + '*' + j;
    if (i >= board.length || j >= board[0].length || i < 0 || j < 0 || obj[key] || board[i][j] != word[w])
        return false;
    obj[key] = true;
    if (w + 1 === word.length) return true;

    let r1 = helper(board, word, w + 1, i + 1, j, obj)
    if (r1) return true;
    let r2 = helper(board, word, w + 1, i - 1, j, obj)
    if (r2) return true;
    let r3 = helper(board, word, w + 1, i, j + 1, obj)
    if (r3) return true;
    let r4 = helper(board, word, w + 1, i, j - 1, obj)
    if (r4) return true;

    obj[key] = false;
    return false;
}
```

### 复原 IP 地址

```javascript
// leetcode 93
var restoreIpAddresses = function (s) {
    if (s.length > 12 || s.length < 4) return []
    let path = [], res = [];
    helper(s, path, res, 0)
    return res;
};

var helper = (s, path, res, i) => {
    if (path.length == 4) {
        if (i == s.length) {
            res.push(path.join('.'))
            return;
        }
        if (i < s.length) {
            return;
        }
    }
    if (path.length < 4 && i >= s.length) return;
    // 从起始位置开始 选择三个
    for (let j = 1; j <= 3; j++) {
        // 注意 > 才不合法
        if (i + j > s.length) return;
        // 数字不能为 0
        if ((j == 2 || j == 3) && s[i] == 0) return;
        let part = s.slice(i, i + j);
        if (Number(part) > 255) return
        path.push(part)
        helper(s, path, res, i + j)
        path.pop()
    }
}
```



## 二叉树

#### 最近公共祖先

```javascript
let tar = null;
var lowestCommonAncestor = function (root, p, q) {
    helper(root, p, q);
    return tar;
}
var helper = function (root, p, q) {
    // 即使是 root=p 也不能保证 q 就在 root 这棵树中 最多只能算找到一个
    let mid = (root == p || root == q) ? 1 : 0;
    if (!root) return 0;
    let l = helper(root.left, p, q);
    let r = helper(root.right, p, q);
    if(l + r + mid>=2){
        tar = root;
    }
    // 只返回是否找到 返回数字的话 就不是最近公共祖先了
    return l + r + mid>0;
};
```

#### 二叉树直径

```javascript
let max = 0;
var diameterOfBinaryTree = (root) => {
    helper(root)
    return max;
}

var helper = function (root) {
    if (!root) return 0;
    // 左子树高度+右子树高度 的最大值
    let l = helper(root.left)
    let r = helper(root.right)
    max = Math.max(l + r, max);
    // 这棵树的高度是 较高的子树高度+1
    return Math.max(l, r) + 1;
}
```

#### 根到叶子节点数字之和

```javascript
// leetcode 129
var sumNumbers = function(root) {
    // 对二叉树的遍历
    // 获取所有路径 回溯
    let path = [], arr= [];
    helper(path, arr, root)
    let sum = 0;
    for(let i of path){
        sum += Number(i)
    }
    return sum;
};

var helper = (path, arr, root)=>{
    if(!root) return;
    if(!root.left && !root.right){
        // leaf 
        arr.push(root.val);
        path.push(arr.slice().join(''));
        arr.pop();
        return ;
    }
    arr.push(root.val);
    helper(path, arr, root.left);
    helper(path, arr, root.right);
    arr.pop();
}
```

#### 二叉树是否对称

```javascript
// leetcode 101
var isSymmetric = function (root) {
    if (!root) return true;
    return helper(root.left, root.right)
}

var helper = (l, r) => {
    if (!l && !r) return true;
    if (!l || !r) return false;
    return l.val === r.val && helper(l.left, r.right) && helper(l.right, r.left)
}
```

#### BST 是否合法

```javascript
// leetcode 98
var isValidBST = function (root) {
    return helper(root, null, null)
};

var helper = (root, max, min) => {
    if (!root) return true;
    if (max && root.val >= max.val || min && root.val <= min.val) return false;
    return helper(root.left, root, min) && helper(root.right, max, root)
}
```

#### 翻转二叉树

调换左右子树

```javascript
// leetcode 226
var invertTree = function(root) {
   if(!root) return null;
   let temp  = root.left;
   root.left  =root.right;
   root.right = temp;
   invertTree(root.left);
   invertTree(root.right);
   return root;
};
```

#### BST 变累加树

反向中序遍历

```javascript
var convertBST = function (root) {
    let arr = [0];
    helper(root, arr);
    return root;
}

var helper = (root, arr) => {
    if (!root) return;
    helper(root.right, arr)
    root.val += arr[0];
    arr[0] = root.val;
    helper(root.left, arr)
}
```

#### 合并二叉树

一个子树覆盖另一棵子树, 返回新树

```javascript
// leetcode 617
var mergeTrees = function (t1, t2) {
    if (!t1 && !t2) return null;
    if (!t1) return t2;
    if (!t2) return t1;
    let root = new TreeNode(0, null, null)
    let val1 = t1.val;
    let val2 = t2.val;
    root.val = val1 + val2;
    root.left = mergeTrees(t1.left, t2.left)
    root.right = mergeTrees(t1.right, t2.right)
    return root;
};
```

#### 树的子结构

```javascript
// leetcode 剑指offer 26
var isSubStructure = function (a, b) {
    if (!a || !b) return false;
    return isSame(a, b) || isSubStructure(a.left, b) || isSubStructure(a.right, b)
}

var isSame = (a, b) => {
    if (!b) return true;
    if (!a) return false;
    if (a.val != b.val) return false;
    return isSame(a.left, b.left) && isSame(a.right, b.right)
}
```

#### 计算 BST 高度是否合法

```javascript
// leetcode 110
var isBalanced = function (root) {
    if (!root) return true;
    if (Math.abs(dfs(root.left) - dfs(root.right)) > 1) return false;
    return isBalanced(root.left) && isBalanced(root.right)
};

// 计算子树高度
var dfs = (root) => {
    if (!root) return 0;
    return Math.max(dfs(root.left), dfs(root.right)) + 1
}
```

#### 路径和

```javascript
// leetcode 112
var hasPathSum = function (root, targetSum) {
    if (!root) return false;
    if (!root.left && !root.right) {
        return root.val == targetSum ? true : false;
    }
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
};
```

#### 路径总和 2

```javascript
// leetcode 113
var pathSum = function (root, sum) {
  let res = [];
  dfs(root, sum, res, []);
  return res;
};

var dfs = (root, sum, res, arr) => {
  // 还有sum但是该节点已经为空 说明此路不通
  if (!root) return;
  /* 叶子节点 */
  if (!root.left && !root.right) {
    if (root.val == sum) {
      arr.push(root.val);
      res.push(arr.slice()); // 加入数组的深拷贝
      arr.pop(); // 添加的子节点记得pop出来一下
    }
    return;
  }
  /* 非叶子节点 */
  arr.push(root.val); // 将访问过的节点接入数组中
  dfs(root.left, sum - root.val, res, arr); // sum 值传递
  dfs(root.right, sum - root.val, res, arr); // sum 值传递
  // 左右节点都访问过之后 将该节点pop出来 该节点下的路径已经访问完毕
  arr.pop();
}
```

## 链表

#### 链表有无环

```javascript
// leetcode 141
var hasCycle = function (head) {
    if (!head || !head.next) return false;
    let slow = head
    let fast = head.next.next;
    while (slow && fast && fast.next) {
        if (slow == fast) return true;
        slow = slow.next;
        fast = fast.next.next;
    }
    return false;
};
```

#### 环形链表 环的起始位置

快慢指针

```javascript
// leetcode 142
var detectCycle = function (head) {
    if (!head || !head.next) return null;
    let slow = head, fast = head;
    while (slow) {
        if (!fast || !fast.next) return null;
        slow = slow.next;
        fast = fast.next.next;
        if (fast == slow) {
            fast = head;
            while (slow != fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return fast;
        }
    }
};
```

#### 找到两个单链表相交的起始节点

```javascript
// leetcode 160
var getIntersectionNode = function (a, b) {
    let curr1 = a, curr2 = b;
    // 结束后从对方的起始节点开始
    while (curr1 != curr2) {
        curr1 = curr1 ? curr1.next : b;
        curr2 = curr2 ? curr2.next : a;
    }
    return curr1;
};
```

#### 合并有序链表

```javascript
// leetcode 21
var mergeTwoLists = function (l1, l2) {
  // 处理有链表为空的情况
  if (l1 == null) {
    return l2;
  }
  if (l2 == null) {
    return l1
  }
  let res = new ListNode(null);
  let curr = res;
  // 网上的做法好简洁
  while (l1 && l2) {
    if (l1.val > l2.val) {
      curr.next = l2;
      l2 = l2.next;
    } else {
      curr.next = l1;
      l1 = l1.next;
    }
    curr = curr.next;
  }
  curr.next = l1 == null ? l2 : l1;
  return res.next;
};
```

#### 复杂链表的拷贝

使用 map

```javascript
// leetcode 138
var copyRandomList = function (head) {
  if (!head) return null;
  // copy nodes
  let curr = head;
  let map = new Map(); // map的key可以是任何对象, 不限于字符串
  while (curr) {
    map.set(curr, new Node(curr.val));
    curr = curr.next;
  }
  // copy links
  curr = head;
  let node = map.get(curr);
  while (curr) {
    node.next = curr.next ? map.get(curr.next) : null;
    node.random = curr.random ? map.get(curr.random) : null;
    curr = curr.next;
    node = node.next;
  }
  return map.get(head);
};
```

#### 链表模拟两数相加

从左往右的顺序

```js
// leetcode 2
var addTwoNumbers = function (l1, l2) {
    let carry = 0;
    let val1 = 0, val2 = 0, res = 0;
    let newNode = new ListNode();
    let curr = newNode;
    while (l1 || l2) {
        val1 = l1 ? l1.val : 0;
        val2 = l2 ? l2.val : 0;
        res = val1 + val2 + carry;
        if (res >= 10) {
            carry = 1;
            res = res % 10;
        } else {
            carry = 0;
        }
        curr.next = new ListNode(res);
        curr = curr.next;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }
    if (carry > 0) {
        curr.next = new ListNode(carry);
    }
    return newNode.next;
};
```

#### 链表模拟两数相加2

```javascript
var addTwoNumbers = function (l1, l2) {
  // 将两个链表中的值分别存进两个栈中
  let stack1 = [], stack2 = [];
  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }
  // 初始化变量
  let sum = 0, carry = 0, num = 0;
  let res = new ListNode(null), rn;
  let add1, add2;
  // 当两个栈有至少一个不为空时, 都进行相加操作
  // 为空的那个栈的加数为 0
  while (stack1.length != 0 || stack2.length != 0) {
    add1 = stack1.length == 0 ? 0 : stack1.pop();
    add2 = stack2.length == 0 ? 0 : stack2.pop();
    sum = add1 + add2 + carry;
    // 商是进位 大于10为1,小于10为0
    carry = Math.floor(sum / 10);
    // 余数是相加之后结果中的数字
    num = sum % 10;
    // 将结果添加进结果列表中
    rn = res.next;
    res.next = new ListNode(num);
    res.next.next = rn;
  }
  // 当两个链表均为空时, 看是否还有进位
  // 有进位则添加进结果列表中
  if (carry != 0) {
    rn = res.next;
    res.next = new ListNode(carry);
    res.next.next = rn;
  }
  return res.next;
};
```



#### 链表中两两交换节点

```javascript
// leetcode 24
var swapPairs = function (head) {
    let dummy = new ListNode(0, head);
    let curr = head, temp, pre = dummy;
    let i = 0;
    while (curr) {
        if (!curr.next) break;
        temp = curr.next.next;
        pre.next = curr.next;
        curr.next.next = curr;
        curr.next = temp;
        pre = curr;
        curr = temp;
    }
    return dummy.next;
};
```



## LRU

![img](images/LRU.JPG)

## 排序及时间复杂度

深度广度优先遍历

```javascript
//1.深度优先遍历的递归写法 
function deepTraversal (node) {
  let nodes = []
  if (node != null) {
    nodes.push[node]
    let childrens = node.children
    for (let i = 0; i < childrens.length; i++)
      deepTraversal(childrens[i])
  }
  return nodes
}
//2.深度优先遍历的非递归写法 
function deepTraversal (node) {
  let nodes = []
  if (node != null) {
    let stack = [] //同来存放将来要访问的节点 
    stack.push(node)
    while (stack.length != 0) {
      let item = stack.pop()
      //正在访问的节点 nodes.push(item) 
      let childrens = item.children
      for (let i = childrens.length - 1; i >= 0; i--)
        //将现在访问点的节点的子节点存入 stack，供将来访问 
        stack.push(childrens[i])
    }
  }
  return nodes
}
//3.广度优先遍历的递归写法 
function wideTraversal (node) {
  let nodes = [], i = 0
  if (node != null) {
    nodes.push(node)
    wideTraversal(node.nextElementSibling)
    node = nodes[i++]
    wideTraversal(node.firstElementChild)
  }
  return nodes
}
//4.广度优先遍历的非递归写法 
function wideTraversal (node) {
  let nodes = [], i = 0
  while (node != null) {
    nodes.push(node)
    node = nodes[i++]
    let childrens = node.children
    for (let i = 0; i < childrens.length; i++) {
      nodes.push(childrens[i])
    }
  }
  return nodes
}
```

# JS 相关功能

## 继承关键字（es5/es6）

### new

` new Fn(...arguments)`

1. 创建一个空对象
2. 让空对象的 `__proto__` （IE 没有该属性）成员指向构造函数的 prototype 成员对象
3. 使用 apply 调用构造函数，属性和方法被添加到 this 引用的对象中
4. 如果构造函数中没有返回其他对象，那么返回 this，即创建的这个新对象；否则返回构造函数返回的对象

```javascript
function New(fn, ...args) {
  if(typeof fn !== "function") throw 'type error'
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  if (result && (typeof result === "object" || typeof result === "function"))
    return result;
  return obj;
}
```

### instanceof

```javascript
function _instanceof(left, right) {
  var prototype = right.prototype;
  var proto = left.__proto__;

  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}
```

### extends

js 的完美继承是寄生组合继承

```javascript
function Parent(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name);
  };
}

Parent.prototype.age = 50;
Parent.prototype.sayAge = function () {
  console.log(this.age);
};

function Child(name, parentName) {
  // 这里仅仅具有 Parent 中的属性
  Parent.call(this, parentName);
  this.currentName = name;
  this.sayCurrentName = function () {
    console.log(this.currentName);
  };
}

// 在 Parent 具有 prototype 时, 还需要具有 Parent.prototype 中的属性
// 这里继承 Parent.prototype 中的属性
Child.prototype = Object.create(Parent.prototype); // 通过这一步砍掉了实例属性
Child.prototype.constructor = Child;
```

## 防抖节流

### 防抖

```javascript
// 非立即执行版
function debounce(func, wait) {
    let timeout;
    return function () {
        // 确保返回的函数 this 指向不变以及参数的传递
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
      
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}

// 立即执行版
function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);

        let callNow = !timeout;
        timeout = setTimeout(() => {
            timeout = null;
        }, wait)

        if (callNow) func.apply(context, args)
    }
}
```

### 节流

```javascript
// 因为第一次触发事件时, last = 0, 肯定会 > wait
// 因此是 立即执行
function throttle (fn, wait) {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now - last >= wait) {
      // 需要修改 fn 的 this 指向为 全局对象
      // 而普通函数中, 此时 this 就是全局对象
      fn.call(this, ...arguments)
      last = now;
    }
  }
}


// 不立即执行
function throttle (fn, wait) {
  let timer = null;
  return function () {
    // 要用到 setTimeout, 涉及 this 不共通
    let that = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.call(that, ...args);
        timer = null;
      }, wait);
    }
  }
}

// 使用箭头函数 可以直接用 this
function throttle (fn, wait) {
  let timer = null;
  return function () {
    let args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, ...args);
        timer = null;
      }, wait);
    }
  }
}
```

合体版

```javascript
function throttle (fn, wait) {
  let timer = null;
  let startTime = Date.now();
  return function () {
    let currTime = Date.now();
    // 计算剩余时间 即还剩下多少时间执行 fn
    let remainning = wait - (currTime - startTime);
    let that = this;
    let args = arguments;
    clearTimeout(timer);
    if (remainning <= 0) {
      fn.call(that, ...args);
      startTime = Date.now();
    } else {
      timer = setTimeout(fn, remainning);
    }
  }
}
```



## Promise

一个包装异步操作的容器

- 解决了回调地狱(主要是异步请求之间存在依赖关系, 一个请求的输出是另一个请求的输入)

  链式调用

- 提高代码可读性

### 基本使用

```javascript
const p = new Promise((resolve, reject) => {
    // some code
    if (/* 异步操作成功 */) {
        resolve(val)
    } else {
        reject(err)
    }
})

// 建议处理错误采用 方式2(catch)
p.then((val) => {
    // 成功的回调
}, (err) => {
    // 失败回调 1
}).catch((err) => {
    // 失败回调 2
})
```

### 封装

#### 封装 timeout

```javascript
function timeout(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, delay)
    })
}

timeout(4000).then((val) => {
    console.log(val);
})

// 4s 之后打印 1
```

#### 封装加载图片(浏览器执行)

```javascript
function loadPic(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject(new Error("load err" + url))
        }
        img.src = url
    })
}

loadPic("https://th.bing.com/th/id/R1fdf3a183158c62b91e690d8beee6ebe?rik=mHL6yEiXiMAK9Q&riu=http%3a%2f%2fwww.shijuepi.com%2fuploads%2fallimg%2f200918%2f1-20091Q10417.jpg&ehk=wzkrRqNZfU1InC6bUzefYssPjoFNJBZZ7qSj6P7WHPI%3d&risl=&pid=ImgRaw").then((val) => {
    console.log("图片在这里：", val);
}).catch((error)=>{
    console.log(error);
})

// 浏览器控制台显示结果
// 可见抛出了一个图片标签
Promise {<pending>}
图片在这里： <img src=​"https:​/​/​th.bing.com/​th/​id/​R1fdf3a183158c62b91e690d8beee6ebe?rik=mHL6yEiXiMAK9Q&riu=http%3a%2f%2fwww.shijuepi.com%2fuploads%2fallimg%2f200918%2f1-20091Q10417.jpg&ehk=wzkrRqNZfU1InC6bUzefYssPjoFNJBZZ7qSj6P7WHPI%3d&risl=&pid=ImgRaw">​
```

#### 封装 AJAX

```javascript
function getJSON(url) {
    return new Promise((resolve, reject) => {
        function handler() {
            if (this.readyState != "4") return;
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.status + this.statusText))
            }
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = handler;
        // xhr.responseType = "json";
        // xhr.setRequestHeader("Accept", "Application/json")
        xhr.send();
    })
}
// 一段时间后打印 baidu 首页的 html 页面
getJSON("https://www.baidu.com/").then((val) => {
    console.log("Contents:" + val);
}).catch((error) => {
    console.log(error);
})
```

### resolve 返回另一个异步操作(Promise)

p1 的状态决定了 p2 的状态, 当 p1 状态改变时, p2 的回调函数才会调用. 最终以 resolve 的也就是 p1 的状态为准.

```javascript
// 情况 1
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("hello")
    }, 3000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(p1)
    }, 1000)
})

// 3s 之后打印 hello
p2.then((val) => {
    console.log(val);
}).catch((error) => {
    console.log(error);
})

/*-----------------------------------------------*/

// 情况 2
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("hello")
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(p1)
    }, 4000)
})

// 4s 之后打印 hello
p2.then((val) => {
    console.log(val);
}).catch((error) => {
    console.log(error);
})
```

### 多个 then 链式调用

then 方法返回的一定是一个 Promise 实例(不是原来那个实例)

有异步操作就是异步操作的实例,  没有异步操作就是被转换的 Promise 实例(可通过 return 设置返回值)

`then` 里使用 `return` 语句

```javascript
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("hello world")
    }, 2000)
})

let p = p1.then((val) => {
    console.log("第一个 then");
    // 可以理解为 没有封装异步操作但有返回值 的 Promise 实例
    return val;
})

p.then((val) => {
    console.log(p, "第二个 then");
    console.log(val);
}).catch((error) => {
    console.log(error);
})

// 打印结果
第一个 then
Promise { 'hello world' } 第二个 then
hello world
```

`then` 里使用异步操作

```javascript
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("hello world")
    }, 2000)
})

let p = p1.then((val) => {
    console.log('1', val);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("又一个异步操作")
        }, 2000)
    })
})

p.then((val) => {
    console.log(p, "第二个 then");
    console.log('2', val);
}).catch((error) => {
    console.log(error);
})

// 打印结果
// 2s 后打印
1 hello world
// 2s 后打印
Promise { '又一个异步操作' } 第二个 then
2 又一个异步操作
```

### catch 使用

等同于 `.then(null, func)`, 建议使用 `catch` 捕获错误, 而不是 `then` 中的第二个参数.

返回的仍然是一个 `Promise` 实例, 后面可以接着跟 `then` 方法.

```javascript
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));

// 使用示例

// 可以捕获哪些错误
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});

// 只处理状态为 rejected 的 Promise 实例的错误
const promise = new Promise(function(resolve, reject) {
  resolve('ok'); // 状态已经为 resolved, 再抛错捕获被捕获
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

#### 三种抛出错误的方式

通过 throw 或者 reject 的方式

```javascript
// 写法一
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test

// 写法二
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法三
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```

#### 内部错误不影响外部代码

通俗的说法就是“Promise 会吃掉错误”。

> 浏览器执行按照如下所述, 但是在 node 中执行, 不会打印 hello, 即错误被监听到并且直接终止了进程

```javascript
let p = new Promise((resolve, reject) => {
    // x 未定义报错
    // 但是没有 catch 等错误捕获机制
    // 错误未能处理
    resolve(x)
})

p.then((val) => {
    console.log(val);
})

// 上面报错不影响下面代码的执行
setTimeout(() => {
    console.log('hello');
}, 1000)
// 1s 之后正常打印出 hello
```

#### catch 只能捕获当前事件循环中所在 Promise 实例的错误

```javascript
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  // 在下一轮事件循环中抛出错误
  setTimeout(function () { throw new Error('test') }, 0)
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
```

#### 后面跟 then 方法

即 `catch` 只能捕获它之前的错误

```javascript
// ****没有报错则跳过 catch
Promise.resolve()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  // 有报错与前面的 catch 无关
  console.log('carry on');
});
// carry on

// ****有报错
const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
    });
};

someAsyncThing()
    .catch(function (error) {
        console.log('oh no', error);
    }) // 此处 catch 返回的是一个 Promise { undefined }
    .then(function () {
        console.log('carry on');
    });
// oh no [ReferenceError: x is not defined]
// carry on

// catch 中也可以抛出错误
// 则需要在 catch 后再跟 catch 方法
someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为 y 没有声明
  y + 2;
}).then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
```

### finally 使用

不论 `Promise` 最后状态如何, 在执行完 `then` 或者 `catch` 指定的回调函数之后, 都会执行 `finally` 中的回调函数.

本质是 then 方法的特例.

```javascript
// 使用
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···}); // 注意这里的 callback 不接受任何参数

// 等同于最后的有两个回调的 then 方法
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

### all

多个 Promise 实例, 包装成一个新的 Promise 实例. 

1. 有一个实例返回为 rejected, 则整个状态为 rejected, 且返回最先 rejected 的实例的返回值
2. 都为 resolved 则返回所有实例返回值的数组.

然后将返回值传给回调函数.

```javascript
const p = Promise.all([p1, p2, p3]);
```

参数中的每一个 Promise 实例, 都是其最终执行状态

```javascript
let p1 = new Promise((resolve, reject) => {
  resolve('hello')
}).then(val => {
  console.log(val);
  return "world"
})

let p2 = new Promise((resolve, reject) => {
  reject('error')
}).then(val => {
  console.log(val);
}).catch(err => { // 自带 catch, all 的 catch 不会捕获错误, 没带的话, 使用 all 的 catch
  console.log(err); // 执行完 catch 后, 也是 resolved
  return "err!!"
})

// 这里的 p1 和 p2 实际上是各自执行完 then 与 catch 方法后返回的实例
Promise.all([p1, p2]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err)
})
```



### race

看哪个实例最先改变状态, 变成它的状态, 并且返回其返回值.

对于不是 Promise 实例的参数, 先使用 Promise.resolve 方法将其变为实例.

#### 请求超时

指定时间内, 没有完成请求, 就抛错.

```javascript
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('timeout')
  }, 5000)
})

let p = Promise.race([fetch(url), p2])

p.then(res => {
  // 请求返回结果
  console.log(res);
}).catch(err => {
  // 超时报错
  console.log(err)
})
```

### resolve

将现有对象转为 Promise 对象

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

1. 参数是 `Promise` 实例, 不做改动

2. 参数是带有 `then` 方法的对象

   将其转换为 `Promise` 实例并立即执行其 `then` 方法

   ```javascript
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable); // p1 状态变为 resolved, 因为执行了 then 方法
   // 从而立即执行下述 then 方法
   p1.then(function(value) {
     console.log(value);  // 42
   });
   ```

3. 原始值/不具有 then 方法的对象

   返回一个状态为 resolved 的新 Promise 对象

   ```javascript
   // p 一生成状态就是 resolved
   let p = Promise.resolve('hello') // { '1': 2 }
   // 从而立即执行下述 then 方法
   p.then(val => console.log(val)) // hello  // { '1': 2 }
   ```

4. 不带有任何参数

   直接返回一个状态为 resolved 的新 Promise 对象

   ```javascript
   let p = Promise.resolve()
   p.then(val => console.log(val)) // undefined
   ```

因此甚至可以直接只用 Promise.resolve() 生成一个状态为 resolved 的新 Promise 对象

> 注意事件循环

```javascript
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

### reject

返回一个新实例, 状态为 `rejected`

```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

// 回调函数会立即执行
p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

其参数会原封不动地成为 reject 的理由.

```javascript
const thenable = {
  then (resolve, reject) {
    reject("error")
  }
}

let p = Promise.reject(thenable)
p.then(val => {
  console.log(val)
}).catch(err => {
  console.log(err);
})

// 打印如下
// { then: [Function: then] }
```

### 相关手写实现

#### Promise 基本实现

实现链式调用

```javascript
const PENDING = "pending", RESOLVED = "fulfilled", REJECTED = "rejected"

const resolvePromise = (res, x, resolve, reject) => {
  // 防止循环引用
  if (res === x) return reject(new Error("promise 递归调用错误")); // promise 的值永远出不来
  // 需要对返回值类型进行分类讨论
  // 对象/函数 & 普通值
  if (x instanceof Promise) {
    if (x.status === PENDING) {
      x.then(
        val => resolvePromise(res, val, resolve, reject),
        reject
      )
    } else if (x.status === RESOLVED) {
      resolve(x.val);
    } else {
      reject(x.reason);
    }
  } else if ((typeof x === 'object') && x !== null || typeof x === 'function') {
    // 如果 x 是一个 Promise 对象, 则 res 的状态依赖于 x 的状态
    // 判断 x 的状态, 调用过 resolve 就获取其值, 调用过 reject 就获取其 err, 总之是获取其返回值
    // 如果其返回值也是一个 Promise 对象, 则需要继续判断该对象的状态及返回值
    // 执行该 x 的 then 方法并获取其返回值
    let then = x.then;
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(x, val => {
          if (called) return;
          called = true;
          resolvePromise(res, val, resolve, reject);
        }, err => {
          if (called) return;
          called = true;
          reject(err);
        })
      } catch (err) {
        // 调用 then 方法出现异常
        // 如果 then 传入的两个回调有一个已被调用, 则忽略
        if (called) return;
        called = true;
        reject(err)
      }
    } else {
      // 无 then 方法的普通对象
      resolve(x);
    }
  } else {
    // 普通值
    resolve(x);
  }
}

// 根据规定 then 中执行的操作是微任务
// 因此 then 返回的 Promise 是立即执行的 需要将其包装为微任务

class Promise {
  constructor(executor) {
    this.val = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 异步操作的回调在 resolve 和 reject 中调用
    let resolve = (val) => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.val = val;
        this.onResolvedCallbacks.map(fn => fn())
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.map(fn => fn())
      }
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  // 实现 then 的链式调用和值穿透
  // then 创建新实例 并且将当前 then 的结果 传递给新建实例的then方法
  then(onResolvedCallback, onRejectedCallback) {
    // 解决两者不是函数的问题, 不是函数要变成函数
    onResolvedCallback = typeof onResolvedCallback === "function" ? onResolvedCallback : v => v;
    onRejectedCallback = typeof onRejectedCallback === "function" ? onRejectedCallback : err => { throw err };

    let res = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        // then 参数中的操作都是微任务, 这里使用 setTimeout 模拟微任务
        setTimeout(() => {
          try {
            let temp = onResolvedCallback(this.val)
            // 根据 temp 的类型判断是直接抛出还是做相关处理
            resolvePromise(res, temp, resolve, reject);
          } catch (err) {
            reject(err)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let temp = onRejectedCallback(this.reason)
            resolvePromise(res, temp, resolve, reject);
          } catch (err) {
            reject(err)
          }
        }, 0)
      }
      // 保存回调函数
      // 即使后面依次执行函数时, 也是把每个操作放进微任务队列中, 并不会立即执行
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // 函数执行时 才会去获取 this.val 的值
          // 此时添加时 不会去获取
          // console.log('==', this.val);
          setTimeout(() => {
            try {
              let temp = onResolvedCallback(this.val);
              resolvePromise(res, temp, resolve, reject);
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let temp = onRejectedCallback(this.reason)
              resolvePromise(res, temp, resolve, reject);
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
      }
    })
    return res;
  }
}
```

#### Promise.prototype.catch 实现

```javascript
catch (onRejectedCallback) {
    return this.then(null, onRejectedCallback);
}
```

#### Promise.prototype.finally 实现

```javascript
Promise.prototype.finally = function (callback) {
  return this.then(
    value  => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => { throw reason })
  );
};
```

#### Promise.resolve 实现

```javascript
static resolve(data) {
  if (data instanceof Promise) return data;
  return new Promise((resolve, reject) => {
    resolve(data);
  })
}
```

#### Promise.reject 实现

```javascript
static reject(reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  })
}
```

#### Promise.all 实现

```javascript
Promise.all = (promiseList) => {
    let resPromise = new Promise((resolve, reject) => {
        let count = 0, res = [], n = promiseList.length;
        if (n === 0) return resolve(res);
        promiseList.forEach((p, index) => {
            Promise.resolve(p).then(val => {
                count++;
                res[index] = val;
                if (count === n) resolve(res);
            }).catch(err => {
                reject(err);
            })
        });
    })
    return resPromise;
}
```

#### Promise.race 实现

```javascript
Promise.race = (promiseList) => {
    let resPromise = new Promise((resolve, reject) => {
        if (n === 0) return resolve();
        promiseList.forEach(p => {
            Promise.resolve(p).then(val => {
                return resolve(val);
            }).catch(err => {
                return reject(err);
            })
        });
    })
    return resPromise;
}
```

## 异步事件执行顺序

### 异步事件串行执行

**场景**

- 有a、b、c三个异步任务，要求必须先执行a，再执行b，最后执行c
- 且下一次任务必须要拿到上一次任务执行的结果，才能做操作

**思路**

- 实现一个队列，将这些异步函数添加进队列并且管理它们的执行，队列具有`First In First Out`的特性，也就是先添加进去的会被先执行，接着才会执行下一个(注意跟栈作区别)
- 大家也可以类比一下jQuery的animate方法，添加多个动画也会按顺序执行

**实现**

模拟三个异步函数

```javascript
let p1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('a')
        }, 1000)
    })
}

let p2 = function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data + 'b')
        }, 1000)
    })
}

let p3 = function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data + 'c')
        }, 1000)
    })
}

let arr = [p1, p2, p3];
```

#### 使用链式调用

```javascript
p1().then(val => {
    console.log('1' + val);
    return p2(val)
}).then(val => {
    console.log('2' + val);
    return p3(val)
}).then(val => {
    console.log('3:' + val);
})

// 输出
// 1:a
// 2:ab
// 3:abc
```

#### 循环构建队列

queue 最后指向 p3 执行后返回的 Promise, 尽管前面没有变量指向, 但是之前声明的 Promise 实例都还在, 前面形成了链式调用.

`()->then(p1)->[]->then(p2)->[]->then(p3)->[]`

`[]` 表示函数生成的 Promise 实例, `[]` 执行完才会去指向写在其 `then` 方法中的 `p` 函数.

```javascript
function buildQueue(arr) {
    // 一个状态为 resolved 的 Promise 对象
    let queue = Promise.resolve();
    for (let p of arr) {
        // 不断执行 p 并返回新的 Promise 的过程
        queue = queue.then(p);
        console.log(queue);
    }
    return queue;
}

buildQueue(arr).then(val => {
    console.log(val);
})

// 输出
/*
Promise { <pending> }
Promise { <pending> }
Promise { <pending> }
abc
*/
```

#### 使用 async/await 构建队列

```javascript
async function buildQueue(arr) {
    let res = null;
    for (let p of arr) {
        // 上一轮抛出的值传给下一轮
        res = await p(res);
        console.log(res);
    }
    return await res;
}

buildQueue(arr).then(val => {
    console.log(val);
})

// 输出
// 最后两个 abc 是同时出现的, 即循环结束后的 res 是字符串 abc
/*
a
ab
abc
abc
*/
```



### 异步事件并行执行

### 异步事件依赖执行

## 事件绑定/观察者(EventEmitter)

```javascript
class EventEmiter {
    constructor() {
        this.events = {}
    }
    emit(event, ...args) {
        this.events[event].forEach(fn => {
            fn.apply(this, args)
        })
    }
    //  某个事件有很多个监听函数
    on(event, fn) {
        if (this.events[event]) {
            this.events[event].push(fn)
        } else {
            this.events[event] = [fn]
        }
    }
    remove(event) {
        delete this.events[event]
    }
}

const eventHub = new EventEmiter()
eventHub.on('test', data => {
    console.log(data)
})

eventHub.emit('test', 1)
console.log(2)
```

## 深拷贝

乞丐版

```javascript
var someObj = {};
var newObj = JSON.parse(JSON.stringify(someObj));
```

白领版

```javascript
function deepClone(data) {
  if (typeof data === 'object') {
    const result = Array.isArray(data) ? [] : {};
    for (let key in data) {
      if (typeof data[key] === 'object') {
        result[key] = deepClone(data[key]);
      } else {
        result[key] = data[key];
      }
    }
    return result;
  } else {
    return data;
  }
}
```

精英版

```typescript
function deepClone<T>(data: T): T {
  const isObj = (v: any): boolean => Object.prototype.toString.call(v).slice(8, -1) === 'Object'
  
  function _deepClone(val: any) {
    if(Array.isArray(val)) {
      const source = val as any[]
      return source.reduce((res, item) => {
        res.push(_deepClone(item))
        return res
      }, [])
    }
  
    if(isObj(val)) {
      const source = val as object
      return Object.keys(val).reduce((res, key) => {
        res[key] = _deepClone(source[key])
        return res
      }, {})
    }
  
    return val
  }
  
  return _deepClone(data) as T
}
```

## 函数柯里化

### 函数参数定长

```javascript
function curry(fn, args) {
  var length = fn.length;
  args = args || [];
  return function () {
    var newArgs = args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
}
```

### 函数参数不定长

```javascript
function curry (fn) {
  return function () {
    let args = [].slice.call(arguments);
    let inner = function () {
      args.push(...arguments);
      return inner;
    }
    inner.toString = function () {
      return fn.apply(null, args);
    }
    return inner;
  }
}
```

## call/apply/bind

call

```javascript
Function.prototype.call2 = function(newObj = window){
  newObj.fn = this;
  let args = [...arguments].slice(1);
  let res = newObj.fn(...args);
  delete newObj.fn;
  return res;
}

Function.prototype.call = function (context, ...args) {
  let context = context || window;
  // 避免原本有个函数叫 fn, 最后给人家删除了
  let fn = Symbol('fn');
  context.fn = this;

  let result = eval('context.fn(...args)');

  delete context.fn
  return result;
}
```

apply

在 newObj 中新增一个属性, 并传参调用这个属性对应的函数, 返回结果

```javascript
Function.prototype.apply2 = function (newObj = window) {
  newObj.fn = this;
  let res;
  if (arguments[1]) res = newObj.fn(...arguments[1])
  else res = newObj.fn()
  delete newObj.fn;
  return res;
}
```

bind

https://blog.csdn.net/jiaojsun/article/details/93411428

```javascript
// bind 返回的函数可以作为构造函数
// 需要找到目标函数的原型对象
Function.prototype.bind2 = function (newObj = window, ...args1) {
  if (typeof this !== 'function') throw new Error('error')
  // 保存 this 的值 代表调用 bind 的函数
  let that = this;
  
  let newFunc = function(...args2){
    that.apply(newObj, [...args1, ...args2])
  }
  newFunc.prototype = Object.create(that.prototype);
  newFunc.prototype.constructor = that;
  
  return newFunc;
  // ----------------
  let args = [...arguments].slice(1);
  return function newFn () {
    if (this instanceof newFn) return new that(...args, ...arguments)
    return that.apply(newObj, args.concat(...arguments))
  }
}
```

## 实现 JSONP

JSONP 原理: 利用 script 标签通过 src 属性发出 get 请求, 实现跨域请求并且拿到响应.

封装:

```javascript
const jsonp = ({ url, params, callbackName }) => {
  const generateURL = () => {
    let dataStr = '';
    for(let key in params) {
      dataStr += `${key}=${params[key]}&`;
    }
    dataStr += `callback=${callbackName}`;
    return `${url}?${dataStr}`;
  };
  return new Promise((resolve, reject) => {
    // 初始化回调函数名称
    callbackName = callbackName || Math.random().toString.replace(',', ''); 
    // 创建 script 元素并加入到当前文档中
    let scriptEle = document.createElement('script');
    scriptEle.src = generateURL();
    document.body.appendChild(scriptEle);
    // 绑定到 window 上，为了后面调用
    window[callbackName] = (data) => {
      resolve(data);
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptEle);
    }
  });
}
```

服务端响应:

```javascript
let express = require('express')
let app = express()
app.get('/', function(req, res) {
  let { a, b, callback } = req.query
  console.log(a); // 1
  console.log(b); // 2
  // 注意哦，返回给script标签，浏览器直接把这部分字符串执行
  res.end(`${callback}('数据包')`);
})
app.listen(3000)
```

前端示例调用:

```javascript
jsonp({
  url: 'http://localhost:3000',
  params: { 
    a: 1,
    b: 2
  }
}).then(data => {
  // 拿到数据进行处理
  console.log(data); // 数据包
})
```

## 实现 const

由于 ES5 环境没有 block 的概念，所以是无法百分百实现 const，只能是挂载到某个对象下，要么是全局的 window，要么就是自定义一个 object 来当容器

```javascript
var _const = function (key, val) {
  var g = window;
  // 要声明的变量名不可以是关键字
  let key_arr = ['var', 'let', 'const', 'return', 'function'] // 自定义
  if (!key || key_arr.indexOf(key) > -1) throw new Error(`${key}变量名不合法`);
  if (g.hasOwnProperty(key)) throw new Error(`${key}已经被声明`);
  g[key] = val;
  Object.defineProperty(g, key, {
    get: function () {
      return val;
    },
    set: function () {
      if (g.hasOwnProperty(key)) {
        throw new Error(`${key}不能被赋值`);
      }
      return val;
    }
  })
}
```

# CSS

## 实现红绿灯效果

使用 CSS 动画或者 JS 定时修改元素类别

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>red green light
    </title>
    <style type="text/css">
        .hld {
            width: 100px;
            height: 100px;
            background-color: red;
            border-radius: 50%;
            /* animation: hld 2s linear 1s infinite */
        }

        /* @keyframes hld {
            0% {
                background-color: red;
            }

            100% {
                background-color: green;
            }
        } */

        .red {
            background-color: red;
        }

        .green {
            background-color: green;
        }
    </style>
</head>

<body>
    <div class="hld" id="hld"></div>
</body>

</html>
<script type="text/javascript">
    var node = document.getElementById('hld');
    let flag = true;

    function turncolor() {
        setInterval(() => {
            if (flag) node.className = "hld red"
            else node.className = "hld green"
            flag = !flag;
        }, 2000)
    }
    turncolor()
</script>
```

# 红包随机金额算法

## 算法一

`n>=2` 时, 每个红包的金额 `count = [min, 剩余金额/剩余人数*2]` 之间的随机数. 

> 设剩余金额为 `c`, 剩余人数为 `n`
>
> 在 `n>=2` 时, `c/n*2<=c` 恒成立. 即在此区间的随机金额永远不会超过剩余金额.
>
> 同时, 能使金额方差更小, 因为如果直接在 (0, c] 之间随机的话, 方差较大.

`n == 1`, 直接取剩余的金额.

> 这里采取将小数扩大倍数然后再除以倍数的方法, 确保计算精度
>
> 由于最后的剩余值也可能存在精度问题, 因此使用 sum 存储红包金额

```javascript
// 先取精度, 再取倍数
// 否则即使进行了倍数的扩大, 还有可能存在精度问题
function money(money, size) {
    const min = 0.01;
    let list = [];
    let sum = 0, initVal = money * 100;
    while (size > 1) {
        let max = money / size * 2; // max 的精度可能较高
        // 随机金额 一开始 max 的精度无所谓, 生成随机数之后再进行精度的确认
        let count = Math.random() * max;
        count = count < min ? min : count;
        // Math.round(x) 取 x 四舍五入之后最接近的整数(靠近x轴正方向)
        count = Math.round(count * 100) / 100;
        list.push(count);
        // 准确的剩余值
        // 注意: x 仍有可能不是整数,有小数部分
        let x = money * 100, y = count * 100;
        money = (x - y) / 100;
        size--;
        sum += y;
    }
    list.push((initVal - sum) / 100);
    return list;
}

money(100, 10);
```

评价:

优点:

抽取的红包在剩余金额/剩余人数*2之间, 相对控制了红包的大小.

缺点:

前面抽的金额会影响后面的抽取金额.

前面的人抽取小红包, 则后面的人抽取大红包的概率较大

理论上来说, 每个红包的金额应该差不多, 在一开始的均值附近.

## 算法二



# HTML

