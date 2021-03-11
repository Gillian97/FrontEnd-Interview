---
title: JavaScript
tags: '-JavaScript'
abbrlink: 11485
date: 2020-09-01 09:17:06
---
# JavaScript 简介

## 诞生

本名 ECMAScript，被创建的原因是在浏览器输入数据时需要进行验证, 而不是传到服务器才告知客户数据错误或者空白等, 于是被创建时诞生在 NetScape 浏览器中.

## 特点

只能在浏览器中运行, 不能单独运行, 不能读取文件

由浏览器中的执行模块(JS引擎)执行, 考虑到页面打开的速度, 不编译执行.

## 功能

### 操作 HTML 的 DOM

浏览器从服务器取到 HTML 页面之后, 会展示页面出来, 但是浏览器内部将 HTML 组织成一个树给 JS, 这个树称为 DOM。

![htmltree](images/htmltree.jpg)

JS 可以定位并操作 DOM 中的任意一个节点, 且不用刷新页面, 操作就可以立刻显示出效果. 而且操作是内部进行, 并没有改变 html 的源码.

### 控制浏览器

打开窗口/在一个窗口内前进后退/获得浏览器名称 + 版本(判断是什么浏览器, 才能做这个浏览器支持的特殊操作)...

### 异步调用

不能像`java`一样访问网络, 就不能调用服务器的接口去获取数据. 用户只能`get`或者`post`向服务器发送请求, 服务器返回整个页面, 而不是一个片段, 整个页面得重新刷新.

`XMLHttpRequest` 使得 `JS` 可以直接向服务器发起接口调用, 等获得服务器返回的数据(此时为`XML`)后执行浏览器提供的回调函数, Called 异步调用。回调函数基本就是更新 `DOM` 树的某个节点, 实现网页的局部刷新。后来上述的异步调用被称为 `AJAX` (Asynchronous JavaScript And XML)。

由于 `XML` 的标签太多, 真正数据很少, 而且需要 XML 解析器进行解析, 后来 `JS` 和服务器之间的数据传输使用 `JSON` 这种更简洁的格式。

HTML 结构, CSS 展示, JS(AJAX JSON) 逻辑 = 前端, 可以在浏览器实现 `MVC`.

后来出现了多种框架, ExtJS/prototype/JQuery/AngularJS 将前端推向另一个高峰.

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

### 布尔值 Boolean

true/false

### 字符串 String

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
let s = 'hel, l, o';
// 不切割 整个字符串视作数组的一个元素
console.log(s.split());  // [ 'hel, l, o' ]
// 每个字符都是数组中的元素
console.log(s.split(''));
/* 
[
 'h', 'e', 'l', 
 ', ', 'l', ', ', 
 'o'
]
*/
// 以逗号分割
console.log(s.split(', '), s); // [ 'hel', 'l', 'o' ] hel, l, o
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

截取指定长度的子串. (ps. ECMAscript 没有对该方法进行标准化, 因此反对使用它。)

```javascript
let s = 'helloWorld';
// 起始位置 截取长度
console.log(s.substr(1, 4), s); // ello helloWorld
```

### 数字 Number

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

### Symbol (ES6)

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

### null 与 undefined

#### null

`null` : 表示主动释放指向对象的引用.

```javascript
let a = [1, 2]
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

注意:

**null 不是对象**。

解释: 虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

#### undefined

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
console.log(a, b); // undefined undefined

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

两者使用 == 时为 `true`, === 时为 `false`.

```javascript
console.log(undefined == null, undefined === null);
// true false

// 在if语句中, 两者都被转成 false
if (!undefined) console.log('undefined if false'); // undefined if false
if (!null) console.log('null if false'); // null if false
```

### BigInt（ES11/ES2020）

**`BigInt`** 是一种内置对象，它提供了一种方法来表示大于 2^53 - 1 的整数。这原本是 Javascript中可以用 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 表示的最大数字。**`BigInt`** 可以表示任意大的整数。

可以用在一个整数字面量后面加 `n` 的方式定义一个 `BigInt` ，如：`10n`，或者调用函数`BigInt()`。

```javascript
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n

const hugeString = BigInt("9007199254740991");
// ↪ 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff");
// ↪ 9007199254740991n

const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111");
// ↪ 9007199254740991n
```

它在某些方面类似于 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) ，但是也有几个关键的不同点：

- 不能用于 [`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象中的方法；
- 不能和任何 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 实例混合运算，两者必须转换成同一种类型；
  - 在两种类型来回转换时要小心，因为 `BigInt` 变量在转换成 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 变量时可能会丢失精度。

#### 类型

使用 `typeof` 测试时， `BigInt` 对象返回 "bigint" ：

```javascript
typeof 1n === 'bigint'; // true
typeof BigInt('1') === 'bigint'; // true

// 使用 `Object` 包装后， `BigInt` 被认为是一个普通 "object" 
typeof Object(1n) === 'object'; // true
```

#### 运算

以下操作符可以和 `BigInt` 一起使用： `+`、``*``、``-``、``**``、``%`` 。除 `>>>` （无符号右移）之外的 [位操作](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) 也可以支持。因为 `BigInt` 都是有符号的， `>>>` （无符号右移）不能用于 `BigInt`。[为了兼容 asm.js ](https://github.com/tc39/proposal-bigint/blob/master/ADVANCED.md#dont-break-asmjs)，`BigInt` 不支持单目 (`+`) 运算符。

```javascript
const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER);
// ↪ 9007199254740991n

const maxPlusOne = previousMaxSafe + 1n;
// ↪ 9007199254740992n

const theFuture = previousMaxSafe + 2n;
// ↪ 9007199254740993n, this works now!

const multi = previousMaxSafe * 2n;
// ↪ 18014398509481982n

const subtr = multi – 10n;
// ↪ 18014398509481972n

const mod = multi % 10n;
// ↪ 2n

const bigN = 2n ** 54n;
// ↪ 18014398509481984n

bigN * -1n
// ↪ –18014398509481984n
```

`/` 操作符对于整数的运算也没问题。可是因为这些变量是 `BigInt` 而不是 `BigDecimal` ，该操作符结果会向零取整，也就是说不会返回小数部分。

> 当使用 `BigInt` 时，带小数的运算会被取整。

```javascript
const expected = 4n / 2n; // 2n
const rounded = 5n / 2n; // 2n, not 2.5n
```

#### 比较

```javascript
// 与 Number 宽松相等
0n === 0 //false
0n == 0 // true

// Number 和 BigInt 可以进行比较。
1n < 2 // true
2n > 1 // true
2 > 2 // false
2n > 2 // false
2n >= 2 // true

// 两者也可以混在一个数组内并排序
const mixed = [4n, 6, -12n, 10, 4, 0, 0n];
// ↪  [4n, 6, -12n, 10, 4, 0, 0n]
mixed.sort();
// ↪ [-12n, 0, 0n, 10, 4n, 4, 6]
```

## 引用类型

引用数据类型: 对象Object

- 普通对象-Object
- 数组对象-Array
- 正则对象-RegExp
- 日期对象-Date
- 数学函数-Math
- 函数对象-Function

### 对象 Object

见下文

### 数组 Array

是一种`可迭代数据类型`。那什么是`可迭代数据类型`呢？

> 原生具有[Symbol.iterator]属性数据类型为可迭代数据类型。如数组、类数组（如arguments、NodeList）、Set和Map。

可迭代对象可以通过迭代器进行遍历。

```js
let arr = [4, 2, 1];
// 这就是迭代器
// 生成迭代器对象
let iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


// {value: 4, done: false}
// {value: 2, done: false}
// {value: 1, done: false}
// {value: undefined, done: true}
```

*创建*

```javascript
let arr0 = []; // 字面
let arr1 = new Array(); // 不固定长度
let arr2 = new Array(5); // 固定长度
let arr3 = new Array(1, 2, 3, 5);

console.log(arr0, arr1, arr2, arr3); // [] [] [ <5 empty items> ] [ 1, 2, 3, 5 ]

// 使用 Array.from 创建
// 语法：Array.from(arrayLike[, mapFunc[, thisArg]])

// 从 String 生成数组
Array.from('foo'); // [ 'f', 'o', 'o' ]

// 从 Set 生成数组
const set = new Set([3, 4, 5, 5, 6, 7]);
Array.from(set); // [ 3, 4, 5, 6, 7 ]

// 从 Map 生成数组
const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map); // [ [ 1, 2 ], [ 2, 4 ], [ 4, 8 ] ]

// 使用箭头函数
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

*属性*

`length`

> 计算并返回数组长度

```javascript
let arr0 = [1, 2, 3, 4]; // 字面
console.log(arr0.length); // 4
```

`constructor`

> 返回创建该对象的函数的引用, 因为js的一切变量都是对象, 是对象就有其构造函数.

```javascript
var test = new Array();
if (test.constructor == Array){
	document.write(test.constructor);
}
// output: function Array() { [native code] }
```

#### 方法

**高阶函数**: `一个函数`就可以接收另一个函数作为参数或者返回值为一个函数，`这种函数`就称之为高阶函数。

##### 改变原数组

**Array.sort()  [高阶]**

> 对数组元素进行排序, 默认是字符串顺序, 即会将数组元素转变为字符串, 然后比较字符串中字符的 UTF-1编码顺序来进行排序.

```javascript
// 按照字母顺序排序 默认
let arr = ['hi', 'Bob', 'good', 'are', 'you', 'google'];
arr.sort();
console.log(arr); // [ 'Bob', 'are', 'good', 'google', 'hi', 'you' ]
```

> 添加比值函数, 使得能对**数字进行排序**.

参数: 一个比值函数, 默认两个 参数分别代表两个比较的函数

```javascript
let nums = [2, 3, 1];
//两个比较的元素分别为a, b
nums.sort(function(a, b) {
  if(a > b) return 1; // 大于 0, a 排在 b 后面
  else if(a < b) return -1; // 小于 0, a 排在 b 前面
  else if(a == b) return 0;
})
```

示例:

```javascript
// 不使用比值函数
let arr = [3, 7, 9, 1, 0, 12, 34, 76, 91];
arr.sort();
console.log(arr); 
/* [0, 1, 12, 3, 34, 7, 76, 9, 91 ] */

// 使用比值函数 倒序
let arr = [3, 7, 9, 1, 0, 12, 34, 76, 91];
arr.sort((a, b) => b - a);
console.log(arr);
/* [91, 76, 34, 12, 9, 7, 3, 1, 0] */

// 使用比值函数 正序
let arr = [3, 7, 9, 1, 0, 12, 34, 76, 91];
arr.sort((a, b) => a - b);
console.log(arr); 
/* [0, 1, 3, 7, 9, 12, 34, 76, 91] */
```

**Array.pop()**

> 删除数组的最后一个元素并返回该元素. 空数组返回`undefined`.

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

```javascript
let arr1 = [1, 2, 3];
console.log(arr1.shift(), arr1);
// 1 [ 2, 3 ]
```

**Array.unshift()**

> 向数组的开头添加元素并**返回现有长度**

```javascript
let arr1 = [1, 2, 3, 4, 5];
console.log(arr1.unshift(9), arr1);
// 6 [ 9, 1, 2, 3, 4, 5 ]
```

**Array.push()**

> 向数组末尾添加元素并**返回数组现有长度**

```javascript
let arr1 = [1, 2, 3];
console.log(arr1.push(4), arr1);
// output: 4 [ 1, 2, 3, 4 ]
```

**Array.reverse()**

> 颠倒数组中元素顺序

```javascript
let arr1 = [1, 2, 3];
console.log(arr1.reverse(), arr1);
// output: [ 3, 2, 1 ] [ 3, 2, 1 ]
```

**Array.splice(start, number, value...)**

> 推荐使用该方法删除数组元素
>
> 注意: 删除的元素以数组形式返回。

```javascript
let arr = [1, 2, 3, 4, 5]
arr.splice(2, 1, 'ok', 'fine'); // 从数组下标为2的位置开始删除1个元素, 再插入2个元素
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
  1, 2, 3, 4, 5, 
  6, 7, 8, 9, 10
]*/
```

**Array.slice()**

> 根据下标获取数组的一部分, 返回新数组.

```javascript
let arr1 = [1, 2, 3, 4, 5];
console.log(arr1.slice(3), arr1.slice(2, 4), arr1);
// output: [ 4, 5 ] [ 3, 4 ] [ 1, 2, 3, 4, 5 ]
```

**Array.concat()**

> 拼接数组成一个新数组, **浅拷贝**

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

flat 函数实现, 返回新数组, 原数组不变.

```javascript
Array.prototype.flat = function() {
    return this.toString().split(', ').map(item => +item )
}
// 不论数组多少层, 使用 toString() 都能得到所有元素组成的字符串
[1, [2, [4]]].toString()
// '1, 2, 4'
```

使用示例

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

> 其他数组扁平化的方法

```javascript
let ary = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(ary);
```

replace+split

```javascript
ary = str.replace(/(\[|\])/g,'').split(',')
```

Replace + JSON.parse

```javascript
str = str.replace(/(\[|\])/g, '');
str = '[' + str + ']';
ary = JSON.parse(str);
```

普通递归

```js
let result = [];
let fn = function(ary) {
  for(let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (Array.isArray(ary[i])){
      fn(item);
    } else {
      result.push(item);
    }
  }
}
```

利用reduce函数迭代

```js
function flatten(ary) {
    return ary.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}
let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))
```

扩展运算符

```js
//只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}
```

**Array.join()**  默认使用 `, ` 为分隔符

> `toString` 所有 JavaScript 对象都拥有`toString()`方法
>
> 数组所有元素组成字符串, 可以指定分隔符.

```javascript
let arr0 = [1, 2, 3, 4];
console.log(arr0.join(), arr0.toString()); // 1, 2, 3, 4  1, 2, 3, 4
console.log(arr0.join('*')); // 1*2*3*4
console.log(arr0); // [ 1, 2, 3, 4 ]
```

**Array.map()  [高阶]**

> 对数组的每个元素均执行函数, 对其做一些处理, 来**生成新数组.** **不改变原数组**.

使用:

map((val, index, arr)=>{}[, thisArg])

thisArg: 回调函数的this值

```javascript
let arr = [1, 2, 'ok', 'fine', 'you', 'bye']
let arr2 = arr.map((val, index, array) => {
  return val + '*' + index; // 注意这里的 return 返回新元素
});
// 原数组不变
console.log(arr2, arr);
// [ '1*0', '2*1', 'ok*2', 'fine*3', 'you*4', 'bye*5' ] [ 1, 2, 'ok', 'fine', 'you', 'bye' ]

