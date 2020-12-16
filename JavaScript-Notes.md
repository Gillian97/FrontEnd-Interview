---
title: JavaScript Notes
tags: '-JavaScript'
abbrlink: 11485
date: 2020-09-01 09:17:06
---



# JavaScript 简介

## 诞生

本名 ECMAScript, 被创建的原因是, 在浏览器输入数据时需要进行验证, 而不是传到服务器才告知客户数据错误或者空白等, 于是被创建时诞生在 NetScape 浏览器中.  

## 特点

只能在浏览器中运行, 不能单独运行, 不能读取文件

由浏览器中的执行模块(JS引擎)执行, 考虑到页面打开的速度, 不编译执行.

## 功能

### 操作HTML的DOM

浏览器从服务器取到HTML页面之后, 会展示页面出来, 但是浏览器内部将HTML组织成一个树给JS, 这个树称为 DOM.

![htmltree](JavaScript-Notes/htmltree.jpg)

JS可以定位并操作DOM中的任意一个节点, 且不用刷新页面, 操作就可以立刻显示出效果. 而且操作是内部进行, 并没有改变 html的源码.

### 控制浏览器

打开窗口/在一个窗口内前进后退/获得浏览器名称+版本(判断是什么浏览器, 才能做这个浏览器支持的特殊操作)...

### 异步调用

不能像`java`一样访问网络, 就不能调用服务器的接口去获取数据. 用户只能`get`或者`post`向服务器发送请求, 服务器返回整个页面, 而不是一个片段, 整个页面得重新刷新.

`XMLHttpRequest` 使得 `JS` 可以直接向服务器发起接口调用, 等获得服务器返回的数据(此时为`XML`)后执行浏览器提供的回调函数. Called 异步调用. 回调函数基本就是更新`DOM`树的某个节点, 实现网页的局部刷新. 后来上述的异步调用被称为 `AJAX` (Asynchronous JavaScript And XML).

由于`XML`的标签太多, 真正数据很少, 而且需要XML解析器进行解析, 后来 `JS` 和服务器之间的数据传输使用 `JSON` 这种更简洁的格式.

HTML 结构, CSS 展示, JS(AJAX JSON) 逻辑 = 前端. 可以在浏览器实现 `MVC`.

 后来出现了多种框架, ExtJS/prototype/JQuery/AngularJS将前端推向另一个高峰. 



## JS 移动到服务器端

需要满足下述两个要求:

1. 引擎移动到服务器端, 需要执行地足够快. Chrome V8

2. 绕开 JAVA 服务器的问题, 即线程遇到IO/数据库/网络这样的耗时操作, 不能等待, 换成异步处理.

即后来出现的 node.js, 巨大优势就是: 前后端均使用JS开发.

### Node.js 工作特点

**只用一个线程来处理所有请求, 事件驱动编程.**

需要等待的操作, 会有一个回调函数在那, 线程不会等待. 操作一完成则发出事件通知线程, 线程立马回来执行对应的回调函数, 执行完回调函数再去接着执行那些不需要等待的操作.

即: 需要等待的操作先跳过, 先去执行那些不需要等待的操作, 耗时操作完成后事件通知线程后, 线程再立即回来执行其对应的回调函数. 事件驱动编程, 有需要处理的事件才去处理, 耗时操作先跳过.

<!--more-->

# 数据类型



## 值类型

### * 布尔值 Boolean

true/false



### * 字符串 String

#### 创建

```javascript
let s1 = 'hello'; // 字面量创建
let thing = 98; // 任何可以转换成字符串的值
/* String 函数 生成或者将值转换为字符串 */
let s2 = String(thing); // 将thing转换为原始字符串
let s3 = new String(thing); // 新建String对象, 并存储thing的字符串表示
console.log(s1, typeof s1); // hello string
console.log(s2, typeof s2); // 98 string
console.log(s3, typeof s3); // [String: '98'] object
```

字符串一旦创建, 其内容不可被修改, 只能重新被赋值.

```javascript
let str = "hello";
str[1] = '*';
console.log(str, str[1]); // hello e
str = "world";
console.log(str); // world
```



#### 属性

`length`

字符串长度

```javascript
let s = 'hello';
console.log(s.length); // 5
```

`constructor`

对创建该对象的函数的引用

```javascript
let s = 'hello';
console.log(s.constructor); // [Function: String]
```



#### 方法

##### 处理

`toUpperCase`  

字符串变大写

`toLowerCase `  

字符串变小写

```javascript
let s = 'hello', t = 'JINLING';
console.log(s.toUpperCase(), s); // HELLO hello
console.log(t.toLowerCase(), t); // jinling JINLING
```

`trim`

去除字符串两边的空白. 原字符串未改变.

```javascript
let str = "   hello   *   ";
console.log(str.trim(), ', |' + str + '|'); // hello   * , |   hello   *   |
```

`split` 

根据分隔符将字符串分割为数组

```javascript
let s = 'hel,l,o';
// 不切割 整个字符串视作数组的一个元素
console.log(s.split());  // [ 'hel,l,o' ]
// 每个字符都是数组中的元素
console.log(s.split(''));
/* 
[
 'h', 'e', 'l',
 ',', 'l', ',',
 'o'
]
*/
// 以逗号分割
console.log(s.split(','), s); // [ 'hel', 'l', 'o' ] hel,l,o
```

##### 查找

`indexOf`

查找字符串中有无指定字符串, 有则返回下标, 没有则返回-1

```javascript
let s = "hello jinling!"
let res1  = s.indexOf("hi");
let res2  = s.indexOf("jin");
console.log(res1, res2); // -1 6
```

`includes`

查找字符串是否包含指定子串, 有则返回`true`, 反之`false`.

```javascript
let str = "hello jinling good";
console.log(str.includes("hello"), str.includes("world")); // true false
```

`charAt`

返回字符串中对应下标的字符

```javascript
let s = "hello*jinling!"
let ch = s.charAt(5);
console.log(ch); // *
```

##### 拼接/截取

`concat`

拼接两个或者更多字符串, 返回新字符串, 不改变原字符串.

```javascript
let s1 = "hello", s2 = "*go", s3 = "*hhh";
let s = s1.concat(s2, s3);
console.log(s, s1, s2, s3) // hello*go*hhh hello *go *hhh
```

`slice`

截取字符串的片段, 不改变原字符串.

```javascript
let str = "helloWorld";
let s = str.slice(3, 7); // [起始位置, 结束位置)
console.log(s, str); // loWo helloWorld
```

`substring`

截取字符串的片段, 不改变原字符串.

```javascript
let s = 'helloWorld';
 // [起始位置, 结束位置)
console.log(s.substring(1, 8), s); // elloWor helloWorld
```

`substr`

截取指定长度的子串. (ps. ECMAscript 没有对该方法进行标准化，因此反对使用它。)

```javascript
let s = 'helloWorld';
// 起始位置 截取长度
console.log(s.substr(1, 4), s); // ello helloWorld
```



### * 数字 Number

数字可以是数字或者对象, Number 对象是原始数值的包装对象. JS只有一种数字类型.

#### 创建

```javascript
/* 基础类型创建 */
let k = 5;
console.log(typeof k); // number
// 科学计数法
let t = 123e5, k = 123e-5;
console.log(typeof t, t, typeof k, k); // number 12300000 number 0.00123
// 八进制以0开头
let n = 0122; // 数字以 0 开头, 且后面的数字都比8小, 则js解释为八进制
console.log(n); // 82
let n = 0888; // 后面数字>=8, 则依然解释为十进制
console.log(n); // 888
// 十六进制以0x开头
let n = 0x11;
console.log(n); // 17

/* 对象形式创建 */
let m = new Number("99"), n = new Number(10);
console.log(typeof m, m, typeof n, n); 
// object [Number: 99] object [Number: 10]

let t = new Number("kill"); // 不能转换为数字时
console.log(typeof t, t); // object [Number: NaN]
```

#### 属性

返回对创建此对象的 Number 函数的引用.

```javascript
let a = 8;
console.log(a.constructor); // [Function: Number]
```



#### 方法

`toString`

将数字转变为字符串, 使用指定的基数.

```javascript
let t = new Number("99");
let str = t.toString();
console.log(typeof str, str); // string 99

// 使用指定的基数
let t = new Number("10");
let str = t.toString(2); // 十进制转变为二进制
console.log(typeof str, str); // 1010

let t = new Number("10");
let str = t.toString(8); // 十进制转变为八进制
console.log(typeof str, str); string 12
```

`valueOf`

返回一个 Number 对象的基本数字值.

```javascript
let t = new Number("99");
console.log(t.valueOf()); // 99
```

`isFinite`

判断参数是否为无穷大

```javascript
Number.isFinite(123) // true
Number.isFinite(-1.23) // true
Number.isFinite(5-2) // true
Number.isFinite(0) // true
Number.isFinite('123') // false
Number.isFinite('Hello') // false
Number.isFinite('2005/12/12') // false
Number.isFinite(Infinity) // false
Number.isFinite(-Infinity) // false
Number.isFinite(0 / 0) // false
Number.isFinite(NaN) // false
```

`isNaN`

使用全局函数判断`NaN`(教程推荐).

```javascript
let a = NaN;
console.log(isNaN(a), isNaN(8), isNaN("11")); // true false false
```



### * Symbol (ES6)

基本数据类型, ES6新增, 表示独一无二的值. 由于 ES5 对象的属性名只能是字符串, 容易造成属性名的冲突, 需要独一无二的值.

具有静态属性与静态方法. 模拟对象私有属性.

#### 概述

通过`Symbol`函数产生.

```javascript
// 接受字符串作为参数, 表示对Synbol实例的描述, 主要为了在控制台显示或者转为字符串时容易被区分.
Symbol(**description?: string | number**): symbol

Description of the new Symbol object.

Returns a new unique Symbol value.
```

每个从 Symbol 返回的symbol值都是唯一的, 尽管参数相同.

```javascript
let sym = Symbol();
let sym1 = Symbol(34); 
// Symbol 不会将'hello'转变为symbol类型, 每次创建一个新的symbol类型.
let sym2 = Symbol('hello'); 
let sym3 = Symbol('hello'); 

console.log(typeof sym, sym); // symbol Symbol()
console.log(sym1 == 34); // false
console.log(sym2 == 'hello', sym2, sym2.toString()); // false Symbol(hello) 'Symbol(hello)'
console.log(sym2 === sym3); // false
```

`Symbol`可以转换为**字符串**以及**布尔值**, 但是不能转换为数值.

```javascript
let s1 = Symbol('happy');
console.log(s1.toString(), String(s1)); // Symbol(happy) Symbol(happy)

let s1 = Symbol('happy');
console.log(Boolean(s1)); // true

let s1 = Symbol('happy');
console.log(Number(s1)); // TypeError: Cannot convert a Symbol value to a number
```

对原始数据类型创建一个显式包装器对象从ES6开始不再被支持, 但是原有的 new Boolean/new String/new Number 由于遗留原因仍然可以被创建.

如果真的想创建一个Symbol包装器, 可以使用Object()函数.

```javascript
// symbol 是原始数据类型 不是对象
let s = new Symbol(); // TypeError: Symbol is not a constructor

let sym = Symbol(34); 
console.log(typeof sym); // symbol
let symObj = Object(sym);
console.log(typeof symObj); // object
```

#### 作为属性名

```javascript
let mySymbol = Symbol();

// 第一种写法
let obj = {};
obj[mySymbol] = 'hello';

// 第二种写法
let obj = {
  [mySymbol]: 'hello'
}

// 第三种写法
let obj = {};
// 将对象的属性名指定为一个 Symbol 值
Object.defineProperty(obj, mySymbol, { value: 'hello' });

// 三种写法 同样结果
obj[mySymbol] // 'hello'
```

`Symbol` 作为对象属性时, 不能使用点运算符, 只能使用方框`[]`.

```javascript
let mySymbol = Symbol();

let obj = {};
obj[mySymbol] = 'hello';
obj.mySymbol = 'hi'; // 相当于属性名为 'mySymbol' 字符串
console.log(obj.mySymbol); // hi
console.log(obj[mySymbol]); // hello

// 作为对象属性, 只能使用方框
let obj = {
  [s]: function (arg) { ... }
}

// 增强的对象写法
let obj = {
  [s] (arg) { ... }
}
```



### * null

`null` : 表示主动释放指向对象的引用.

```javascript
let a = [1,2]
a = null;
console.log(a); // 释放指向数组的引用
```

设计之初, `null` 像在java里一样, 被当成一个**对象**.

```javascript
console.log(typeof null); // object
```

可以自动转为 0 

```javascript
console.log(Number(null), 8 + null); // 0 8
```

**用法: null 表示"没有对象", 即 该处不应该有值.**

1. 作为函数的参数, 表示该函数的参数不是对象
2. 作为对象原型链的终点

```javascript
console.log(Object.getPrototypeOf(Object.prototype)); // null
```



### * undefined

Brendan Eich 觉得, 表示'无'的值, 最好不是对象. 其次, 由于js初版本没有错误处理机制, null 自动转为 0 不容易发现错误. 于是 Brendan Eich又设计了一个`undefined`.

一开始 `undefined` 被设计为表示'无'的原始值, 转为数字时为 NaN

```javascript
console.log(Number(undefined), 8 + undefined); // NaN NaN
```

**用法: undefined 表示"缺少值", 就是此处应该有一个值, 但是还没有定义.**

1. 变量被声明过, 但是没有赋值, 等于 undefined
2. 调用函数时, 应该提供的参数没有提供, 则该参数为 undefined
3. 对象没有赋值的属性, 该属性值为 undefined
4. 函数没有返回值时, 默认返回 undefined.

```javascript
// 用法 1
var a;
let b;
console.log(a,b); // undefined undefined

// 用法 2
let test = (a) => {
  console.log(a);
}
test(); // undefined

// 用法 3
let obj = {}
console.log(obj.a); // undefined

// 用法 4
let test = () => { }
console.log(test()); // undefined
```



#### undefined 与 null 区别

两者使用 == 时为true, === 时为false.

```javascript
console.log(undefined == null, undefined === null);
// true false

// 在if语句中, 两者都被转成 false
if (!undefined) console.log('undefined if false'); // undefined if false
if (!null) console.log('null if false'); // null if false
```



## 引用类型



### * 数组 Array

#### 创建

