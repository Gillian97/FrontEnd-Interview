# HTTP

## TLS/SSL

TLS 是 SSL 标准化后的名称，两者是同一个东西的不同阶段。

SSL 主要用途：

1. 认证客户端与服务器，确保数据发到正确的客户端与服务器。
2. 加密数据防止传输中被窃取
3. 保证传输中数据的完整性

特性：

1. 机密性：SSL 使用密钥加密数据
2. 可靠性：服务器与客户端都会被认证，客户的认证可选
3. 完整性：SSL 协议会对数据进行完整性检查

## CA 签发证书

确保访问的是正确网站且访问到正确数据，除了保证传输安全，还要保证目标网站正确。建设 PKI 基础设施，通过第三方认证网站。

PKI = CA(认证中心)+RA(注册中心)+DS(目录服务)服务器

申请证书流程：RA 负责用户的证书申请 → CA  处理并发出证书且公示在 DS 中

检验证书合法性：

- 证书的信任关系
- 证书本身正确性
- 证书状态，通过 Certificate Revocation List(CRL) 查看证书是否被废弃

通过 OpenSSL 可以生成 TLS/SSL 传输时需要认证的公私钥，权威的还需要到 PKI 申请。



## 输入 url 到展示

## http/https 区别

## HTTP1 HTTP2 HTTP3

## get post

## options 何时发出

## 常见状态码



# TCP UDP

## TCP 三次握手 四次挥手

## TCP UDP 区别

# 跨域

本质是浏览器对 Cookie 的一种保护，是一种浏览器行为。

## 同源概念

互联网安全的基础是同源政策，否则网页之间可以共享 `Cookie` 等信息，造成不安全。

两个网页满足下属三个条件称之为同源：

1. 协议相同
2. 域名相同
3. 端口相同

同源网页之间可以共享 Cookie 等信息。

非同源有下述行为受到限制：

1. Cookie、LocalStorage、IndexDB无法获取
2. DOM 无法获得
3. AJAX 请求不能发送

但是现实中部分场景需要规避同源政策带来的限制，实现某些数据的读取以及进行一些操作。

### 一级域名相同的网页共享 Cookie

两个网页一级域名相同，二级域名不同，设置相同的 document.domain，可实现 `Cookie`共享。

A 网页（http://test1.example.com/a.html）设置 `document.domain="example.com"`

B 网页（http://test2.example.com/b.html）设置 `document.domain="example.com"`

A 网页设置 `document.cookie = "hello"`，B 网页可进行读取 `let cookie = document.cookie`。

## CORS（Cross-Origin resource sharing W3C标准）

跨域资源共享。

允许浏览器向跨源服务器发出 XMLHttpRequest 请求，克服AJAX只能同源使用的限制。

## JSONP(JSON with Padding)

JSON 的一种“使用模式”，可以让网页从别的域名/网站那里获取数据，即跨域读取数据。

## JWT (JSON Web Tokens)

跨域认证解决方案。

### 用户认证

用户认证的一般流程：

1. 用户发送用户名和密码给服务器
2. 服务器验证通过后，在当前会话（session）中保存相关信息，比如用户角色、登录时间等
3. 服务器向用户返回一个 session_id，写入用户 Cookie
4. 用户随后每次请求都带着 Cookie，服务器通过cookie知道用户的session_id，找到之前保存的用户数据，得知用户身份

考虑到服务器分布式的特性，需要 session 共享

1. session持久化，但是持久化挂了风险太大，且操作不便
2. 直接将用户信息存在客户端，客户端每次发请求时都带着，JWT是这类方案代表

### 原理

服务器认证之后，返回一个 JSON 对象返回给客户端，以后客户端请求都带着这个对象。服务器只靠这个对象识别用户身份，为了防止对象被篡改，服务器会给对象加签名。

```json
{
  "name":"MM",
  "role":"manager",
  "ddl":"2020/12/30/16:00:00"
}
```