var arr = [1, 2, 3, 4, 5]
let a = arr.map(c => c - 1); // 返回新数组
console.log(a); // [ 0, 1, 2, 3, 4 ]
```

**Array.filter()  [高阶] **

使用:

一个函数

> 对数组的每个元素均执行函数, 筛选符合条件的元素来生成新数组.**不改变原数组**.

```javascript
let arr = [1, 2, 'ok', 'fine', 'you', 'bye']
let arr2 = arr.filter((val, index, array) => {
  return typeof val == 'string'; // 返回符合条件的元素组成新数组
});
console.log(arr2, arr);
// [ 'ok', 'fine', 'you', 'bye' ] [ 1, 2, 'ok', 'fine', 'you', 'bye' ]
```

**Array.forEach()**

> 对数组的每个元素均执行一次函数(回调函数)

无法 `break`, 可以用 `try/catch` 中 `throw new Error` 来停止。

```javascript
let arr = [1, 2, 'ok', 'fine', 'you', 'bye']
let s = '';
// 该函数的参数1为数组元素, 参数2为数组元素下标, 参数3为该数组本身
arr.forEach((val, index, array) => {
  s += (val + '/' + index + ' ');
});
console.log(s); // 1/0 2/1 ok/2 fine/3 you/4 bye/5 
```

注意: 在 forEach 函数中使用 return 不会返回, 函数会继续执行

中断方法:

- try catch 中断地方抛出异常
- 官方推荐方法（替换方法）：用every和some替代forEach函数。every在碰到return false的时候，中止循环。some在碰到return true的时候，中止循环

**Array.reduce()  [高阶] **

> 参数`total` 默认是数组的第一个元素, 可以设置初始值.

```javascript
let arr = ['bye', 'hi', 'ok', 'fine', 'you', 'bye']
let res = arr.reduce((total, val, index, array) => {
  console.log("total=", total, val, index); // 从index=1开始打印
  return total + '*' + val; // 注意这里 return 结果, 作为下一次的初始结果
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

##### 乱序

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(function () {
    return Math.random() - 0.5; // Math.random() in [0, 1)
});
```

#### 判断数组中是否有某个元素

1. **array.indexof**

   > 此方法判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回-1。
   >

   ```js
   var arr=[1,2,3,4];
   var index=arr.indexOf(3);
   console.log(index);
   ```
2. **array.includes(searcElement[,fromIndex])**

   > 此方法判断数组中是否存在某个值，如果存在返回true，否则返回false
   >

   ```js
   var arr=[1,2,3,4];
   if(arr.includes(3))
       console.log("存在");
   else
       console.log("不存在");
   ```
3. **array.find(callback[,thisArg])**

   > 返回数组中满足条件的**第一个元素的值**，如果没有，返回undefined
   >

   ```js
   var arr=[1,2,3,4];
   var result = arr.find(item =>{
       return item > 3
   });
   console.log(result);
   ```
4. **array.findeIndex(callback[,thisArg])**

   > 返回数组中满足条件的第一个元素的下标，如果没有找到，返回`-1`
   >

   ```js
   var arr=[1,2,3,4];
   var result = arr.findIndex(item =>{
       return item > 3
   });
   console.log(result);
   ```

#### 伪数组

对象冒充数组, 有数组的形态其实就是有 length 的概念, 但是并不能真正使用数组的方法.

### 字典 Map (ES6)

解决 js 对象的键只能是字符串的问题, **ES6标准新增**的数据类型.

#### 与 Object 区别

1. Object 键只能是字符串或者 Symbols，Map 键可以是**任意值**，包括函数、对象、基本类型。
2. Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按**插入的顺序**返回键值。
3. 可通过 size 属性直接获取一个 Map 的键值对个数(map.size)，而 Object 的键值对个数只能手动计算。
4. Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。
5. Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。
6. Map 在涉及**频繁增删键值对**的场景下会有些**性能优势**。

#### 操作方法

- set(key, value)：向字典中添加新元素
- get(key)：通过键查找特定的数值并返回
- has(key)：判断字典中是否存在键key
- delete(key)：通过键 key 从字典中移除对应的数据
- clear()：将这个字典中的所有元素删除

**任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构**都可以当作 Map 构造函数的参数.

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

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键(以内存地址为键)。

```javascript
const map = new Map()
map.set(['a'], 555)
map.get(['a'])              // undefined
```

若键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键.

#### 迭代方法

- Keys()：将字典中包含的所有键名以迭代器形式返回
- values()：将字典中包含的所有数值以迭代器形式返回
- entries()：返回所有成员的迭代器
- forEach()：遍历字典的所有成员

```javascript
const map = new Map([
    ['a', 1],
    ['b', 2]
])
console.log(map.values())   // MapIterator {1, 2}
console.log(map.entries())  // MapIterator {"a" => 1, "b" => "2"}
console.log(map.keys())     // MapIterator {"a", "b"}
```

Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。

```javascript
map[Symbol.iterator] === map.entries    // true
```

#### 与其他数据类型转换

map 转数组

```javascript
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log([...map])                    // [[1, 1], [2, 2], [3, 3]]
```

数组转 map

```javascript
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log(map)                         // Map {1 => 1, 2 => 2, 3 => 3}
```

### 集合 Set (ES6)

一组不重复key的集合.ES6标准新增的数据类型.

Set 在添加值时, 不会发生类型转换, 5 与 "5" 是不同的, 类似于 === 运算符, 但是不同的是, **这里 Set 在做判断时, NaN 是等于 NaN 的.**

Set实例属性: constructor, size(元素个数)

Set 实例方法: add/delete/has/clear(清空集合)

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

# 函数 Function

函数定义是一个常规的绑定, 其中绑定的值是函数.

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

## 声明表示法

函数的第二种表示法.

声明在调用之后也能够工作, 声明在概念上被移到了作用域的顶部.

```javascript
function square (x) {
  return x * x;
} // 不需要分号
```

## 箭头函数

函数的第三种表示法. 以较简明的方式编写小型函数表达式.

```javascript
// 两种写法相同
let square1 = (x) => {
  return x * x;
};

let square2 = x => x * x;
```

### 没有 this

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

### 没有 arguments

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

### 不能使用 new

因为没有 this, 就不能作为构造函数, 即不能使用 new.

### 没有 super

需要知道箭头函数是如何获取 this 值的?

## 调用栈

函数返回时必须跳回到调用它的位置, 所以计算机必须记住调用发生的上下文. 存储此上下文的位置是调用栈, 每次调用函数时, 当前上下文都存储在此栈的顶部.

## 可选参数

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

## 执行上下文

当前 JavaScript 代码被解析和执行时所在环境的抽象概念, 即代码运行时才创建.

函数在调用时在执行栈中产生的变量对象, 该对象不能直接访问, 但是可以访问其中的变量/this 对象等.

### 三种类型

执行上下文总共有三种类型

* **全局执行上下文**：只有一个，浏览器的全局对象就是 window 对象，this 指向这个全局对象；
* **函数执行上下文**：存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文；
* eval 函数执行上下文：指的是运行在 eval 函数中的代码，很少用且不建议使用。

### 执行栈/调用栈

一个先进后出的结构, 存储在代码执行期间创建的所有执行上下文。

首次运行 JS 代码时，会创建一个 **全局执行上下文** 并推到当前执行栈中。每当发生**函数调用**时，引擎都会为该函数创建一个 **新的函数执行上下文** 并推到当前执行栈的栈顶。

根据执行栈后进先出的规则，当栈顶函数完成后，其对应的函数执行上下文会从栈顶被推出，上下文控制权移交到当前执行栈的下一个执行上下文。

代码执行过程:

- 创建 **全局上下文** (global EC)
- 全局执行上下文 (caller) 逐行 **自上而下** 执行。遇到函数时, **函数执行上下文** (callee) 被`push`到执行栈顶层
- 函数执行上下文被激活, 成为 active EC, 开始执行函数中的代码, caller 被挂起
- 函数执行完后, callee 被`pop`移除出执行栈, 控制权交还全局上下文 (caller), 继续执行

### 执行上下文的创建

#### **创建阶段**

该对象包含三个部分:

1. 确定 this 指向 - This Binding
2. 确定词法环境(静态作用域/作用域链) - LexicalEnvironment 组件被创建；
3. 确定变量环境 - VariableEnvironment 组件被创建。

```javascript
ExecutionContext = {  
  ThisBinding = <this value>,     // 确定 this 指向
  LexicalEnvironment = { ... },   // 词法环境
  VariableEnvironment = { ... },  // 变量环境
}
```

##### this 指向

* **全局执行上下文中**，this 的值指向全局对象，在浏览器中 this 的值指向 window 对象，而在 nodejs 中指向这个文件的 module 对象；
* **函数执行上下文中**，this 的值取决于函数的调用方式，具体有：默认绑定、隐式绑定、显式绑定、new 绑定、箭头函数。

##### 词法环境

词法环境的两个组成部分

* **环境记录**：存储变量和函数声明的实际位置；
* **对外部环境的引用**：可以访问其外部词法环境(闭包实质)。

词法环境的两个类型

* **全局环境**：是一个没有外部环境的词法环境，其外部环境引用为 null。拥有一个全局对象（window 对象）及其关联的方法和属性（例如数组方法）以及任何用户自定义的全局变量，this 的值指向这个全局对象；
* **函数环境**：用户在函数中定义的变量被存储在函数环境中，包含了 arguments 对象。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。

```javascript
GlobalExectionContext = {  // 全局执行上下文
    LexicalEnvironment: {    	// 词法环境
        EnvironmentRecord: {   	  // 环境记录
            Type: "Object",       // 全局环境
        },
        // 标识符绑定在这里 
        outer: <null> 	      // 对外部环境的引用
    }
}

FunctionExectionContext = { // 函数执行上下文
    LexicalEnvironment: {  	   // 词法环境
        EnvironmentRecord: {  		// 环境记录
            Type: "Declarative",  	// 函数环境
        },
        // 标识符绑定在这里 	  // 对外部环境的引用
        outer: <Global or outer function environment reference>
    }
}
```

##### 变量环境

变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性。

在 ES6 中，词法环境和变量环境的区别在于前者用于存储函数声明和变量（let 和 const）绑定，而后者仅用于存储变量（var）绑定。

使用例子进行介绍

```javascript
let a = 20;  
const b = 30;  
var c;

function multiply(e, f) {  
 var g = 20;  
 return e * f * g;  
}

c = multiply(20, 30);
```

执行上下文如下所示:

```javascript
// 全局执行上下文
GlobalExectionContext = {

    ThisBinding: <Global Object>,

    LexicalEnvironment: {
        EnvironmentRecord: {
            Type: "Object",
            // 标识符绑定在这里  
            a: <uninitialized >,
            b: <uninitialized >,
            multiply: <func >
        },
        outer: <null>
    },

    VariableEnvironment: {
        EnvironmentRecord: {
            Type: "Object",
            // 标识符绑定在这里  
            c: undefined, // 注意: var 这里是初始化了的
        },
        outer: <null>
    }
}  


// 函数执行上下文
FunctionExectionContext = {

    ThisBinding: <Global Object>,

    LexicalEnvironment: {
        EnvironmentRecord: {
            Type: "Declarative",
            // 标识符绑定在这里  
            Arguments: { 0: 20, 1: 30, length: 2 },
        },
        // 这里指向上一级词法环境(全局)
        // 则可以使用到 a b c multiply
        outer: <GlobalLexicalEnvironment>
    },

    VariableEnvironment: {
        EnvironmentRecord: {
            Type: "Declarative",
            // 标识符绑定在这里  
            g: undefined
        },
        outer: <GlobalLexicalEnvironment>
    }
}
```

**变量提升** 原因：在创建阶段，函数声明存储在词法环境中，而变量会被设置为 `undefined`（在 `var` 的情况下）或保持未初始化（在 `let` 和 `const` 的情况下）。所以这就是为什么可以在声明之前访问 `var` 定义的变量（尽管是 `undefined` ），但如果在声明之前访问 `let` 和 `const` 定义的变量就会提示引用错误的原因。这就是所谓的变量提升。

执行上下文创建的时候, `var` 变量进行了初始化为 `undefined` , 而 `let` 和 `const` 变量没有进行初始化. 则在执行上下文执行到 `let` `const` 的声明语句之前, 访问 `let` `const` 变量, 就会报错, 而 var 变量就不会报错, 因为已经进行了初始化.

```javascript
console.log('b:', b)
var b = 5;
// b: undefined
// 注意这里是 undefined
// 运行到 var b = 5 时, 才是 5
```

注意: js 中全局 var 声明的为全局变量, 函数体内 var 声明为局部变量（函数外部访问不到）但是，函数体内未用 var 声明的为全局变量（函数外部可以使用）.

```javascript
var a, b
(function () {
    // 变量提升
    console.log(a, b) // undefined undefined
    var a = b = 3; // 等价于 var a = 3; b = 3; b 是全局变量
    console.log(a, b); // 3 3
    c = 5;
})()
// 均是全局变量
console.log(a, b); // undefined 3
console.log(c); // 5
```

#### **执行阶段**

完成所有变量的分配, 最后执行代码. 如果 JavaScript 引擎在源代码中声明的实际位置找不到 let 变量的值，那么将为其分配 undefined 值。

---

作用域是在函数声明时就确定的变量访问的规则, 执行上下文是函数执行时才产生的变量的环境, **执行上下文基于作用域**进行变量的访问/函数引用等操作.

```javascript
let fn, bar; // 1、进入全局上下文环境
bar = function(x) {
  let b = 5;
  fn(x + b); // 3、进入fn函数上下文环境
};
fn = function(y) {
  let c = 5;
  console.log(y + c); //4、fn出栈, bar出栈
};
bar(10); // 2、进入bar函数上下文环境
```

![img](images/执行上下文.png)

**函数调用栈**: 栈底永远是全局上下文, 栈顶是当前正在执行的上下文(活动对象), 白色是被挂起的变量对象(执行上下文)

*变量对象*

存储所在执行上下文中所有的变量与函数声明（不包含函数表达式）

> 活动对象 (AO): 当变量对象所处的上下文为 active EC 时, 称为活动对象。

*作用域*

该上下文中声明的**变量与声明的作用范围**, 分为**块级作用域**与**函数作用域**。

特性:

- **声明提前**: 一个声明在函数体内都是可见的, 函数优先于变量
- 非匿名自执行函数, 函数变量为 **只读** 状态, 无法修改

```javascript
let foo = function() { console.log(1) };
(function foo() {
    foo = 10  // 由于foo在函数中只为可读, 因此赋值无效
    console.log(foo)
}()) 

// 结果打印：  ƒ foo() { foo = 10 ; console.log(foo) }
```

*作用域链*

在ES5中只存在两种作用域————全局作用域和函数作用域, 当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链. 值得注意的是，每一个子函数都会拷贝上级的作用域，形成一个作用域的链条。

在执行上下文中访问到父级甚至全局的变量, 这便是作用域链的功劳。作用域链可以理解为一组对象列表, 包含 **父级和自身的变量对象**, 因此我们便能通过作用域链访问到父级里声明的变量或者函数。

- 由两部分组成:
  - `[[scope]]`属性: 指向父级变量对象和作用域链, 也就是包含了父级的`[[scope]]`和`AO`
  - AO: 自身活动对象

如此 `[[scope]]`包含`[[scope]]`, 便自上而下形成一条 **链式作用域**。

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

`eat` 函数中没有定义 `desc` 这个变量值, 就沿着作用域链去找, 在 `createFunc` 作用域中找到了 `desc` 变量的值, 于是就使用了。如果还没有找到, 就接着往上找。

当执行 `createFunc` 的时候, `eat` 函数被创建, 此时 `eat` 函数会把外部函数的作用域链记录下来, 留到执行时使用。

> 注意
>
> 作用域链是***函数创建时刻***发生关联的, 不是运行时刻, Called **静态作用域/词法作用域**, 函数被创建即函数被定义。

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

#### 闭包

闭包在 JS 中就是一个以函数和以静态方式存储的父作用域的一个集合体。

形成条件: 函数嵌套 + 内部函数引用外部函数的变量

本质: 当前环境存在对父级作用域的引用.

能够**读取函数局部变量的函数**就是闭包. 下面例子中, `func2`函数就是闭包.

1. 可以读取父函数内部的变量
2. 可以在父函数执行完之后还保留其内部变量
3. 在定义时只取得变量的引用，在执行时才会实际取值

```javascript
var func1 = () => {
  let a = 999;
  // 内部变量存在父级作用域的引用
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
// 外面变量存在父级作用域的引用
let nAdd;
var func1 = () => {
  let a = 999;
  nAdd = function(){
    a++;
  }
  var func2 = () => {
    console.log('a:', a);
  }
  return func2;
}
let func = func1(); // 闭包函数
func(); // a 999
nAdd();
func(); // a 1000
```

证明了 `func1` 的局部变量 `a` 一直在内存中, 并没有在 `func1` 被调用后被自动清除.

因为 `func1 `是 `func2 `的父函数, 而 `func2` 被赋予了局部变量 `func`, 导致 `func2` 一直在内存中, 则 `func2` 依赖的 `func1` 也一直在内存中, 不会在调用结束后, 被垃圾回收机制回收.

> func2 被赋予局部变量 func, func2 依赖于 func1, 因此三者都在内存中不会被回收。

这里 `nAdd` 也是一个匿名函数, 也是一个闭包, 相当于一个 `setter`, 可以在函数外部对函数内部局部变量进行操作。

*使用闭包的注意点*:

1. 闭包会使函数中的局部变量在内存中, 因此会使得**内存占用过多**, 不能滥用。在退出函数前, 将不使用的局部变量全部删除。
2. 闭包会在函数外部, 改变父函数内部变量的值, **注意不要随便改变**。

*闭包表现形式*:

1. 返回一个函数。刚刚已经举例。
2. 作为函数参数传递

```js
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
// 输出2，而不是1
foo();
```

3. 在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。

   以下的闭包保存的仅仅是 `window` 和当前作用域。

```js
// 定时器
setTimeout(function timeHandler(){
  console.log('111');
}，100)

// 事件监听
$('#app').click(function(){
  console.log('DOM Listener');
})
```

4. IIFE(立即执行函数表达式)创建闭包, 保存了`全局作用域 window`和`当前函数的作用域`，因此可以全局的变量。

```js
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();
```

*解决循环输出问题*:

```js
for(var i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}
```

为什么会全部输出6？如何改进，让它输出1，2，3，4，5？(方法越多越好)

因为setTimeout为宏任务，由于JS中单线程eventLoop机制，在主线程同步任务执行完后才去执行宏任务，因此循环结束后setTimeout中的回调才依次执行，但输出i的时候当前作用域没有，往上一级再找，发现了i,此时循环已经结束，i变成了6。因此会全部输出6。

解决方法：

1. 利用IIFE(立即执行函数表达式)当每次for循环时，把此时的i变量传递到定时器中

```js
for(var i = 1;i <= 5;i++){
  (function(j){
    setTimeout(function timer(){
      console.log(j)
    }, 0)
  })(i)
}
```

2. 给定时器传入第三个参数, 作为timer函数的第一个函数参数

```js
for(var i=1;i<=5;i++){
  setTimeout(function timer(j){
    console.log(j)
  }, 0, i)
}
```

3. 使用ES6中的let

```js
for(let i = 1; i <= 5; i++){
  setTimeout(function timer(){
    console.log(i)
  },0)
}
```

let使JS发生革命性的变化，让JS由函数作用域变为了块级作用域，用 `let` 后作用域链不复存在。代码的作用域以块级为单位，以上面代码为例:

```javascript
// i = 1
{
  setTimeout(function timer(){
    console.log(1)
  },0)
}
// i = 2
{
  setTimeout(function timer(){
    console.log(2)
  },0)
}
// i = 3
...
```

因此能输出正确的结果。

##### 应用

函数柯里化

模块化

定义私有变量

```javascript
function outer(){
    var n = 1;
    return {
        get_n:function (){
            return n;
        },
        set_n:function (s){
            n = s;
        }
    }
}
var o = outer();
console.log(o.get_n());// 1
o.set_n(2);
console.log(o.get_n());// 2
```

上面的代码，封装了一个“私有变量”n，在外部无法直接读写，但是可以通过get_n和set_n两个函数来读写

注意:

闭包内使用循环

```javascript
function outer(){
    var result = [];
    for(var i = 0;i < 3;i++){
        result[i] = function (){
            console.log(i);
        }
    }
    return result;
}
var o = outer();
o[0](); // 3
o[1](); // 3
o[2](); // 3
```

上述问题解决:

将闭包修改为立即执行的函数, 传入当时的 i 值, 相当于把 i 复制了一份, 但是已经不是 outer 函数中的那个 i 了.

```javascript
function outer(){
    var result = [];
    for(var i = 0;i < 3;i++){
        result[i] = (function (i){
             return function (){
               // 这里的 i 是对上层函数中变量 i 的引用
                console.log(i);
            }
        })(i); // 调用函数 传入 i 当时的值
    }
    return result;
}
var o = outer();
o[0]();
o[1]();
o[2]();
```

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

console.log(object.getNameFunc()()); // 浏览器 The Window

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
2. 不是一个 Array, 只是类似, 类型是 object, 类数组
3. 只有  length 和索引元素功能
4. 可以被转换为真正的数组

```javascript
function unique (a, b, c, d, e) {
  console.log(arguments[1]); // 2
  // 参数被设置
  arguments[1] = 3;
  arguments[4][0] = 'Mary';
  console.log(arguments[1], arguments[4]); // 3 [ 'Mary', 'hi', 'go' ]

  // arguments转换为数组的几种方法
  
  // 方法一
  let args0 = Array.prototype.slice.call(arguments);
  // 类似方法一
  let args1 = [].slice.call(arguments);
  // 对参数使用slice会阻止某些JavaScript引擎中的优化 (比如 V8 - 更多信息)
  // 注重性能 使用被忽视的Array构造函数作为一个函数
  
  // 方法二
  let args = (arguments.length === 1 ? [arguments[0]] : Array.prototype.concat.apply([], arguments));
  
  // ES6
  // 方法三
  let args3 = Array.from(arguments);
  
  // 方法四
  let args4 = [...arguments];
  
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

## 类型判断

判断变量数据类型

### 使用 `typeof` 操作符判断基本类型

原始类型显示正确类型(除了 null)

```javascript
typeof 1 // 'number'
typeof NaN // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
// 历史遗留原因
typeof null // 'object'
```

引用类型显示 object (函数显示 function)

```javascript
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'

// 判断数组可以用 Array.isArray
console.log(Array.isArray([1, 2, 3])) // true
```

### 使用 instanceof 判断对象

instanceof 用于判断一个变量是否是某个对象的实例.

使用 typeof 无法判断对象数据类型, 使用 instanceof 更好, 在对象的原型链上查找函数的原型, 找到即为 true

```javascript
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str1 = 'hello world'
str1 instanceof String // false

var str2 = new String('hello world')
str2 instanceof String // true
```

### 使用 instanceof 判断基本类型

自定义instanceof行为的一种方式，这里将原有的instanceof方法重定义，换成了typeof，因此能够判断基本数据类型。

看[MDN上关于hasInstance的解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance)。

```javascript
class PrimitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number'
  }
}
console.log(111 instanceof PrimitiveNumber) // true
```

### 判断封装

- 基本类型(`null`): 使用 `String(XXX)` 是否为 `null`, 因为 `String(null)=== 'null'`
- 基本类型(`string / number / boolean / undefined`) + `function`: 直接使用 `typeof` 即可
- 其余引用类型(`Array / Date / RegExp / Error`): 调用`toString`后根据`[object XXX]`进行判断

类型判断封装代码：

```javascript
let class2type = {}
'Array Date RegExp Object Error'.split(' ').forEach(e => class2type[ '[object ' + e + ']' ] = e.toLowerCase()) 

function type(obj) {
    if (obj == null) return String(obj)
    return typeof obj === 'object' ? class2type[ Object.prototype.toString.call(obj) ] || 'object' : typeof obj
}
```

## 类型转换

类型转换只有三种:

1. 转换为数字
2. 转换为布尔值
3. 转换为字符串

相关规则:

![img](images/类型转换.jpg)

转换时机:

JS 中在使用**运算符**或者**对比符**时, 会自带**隐式转换**, 规则如下:

- -、*、/、%、== ：一律转换成数值后计算
- +：
  - 数字 + 字符串 = 字符串, 运算顺序是从左到右
  - 数字 + 对象, 优先调用对象的`valueOf` -> `toString`
  - 数字 + `boolean/null` -> 数字
  - 数字 + `undefined` -> `NaN`
- `[1].toString() === '1'`
- `{}.toString() === '[object object]'`
- `NaN` !== `NaN` 、`+undefined 为 NaN`
- []==![] 两边均转为数字, 左边 [] 转为数字 0 , 右边 ![] 先转换为布尔值再为数字, []->true, ![]->false->0

对象转原始类型:

函数调用顺序如下, 有一个有返回值的则返回, 都没有返回值则抛错.

1. 调用 [Symbol.toPrimitive]
2. 调用 valueof()
3. 调用 toString()

```javascript
var obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6
  }
}
console.log(obj + 1); // 输出7
```

应用:

让 `if(a == 1 && a == 2)` 条件成立

让变量为对象, 在与数字相比较的过程中, 对象会先隐式转换为字符串, 再与数字比较.

这里重写 valueOf 方法, 使得每调用一次, value 就自增 1 .

```javascript
var a = {
  value: 0,
  valueOf: function() {
    this.value++;
    return this.value;
  }
};
console.log(a == 1 && a == 2);//true
```

## 比较运算符

### ==（非严格相等）

**相等操作符**，只会对比两个值是否相等，相等则会返回 true。在这种情况下，如果对比的值类型不同，则会自动将值隐式转换成一种常见的类型。

== 转换规则如下:

- 两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
- 判断的是否是null和undefined，是的话就返回true
- 判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较
- 判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较
- 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较

```javascript
console.log(1 == '1') // true
console.log(true == 'true') // false true转为number
console.log(NaN == 'NaN') // false
console.log(NaN == NaN) // false
console.log(-0 == 0) // true
console.log(0 == '0') // true string转number
console.log(undefined == undefined) // true
console.log({ name: "Tom" } == { name: "Tom" }) // false

const a = { name: "Tom" }
const b = a
console.log(a == b) // true
```

使用`==`总结：

* `NaN` 不等于包含它在内的任何东西
* -0 等于 0
* `null` 等于 `null` 和 `undefined`
* 操作只可以自动转换为 String、Boolean、Number
* String 类型比较区分大小写
* 两个操作值如果引用同一个对象，返回 true，否则 false
* 请记住 6 个虚值（null，undefined，''，0，NaN，false）

### ===（严格相等）

**全等操作符**，和 `==` 很相似，区别在于 `===` 不执行隐式转换。当两个操作值的值和类型都相等的情况下，才会返回 `true`。

```javascript
console.log(1 === '1') // false
console.log(true === 'true') // false
console.log(true === true) // true
console.log(NaN === NaN) // false
console.log(null === null) // true
console.log('ara' == 'Ara') //false
console.log(-0 === 0) // true
console.log(null === undefined) // false
console.log(undefined === undefined) // true
console.log({ name: "Tom" } === { name: "Tom" }) // false
```

使用`===`总结：

* `NaN` 不等于包含它在内的任何东西
* -0 等于 0
* null 等于 null，但不等于 undefined
* String 严格区分大小写
* 两个操作值如果引用同一个对象，返回 true，否则 false

### Object.is()（同值相等）

Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN。

源码:

```javascript
function is(x, y) {
  if (x === y) {
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return x !== x && y !== y;
  }
}
```

**同值相等**，是比较运算符中的一份子。在检查两个操作值是否相等时，用到了以下规则：

规则1：操作值均未被定义（`undefined`）

```javascript
let a
let b
Object.is(a, b) // true
```

规则2：操作都是相同长度和顺序的字符串

```javascript
Object.is('abcdefg', 'abcdefg') // true
Object.is('abcdefg', 'ABCDEFG') // false
```

规则3：操作值都是 null

```javascript
Object.is(null, null) // true
Object.is(null, 'null') // false
```

规则4：操作值为对象且引用地址相同

```javascript
let a = { name: "Tom" }
let b = a

Object.is(a, b) // true
Object.is({ name: "Tom" }, { name: "Tom" }) // false
Object.is(window, window) // true
```

规则5：操作值均非0和非NaN

```javascript
Object.is(1, 1) // true
Object.is(1, 2) // false
```

规则6：操作值都是 +0 或 -0

```javascript
Object.is(0, 0) // true
Object.is(0, -0) // false
```

规则7：操作值为 `NaN`

与前面两种运算符**最大的不同**在这里。

```javascript
Object.is(NaN, NaN) // true
Object.is(NaN, 0/0) // true
```

polyfill

> Object.is() 不支持 IE，因此使用 polyfill 代替

```javascript
if(!Object.is) {
  Object.is = function(a, b) {
    if(a === b) {
      return a !== 0 || 1/a === 1/b
    } else{
      return a !== a && b !== b
    }
  }
}
```

## let const var

暂时性死区的本质是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

参考[阮一峰es6](https://www.yuque.com/ostwind/es6/docs-let)

const 常量, 变量名与内存地址之间建立了不可变的绑定关系.

```javascript
let obj = { 0: 1 };
const a = obj; // a 存储的是引用地址 不会改变
obj = { 2: 3 } // obj 换了引用地址
console.log(a); // { '0': 1 }
```

let const 和 var 的对比：


| 内容 | let/const | var |
| - | - | - |
| 变量提升 | 否 | 是 |
| 重复声明 | 不可以 | 可以 |
| 作用域 | 块级 | 全局 |

1. 在同一个作用域内，var 可以重复声明变量，let、const 不能重复声明同一个变量。

* ES5 是函数作用域，即一个函数内就是一个作用域，ES6 是块级作用域，花括号内就是一个作用域。

2. var 有变量提升，可以在变量声明前使用，let、const 不存在变量提升，在变量前使用会报错
3. let、const 有**暂时性死区**，即父作用域中有 var 定义，在块作用域中又定义了 let、const，那再 let、const 之前使用就是死区
4. const 必须在声明的时候赋值；const 声明的变量不能再修改
5. let、const 只在块级作用域中有效，而 var 全局有效

### 变量提升

> 变量提升: 一种现象，因为编译器在预编译的时候，第一步只会记录变量和函数的定义，第二步才会执行程序。

let 和 const 定义的变量都会被提升，但是不会被初始化（没有初始值），不能被引用，而 var 定义的变量有初始值 undefined，可以被引用。 这么设计的主要原因是，const 的引用不能被改变，如果初始化为 undefined，后来又等于我们定义的值，则改变了引用。

```javascript
> console.log(foo)
Uncaught ReferenceError: foo is not defined
> console.log(foo);let foo = 123;
Uncaught ReferenceError: Cannot access 'foo' before initialization
```

### 块级作用域

```javascript
// 使用 var
var result = new Array();
for (var i=0; i<10; i++) {
  result[i] = function() {
    return i;
  }
}
// 所有的 i 都是同一个引用
console.log(result[0]())       // 打印10

// 使用 let
var result = new Array();
for (let i=0; i<10; i++) {
  result[i] = function() {
    return i;
  }
}
// 每次循环中, 都会创建一个新的 let i
// let 只在块级作用域有效, 因此不会报错
console.log(result[0]());	// 打印0
```

### const 关键字

声明常量, 声明时必须初始化(赋值), 初始化后值不能改变.

```javascript
// 错误写法
const PI;
PI = 3.14159265359;

// 正确写法
const PI = 3.14159265359;
```

常量的本质并非不能修改, 声明对象或者数组时, 内容是可以修改的, 但是引用地址不能改变, 即不能重新对常量对象以及常量数组赋值.

```javascript
// 创建常量对象
const car = {type:"Fiat", model:"500", color:"white"};
// 修改属性:
car.color = "red";
// 添加属性
car.owner = "Johnson";

// 创建常量数组
const cars = ["Saab", "Volvo", "BMW"];
// 修改元素
cars[0] = "Toyota";
// 添加元素
cars.push("Audi");
```

# 内置对象 Function

## Function.prototype.call()/apply()/bind()

这里使用 Node 与浏览器的运行结果不同(原因待深究), 下面为在浏览器中的运行结果.

```javascript
var name = "Mary", age = 18;
var obj = {
  name: 'XiaoMing', 
  objAge: this.age, // this 指上一层, 这里即是 全局对象
  speak: function () {
    // this 是上一层, 这里即是 obj 对象
    console.log(this.name + ' is ' + this.objAge + '*' + this.age);
  }
}

console.log(obj.objAge); // 18
obj.speak(); // XiaoMing is 18*undefined
```

`this` 指上一层, 这里指向 `window`.

```javascript
var name = 'Bob';
function speak(){
  console.log(this.name);
}
speak(); // Bob
```

**用法: call apply bind 都是用来改变 this.**

在调用 obj.speak 函数时, 函数中含有 this, call/apply/bind 都是用来指定函数中的 this 指谁的, 这里传参是 newObj, 则指的是 newObj 这个对象。

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
obj.speak.bind(newObj, ['合肥', '上海'])(); // Cookie is 40 合肥, 上海*undefined
```

> **性能: call > apply**
>
> call 传入参数的格式正是内部需要的格式, apply 内部多了对数组的解构(apply多了`CreateListFromArrayLike`的调用)

# 对象 Object

使用 `{}` 表示, 键必须是字符串或者 `Symbol` 类型。不是字符串的话会转换成字符串, 对象的话默认调用 toString 方法。

下面的例子中, 对象转换为字符串后, 键值都是 [object Object] , 因此这里值可以被更改。

```javascript
var a = {}, b = { key: '123' }, c = { key: '456' };
a[b] = 'b'; // a = { '[object Object]': 'b' }
a[c] = 'c'; // a = { '[object Object]': 'c' }
console.log(a[b]); // c
```

`a.b.c.d` 比`a['b']['c']['d']`性能更高.

因为前者只用考虑字符串的情况, 后者还需要考虑括号中是变量的情况. 从结果来看, 编译器解析前者更容易些, 因此前者更快.

## toString 与 valueof 区别

toString() 返回一个反映这个对象的字符串

valueof() 返回对象相应的原始值, 调用 valueOf() 方法用来把对象转换成原始类型的值（数值、字符串和布尔值）

默认情况下, valueOf() 会被每个对象Object继承。每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果对象没有原始值，valueOf() 就会返回对象自身

https://www.cnblogs.com/imwtr/p/4392041.html

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

参考:https://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html

### 原始模式

原始模式生成的对象, 对象之间没有联系, 无法反应他们是同一个原型对象的实例.

### 构造函数模式

js 提供了构造函数模式, 构造函数是一个普通函数, 但是内部使用了 this 变量,对构造函数使用`new`运算符，就能生成实例，并且`this`变量会绑定在实例对象上。

缺点: 浪费内存. 每次生成一个实例，都包含构造函数所有属性, 都有重复的内容，多占用一些内存。这样既不环保，也缺乏效率。

### prototype 模式

Javascript规定，每一个构造函数都有一个`prototype`属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。这意味着，可以把那些不变的属性和方法，直接定义在`prototype`对象上, 提高了运行效率。

`isPrototype()`

```javascript
console.log(Cat.prototype.isPrototypeOf(cat1)) // true
console.log(Cat.prototype.isPrototypeOf(cat2)) // true
```

`hasOwnProperty()`

每个实例对象都有一个`hasOwnProperty()`方法，用来判断某一个属性到底是本地属性，还是继承自`prototype`对象的属性。

```javascript
console.log(cat1.hasOwnProperty("name")); // true
// type 是原型对象的属性
console.log(cat1.hasOwnProperty("type")); // false
```

`in`运算符

可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。

```
alert("name" in cat1); // true
alert("type" in cat1); // true
```

`in` 运算符还可以用来遍历某个对象的所有属性。

```javascript
for(var prop in cat1) { alert("cat1["+prop+"]="+cat1[prop]); }
```

## 继承

各种继承方式 https://juejin.cn/post/6914216540468576263#heading-4

### 构造函数继承

一个"动物"对象的构造函数。

```javascript
function Animal(){
　　this.species = "动物";
}
```

一个"猫"对象的构造函数。

```javascript
function Cat(name,color){
　　this.name = name;
　　this.color = color;
}
```

怎样才能使"猫"继承"动物"呢？

1. 构造函数绑定

   使用call或apply方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：

   ```javascript
   function Cat (name, color) {
     // 新生成的实例对象会调用 Animal 构造函数, 使自己具有 species 属性
     Animal.apply(this, arguments);
     this.name = name;
     this.color = color;
   }

   var cat1 = new Cat("大毛", "黄色");
   alert(cat1.species); // 动物
   ```

   优点: `Parent` 中的属性不会被子类共享, 不会出现实例改动父类属性而导致父类属性改变的情况.

   缺点: 无法拿到 `Parent.prototype` 中的属性与方法
2. `prototype` 模式(原型链)

   ```javascript
   function Animal(){
     this.species = "动物"
   }

   function Cat (name, color) {
     this.name = name;
     this.color = color;
   }

   // 相当于完全删除了prototype 对象原先的值，然后赋予一个新值
   Cat.prototype = new Animal();
   // 这个构造函数的指向也要加上
   // 由于上一句的存在, 这里 Cat.prototype.constructor 指向 Animal
   // 但是 Cat 的原型对象的构造函数必须要指向 Cat 构造函数,否则会导致继承链的混乱
   Cat.prototype.constructor  = Cat;

   var cat1 = new Cat("大毛", "黄色");
   console.log(cat1.species); // 动物
   ```

   这是很重要的一点，编程时务必要遵守。下文都遵循这一点，即如果替换了prototype对象，

   ```javascript
   o.prototype = {};
   ```

   那么，下一步必然是为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数。

   ```javascript
   o.prototype.constructor = o;
   ```

   优点: 拿到 Parent.prototype 中的属性与方法

   缺点: Parent 中的属性被共享

   > 组合继承 (前面两种方法的组合版本)
   >

   ```javascript
     function Parent3 () {
       this.name = 'parent3';
       this.play = [1, 2, 3];
     }
     function Child3() {
       Parent3.call(this);
       this.type = 'child3';
     }
     Child3.prototype = new Parent3();
     var s3 = new Child3();
     var s4 = new Child3();
     s3.play.push(4);
     console.log(s3.play, s4.play);
   // [1,2,3,4] [1,2,3]
   ```

   优点: 父类属性不共享 + Parent.prototype 方法可用

   缺点: Parent 的构造函数多执行了一次(`Child3.prototype = new Parent3();`)

   > 组合继承的优化1
   >

   ```javascript
     function Parent4 () {
       this.name = 'parent4';
       this.play = [1, 2, 3];
     }
     function Child4() {
       Parent4.call(this);
       this.type = 'child4';
     }
     // 这里不用多使用 new 构造父类实例来获取 Parent.prototype
     // 而是直接指向 这样父类的构造函数只执行了一次
     Child4.prototype = Parent4.prototype;
     // 同时修改子类原型对象的构造函数指向
     Child4.prototype.constructor = Child4;
   ```

   > 组合继承的优化2(最推荐, 也叫 **寄生组合继承**)
   >

   ```javascript
     function Parent5 () {
       this.name = 'parent5';
       this.play = [1, 2, 3];
     }
     function Child5() {
       Parent5.call(this);
       this.type = 'child5';
     }
     Child5.prototype = Object.create(Parent5.prototype);
     Child5.prototype.constructor = Child5;
   ```

   其中, `Object.create`的实现细节是:

   ```javascript
   function create(p){
     // 利用空对象做中介 在 Child.prototype 和 Parent.prototype 中间加了一层 fn 实例
     function fn(){}
     fn.prototype = p;
     return new fn();
   }
   ```

   *继承的问题*

   继承的最大问题在于：无法决定继承哪些属性，所有属性都得继承。

   当然你可能会说，可以再创建一个父类啊，把加油的方法给去掉，但是这也是有问题的，一方面父类是无法描述所有子类的细节情况的，为了不同的子类特性去增加不同的父类，`代码势必会大量重复`，另一方面一旦子类有所变动，父类也要进行相应的更新，`代码的耦合性太高`，维护性不好。

   使用**组合**思想解决继承的问题

   先设计一系列零件, 将零件进行拼装, 用来形成不同的实例或者类.

   ```javascript
   function drive(){
     console.log("wuwuwu!");
   }
   function music(){
     console.log("lalala!")
   }
   function addOil(){
     console.log("哦哟！")
   }

   let car = compose(drive, music, addOil);
   let newEnergyCar = compose(drive, music);
   ```
3. 直接继承 prototype

   第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。

   现在，我们先将Animal对象改写：

   ```javascript
   function Animal(){ }
   Animal.prototype.species = "动物";
   ```

   然后，将 Cat 的 prototype 对象，然后指向 Animal 的 prototype 对象，这样就完成了继承。

   ```javascript
   Cat.prototype = Animal.prototype;
   Cat.prototype.constructor = Cat;
   var cat1 = new Cat("大毛","黄色");
   alert(cat1.species); // 动物
   ```

   与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。

   缺点是 `Cat.prototype` 和 `Animal.prototype` 现在指向了同一个对象，那么任何对 `Cat.prototype` 的修改，都会反映到 `Animal.prototype`。

   所以，上面这一段代码其实是有问题的。请看第二行

   ```javascript
   Cat.prototype.constructor = Cat;
   ```

   这一句实际上把 `Animal.prototype` 对象的 `constructor` 属性也改掉了！

   ```javascript
   alert(Animal.prototype.constructor); // Cat
   ```
4. 利用空对象做中介

   ```javascript
   function Animal () { }
   Animal.prototype = {
     species: "动物"
   }

   function Cat (name, color) {
     this.name = name;
     this.color = color;
   }

   function F () { }
   F.prototype = Animal.prototype;

   // F是空对象，所以几乎不占内存。
   // 这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。
   Cat.prototype = new F();
   Cat.prototype.constructor = Cat;

   var cat1 = new Cat("大毛", "黄色");
   console.log(cat1.species, Cat.prototype); // 动物
   ```

   将上述方法封装为一个函数, 便于使用.

   ```javascript
   // 这个extend函数，就是YUI库如何实现继承的方法。
   function extend (Child, Parent) {
     function F () { }
     F.prototype = Parent.prototype;
     Child.prototype = new F();
     Child.prototype.constructor = Child;
     Child.uber = Parent.prototype;
   }
   ```

   使用的时候，方法如下:

   ```javascript
   extend(Cat,Animal);
   var cat1 = new Cat("大毛","黄色");
   console.log(cat1.species); // 动物
   ```

   说明一点，函数体最后一行

   ```javascript
   Child.uber = Parent.prototype;
   ```

   意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
5. 拷贝继承

   将父类的原型对象的所有属性全部拷贝进子类的原型对象中.

   首先，还是把 Animal 的所有不变属性，都放到它的 prototype 对象上。

   ```javascript
   function Animal(){}
   Animal.prototype.species = "动物";
   ```

   然后，再写一个函数，实现属性拷贝的目的。

   ```javascript
   function extend2 (Child, Parent) {
     var p = Parent.prototype;
     var c = Child.prototype;
     for (var i in p) {
       c[i] = p[i];
     }
     c.uber = p;
   }
   ```

   将父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象。

   使用的时候，方法如下：

   ```javascript
   extend2(Cat, Animal);
   var cat1 = new Cat("大毛","黄色");
   console.log(cat1.species); // 动物
   ```

### 非构造函数继承

两个普通对象之间进行继承, 不能使用构造函数.

```javascript
var Chinese = {
  nation: "中国"
}

var Doctor = {
  career: "医生"
}
```

1. Object 方法

   ```javascript
   var Chinese = {
     nation: "中国"
   }

   var Doctor = {
     career: "医生"
   }

   function object (parent) {
     function F () { }
     F.prototype = parent;
     return new F();
   }

   var doctor = object(Chinese);
   doctor.career = "医生";
   console.log(doctor.nation); // 中国
   ```
2. 浅拷贝

   另一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。

   ```javascript
   var Chinese = {
     nation: "中国",
     birthPlaces: ["上海", "合肥", "天津"]
   }

   var Doctor = {
     career: "医生"
   }

   function extendCopy (parent) {
     let child = {};
     for (let i in parent) {
       child[i] = parent[i]
     }
     return child;
   }

   let doctor = extendCopy(Chinese)
   console.log(doctor.birthPlaces); // [ '上海', '合肥', '天津' ]

   doctor.birthPlaces.push("厦门")
   console.log(doctor.birthPlaces, Chinese.birthPlaces);
   // [ '上海', '合肥', '天津', '厦门' ] [ '上海', '合肥', '天津', '厦门' ]
   ```

   但是子对象对属性的更改可能会引起父对象的同步更新. extendCopy()只是拷贝**基本类型的数据**，我们把这种拷贝叫做"浅拷贝"。这是早期jQuery实现继承的方式。
3. 深拷贝

   所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了。

   ```javascript
   var Chinese = {
     nation: "中国",
     birthPlaces: ["上海", "合肥", "天津"]
   }

   var Doctor = {
     career: "医生"
   }

   // 将 p 对象中的属性拷贝进 c
   function deepCopy (p, child) {
     var c = child || {};
     for (let i in p) {
       if (typeof p[i] === "object") {
         // 进一步判断是数组还是对象
         c[i] = Array.isArray(p[i]) ? [] : {};
         deepCopy(p[i], c[i]);
       } else {
         c[i] = p[i];
       }
     }
     return c;
   }

   let doctor = deepCopy(Chinese);
   doctor.birthPlaces.push("北京");
   // 子类属性的修改不影响父类
   console.log(Chinese.birthPlaces, doctor.birthPlaces);
   // [ '上海', '合肥', '天津' ] [ '上海', '合肥', '天津', '北京' ]
   ```

   目前，jQuery库使用的就是这种继承方法。

## 创建对象

创建一个对象, 定义属性和方法, 不需要 `Class`. 对象中的方法就是保存函数的那个属性.

这里直接使用原始方式创建对象, 没有继承.

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

显式修改方法的调用对象。

使用函数的 `call` 方法, 该方法将 `this` 值作为第一个参数, 其他参数为普通参数. 则此时 `obj` 是 `eat` 方法的调用者, 通过 `call` 进行了显式的调用对象的修改.

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

一个简单的对向, 用于实现对象的属性继承, 可以简单理解为对象的爹。

对象有自己的默认属性集。

> 一个对象查看原型的方法
>
> 1. 任何对象都可以通过 `__proto__`属性查看自己的原型, 即 `obj.__proto__`。
> 2. `Object.getPrototypeOf` 方法返回一个对象的原型。`Object.prototype` 提供在所有对象中显示的方法, 最根部原型。
>
> 函数派生自 `Function.prototype`, 数组派生自 `Array.prototype`, 他们具有不同的默认属性集。

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

### `__proto__` 属性

继承是让两个对象产生关联, 使用 `__proto__`, 这个属性每个对象都有.

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

如下所示, 对象 `dog` 和 `cat` 的原型均是 `animal`, 但是均没有定义 `eat` 方法。在执行 `eat` 方法时, 会到其原型中去寻找, 如果找到则执行, 没有则继续去原型的原型中去寻找, 直至找到或者为`null`。不断寻找原型的过程依赖于`__proto__`建立的**原型链**。

可以看出, 尽管执行的是原型中的方法, 但是方法中的`this`仍然指的是调用该方法的上级对象, 由于是 `dog ` 和 `cat `这两个对象进行调用的, 所以 this 指向的就是这两个对象而不是 `animal`。

### 构造函数

但是 JS 也可以通过 `new` 关键字来创建对象, 是给不理解原型链又需要创建对象的程序员使用的。

定义：可以通过 new 关键字**新建对象**的函数。

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

### 实例

通过构造函数和 `new` 创建出来的对象即是实例, 实例通过 `__proto__`指向原型, 通过 `constructor` 指向构造函数。

```javascript
实例.__proto__ === 原型

原型.constructor === 构造函数

构造函数.prototype === 原型

// 这条线其实是是基于原型进行获取的, 可以理解成一条基于原型的映射线
// 例如: 
// const o = new Object()
// o.constructor === Object   --> true
// o.__proto__ = null;
// o.constructor === Object   --> false
// 注意: 实例上并不是真正有 constructor 这个指针, 它其实是从原型链上获取的
// instance.hasOwnProperty('constructor') === false
实例.constructor === 构造函数
```

![img](https://user-gold-cdn.xitu.io/2019/2/14/168e9d9b940c4c6f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### prototype

JS  使用更加高效的方式, 创建一个原型对象 A, 将方法都放在这个原型对象 A 中, 而通过同一个构造函数创建的对象的原型, 都是这个原型对象 A, 这样对象找不到方法时, 就会去其原型即 A 中寻找。

达到这样的效果, 则需要将构造函数与原型对象 A 关联起来, 将 A 赋值给构造函数的 `prototype` 属性, 则 A 就会成为这个构造函数创建的对象的原型.

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

上述语法有点复杂, JS 推出语法糖, 将构造函数与原型对象的函数写在一个 `class` 中。

上述写法等同于下面这种。

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

### 原型链

由原型对象组成, 每个对象都有 `__proto__` 属性, 指向创建该对象的构造函数的原型, `__proto__` 将对象连接起来组成了原型链, 是一个用来实现继承与属性共享的有限的对象链。

- **属性查找机制**: 当查找对象的属性时, 如果实例对象自身不存在该属性, 则沿着原型链往上一级查找, 找到时则输出, 不存在时, 则继续沿着原型链往上一级查找, 直至最顶级的原型对象`Object.prototype`, 如还是没找到, 则输出 `undefined`；
- **属性修改机制**: 只会修改实例对象本身的属性, 如果不存在, 则进行添加该属性, 如果需要修改原型的属性时, 则可以用: `b.prototype.x = 2`；但是这样会造成所有继承于该对象的实例的属性发生改变。

## 类 Class

一种语法糖, 特殊的函数, 由**类表达式**和**类声明**组成。类定义了一种对象的形状, 具有哪些属性与方法, 而这种对象称之为**类的实例**。

JS 类就是带有 `prototype` 属性的构造函数。类中的方法, 都是构造函数原型对象中的方法。类中的`constructor`方法是实际的构造函数, 并被绑定名称 `Animal`。

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

构造函数可以使用`super`调用父类的构造函数

### new 运算符执行过程

- 新生成对象
- 连接到原型：`obj.__proto__ = Con.prototype`
- 绑定 `this`：`apply`（参数以数组形式传递）
- 返回新对象（如果构造函数自己有 `return` 时, 返回该值）

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
console.log([1, 2, 3].toString()); // 1, 2, 3

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

某种情况下, 如果确实需要使用普通对象来作为映射, 则 `Object.keys` 只返回一个**对象自己的键, ** 而不包括其原型中的那些属性.

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

继承允许我们构造与已有数据类型相似的数据类型。在 js 中, 继承通常指的是 **原型链继承**, 也就是通过指定原型, 并可以通过原型链继承原型上的属性或者方法。

最优化：圣杯模式

```javascript
var inherit = (function (c, p) {
    var F = function () { };
    return function (c, p) {
        F.prototype = p.prototype;
        c.prototype = new F();
        c.uber = p.prototype;
        c.prototype.constructor = c;
    }
})();

// 或者使用 ES6 的语法糖 class/extends
```

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

判断一个实例是否属于某个类（判断类型或者父类的实例）, 即是否能在实例的 **原型对象链** 中找到该构造函数的 `prototype` 属性所指向的**原型对象**, 找得到就返回 `true`。

```javascript
// __proto__: 代表原型对象链
instance.[__proto__...] === instance.constructor.prototype

// return true
```

使用示例：

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

参考实现：

```javascript
function myInstanceof(left, right) {
    if (typeof right !== "function") throw new Error("right not a function");
    // 左边必须得是个对象, 不能为空
    if (!left || typeof left !== "object" && typeof left !== "function") return false;
    // 遍历 left 的原型链, 直到找到 right
    let leftVal = left.__proto__;
    let rightVal = right.prototype;
    while (leftVal) {
        // 这里判断对象相等, 判断的是引用, 因为在 JS 中只有一个
        // 平时判断对象相等, 得逐个判断属性或者转成 string
        if (leftVal === rightVal) return true;
        leftVal = leftVal.__proto__;
    }
    return false;
}

myInstanceof(() => { }, Function); // true
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

# 代码复用

当代码开始写第二遍时, 就可以开始考虑是否复用。

以下几种方式：

1. 函数封装
2. 继承
3. 复制 `extend`
4. 混入 `mixin`
5. 借用 `apply`/`call`

# 函数式编程

## 定义

函数式编程是一种 **编程范式**, 可以理解为一种软件架构的思维模式。它有着独立一套理论基础与边界法则, 追求的是 **更简洁、可预测、高复用、易测试**。其实在现有的众多知名库中, 都蕴含着丰富的函数式编程思想, 如 React / Redux 等。

摩尔定律失效, 多核时代来临, 函数式编程能够很好地为并发编程服务, 具有 没有 side effect/ 不共享变量/安全调度到任何一个CPU core 上运行/没有加锁问题...等诸多优点。

- 函数式编程其实是一种编程思想, 它追求更细的粒度, 将应用拆分成一组组极小的单元函数, 组合调用操作数据流；
- 它提倡着 纯函数 / 函数复合 / 数据不可变, 谨慎对待函数内的 状态共享 / 依赖外部 / 副作用；

**常见编程范式**

- 命令式编程(过程化编程): 更关心解决问题的步骤, 一步步以语言的形式告诉计算机做什么；
- 事件驱动编程: 事件订阅与触发, 被广泛用于 GUI 的编程设计中；
- 面向对象编程: 基于类、对象与方法的设计模式, 拥有三个基础概念: 封装性、继承性、多态性；
- 函数式编程
  - 换成一种更高端的说法, 面向数学编程

> 注意：
>
> 编程范式之间, 其实并不矛盾, 各有各的 **优劣势**。
>
> 理解和学习它们的理念与优势, 合理地 **设计融合**, 将优秀的软件编程思想用于提升我们应用；
>
> 所有设计思想, 最终的目标一定是使我们的应用更加 **解耦颗粒化、易拓展、易测试、高复用, 开发更为高效和安全**；
>
> 有一些库能让大家很快地接触和运用函数思想: `Underscore.js` / `Lodash/fp` / `Rxjs` 等。

## 好处

- 函数副作用小, 所有函数独立存在, 没有任何耦合, 复用性极高；
- 不关注执行时间, 执行顺序, 参数, 命名等, 能专注于数据的流动与处理, 能有效提高稳定性与健壮性；
- 追求单元化, 粒度化, 使其重构和改造成本降低, 可维护、可拓展性较好；
- 更易于做单元测试。

## 理念

### 纯函数（确定性函数）

**特点**

1. 对于相同的输入, 永远有相同的输出. 没有可观察的副作用, 不依赖外部条件。
2. 不能修改传递给函数的参数
3. 不能修改全局变量

**优点**

- 完全独立, 与外部解耦；
- 高度可复用, 在任意上下文, 任意时间线上, 都可执行并且保证结果稳定；
- 可测试性极强；
- 有效降低系统复杂性
- 可缓存性

我们常用到的许多 API 或者工具函数, 它们都具有着纯函数的特点, 如`split / join / map`, 比如数组操作中, 对于给定的数组, `slice` 就是纯的, `splice` 就是不纯的。

```javascript
import _ from 'lodash';
var sin = _.memorize(x => Math.sin(x));

//第一次计算的时候会稍慢一点
var a = sin(1);

//第二次有了缓存, 速度极快
var b = sin(1);
```

### 函数复合

将多个函数进行组合后调用, 可以实现将一个个函数单元进行组合, 达成最后的目标；

- **扁平化嵌套**: 首先, 我们一定能想到组合函数最简单的操作就是 包裹, 因为在 JS 中, 函数也可以当做参数:

  - `f(g(k(x)))`: 嵌套地狱, 可读性低, 当函数复杂后, 容易让人一脸懵逼；
  - 理想的做法: `xxx(f, g, k)(x)`
- **结果传递**: 如果想实现上面的方式, 那也就是`xxx`函数要实现的便是: 执行结果在各个函数之间的执行传递；

  - 这时我们就能想到一个原生提供的数组方法: `reduce`, 它可以按数组的顺序依次执行, 传递执行结果；
  - 所以我们就能够实现一个方法`pipe`, 用于函数组合:

  ```javascript
  // ...fs: 将函数组合成数组；
  // Array.prototype.reduce 进行组合；
  // p: 初始参数；
  const pipe = (...fs) => p => fs.reduce((v, f) => f(v), p)
  ```
- **使用**: 实现一个 驼峰命名 转 中划线命名 的功能:

  ```javascript
  // 'Guo DongDong' --> 'guo-dongdong'
  // 函数组合式写法
  const toLowerCase = str => str.toLowerCase()
  const join = curry((str, arr) => arr.join(str))
  const split = curry((splitOn, str) => str.split(splitOn));

  const toSlug = pipe(
  	toLowerCase, 
  	split(' '), 
  	join('_'), 
  	encodeURIComponent, 
  );
  console.log(toSlug('Guo DongDong'))
  ```
- **好处**:

  - 隐藏中间参数, 不需要临时变量, 避免了这个环节的出错几率；
  - 只需关注每个纯函数单元的稳定, 不再需要关注命名, 传递, 调用等；
  - 可复用性强, 任何一个函数单元都可被任意复用和组合；
  - 可拓展性强, 成本低, 例如现在加个需求, 要查看每个环节的输出:

  ```javascript
  const log = curry((label, x) => {
  	console.log(`${ label }: ${ x }`);
  	return x;
  });

  const toSlug = pipe(
  	toLowerCase, 
  	log('toLowerCase output'), 
  	split(' '), 
  	log('split output'), 
  	join('_'), 
  	log('join output'), 
  	encodeURIComponent, 
  );
  ```

> Tips:
>
> 一些工具纯函数可直接引用`lodash/fp`, 例如`curry/map/split`等, 并不需要像我们上面这样自己实现；

### **数据不可变性**(immutable)

这是一种数据理念, 也是函数式编程中的核心理念之一:

- **倡导**: 一个对象再被创建后便不会再被修改。当需要改变值时, 是返回一个全新的对象, 而不是直接在原对象上修改；
- **目的**: 保证数据的稳定性。避免依赖的数据被未知地修改, 导致了自身的执行异常, 能有效提高可控性与稳定性；
- 并不等同于`const`。使用`const`创建一个对象后, 它的属性仍然可以被修改；更类似于`Object.freeze`: 冻结对象, 但`freeze`仍无法保证深层的属性不被串改；
- immutable.js : js 中的数据不可变库, 它保证了数据不可变, 在 React 生态中被广泛应用, 大大提升了性能与稳定性；
  - trie 数据结构:
    - 一种数据结构, 能有效地深度冻结对象, 保证其不可变；
    - **结构共享**: 可以共用不可变对象的内存引用地址, 减少内存占用, 提高数据操作性能；

### 避免状态共享

避免不同函数之间的 **状态共享**, 数据的传递使用复制或全新对象, 遵守数据不可变原则；

### 避免改变外部状态

避免从函数内部 **改变外部状态**, 例如改变了全局作用域或父级作用域上的变量值, 可能会导致其它单位错误；

### 避免副作用

避免在单元函数内部执行一些 **副作用**, 应该将这些操作抽离成更独立的工具单元；

- 日志输出
- 读写文件
- 网络请求
- 调用外部进程
- 调用有副作用的函数

## 使用递归而非迭代

使用尾递归, 保证不溢出。

```javascript
// 迭代不被允许
let arr = [1, 2, 3, 4];
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

很多函数大体相同, 重复代码很多, 只有一些细节不一样, 于是产生高阶函数。

高阶函数: 让函数来产生函数, 共用的部分抽取出来, 不共用的部分与共用的部分能组合起来。以函数为参数, 返回一个新的增强函数 的一类函数。

比如 JS 中的 `map/filter/forEach/...` 函数都是高阶函数, 能快速操作集合数据。

用途：

- 将逻辑行为进行 **隔离抽象**, 便于快速复用, 如处理数据, 兼容性等；
- **函数组合**, 将一系列单元函数列表组合成功能更强大的函数；
- **函数增强**, 快速地拓展函数功能,

### 函数的柯里化

curry: 传递给函数一部分的参数来调用它, 让他返回一个函数去处理剩下的参数。

就是传递一部分的参数, 形成固定模式的函数(部分参数数值已经固定), 得到已经记住参数的新函数。这样对应固定的输入, 就得到固定的输出。

在不侵入函数的前提下, 为函数 **预置通用参数**, 供多次重复调用。

```javascript
// example 1
var check = x => (y => y > x);
let check7 = check(7);
console.log(check7(10)); // true

// example 2
const add = function add(x) {
	return function (y) {
		return x + y
	}
}
const add1 = add(1)

add1(2) === 3
add1(20) === 21
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

# 遍历器/迭代器与 for...of

## 遍历器概念

是用来处理可遍历数据结构的统一接口, 只要部署 `iterator` 接口, 就可以进行遍历操作.

作用: 提供统一的访问接口/数据结构的成员按照某种顺序排列/为ES6新增的`for...of`服务

数据结构有遍历器接口, 就称为该数据结构是可遍历的/可迭代的.

## JS 默认遍历器接口

JS中默认的遍历器接口, 即数据结构的原型对象有 `Symbol.iterator` 属性, 该属性对应的函数返回一个遍历器对象, 调用对象的`next`方法, 即可返回数据结构的下一个数据..

```javascript
let arr = [3, 4, 5];
// 生成迭代器对象
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

# 关键字 this

记住一条: 当 function 被作为 method 调用时，this指向调用对象。

js中`this`随着执行环境的变化而变化, 是函数运行时, 在函数体内部自动生成的一个对象, 只能在函数体内部使用. 即, **this 是函数运行时所在的环境对象**. 注意: 箭头函数不绑定自己的 `this` .

显式绑定: call/apply/bind

隐式绑定:

- 全局上下文(默认绑定) : 全局对象(严格模式有无均指全局对象)
- 直接调用函数: 全局对象(严格模式undefined)
- 对象.方法的形式调用: 方法所在对象
- DOM 事件绑定(特殊)
  - onclick和addEventerListener中 this 默认指向绑定事件的元素。
  - IE比较奇异，使用attachEvent，里面的this默认指向window
- new 构造函数绑定: new 之后生成的实例对象
- 箭头函数:
  - 没有this 不能绑定
  - 里面 this 指向最近的非箭头函数的 this, 找不到就是 window(严格模式是 undefined)

优先级:

new > call/apply/bind > 对象.方法 > 直接调用

## 单独使用(全局上下文)

无论有无严格模式, `this`始终指向全局对象. 浏览器中, 全局对象为`[object Window]`

```javascript
// 'use strict'
console.log(this); // {}
```

## 纯粹的函数调用

**默认绑定**

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

## 函数作为类方法

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

## 总结


| 场景 | 函数中的`this` 指向 |
| :- | - |
| 单独使用 | 全局对象 |
| 纯函数调用 | 全局对象（严格模式是`undefined`） |
| 函数作为对象方法 | 方法所在的对象 |
| 函数作为类中方法 | 构造函数生成的对象且与其行为一致 |
| 函数作为构造函数 | 构造函数生成的对象且与其行为一致 |
| `apply` 调用 | `apply(obj, [a, b, c, ...])` 调用时的第一个参数 `obj` |

# 异步编程

## ES5 callback

缺点: 回调当中嵌套回调, 产生回调地狱

```javascript
fs.readFile('xxx', (err, data) => {
...
});
```

## ES6 Promise

很好了解决了`回调地狱`的问题，同时了合并了错误处理。

链式调用避免大量嵌套, 方便了异步编程.

```javascript
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json')
}).then(data => {
    return readFilePromise('3.json')
}).then(data => {
    return readFilePromise('4.json')
});
```

### 相关面试题

#### 如何解决回调地狱

回调地狱

1. 多层嵌套的问题。
2. 每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性。

解决方法:

Promise 利用了三大技术手段来解决`回调地狱`:

- **回调函数延迟绑定**。
- **返回值穿透**(链式调用)。
- **错误冒泡**(解决成功或者失败两种可能性)。

举例:

*回调函数延迟绑定*

回调函数不是直接声明的，而是在通过后面的 then 方法传入的，即延迟传入。

```javascript
let readFilePromise = (filename) => {
  fs.readFile(filename, (err, data) => {
    if(err) {
      reject(err);
    }else {
      resolve(data);
    }
  })
}
readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')
});
```

*返回值穿透*

x 是内部函数返回的 Promise 对象

```javascript
let x = readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')//这是返回的Promise
});
x.then(/* 内部逻辑省略 */)
// 形成链式调用的效果
```

*错误冒泡*

```javascript
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
}).catch(err => {
  // xxx
})
```

*解决效果*

- 实现链式调用，解决多层嵌套问题
- 实现错误冒泡后一站式处理，解决每次任务中判断错误、增加代码混乱度的问题

#### Promise 引入微任务原因

即 Promise 的回调函数为什么要加入微任务队列中, 或者说 为什么选择异步操作的方式执行回调函数.

回到问题本身，其实就是**如何处理回调**的问题。总结起来有三种方式:

1. 使用**同步回调**，直到异步任务进行完，再进行后面的任务。
   - 导致整个脚本阻塞, 当前任务等待, 浪费 CPU
   - 无法实现`延迟绑定`的效果
2. 使用**异步回调**，将回调函数放在进行`宏任务队列`的队尾。
   - 在所有宏任务非常长的情况下, 将迟迟无法执行回调函数, 造成应用卡顿
3. 使用**异步回调**，将回调函数放到`当前宏任务中`的最后面(采用)。
   - `引入微任务`, 即把 resolve(reject) 回调的执行放在当前宏任务的末尾。
   - 采用**异步回调**替代同步回调解决了浪费 CPU 性能的问题。
   - 放到**当前宏任务最后**执行，解决了回调执行的实时性问题。

#### Promise 如何实现链式调用

*简易版实现*

```javascript
//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  let self = this; // 缓存当前promise实例
  self.value = null;
  self.error = null; 
  self.status = PENDING;
  self.onFulfilled = null; //成功的回调函数
  self.onRejected = null; //失败的回调函数

  const resolve = (value) => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled(self.value);// resolve 时执行成功回调
    });
  };

  const reject = (error) => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = REJECTED;
      self.error = error;
      self.onRejected(self.error);// reject 时执行成功回调
    });
  };
  executor(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  } else if (this.status === FULFILLED) {
    //如果状态是fulfilled，直接执行成功回调，并将成功值传入
    onFulfilled(this.value)
  } else {
    //如果状态是rejected，直接执行失败回调，并将失败原因传入
    onRejected(this.error)
  }
  return this;
}
```

可以看到，Promise 的本质是一个`有限状态机`，存在三种状态:

- PENDING(等待)
- FULFILLED(成功)
- REJECTED(失败)

*绑定多个回调函数*

需要将 `onFulfilled ` 和 `onRejected` 改为数组，调用 resolve 时将其中的方法拿出来一一执行即可。

```javascript
self.onFulfilledCallbacks = [];
self.onRejectedCallbacks = [];
```

```js
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value);
  } else {
    onRejected(this.error);
  }
  return this;
}
```

接下来将 resolve 和 reject 方法中执行回调的部分进行修改：

```js
// resolve 中
self.onFulfilledCallbacks.forEach((callback) => callback(self.value));
//reject 中
self.onRejectedCallbacks.forEach((callback) => callback(self.error));
```

#### 实现 Promise 的 resolve/reject/finally

Promise.resolve

实现 resolve 静态方法有三个要点:

- 传参为一个 Promise, 则直接返回它。
- 传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，`采用它的最终状态`作为`自己的状态`。
- 其他情况，直接返回以该值为成功状态的promise对象。

具体实现如下:

```js
Promise.resolve = (param) => {
  if(param instanceof Promise) return param;
  return new Promise((resolve, reject) => {
    if(param && param.then && typeof param.then === 'function') {
      // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
      param.then(resolve, reject);
    }else {
      resolve(param);
    }
  })
}
```

Promise.reject

传入的参数会作为一个 reason 原封不动地往下传, 实现如下:

```js
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
```

*实现 Promise.prototype.finally*

无论当前 Promise 是成功还是失败，调用`finally`之后都会执行 finally 中传入的函数，并且将值原封不动的往下传。

```js
Promise.prototype.finally = function(callback) {
  this.then(value => {
    return Promise.resolve(callback()).then(() => {
      return value;
    })
  }, error => {
    return Promise.resolve(callback()).then(() => {
      throw error;
    })
  })
}
```

#### 实现 Promise的all/race

对于 all 方法而言，需要完成下面的核心功能:

1. 传入参数为一个空的可迭代对象，则`直接进行resolve`。
2. 如果参数中`有一个`promise失败，那么Promise.all返回的promise对象失败。
3. 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个`数组`

具体实现如下:

```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let index = 0;
    let len = promises.length;
    if(len === 0) {
      resolve(result);
      return;
    }
   
    for(let i = 0; i < len; i++) {
      // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
      Promise.resolve(promise[i]).then(data => {
        result[i] = data;
        index++;
        if(index === len) resolve(result);
      }).catch(err => {
        reject(err);
      })
    }
  })
}
```

### 实现 Promise.race

race 的实现相比之下就简单一些，只要有一个 promise 执行完，直接 resolve 并停止执行。

```js
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    if(len === 0) return;
    for(let i = 0; i < len; i++) {
      Promise.resolve(promise[i]).then(data => {
        resolve(data);
        return;
      }).catch(err => {
        reject(err);
        return;
      })
    }
  })
}
```

### 含义

`Promise` 对象包含一个异步操作, 并且保存这个异步操作的状态以及操作执行完成之后的结果.

操作执行的状态不受影响, 操作结束后状态不会改变. 后面我们默认 `resolved` 指 `fulfilled`, 不包括 `rejected`.


| 三种状态 | 含义 |
| - | - |
| pending | 执行中 |
| fulfilled | 已成功 |
| rejected | 已失败 |
| 备注: resolved | 表示已定型(`pending->fulfilled` 或者 `pending->rejected`), 常指 `fulfilled`. |

### 用法

`Promise ` 是一个构造函数, 用来生成 `Promise` 对象实例.

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

如上所示, 首先建立一个`Promise`对象, 将`setTimeout`这个异步操作放在里面, `Promise`提供了这个异步操作成功或者失败的解决方法。异步操作执行成功了, 就调用`resolve`函数抛出结果, 失败就调用`reject`函数抛出结果, 总之就是会抛出异步操作的运行结果。

在异步操作结束以后, 会触发对象p对执行对象的处理, 即会触发调用对象p的`then`方法。处理成功情况, 传参是正常的值或者是`Promise`实例, 实现`then`第一个参数即成功回调函数, 处理失败情况, 传参是`Error`, 实现`then`第二个参数即失败回调函数。

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

执行完`resolve`或者`reject`之后, `Promise`的参数函数仍然会继续执行, 所以最好在 `resolve` 或者 `reject` 前面加上 `return`, 防止不必要的代码执行.

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

`then`方法调用后仍然返回一个`promise`对象(不是原来的), 但是由于`then`中不能调用`resolve`方法, 不能抛出值, 因此`then`方法返回的 `Promise` 实例执行结束后, 是没有状态值的.

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

这样就可以采用链式写法, 按照一定次序执行一组回调函数.

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

`catch` 不仅会捕捉 `p `发生的错误, 也会捕捉 `p.then` 中的回调函数发生的错误.

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

`finally`方法用于指定不管 `Promise ` 对象最后状态如何, 都会执行的操作, ES2018引入。在执行完`then`或者`catch`方法后, 都会执行`finally`方法。

`finally` 的**回调函数不接受入参**, 与 `Promise` 状态无关. 返回值是一个指定了 finally 回调函数的 Promise 对象。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···}); // 注意回调函数没有参数
```