```javascript
let arr0 = []; // 字面
let arr1 = new Array(); // 不固定长度
let arr2 = new Array(5); // 固定长度
let arr3 = new Array(1,2,3,5);

console.log(arr0, arr1, arr2, arr3); // [] [] [ <5 empty items> ] [ 1, 2, 3, 5 ]
```

##### 使用 Array.from 创建

语法:

```javascript
Array.from(arrayLike[, mapFunc[, thisArg]])
```

从 `String` 生成数组

```javascript
Array.from('foo'); // [ 'f', 'o', 'o' ]
```

从 `Set` 生成数组

```javascript
const set = new Set([3, 4, 5, 5, 6, 7]);
Array.from(set); // [ 3, 4, 5, 6, 7 ]
```

从 `Map` 生成数组

```javascript
const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map); // [ [ 1, 2 ], [ 2, 4 ], [ 4, 8 ] ]
```

在 `Array.from` 中使用箭头函数

```javascript
Array.from([1, 2, 3], x => x *= 4); // [ 4, 8, 12 ]

// 初始 value 为 undefined
console.log(Array.from({ length: 6 }, (value, index) => index));
// [ 0, 1, 2, 3, 4, 5 ]
```

序列生成器(指定范围)

```javascript
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
let res = range(1, 10, 3);
console.log(res); // [ 1, 4, 7, 10 ]
```



#### 属性

`length`

> 计算并返回数组长度

```javascript
let arr0 = [1,2,3,4]; // 字面
console.log(arr0.length); // 4
```

`constructor`

> 返回创建该对象的函数的引用, 因为js的一切变量都是对象, 是对象就有其构造函数.
>

```javascript
var test=new Array();
if (test.constructor==Array){
	document.write(test.constructor);
}
// output: function Array() { [native code] }
```

#### 方法

##### 改变原数组

**Array.sort()**

> 对数组元素进行排序, 默认是字符串顺序, 即会将数组元素转变为字符串, 然后比较字符串中字符的 UTF-1编码顺序来进行排序.
>

```javascript
// 按照字母顺序排序 默认
let arr = ['hi', 'Bob', 'good', 'are', 'you', 'google'];
arr.sort();
console.log(arr); // [ 'Bob', 'are', 'good', 'google', 'hi', 'you' ]
```

> 添加比值函数, 使得能对**数字进行排序**.
>

```javascript
// 不使用比值函数
let arr = [3, 7, 9, 1, 0, 12, 34, 76, 91];
arr.sort();
console.log(arr); 
/* 
[
  0,  1, 12,  3, 34,
  7, 76,  9, 91
]
*/

// 使用比值函数 倒序
let arr = [3, 7, 9, 1, 0, 12, 34, 76, 91];
arr.sort((a, b) => b - a);
console.log(arr);
/*
[
  91, 76, 34, 12, 9,
   7,  3,  1,  0
]
*/

// 使用比值函数 正序
let arr = [3, 7, 9, 1, 0, 12, 34, 76, 91];
arr.sort((a, b) => a - b);
console.log(arr); 
/*
[
   0,  1,  3,  7, 9,
  12, 34, 76, 91
]
*/
```

**Array.pop()**

> 删除数组的最后一个元素并返回该元素. 空数组返回`undefined`.
>

```javascript
let arr0 = [1, 2, 3, 4];
console.log(arr0.pop(), arr0);
// output: 4 [ 1, 2, 3 ]

let arr1 = [];
console.log(arr1.pop(), arr1);
// output: undefined []
```

**Array.shift()**

> 删除并返回数组的第一个元素
>

```javascript
let arr1 = [1,2,3];
console.log(arr1.shift(), arr1);
// 1 [ 2, 3 ]
```

**Array.unshift()**

> 向数组的开头添加元素并返回现有长度
>

```javascript
let arr1 = [1, 2, 3, 4, 5];
console.log(arr1.unshift(9), arr1);
// 6 [ 9, 1, 2, 3, 4, 5 ]
```

**Array.push()**

> 向数组末尾添加元素并返回数组现有长度
>

```javascript
let arr1 = [1,2,3];
console.log(arr1.push(4), arr1);
// output: 4 [ 1, 2, 3, 4 ]
```

**Array.reverse()**

> 颠倒数组中元素顺序
>

```javascript
let arr1 = [1,2,3];
console.log(arr1.reverse(), arr1);
// output: [ 3, 2, 1 ] [ 3, 2, 1 ]
```

**Array.splice()** 

> 推荐使用该方法删除数组元素
>
> 注意: 删除的元素以数组形式返回.
>

```javascript
let arr = [1, 2, 3, 4, 5]
arr.splice(2, 1, 'ok', 'fine'); // 从数组下标为2的位置开始删除1个元素,再插入2个元素
console.log(arr); // [ 1, 2, 'ok', 'fine', 4, 5 ]

// 不留空洞地删除元素
let arr = [1, 2, 'ok', 'fine', 'you', 'bye']
// 从下标为3的位置开始, 删除2个元素
console.log(arr.splice(3, 2)); // ['fine', 'you'] 注意这里是数组形式!
console.log(arr); // [ 1, 2, 'ok', 'bye' ]
```

**delete**  

JS运算符

```javascript
let arr = [1, 2, 'ok', 'fine', 'you', 'bye']
delete arr[0];
console.log(arr[0], arr); // 留下了空洞
// undefined [ <1 empty item>, 2, 'ok', 'fine', 'you', 'bye' ]
```



##### 不改变原数组

**Array.keys()**

> 返回一个含有数组下标的 Array Iterator 对象

```javascript
let a = ['a', 'b', 'c'];
for(let i of a.keys()){
  console.log(i);
}
// 0
// 1
// 2

// 包含那些没有对应元素的索引
let b = ['a', , 'b', 'c']
console.log([...b.keys()]); // [ 0, 1, 2, 3 ]
```

由此启发可以构造一个比如包含 1-10 的数组.

```javascript
let a = [...Array(10).keys()].map(val => val = val + 1);
console.log(a);
/*[
  1, 2, 3, 4,  5,
  6, 7, 8, 9, 10
]*/
```

**Array.slice()**

> 根据下标获取数组的一部分, 返回新数组.
>

```javascript
let arr1 = [1, 2, 3, 4, 5];
console.log(arr1.slice(3), arr1.slice(2,4), arr1);
// output: [ 4, 5 ] [ 3, 4 ] [ 1, 2, 3, 4, 5 ]
```

**Array.concat()**

> 拼接数组成一个新数组
>

```javascript
let arr0 = [1, 2, 3, 4];
let arr1 = [5, 6];
console.log(arr0.concat(arr1), arr0, arr1);
// output: [ 1, 2, 3, 4, 5, 6 ] [ 1, 2, 3, 4 ] [ 5, 6 ]
```

**Array.flat()**

> 按照指定的深度递归遍历数组, 将所有元素与遍历到的子数组中的元素合并为一个**新数组**返回.
>
> 将数组扁平化 

```javascript
/* 默认递归深度为1 */
let arr = [1, 2, ['ok', 'fine']]
let arr1 = arr.flat();
console.log(arr1, arr);
// [ 1, 2, 'ok', 'fine' ] [ 1, 2, [ 'ok', 'fine' ] ]

// 移除数组空项
let arr = [1, 2, null, undefined, , , 5];
console.log(arr.flat());
// [ 1, 2, null, undefined, 5 ]

/* 指定递归深度 */
let arr = [1, 2, [[['ok', 'fine']]]];
console.log(arr.flat(2), arr.flat(3));
// [ 1, 2, [ 'ok', 'fine' ] ] [ 1, 2, 'ok', 'fine' ]

// 递归深度为 Infinity 时, 将数组扁平化为一维
let arr = [[[[1, 2], [3, 4]], [[4, 5, 6]]], 8, 9];
console.log(arr.flat(Infinity));
/*[
  1, 2, 3, 4, 4,
  5, 6, 8, 9
]*/
```

**Array.join()**  默认使用 `,` 为分隔符

> `toString` 所有 JavaScript 对象都拥有`toString()`方法
>
> 数组所有元素组成字符串, 可以指定分隔符.
>

```javascript
let arr0 = [1, 2, 3, 4];
console.log(arr0.join(), arr0.toString()); // 1,2,3,4  1,2,3,4
console.log(arr0.join('*')); // 1*2*3*4
console.log(arr0); // [ 1, 2, 3, 4 ]
```

**Array.map()**

> 对数组的每个元素均执行函数, 对其做一些处理, 来生成新数组. **不改变原数组**.

```javascript
let arr = [1, 2, 'ok', 'fine', 'you', 'bye']
let arr2 = arr.map((val, index, array) => {
  return val + '*' + index;
});
// 原数组不变
console.log(arr2, arr);
// [ '1*0', '2*1', 'ok*2', 'fine*3', 'you*4', 'bye*5' ] [ 1, 2, 'ok', 'fine', 'you', 'bye' ]

var arr = [1, 2, 3, 4, 5]
let a = arr.map(c => c - 1);
console.log(a); // [ 0, 1, 2, 3, 4 ]
```

**Array.filter()**

> 对数组的每个元素均执行函数, 筛选符合条件的元素来生成新数组.**不改变原数组**.

```javascript
let arr = [1, 2, 'ok', 'fine', 'you', 'bye']
let arr2 = arr.filter((val, index, array) => {
  return typeof val == 'string';
});
console.log(arr2, arr);
// [ 'ok', 'fine', 'you', 'bye' ] [ 1, 2, 'ok', 'fine', 'you', 'bye' ]
```

**Array.forEach()**

> 对数组的每个元素均执行一次函数(回调函数)

```javascript
let arr = [1, 2, 'ok', 'fine', 'you', 'bye']
let s = '';
// 该函数的参数1为数组元素,参数2为数组元素下标,参数3为该数组本身
arr.forEach((val, index, array) => {
  s += (val + '/' + index + ' ');
});
console.log(s); // 1/0 2/1 ok/2 fine/3 you/4 bye/5 
```

**Array.reduce()**

> 参数`total` 默认是数组的第一个元素, 可以设置初始值.

```javascript
let arr = ['bye', 'hi', 'ok', 'fine', 'you', 'bye']
let res = arr.reduce((total, val, index, array) => {
  console.log("total=", total, val, index); // 从index=1开始打印
  return total + '*' + val;
});
console.log(res, arr);
/*
total= bye hi 1
total= bye*hi ok 2
total= bye*hi*ok fine 3
total= bye*hi*ok*fine you 4
total= bye*hi*ok*fine*you bye 5
bye*hi*ok*fine*you*bye [ 'bye', 'hi', 'ok', 'fine', 'you', 'bye' ]
*/

// 设置total初始值
let arr = ['bye', 'hi', 'ok', 'fine', 'you', 'bye']
let res = arr.reduce((total, val, index, array) => {
  return total + '*' + val;
}, "this is :");
console.log(res, arr);
// this is :*bye*hi*ok*fine*you*bye [ 'bye', 'hi', 'ok', 'fine', 'you', 'bye' ]
```

**Array.reduceRight()**

> 类似于`Array.reduce()`, 只不过是从右往左遍历元素.

```javascript
let arr = ['bye1', 'hi', 'ok', 'fine', 'you', 'bye2']
let res = arr.reduceRight((total, val, index, array) => {
  return total + '*' + val;
}, "this is res:");
console.log(res, arr);
// this is res:*bye2*you*fine*ok*hi*bye1 [ 'bye1', 'hi', 'ok', 'fine', 'you', 'bye2' ]
```

**Array.every()**

> 检查数组中的元素是否**都符合条件**, 都符合才返回true, 否则返回false.

```javascript
// 有元素不符合条件 false
let arr = [1, 'hi', 'ok', 'fine']
let res = arr.every((val, index, array) => {
  return typeof val == 'string';
});
console.log(res, arr);
// false [ 1, 'hi', 'ok', 'fine' ]

// 所有元素均符合条件 true
let arr = [1, 2, 3];
let res = arr.every((val, index, array) => {
  return typeof val == 'number';
});
console.log(res, arr);
// true [ 1, 2, 3 ]
```

**Array.some()**

> 检查是否**有元素符合条件**, 有则返回true, 没有则返回false.

```javascript
// 有元素符合条件 true
let arr = [1, 'hi', 'ok', 'fine']
let res = arr.some((val, index, array) => {
  return typeof val == 'string';
});
console.log(res, arr);
// true [ 1, 'hi', 'ok', 'fine' ]

// 所有元素均不符合条件 false
let arr = [1, 2, 3];
let res = arr.some((val, index, array) => {
  return typeof val == 'string';
});
console.log(res, arr);
// false [ 1, 2, 3 ]
```

**Array.indexOf()**

> 找到给定元素在数组中第一次出现的位置, 没有则返回-1, 找到则返回元素下标.

```javascript
// 找不到 -1, 找到就下标
let arr = ['hi', 'Bob', 'how', 'are', 'you'];
let res1 = arr.indexOf(3);
let res2 = arr.indexOf('how');
console.log(res1, res2); // -1 2

// 元素多次出现 返回第一次出现的位置
let arr = ['hi', 'Bob', 'how', 'are', 'you', 'Bob'];
let res2 = arr.indexOf('Bob');
console.log(res2); // 1

// 指定搜索位置
let arr = ['hi', 'Bob', 'how', 'are', 'you', 'Bob'];
let res2 = arr.indexOf('Bob', 2);
console.log(res2); // 5

// 搜索起始位置可以是负值
// 负值是从数组末尾给定位置开始搜索, 直至末尾.
let arr = ['hi', 'Bob', 'how', 'are', 'you', 'Bob', 'google'];
let res1 = arr.indexOf('Bob', -1), // 从倒数第一个位置开始, 搜索不到
    res2 = arr.indexOf('Bob', -2); // 从倒数第二个位置开始搜索, 是可以检索到的, 返回正数下标
console.log(res1, res2); // -1 5
```

**Array.lastIndexOf()**

> 与上一个类似, 只是从数组末尾开始检索.

```javascript
// 出现两次Bob, 但是返回了从右往左的第一个.
let arr = ['hi', 'Bob', 'how', 'are', 'you', 'Bob', 'google'];
let res1 = arr.lastIndexOf('Bob');
console.log(res1); // 5

// 设定搜索起始位置
let arr = ['hi', 'Bob', 'how', 'are', 'you', 'Bob', 'google'];
let res1 = arr.lastIndexOf('Bob', -3); // 从倒数第三个元素开始往左搜索, 返回匹配的第一个元素的下标
console.log(res1); // 1
```