### JWT数据结构

分为三个部分：头部.负载.签名

![img](https://www.wangbase.com/blogimg/asset/201807/bg2018072303.jpg)

**头部**

用来描述 `JWT` 的元信息的 `JSON` 对象，服务器使用 `Base64URL` 算法转成字符串。

```json
{
  "alg":"HS256", // 签名算法
  "typ":"JWT" // 表示令牌（token）类型
}
```

**负载**

用来存放实际需要传递的数据的 `JSON` 对象，服务器使用 `Base64URL` 算法转成字符串。`JWT` 规定7个官方字段：

```
iss（issuer）：签发人
exp（expiration time）：过期时间
sub（subject）：主题
aud（audience）：受众
nbf（Not Before）：生效时间
iat（Issued At）：签发时间
jti（JWT ID):编号
```

除了这几个字段，也可以定义私有字段。

**签名**

对前面两个部分的签名，防止数据篡改。

1. 服务器指定一个密钥（secret 只有服务器知道）
2. 使用 header 中指定的签名算法，按照公式产生签名
3. 将 Header Payload Signature 三个部分合成一个字符串，用`.`分隔

上述三步结束后，将  JWT Token 返回给用户。

产生签名公式：

```javascript
HMACSHA256(
  base64UrlEncode(header)+"."+base64UrlEncode(payload),
  secret
)
```

### 客户端处理

客户端收到 JWT Token 后，可存储在 Cookie 或者 LocalStorage 中。后面客户端每次发请求，均需要带上这个 JWT Token 。客户端请求共有如下位置可以放置：

1. Cookie （不能跨域）
2. HTTP 请求头 Authorization 字段
3. POST 请求的数据体中 （跨域时）

### 注意

1. JWT Token 默认不加密，生成后可使用密钥加密
2. 不加密时，敏感信息不要置于 Payload 中
3. JWT Token 可用于认证和交换信息，有效使用可降低服务器查询数据库次数
4. 缺点是  JWT Token 一旦生成不能废止，在过期时间之前都有效
5. JWT Token 包含认证信息，为防止泄露，过期时间应设置较短
6. JWT Token 不加密，不应该使用 HTTP 明文 传输，应使用 HTTPS

## WebSocket(通信协议)

### 诞生原因

HTTP 连接是单向的，HTTP 协议是一个请求-响应协议，只能由客户端发起，如果需要感知服务器的变化就需要轮询，效率低且浪费资源。

H5 新增协议，主要特点是：服务器与客户端均可以互相向对方发送消息，是完全的平等对话，全双工通信。

![img](images/websocket.png)

### 特点

1. WebSocket 连接必须由浏览器发起
2. 基于 TCP 协议，服务端实现较容易
3. 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，握手阶段采取 HTTP 协议，因此握手不容易被屏蔽，能通过各种 HTTP 代理服务器。
4. 数据格式比较轻量，性能开销小，通信高效
5. 可以发送文本或者二进制数据
6. 没有同源限制，客户端可以与任意服务器通信
7. 协议标识是 ws（加密 wss），服务器网址就是 URL

### 客户端 API

#### WebSocket 构造函数

```javascript
var ws =  new WebSocket("ws://leetcode.com");
```

用于新建 WebSocket 实例。执行上面的语句，客户端就会与服务器建立连接。

#### 属性

**webSocket.readyState 属性**

```javascript
console.log("正在连接时的状态：" + ws.readyState)；
// "正在连接时的状态：0"
```

返回实例对象的当前状态，共有四个值。

| 状态       | 值   | 含义                 |
| ---------- | ---- | -------------------- |
| CONNECTING | 0    | 正在连接中           |
| OPEN       | 1    | 已建立连接，可以通信 |
| CLOSING    | 2    | 连接正在关闭         |
| CLOSED     | 3    | 连接已关闭           |

**webSocket.onopen 属性**

实例对象的 `onopen` 属性，用于指定连接成功后的回调函数。

**webSocket.onclose 属性**

实例对象的 `onclose` 属性，用于指定连接关闭后的回调函数。

**webSocket.onmessage 属性**

实例对象的 `onmessage` 属性，用于指定收到服务器数据后的回调函数。

**webSocket.bufferedAmount 属性**

实例对象的 `bufferedAmount` 属性，用于判断客户端还有多少字节的二进制数据没有发出去，用于判断发送是否结束。

**webSocket.onerror 属性**

实例对象的 `onerror` 属性，用于指定报错时的回调函数。

**webSocket.send() 方法**

用于向服务器发送数据。

使用示例：

```javascript
var ws = new WebSocket("ws://echo.websocket.org");

console.log("正在连接时的状态：" + ws.readyState);

// 单个写回调函数

ws.onopen = function (evt) {
  console.log("成功连接时的状态1：" + ws.readyState);
  ws.send("hello server，this is client");
}

ws.onmessage = function (evt) {
  console.log("收到服务器返回的数据1：" + evt.data);
  ws.close(); // 关闭连接
  console.log("正在关闭时的状态1：" + ws.readyState);
}

ws.onclose = function (evt) {
  console.log("连接关闭后的状态1：" + ws.readyState);
}

/*
"正在连接时的状态：0"
"成功连接时的状态1：1"
"收到服务器返回的数据1：hello server，this is client"
"正在关闭时的状态1：2"
"连接关闭后的状态1：3"
*/
```

使用 WebSocket.addEventListener

```javascript
var ws = new WebSocket("ws://echo.websocket.org");

console.log("正在连接时的状态：" + ws.readyState);


// 监听事件

ws.addEventListener("open", function (evt) {
  console.log("成功连接时的状态2：" + ws.readyState);
  ws.send("hello server，this is client");
})

ws.addEventListener("close", function (evt) {
  console.log("连接关闭后的状态2：" + ws.readyState);
})

ws.addEventListener("message", function (evt) {
  console.log("收到服务器返回的数据2：" + evt.data);
  ws.close();
  console.log("正在关闭的状态2：" + ws.readyState);
})

/*
"正在连接时的状态：0"
"成功连接时的状态2：1"
"收到服务器返回的数据2：hello server，this is client"
"正在关闭的状态2：2"
"连接关闭后的状态2：3"
*/
```

### WebSocket 服务器

常用 node 实现有以下三种：

1. [µWebSockets](https://github.com/uWebSockets/uWebSockets)
2. [Socket.IO](http://socket.io/)
3. [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

WebSocket 服务器：[Websocketd](http://websocketd.com/)





# CDN(Content Delivery Network) 理解

内容分发网络，侧重点是**分发**。

## 设计基本思路

尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输更快更稳定。

## 实现

在**网络各处放置节点服务器**所构成的在现有互联网基础上的一层智能虚拟网络。实际可类比京东的仓储系统。

## 特点

CDN 系统能够实时地根据**网络流量和各节点的连接、负载状况以及到用户的距离和响应时间**等，将用户请求**重新导向**离用户**最近**的服务节点上，使用户**就近**获取资源，提高访问网站的响应速度。

## 相关概念理解

- 负载均衡

  用户与节点之间，可能还会根据实际情况加一层 nginx 做负载均衡，来负责边缘节点的流量分配问题。

- CDN 与对象存储

  CDN 是加速下载图片的，对象存储是存储图片的。二者多数配合使用。

- CDN 缓存

  对于可能被重复使用的资源，CDN 会缓存一份在本地。

- 回源、源站、边缘节点

  边缘节点就是具体部署的 CDN 节点，回源就是边缘节点到源站去获取数据，源站就是从服务器获取资源然后分发给边缘节点的中间服务器。

- 缓存命中、缓存命中率

  用户请求的数据如果由 CDN 提供，则称之为缓存命中，所有用户请求的缓存命中比例叫做缓存命中率，是衡量 CDN 质量的关键指标。

- 就近原则

  用户的请求会被分配到距离用户的网络链路最短、不跨网的服务器上，数据传输的稳定性最好。

## 使用 CDN 的好处

1. 提高网站排名
2. 网站不容易宕机
3. 减少托管成本。服务器带宽有限制，分流可以减少费用。



# 缓存

# 安全

## XSS

跨站脚本（Cross-Site Scripting，XSS），与 CSS 区分。

原因：网站没有对用户输入做严格限制，攻击者可以将输入脚本让其他人浏览到有恶意脚本的页面，注入方式包括不限于 JS/VBScript/CSS/Flash等。

当其他人浏览到包含恶意脚本的网页时，就会执行恶意脚本，对用户进行 Cookie 窃取、会话劫持、钓鱼欺骗等攻击。

Cookie 窃取：JS 脚本收集用户环境的信息（Cookie），通过图片、触发事件等传输用户数据至攻击者服务器。

钓鱼欺骗：利用脚本进行视觉欺骗，构建假的恶意 button 覆盖真实情况。

示例：

```html
<script>alert('xss')</script>
```

## CSP

Content Security Policy，网页安全政策。应对 XSS。

开发者给浏览器提供白名单，明确告诉客户端可以执行的脚本有哪些，实现与执行全部由浏览器完成，开发者提供配置。

### 启用 CSP 方法

1. HTTP 头信息设置 Content-Security-Policy 字段

   ```json
   Content-Security-Policy: script-src 'self'; object-src 'none';style-src cdn.example.org third-party.org; child-src https:
   // 多个值并列 用空格分隔
   ```

2. 网页的 <meta> 标签设置

   ```html
   <meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
   ```

上面代码中，CSP 做了如下限制：

1. 脚本：只信任当前域名
2. object标签：不信任任何url，即不加载任何资源
3. 样式表：只信任 cdn.example.org third-party.org
4. 框架（frame）：必须使用 https 协议加载
5. 其他资源：没有限制

启用后，不符合 CSP 的外部资源就会被阻止加载。

### 限制选项

CSP 提供很多限制选项，涉及安全的各个方面。

```json
script-src：外部脚本
style-src：样式表
img-src：图像
media-src：媒体文件（音频和视频）
font-src：字体文件
object-src：插件（比如 Flash）
child-src：框架
frame-ancestors：嵌入的外部资源（比如<frame>、<iframe>、<embed>和<applet>）
connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）
worker-src：worker脚本
manifest-src：manifest 文件
```

选项值：

```
主机名：example.org，https://example.com:443
路径名：example.org/resources/js/
通配符：*.example.org，*://*.example.com:*（表示任意协议、任意子域名、任意端口）
协议名：https:、data:
关键字'self'：当前域名，需要加引号
关键字'none'：禁止加载任何外部资源，需要加引号
```

### default-src

设置各个选项的默认值

```javascript
Content-Security-Policy: default-src 'self' ; 
// 限制所有的外部资源，只能从当前域名加载

Content-Security-Policy: default-src 'self' ; style-src cdn.example.org third-party.org;
// style-src 设置会覆盖 default-src 设置，但是其他选项仍然受限
```

如果没有设置该值，则 `script-src`和 `object-src`是必设的。一旦注入脚本，其他都能规避，`object-src` 必须设置是因为 Flash 内部可以执行外部脚本。

### URL 限制

限制网页与其他的 URL 发生联系。

```
frame-ancestors：限制嵌入框架的网页
base-uri：限制<base#href>
form-action：限制<form#action>
```

### 其他限制

```
block-all-mixed-content：HTTPS 网页不得加载 HTTP 资源（浏览器已经默认开启）
upgrade-insecure-requests：自动将网页上所有加载外部资源的 HTTP 链接换成 HTTPS 协议
plugin-types：限制可以使用的插件格式
sandbox：浏览器行为的限制，比如不能有弹出窗口等。
```

### 报告脚本注入行为

```
Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;
// 将注入行为报告给 /my_amazing_csp_report_parser 这个网址

Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;
// 不执行限制选项，只记录注入行为
```

### script-src 的特殊值

都必须放在单引号中。

- **`'unsafe-inline'`**：允许执行页面内嵌的`<script>`标签和事件监听函数。（不能设置该值，除非同时有 nonce 值）
- **`'unsafe-eval'`**：允许将字符串当作代码执行，比如使用`eval`、`setTimeout`、`setInterval`和`Function`等函数。
- **nonce值**：每次HTTP回应给出一个授权token，页面内嵌脚本必须有这个token，才会执行
- **hash值**：列出允许执行的脚本代码的Hash值，页面内嵌脚本的哈希值只有吻合的情况下，才能执行。

**nonce 值**

服务器发送网页时，告诉客户端一个随机的token。

```html
Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'
```

浏览期页面内嵌脚本必须带上这个 token 才能执行：

```html
<script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
  // some code
</script>
```

**hash 值**

服务器给出一个允许执行脚本的 hash 值。计算脚本 hash 值时，不包括<script>标签。

```
Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='
```

页面内嵌脚本中 hash 值符合的，就允许执行。

```html
<script>alert('Hello, world.');</script>
```

nonce 和 hash 值也能用在 style-src 选项，控制页面内嵌的样式表。



参考：http://www.ruanyifeng.com/blog/2016/09/csp.html

## CSRF

跨站请求伪造（Cross-Site Request Forgery），利用用户 C 在 A 站（攻击目标）的 cookie/权限等，在 B 站拼装 A 站的请求，攻击者以用户 C 的身份发送邮件、购买商品等操作。

### CSRF 攻击过程

1. 用户访问网站 A，输入用户名密码登录。
2. 用户信息验证通过，网站 A 产生 Cookie 并返回给浏览器，登录成功。
3. 用户未退出登录时，攻击者诱导用户在同一个浏览器中，打开一个 tab 访问网站 B。
4. 网站 B 接收到用户请求后，返回攻击性代码，发出请求访问网站 A。
5. 浏览器接收到攻击性代码后，根据网站 B 的要求，在用户不知情的情况下，携带 Cookie 信息，向网站 A 发送请求。
6. 网站 A 并不知道是网站 B 发起的，会正常处理请求内容，导致来自网站 B 的恶意代码执行成功。

### 常见攻击类型

#### GET 类型 CSRF

```html
 ![](https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/ff0cdbee.example/withdraw?amount=10000&for=hacker)
```

例如，访问含有上述 img 的 HTML 页面，浏览器就会自动发出括号中的 HTTP 请求。

#### POST 类型 CSRF

一般是使用一个自动提交的表单。访问该页面，表单会自动提交，相当于模拟用户完成了一次 POST 请求。

```html
<form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```

#### 链接类型 CSRF

用户点击链接后触发，比如在图片中注入恶意链接以及诱导点击夸张的广告。

由于用户访问网站 A 还没有退出登录，点击链接会发送 href 中的请求。

```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
<a/>
```

### CSRF 特点

- 攻击一般在第三方网站发起，而不是被攻击的网站
- 攻击者利用用户在被攻击网站的登录凭证，而不是窃取数据
- 攻击者不知道用户的登录信息，只是冒用
- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等，部分请求可以直接嵌入在第三方论坛、文章中，难以追踪。
- 通常是跨域的，因为外域更容易掌控。

### 防护策略

1. 阻止不明外域访问
   1. 同源检测
   2. Samesite Cookie
2. 提交时要求附加本域才能获取的信息
   1. CSRF Token
   2. 双重 Cookie 验证

#### 同源检查

最早用于防止 CSRF 的一种方式。

网站检查 http 请求 header 中的 Origin 和 Referer（标记来源域）：

- Origin Header
- Referer Header

这两个信息是浏览器发起请求自动带上的，不能由前端自定义，服务器可以解析这两个字段中的域名，确定请求的来源域。

#### CSRF token

服务器要求所有的请求都携带一个 CSRF 攻击者无法获取到的 Token，服务器校验请求中的 token 是否正确，将正确的请求与攻击的请求区分开。

1. 将 CSRF 输出到 HTML 页面中

   用户第一次登录网站时，服务器给用户生成一个 Token（随机字符串+时间戳加密后的结果），将其保存在服务器的 Session 中，之后在每次页面加载时，使用 js 遍历 DOM 树，将 token 加入至所有的 a 标签和 form 标签。页面加载后动态生成的 html，需要程序员手动加入 token。

2. 页面提交的请求携带这个 Token

   GET 请求：将 token 置于 url 的末尾。`http://url?csrftoken=tokenvalue`

   POST 请求：在 form 的最后加上

   ```html
     <input type=”hidden” name=”csrftoken” value=”tokenvalue”/>
   ```

3. 服务器校验 token 是否正确

   将请求中的 token 解密，与 session中 的 token 比对解密后的字符串与时间戳。在分布式集群中，session 失效，token 通常存于 redis 之类的公共存储空间。



参考：https://tech.meituan.com/2018/10/11/fe-security-csrf.html

## 中间人攻击

### 中间人攻击的过程

1. 服务器向客户端发送公钥A，被攻击者截获，攻击者向客户端发送假公钥B。
2. 客户端收到假公钥B后，使用公钥B对内容（后面对称加密的密钥X）加密并发送
3. 攻击者截取加密报文后，使用自己的私钥B1解开，获取对称加密的密钥X。再使用原来的公钥A加密一个假的密钥Y并发送给服务器。
4. 服务器收到报文后解密，获取假的密钥Y，后面服务器会用假密钥Y加密传输信息。

### 防范方法

服务端发送给浏览器公钥时，加入 CA 证书，浏览器验证 CA 证书的有效性。

浏览器校验 CA 证书的有效性：

1. 校验证书的颁发机构是否信任
2. 证书是否被吊销（通过CRL/OCSP）
3. 判断证书是否过期（对比系统时间）
4. 校验对方是否存在证书的私钥
5. 判断证书的网站域名是否与证书颁发的域名一致

## DNS 劫持

又名：DNS 重定向、域名劫持，是 DNS 查询没有得到正确的解析，以致引导用户访问到恶意网站。

DNS劫持现象：输入google网址，出现baidu页面。

HTTP劫持现象：访问着github页面，右下角出现弹窗小广告。

### DNS 解析原理

分级查询，查询顺序为：根域名——顶级域名——次级域名(用户注册)——主机名/三级域名

域名 = 主机名.次级域名.顶级域名.根域名

本机执行命令： `dig +trace math.stackexchange.com`，查看域名解析过程。

1. 向本地域名解析服务器发送请求，查询解析 `.root` 的根域名服务器（已经内置在本地）
2. 向所有的根域名服务器发送请求，查询 `com.` 域名，根域名服务器返回所有解析 `com.` 的域名解析服务器。下述示例中  `Received 1182 bytes from 192.203.230.10#53(e.root-servers.net) in 161 ms` 返回最快。
3. 向所有 `com.` 的域名解析服务器发送请求，查询 `stackexchange.com.`的 IP 地址
4. 向所有 `stackexchange.com.` 的域名解析服务器发送请求，查询 `math.stackexchange.com.` 的 IP 地址。
5. 查到指定域名的 IP 地址，查询结束。

![dig 命令](images/dig.png)

有图可知，114.114.114.114:53 是本机的域名解析服务器，53 是默认端口。NS = Name Server，A = Address。

Mac 的DNS 服务器 IP 地址保存在 `/etc/resolv.conf` 中。

### DNS 劫持方法

DNS 解析每一步出问题，都可能导致解析失败。