`finally` 函数内部实现：

> 可知 `finally` 函数总是返回原有的值, `Promise` 成功则返回成功的值, 失败则抛出 `error`。

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    val => P.resolve(callback()).then(() => val), 
    error => P.resolve(callback()).then(() => { throw error })
  );
};
```

注意：`finally(()=>{})` 与 `then(()=>{}, ()=>{})` 两者返回值的差别, `finally` 函数总是返回原来的值。

```javascript
let a = await Promise.resolve(2).then(() => { }, () => { });
let b = await Promise.resolve(2).finally(() => { });

console.log(a, b); // undefined 2

let c = await Promise.reject(3).then(() => { }, () => { });
console.log(c); // undefined

let d = await Promise.reject(3).finally(() => { });
console.log(d); // 3
/*
internal/process/esm_loader.js:74
    internalBinding('errors').triggerUncaughtException(
                              ^
3
Thrown at:
    at loadESM (internal/process/esm_loader.js:74:31)
*/
```

#### Promise.all()

将多个 Promise 实例包装成一个 Promise 新实例, 假设为 P。多个 Promise 实例使用数组传入或者其他具有 Iterator 接口的数据结构。假设以数组形式传入参数, 则如果有参数不是 Promise 实例, 则会通过 Promise.resolve 将其转换。只有当所有实例均有返回值时, 才会触发 P 的回调函数。

有一个实例执行失败, 则执行 `P.catch()`（如果失败的实例没有自己定义 `catch` 函数的话, 自己定义则触发自己的, 不会触发 P 的）并且接收到第一个执行失败的 Promise 实例的返回值。

```javascript
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 300)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2");
  }, 500)
})

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p3 error");
  }, 700)
})