**Array.find()**

> 返回符合条件的第一个元素

```javascript
let arr = ['hi', 'Bob', 'good', 'are', 'you', 'Bob', 'google'];
let res1 = arr.find((val, index, array) => {
  return val.length > 3;
});
console.log(res1); // good
```

**Array.findIndex()**

> 返回符合条件的第一个元素**下标**

```javascript
let arr = ['hi', 'Bob', 'good', 'are', 'you', 'Bob', 'google'];
let res1 = arr.findIndex((val, index, array) => {
  return val.length > 3
});
console.log(res1); // 2
```



#### 数组操作

##### 去重

利用键本身的不可重复性

> 利用ES6 Set 去重 (ES6中最常用)

```javascript
let arr = [1, 2, 2, 3, 3, 3];
let res = Array.from(new Set(arr));
console.log(res); // [ 1, 2, 3 ]

// 简易写法
[...new Set(arr)]
```

双层循环法 

> splice去重(ES5 常用)

```javascript
function unique (arr) {
  // 每一个元素都向后检查有没有与自己相同的元素
  // 如果有 则删除第二个元素
  // 由于splice的特性 删除后 需要j-- 保证j指向被删除元素的下一个元素而不会遗漏元素
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) { // 注意使用===, 因为 null === undefined 为true
        arr.splice(j, 1);
        j--;
      }
    }
  }
}

let arr1 = [1, 2, 2, 3, 3, 3];
unique(arr1);
console.log('arr1:', arr1); // arr1: [ 1, 2, 3 ]
```

> 使用 fliter+indexOf

```javascript
function unique (arr) {
  return arr.filter((val, index) => {
    // 返回符合条件的元素
    // 返回所有第一次出现的元素
    return arr.indexOf(val, 0) == index;
  })
}

let arr1 = [1, 2, 2, 3, 3, 3, null, undefined];
let res = unique(arr1);
console.log('res:', res);
// res: [ 1, 2, 3, null, undefined ]
```

#### 伪数组

对象冒充数组, 有数组的形态其实就是有 length 的概念, 但是并不能真正使用数组的方法.

### * Map (ES6)

解决js对象的键只能是字符串的问题, **ES6标准新增**的数据类型.

#### 创建/添加/删除/是否包含

```javascript
// 二维数组
let map = new Map([['Michael', 90], ['Bob', 80], ['Lily', 95]]);
console.log(map.get('Lily')); // 95
console.log(map); // Map { 'Michael' => 90, 'Bob' => 80, 'Lily' => 95 }
const map = new Map([[1, 2], [2, 4], [4, 8]]);
console.log(map);// Map(3) { 1 => 2, 2 => 4, 4 => 8 }

// 初始化一个空map, 然后添加元素
let map = new Map();
map.set('Michael', 90); // 添加Key
map.set('Bob', 80);
map.set('Lily', 95);
console.log(map); // Map { 'Michael' => 90, 'Bob' => 80, 'Lily' => 95 }
map.delete('Lily'); // 删除 key
console.log(map); // Map { 'Michael' => 90, 'Bob' => 80 }
// 判断是否包含某key
console.log(map.has('hello'), map.has('Bob')); // false true
// 获取值
// 一个key只对应一个value, 重复设置会覆盖之前的值
map.set('Bob', 100);
console.log(map.get('Bob')); // 100
```



### * Set (ES6)

一组不重复key的集合.ES6标准新增的数据类型.

#### 创建/添加/删除/是否包含

```javascript
// 数组作为输入
let set1 = let set1 = new Set([5, 6, 7, 8, 8, 7]);
console.log(set1); // Set { 5, 6, 7, 8 } 重复元素被自动过滤

// 初始化空Set, 再添加值
let set = new Set();
set.add(1); // 添加元素
set.add(2);
set.add(3);
set.add(4);
console.log(set); //Set { 1, 2, 3, 4 }
set.delete(3); // 删除元素
console.log(set); // Set { 1, 2, 4 }
set.add(4); // 可以添加重复元素 但是无效
console.log(set); // Set { 1, 2, 4 }
// '4' 与 4 不同
console.log(set.has('4'), set.has(4)); // false true
```



### * 函数

函数定义是一个常规的绑定,  其中绑定的值是函数. 

函数的第一种表示法.

```javascript
// 大括号必要, 末尾建议带分号
let square = function (x) {
  return x * x;
};
```

函数也是值的一种, 可以被赋值给多个变量/作为参数传递给函数等.

```javascript
let func1 = () => {
  console.log('1111');
}
func1(); // 1111

// func1 可以被绑定为其他函数
func1 = () => {
  console.log('2222');
}
func1 // 2222
```

没有 `return` 语句或 `return` 后面没有返回值, 函数将返回 `undefined`.

```javascript
let func1 = () => {
  return;
}
console.log(func1()); // undefined

let func2 = () => {
}
console.log(func2()); // undefined
```

每个局部作用域可以查看包含它的局部作用域, 所有局部作用域都能看见全局作用域.

#### 声明表示法

函数的第二种表示法.

声明在调用之后也能够工作, 声明在概念上被移到了作用域的顶部.

```javascript
function square (x) {
  return x * x;
} // 不需要分号
```

#### 箭头函数

函数的第三种表示法. 以较简明的方式编写小型函数表达式.

```javascript
// 两种写法相同
let square1 = (x) => {
  return x * x;
};

let square2 = x => x * x;
```

##### 没有 this

访问 this, 会从外部获取

```javascript
let person = {
  name: 'Mary',
  hobby: ['swim', 'sing', 'dance'],
  speak () {
    // 使用箭头函数
    this.hobby.forEach(value => {
      console.log(this.name + value);
    });
  },
  speak1 () {
    // 使用普通函数
    this.hobby.forEach(function (value) {
      console.log(this.name, value);
      // undefined swim
      // undefined sing
      // undefined dance
      // console.log(this)
      // 实操的话, 打印的是全局 this 而不是 undefined, 有点奇怪
    });
  }
}
```



##### 没有 arguments

```javascript
function defer (f, ms) {
  return function () {
    setTimeout(() => {
      console.log(this); // 全局 this
      f.apply(this, arguments);
    }, ms)
  };
}

function sayHello (name) {
  console.log('hello, ' + name);
}

let sayDefer = defer(sayHello, 2000);
sayDefer("Mary");
```

使用普通函数

```javascript
function defer (f, ms) {
  return function (...args) {
    let curr = this;
    // 将外层的this与args传递给setTimeout内部的函数
    setTimeout(function () {
      f.apply(curr, args);
    }, ms)
  };
}
```

但是这样也能正常输出, ????

```javascript
function defer (f, ms) {
  return function (...args) {
    setTimeout(function () {
      f.apply(this, args);
    }, ms)
  };
}
```



##### 不能使用 new

因为没有 this, 就不能作为构造函数, 即不能使用 new.

##### 没有 super

需要知道箭头函数是如何获取 this 值的?

#### 调用栈

函数返回时必须跳回到调用它的位置, 所以计算机必须记住调用发生的上下文. 存储此上下文的位置是调用栈, 每次调用函数时, 当前上下文都存储在此栈的顶部.

#### 可选参数

多余参数自动忽略, 不足参数为 `undefined`.

```javascript
let square1 = (x, y) => {
  console.log(x, y);
  return x * y;
};

console.log(square1(2, 7, 'helloo'[2, 3]), square1(2));
// 2 7
// 2 undefined
// 14 NaN
```

参数设定默认值

```javascript
let square1 = (x, y = 3) => {
  console.log(x, y);
  return x * y;
};

console.log(square1(2, 7), square1(2));
// 2 7
// 2 3
// 14 6
```

#### 作用域链

定义了一个函数激活执行的时候, 去哪里找变量的值.

```javascript
function createFunc () {
  var desc = ' is eating';
  function eat (animal) {
    console.log(animal.name + desc);
  }
  return eat;
}
let dog = { name: 'dog' }
var eat = createFunc();
// 全局变量
var desc = '吃东西';
eat(dog); // dog is eating
```

`eat` 函数的作用域链如下:

```javascript
eat函数作用域[parent作用域-A]

A = createFunc作用域[desc: ' is eating', eat: <func 定义>, parent作用域-B]

B = Global作用域[desc: '吃东西', createFunc: <func 定义>, parent作用域-null]
```

eat 函数中没有定义 `desc` 这个变量值, 就沿着作用域链去找, 在 `createFunc` 作用域中找到了 `desc` 变量的值, 于是就使用了.如果还没有找到, 就接着往上找.

当执行 `createFunc` 的时候, `eat` 函数被创建, 此时 eat 函数会把外部函数的作用域链记录下来, 留到执行时使用. 

注意: 作用域链是**函数创建时刻**发生关联的, 不是运行时刻. Called **静态作用域/词法作用域**. 函数被创建即函数被定义.

```javascript
var x = 1;
// 此处 foo 函数被创建, 与全局作用域相关联
function foo () {
  console.log(x);
}

function bar (func) {
  var x = 2;
  func();
}

// foo 函数执行时直接去全局作用域找 x 变量
bar(foo); // 1
```

静态作用域是实现闭包的必需条件.



#### 执行上下文

函数在调用时在执行栈中产生的变量对象, 该对象不能直接访问, 但是可以访问其中的变量/this 对象等.

作用域是在函数声明时就确定的变量访问的规则, 执行上下文是函数执行时才产生的变量的环境, 执行上下文基于作用域进行变量的访问/函数引用等操作.

```javascript
let fn, bar; // 1、进入全局上下文环境
bar = function(x) {
  let b = 5;
  fn(x + b); // 3、进入fn函数上下文环境
};
fn = function(y) {
  let c = 5;
  console.log(y + c); //4、fn出栈，bar出栈
};
bar(10); // 2、进入bar函数上下文环境
```

![img](JavaScript-Notes/执行上下文.png)

**函数调用栈**: 栈底永远是全局上下文, 栈顶是当前正在执行的上下文(活动对象), 白色是被挂起的变量对象(执行上下文)



#### 闭包

闭包在 JS 中就是一个以函数和以静态方式存储的父作用域的一个集合体.

能够**读取函数局部变量的函数**就是闭包. 下面例子中, `func2`函数就是闭包.

```javascript
var func1 = () => {
  let a = 999;
  var func2 = () => {
    return a;
  }
  return func2;
}
let func = func1();
console.log(func()); // 999
```

用途: 读取函数内部变量 / 让这些变量的值始终保持在内存中.

```javascript
let nAdd;
var func1 = () => {
  let a = 999;
  nAdd = function(){
    a++;
  }
  var func2 = () => {
    console.log('a:',a);
  }
  return func2;
}
let func = func1(); // 闭包函数
func(); // a 999
nAdd();
func(); // a 1000
```

证明了`func1`的局部变量`a`一直在内存中, 并没有在func1被调用后被自动清除. 

因为`func1`是`func2`的父函数, 而`func2`被赋予了局部变量`func`, 导致`func2`一直在内存中, 则`func2`依赖的`func1`也一直在内存中, 不会在调用结束后, 被垃圾回收机制回收.

这里`nAdd`也是一个匿名函数, 也是一个闭包, 相当于一个setter, 可以在函数外部对函数内部局部变量进行操作.

使用闭包的注意点:

1. 闭包会使函数中的局部变量在内存中, 因此会使得内存占用过多, 不能滥用. 在退出函数前, 将不使用的局部变量全部删除.
2. 闭包会在函数外部, 改变父函数内部变量的值, 注意不要随便改变.

思考题:

1. `this` 在函数中而不是方法中使用时, 指向全局对象

```javascript
var name = "The Window";

var object = {
  name: "My Object",

  getNameFunc: function () {
    return function () {
      console.log(this);
      return this.name;
    };
  }
};

// 这里直接在 vscode 中执行, 所以打出来是 undefined, 可能原本是 The Window
console.log(object.getNameFunc()()); // undefined

// this 打印出来如下
/* 
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  }
}
*/
```

2. 这里 `that` 指向整个 object.

```javascript
var name = "The Window";

var object = {
  name: "My Object",
  getNameFunc: function () {
    var that = this;
    return function () {
      return that.name;
    };
  }
};

console.log(object.getNameFunc()()); // My Object
```



#### arguments

对应于传递给函数的参数的类数组对象, 是所有非箭头函数中可用的局部变量, 可以使用它来引用函数的参数.

1. arguments 参数可以被设置
2. 不是一个 Array, 只是类似, 类型是 object
3. 只有  length 和索引元素功能
4. 可以被转换为真正的数组

```javascript
function unique (a, b, c, d, e) {
  console.log(arguments[1]); // 2
  // 参数被设置
  arguments[1] = 3;
  arguments[4][0] = 'Mary';
  console.log(arguments[1], arguments[4]); // 3 [ 'Mary', 'hi', 'go' ]

  // arguments转换为数组
  let args0 = Array.prototype.slice.call(arguments);
  let args1 = [].slice.call(arguments);
  // 对参数使用slice会阻止某些JavaScript引擎中的优化 (比如 V8 - 更多信息)
  // 注重性能 使用被忽视的Array构造函数作为一个函数
  let args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
  console.log('ES6', args0, args1, '遍历对象构造数组', args);
  // ES6 [ 1, 3, 3, 4, [ 'Mary', 'hi', 'go' ] ] [ 1, 3, 3, 4, [ 'Mary', 'hi', 'go' ] ] 遍历对象构造数组 [ 1, 3, 3, 4, [ 'Mary', 'hi', 'go' ] ]
  
  // ES6
  let args3 = Array.from(arguments);
  let args4 = [...arguments];
  console.log('ES5', args3, args4);
  // ES6 [ 1, 3, 3, 4, [ 'Mary', 'hi', 'go' ] ] [ 1, 3, 3, 4, [ 'Mary', 'hi', 'go' ] ]
  
  console.log(typeof arguments); // object
}

unique(1, 2, 3, 4, ['hello', 'hi', 'go']);
```

#### eval 函数

计算某个**原始字符串**(不是String对象), 并执行其中的JS代码, 并返回结果(如果不存在, 则返回undefined). 是全局对象的一个函数属性.

