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
    if(v>a[n-1]) return n+1;
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

## promise

```javascript
class Promise {
  /**
   * 终值
   * @type {*}
   */
  value = null;
  /**
   * 据因
   * @type {string}
   */
  reason;
  /**
   * 状态
   * @type {"pending"|"fulfilled"|"rejected"}
   */
  state = "pending";
  /**
   * 异步成功回调
   * @type {Function[]}
   */
  onFulfilledCallback = [];
  /**
   * 异步失败回调
   * @type {Function[]}
   */
  onRejectedCallback = [];

  constructor(executor) {
    this.init();
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  static resolve(value) {
    if (value instanceof Promise) return value;
    return new Promise(function (resolve, reject) {
      if (value && value.then && typeof value.then === "function") {
        setTimeout(function () {
          value.then(resolve, reject);
        });
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new Promise(function (resolve, reject) {
      if (reason && reason.then && typeof reason.then === "function") {
        setTimeout(function () {
          reason.then(resolve, reject);
        });
      } else {
        reject(reason);
      }
    });
  }

  static all(promises) {
    if (!promises || typeof promises[Symbol.iterator] !== "function")
      throw TypeError(
        `${typeof promises} is not iterable (cannot read property Symbol(Symbol.iterator))`
      );
    let index = 0;
    const result = [];
    return new Promise(function (resolve, reject) {
      if (!promises.length) resolve(promises);
      else {
        function processValue(value, i) {
          result[i] = value;
          if (++index === promises.length) {
            resolve(result);
          }
        }

        for (let i = 0; i < promises.length; i++) {
          Promise.resolve(promises[i]).then(
            function (value) {
              processValue(value, i);
            },
            function (reason) {
              reject(reason);
            }
          );
        }
      }
    });
  }

  static race(promises) {
    if (!promises || typeof promises[Symbol.iterator] !== "function")
      throw TypeError(
        `${typeof promises} is not iterable (cannot read property Symbol(Symbol.iterator))`
      );
    return new Promise(function (resolve, reject) {
      if (!promises.length) {
        resolve();
        return;
      }
      for (const promise of promises) {
        Promise.resolve(promise).then(
          function (value) {
            resolve(value);
          },
          function (reason) {
            reject(reason);
          }
        );
      }
    });
  }

  init() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  /**
   * 成功函数
   * @param value {*}
   */
  resolve(value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;

      this.onFulfilledCallback.forEach((fn) => {
        fn(this.value);
      });
    }
  }

  /**
   * 失败函数
   * @param reason {string}
   */
  reject(reason) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;

      this.onRejectedCallback.forEach((fn) => {
        fn(this.reason);
      });
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function"
        ? onFulfilled
        : function (value) {
          return value;
        };
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : function (reason) {
          throw reason;
        };

    return new Promise((resolve, reject) => {
      if (this.state === "fulfilled") {
        try {
          const result = onFulfilled(this.value);
          resolvePromise(result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }

      if (this.state === "rejected") {
        try {
          const result = onRejected(this.reason);
          resolvePromise(result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }

      if (this.state === "pending") {
        this.onFulfilledCallback.push((value) => {
          try {
            const result = onFulfilled(value);
            resolvePromise(result, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });

        this.onRejectedCallback.push((reason) => {
          try {
            const result = onRejected(reason);
            resolvePromise(result, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
  }

  finally(callback) {
    return this.then(
      () => Promise.resolve(callback()),
      () => Promise.reject(callback())
    );
  }
}

function resolvePromise(promise, resolve, reject) {
  if (promise instanceof Promise) {
    promise.then(resolve, reject);
  } else {
    resolve(promise);
  }
}
```



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