let p = Promise.all([p1, p2, p3]);
p.then(val => {
  console.log("全部执行成功：", val);
}).catch(error => {
  console.log("某个实例出现错误：", error);
})
// 某个实例出现错误： p3 error
```

将 p3 中的 `reject` 换成 `resolve`, 其余代码不变。

当所有实例状态均为 `fulfilled` 时, P 的状态才是 `fulfilled`, 才执行 P.then() 并且其接收到一个值是所有 Promise 实例的返回值组成的数组。

```javascript
...

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3");
  }, 700)
})

...

// 全部执行成功： [ 'p1', 'p2', 'p3' ]
```

#### Promise.race()

形式与上面相同, 只是含义不同。race 是哪个实例状态改变最快, 就 follow 它的状态, 并且将最快改变状态的实例的返回值传入响应回调函数并执行。

```javascript
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 300)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p2");
  }, 500)
})

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3");
  }, 700)
})

let p = Promise.race([p1, p2, p3]);
p.then(val => {
  console.log("最快状态改变：", val);
}).catch(error => {
  console.log("某个实例出现错误：", error);
})

// 最快状态改变： p1
```

#### Promise.try()

需求：需要同步函数同步执行, 异步函数异步执行。

3 种实现方法：

1. 使用 `async`

   ```javascript
   /* f 同步函数 */
   const f = () => console.log('func');
   (async () => f())();
   console.log('over');
   // func
   // over

   /* f 异步函数 */
   const f = () => {
     setTimeout(() => {
       return 1000;
     }, 0)
   };
   (async () => f())() // async 会吃掉错误, 需要 catch
     .then(val => { console.log('val:', val); })
     .catch(error => { console.log('error:', error); });
   console.log('over'); // 先执行同步函数
   // over
   // val: undefined
   ```
2. 使用 new Promise

   ```javascript
   /* f 同步函数 */
   const f = () => console.log('func');
   (() => new Promise(
     resolve => resolve(f()) // resolve(f()) 这一步是立即执行的 也就是 f() 立即会被抛出并返回
   ))();
   console.log('over');
   // func
   // over

   /* f 异步函数 */
   const f = () => {
     setTimeout(() => {
       console.log('func');
       return 1000;
     }, 0)
   };
   (() => new Promise(resolve => {
     resolve(f())
   }))()
     .then(val => { console.log('val:', val); })
     .catch(error => { console.log('error:', error); });
   console.log('over');
   // over
   // val: undefined
   // func
   ```
3. Promise.try

   ```javascript
   const f = () => {
     setTimeout(() => {
       console.log('func');
       return 1000;
     }, 0)
   };
   // 能同时捕捉同步函数以及异步函数的报错
   Promise.try(f)
     .then(val => console.log('val:', val))
     .catch(error => console.log('error:', error));
   // node 环境执行会出现 TypeError: Promise.try is not a function 报错
   ```

## ES6 Generator (生成器)函数 + co 库

利用协程完成 Generator 函数，用 co 库让代码依次执行完，同时以同步的方式书写，也**让异步操作按顺序执行**。

```javascript
co(function* () {
  const r1 = yield readFilePromise('1.json');
  const r2 = yield readFilePromise('2.json');
  const r3 = yield readFilePromise('3.json');
  const r4 = yield readFilePromise('4.json');
})
```

### 生成器实现机制-协程

#### 什么是协程？

协程是一种比线程更加轻量级的存在，协程处在线程的环境中，`一个线程可以存在多个协程`，可以将协程理解为线程中的一个个任务。不像进程和线程，协程并不受操作系统的管理，而是被具体的应用程序代码所控制。

#### 协程的运作过程

那你可能要问了，JS 不是单线程执行的吗，开这么多协程难道可以一起执行吗？

答案是：并不能。一个线程一次只能执行一个协程。比如当前执行 A 协程，另外还有一个 B 协程，如果想要执行 B 的任务，就必须在 A 协程中将` JS 线程的控制权转交给 B协程`，那么现在 B 执行，A 就相当于处于暂停的状态。

```javascript
function* A() {
  console.log("我是A");
  yield B(); // A停住，在这里转交线程执行权给B
  console.log("结束了");
}
function B() {
  console.log("我是B");
  return 100;// 返回，并且将线程执行权还给A
}
let gen = A();
gen.next();
gen.next();

// 我是A
// 我是B
// 结束了
```

### 函数简介

这个函数生成一个遍历器/迭代器对象, 代表函数内部的指针, 调用对象的`next`方法可以对函数内部的状态值进行遍历.

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

`Generator` 函数不用 `yield` 时, 是一个暂缓执行的函数, 调用时**生成遍历器对象,** 对象调用 `next` 方法时, 执行完毕, **不调用则不执行**. `yield` 语句只能用在 `Generator` 函数中.

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
    log(err); // 打印实例对象抛出的错
  }
  return y;
}

let obj = g(1);
log(obj.next()); // { value: 2, done: true }
obj.throw('error!!!') // error!!! 被打印出来
```

封装异步任务

```javascript
import fetch from 'node-fetch';

const log = console.log;
const url = 'https://api.github.com/users/github';

function* g () {
  let result = yield fetch(url); // 这里 result 是 pending 状态的 Promise 对象
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

## ES7 await async

加上 async 关键字之后, 函数返回的是一个 Promise 实例. 获取 promise 完成时返回的值, 使用 then 方法.

在异步函数之前加上 await 关键字, 他会暂停代码在该行上, 然后等待直到 promise 执行完成, 然后返回结果值.

在暂停的同时, 其他正在等待执行的代码就有机会执行了.

在任何返回 Promise 的函数之前加上 await.

```javascript
// 展示语法
async function hello(){
  return greeting = await Promise.resolve("hello")
}

hello().then(alert)
```

await 关键字使 js 运行时暂停于此行, 允许其他代码在此之间执行, 直到异步函数调用返回其结果. 一旦完成, 代码将从下一行继续执行.

```javascript
async function myFetch() {
  // 解析器将在此行暂停, 直至服务器返回的响应可用, 即 fetch('coffee.jpg') 返回的 promise 状态变为 fulfilled, 返回的 response 赋值给 response 变量 
  let response = await fetch('coffee.jpg');
  // 赋值完成后, 解析器移动到下一行
  return await response.blob();
}