```javascript
let x = 8;
let res = eval('x+2');
console.log(res, eval('4+8')); // 10 12
eval('let a = 10, b = 9; console.log(a*b)'); // 90
console.log(eval()); // undefined
// 不是字符串的话, 原封不动返回
console.log(eval(67)); // 67
console.log(eval(new String(777))); // [String: '777']
```



## 操作符 typeof

### 判断变量数据类型

```javascript
console.log(
  // 通用数据类型
	typeof 'jinling' + '\n' +  // string
	typeof 23 + '\n' + // number
	typeof true + '\n' +  // boolean
	typeof [1,2,3] + '\n' + // object
	typeof {k1:'v1', k2:'v2'} + '\n' // object
  // 特殊字符类型
  typeof null + '\n' + // object
	typeof undefined + '\n' + // undefined
	typeof NaN + '\n' // number
)

// undefined与null值相同,但类型不同
console.log(undefined===null, undefined==null); // false true

// 判断数组可以用 Array.isArray
console.log(Array.isArray([1,2,3])) // true
console.log(Array.isArray({k1:'v1', k2:'v2'})) // false
```



## let const var

const 常量, 变量名与内存地址之间建立了不可变的绑定关系.

```javascript
let obj = { 0: 1 };
const a = obj; // a 存储的是引用地址 不会改变
obj = { 2: 3 }
console.log(a); // { '0': 1 }
```



# 内置对象 Function

## Function.prototype.call()/apply()/bind()

这里使用node与浏览器的运行结果不同(原因待深究), 下面为在浏览器中的运行结果.

```javascript
var name = "Mary", age = 18;
var obj = {
  name: 'XiaoMing',
  objAge: this.age, // this 指上一层, 这里即是 全局对象
  speak: function () {
    // this 是上一层,这里即是 obj 对象
    console.log(this.name + ' is ' + this.objAge + '*' + this.age);
  }
}

console.log(obj.objAge); // 18
obj.speak(); // XiaoMing is 18*undefined
```

this 指上一层, 这里指向 window.

```javascript
var name = 'Bob';
function speak(){
  console.log(this.name);
}
speak(); // Bob
```

**用法: call apply bind 都是用来改变 this.**

在调用 obj.speak 函数时,函数中含有 this, call/apply/bind 都是用来指定函数中的 this 指谁的, 这里传参是 newObj, 则指的是 newObj 这个对象.

```javascript
var name = "Mary", age = 18;
var obj = {
  name: 'XiaoMing',
  objAge: this.age,
  speak: function () {
    console.log(this.name + ' is ' + this.age);
  }
}
var newObj  = {
  name:'Cookie',
  age: 40
}
obj.speak.call(newObj); // Cookie is 40
obj.speak.apply(newObj); // Cookie is 40
obj.speak.bind(newObj)(); // Cookie is 40
```

**三个函数在传参时候的区别**

call: 参数间以逗号分割

apply: 参数全部放入一个数组中

bind: 除了返回是函数, 传参与 call 一致

```javascript
var name = "Mary", age = 18;
var obj = {
  name: 'XiaoMing',
  objAge: this.age,
  speak: function (from, to) {
    console.log(this.name + ' is ' + this.age, from + '*' + to);
  }
}
var newObj = {
  name: 'Cookie',
  age: 40
}
obj.speak.call(newObj, '合肥', '上海'); // Cookie is 40 合肥*上海
obj.speak.apply(newObj, ['合肥', '上海']); // Cookie is 40 合肥*上海
obj.speak.bind(newObj, '合肥', '上海')(); // Cookie is 40 合肥*上海
obj.speak.bind(newObj, ['合肥', '上海'])(); // Cookie is 40 合肥,上海*undefined
```



# 对象 Object

使用 `{}` 表示, 键必须是字符串或者 Symbol 类型. 不是字符串的话会转换成字符串, 对象的话默认调用 toString 方法.

下面的例子中, 对象转换为字符串后, 键值都是 [object Object] , 因此这里值可以被更改.

```javascript
var a = {}, b = { key: '123' }, c = { key: '456' };
a[b] = 'b'; // a = { '[object Object]': 'b' }
a[c] = 'c'; // a = { '[object Object]': 'c' }
console.log(a[b]); // c
```

`a.b.c.d` 比`a['b']['c']['d']`性能更高.

因为前者只用考虑字符串的情况, 后者还需要考虑括号中是变量的情况. 从结果来看, 编译器解析前者更容易些, 因此前者更快.

## ES6

对象的简洁写法, 属性名是变量名, 属性值是变量的值.

```javascript
function hello (x, y) {
  return { x, y }
}

console.log(hello('yes', 'no'));
//  { x: 'yes', y: 'no' }


let birth = '1997/09', name = 'Joe'

let data = {
  birth,
  name
}

console.log(data);
// { birth: '1997/09', name: 'Joe' }
```



## 封装

面向对象编程的核心思想是将程序划分为更小的部分, 并使每个部分负责管理自己的状态.

接口与实现分离, 常称为**封装**. 常见在属性开头加上 `_` 表示是私有属性.

## 创建对象

创建一个对象, 定义属性和方法, 不需要 `Class`.

对象中的方法就是保存函数的属性.

```javascript
let animal = {
  name: 'dog',
  eat () {
    console.log(`${this.name} eat meat`);
  }
}
animal.eat(); // dog eat meat
animal.color = 'red';
console.log(animal.color); // red
```

显式修改 方法的调用对象. 使用函数的 `call` 方法, 该方法将 `this` 值作为第一个参数, 其他参数为普通参数. 则此时 `obj` 是 `eat` 方法的调用者, 通过 `call` 进行了显式的调用对象的修改.

```javascript
let animal = {
  name: 'dog',
  eat (thing) {
    console.log(`${this.name} eat ${thing}`);
  }
}

let obj = { name: 'monkey' };
// obj 成为 eat 方法的调用者
animal.eat.call(obj, 'carrot'); // monkey eat carrot
```

## 原型

对象有自己的默认属性集. `Object.getPrototypeOf` 方法返回一个对象的原型.

`Object.prototype` 提供在所有对象中显示的方法, 是最根部的原型.

函数派生自 `Function.prototype`, 数组派生自 `Array.prototype`, 他们具有不同的默认属性集.

```javascript
let obj = {}
console.log(obj.toString); // [Function: toString]
console.log(obj.toString()); // [object Object]

let obj = {}
console.log(obj.__proto__); // {}

// 空对象的原型是 Object.prototype
console.log(Object.getPrototypeOf({}) == Object.prototype); // true

// Object.prototype 原型为 null
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

### Object.create

使用 `Object.create` 创建具有特定原型的对象.

```javascript
let protoDog = {
  speak(word){
    console.log(this.name + ' is speaking ' + word);
  }
}

let dog = Object.create(protoDog);
dog.name = 'doggi'; // dog 对象此时仅包含自身属性 name
// speak 方法来自原型
dog.speak('hello'); // doggi is speaking hello
```



### __proto\_\_ 属性

继承是让两个对象产生关联, 使用 __proto\_\_, 这个属性每个对象都有. 

```javascript
let animal = {
  name: 'animal',
  eat () {
    console.log(`${this.name} eat meat`);
  }
}

// 属性覆盖 方法不覆盖
// 对象 dog 的原型是 animal
let dog = {
  name: 'dog',
  __proto__: animal // 指向animal对象
}

// 对象 cat 的原型是 animal
let cat = {
  name: 'cat',
  __proto__: animal // 指向animal对象
}
dog.eat(); // dog eat meat
cat.eat(); // cat eat meat

// 单纯关联 不做属性或者方法覆盖
let dog = {
  __proto__: animal
}
let cat = {
  __proto__: animal
}
console.log(dog.name, cat.name); // animal animal
dog.eat(); // animal eat meat
cat.eat(); // animal eat meat

// 方法覆盖 属性不覆盖
let dog = {
  __proto__: animal,
  eat () {
    console.log('dog is eating');
  }
}
let cat = {
  __proto__: animal,
  eat () {
    console.log('cat is eating');
  }
}
console.log(dog.name, cat.name); // animal animal
dog.eat(); // dog is eating
cat.eat(); // cat is eating
```

如下所示, 对象 `dog` 和 `cat` 的原型均是 `animal`, 但是均没有定义 `eat` 方法. 在执行 `eat` 方法时, 会到其原型中去寻找, 如果找到则执行, 没有则继续去原型的原型中去寻找, 直至找到或者为`null`. 不断寻找原型的过程依赖于__proto\_\_建立的原型链.

可以看出, 尽管执行的是原型中的方法, 但是方法中的`this`仍然指的是调用该方法的上级对象, 由于是`dog`和`cat`这两个对象进行调用的, 所以 this 指向的就是这两个对象而不是 animal.

### 构造函数

但是 JS 也可以通过 `new` 关键字来创建对象, 是给不理解原型链又需要创建对象的程序员使用的.

```javascript
// 模仿 java 中的 Class 而提供的构造函数
// Student 的首字母大写
function Student (name) {
  this.name = name;
  this.sayHello = function () {
    console.log('hello ' + this.name);
  }
}

let lily = new Student("lily");
let mary = new Student("mary");

lily.sayHello(); // hello lily
mary.sayHello(); // hello mary
```

这样有个问题就是, 每个对象都会有一个 `sayHello` 函数, 太重复, 而 java 中函数是定义在 `class` 中的.

### prototype

JS  使用更加高效的方式, 创建一个原型对象 A, 将方法都放在这个原型对象 A 中, 而通过同一个构造函数创建的对象的原型, 都是这个原型对象 A, 这样对象找不到方法时, 就会去其原型即 A 中寻找.

达到这样的效果,  则需要将构造函数与原型对象 A 关联起来, 将 A 赋值给构造函数的 `prototype` 属性, 则 A 就会成为这个构造函数创建的对象的原型.

```javascript
function Student (name) {
  this.name = name;
}

// 原型对象
Student.prototype = {
  sayHello () {
    console.log('hello ' + this.name);
  }
}

let lily = new Student("lily");
let mary = new Student("mary");

lily.sayHello(); // hello lily
mary.sayHello(); // hello mary
```

### 语法糖 Class

上述语法有点复杂, JS 推出语法糖, 将构造函数与原型对象的函数写在一个 `class` 中.

上述写法等同于下面这种.

```javascript
class Student {
  constructor(name) {
    this.name = name;
  }
  // 构造函数的 prototype
  // 原型对象
  // 作为对象的方法, this 指向的是 调用该方法的对象
  sayHello = () => {
    console.log('hello ' + this.name);
  }
}

let mary = new Student('mary');
// mary 对象调用其原型(__proto__)的方法 sayHello
// 此时方法中的 this 指向 mary 对象
mary.sayHello(); // hello mary
```



## 类 Class

一种语法糖, 特殊的函数, 由**类表达式**和**类声明**组成. 类定义了一种对象的形状, 具有哪些属性与方法. 而这种对象称之为类的实例.

JS 类就是带有 prototype 属性的构造函数. 类中的方法, 都是构造函数原型对象中的方法. 类中的`constructor`方法是实际的构造函数, 并被绑定名称 `Animal`.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  // 目前只支持将函数添加进构造函数原型中 
  // 不支持其他类型
  speak () {
    console.log(this.name + ' is speaking!');
  }
}
```



### 定义类

1. 类声明 带有`class`关键字

   ```javascript
   // 类需要先声明 再使用 不像函数声明会提升
   class hello {
     constructor(height, width) {
       this.height = height;
       this.width = width;
     }
   }
   ```

2. 类表达式 可以具名或者匿名

   ```javascript
   // 匿名类
   let hello = class {
     constructor(height, width) {
       this.height = height;
       this.width = width;
     }
   }
   console.log(hello.name); // hello
   
   // 具名类
   let hello = class hello2{
     constructor(height, width) {
       this.height = height;
       this.width = width;
     }
   }
   console.log(hello.name); // hello2
   ```

3. 传统的基于函数的类

   ```javascript
   function Animal(name){
     this.name = name;
   }
   
   Animal.prototype.speak = function () {
     console.log(this.name + ' makes a noise.');
   }
   
   class Dog extends Animal{
     speak(){
       super.speak();
       console.log(this.name + ' barks.');
     }
   }
   
   let d = new Dog('cookie')
   d.speak(); 
   // cookie makes a noise.
   // cookie barks.
   ```



### 类体和方法定义

`constructor` 

构造函数, 一种特殊方法, 创建和初始化一个由 `class` 创建的对象. 

构造函数可以使用`super`调用父类的构造函数.

### 覆盖派生属性

向对象中添加属性, 属性被添加到对象本身, 原型中的此属性将不再影响该对象.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak () {
    console.log(this.name + ' is speaking!');
  }
}

// 给构造函数的原型对象添加属性
Animal.prototype.age = 5;

let dog = new Animal('dog');
dog.age = 10; // 覆盖原型属性
console.log(dog.age); // 10

let cat = new Animal('cat');
console.log(cat.age); // 5

console.log(Object.getPrototypeOf(dog).age); // 5
```

数组原型提供的 `toString` 方法与基本原型对象提供的有所差别, 这样对原型属性的覆盖有利于更通用的对象类中表达异常属性.

```javascript
console.log(Array.prototype.toString == Object.prototype.toString); // false
console.log([1, 2, 3].toString()); // 1,2,3

// Object.prototype.toString 并不知道数组的信息, 只是将 object 与调用对象的类型名称放在[]中
console.log(Object.prototype.toString.call([1, 2]), Object.prototype.toString.call(4)); 
// [object Array] [object Number]
```

### 多态

对原型方法的覆盖, 以实现实例的特殊化需求. `String` 实际调用的仍然是 `toString` 方法.

```javascript
let dog = new Animal('dog');
console.log(String(dog)); // [object Object]
Animal.prototype.toString = function () {
  return 'This is ' + this.name;
}
console.log(String(dog)); // This is dog
```

任何支持 `toString` 方法的对象都可以使用它.

**多态**: 多态代码可以支持不同类型的值, 只要这些值支持它指定的接口. 比如 toString 方法, 所有值都支持该接口, 则所有值都能使用该方法.



### 映射

普通对象派生自 `Object.prototype` , 含有祖先原型的所有属性, 在一些实际场景下, 这些属性可能显得多余. 

→ 可以创建没有原型的对象.

```javascript
// 传递 null 生成的对象不会从 Object.prototype 派生
console.log('toString' in Object.create(null)); // false
console.log('toString' in {}); // true
```

而且普通对象要求键值必须为字符串.

→ 使用 Map 类, 存储映射并可以使用任何类型的 key.

```javascript
let ages = new Map();
ages.set('Bob', 23);
ages.set('Mary', 17);
console.log(ages.get('Bob')); // 23
console.log(ages.has('Mary'), ages.has('toString')); // true false
```

set get has 是 Map 对象接口的一部分.



某种情况下,  如果确实需要使用普通对象来作为映射, 则 `Object.keys` 只返回一个**对象自己的键,** 而不包括其原型中的那些属性. 

```javascript
class Animal{
  constructor(name){
    this.name = name;
    this.age = 18;
  }
  speak(){
    console.log(this.name + 'is speaking');
  }
}