myFetch().then((blob) => {
  let objectURL = URL.createObjectURL(blob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
});
```



这是 ES7 中新增的关键字，凡是加上 `async` 的函数都默认返回一个 `Promise` 对象，而更重要的是 `async + await` 也能让异步代码以同步的方式来书写，而不需要借助第三方库的支持。

```javascript
const readFileAsync = async function () {
  const f1 = await readFilePromise('1.json')
  const f2 = await readFilePromise('2.json')
  const f3 = await readFilePromise('3.json')
  const f4 = await readFilePromise('4.json')
}
```

`Generator` 函数的语法糖.

`Generator` 函数, 依次读取两个文件.

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
  // f1 f2 均是 pending 状态的 Promise 实例
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

在 `Promise` 实例前面加上 `await`, 就相当于**等待这个 `Promise` 实例中的异步操作执行结束**.

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

由于它是浏览器脚本语言, 主要是与用户互动以及操作 DOM, 否则同步问题很复杂. 即使 js 可以创建多线程, 但是子线程完全受控于主线程, 且不得操作 DOM, 未改变单线程的本质.

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

1. 主线程（调用堆栈）为空, 才会读取任务(消息/事件)队列.
2. 执行异步任务就是执行其指定的回调函数, 异步任务必须指定回调函数
3. 任务队列是先进先出的数据结构.
4. 定时器功能: 主线程首先会检查一下时间, 某些事件只有到规定时间, 才能返回主线程.

## Event Loop

主线程从任务队列中读取事件是循环不断的, 整个运行机制又被称为 Event Loop.

主线程运行, 产生堆栈, 栈中的代码调用各种 API, 调用之后可能在"任务队列"中添加各种事件(click load done).

只要栈中的代码执行完毕, 就会读取"任务队列", 依次执行事件对应的回调函数.

执行栈中的代码(同步任务), 总是在读取"任务队列"之前.

![Event Loop](images/EventLoop.png)

## 定时器

任务队列中还可以放置定时事件, 指定某些代码在多少时间后执行.

调用 setTimeout 时, 浏览器或者 NodeJS 会启动定时器, 定时器到期时, 对应的回调函数会被放入“任务队列”中等待执行。

## ES6 作业队列

`Promise` 使用该队列, 这种方式会尽快执行异步函数的结果, 而不是放在调用堆栈的末尾。

`resolve` 的 `Promise` 在当前函数执行完毕后, 其 then 函数立即执行, 即执行在任务队列之前, 这是 `Promise` 与其他旧异步函数之间的巨大区别。

可见执行顺序是：**主线程（调用堆栈）——作业队列——任务队列**

```javascript
const bar = () => console.log("bar");
const dog = () => console.log("dog");
const cat = () => console.log("cat");

const foo = () => {
    console.log("foo");
    setTimeout(bar, 0);
    setTimeout(dog, 0);
    new Promise((resolve, reject) => {
        resolve("promise over");
    }).then(val => console.log(val));
    cat();
}

foo();

/*
foo
cat
promise over
bar
dog
*/
```

## Node 中的 Event Loop

![Node.js](/Users/jinlingzhang/Documents/personal/FrontEnd-Interview/images/Node-Event-Loop2.png)

根据上图, Node.js的运行机制如下。

> （1）V8引擎解析JavaScript脚本。
>
> （2）解析后的代码, 调用Node API。
>
> （3）[libuv库](https://github.com/joyent/libuv)负责Node API的执行。它将不同的任务分配给不同的线程, 形成一个Event Loop（事件循环）, 以异步的方式将任务的执行结果返回给V8引擎。
>
> （4）V8引擎再将结果返回给用户。

process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。也就是说, 它指定的任务总是发生在所有异步任务之前。

setImmediate方法则是在当前"任务队列"的尾部添加事件(正常添加异步事件), 也就是说, 它指定的任务总是在下一次Event Loop时执行, 这与setTimeout(fn, 0)很像。

由于process.nextTick方法指定的回调函数, 总是在当前"执行栈"的尾部触发, 所以不仅函数A比setTimeout指定的回调函数timeout先执行, 而且函数B也比timeout先执行。这说明, **如果有多个process.nextTick语句（不管它们是否嵌套）, 将全部在当前"执行栈"执行**。(这里其实就是微任务又触发了微任务)

```javascript
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
// 1
// 2
// TIMEOUT FIRED
```

setImmediate

```javascript
setImmediate(function A() {
  console.log(1);
  setImmediate(function B(){console.log(2);});
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0);
// 1
// TIMEOUT FIRED
// 2
```

process.nextTick和setImmediate的一个重要区别：

多个process.nextTick语句总是在当前"执行栈"一次执行完, 多个setImmediate可能则需要多次loop才能执行完。事实上, 这正是Node.js 10.0版添加setImmediate方法的原因, 否则像下面这样的递归调用process.nextTick, 将会没完没了, 主线程根本不会去读取"事件队列".

```javascript
process.nextTick(function foo() {
  process.nextTick(foo);
});
```

> 由于process.nextTick指定的回调函数是在本次"事件循环"触发, 而setImmediate指定的是在下次"事件循环"触发, 所以很显然, 前者总是比后者发生得早, 而且执行效率也高（因为不用检查"任务队列"）。

![Node事件循环](images/Node-Event-Loop.png)

1. timer 阶段: 执行到期的`setTimeout / setInterval`队列回调
2. I/O 阶段: 执行上轮循环残流的`callback`
3. idle, prepare
4. poll: 等待回调

   - 执行回调
   - 执行定时器

     - 如有到期的`setTimeout / setInterval`, 则返回 timer 阶段
     - 如有`setImmediate`, 则前往 check 阶段
5. check

   - 执行`setImmediate`
6. close callbacks

## 浏览器中的 Event Loop

https://mp.weixin.qq.com/s/QgfE5Km1xiEkQqADMLmj-Q

浏览器事件循环的过程

1. 整个脚本作为第一个宏任务执行
2. 执行所有同步代码, 并且中间遇到的 宏任务 进入宏任务队列, 微任务进入微任务队列
3. 当前宏任务执行完毕出宏任务队列, 检查微任务队列, 如果有则依次执行完微任务队列中的所有微任务, 直至微任务队列为空
4. 执行浏览器 UI 线程的渲染工作
5. 检查是否有 webworker 任务, 有则执行
6. 执行队列首部的宏任务, 回到 2, 依次循环, 直到宏任务与微任务队列都为空

练习题:

```javascript
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
});
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0);
console.log('start');

// start
// Promise1
// setTimeout1
// Promise2
// setTimeout2
```

题目分析:

两个空队列, 一个宏任务, 一个微任务.

当前宏任务队列只有当前脚本这个宏任务, 执行当前脚本, Promise1 注册为微任务, setTimeout1 注册为宏任务, 打印 start, 当前宏任务(脚本)执行完毕

接着执行这个宏任务(脚本)产生的微任务, 即当前的微任务队列里的所有任务 Promise1, 指向该微任务产生了一个宏任务 setTimeout2, 将该宏任务加入宏任务队列, 则微任务队列目前为空.

接着执行宏任务队列中的第一个宏任务 setTimeout1, 该宏任务又产生了微任务 Promise2, 于是又去执行微任务队列输出 Promise2 , 微任务队列再次清空.

再次回到宏任务队列执行队列首部的宏任务, 此时执行的是第一个微任务产生的宏任务 setTimeout2.

因此总结下来, 打印顺序分别是 start(脚本) -> Promise1 -> setTimeout1 -> Promise2 -> setTimeout2



**自我总结**

浏览器事件循环

一个线程中, 事件循环是唯一的, 但是任务队列可以有多个.

宏任务与微任务都在任务队列中, 都是异步任务完成后触发的事件. 执行宏任务与微任务其实是执行他们的回调.


| 宏任务(macro-task tasks) | 微任务(micro-task jobs) |
| - | - |
| script(整体代码) | Process.nexttick |
| setTimeout | Promise |
| setInterval | async/await |
| setImmediate | MutationObserver(H5 新特性) |
| I/O |   |
| UI Render |   |

流程

![图片](images/浏览器事件循环.jpg)

nodejs 事件循环


| 宏任务(macro-task tasks) | 微任务(micro-task jobs) |
| - | - |
| script(整体代码) | Process.nexttick |
| setTimeout | Promise |
| setInterval |   |
| setImmediate |   |
| I/O |   |

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
Object.create(proto, [propertiesObject])
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

返回一个对象自己的**可枚举**属性组成的数组, , 不包括该对象原型链上的属性, 但是不能访问 Symbol 类型的属性.

```javascript
let obj = { 100: 'a', 2: 'b', 7: 'c' }
console.log(Object.keys(obj)); // [ '2', '7', '100' ]
```

## Object.assign()

将一个/多个源对象的**自身**所有可枚举属性拷贝给目标对象, 返回目标对象。

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

1. 只有一个参数时, 直接返回该对象.

```javascript
const log = console.log;

let obj = { a: 1 };
log(Object.assign(obj) === obj); // true
```

2. 只有一个参数但是不是对象, 则会转成对象, 然后返回.

```javascript
log(Object.assign(2)); // [Number: 2]
```

3. 当`source`为`null`/`undefined`时, 不会报错.

```javascript
console.log(Object.assign({ a: 1 }, null)); // { a: 1 }
console.log(Object.assign({ a: 1 }, undefined)); // { a: 1 }
```

### 复制对象

#### 浅拷贝：仅仅拷贝对象的引用

注意: 浅拷贝只能拷贝一层对象, 如果有对象的嵌套则不能拷贝, 会指向同一处引用

- 手动实现

  ```javascript
  const shallowClone = (target) => {
    if (typeof target === 'object' && target !== null) {
      const cloneTarget = Array.isArray(target) ? []: {};
      for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = target[prop];
        }
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  ```
- 使用 Object.assign()

  拷贝的是对象属性的引用, 而不是对象本身

  ```javascript
  let obj = { a: 1, b: 2 }
  let newObj = Object.assign({}, obj) // newObj { a: 1, b: 2 }
  newObj.a = 5;
  console.log(newObj); // { a: 5, b: 2 }
  console.log(newObj === obj); // false

  let obj = { name: 'sy', age: 18 };
  const obj2 = Object.assign({}, obj, {name: 'sss'});
  // 出现了属性值的覆盖
  console.log(obj2);//{ name: 'sss', age: 18 }
  ```
- concat 浅拷贝数组

  ```javascript
  let arr = [1, 2, 3, 4]
  let newArr = arr.concat();
  newArr[1] = 100;
  console.log(newArr, arr);
  // [ 1, 100, 3, 4 ] [ 1, 2, 3, 4 ]
  ```
- slice 浅拷贝

  ```javascript
  let newArr = [1, 2, 3].slice();
  ```
- 使用展开运算符(...)

  ```javascript
  let arr = [1, 2, 3];
  let newArr = [...arr];//跟arr.slice()是一样的效果
  ```

#### 深拷贝: 完整拷贝对象, 是另一个新对象.

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

- `JSON.parse(JSON.stringify(obj))`：性能最快

  - 具有循环引用的对象时, 报错

    ```javascript
    const a = {val:2};
    a.target = a;
    ```

    拷贝a会出现系统栈溢出，因为出现了`无限递归`的情况。
  - 无法拷贝一些特殊的对象`，诸如 RegExp, Date, Set, Map, undefined 或 symbol 时, 无法拷贝
  - 无法拷贝函数

  ```javascript
  const log = console.log;
  let obj = { a: 0, b: 1, c: { d: 2 } }

  let obj1 = JSON.parse(JSON.stringify(obj));
  obj.a = 55;
  obj.c.d = 88;
  log(obj, obj1);
  // { a: 55, b: 1, c: { d: 88 } } { a: 0, b: 1, c: { d: 2 } }
  ```
- 递归进行逐一赋值

  ```javascript
  const deepClone = (target) => {
    if (typeof target === 'object' && target !== null) {
      const cloneTarget = Array.isArray(target) ? []: {};
      for (let prop in target) {
        // 筛选出 target 的本地属性
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop]);
        }
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  ```
  
  
    解决循环引用, 创建 map 记录已经拷贝过的对象

  ```javascript
  const isObject = (target) => (typeof target === 'object' ||   typeof target === 'function') && target !== null;
  
  const deepClone = (target, map = new Map()) => { 
    if(map.get(target))  
      return target; 
   
   
    if (isObject(target)) { 
      map.set(target, true); 
      const cloneTarget = Array.isArray(target) ? []: {}; 
      for (let prop in target) { 
        if (target.hasOwnProperty(prop)) { 
            cloneTarget[prop] = deepClone(target[prop],map); 
        } 
      } 
      return cloneTarget; 
    } else { 
      return target; 
    } 
  }
  ```

但是, map 上的 key 和 map 构成了`强引用关系`. 被弱引用的对象可以在`任何时候被回收`，而对于强引用来说，只要这个强引用还在，那么对象`无法被回收`。

解决方法:

让 map 的 key 和 map 构成`弱引用`即可。ES6给我们提供了这样的数据结构，它的名字叫`WeakMap`，它是一种特殊的Map, 其中的键是`弱引用`的。其键必须是对象，而值可以是任意的。

```javascript
const deepClone = (target, map = new WeakMap()) => {
  //...
}
```

## Object.defineProperty()

https://www.jianshu.com/p/8fe1382ba135

直接在一个方法上定义一个新属性, 或者修改一个对象的现有属性, 并返回此对象.

直接在 `Object` 构造器对象上使用此方法, 而不是对象实例.

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

`prop`: 要定义或修改的属性名称或者 `Symbol`

`descriptor`: 要定义或修改的属性描述符(数据描述符/存取描述符)

```javascript
Object.defineProperty(obj, prop, descriptor)
```

返回值：被修改的对象

描述符可拥有的键值以及默认值, 用来具体设置属性。


| 描述符/属性 | configurable | enumerable | value | writable | get | set |
| - | - | - | - | - | - | - |
| 默认值 | false | false | undefined | false | undefined | undefined |
| 数据描述符 | 可以 | 可以 | 可以 | 可以 | 不可以 | 不可以 |
| 存取描述符 | 可以 | 可以 | 不可以 | 不可以 | 可以 | 可以 |



# 模块化

ES6 引入模块化后, 通常**在浏览器中使用 ES6 的模块化支持, 在 Node 中使用 CommonJS 的模块化支持。**

- *分类*

  - es6: `import / export`
  - commonjs: `require / module.exports / exports`
  - amd: `require / defined`
- *`require` 与 `import `的区别*

  - `require`支持 **动态导入**, `import`不支持, 正在提案 (babel 下可支持)
  - `require`是 **同步** 导入, `import`属于 **异步** 导入
  - `require`是 **值拷贝**, 导出值变化不会影响导入值；`import`指向 **内存地址**, 导入值会随导出值而变化

## 概述

ES6 之前, JS 没有模块体系, 使用社区的模块加载方案, 分别是 CommonJS (用于服务器)和 AMD(用于浏览器) 两种, 都只能运行时确定模块的依赖关系。

**运行时加载**

```javascript
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

只能在代码运行时, 才能整体加载 `fs` 模块(即加载 `fs `的所有方法), 才能得到对象 `_fs`, 再从这个对象读取三个方法.

ES6 引入了模块化, 在编译时就能确定模块的依赖关系 + 输入和输出的变量, 成为浏览器和服务器通用的模块解决方案.

**编译时加载**

```javascript
// ES6模块
import { stat, exists, readFile } from 'fs';
```

从 `fs ` 模块加载 3 个方法, 其他方法不加载, called 编译时加载或者静态加载. 即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6 模块还有以下好处。

- 不再需要`UMD`模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。

- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者`navigator`对象的属性。

- 不再需要对象作为命名空间（比如`Math`对象），未来这些功能可以通过模块提供。

## 运行时加载

### CommonJS

[CommonJS](http://www.commonjs.org/) 是一种使用广泛的 JavaScript 模块化规范, 核心思想是通过 `require` 方法来同步地加载依赖的其他模块, 通过 `module.exports` 导出需要暴露的接口。 CommonJS 规范的流行得益于 Node.js 采用了这种方式, 后来这种方式被引入到了网页开发中。

```javascript
// 导入
const moduleA = require('./moduleA');

// 导出
module.exports = moduleA.someFunc;
```

优点：

- 代码可在 NodeJS 环境中运行
- 通过 NPM 发布的很多第三方模块都采用了 CommonJS 规范

缺点：

- 代码无法直接在浏览器中运行, 必须通过工具(babel)转成标准的 ES5 。

### AMD

require、defined

## 编译时加载

### ES6 模块

#### 特点

- 自动开启严格模式
- 模块中可以导入导出各种类型的变量, 如函数/对象/字符串/布尔值/类等.
- 每个模块都有自己的上下文, 模块内声明的变量都是局部变量.
- 每个模块只加载一次, 再去加载该模块, 则直接从内存中读取.

#### export 命令

ES6 的模块化 = 导出（export） 与导入（import）两个模块. 每个模块就是一个文件, 文件中的变量外界都不可以获取, 如果外界需要使用, 则需要使用`export`输出对应变量.

##### 基本用法

1. **输出变量**

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

2. **输出函数**

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

3. **输出类**

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

##### 接口与变量一一对应

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

##### 动态绑定

`export` 输出的接口, 与对应的值是动态绑定关系, 即该接口对应的是 实时的值.

```javascript
// 接口 a 刚输出的值对应的是'aaa', 3 秒之后, 对应'bbb'
export let a = 'aaa';
setTimeout(()=>{
  a = 'bbb';
}, 3000)
```

##### 模块顶层

`export` 命令可以出现在模块的任何位置, 但必需处于模块顶层, 因为在块级作用域内, 就无法做静态优化(引入宏/类型检验)了.

```javascript
let a = () => {
  export let b = 7; // SyntaxError: Unexpected token 'export'
}
```

#### import 命令

`import` 后面的路径可以是绝对/相对, `.js`可以省略, 如果只是模块名不带有路径, 则需要配置文件.

##### 只读属性

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

##### 提升

`import` 命令具有提升效果, 会提升到整个模块的头部, 首先执行.

```javascript
// 不会报错
foo();
import { foo } from 'my_module';
```

本质是因为, `import`是编译时加载, 而`foo`是运行时调用.

##### 单例模式

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

##### 静态执行特性

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

#### 模块的整体加载

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

#### export default 命令

##### 导出匿名函数

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

##### 导出非匿名函数

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

##### 默认输出与正常输出

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

##### default 变量

本质上, `export default` 命令是输出一个叫做 `default` 的变量或者方法, 系统允许你取任何名字.

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

#### ES6 模块加载

如何在浏览器和 Node 之中加载 ES6 模块，以及实际开发中经常遇到的一些问题（比如循环加载）。





详情可见[阮一峰](https://www.yuque.com/ostwind/es6/docs-module-loader)







## CommonJS 实现原理

`CommonJS`的核心思想
**通过`rquire`方法来同步加载依赖的其他模块，通过`module.exports`导出需要暴露的接口。**

```js
// 导入
const moduleA = require('./moduleA');

// 导出
module.exports = moduleA.someFunc;
```

## 浏览器加载 CommonJS 模块的原理与实现

浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。

- module
- exports
- require
- global

只要能够提供这四个变量，浏览器就能加载 CommonJS 模块。

下面是一个简单的示例。

```javascript
var module = {
  exports: {}
};

(function(module, exports) {
  exports.multiply = function (n) { return n * 1000 };
}(module, module.exports))

var f = module.exports.multiply;
f(5) // 5000 
```

上面代码向一个立即执行函数提供 module 和 exports 两个外部变量，模块就放在这个立即执行函数里面。模块的输出值放在 module.exports 之中，这样就实现了模块的加载。

# 防抖与节流

背景： 用户一些操作会导致频繁触发监听函数, 但是有些时候并不希望事件触发过程中频繁的触发函数。

示例：

```html
<div id="content"
    style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;">
</div>
  <script>
    let num = 1;
    let content = document.getElementById('content');

    function count() {
      content.innerHTML = num++;
    };
    content.onmousemove = count;
  </script>
```

随着鼠标在灰色区域移动, 会一直调用count函数, 使得数字不断增加。

防抖和节流是一种比较好的解决方案, 是最常用的 **高频触发优化方式**, 能对性能有较大的帮助。

## 防抖 (debounce)

将多次高频操作优化为只在最后一次执行, 通常使用的场景是：用户输入, 只需在输入完成后做一次输入校验即可。

**触发事件后在 n 秒内函数只能执行一次, 如果在 n 秒内又触发了事件, 则会重新计算函数执行时间。**

分为非立即执行版与立即执行版。

非立即执行版

```javascript
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
```

立即执行版

```javascript
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

兼具版

```javascript
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}
```

## 节流(throttle)

每隔一段时间后执行一次, 也就是降低频率, 将高频操作优化成低频操作, 通常使用场景: 滚动条事件 或者 resize 事件, 通常每隔 100~500 ms执行一次即可。

**连续触发事件但是在 n 秒中只执行一次函数**

不管事件触发有多频繁, 都会保证在规定时间内一定会执行一次真正的事件处理函数, 而函数防抖只是在最后一次事件后才触发一次函数。

时间戳版

```javascript
function throttle(func, wait) {
    let previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

定时器版

```javascript
function throttle(func, wait) {
      let timeout;
      return function() {
          let context = this;
          let args = arguments;
          if (!timeout) {
              timeout = setTimeout(() => {
                  timeout = null;
                  func.apply(context, args)
              }, wait)
          }
      }
  }
```

兼具版

```javascript
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版, 2 表定时器版
 */
function throttle(func, wait , type) {
    if(type===1){
        let previous = 0;
    }else if(type===2){
        let timeout;
    }
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}
```

# V8 垃圾回收 Garbage Collection

JS 语言不像 C/C++, 让程序员自己去开辟或者释放内存，而是类似Java，采用自己的一套垃圾回收算法进行自动的内存管理, 释放不再需要的动态内存。

V8 具有内存上限值(`64`位系统，最多只能分配`1.4G`,  32 位系统，最多只能分配`0.7G`)

- JS 单线程
  - 一旦执行垃圾回收, JS 代码将暂停响应
- JS 垃圾回收机制限制
  - 垃圾回收机制耗时久, 内存过大不利于垃圾回收

V8 将堆内存分成了两部分, 新生代(存活时间短)+老生代(存活时间长)

## 新生代内存回收机制(**Scavenge算法**)

64 位: 32MB  32 位: 16MB

### Scavenge算法

将新生代空间分为两个区域, 一个 from(正在使用) , 一个 to(空闲), 遍历 from 中所有存活的对象, 将他们均 copy 到 to 空间并按照顺序排好, 然后交换 from 与 to 区域.

劣势: 只能使用新生代内存一半的区域

优势: 只存储存活时间短的对象, 时间性能优秀

总结: 就是将正在使用的内存重新排好, 腾出整块空间给后面的内存分配, 去除**内存碎片**, 在此期间删除非存活对象.

## 老生代内存回收机制

新生代中存活时间长的对象移动到老生代内存, called 晋升

触发晋升:

- 经历过一次新生代垃圾(Scavenge)回收
- to 空间的内存占用超过 25%

### 老生代垃圾回收策略

1. 标记-清除

   - 标记阶段

     - 遍历堆中的所有对象并对其做标记
     - 对代码环境中使用的变量以及强引用的变量取消标记
   - 清除阶段

     - 清除所有被标记的对象
2. 整理内存碎片

   清除阶段结束后, 将所有存活的对象全部往一端靠拢, 由于移动对象, 速度不会很快, 比较耗时

### 增量标记(优化)

由于一次性标记所有对象比较耗时, 因此将标记对象拆分为多个阶段, 标记一会暂停, 去执行 js 逻辑, 然后再回来接着进行标记, 这样循环一直到所有对象均被标记完(类似于 React Fiber).

经过增量标记之后，垃圾回收过程对JS应用的阻塞时间减少到原来了1 / 6

---

## 概念

### 可达性

如果有数据块变得不可达即不可访问, 则垃圾回收机制会将其删除。具有可达性的值是可访问的值, 被存储在内存中。

1. 根/固有可达值, 无法被删除：

   - 本地函数的变量与参数
   - 当前嵌套调用链上的其他函数的变量与参数
   - 全局变量
   - 其他
2. 从根开始沿着引用或者引用链能访问的值, 也具有可达性。

```javascript
let a = { name: "Bob"};
a = null;
// { name: "Bob"} 对象丢失引用, 变得不可达/无法访问, 会被删除
```

JS 引擎中有一个后台进程称之为垃圾回收器, 监视所有对象, 并删除不可访问对象。

### 垃圾

无法从根开始被访问到的对象就是垃圾, 要被清除。

## 找到并清除垃圾

### 算法-“标记清除”

垃圾搜集的工作原理：

- 垃圾回收器获取根并“标记”它们
- 获取所有来自根的引用并标记
- 继续访问标记的对象, 访问它们的引用并标记
- 以此类推, 直至所有引用（从根开始）都被访问
- 除标记的对象外, 所有对象都被删除

遍历以根为根节点的树, 访问所有引用, 类似于广度优先遍历。

JS 引擎做了下述优化：

- 分代回收。对象分为新对象与旧对象, 存在时间长的旧对象, 很少被检查。
- 增量回收。将垃圾回收分为几个部分, 不是一次遍历并标记整个对象集, 减少延迟。
- 空闲时间回收。垃圾回收器利用CPU空闲时间进行垃圾回收。

优点：

- 实现简单, 容易与其他算法结合。

缺点：

- 碎片化, 导致很多系小分块散落在堆的各处
- 分配速度不理想。每次分配内存都要遍历空闲链表, 找到足够大的分块
- 与写时复制技术不兼容, 因为每次都会在活动对象上打上标记

### 算法-“引用计数”

记录每个对象被引用的次数, 每次新建对象、赋值引用、删除引用的同时更新计数器, 如果计数器为 0 则直接回收内存。

优点：

- 暂停时间短
- 即刻回收垃圾
- 不用沿着根遍历所有对象

缺点：

- 计数器任务繁重
- 计数器占用很多位
- 实现繁琐, 每个赋值操作都得更换成引用更新操作
- 循环引用无法回收

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


| 推荐使用 | 不建议 |
| :-: | :-: |
| {} | new Object() |
| [] | new Array() |
| function (){} | new Function() |
| "" | new String() |
| 0 | new Number() |
| false | new Boolean() |
| /()/ | new RegExp() |

6. 意识到自动类型转换, 变量可以通过赋值改变其数据类型, 变量可包含不同的数据类型.

   ```javascript
   let a = 'hello'
   a = 5;
   console.log(typeof a); // number
   ```
7. 为函数中的参数设置默认值, `undefined` 会破坏代码
8. 用 `default` 来结束 `switch`.

# 缺陷与错误

## 错误处理

> 原因

js代码中会出现错误, 由于编写代码/编译/用户输入等各种各样的原因.

> 处理

发生错误时, js 引擎会停止并生成一个错误消息.

`try` 与 `catch` 成对出现, `finally` 是最后一定会执行的语句(可以没有).

`throw` 抛出错误, 实际上就是抛出一个表示错误信息的字符串s, 因此可以自定义错误.

在 `catch` 中可以捕获 s, 实际上就是可以获得s的值并打印出来.

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

# ES6/ES7

由于 Babel 的强大和普及, 现在 ES6/ES7 基本上已经是现代化开发的必备了。通过新的语法糖, 能让代码整体更为简洁和易读。

- 声明

  - `let / const`: 块级作用域、不存在变量提升、暂时性死区、不允许重复声明
  - `const`: 声明常量, 无法修改
- 解构赋值
- `class / extend`: 类声明与继承
- `Set / Map`: 新的数据结构
- 异步解决方案:

  - `Promise`的使用与实现
  - `generator`:
    - `yield`: 暂停代码
    - `next()`: 继续执行代码

  ```javascript
  function* helloWorld() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }

  const generator = helloWorld();

  generator.next()  // { value: 'hello', done: false }

  generator.next()  // { value: 'world', done: false }

  generator.next()  // { value: 'ending', done: true }

  generator.next()  // { value: undefined, done: true }
  ```

  - `await / async`: 是`generator`的语法糖, babel中是基于`promise`实现。

  ```javascript
  async function getUserByAsync(){
     let user = await fetchUser();
     return user;
  }

  const user = await getUserByAsync()
  console.log(user)
  ```

# V8 引擎执行 JS 代码过程

- 对代码进行词法分析/语法分析, 将其转换为 AST
- V8 解释器将 AST 翻译成字节码
- 对字节码进行逐行执行, 执行的时候, 将字节码编译为机器码执行 (即时编译 JIT)
  - 遇到重复出现的字节码(热点代码), 编译器会将其编译并保存, 下一次再出现的时候, 直接执行

## AST

**抽象语法树 (Abstract Syntax Tree)**, 是将代码逐字母解析成 **树状对象** 的形式。这是语言之间的转换、代码语法检查, 代码风格检查、代码格式化、代码高亮、代码错误提示、代码自动补全等等的基础。例如:

```javascript
function square(n){
	return n * n
}
```

通过解析转化成的`AST`如下图:

![img](images/AST.jpg)

# babel 编译原理

- babylon 将 ES6/ES7 代码解析成 AST
- babel-traverse 对 AST 进行遍历转译, 得到新的 AST
- 新 AST 通过 babel-generator 转换成 ES5

# Node

## 异步 I/O

### I/O

I/O 即Input/Output, 输入和输出的意思。

在浏览器端，只有一种 I/O，那就是利用 Ajax 发送网络请求，然后读取返回的内容，这属于`网络I/O`。回到 nodejs 中，其实这种的 I/O 的场景就更加广泛了，主要分为两种:

- 文件 I/O。比如用 fs 模块对文件进行读写操作。
- 网络 I/O。比如 http 模块发起网络请求

### 阻塞 I/O 非阻塞 I/O

`阻塞`和`非阻塞` I/O 其实是针对**操作系统内核**而言的，而不是 nodejs 本身。阻塞 I/O 的特点就是一定要**等到操作系统完成所有操作后才表示调用结束**, 期间 nodejs 程序一直处于等待状态，什么也做不了. 而非阻塞 I/O 是调用后立马返回，不用等操作系统内核完成操作, 但是操作系统也在同时进行着 I/O, 这样就把等待的时间充分调用了起来。

为了让 nodejs 知道操作系统已经做完 I/O 操作，需要重复地去操作系统那里判断一下是否完成，这种重复判断的方式就是`轮询`。

对于轮询而言，有以下这么几种方案:

1. 一直轮询检查I/O状态，直到 I/O 完成。
   - 这是最原始的方式，也是性能最低的，会让 CPU 一直耗用在等待上面。其实跟阻塞 I/O 的效果是一样的。
2. 遍历文件描述符(即 文件I/O 时操作系统和 nodejs 之间的文件凭证)的方式来确定 I/O 是否完成
   - I/O完成则文件描述符的状态改变。但 CPU 轮询消耗还是很大。
3. epoll模式
   - 在进入轮询的时候如果I/O未完成CPU就休眠，完成之后唤醒CPU。

总之，CPU要么重复检查I/O，要么重复检查文件描述符，要么休眠，都得不到很好的利用

期待的是: nodejs 应用程序发起 I/O 调用后可以直接去执行别的逻辑，操作系统默默地做完 I/O 之后**给 nodejs 发一个完成信号**，nodejs 执行回调操作。这是理想效果, 也是异步 I/O 的效果.

### 异步 I/O 本质

Linux 原生存在这样的一种方式，即(AIO), 但两个致命的缺陷:

1. 只有 Linux 下存在，在其他系统中没有异步 I/O 支持。
2. 无法利用系统缓存。

#### nodejs 的异步 io 方案

**利用线程池实现**: 让一个进程进行计算操作，另外一些进行 I/O 调用，I/O 完成后把信号传给计算的线程，进而执行回调(基于操作系统支持)

只不过在不同的系统下面表现会有所差异，在 Linux 下可以直接使用线程池来完成，在Window系统下则采用 IOCP 这个系统API(其内部还是用线程池完成的)。

有了操作系统的支持，那 nodejs 如何来对接这些操作系统从而实现异步 I/O 呢？

#### 执行流程

分析文件 IO 执行流程

```javascript
let fs = require('fs');
fs.readFile('/test.txt', function (err, data) {
    console.log(data); 
});
```

执行代码的过程中大概发生了这些事情:

1. 首先，fs.readFile调用Node的核心模块fs.js ；(方法调用核心模块)
2. 接下来，Node的核心模块调用内建模块node_file.cc，创建对应的文件I/O观察者对象(这个对象后面有大用！) ；(核心模块调用内建模块, 创建观察者对象)
3. 最后，根据不同平台（Linux或者window），内建模块通过libuv中间层进行系统调用;(内建模块通过 libuv 进行系统调用)

![img](images/文件IO过程.jpg)

#### libuv 调用过程分析

libuv 中是如何来进行进行系统调用的呢？也就是 uv_fs_open() 中做了些什么？

##### 1. 创建请求对象

以Windows系统为例来说，在这个函数的调用过程中，我们创建了一个文件I/O的**请求对象**，并往里面注入了回调函数。

```cpp
req_wrap->object_->Set(oncomplete_sym, callback);
```

req_wrap 便是这个请求对象，req_wrap 中 object_ 的 oncomplete_sym 属性对应的值便是我们 nodejs 应用程序代码中传入的回调函数。

##### 2. 推入线程池，调用返回

在这个对象包装完成后，QueueUserWorkItem() 方法将这个对象推进线程池中等待执行。

好，至此现在js的调用就直接返回了，我们的 js 应用程序代码可以`继续往下执行`，当然，当前的 `I/O` 操作同时也在线程池中将被执行，完成了异步.

接下来便是执行回调通知的环节。

##### 3. 回调通知

事实上现在线程池中的 I/O 无论是阻塞还是非阻塞都已经无所谓了，因为异步的目的已经达成。重要的是 I/O 完成后会发生什么。

在介绍后续的故事之前，给大家介绍两个重要的方法: `GetQueuedCompletionStatus` 和 `PostQueuedCompletionStatus`。

1. 还记得之前讲过的 eventLoop 吗？在每一个Tick当中会调用`GetQueuedCompletionStatus`检查线程池中是否有执行完的请求，如果有则表示时机已经成熟，可以执行回调了。
2. `PostQueuedCompletionStatus`方法则是向 IOCP 提交状态，告诉它当前I/O完成了。

名字比较长，先介绍是为了让大家混个脸熟，至少后面出来不会感到太突兀：）

我们言归正传，把后面的过程串联起来。

当对应线程中的 I/O 完成后，会将获得的结果`存储`起来，保存到`相应的请求对象`中，然后调用`PostQueuedCompletionStatus()`向 IOCP 提交执行完成的状态，并且将线程还给操作系统。一旦 EventLoop 的轮询操作中，调用`GetQueuedCompletionStatus`检测到了完成的状态，就会把`请求对象`塞给I/O观察者(之前埋下伏笔，如今终于闪亮登场)。

I/O 观察者现在的行为就是取出`请求对象`的`存储结果`，同时也取出它的`oncomplete_sym`属性，即回调函数(不懂这个属性的回看第1步的操作)。将前者作为函数参数传入后者，并执行后者。 这里，回调函数就成功执行啦！

总结 :

1. `阻塞`和`非阻塞` I/O 其实是针对操作系统内核而言的。阻塞 I/O 的特点就是一定要**等到操作系统完成所有操作后才表示调用结束**，而非阻塞 I/O 是调用后立马返回，不用等操作系统内核完成操作。
2. nodejs中的异步 I/O 采用多线程的方式，由 `EventLoop`、`I/O 观察者`，`请求对象`、`线程池`四大要素相互配合，共同实现。

## 异常捕获

### try/catch 限制

try/catch 无法捕捉异步回调中的异常. 

Node 原生提供 uncaughtException 事件挂到 process 对象上, 捕获所有未处理的异常

- 无法知道错误的来源, 不好定位.
- 整个 node 进程 crash 掉

### 使用 domain 模块捕获异常

`domain` 专门处理异步回调的异常

```javascript
import domain from 'domain';
import fs from 'fs';