let dog = new Animal('dog');
console.log(Object.keys(dog)); // [ 'name', 'age' ]

// 给原型添加属性
dog.__proto__.type = 'animal';
// Object.keys(dog) 仍然只显示自己的属性, 不包括原型中的属性
console.log(Object.keys(dog), Object.keys(dog.__proto__)); // [ 'name', 'age' ] [ 'type' ]
```

`hasOwnProperty` 方法也只判断某键**是不是该对象自己的**, 没找到也不会去搜索其原型对象. 与关键字 `in` 不同.

```javascript
console.log(dog.hasOwnProperty('name'), dog.hasOwnProperty('speak')); // true false
console.log('name' in dog, 'speak' in dog); // true true
```



### 继承

继承允许我们构造与已有数据类型相似的数据类型.

#### extends 创建子类

子类的构造函数必须先使用 `super` 调用超类的构造函数, 因为子类需要具有超类的属性. 子类对象是其所有超类的实例.

`extends` 关键字表示该类不是基于 `Object` 原型, 而是基于其他类. 

基础类称为**超类**, 派生类是**子类**.

```javascript
class Dog1 extends Animal {
  constructor(name, sex) {
    // 调用超类构造函数并传入name参数
    // 必须先super 然后才能使用this
    super(name);
    this.sex = sex;
  }
  speak () {
    super.speak(); // 调用超类的该方法
    console.log(`${this.name} is ${this.sex} and barks`);
  }
}

let d = new Dog1('cookie', 'girl');
d.speak(); // cookie is girl and barks
```

#### instanceof 运算符

判断一个对象是否来自某一个类.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  // 目前只支持将函数添加进构造函数原型中 
  // 不支持其他类型
  speak () {
    console.log(this.name + ' is speaking!');
  }
}

let dog = new Animal('dog');
console.log(dog instanceof Animal, dog instanceof Object); // true true

// TO DO 
console.log(dog instanceof Object.prototype); // TypeError: Right-hand side of 'instanceof' is not callable
```



## 静态方法

> 部署在object对象自身的方法

`Object.values` 获取对象的所有 value, 输出类型为数组

`Object.keys` 获取对象的所有 key, 输出类型为数组

```javascript
let obj = {key1:'val1', key2:'val2', key3:'val3'}
console.log(Object.keys(obj)); // [ 'key1', 'key2', 'key3' ]
console.log(Object.values(obj)); // [ 'val1', 'val2', 'val3' ]
```

`Object.getOwnPropertyNames` 也是返回对象的所有属性名, 但是还会返回不可枚举的属性; 可枚举属性方面, 与`Object.keys`相同

```javascript
// 不可枚举属性 二者不同
let obj1 = ['hello', 'world', 'jinling']
console.log(Object.keys(obj1)); // [ '0', '1', '2' ]
console.log(Object.getOwnPropertyNames(obj1)); // [ '0', '1', '2', 'length' ] 包含不可枚举属性

// 可枚举属性 二者相同
let obj = {key1:'val1', key2:'val2', key3:'val3'}
console.log(Object.keys(obj)); // [ 'key1', 'key2', 'key3' ]
console.log(Object.getOwnPropertyNames(obj)); // [ 'key1', 'key2', 'key3' ]
```



## 实例方法

`Object.hasOwnProperty `判断对象是否拥有某项属性

```javascript
let obj = {key1:'val1', key2:'val2', key3:'val3'}
console.log(obj.hasOwnProperty('key2')); // true
```



## JSON

需求: 将内存中的数据保存在文件中或者通过网络发送到另一台服务器, 则必须以某种方式将内存中存储数据的地址转换成可以存储的格式.

这种转换称为**序列化数据**, `JSON` (JavaScript Object Notation) 就是一种流行的序列化格式(`JSON` 编码的字符串), Web 上的数据存储与通信方式.

- 属性使用双引号括起来
- 没有注释
- 只有简单的数据表达式
- JSON.parse 序列化格式->数据
- JSON.stringify 数据->序列化格式



# 函数式编程

摩尔定律失效, 多核时代来临, 函数式编程能够很好地为并发编程服务, 具有 没有 side effect/ 不共享变量/安全调度到任何一个CPU core 上运行/没有加锁问题...等诸多优点.

## 纯函数

1. 对于相同的输入, 永远有相同的输出. 没有可观察的副作用, 不依赖外部条件.
2. 不能修改传递给函数的参数
3. 不能修改全局变量

比如数组操作中, 对于给定的数组, slice就是纯的, splice就是不纯的.

纯函数可以有效降低系统复杂性, 还有很多其他的优秀特性, 例如可缓存性.

```javascript
import _ from 'lodash';
var sin = _.memorize(x => Math.sin(x));

//第一次计算的时候会稍慢一点
var a = sin(1);

//第二次有了缓存，速度极快
var b = sin(1);
```

## 使用递归而非迭代

使用尾递归, 保证不溢出.

```javascript
// 迭代不被允许
let arr = [1,2,3,4];
let result = 0; // result 不能改变
for(let i of arr){
  result += i; // i 不能改变
}
console.log(result); // 10

// 递归
var first = arr => arr[0]
var rest = arr => arr.slice(1)
var sum = (arr, res) => {
  if (arr.length == 0) return res;
  else return sum(rest(arr), res + first(arr));
}
let arr = [1, 2, 3, 4];
console.log(sum(arr, 0)); // 10
```

## 高阶函数

很多函数大体相同, 重复代码很多, 只有一些细节不一样, 于是产生高阶函数.

高阶函数: 让函数来产生函数, 共用的部分抽取出来, 不共用的部分与共用的部分能组合起来.

比如 JS 中的 `map/filter/forEach/...` 函数都是高阶函数, 能快速操作集合数据.

### 函数的柯里化

curry: 传递给函数一部分的参数来调用它, 让他返回一个函数去处理剩下的参数.

就是传递一部分的参数, 形成固定模式的函数(部分参数数值已经固定), 得到已经记住参数的新函数. 这样对应固定的输入, 就得到固定的输出.

```javascript
var check = x => (y => y > x);
let check7 = check(7);
console.log(check7(10)); // true
```

### 函数组合

包菜式代码  `h(g(f(x)))` => 更优雅 函数组合

```javascript
// 传的是g函数需要的参数
// 将任何两个纯函数结合在一起, 组合函数式的代码
var compose = (f, g) => (x => f(g(x)));

var add1 = x => x + 1;
var mul5 = x => x * 5;

let res = compose(add1, mul5);
console.log(res(2)); // 11


var first = arr => arr[0];
var reverse = arr => arr.reverse();

var last = compose(first, reverse);
console.log(last([1, 2, 3, 4, 5])); // 5
```

## 惰性求值

待补充

## 宏(macro)

待补充

## Point Free

减少对不必要的中间变量的命名

## 声明式与命令式代码

**命令式**: 写出一条一条指令让计算机执行, 一般会涉及到很多繁琐的细节. **既说做什么, 也说怎么做**.

**声明式**: 写表达式表明自己想做的事情, 而不是一步一步的指示. 隐藏细节.  **只说做什么, 不说怎么做**.

```javascript
//命令式
var CEOs = [];
for(var i = 0; i < companies.length; i++){
    CEOs.push(companies[i].CEO)
}

//声明式
var CEOs = companies.map(c => c.CEO);
```

函数式编程一个优点就是声明式代码以及纯函数. 工作时专注于业务代码, 优化时专注于函数内部. 还有其他的特点, 比如高阶函数/函数没有side effect/只有值没有变量/用递归而不是用迭代等.



# 遍历器与 for...of

## 遍历器概念

是用来处理可遍历数据结构的统一接口, 只要部署 `iterator` 接口, 就可以进行遍历操作.

作用: 提供统一的访问接口/数据结构的成员按照某种顺序排列/为ES6新增的`for...of`服务

数据结构有遍历器接口, 就称为该数据结构是可遍历的/可迭代的.

## JS 默认遍历器接口 

JS中默认的遍历器接口, 即数据结构的原型对象有 `Symbol.iterator` 属性, 该属性对应的函数返回一个遍历器对象, 调用对象的`next`方法, 即可返回数据结构的下一个数据..

```javascript
let arr = [3, 4, 5];
let it = arr[Symbol.iterator]();
console.log(it.next(), it.next(), it.next(), it.next());
// { value: 3, done: false } { value: 4, done: false } { value: 5, done: false } { value: undefined, done: true }
// done 表示是否遍历结束
```

原生具备 Iterator 接口的数据结构如下。

- Array

- Map

- Set

- String

- TypedArray

- 函数的 arguments 对象

- NodeList 对象

上述数据结构不用自己写遍历器函数, `for...of`循环会自动进行遍历.

```javascript
let arr = [3, 4, 5];
for(let i of arr) console.log(i);
// 3
// 4
// 5
```

没有遍历器函数的数据结构, 可以根据实际需求进行手动部署, 即在`Symbol.iterator`属性上手写遍历器对象生成函数.



# 解构赋值

针对数组或者对象进行模式匹配, 然后对其中的变量进行赋值. 解构目标 = 解构源.

## 数组的解构

```javascript
// 基本
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// 嵌套
let [a, [[b], c]] = [1, [[2], 3]];
console.log(a, b, c); // 1 2 3

// 可忽略
let [a, , c] = [1, 2, 3];
console.log(a, c); // 1 3

// 剩余运算符
let [a, ...b] = [1, 2, 3];
console.log(a, b); // 1 [2, 3]
```

数组解构中, 若解构目标为可遍历对象(实现iterator接口的数据), 都可以进行解构赋值.

```javascript
// 字符串
let [a, b, c, ...d] = 'hello';
console.log(a, b, c, d); // h e l [ 'l', 'o' ]
```

### 解构默认值

解构匹配到`undefined`, 触发默认值作为返回结果.

```javascript
// 均匹配到 undefined
let [a = 2] = [undefined]; console.log(a); // 2
let [a = 3, b = a] = []; console.log(a, b); // 3 3
// b 匹配到 undefined, 触发默认值 b=a=1
let [a = 3, b = a] = [1]; console.log(a, b); // 1 1
// 正常解构赋值
let [a = 3, b = a] = [1, 9]; console.log(a, b); // 1 9
```



## 对象的解构



```javascript
// 报错
let { a, b } = { hello: 'aaa', apple: 'bbb' };
console.log(a, b); // undefined undefined
// 报错
let { a: b } = { hello: 'aaa', apple: 'bbb' };
console.log(a, b); // ReferenceError: a is not defined
// 报错
let { a } = { hello: 'aaa', apple: 'bbb' };
console.log(a); // undefined

/* 正确使用 解构目标必须与key一致 */

let { hello, apple } = { hello: 'aaa', apple: 'bbb' };
console.log(hello, apple); // aaa bbb

let { hello: b } = { hello: 'aaa', apple: 'bbb' };
console.log(b); // aaa

let { hello } = { hello: 'aaa', apple: 'bbb' };
console.log(hello); // aaa

/* 剩余运算符 */

let { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };
console.log(a, b, rest); // 10 20 { c: 30, d: 40 }

/* 解构默认值 */

let { hello = 3, apple = 5 } = { hello: 'aaa', apple: 'bbb' };
console.log(hello, apple); // aaa bbb

// apple 匹配到 undefined
let { hello = 3, apple = 5 } = { hello: 'aaa'};
console.log(hello, apple); // aaa 5

let { hello: aa = 3, apple: bb = 5 } = {};
console.log(aa, bb); // 3 5

let { hello: aa = 3, apple: bb = 5 } = { apple: 'aaa' };
console.log(aa, bb); // 3 aaa
```





#  关键字 this

js中`this`随着执行环境的变化而变化, 是函数运行时, 在函数体内部自动生成的一个对象, 只能在函数体内部使用. 即, **this 是函数运行时所在的环境对象**. 注意: 箭头函数不绑定自己的 `this` .

## 单独使用

无论有无严格模式, `this`始终指向全局对象. 浏览器中, 全局对象为`[object Window]`

```javascript
// 'use strict'
console.log(this); // {}
```

## 纯粹的函数调用

函数中, 默认`this`指向全局对象

```javascript
var name = "ok";
function test() {
  console.log(this.name);
}
test(); // ok


let fun = ()=>{
	return this;
}
console.log(fun()); // {}
```

严格模式下不允许默认绑定, 所以函数中的`this`为`undefined`

```javascript
// 严格模式
"use strict"
function myFunction() {
  return this;
}
console.log(myFunction()); // undefined
```

## 函数作为对象方法

指向上级对象

```javascript
let obj = {
	size : 14,
	color: 'red',
	getColor: function () {
		return '颜色是' + this.color
	}
}
// 该实例中, this指向getColor方法所在的对象
console.log(obj.getColor) // [Function: getColor]
console.log(obj.getColor()) // 颜色是red (加括号表示调用方法)

// 方法中的this单独打印, 会打印出所属对象的内容
var person = {
  firstName  : "John",
  lastName   : "Doe",
  id         : 5566,
  myFunction : function() {
    return this;
  }
};
console.log(person.myFunction()); 

/*
{
  firstName: 'John',
  lastName: 'Doe',
  id: 5566,
  myFunction: [Function: myFunction]
}
*/
```

### 类方法中的 `this` 指向

`speak` 方法中的 `this` 从打印结果来看, 指的是**构造函数生成的新对象**, 并未打印`speak`方法.

但是 `this.speak` 却能够调用, 说明`this`不仅指向的是构造函数对应的对象, 而且在行为上也与构造函数的对象一致, 就是对象中找不到方法, 就去对象的原型中去找.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak () {
    console.log(this.speak, this);
  }
}

let dog = new Animal();
// 此时 speak 中的this指的是它的调用对象, 也就是 dog
// speak 在打印 this.speak 时, 相当于打印 dog.speak, 但是 dog 本身是没有 speak 函数的
// 只能去 dog 原型对象里去找, 最后找到了 speak 函数, 其实打印的是 dog 原型的 speak 函数
dog.speak();
// [Function: speak] Animal { name: undefined }


// eat 中的 this 与 speak 中的 this 一样
// 均是指构造函数对应的对象
Animal.prototype.eat = function () {
  console.log(this);
}

// 下面 eat 在执行时, 均是指向调用 eat 方法的类的实例
// 即 panda 和 cat
let panda = new Animal('panda');
panda.eat(); // Animal { name: 'panda' }
let cat = new Animal('cat');
cat.eat(); // Animal { name: 'cat' }
```



## 函数作为构造函数

构造函数就是, 通过这个函数, 能够生成一个新对象. 此时, `this` 指向这个新对象.

```javascript
function test() {
  this.x = 'hello';
}

var obj = new test();
console.log(obj.x); // hello


var x = "ok";
function test() {
  this.x = 'hello';
}

var obj = new test();
console.log(x); // ok 此时全局变量x的值没有变化, 说明 this 不是全局对象
```

## apply 调用

`apply()`是函数的一个方法, 作用是改变函数的调用对象. 第一个参数表示改变后的调用这个函数的对象, 此时 `this` 指向这个参数.

```javascript
var x = "ok";

function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 'hi';
obj.method= test;

// 参数为空时, 默认 obj.method 这个方法的调用者修改为 全局对象.
obj.method.apply(); // o.apply(); // ok

// 修改 obj.method 这个方法的调用者为 obj, 则此时 obj.method 作为对象方法被调用
// this 指向 obj
obj.method.apply(obj); // hi
```



# 异步编程

ES5 callback

## ES5 Promise

### 含义

`Promise` 对象包含一个异步操作, 并且保存这个异步操作的状态以及操作执行完成之后的结果.

操作执行的状态不受影响, 操作结束后状态不会改变. 后面我们默认 `resolved` 指 `fulfilled`, 不包括 `rejected`.

| 三种状态       | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| pending        | 执行中                                                       |
| fulfilled      | 已成功                                                       |
| rejected       | 已失败                                                       |
| 备注: resolved | 表示已定型(`pending->fulfilled` 或者 `pending->rejected`), 常指 `fulfilled`. |



### 用法

`Promise`是一个构造函数, 用来生成`Promise`对象实例.

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

可见 `Promise` 构造函数只需要传一个参数, 就是一个函数, 而这个函数是有两个参数 `resolve`/`reject`, 这两个参数均是函数, 由 JS 引擎提供, 不用自己部署.

#### resolve/reject

`resolve` 函数: 在异步操作成功时调用, 将异步操作的状态变为成功(pending->resolved), 并且将异步操作的返回结果作为参数传递出去.

`reject` 函数: 在异步操作失败时调用, 将异步操作的状态变为失败(pending->rejected), 并且将异步操作报的错, 作为参数传递出去.

`Promise`实例生成以后, 可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数.

```javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

可见`then`方法有两个参数, 均是函数, 第一个回调函数在`Promise`对象状态变为`resolved`时调用, 第二个回调函数在`Promise`对象状态变为`rejected`时调用. 第二个函数是可选的, 这两个函数都接受`Promise`传出的值作为参数.

其中在处理失败情况时, `then`的第二个回调函数与`catch`方法只能选择一个, 如果同时写上, 则只会执行前者.

示例:

```javascript
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('yes');
  }, 1000)
});

p.then((value) => {
  console.log(value);
})
```

如上所示, 首先建立一个`Promise`对象, 将`setTimeout`这个异步操作放在里面, `Promise`提供了这个异步操作成功或者失败的解决方法. 异步操作执行成功了, 就调用`resolve`函数抛出结果, 失败就调用`reject`函数抛出结果, 总之就是会抛出异步操作的运行结果. 

在异步操作结束以后, 会触发对象p对执行对象的处理, 即会触发调用对象p的`then`方法. 处理成功情况, 传参是正常的值或者是`Promise`实例, 实现`then`第一个参数即成功回调函数, 处理失败情况, 传参是`Error`, 实现`then`第二个参数即失败回调函数.



#### then方法执行顺序

`Promise` 对象新建后, 是立即执行的, 首先输出 `hi`. 

`then`方法对应的回调函数会在当前脚本所有同步任务执行完才会执行, 所以`yes`最后输出.

```javascript
let p = new Promise((resolve, reject) => {
  console.log('hi');
  resolve('yes');
});

p.then((value) => {
  console.log(value);
})

console.log('here');
console.log('happy');
console.log(p);

// hi
// here
// happy
// Promise { 'yes' }
// yes
```

#### resolve/reject 不阻止 Promise 执行

执行完`resolve`或者`reject`之后, `Promise`的参数函数仍然会继续执行, 所以最好在 `resolve` 或者 `reject` 前面加上 `return`,  防止不必要的代码执行.

```javascript
let p = new Promise((resolve, reject) => {
  console.log('hi');
  let res = resolve('yes');
  console.log('res', res);
});
// hi
// res undefined 注意: 抛出的 resolve 值是 undefined

// 修改后
new Promise((resolve, reject) => {
  console.log('hi');
  return resolve('yes');
});
```

#### 抛出值是 Promise 实例

```javascript
const p1 = new Promise((resolve, rject)=>{
  // ...
})

const p2 = new Promise((resolve, rject)=>{
  resolve(p1);
})
```

当`resolve`的值是另一个`Promise`实例时, `p2`的状态取决于`p1`的状态, 而且 `p2` 调用`then`方法, 实际上是`p1`在调用`then`方法.

```javascript
const p1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    console.log('p1 执行完毕');
  }, 3000);
  // resolve 没有等待上面的异步操作执行完毕才执行, 而是直接执行
  resolve('p1'); // 没有这句话, 后面的then不会执行, 因为then的成功回调函数是基于resolve的
})

const p2 = new Promise((resolve, reject)=>{
  // 等待p1抛出状态
  // 返回的是另一个Promise, 导致p2自己的状态无效了
  resolve(p1);
  // 直接执行
  console.log('p2 执行结束');
})

p2.then((value)=>{
  console.log('hhh', value); // p1 在调用 then 方法
})

/*
p2 执行结束
hhh p1
(间隔三秒)
p1 执行完毕
*/
```



### 方法

#### Promise.prototype.then()

`then`方法调用后仍然返回一个`promise`对象(不是原来的), 但是由于`then`中不能调用`resolve`方法, 不能抛出值, 因此`then`方法返回的 `Promise` 实例执行结束后,  是没有状态值的.

```javascript
let p = new Promise((resolve, reject) => {
  return resolve('yes');
});

let newp = p.then((value) => {
  console.log(value); // yes
})

// 由于回调函数最后执行, 此时 then 方法返回的 Promise 还没有执行结束, 因此
console.log(newp); // Promise { <pending> }
console.log(p); // Promise { 'yes' }

newp.then((value)=>{
  console.log('***');
  console.log(newp); // Promise { undefined }
  console.log(value); // undefined
})

/* 打印顺序
Promise { <pending> }
Promise { 'yes' }
yes
***
Promise { undefined }
undefined
*/
```

但是`then`方法中, 使用 `return` 进行值的返回, 可以达到和 `resolve` 一样的效果.

```javascript
let p = new Promise((resolve, reject) => {
  return resolve('yes');
});

let newp = p.then((value) => {
  console.log(value); // yes
  return '这是 newp'
})

newp.then((value)=>{
  console.log(newp); // Promise { '这是 newp' }
  console.log(value); // 这是 newp
})

/*
yes
Promise { '这是 newp' }
这是 newp
*/
```

但是在一开始初始化变量时, 是不能使用`return`的, 需要使用 `resolve`/`reject`.

```javascript
let p = new Promise((resolve, reject) => {
  resolve('yes') // 会打印
  return 'yes' // 不会打印
});

p.then((value) => {
  console.log(value);
})
```

这样就可以采用链式写法,  按照一定次序执行一组回调函数.



#### Promise.prototype.catch()

是`.then(null, rejection)`的别名, 用于指定发生错误时的回调函数, 返回值是一个`Promise`对象, 后面还能再使用 `then` 方法.

```javascript
// 失败情况
let p = new Promise((resolve, reject) => {
  reject('no')
});

// 注释的两部分相等

// p.then(value => console.log(value))
//   .then(null, err => console.log(err)) // no

// p.then(val => console.log(val))
//   .catch(err => console.log(err)) // no

p.then(val => console.log(val), err => console.log(err)) // no

// 两者相同 都是抛出错误的意思
reject(new Error('err'))
throw new Error('err')
```

`catch` 不仅会捕捉`p`发生的错误, 也会捕捉`p.then`中的回调函数发生的错误.

`Promise` 对象的错误具有"冒泡"性质, 直至被捕获为止. **因此建议使用`catch`方法, 而不是`then`的第二个参数.**

```javascript
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

如果不使用`catch`方法处理错误, 则 `Promise` 内部的错误不会影响程序的执行.

```javascript
let p = new Promise((resolve, reject) => {
  resolve(a + 2); // a 未定义
});

console.log('hhh');

/*
hhh
(node:12281) UnhandledPromiseRejectionWarning: ReferenceError: a is not defined
*/
```



#### Promise.prototype.finally()

`finally`方法用于指定不管`Promise`对象最后状态如何, 都会执行的操作. ES2018. finally的回调函数不接受入参.

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

在执行完`then`或者`catch`方法后, 都会执行`finally`方法.



## ES6 Generator 函数

这个函数生成一个遍历器对象, 代表函数内部的指针, 调用对象的`next`方法可以对函数内部的状态值进行遍历.

调用 `next` 方法, 会返回一个有 `value` 和 `done` 两个属性的对象, 其中 `value` 表示此时指向的状态, 状态值是 `yield` 表达式后面那个表达式的值, `done` 表示有没有遍历结束.

`yield` 表达式表示遍历暂停的点.

```javascript
function* g () {
  yield 10;
  yield 9;
  return "over";
}

let obj = g();

log(obj.next(), obj.next(), obj.next(), obj.next());

// { value: 10, done: false } { value: 9, done: false } { value: 'over', done: true } { value: undefined, done: true }
```

`Generator` 函数返回的遍历器对象, 只有调用 `next` 方法才会遍历下一个状态. 若函数没有 `return` 语句, 则执行直至函数结束, 返回值为 `undefined`. 

注意: `yield` 后面的表达式, 只有调用 `next` 方法, 内部指针指到该语句时, 才会执行.

```javascript
function* g () {
  yield 10 + 9; // 只有当next方法将指针指向这一句时, 才会求值.
}
```

### yield 与 return 语句的区别

相似: 都能返回紧跟在语句后面的表达式的值

不同: 函数执行遇到 `yield` 暂定执行, 遇到 `return` 则中断执行. `Generator` 函数可以返回多个值, 因为可以有多个 `yield`, 但是只有一个 `return`.

### yield 语句使用

`Generator` 函数不用 `yield` 时, 是一个暂缓执行的函数, 调用时生成遍历器对象, 对象调用 `next` 方法时, 执行完毕, 不调用则不执行. `yield` 语句只能用在 `Generator` 函数中.

`yield` 表达式在另一个表达式之中时, 需要用 `()` 括起来.

```javascript
const log = console.log;

function* g () {
  yield 10 + 9;
  log(6 + yield); // error
  log('hello' + yield 123); // error
  
  log(6 + (yield)); // NaN
  log('hello' + (yield 123)); // helloundefined
  
  return "over";
}
```

用作函数参数或者赋值表达式的右边, 不需要括号.

```javascript
function* g () {
  foo(yield a, yield b); // ok
  let str = yield; // ok
}
```

### 异步应用

`Generator` 函数内部可以捕获遍历器对象使用`throw`方法抛出的错误. 出错的代码与处理错误的代码, 实现了时间与空间上的分离.

```javascript
const log = console.log;

function* g (x) {
  try {
    var y = x + 1;
  } catch (err) {
    log(err); // error!!! 被打印出来
  }
  return y;
}

let obj = g(1);
log(obj.next()); // { value: 2, done: true }
obj.throw('error!!!')
```

封装异步任务

```javascript
import fetch from 'node-fetch';

const log = console.log;
const url = 'https://api.github.com/users/github';

function* g () {
  let result = yield fetch(url);
  return result;
}

// 调用
let obj = g();
let res = obj.next();
// 立刻打印 fetch 返回一个 Promise 对象
log(res); // { value: Promise { <pending> }, done: false }

res.value.then((data) => {
  return data; // fetch 返回的 Promise 对象成功之后返回数据
}).then((data) => {
  obj.next(data); // 将获取到的数据作为结果赋值给 result
})
```



## ES8 await async

`Generator` 函数的语法糖.

`Generator` 函数，依次读取两个文件.

```javascript
import fs from 'fs'
const log = console.log;
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