process.on('uncaughtException', function (err) {
  console.error('Error caught in uncaughtException event:', err);
});

var d = domain.create();

d.on('error', function (err) {
  console.error('Error caught by domain:', err);
});

d.run(function () {
  process.nextTick(function () {
    fs.readFile('non_existent.js', function (err, str) {
      if (err) throw err;
      else console.log(str);
    });
  });
});

/*
Error caught by domain: [Error: ENOENT: no such file or directory, open 'non_existent.js'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'non_existent.js',
  domainThrown: true
}
*/
```

注意 `uncaughtException` 回调并没有执行.

### 激活/退出 domain 模块

enter 激活

```javascript
var d = domain.create();

d.enter(); // 使用这句激活 domain 实例 d
console.log(process.domain, domain.active);
// 未激活的话, 均是 null

// 激活后, 两者相同
/*
Domain {
  _events: [Object: null prototype] {
    removeListener: [Function: updateExceptionCapture],
    newListener: [Function: updateExceptionCapture]
  },
  _eventsCount: 2,
  _maxListeners: undefined,
  members: [],
  [Symbol(kCapture)]: false,
  [Symbol(kWeak)]: WeakReference {}
}
*/
```

exit 退出

exit 后,  使用 `d.run()` 方法仍然可以捕获错误.

```javascript
d.exit();
console.log(process.domain,  domain.active);
// undefined undefined
d.run(...) // 仍然可以使用
```

### 直接使用的封装方法

`run` 方法

对 enter 和 exit 方法的简单封装

```javascript
// 使用 enter 和 exit 捕获回调中的错误
var d = domain.create();

d.enter()

d.on('error', function (err) {
  console.error('Error caught by domain:', err);
});

process.nextTick(function () {
  fs.readFile('non_existent.js', function (err, str) {
    if (err) throw err;
    else console.log(str);
  });
});

d.exit();

// 不开启 enter, 则 uncaughtException 捕获错误
/*
Error caught in uncaughtException event: [Error: ENOENT: no such file or directory, open 'non_existent.js'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'non_existent.js'
}
*/

// 直接使用 run 方法
d.run(() => {
  process.nextTick(function () {
    fs.readFile('non_existent.js', function (err, str) {
      if (err) throw err;
      else console.log(str);
    });
  });
})
```

`bind` 方法

```javascript
process.nextTick(function () {
  fs.readFile('non_existent.js', d.bind(function (err, str) {
    if (err) throw err;
    else console.log(str);
  }));
});
```

`intercept` 方法

不同的是, 将异步回调的错误直接拦截.

```javascript
process.nextTick(function () {
  fs.readFile('non_existent.js', d.intercept(function (str) {
    console.log(str);
  }));
});
```

### domain 隐式绑定

### domain 显式绑定

## 支持高并发

### 单线程

好处：

- 没有多线程之间的状态同步问题
- 没有线程切换的开销
- 没有死锁

坏处：

- 无法充分利用多核 CPU
- 大量计算占用CPU会导致应用阻塞（不适用CPU密集型）
- 错误会引起整个应用退出

针对性解决方案：

1. 创建多进程、细分实例

   创建多进程：一台多核服务器创建多个进程, 处理好进程间通信

   细分实例：将物理机划分为多个单核虚拟机, 通过 pm2 等工具, 管理多台虚拟机形成集群架构, 处理好机器间通信。
2. 时间片轮转

   在单线程模拟多线程, 适当减少阻塞感
3. 负载均衡、坏点监控/隔离

   错误无法通过try/catch捕捉, 出错会导致应用退出。

   可以通过 pm2 或者 nginx 工具, 动态判断服务状态。服务出错时隔离坏点服务器, 将请求转发到正常服务器上, 并重启坏点服务器来继续提供服务。（Node 分布式架构）

### 异步I/O

需要等待的操作先跳过, 在耗时操作返回回调时再处理, 省去等待时间。

### 事件驱动编程

主线程通过 event loop 事件循环触发运行程序。

### Node 分布式架构

![img](images/node分布式.jpg)

## npm 模块安装机制

之前提到 js 的模块化, 在 node 中, npm 提供了别人写好的各种功能的模块的下载, 使得开发者不用重复造轮子, 造的轮子也能上传被大家使用。

一个项目中, 下载的模块都会被放在 `node_modules` 目录中, 使用时直接引用即可。

### npm install 安装模块

执行 npm `install` 时会先检查在 `node_modules` 目录中指定模块是否已经安装过, 如果已经安装过则不在继续安装。

```javascript
npm install <packageName> // 已经安装则不再继续安装
npm install <packageName> --force/-f // 强制覆盖已安装模块
```

### npm update 更新模块

```javascript
npm update <packageName>
```

### npm 模块仓库查询服务 registry

**网址**

`https://registry.npmjs.org/[模块名][/[版本号]]`, 直接访问网址会得到一个 JSON 对象, 里面包含该模块所有的版本信息。

示例：`https://registry.npmjs.org/react`, `https://registry.npmjs.org/react/0.0.1`

返回结果中的 `dist.tarball` 表示的地址, 就是模块该版本压缩包的地址, 访问这个地址将压缩包下载下来, 再在本地解压即得到模块源码（npm instll、npm update 均通过该种方式安装模块）。

```json
"dist":{"shasum":"c84d3dbff0c65577a52f0bfe431f8bcc155fa365", "tarball":"https://registry.npmjs.org/react/-/react-0.0.1.tgz"}
```

**命令**

下述一个命令得到的结构都相同, 下面以 react 模块作为示例。

```
npm view react
npm info react
npm show react
npm v react
```

### 缓存目录

npm install 或者 npm update 下载的模块压缩包, 都存在本地缓存目录。

查看缓存目录：`npm config get cache`

输出: `/Users/jinlingzhang/.npm`

### 模块安装过程

1. npm install <packageName>
2. npm 向 registry 查询模块压缩包的网址
3. 下载压缩包到本地缓存目录 `~/.npm`
4. 将压缩包解压至项目的 `node_modules` 目录

同一个模块有两份代码, 一个是缓存目录的压缩包, 一个是 `node_modules` 解压后代码, npm install 时只会检查 `node_modules` 。

实操命令：npm install fs

执行中显示：

`reify:fs: http fetch GET 200 https://registry.npmjs.org/fs/-/fs-0.0.1-security.tgz 1728ms`

### --cache-min 参数

用于从缓存目录安装模块。该参数指定一个时间, 超出这个时间, npm 才会从 registry 下载, 改进安装速度。

一直从缓存目录下载：`npm install --cache-min 9999999/Infinity <package-name>`, 但是仍然需要网络连接。

## Node 常用模块

### fs

Node.js内置的`fs`模块就是文件系统模块，负责读写文件。

和所有其它JavaScript模块不同的是，`fs`模块**同时提供了异步和同步的方法**。

回顾一下什么是异步方法。因为JavaScript的单线程模型，执行IO操作时，JavaScript代码无需等待，而是传入回调函数后，继续执行后续JavaScript代码。比如jQuery提供的`getJSON()`操作：

```javascript
$.getJSON('http://example.com/ajax', function (data) {
    console.log('IO结果返回后执行...');
});
console.log('不等待IO结果直接执行后续代码...');
```

而同步的IO操作则需要等待函数返回：

```javascript
// 根据网络耗时，函数将执行几十毫秒~几秒不等:
var data = getJSONSync('http://example.com/ajax');
```

同步操作的好处是代码简单，缺点是程序将等待IO操作，在等待时间内，无法响应其它任何事件。而异步读取不用等待IO操作，但代码较麻烦。

#### 异步读文件

按照JavaScript的标准，异步读取一个文本文件的代码如下：

```javascript
'use strict';

var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
```

请注意，`sample.txt`文件必须在当前目录下，且文件编码为`utf-8`。

异步读取时，传入的回调函数接收两个参数，当正常读取时，`err`参数为`null`，`data`参数为读取到的String。当读取发生错误时，`err`参数代表一个错误对象，`data`为`undefined`。这也是Node.js标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。后面我们还会经常编写这种回调函数。

由于`err`是否为`null`就是判断是否出错的标志，所以通常的判断逻辑总是：

```javascript
if (err) {
    // 出错了
} else {
    // 正常
}
```

如果我们要读取的文件不是文本文件，而是二进制文件，怎么办？

下面的例子演示了如何读取一个图片文件：

```javascript
'use strict';

var fs = require('fs');

fs.readFile('sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
```

当读取二进制文件时，不传入文件编码时，回调函数的`data`参数将返回一个`Buffer`对象。在Node.js 中，`Buffer`对象就是一个包含零个或任意个字节的数组（注意和Array不同）。

`Buffer`对象可以和String作转换，例如，把一个`Buffer`对象转换成String：

```javascript
// Buffer -> String
var text = data.toString('utf-8');
console.log(text);
```

或者把一个String转换成`Buffer`：

```javascript
// String -> Buffer
var buf = Buffer.from(text, 'utf-8');
console.log(buf);
```

#### 同步读文件

除了标准的异步读取模式外，`fs`也提供相应的同步读取函数。同步读取的函数和异步函数相比，多了一个`Sync`后缀，并且不接收回调函数，函数直接返回结果。

用`fs`模块同步读取一个文本文件的代码如下：

```javascript
'use strict';

var fs = require('fs');

var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);
```

可见，原异步调用的回调函数的`data`被函数直接返回，函数名需要改为`readFileSync`，其它参数不变。

如果同步读取文件发生错误，则需要用`try...catch`捕获该错误：

```javascript
try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    // 出错了
}
```

#### 写文件

将数据写入文件是通过`fs.writeFile()`实现的：

```javascript
'use strict';

var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
```

`writeFile()`的参数依次为文件名、数据和回调函数。如果传入的数据是String，默认按UTF-8编码写入文本文件，如果传入的参数是`Buffer`，则写入的是二进制文件。回调函数由于只关心成功与否，因此只需要一个`err`参数。

和`readFile()`类似，`writeFile()`也有一个同步方法，叫`writeFileSync()`：

```javascript
'use strict';

var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);
```

#### stat

如果我们要获取文件大小，创建时间等信息，可以使用`fs.stat()`，它返回一个`Stat`对象，能告诉我们文件或目录的详细信息：

```javascript
'use strict';

var fs = require('fs');

fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
```

运行结果如下：

```javascript
isFile: true
isDirectory: false
size: 181
birth time: Fri Dec 11 2015 09:43:41 GMT+0800 (CST)
modified time: Fri Dec 11 2015 12:09:00 GMT+0800 (CST)
```

`stat()`也有一个对应的同步函数`statSync()`，请试着改写上述异步代码为同步代码。

#### 异步还是同步

在`fs`模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，***必须使用异步代码***，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。

### stream

`stream`是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

什么是流？流是一种抽象的数据结构。想象水流，当在水管中流动时，就可以从某个地方（例如自来水厂）源源不断地到达另一个地方（比如你家的洗手池）。我们也可以把数据看成是数据流，比如你敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，实际上它还对应着一个名字：标准输入流（stdin）。

如果应用程序把字符一个一个输出到显示器上，这也可以看成是一个流，这个流也有名字：标准输出流（stdout）。流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位。

![nodejs-stream](images/nodejs-stream.jpg)

#### 读数据

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，只需要把数据不断地往文件流中写进去就可以了。

在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

下面是一个从文件流读取文本内容的示例：

```javascript
'use strict';

var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});
```

要注意，`data`事件可能会有多次，每次传递的`chunk`是流的一部分数据。

#### 写数据

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：

```javascript
'use strict';

var fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();
```

所有可以读取数据的流都继承自`stream.Readable`，所有可以写入的流都继承自`stream.Writable`。