// Generator 函数
const gen = function* () {
  // f1 f2 均是 Promise 实例
  const f1 = yield readFile('./a.py');
  const f2 = yield readFile('./alipay.js');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 写成 async 函数
// async 替换 * 号, await 替换 yield
const asyncFunc = async function () {
  // f1 f2 均是 Promise 实例执行完之后返回的数据
  // await 会等待 Promise 实例状态变为结束, 才将结果赋值给 f1/f2
  // await 相当于 then 方法调用回调函数, 并返回接收到的数据
  const f1 = await readFile('./a.py');
  const f2 = await readFile('./alipay.js');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

`async` 函数对 `Generator` 函数的改进, 有以下几点:

1. 内置执行器.

   `Generator` 函数的执行依赖于执行器, 需要调用 `next` 方法或者 `co` 模块才能逐步执行, 得到结果.

   `async` 函数就像普通函数, 只需要一行 `asyncFunc();` , 就会自动执行, 输出最后结果

2. 语义更清楚.

   `async` 表示函数中有异步操作, `await` 表示后面的表达式需要等待结果.

3. 适用性更广.

   `co` 模块约定, `yield` 命令后面只能跟 `Promise` 对象或者 `Thunk` 函数, `await` 后面可以跟 `Promise` 对象以及原始类型的值(这时等同于同步操作).

4. 返回值是 `Promise` 对象.

   `async` 函数返回值是 `Promise` 对象, 比起 `Generator` 函数返回的遍历器对象, 更加方便.

`async` 函数可以看成多个异步操作, 包装成的一个 `Promise` 对象, `await` 命令可以看成内部 `then` 命令的语法糖.

```javascript
const asyncFunc = async function () {
  const f1 = await readFile('./a.py');
  log('f1:');
  const f2 = await readFile('./alipay.js');
  log('f2:');
};

let res = asyncFunc(); // 这是一个异步操作, res 是 Priomsie实例
log('res:', res); // 最先打印
/*
res: Promise { <pending> }
f1:
f2:
*/
```

在 `Promise` 实例前面加上 `await`, 就相当于等待这个 `Promise` 实例中的异步操作执行结束.

```javascript
const asyncFunc = async function () {
  const f1 = await readFile('./a.py');
  log('f1:')
  const f2 = await readFile('./alipay.js');
  log('f2:')
  return 'over';
};

let res = await asyncFunc();
log('res:', res)
/*
f1:
f2:
res: over // 最后打印
*/
```

异步操作不加 `await` , 就不会同步.

```javascript
const asyncFunc = async function () {
  const f1 = readFile('./a.py');
  log(f1)
  f1.then(() => log('f1 over'))
  const f2 = readFile('./alipay.js');
  log(f2)
  f1.then(() => log('f2 over'))
  return 'over';
};

// 率先执行到 return 语句, 即认为 asyncFunc 执行结束, 返回结果
let res = await asyncFunc();
log('res:', res)
/*
Promise { <pending> }
Promise { <pending> }
res: over
f1 over // 后续 f1/f2 才相继执行结束, 调用回调函数, 并输出结果
f2 over
*/
```

# Event Loop

## JS 是单线程

由于它是浏览器脚本语言, 主要是与用户互动以及操作DOM, 否则同步问题很复杂. 即使 js 可以创建多线程, 但是子线程完全受控于主线程,  且不得操作 DOM, 未改变单线程的本质.

## 任务队列

同步任务/异步任务

**异步执行的运行机制**

```
1. 所有同步任务在主线程上执行, 形成执行栈
2. 主线程之外, 还有一个任务队列, 只要异步任务有了执行结果, 就在该队列放置一个事件.
3. 当执行栈中所有同步任务执行完毕(注意), 系统就会读取"任务队列", 检查其中事件. 事件对应的异步任务, 就结束等待状态, 进入执行栈, 开始执行.
4. 主线程不断重复上面三步.
```

注意: 

1. 主线程为空, 才会读取任务(消息/事件)队列.
2. 执行异步任务就是执行其指定的回调函数, 异步任务必须指定回调函数
3. 任务队列是先进先出的数据结构.
4. 定时器功能: 主线程首先会检查一下时间, 某些事件只有到规定时间, 才能返回主线程.

## Event Loop

主线程从任务队列中读取事件是循环不断的, 整个运行机制又被称为 Event Loop.

主线程运行, 产生堆栈, 栈中的代码调用各种 API, 调用之后可能在"任务队列"中添加各种事件(click load done).

只要栈中的代码执行完毕, 就会读取"任务队列", 依次执行事件对应的回调函数.

执行栈中的代码(同步任务), 总是在读取"任务队列"之前.

![Event Loop](JavaScript-Notes/EventLoop.png)

## 定时器

任务队列中还可以放置定时事件, 指定某些代码在多少时间后执行.





# Proxy

## 定义

在对象外面设置一层拦截, 外界对该对象的访问必须先经过这层拦截, 因此提供一种机制, 可以对外界的访问进行过滤和改写.

```javascript
// 对空对象设置拦截, 重定义对属性的get与set方法
var obj = new Proxy({}, {
  get: (target, key, receiver) => {
    console.log(`get ${key}`);
    return Reflect.get(target, key, receiver);
  },
  set: (target, key, value, receiver) => {
    console.log(`set ${key}`);
    return Reflect.set(target, key, value, receiver);
  }
})

// 运行结果
obj.count = 1;
// set count
++obj.count
// get count
// set count
```

由代码得出, Proxy 实际上重载(overload)了点运算符, 即用自己的定义覆盖了语言的原始定义.

ES6 语法, 提供 Proxy 构造函数, 用来生成 Proxy 实例.

```javascript
// target 拦截对象 handler 定制拦截行为
var proxy = new Proxy(target, handler);
```

## 用法

### 普通使用

构造函数两个都是对象, 第一个是目标对象, 第二个是配置对象, 对于拦截的操作需要提供对应的处理函数, 该函数则会拦截该操作.

```javascript
var obj = new Proxy({}, {
  // get 方法的两个参数是目标对象以及要访问的属性
  get: (target, property) => {
    return 44;
  }
})

console.log(obj.name, obj.time, obj.date); // 44 44 44
```

**注意**: 如果要使 Proxy 起作用, 必须操作 Proxy 实例, 而不是操作目标对象. 如果配置对象为`{}`, 则对 Proxy 实例的操作相当于对`target`进行操作. 

技巧: 可以将 `Proxy`实例作为`object`的一个属性进行调用.

```javascript
var object = { proxy: new Proxy(target, handler) };
```

### Proxy 实例作为原型对象

`obj` 本身没有属性, 根据原型链去其原型对象即 `proxy` 对象上寻找并读取属性, 导致被拦截.

```javascript
var proxy = new Proxy({}, {
  get: (target, key, receiver) => {
    console.log(`${target} getting ${key}`);
    return 44;
  }
})

var obj = Object.create(proxy);
console.log(obj.name, obj.age);
/*
[object Object] getting name
[object Object] getting age
44 44
*/
```

一共有十三种拦截操作.



# Object

## Object.create()

创建一个新对象, 使用现有对象作为新对象的__proto\_\_.

```javascript
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"
```

**语法**

```javascript
Object.create(proto，[propertiesObject])
```

`proto`: 新创建对象的原型对象

`propertiesObject`: 可选, 需要传一个对象, 其自有可枚举属性将被添加到新创建对象中.

使用 `propertiesObject` 属性.



```javascript
var o;

// 创建一个原型为null的空对象
o = Object.create(null);

o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});
o.bar = 6; // Setting `o.bar` to 6
console.log(o.foo, o.bar, o); // hello 10 {}
```

使用构造函数创建的空对象, 是有原型的.

```javascript
let obj;
function constructor(){}
obj = new constructor();
// 上面一句就相当于:
obj = Object.create(constructor.prototype);
console.log(new constructor(), constructor.prototype, obj.__proto__, obj); 
// constructor {} constructor {} constructor {} constructor {}
```

省略的属性特性默认为 `false`, 下述 `p` 属性是不可写/不可枚举/不可配置的.

```javascript
let obj = Object.create({}, {
  p: { value: 42 }
})

// p 不可修改
obj.p = 33;
console.log(obj.p); // 42

// p 不可枚举
obj.q = 90;
for (let i in obj) {
  console.log(i);
}
// q

// p 不可删除
delete obj.p
console.log(obj.p); // 42
```

创建一个可写的/可枚举的/可配置的属性 p.

```javascript
let obj = Object.create({}, {
  p: {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true
  }
})
```





## Object.keys()

返回一个对象自己的**可枚举**属性组成的数组, , 不包括该对象原型链上的属性.

```javascript
let obj = { 100: 'a', 2: 'b', 7: 'c' }
console.log(Object.keys(obj)); // [ '2', '7', '100' ]
```



## Object.assign()

将一个/多个源对象的自身所有可枚举属性拷贝给目标对象. 返回目标对象.

```javascript
let target = { a: 1, b: 2, c: 3 }
let source = { b: 5, c: 6, d: 7 }
let obj = Object.assign(target, source);
console.log(target, obj);
// 相同属性则会覆盖慕目标对象该属性的值
// { a: 1, b: 5, c: 6, d: 7 } { a: 1, b: 5, c: 6, d: 7 }
```

**语法**

```javascript
Object.assign(target, ...source);
```

使用 `source` 的 `getter` 和 `target` 的 `setter`.

**示例**

只有一个参数时, 直接返回该对象.

```javascript
const log = console.log;

let obj = { a: 1 };
log(Object.assign(obj) === obj); // true
```

只有一个参数但是不是对象, 则会转成对象, 然后返回.

```javascript
log(Object.assign(2)); // [Number: 2]
```

当`source`为`null`/`undefined`时, 不会报错.

```javascript
console.log(Object.assign({ a: 1 }, null)); // { a: 1 }
console.log(Object.assign({ a: 1 }, undefined)); // { a: 1 }
```

### 复制对象

```javascript
let obj = { a: 1, b: 2 }
let newObj = Object.assign({}, obj)
console.log(newObj); // { a: 1, b: 2 }
```

### 深拷贝问题

浅拷贝: 仅仅拷贝对象的引用, 深拷贝: 完整拷贝对象, 是另一个新对象.

```javascript
const log = console.log;
let obj = { a: 1, b: 2, c: { d: 6 } }
let newObj = Object.assign({}, obj)
log(newObj); // { a: 1, b: 2, c: { d: 6 } }

// newObj, obj 不影响
obj.a = 3;
log(newObj, obj);
// { a: 1, b: 2, c: { d: 6 } } { a: 3, b: 2, c: { d: 6 } }

// newObj, obj 不影响
newObj.a = 88;
log(newObj, obj);
// { a: 88, b: 2, c: { d: 6 } } { a: 3, b: 2, c: { d: 6 } }

obj.c.d = 55;
log(newObj, obj);
// { a: 88, b: 2, c: { d: 55 } } { a: 3, b: 2, c: { d: 55 } }
// 可见这里是浅拷贝, 关于属性值, 还是浅拷贝/引用
```

**对象的深拷贝实现**

使用 `JSON.parse` 与 `JSON.stringify` .

```javascript
const log = console.log;
let obj = { a: 0, b: 1, c: { d: 2 } }

let obj1 = JSON.parse(JSON.stringify(obj));
obj.a = 55;
obj.c.d = 88;
log(obj, obj1);
// { a: 55, b: 1, c: { d: 88 } } { a: 0, b: 1, c: { d: 2 } }
```



## Object.defineProperty()

直接在一个方法上定义一个新属性, 或者修改一个对象的现有属性, 并返回此对象.

直接在Object构造器对象上使用此方法, 而不是对象实例.

```javascript
'use strict'
let obj = {}
Object.defineProperty(obj, 'name', {
  value: 'Joe',
  writable: false
})
console.log(obj.name); // Joe
// 严格模式下抛错
// TypeError: Cannot assign to read only property 'name' of object
obj.name = 'Mary'
```

语法:

`obj`: 要定义属性的对象

`prop`: 要定义或修改的属性名称或者`Symbol`

`descriptor`: 要定义或修改的属性描述符(数据描述符/存取描述符)

```javascript
Object.defineProperty(obj, prop, descriptor)
```

返回值是被修改的对象.

描述符可拥有的键值以及默认值:

|            | configurable | enumerable | value     | writable | get       | set       |
| ---------- | ------------ | ---------- | --------- | -------- | --------- | --------- |
| 默认值     | false        | false      | undefined | false    | undefined | undefined |
| 数据描述符 | 可以         | 可以       | 可以      | 可以     | 不可以    | 不可以    |
| 存取描述符 | 可以         | 可以       | 不可以    | 不可以   | 可以      | 可以      |





# 模块化

## 概述

ES6之前, JS没有模块体系, 使用社区的模块加载方案, 分别是 CommonJS (用于服务器)和 AMD(用于浏览器) 两种, 都只能运行时确定模块的依赖关系.

### 运行时加载

```javascript
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

只能在代码运行时, 才能整体加载`fs`模块(即加载`fs`的所有方法), 才能得到对象`_fs`, 再从这个对象读取三个方法.

ES6 引入了模块化，在编译时就能确定模块的依赖关系 + 输入和输出的变量, 成为浏览器和服务器通用的模块解决方案.

### 编译时加载

```javascript
// ES6模块
import { stat, exists, readFile } from 'fs';
```

从`fs`模块加载3个方法, 其他方法不加载, called 编译时加载或者静态加载.

### ES6 模块特点

- 自动开启严格模式

- 模块中可以导入导出各种类型的变量, 如函数/对象/字符串/布尔值/类等.

- 每个模块都有自己的上下文, 模块内声明的变量都是局部变量.

- 每个模块只加载一次, 再去加载该模块, 则直接从内存中读取.

## 用法

### export 命令

ES6 的模块化 = 导出（export） 与导入（import）两个模块. 每个模块就是一个文件, 文件中的变量外界都不可以获取, 如果外界需要使用, 则需要使用`export`输出对应变量.

#### 基本用法

**输出变量**

```javascript
// profile.js
export let a = 10;
export let b = 100;
export let c = 1000;

// 或者下面这种写法 推荐优先使用
let a = 10;
let b = 100;
let c = 1000;
export {a, b, c};
```

**输出函数**

```javascript
let addFunc = (a, b) => {
  return a + b;
}
let multiFunc = (a, b) => {
  return a * b;
}
export { 
  addFunc,
  multiFunc as multi // as 重命名
};

// 或者这种写法
export function multiply(x, y) {
  return x * y;
};
```

**输出类**

```javascript
let myClass = class {
  constructor(a, b) {
    this.name = a;
    this.age = b;
  }
  write () {
    return this.name + 'is' + this.age;
  }
}
// 重命名后, myClass 可以导出多次
export { myClass as self, myClass as self1 }
```



#### 接口与变量一一对应

`export` 命令规定的是对外的接口, 必须与模块内部的变量一一对应.

**错误写法**

对外输出的都是值, 不是接口

```javascript
// 错误写法一
let a = 5;
export a;// 对外输出5这个值

// 错误写法二
export 5; // 对外输出5这个值

// 均是 Declaration or statement expected. 这个错误
```

**正确写法**

规定了对外的接口 `a` , 其他脚本可以通过这个接口, 取到值 `5`.

```javascript
// 写法一
let a = 5;
export {a};

// 写法二
let a = 5;
export {a as b};

// 写法三
export let a = 5;
```

#### 动态绑定

`export` 输出的接口, 与对应的值是动态绑定关系, 即该接口对应的是 实时的值.

```javascript
// 接口 a 刚输出的值对应的是'aaa', 3 秒之后, 对应'bbb'
export let a = 'aaa';
setTimeout(()=>{
  a = 'bbb';
}, 3000)
```

#### 模块顶层

`export` 命令可以出现在模块的任何位置，但必需处于模块顶层, 因为在块级作用域内, 就无法做静态优化(引入宏/类型检验)了.

```javascript
let a = () => {
  export let b = 7; // SyntaxError: Unexpected token 'export'
}
```



### import 命令

`import` 后面的路径可以是绝对/相对, `.js`可以省略, 如果只是模块名不带有路径, 则需要配置文件.

#### 只读属性

```javascript
import { name as myName, age } from './profile.js'
console.log(myName, age);
// myName 与 age 变量都是只读的, 不可重新赋值
```

但是如果导入的是对象, 修改其属性, 就是合法操作, 其他模块也可以读到改写后的值, 但是建议不要修改, 导入的变量全部当做只读.

```javascript
import {a} from './xxx.js'
a.foo = 'hello'; // 合法操作
```

#### 提升

`import` 命令具有提升效果, 会提升到整个模块的头部, 首先执行.

```javascript
// 不会报错
foo();
import { foo } from 'my_module';
```

本质是因为, `import`是编译时加载, 而`foo`是运行时调用.

#### 单例模式

`import` 语句会执行所加载的模块

```javascript
import 'lodash'
```

上述代码仅仅执行 `lodash` 模块, 但是不输入任何值.

```javascript
import { a } from "./xxx.js";
import { a } from "./xxx.js";
// 相当于 import { a } from "./xxx.js"; 只执行一次
 
import { a } from "./xxx.js";
import { b } from "./xxx.js";
// 相当于 import { a, b } from "./xxx.js"; 只执行一次
// 虽然是两个语句, 但是对应的是同一个实例, 即单例模式
```

#### 静态执行特性

`import` 静态执行, 不能使用表达式和变量. 静态分析阶段, 这些语法都没法得到值.

```javascript
import { "f" + "oo" } from "methods";
// 表达式 error

let module = "methods";
import { foo } from module;
// 变量 error

if (true) {
  import { foo } from "method1";
} else {
  import { foo } from "method2";
}
// if 结构 error
```



### 模块的整体加载

使用 `*` 号指定一个对象, 所有输出值加载在这个对象上.

```javascript
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

整体加载

```javascript
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));

// circle 可以静态分析, 不允许运行时改变
// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```



### export default 命令

#### 导出匿名函数

为了让用户不阅读 `export` 的模块就能加载模块(不需要知道接口名), 则可以使用默认输出.

```javascript
// export-default.js
export default function () {
  console.log('foo');
}
// 默认输出是一个函数
```

导入该模块时, 可以指定任意名字. 此时 `import` 后面不需要加 `{}`.

```javascript
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

#### 导出非匿名函数

这里 `foo` 函数在模块外被加载时, 等同于匿名函数.

```javascript
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo; // 注意: 没有大括号
```

#### 默认输出与正常输出

```javascript
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import { crc32 } from 'crc32'; // 输入
```

一个模块只能有一个默认输出, 即 `export default` 命令只能使用一次, 因此 `import` 时才能不使用 `{}`.

#### default 变量

本质上,  `export default` 命令是输出一个叫做 `default` 的变量或者方法, 系统允许你取任何名字.

```javascript
// module.js
function add(){
  // ...
}
export { add as default };
// 等同于
// export default add;

import { default as foo } from './module.js';
// 等同于
// import foo from './module.js';
```

`default` 后面不能再跟变量声明语句.

```javascript
// right
export var c = 9;

// right
var a = "My name is Tom!";
export default a;

// error
export default var c = "error";
```

后面可以直接跟值, 相当于将后面的变量赋值给 `default`.

```javascript
// right
export default 9;

// error 没有指定对外接口
export 5;
```



# 最佳实践

1. 避免使用 全局变量 `new` `===` `eval()`

2. 所有声明放在脚本或者函数的顶部, **顶部声明, 稍后使用**

   ```javascript
   // 在顶部声明
   var firstName, lastName, price, discount, fullPrice;
   
   // 稍后使用
   firstName = "Bill";
   lastName = "Gates";
   
   price = 19.90;
   discount = 0.10;
   
   fullPrice = price * 100 / discount;
   ```

3. 声明变量时同时初始化

4. 将数值/字符串/布尔值声明为原始值而非对象, 否则会拖慢速度

   ```javascript
   let x = 'bill' // 字符串
   let y = new String('bill') // 对象
   console.log(x===y); // false
   ```

5. 请勿使用 new Object()

|   推荐使用    |     不建议     |
| :-----------: | :------------: |
|      {}       |  new Object()  |
|      []       |  new Array()   |
| function (){} | new Function() |
|      ""       |  new String()  |
|       0       |  new Number()  |
|     false     | new Boolean()  |
|     /()/      |  new RegExp()  |

6. 意识到自动类型转换, 变量可以通过赋值改变其数据类型, 变量可包含不同的数据类型.

   ```javascript
   let a = 'hello'
   a = 5;
   console.log(typeof a); // number
   ```

7. 为函数中的参数设置默认值, `undefined` 会破坏代码

8. 用`default`来结束`switch`.



# 缺陷与错误

## 错误处理

> 原因

js代码中会出现错误, 由于编写代码/编译/用户输入等各种各样的原因.

> 处理

发生错误时, js引擎会停止并生成一个错误消息.

try与catch成对出现, finally是最后一定会执行的语句(可以没有).

throw抛出错误, 实际上就是抛出一个表示错误信息的字符串s, 因此可以自定义错误.

在catch中可以捕获s,实际上就是可以获得s的值并打印出来.

```javascript
test = (x) => {
  try {
    if (x === '') throw 'is kong'
    if (x === '1') throw 'is 1'
    if (x === '2') throw 'is 2'
  } catch (error) {
  	console.log(error);
  }
}
test('1'); // is 1
test(''); // is kong
```



## 调试

> 操作

设置断点, 检查变量值, 浏览器内置调试器(按下F12, 选择`console`)

> `debugger`关键字

代码会在`debugger`行停下, 并执行调试函数. 没有调试函数则不起作用.

与在调试工具中设置断点效果一样.



## 严格模式

> 原因

`use strict` 

消除js语法的不合理之处, 保证代码安全; 增加编译效率;

> 使用

只能放在脚本或者函数的开头

> 具体内容

- 禁止使用未定义/声明的变量
- 禁止删除变量/函数
- 禁止变量重名
- 禁止使用八进制/转义字符
- 禁止对只读属性赋值
- 禁止删除不能删除的属性, 比如prototype
- 禁止变量名为eval/arguments
- 禁止使用右侧类似语句 with (Math){x = cos(2)};
- 禁止在作用域eval创建的变量被使用
- 禁止this指向全局对象



------



# 浏览器

## 网络与互联网

互联网, 连接所有实体计算机, 使得彼此之间可以互相发送数据.

通过互联网, 计算机之间可以发送二进制位. 为了传输能产生有效通信, 计算机之间必须知道这些位应该代表什么. 赋予比特序列的含义取决于想表达的事物的类型以及使用的编码机制.

*网络协议* 描述了网络上的通信方式, 有各种各样的协议, 用来做不同的事情.

*超文本传输协议* (HTTP)是用于检索命名资源(例如网页或者图片之类的信息块)的协议.

发出请求的一方应该采用这样的格式描述请求方式, 想获取的资源以及使用的协议版本.

```http
GET /index.html HTTP/1.1
```

大多数协议都是基于其他协议构建的. HTTP 将网络视为一种类似于流的设备, 可以在其中放置二进制位并以正确的顺序到达目的地.

*传输控制协议* (TCP) , 互联网中的所有设备均使用这个协议, 大多数通信都基于它.
TCP 的工作方式: 一台计算机等待并监听, 以便其他计算机与它建立连接. 一台机器为了同时监听不同类型的通信, 每个监听器占用的端口都不同. 大多数协议都指定了它默认使用的端口. TCP 连接在服务器与客户端之间建立的双向管道, 两端的机器都可以将数据放入其中, TCP 提供了网络的抽象.

## Web

万维网 (World Wide Web) 是一组协议与格式(与互联网概念不同), 允许我们在浏览器中访问网页. `Web` 指的是这样的页面可以相互链接, 形成巨大网格. 换句话说, Web 就是浏览器上能访问的网页的集合.

成为 `Web` 的一部分, 需要其他机器能够到你这里请求文档, 则需要将计算机连接互联网并且使用`HTTP`协议监听80端口.

Web 上的每个文档都由统一资源定位符(URL)命名:

```html
http://qicai.fengniao.com/list_1437.html
|协议 |       服务器       |    路径      |
```

连接到互联网的机器会获得一个 `IP` 地址, 但是IP地址比较难记, 因此可以为 `IP` 地址注册域名, 域名就指向该 `IP` 地址, 对外则可以使用域名来提供服务.

在浏览器中键入该URL, 首先找到域名对应的IP, 然后使用 HTTP 协议与该 IP 对应的服务器建立连接, 然后请求相应的资源, 请求成功, 服务器会发回文档, 浏览器显示即可.

## HTML

HTML : 超文本标记语言(Hypertext Markup Language), 是用于网页的文档格式. 包含文本以及为文本提供结构的标签.

文档以 <!doctype html> 开头, 告诉浏览器将页面解释为现代 html , 而不是过去使用的各种方言.

HTML 中的 \<script\> 标签包含 js 代码, 或者使用`src`属性从`url`获取脚本文件(包含 JavaScript 程序的文本文件). `button`标签的 `onclick` 属性也可以包含 JS 程序. 只要单击按钮, 就会运行属性的值.

```html
<button onclick="alert('Boom!');">DO NOT PRESS</button>
```

将 JS代码严格限制在浏览器中运行, 不能查看或者修改计算机的文件, 是为了防止浏览某些网站时可能出现的恶意脚本攻击. 以这种方式隔离编程环境称为**沙盒化**(sandboxing), 思想是让程序在沙盒中无害运行. 沙盒的难点在于, 既要允许程序有足够的空间运行, 也要限制它做有害的事情.



## 文档对象模型

浏览器从服务器获得 HTML 页面并对其进行解析, 首先构建文档结构的模型, 并使用此模型在屏幕上绘制页面. 这种数据结构可以被读取或者修改, 实时性体现在对其的修改可以立即显示在屏幕上.

将 HTML 想象成嵌套的框, 浏览器表示文档的数据结构就是对这种嵌套的框的模拟, 在这种数据结构中, 每个框都被表示成一个对象, 浏览器可以对其中任何一个对象进行交互, 查看该对象代表什么HTML标签以及包含哪些其他对象以及文本.  这种数据结构被称之为文档对象模型(DOM), documnet.documentElement 是根.

```javascript
// 寻找元素
document.body.getElementsByTagName(arg) // 获取对应标签的所有元素节点列表
document.body.getElementsByClassName(arg) // 获取所有元素节点列表, 其类属性中具有给定字符串
document.getElementsById(arg) // 获取单个元素节点, 该节点的id属性是给定字符串

// 更改文档
appendChild(新节点)
document.body.insertBefore(新节点, 节点) // 将新节点从当前位置移除
replaceChild(新子节点, 旧子节点)

// 创建节点
document.createTextNode(文本内容) // 创建文本节点
document.createElement(标签名称) // 创建元素节点
```

### 属性

getAttribute setAttribute

### 布局

块元素: 占据文档的整个宽度

行内元素: 与周围文本在一行上呈现

offsetWidth offsetHeight 属性表示元素占用的空间(以像素为单位)

### 层叠样式表

使用选择器语法

### 查询选择器

querySelectorAll querySelector



## HTTP 和表单

在浏览器输入 http://qicai.fengniao.com/list_1437.html 之后, 浏览器首先会查询域名对应的IP地址, 然后与其建立TCP连接, 然后在80端口向服务器发送如下信息(请求).

```http
GET /list_1437.html HTTP/1.1
Host: qicai.fengniao.com
User-Agent: 浏览器名称
```

**请求**

请求方法 资源路径 浏览器使用的协议版本

```http
 GET /list_1437.html HTTP/1.1
```

请求方法有: 

```javascript
GET: 获取指定资源
DELETE: 删除资源
PUT: 创建或替换资源
POST: 发送信息
...
```

浏览器在与给定服务器通信时, 会自动切换到适当的协议版本.

指定主机名

服务器可能有多个主机名, 指定是必须的.

```
Host: qicai.fengniao.com
```

**响应**

服务器回复如下信息(响应):

```http
HTTP/1.1 200 OK
Content-Length: 65585
Content-Type: text/html
Last-Modified: Mon, 07 Jan 2020 22:29:54 GMT

<!doctype html>  // 正文
...
```

浏览器收到后, 将正文取出并显示为HTML文档.



协议版本号 状态码 可读字符串

状态码以2开头,表示请求成功, 以4开头说明请求有问题, 以5开头表示服务器有错误.

用来指定请求或者响应的额外信息, 下述表示响应文档的大小和类型以及该文档最后一次被修改的时间.

```
Content-Length: 65585
Content-Type: text/html
Last-Modified: Mon, 07 Jan 2020 22:29:54 GMT
```



请求与响应报文, 都可能包含空行, 后面是正文.



HTML可能包含表单(允许用户填写信息)并将相关信息打包进HTTP请求中, 浏览器随后会显示请求结果.

当form元素的method属性为Get或者省略时, 表单中的信息将作为查询字符串添加到URL的结尾:

```http
GET /list_1437.html?name=Mary&message=Yes%3F HTTP/1.1
```

? 表示资源路径的结束以及查询的开始, %3F是对查询字符串中的?进行转义的结果.

JS 中 `encodeURIComponent`/`decodeURIComponent` 进行编码和解码.

method属性为POST时, 提交表单的HTTP请求会使用POST方法并将查询字符串放在请求正文.

```http
GET /list_1437.html HTTP/1.1
Content-Length: 24
Content-Type: application/x-www-form-urlencoded

name=Mary&message=Yes%3F
```

GET 请求应该用于没有副作用仅仅是要求信息的请求, 更改服务器内容的请求应使用例如POST请求或者其他.