#### pipe

就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在Node.js中，`Readable`流有一个`pipe()`方法，就是用来干这件事的。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```javascript
'use strict';

var fs = require('fs');

var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);
```

默认情况下，当`Readable`流的数据读取完毕，`end`事件触发后，将自动关闭`Writable`流。如果我们不希望自动关闭`Writable`流，需要传入参数：

```javascript
readable.pipe(writable, { end: false });
```

### http

Node.js开发的目的就是为了用JavaScript编写Web服务器程序。因为JavaScript实际上已经统治了浏览器端的脚本，其优势就是有世界上数量最多的前端开发人员。如果已经掌握了JavaScript前端开发，再学习一下如何将JavaScript应用在后端开发，就是名副其实的*全栈*了。

**HTTP协议**

要理解Web服务器程序的工作原理，首先，我们要对HTTP协议有基本的了解。如果你对HTTP协议不太熟悉，先看一看[HTTP协议简介](http://www.liaoxuefeng.com/wiki/1016959663602400/1017804782304672)。

#### HTTP服务器

要开发HTTP服务器程序，从头处理TCP连接，解析HTTP是不现实的。这些工作实际上已经由Node.js自带的`http`模块完成了。应用程序并不直接和HTTP协议打交道，而是操作`http`模块提供的`request`和`response`对象。

`request`对象封装了HTTP请求，我们调用`request`对象的属性和方法就可以拿到所有HTTP请求的信息；

`response`对象封装了HTTP响应，我们操作`response`对象的方法，就可以把HTTP响应返回给浏览器。

用Node.js实现一个HTTP服务器程序非常简单。我们来实现一个最简单的Web程序`hello.js`，它对于所有请求，都返回`Hello world!`：

```javascript
'use strict';

// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```

在命令提示符下运行该程序，可以看到以下输出：

```javascript
$ node hello.js 
Server is running at http://127.0.0.1:8080/
```

不要关闭命令提示符，直接打开浏览器输入`http://localhost:8080`，即可看到服务器响应的内容：

![http-hello-sample](images/http-hello-sample.jpg)

同时，在命令提示符窗口，可以看到程序打印的请求信息：

```
GET: /
GET: /favicon.ico
```

这就是我们编写的第一个HTTP服务器程序！

#### 文件服务器

url 模块 path 模块

让我们继续扩展一下上面的Web程序。我们可以设定一个目录，然后让Web程序变成一个文件服务器。要实现这一点，我们只需要解析`request.url`中的路径，然后在本地找到对应的文件，把文件内容发送出去就可以了。

解析URL需要用到Node.js提供的`url`模块，它使用起来非常简单，通过`parse()`将一个字符串解析为一个`Url`对象：

```javascript
'use strict';

var url = require('url');

console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
```

结果如下：

```javascript
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/path/to/file',
  path: '/path/to/file?query=string',
  href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash' }
```

处理本地文件目录需要使用Node.js提供的`path`模块，它可以方便地构造目录：

```javascript
'use strict';

var path = require('path');

// 解析当前目录:
var workDir = path.resolve('.'); // '/Users/michael'

// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'pub', 'index.html');
// '/Users/michael/pub/index.html'
```

使用`path`模块可以正确处理操作系统相关的文件路径。在Windows系统下，返回的路径类似于`C:\Users\michael\static\index.html`，这样，我们就不关心怎么拼接路径了。

最后，我们实现一个文件服务器`file_server.js`：

```javascript
'use strict';

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```

没有必要手动读取文件内容。由于`response`对象本身是一个`Writable Stream`，直接用`pipe()`方法就实现了自动读取文件内容并输出到HTTP响应。

在命令行运行`node file_server.js /path/to/dir`，把`/path/to/dir`改成你本地的一个有效的目录，然后在浏览器中输入`http://localhost:8080/index.html`：

![http-index-page](images/http-index-page.jpg)

只要当前目录下存在文件`index.html`，服务器就可以把文件内容发送给浏览器。观察控制台输出：

```javascript
200 /index.html
200 /css/uikit.min.css
200 /js/jquery.min.js
200 /fonts/fontawesome-webfont.woff2
```

第一个请求是浏览器请求`index.html`页面，后续请求是浏览器解析HTML后发送的其它资源请求。

**练习**

在浏览器输入`http://localhost:8080/`时，会返回404，原因是程序识别出HTTP请求的不是文件，而是目录。请修改`file_server.js`，如果遇到请求的路径是目录，则自动在目录下依次搜索`index.html`、`default.html`，如果找到了，就返回HTML文件的内容。

### crypto

crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

> hash 算法

#### MD5和SHA1

MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

```
const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544
```

`update()`方法默认字符串编码为`UTF-8`，也可以传入Buffer。

如果要计算SHA1，只需要把`'md5'`改成`'sha1'`，就可以得到SHA1的结果`1f32b9c9932c02227819a4151feed43e131aca40`。

还可以使用更安全的`sha256`和`sha512`。

#### Hmac

Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：

```
const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex')); // 80f7e22570...
```

只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。

> 对称加密算法

#### AES

AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：

```javascript
const crypto = require('crypto');

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);
```

运行结果如下：

```javascript
Plain text: Hello, this is a secret message!
Encrypted text: 8a944d97bdabc157a5b7a40cb180e7...
Decrypted text: Hello, this is a secret message!
```

可以看出，加密后的字符串通过解密又得到了原始内容。

注意到AES有很多不同的算法，如`aes192`，`aes-128-ecb`，`aes-256-cbc`等，AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。加密结果通常有两种表示方法：hex和base64，这些功能Nodejs全部都支持，但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。如果无法正确解密，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，加密后的数据是否统一为hex或base64格式。

#### Diffie-Hellman

DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。DH算法基于数学原理，比如小明和小红想要协商一个密钥，可以这么做：

1. 小明先选一个素数和一个底数，例如，素数`p=23`，底数`g=5`（底数可以任选），再选择一个秘密整数`a=6`，计算`A=g^a mod p=8`，然后大声告诉小红：`p=23，g=5，A=8`；
2. 小红收到小明发来的`p`，`g`，`A`后，也选一个秘密整数`b=15`，然后计算`B=g^b mod p=19`，并大声告诉小明：`B=19`；
3. 小明自己计算出`s=B^a mod p=2`，小红也自己计算出`s=A^b mod p=2`，因此，最终协商的密钥`s`为`2`。

在这个过程中，密钥`2`并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的。第三方只能知道`p=23`，`g=5`，`A=8`，`B=19`，由于不知道双方选的秘密整数`a=6`和`b=15`，因此无法计算出密钥`2`。

用crypto模块实现DH算法如下：

```javascript
const crypto = require('crypto');

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));
```

运行后，可以得到如下输出：

```sh
$ node dh.js 
Prime: a8224c...deead3
Generator: 02
Secret of Xiao Ming: 695308...d519be
Secret of Xiao Hong: 695308...d519be
```

注意每次输出都不一样，因为素数的选择是随机的。

> 非对称加密

#### RSA

RSA算法是一种非对称加密算法，即由一个私钥和一个公钥构成的密钥对，通过私钥加密，公钥解密，或者通过公钥加密，私钥解密。其中，公钥可以公开，私钥必须保密。

RSA算法是1977年由Ron Rivest、Adi Shamir和Leonard Adleman共同提出的，所以以他们三人的姓氏的头字母命名。

当小明给小红发送信息时，可以用小明自己的私钥加密，小红用小明的公钥解密，也可以用小红的公钥加密，小红用她自己的私钥解密，这就是非对称加密。相比对称加密，非对称加密只需要每个人各自持有自己的私钥，同时公开自己的公钥，不需要像AES那样由两个人共享同一个密钥。

在使用Node进行RSA加密前，我们先要准备好私钥和公钥。

首先，在命令行执行以下命令以生成一个RSA密钥对：

```
openssl genrsa -aes256 -out rsa-key.pem 2048
```

根据提示输入密码，这个密码是用来加密RSA密钥的，加密方式指定为AES256，生成的RSA的密钥长度是2048位。执行成功后，我们获得了加密的`rsa-key.pem`文件。

第二步，通过上面的`rsa-key.pem`加密文件，我们可以导出原始的私钥，命令如下：

```
openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
```

输入第一步的密码，我们获得了解密后的私钥。

类似的，我们用下面的命令导出原始的公钥：

```
openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
```

这样，我们就准备好了原始私钥文件`rsa-prv.pem`和原始公钥文件`rsa-pub.pem`，编码格式均为PEM。

下面，使用`crypto`模块提供的方法，即可实现非对称加解密。

首先，我们用私钥加密，公钥解密：

```javascript
const
    fs = require('fs'),
    crypto = require('crypto');

// 从文件加载key:
function loadKey(file) {
    // key实际上就是PEM编码的字符串:
    return fs.readFileSync(file, 'utf8');
}

let
    prvKey = loadKey('./rsa-prv.pem'),
    pubKey = loadKey('./rsa-pub.pem'),
    message = 'Hello, world!';

// 使用私钥加密:
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));


let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));
```

执行后，可以得到解密后的消息，与原始消息相同。

接下来我们使用公钥加密，私钥解密：

```javascript
// 使用公钥加密:
let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));

// 使用私钥解密:
let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));
```

执行得到的解密后的消息仍与原始消息相同。

如果我们把`message`字符串的长度增加到很长，例如1M，这时，执行RSA加密会得到一个类似这样的错误：`data too large for key size`，这是因为RSA加密的原始信息必须小于Key的长度。那如何用RSA加密一个很长的消息呢？实际上，RSA并不适合加密大数据，而是先生成一个随机的AES密码，用AES加密原始信息，然后用RSA加密AES口令，这样，实际使用RSA时，给对方传的密文分两部分，一部分是AES加密的密文，另一部分是RSA加密的AES口令。对方用RSA先解密出AES口令，再用AES解密密文，即可获得明文。

#### 证书

crypto模块也可以处理数字证书。数字证书通常用在SSL连接，也就是Web的https连接。一般情况下，https连接只需要处理服务器端的单向认证，如无特殊需求（例如自己作为Root给客户发认证证书），建议用反向代理服务器如Nginx等Web服务器去处理证书。

### children_process

创建子进程

child_process是Node.js的一个十分重要的模块，通过它可以实现创建多进程，以利用多核计算资源。

> Node.js可以创建一个子进程执行密集的cpu计算任务（例如上面例子中的longComputation）来解决问题，而child_process模块正是用来创建子进程的。

child_process 提供了几种创建子进程的方式

异步方式：spawn、exec、execFile、fork
同步方式：spawnSync、execSync、execFileSync

spawn: shell 命令(分开)

fork: 执行 nodejs 模块

exec: shell 命令

1. `child_process`模块提供了四个创建子进程的函数，分别是`spawn`，`exec`，`execFile`和`fork`。其中`spawn`是最原始的创建子进程的函数，其他三个都是对`spawn`不同程度的封装。

`spawn`只能运行指定的程序，参数需要在列表中给出，相当于`execvp`系统函数，而`exec`可以直接运行复杂的命令。

```javascript
child_process.spawn(command, [args], [options])

child_process.exec(command, [options], callback)
```

例如要运行`ls -lh /usr`，使用`spawn`需要写成`spawn('ls', ['-lh', '/usr'])`，而`exec`只需`exec('ls -lh /usr')`。

`exec`的实现原理是**启动了一个系统shell**来解析参数，因此可以是非常复杂的命令，包括管道和重定向。

此外，`exec`还可以直接接受一个回调函数作为参数，回调函数有三个参数，分别是`err`, `stdout` , `stderr`，非常方便直接使用，例如：

```javascript
require('child_process').exec( 'ls -lh /usr' , function(err, stdout , stderr ) {
  console.log( stdout );
});
```

如果使用`spawn`，则必须写成：

2.`fork`函数用于直接运行Node.js模块，例如`fork('./child.js')`，相当于`spawn('node', ['./child.js'])`。

与默认的`spawn`不同的是，`fork`会在父进程与子进程直接建立一个IPC管道，用于父子进程之间的通信。例如

```javascript
var n = require('child_process').fork( './child.js'); 
n.on( 'message', function(m) { 
  console.log( 'PARENT got message:', m);
});
n.send({ hello: 'world' });
```

child.js的内容

```javascript
process. on ( 'message', function(m) { 
  console. log ( 'CHILD got message:', m);
});
process.send({ foo: 'bar' });
```

结果：

结果是:

```
PARENT got message: { foo: 'bar' }
CHILD got message: { hello: 'world' }
```

3.`fork`函数有一个问题，就是它只能运行JavaScript代码，如果你喜欢用CoffeeScript（或者其他任何编译到js的语言），是无法通过`fork`调用的。

一个简单的方法是把代码编译到JavaScript再运行，但是很不方便，有没有什么办法呢？答案是可以的，

```javascript
child_process.spawn(command, [args], [options])
```

通过把`options`参数的`stdio`设为`['ipc']`，

即可在父子进程之间建立IPC管道。例如子进程使用CoffeeScript：

```javascript
child_process = require ('child_process');
options ={stdio: ['ipc'] };
child = child_process.spawn('coffee', ['./child.coffee'], options);
```

其中只要把`spawn`的第一个参数设置为运行对应脚本的解释器，即可运行，例如使用 Continuation.js，

只需`child = child_process.spawn('continuation', ['./child.coffee'], options)`。

### cluster 集群

单个 Node.js 实例运行在单个线程中, 为了充分利用多核系统, 有时需要启用一组 Node.js 进程(监听同个端口)去处理负载任务.

cluster 模块可以创建共享服务器端口的子进程.

Node.js默认单进程运行，对于32位系统最高可以使用512MB内存，对于64位最高可以使用1GB内存。对于多核CPU的计算机来说，这样做效率很低，因为只有一个核在运行，其他核都在闲置。cluster模块就是为了解决这个问题而提出的。

cluster模块允许设立一个主进程和若干个worker进程，由主进程监控和协调worker进程的运行。worker之间采用进程间通信交换消息，cluster模块内置一个负载均衡器，采用Round-robin算法协调各个worker进程之间的负载。运行时，所有新建立的链接都由主进程完成，然后主进程再把TCP连接分配给指定的worker进程

**本例共享 HTTP 服务器**

```js
import cluster from 'cluster';
import http from 'http';
import os from 'os';
const numCPUs = os.cpus().length;

// 当前进程是主进程
if (cluster.isMaster) {
    console.log('**', cluster.isMaster);
    console.log(`主进程 ${process.pid} 正在运行`);

    // 衍生工作进程。
    // 按照 cpu 核数, 创建若干 worker 进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else { // 当前进程是 worker 进程 则创建一个 http 服务器
    // 工作进程可以共享任何 TCP 连接。
    // 在本例子中，共享的是 HTTP 服务器。
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('你好世界\n');
    }).listen(8000);

    console.log(`工作进程 ${process.pid} 已启动`);
}
```

上面代码先判断当前进程是否为主进程（cluster.isMaster），如果是的，就按照CPU的核数，新建若干个worker进程；如果不是，说明当前进程是worker进程，则在该进程启动一个服务器程序。

运行代码，则工作进程会共享 8000 端口：

```console
$ node server.js
主进程 3596 正在运行
工作进程 4324 已启动
工作进程 4520 已启动
工作进程 6056 已启动
工作进程 5644 已启动
```

在主进程部署online事件和exit事件的监听函数, 确保 worker 进程挂了或者上线, 主进程能够知道.

```javascript
var cluster = require('cluster');

if(cluster.isMaster) {
  var numWorkers = require('os').cpus().length;
  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  // 部署 online 事件
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  // 部署 exit 事件
  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
}
```

上面代码中，主进程一旦监听到worker进程的exit事件，就会重启一个worker进程。worker进程一旦启动成功，可以正常运行了，就会发出online事件。

#### worker 对象

worker 对象是 cluster.fork() 的返回值, 代表一个worker进程.

它的属性和方法如下。

1. worker.id

   worker.id返回当前worker的独一无二的进程编号。这个编号也是cluster.workers中指向当前进程的索引值。

2. worker.process

   所有的worker进程都是用child_process.fork()生成的。child_process.fork()返回的对象，就被保存在worker.process之中。通过这个属性，可以获取worker所在的进程对象。

   worker.process 打印如下:

   ```javascript
   <ref *1> ChildProcess {
     _events: [Object: null prototype] {
       internalMessage: [ [Function (anonymous)], [Function: onInternalMessage] ],
       error: [Function (anonymous)],
       message: [Function (anonymous)],
       exit: [Function: bound onceWrapper] { listener: [Function (anonymous)] },
       disconnect: [Function: bound onceWrapper] { listener: [Function (anonymous)] }
     },
     _eventsCount: 5,
     _maxListeners: undefined,
     _closesNeeded: 2,
     _closesGot: 0,
     connected: true,
     signalCode: null,
     exitCode: null,
     killed: false,
     spawnfile: '/Users/jinlingzhang/.nvm/versions/node/v15.5.1/bin/node',
     _handle: Process {
       onexit: [Function (anonymous)],
       pid: 95673,
       [Symbol(owner_symbol)]: [Circular *1]
     },
     spawnargs: [
       '/Users/jinlingzhang/.nvm/versions/node/v15.5.1/bin/node',
       '/Users/jinlingzhang/Documents/personal/test/test2.js'
     ],
     pid: 95673,
     stdin: null,
     stdout: null,
     stderr: null,
     stdio: [ null, null, null, null ],
     channel: Control {
       _events: [Object: null prototype] {},
       _eventsCount: 0,
       _maxListeners: undefined,
       [Symbol(kCapture)]: false
     },
     _handleQueue: null,
     _pendingMessage: null,
     send: [Function (anonymous)],
     _send: [Function (anonymous)],
     disconnect: [Function (anonymous)],
     _disconnect: [Function (anonymous)],
     [Symbol(kCapture)]: false,
     [Symbol(kChannelHandle)]: Pipe {
       pendingHandle: null,
       sockets: { got: {}, send: {} },
       [Symbol(kJSONBuffer)]: '',
       [Symbol(kStringDecoder)]: undefined
     }
   }
   ```

3. worker.send()

   该方法用于在主进程中，向子进程发送信息。

   ```javascript
   if (cluster.isMaster) {
     var worker = cluster.fork();
     worker.send('hi there');
   } else if (cluster.isWorker) {
     // 监听主进程发的消息
     process.on('message', function(msg) {
       process.send(msg);
     });
   }
   ```
```
   
上面代码的作用是，worker进程对主进程发出的每个消息，都做回声。
   
在worker进程中，要向主进程发送消息，使用`process.send(message)`；要监听主进程发出的消息，使用下面的代码。
   
   ```javascript
   process.on('message', function(message) {
     console.log(message);
   });
```

发出的消息可以字符串，也可以是JSON对象。下面是一个发送JSON对象的例子。

   ```javascript
   worker.send({
     type: 'task 1',
     from: 'master',
     data: {
       // the data that you want to transfer
     }
   });
   ```

   

#### cluster.workers对象

该对象只有主进程才有，包含了所有worker进程。每个成员的键值就是一个worker进程对象，键名就是该worker进程的worker.id属性。

```jsx
function eachWorker(callback) {
  for (var id in cluster.workers) {
    callback(cluster.workers[id]);
  }
}
eachWorker(function(worker) {
  worker.send('big announcement to all workers');
});
```

上面代码用来遍历所有worker进程。

当前socket的data事件，也可以用id属性识别worker进程。

```jsx
socket.on('data', function(id) {
  var worker = cluster.workers[id];
});
```

#### cluster模块的属性与方法

##### isMaster，isWorker

isMaster属性返回一个布尔值，表示当前进程是否为主进程。这个属性由process.env.NODE_UNIQUE_ID决定，如果process.env.NODE_UNIQUE_ID为未定义，就表示该进程是主进程。

isWorker属性返回一个布尔值，表示当前进程是否为work进程。它与isMaster属性的值正好相反。

##### fork()

fork方法用于新建一个worker进程，上下文都复制主进程。只有主进程才能调用这个方法。

cluster.fork() 该方法返回一个worker对象。

##### kill()

kill方法用于终止worker进程。它可以接受一个参数，表示系统信号。

如果当前是主进程，就会终止与worker.process的联络，然后将系统信号法发向worker进程。如果当前是worker进程，就会终止与主进程的通信，然后退出，返回0。

在以前的版本中，该方法也叫做 worker.destroy() 。

##### listening事件

worker进程调用listening方法以后，“listening”事件就传向该进程的服务器，然后传向主进程。

该事件的回调函数接受两个参数，一个是当前worker对象，另一个是地址对象，包含网址、端口、地址类型（IPv4、IPv6、Unix socket、UDP）等信息。这对于那些服务多个网址的Node应用程序非常有用。

```jsx
cluster.on('listening', function (worker, address) {
  console.log("A worker is now connected to " + address.address + ":" + address.port);
});
```



#### 不中断地重启 Node 服务

***思路***

重启服务需要关闭后再启动，利用cluster模块，可以做到先启动一个worker进程，再把原有的所有work进程关闭。这样就能实现不中断地重启Node服务。(pm2 进行重启的方法)

首先，主进程向worker进程发出重启信号。

```css
workers[wid].send({type: 'shutdown', from: 'master'});
```

worker进程监听message事件，一旦发现内容是shutdown，就退出。

```php
process.on('message', function(message) {
  if(message.type === 'shutdown') {
    process.exit(0);
  }
});
```

下面是一个关闭所有worker进程的函数。

```javascript
function restartWorkers() {
  var wid, workerIds = [];
  for(wid in cluster.workers) {
    workerIds.push(wid);
  }

  workerIds.forEach(function(wid) {
    cluster.workers[wid].send({
      text: 'shutdown',
      from: 'master'
     });
    setTimeout(function() {
      if(cluster.workers[wid]) {
        cluster.workers[wid].kill('SIGKILL');
      }
    }, 5000);
  });
};
```

***实例***

下面是一个完整的实例，先是主进程的代码master.js。

```js
var cluster = require('cluster');

console.log('started master with ' + process.pid);

// 新建一个worker进程
cluster.fork();

process.on('SIGHUP', function () {
  console.log('Reloading...');
  var new_worker = cluster.fork();
  new_worker.once('listening', function () {
    // 关闭所有其他worker进程
    for(var id in cluster.workers) {
      if (id === new_worker.id.toString()) continue;
      cluster.workers[id].kill('SIGTERM');
    }
  });
});
```

上面代码中，主进程监听SIGHUP事件，如果发生该事件就关闭其他所有worker进程。之所以是SIGHUP事件，是因为nginx服务器监听到这个信号，会创造一个新的worker进程，重新加载配置文件。另外，关闭worker进程时，主进程发送SIGTERM信号，这是因为Node允许多个worker进程监听同一个端口。

下面是worker进程的代码server.js。

```jsx
var cluster = require('cluster');

if (cluster.isMaster) {
  require('./master');
  return;
}

var express = require('express');
var http = require('http');
var app = express();

app.get('/', function (req, res) {
  res.send('ha fsdgfds gfds gfd!');
});

http.createServer(app).listen(8080, function () {
  console.log('http://localhost:8080');
});
```

使用时代码如下。

```dart
$ node server.js
started master with 10538
http://localhost:8080
```

然后，向主进程连续发出两次SIGHUP信号。

```bash
$ kill -SIGHUP 10538
$ kill -SIGHUP 10538
```

主进程会连续两次新建一个worker进程，然后关闭所有其他worker进程，显示如下。

```cpp
Reloading...
http://localhost:8080
Reloading...
http://localhost:8080
```

最后，向主进程发出SIGTERM信号，关闭主进程。

```bash
$ kill 10538
```

##### PM2模块

**PM2模块是cluster模块的一个包装层**。它的作用是尽量将cluster模块抽象掉，让用户像使用单进程一样，部署多进程Node应用。

```jsx
// app.js
var http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200);
  res.end("hello world");
}).listen(8080);
```

上面代码是标准的Node架设Web服务器的方式，然后用PM2从命令行启动这段代码。

```ruby
$ pm2 start app.js -i 4
```

上面代码的i参数告诉PM2，这段代码应该在cluster_mode启动，且新建worker进程的数量是4个。如果i参数的值是0，那么当前机器有几个CPU内核，PM2就会启动几个worker进程。

如果一个worker进程由于某种原因挂掉了，会立刻重启该worker进程。

```ruby
# 重启所有worker进程
$ pm2 reload all
```

每个worker进程都有一个id，可以用下面的命令查看单个worker进程的详情。

```dart
$ pm2 show <worker id>
```

正确情况下，PM2采用fork模式新建worker进程，即主进程fork自身，产生一个worker进程。`pm2 reload`命令则会用spawn方式启动，即一个接一个启动worker进程，一个新的worker启动成功，再杀死一个旧的worker进程。采用这种方式，重新部署新版本时，服务器就不会中断服务。

```ruby
$ pm2 reload <脚本文件名>
```

关闭worker进程的时候，可以部署下面的代码，让worker进程监听shutdown消息。一旦收到这个消息，进行完毕收尾清理工作再关闭。

```javascript
process.on('message', function(msg) {
  if (msg === 'shutdown') {
    close_all_connections();
    delete_logs();
    server.close();
    process.exit(0);
  }
});
```



详细可见[该文章](https://www.jianshu.com/p/05bf26483f3a)

## Puppeteer 无头浏览器

### 简介

Puppeteer 是一个 Node 库，它提供了高级的 API 并通过 DevTools 协议来控制 Chrome(或Chromium)。通俗来说就是一个 headless chrome 浏览器 (也可以配置成有 UI 的，默认是没有的)

### 功能

- 生成网页截图或者 PDF
- 抓取单页应用(SPA)执行并渲染
- 做表单的自动提交、UI的自动化测试、模拟键盘输入等
- 用浏览器自带的一些调试工具和性能分析工具帮助我们分析问题
- 在最新的无头浏览器环境里做测试、使用最新浏览器特性

### 结构

![img](images/puppeteer.jpg)

\- Puppeteer 使用 DevTools 协议 与浏览器进行通信
\- Browser 实例可以拥有浏览器上下文
\- BrowserContext 实例定义了一个浏览会话并可拥有多个页面
\- Page 至少有一个主框架(main frame)。 可能还有其他框架由 iframe 或 frame 创建
\- frame 至少有一个执行上下文(默认的执行JavaScript的上下文)。框架可能有额外的与扩展关联的执行上下文
\- Worker 具有单一执行上下文，以便于和 WebWorkers 交互

### 举例

```js
const puppeteer = require('puppeteer');
(async () => {
  // 例子代码放在在这里
})()
```

最简单的例子，打开百度并关闭

```js
const browser = await puppeteer.launch({
  headless: false // 关闭无头模式
})
const page = await browser.newPage()
await page.goto('http://www.baidu.com/')
await browser.close()
```

打开百度，截图&生产PDF，然后关闭

```js
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('http://www.baidu.com/')
await page.screenshot({path: 'baidu.png'})
// 目前只能在无头模式下生成pdf https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
await page.pdf({path: 'baidu.pdf'})
await browser.close()
```

监听 `console`，你会看到熟悉的百度招聘的硬广

```js
const browser = await puppeteer.launch()
const page = await browser.newPage()
page.on('console', msg => console.log(msg.type(), msg.text()))
await page.goto('https://www.baidu.com/')
await browser.close()
```

更多参考 [知乎帖](https://zhuanlan.zhihu.com/p/40103840)

##  Node 中回调函数的机制

`回调函数`的方式其实内部利用了`发布-订阅`模式，在这里我们以模拟实现 node 中的 Event 模块为例来写实现回调函数的机制。

```javascript
function EventEmitter() {
  this.events = new Map();
}
```

需要实现 addListener/removeListener/once/removeListener/emit 等函数.

### addListener

```javascript
// once 参数表示是否只是触发一次
const wrapCallback = (fn, once = false) => ({ callback: fn, once });

EventEmitter.prototype.addListener = function (type, fn, once = false) {
  let handler = this.events.get(type);
  if (!handler) {
    // 为 type 事件绑定回调
    this.events.set(type, wrapCallback(fn, once));
  } else if (handler && typeof handler.callback === 'function') {
    // 目前 type 事件只有一个回调
    this.events.set(type, [handler, wrapCallback(fn, once)]);
  } else {
    // 目前 type 事件回调数 >= 2
    handler.push(wrapCallback(fn, once));
  }
}
```

### removeListener

```javascript
EventEmitter.prototype.removeListener = function (type, listener) {
  let handler = this.events.get(type);
  if (!handler) return;
  if (!Array.isArray(handler)) {
    if (handler.callback === listener.callback) this.events.delete(type);
    else return;
  }
  for (let i = 0; i < handler.length; i++) {
    let item = handler[i];
    if (item.callback === listener.callback) {
      // 删除该回调，注意数组塌陷的问题，即后面的元素会往前挪一位。i 要 -- 
      handler.splice(i, 1);
      i--;
      if (handler.length === 1) {
        // 长度为 1 就不用数组存了
        this.events.set(type, handler[0]);
      }
    }
  }
}
```

### once

加入的时候设置为 once:true, 执行完毕后删除该监听函数.

```javascript
EventEmitter.prototype.once = function (type, fn) {
  this.addListener(type, fn, true);
}
```

### emit

```javascript
EventEmitter.prototype.emit = function (type, ...args) {
  let handler = this.events.get(type);
  if (!handler) return;
  if (Array.isArray(handler)) {
    // 遍历列表，执行回调
    handler.map(item => {
      item.callback.apply(this, args);
      // 标记的 once: true 的项直接移除
      if (item.once) this.removeListener(type, item);
    })
  } else {
    // 只有一个回调则直接执行
    handler.callback.apply(this, args);
  }
  return true;
}
```

### removeAllListener

```javascript
EventEmitter.prototype.removeAllListener = function (type) {
  let handler = this.events.get(type);
  if (!handler) return;
  else this.events.delete(type);
}
```



## Koa

Node 主要用在开发 Web 应用。这决定了使用 Node，往往离不开 Web 应用框架。

![img](images/koa.jpg)

[Koa](http://koajs.com/) 就是一种简单好用的 Web 框架。它的特点是优雅、简洁、表达力强、自由度高。本身代码只有1000多行，所有功能都通过插件实现，很符合 Unix 哲学。

本文从零开始，循序渐进，教会你如何使用 Koa 写出自己的 Web 应用。每一步都有简洁易懂的示例，希望让大家一看就懂。

### 零、准备

首先，检查 Node 版本。

```bash
$ node -v
v8.0.0
```

Koa 必须使用 7.6 以上的版本。如果你的版本低于这个要求，就要先升级 Node。

然后，克隆本文的配套[示例库](https://github.com/ruanyf/koa-demos)。（如果不方便使用 Git，也可以下载 [zip 文件](https://github.com/ruanyf/koa-demos/archive/master.zip)解压。）

```bash
$ git clone https://github.com/ruanyf/koa-demos.git
```

接着，进入示例库，安装依赖。

```bash
$ cd koa-demos
$ npm install
```

所有示例源码，都在 [demos](https://github.com/ruanyf/koa-demos/tree/master/demos) 目录下面。

### 一、基本用法

#### 1.1 架设 HTTP 服务

只要[三行代码](https://github.com/ruanyf/koa-demos/blob/master/demos/01.js)，就可以用 Koa 架设一个 HTTP 服务。

```javascript
// demos/01.js
const Koa = require('koa');
const app = new Koa();

app.listen(3000);
```

运行这个脚本。

```bash
$ node demos/01.js
```

打开浏览器，访问 http://127.0.0.1:3000 。你会看到页面显示"Not Found"，表示没有发现任何内容。这是因为我们并没有告诉 Koa 应该显示什么内容。

![img](images/koa_not_found.jpg)

#### 1.2 Context 对象

Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。通过加工这个对象，就可以控制返回给用户的内容。

`Context.response.body`属性就是发送给用户的内容。请看下面的例子（完整的代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/01.js)）。

```javascript
// demos/02.js
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000);
```

上面代码中，`main`函数用来设置`ctx.response.body`。然后，使用`app.use`方法加载`main`函数。

你可能已经猜到了，`ctx.response`代表 HTTP Response。同样地，`ctx.request`代表 HTTP Request。

运行这个 demo。

```bash
$ node demos/02.js
```

访问 http://127.0.0.1:3000 ，现在就可以看到"Hello World"了。

![img](images/bg2017080803.jpg)

#### 1.3 HTTP Response 的类型

Koa 默认的返回类型是`text/plain`，如果想返回其他类型的内容，可以先用`ctx.request.accepts`判断一下，客户端希望接受什么数据（根据 HTTP Request 的`Accept`字段），然后使用`ctx.response.type`指定返回类型。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/03.js)）。

```javascript
// demos/03.js
const main = ctx => {
  if (ctx.request.accepts('xml')) {
    ctx.response.type = 'xml';
    ctx.response.body = '<data>Hello World</data>';
  } else if (ctx.request.accepts('json')) {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello World' };
  } else if (ctx.request.accepts('html')) {
    ctx.response.type = 'html';
    ctx.response.body = '<p>Hello World</p>';
  } else {
    ctx.response.type = 'text';
    ctx.response.body = 'Hello World';
  }
};
```

运行这个 demo。

```bash
$ node demos/03.js
```

访问 http://127.0.0.1:3000 ，现在看到的就是一个 XML 文档了。

![img](images/bg2017080804.jpg)

#### 1.4 网页模板

实际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/04.js)）。

```javascript
// demos/04.js
const fs = require('fs');

const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./demos/template.html');
};
```

运行这个 Demo。

```bash
$ node demos/04.js
```

访问 http://127.0.0.1:3000 ，看到的就是[模板文件](https://github.com/ruanyf/koa-demos/blob/master/demos/template.html)的内容了。

![img](images/bg2017080805.jpg)

### 二、路由

#### 2.1 原生路由

网站一般都有多个页面。通过`ctx.request.path`可以获取用户请求的路径，由此实现简单的路由。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/05.js)）。

```javascript
// demos/05.js
const main = ctx => {
  if (ctx.request.path !== '/') {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
  } else {
    ctx.response.body = 'Hello World';
  }
};
```

运行这个 demo。

```bash
$ node demos/05.js
```

访问 http://127.0.0.1:3000/about ，可以看到一个链接，点击后就跳到首页。

![img](images/bg2017080806.jpg)

#### 2.2 koa-route 模块

原生路由用起来不太方便，我们可以使用封装好的[`koa-route`](https://www.npmjs.com/package/koa-route)模块。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/06.js)）。

```javascript
// demos/06.js
const route = require('koa-route');

const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));
app.use(route.get('/about', about));
```

上面代码中，根路径`/`的处理函数是`main`，`/about`路径的处理函数是`about`。

运行这个 demo。

```bash
$ node demos/06.js
```

访问 http://127.0.0.1:3000/about ，效果与上一个例子完全相同。

#### 2.3 静态资源

如果网站提供静态资源（图片、字体、样式表、脚本......），为它们一个个写路由就很麻烦，也没必要。[`koa-static`](https://www.npmjs.com/package/koa-static)模块封装了这部分的请求。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/12.js)）。

```javascript
// demos/12.js
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname));
app.use(main);
```

运行这个 Demo。

```bash
$ node demos/12.js
```

访问 http://127.0.0.1:3000/12.js，在浏览器里就可以看到这个脚本的内容。

#### 2.4 重定向

有些场合，服务器需要重定向（redirect）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。`ctx.response.redirect()`方法可以发出一个302跳转，将用户导向另一个路由。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/13.js)）。

```javascript
// demos/13.js
const redirect = ctx => {
  ctx.response.redirect('/');
  ctx.response.body = '<a href="/">Index Page</a>';
};

app.use(route.get('/redirect', redirect));
```

运行这个 demo。

```bash
$ node demos/13.js
```

访问 http://127.0.0.1:3000/redirect ，浏览器会将用户导向根路由。

### 三、中间件

#### 3.1 Logger 功能

Koa 的最大特色，也是最重要的一个设计，就是中间件（middleware）。为了理解中间件，我们先看一下 Logger （打印日志）功能的实现。

最简单的写法就是在`main`函数里面增加一行（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/07.js)）。

```javascript
// demos/07.js
const main = ctx => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  ctx.response.body = 'Hello World';
};
```

运行这个 Demo。

```bash
$ node demos/07.js
```

访问 http://127.0.0.1:3000 ，命令行就会输出日志。

```bash
1502144902843 GET /
```

#### 3.2 中间件的概念

上一个例子里面的 Logger 功能，可以拆分成一个独立函数（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/08.js)）。

```javascript
// demos/08.js
const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}
app.use(logger);
```

像上面代码中的`logger`函数就叫做"中间件"（middleware），因为它处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。`app.use()`用来加载中间件。

基本上，Koa 所有的功能都是通过中间件实现的，前面例子里面的`main`也是中间件。每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是`next`函数。只要调用`next`函数，就可以把执行权转交给下一个中间件。

运行这个 demo。

```bash
$ node demos/08.js
```

访问 http://127.0.0.1:3000 ，命令行窗口会显示与上一个例子相同的日志输出。

#### 3.3 中间件栈

多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。

> 1. 最外层的中间件首先执行。
> 2. 调用`next`函数，把执行权交给下一个中间件。
> 3. ...
> 4. 最内层的中间件最后执行。
> 5. 执行结束后，把执行权交回上一层的中间件。
> 6. ...
> 7. 最外层的中间件收回执行权之后，执行`next`函数后面的代码。

请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/09.js)）。

```javascript
// demos/09.js
const one = (ctx, next) => {
  console.log('>> one');
  next();
  console.log('<< one');
}

const two = (ctx, next) => {
  console.log('>> two');
  next(); 
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
  next();
  console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);
```

运行这个 demo。

```bash
$ node demos/09.js
```

访问 http://127.0.0.1:3000 ，命令行窗口会有如下输出。

```bash
>> one
>> two
>> three
<< three
<< two
<< one
```

如果中间件内部没有调用`next`函数，那么执行权就不会传递下去。作为练习，你可以将`two`函数里面`next()`这一行注释掉再执行，看看会有什么结果。

#### 3.4 异步中间件

迄今为止，所有例子的中间件都是同步的，不包含异步操作。如果有异步操作（比如读取数据库），中间件就必须写成 [async 函数](http://es6.ruanyifeng.com/#docs/async)。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/10.js)）。

```javascript
// demos/10.js
const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();

const main = async function (ctx, next) {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
};

app.use(main);
app.listen(3000);
```

上面代码中，`fs.readFile`是一个异步操作，必须写成`await fs.readFile()`，然后中间件必须写成 async 函数。

运行这个 demo。

```bash
$ node demos/10.js
```

访问 http://127.0.0.1:3000 ，就可以看到模板文件的内容。

#### 3.5 中间件的合成

[`koa-compose`](https://www.npmjs.com/package/koa-compose)模块可以将多个中间件合成为一个。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/11.js)）。

```javascript
// demos/11.js
const compose = require('koa-compose');

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const middlewares = compose([logger, main]);
app.use(middlewares);
```

运行这个 demo。

```bash
$ node demos/11.js
```

访问 http://127.0.0.1:3000 ，就可以在命令行窗口看到日志信息。

### 四、错误处理

#### 4.1 500 错误

如果代码运行过程中发生错误，我们需要把错误信息返回给用户。HTTP 协定约定这时要返回500状态码。Koa 提供了`ctx.throw()`方法，用来抛出错误，`ctx.throw(500)`就是抛出500错误。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/14.js)）。

```javascript
// demos/14.js
const main = ctx => {
  ctx.throw(500);
};
```

运行这个 demo。

```bash
$ node demos/14.js
```

访问 http://127.0.0.1:3000，你会看到一个500错误页"Internal Server Error"。

![img](images/bg2017080807.jpg)

#### 4.2 404错误

如果将`ctx.response.status`设置成404，就相当于`ctx.throw(404)`，返回404错误。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/15.js)）。

```javascript
// demos/15.js
const main = ctx => {
  ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
};
```

运行这个 demo。

```bash
$ node demos/15.js
```

访问 http://127.0.0.1:3000 ，你就看到一个404页面"Page Not Found"。

![img](images/bg2017080808.jpg)

#### 4.3 处理错误的中间件

为了方便处理错误，最好使用`try...catch`将其捕获。但是，为每个中间件都写`try...catch`太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/16.js)）。

```javascript
// demos/16.js
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);
```

运行这个 demo。

```bash
$ node demos/16.js
```

访问 http://127.0.0.1:3000 ，你会看到一个500页，里面有报错提示 `{"message":"Internal Server Error"}`。

![img](images/bg2017080809.jpg)

#### 4.4 error 事件的监听

运行过程中一旦出错，Koa 会触发一个`error`事件。监听这个事件，也可以处理错误。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/17.js)）。

```javascript
// demos/17.js
const main = ctx => {
  ctx.throw(500);
};

app.on('error', (err, ctx) =>
  console.error('server error', err);
);
```

运行这个 demo。

```bash
$ node demos/17.js
```

访问 http://127.0.0.1:3000 ，你会在命令行窗口看到"server error xxx"。

#### 4.5 释放 error 事件

需要注意的是，如果错误被`try...catch`捕获，就不会触发`error`事件。这时，必须调用`ctx.app.emit()`，手动释放`error`事件，才能让监听函数生效。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/18.js)）。

```javascript
// demos/18.js`
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'html';
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
    ctx.app.emit('error', err, ctx);
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.on('error', function(err) {
  console.log('logging error ', err.message);
  console.log(err);
});
```

上面代码中，`main`函数抛出错误，被`handler`函数捕获。`catch`代码块里面使用`ctx.app.emit()`手动释放`error`事件，才能让监听函数监听到。

运行这个 demo。

```bash
$ node demos/18.js
```

访问 http://127.0.0.1:3000 ，你会在命令行窗口看到`logging error`。

### 五、Web App 的功能

#### 5.1 Cookies

`ctx.cookies`用来读写 Cookie。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/19.js)）。

```javascript
// demos/19.js
const main = function(ctx) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);
  ctx.response.body = n + ' views';
}
```

运行这个 demo。

```bash
$ node demos/19.js
```

访问 http://127.0.0.1:3000 ，你会看到`1 views`。刷新一次页面，就变成了`2 views`。再刷新，每次都会计数增加1。

![img](images/bg2017080810.jpg)

#### 5.2 表单

Web 应用离不开处理表单。本质上，表单就是 POST 方法发送到服务器的键值对。[`koa-body`](https://www.npmjs.com/package/koa-body)模块可以用来从 POST 请求的数据体里面提取键值对。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/20.js)）。

```javascript
// demos/20.js
const koaBody = require('koa-body');

const main = async function(ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name };
};

app.use(koaBody());
```

运行这个 demo。

```bash
$ node demos/20.js
```

打开另一个命令行窗口，运行下面的命令。

```bash
$ curl -X POST --data "name=Jack" 127.0.0.1:3000
{"name":"Jack"}

$ curl -X POST --data "name" 127.0.0.1:3000
name required
```

上面代码使用 POST 方法向服务器发送一个键值对，会被正确解析。如果发送的数据不正确，就会收到错误提示。

#### 5.3 文件上传

[`koa-body`](https://www.npmjs.com/package/koa-body)模块还可以用来处理文件上传。请看下面的例子（完整代码看[这里](https://github.com/ruanyf/koa-demos/blob/master/demos/21.js)）。

```javascript
// demos/21.js
const os = require('os');
const path = require('path');
const koaBody = require('koa-body');

const main = async function(ctx) {
  const tmpdir = os.tmpdir();
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
```

运行这个 demo。

```bash
$ node demos/21.js
```

打开另一个命令行窗口，运行下面的命令，上传一个文件。注意，`/path/to/file`要更换为真实的文件路径。

```bash
$ curl --form upload=@/path/to/file http://127.0.0.1:3000
["/tmp/file"]
```

### 六、参考链接

- [koa workshop](https://github.com/koajs/workshop)
- [kick-off-koa](https://github.com/koajs/kick-off-koa)
- [Koa Examples](https://github.com/koajs/examples)

### 七、koa 原理

- 洋葱模型

  每一个 koa 中间件都是一层洋葱圈, 既可以掌管请求进入, 也可以掌管响应返回.  换句话说, 外层的中间件可以影响内层的请求与响应阶段, 内层的中间件只能影响外层的响应阶段.

  ```javascript
  async function middleware1() {
    //...
    await (async function middleware2() {
      //...
      await (async function middleware3() {
        //...
      });
      //...
    });
    //...
  }
  ```

  

- dispatch(n)对应第 n 个中间件的执行，在使用中即第 n 个中间件可以通过await next()来“插入”执行下一个中间件，同时在最后一个中间件执行完成后，依然有恢复执行的能力。

  即：通过洋葱模型，await next()控制调用后面的中间件，直到全局没有可执行的中间件且堆栈执行完毕，最终“原路返回”至第一个执行next的中间件。这种方式有个优点，特别是对于日志记录以及错误处理等全局功能需要非常友好。

  > Koa1 的中间件实现利用了 Generator 函数 + co 库（一种基于 Promise 的 Generator 函数流程管理工具），来实现协程运行。本质上，Koa v1 中间件和 Koa v2 中间件思想是类似的，只不过 Koa v2 改用了 Async/Await 来替换 Generator 函数 + co 库，整体实现更加巧妙，代码更加优雅。—— from《狼书》

  

[koa 使用教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)

# express

## 工作机制

不同于 Koa，它继承了路由、静态服务器和模板引擎等功能，虽然比之Koa显得“臃肿”了许多，但看上去比 Koa 更像是一个框架。通过学习 Express 源码，笔者简单的总结了它的工作机制：

1. 通过 app.use 方法注册中间件。
2. 一个中间件可以理解为一个 Layer 对象，其中包含了当前路由匹配的正则信息以及 handle 方法。
3. 所有中间件（Layer 对象）使用stack数组存储起来。
4. 当一个请求过来时，会从 req 中获取请求 path，根据 path 从stack中找到匹配的 Layer，具体匹配过程由`router.handle`函数实现。
5. `router.handle` 函数通过 `next()` 方法遍历每一个 layer 进行比对：
   - `next()`方法通过闭包维持了对于 **Stack Index 游标**的引用，当调用`next()`方法时，就会从下一个中间件开始查找；
   - 如果比对结果为 true，则调用`layer.handle_request`方法，`layer.handle_request`方法中会调用next()方法 ，实现中间件的执行。

通过上述内容，我们可以看到，Express 其实是通过 `next()` 方法维护了遍历中间件列表的 Index 游标，中间件每次调用`next()`方法时，会通过增加 Index 游标的方式找到下一个中间件并执行。它的功能就像这样：

```javascript
((req, res) => {
  console.log('第一个中间件');
  ((req, res) => {
    console.log('第二个中间件');
    (async(req, res) => {
      console.log('第三个中间件');
      await sleep(2000)
      res.status(200).send('hello')
    })(req, res)
    console.log('第二个中间件调用结束');
  })(req, res)
  console.log('第一个中间件调用结束')
})(req, res)
```

如上代码，Express 中间件设计并不是一个洋葱模型，它是**基于回调实现的线形模型**，不利于组合，不利于互操，在设计上并不像 Koa 一样简单。而且业务代码有一定程度的侵扰，甚至会造成不同中间件间的耦合。



[学习连接](https://zhuanlan.zhihu.com/p/56947560)

