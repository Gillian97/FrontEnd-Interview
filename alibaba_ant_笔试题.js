// 第4题用到的包
import request from 'request';
import cheerio from 'cheerio';
import fs from 'fs';

// --------------- 第 1 道题 -------------

// 考察的是函数柯里化
// 这里需要注意, 需要柯里化的函数的参数是不固定的
// 因此进行参数收集时, 需要进行递归收集

// 函数柯里化返回的是一个函数, 假设是 f
// 给 f 传参时, f 会记录传入的参数, 并且仍然返回一个函数
function func (fn) {
  return function () {
    // 这里采用数组进行参数的收集
    // arguments 由于是对象, 因此需要转换成数组才能在后面调用数组的方法
    let args = [].slice.call(arguments);
    let inner = function () {
      args.push(...arguments);
      return inner;
    }
    // 传参后, 当尝试输出函数的值时, 这里会发生隐式转换
    // 函数会调用自己的 toString 方法
    // 这里对该函数进行重写, 在调用该方法时, 执行的逻辑是调用函数 fn 并返回结果
    // 传入的参数是已收集到的所有参数
    inner.toString = function () {
      return fn.call(null, ...args);
    }
    return inner;
  }
}

// 测试案例部分

// 函数 funcX 参数个数不限
// 并且对传入参数均进行相加操作, 返回累加结果
function funcX () {
  let arr = [].slice.call(arguments);
  return arr.reduce((pre, val) => {
    return pre + val;
  })
}

let curryFn = func(funcX);

let res1 = curryFn(1)(2)(3)(4);
let res2 = funcX(1, 2, 3, 4);

// 使用非严格等于时, res1 是等于 res2 的
// 但是其实 res1 的类型仍是函数, 并不是数字
console.log('res1:', res1, 'res2:', res2, res1 == res2);
// res1: [Function: inner] { toString: [Function (anonymous)] } res2: 10 true



// ------------------ 第 2 道题 ------------------


function find (origin) {
  // 对参数格式进行校验
  if (!Array.isArray(origin)) throw new Error('参数类型必须是数组!');
  for (let o of origin) {
    if (!o.userId || !o.title || typeof o.userId !== 'number')
      throw new Error('数据内部格式不正确!');
  }
  // 返回对象
  return {
    data: origin,
    where (rule) {
      // 获取规则的键值
      let key = Object.keys(rule)[0];
      // 对数据进行筛选, 得到满足正则表达式的元素数组
      let selectedRes = this.data.filter((val, index) => {
        // rule[key] 是正则表达式
        // val[key] 是规则中键对应的值
        if (typeof rule[key] !== 'object') throw new Error('正则表达式类型不正确!');
        // 使用正则匹配合法的数据并返回
        return rule[key].test(val[key]);
      })
      return {
        selectedRes,
        // 对筛选之后的数据进行排序
        // 根据 userId 的大小进行降序排列
        // k: 降序排列依据的键
        // seq: 排序关键字, 降序'desc', 升序 'asc'
        orderBy (k, seq) {
          // 配置排序规则
          return this.selectedRes.sort((obj1, obj2) => {
            return seq === 'desc' ? obj2[k] - obj1[k] : obj1[k] - obj2[k];
          })
        }
      }
    }
  }
}

// 测试案例部分

var data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: 'null' },
  { userId: 19, title: 'title2' }
]

var result = find(data).where({
  'title': /\d$/
}).orderBy('userId', 'desc')

console.log(result);
// [ { userId: 19, title: 'title2' }, { userId: 8, title: 'title1' } ]



// ------------------ 第 3 道题 ------------------


function count (map) {
  let n = map.length;
  let m = map[0].length;
  // 将给定数组的每个元素拆分为数组, 方便后面的修改
  map = map.map((val) => {
    return val.split('');
  })
  // console.log(map);
  let num = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === ' ') {
        dfs(map, i, j);
        // 每完成对空白位置的遍历, 计数+1
        num++;
      }
    }
  }
  return num;
}

function dfs (map, i, j) {
  // 访问过的空白位置标为占用
  map[i][j] = '*';
  // console.log(map);
  // console.log(i, j);

  // 上节点
  if (isValid(map, i - 1, j)) dfs(map, i - 1, j)
  // 下节点
  if (isValid(map, i + 1, j)) dfs(map, i + 1, j)
  // 左节点
  if (isValid(map, i, j - 1)) dfs(map, i, j - 1)
  // 右节点
  if (isValid(map, i, j + 1)) dfs(map, i, j + 1)
}

// 检查坐标以及内容是否合法
function isValid (map, i, j) {
  let n = map.length;
  let m = map[0].length;
  if (i < 0 || i >= n || j < 0 || j >= m || map[i][j] !== ' ') return false;
  return true;
}

// 测试案例部分

// 空白位置为 2
const map1 = [
  '*****',
  '* * *',
  '**  *',
  '*   *',
  '*****',
]
// 空白位置为 3
const map2 = [
  '*****',
  '* * *',
  '**  *',
  '* * *',
  '*****',
]
// 空白位置为 5
const map3 = [
  '* ***',
  '* * *',
  '**  *',
  '* * *',
  ' *** ',
]

let res = [count(map1), count(map2), count(map3)]
console.log('res:', res);
// res: [ 2, 3, 5 ]




// ------------------ 第 4 道题 ------------------

const dir = './dist/';

// 发请求获取目标 html
function getHtml (url) {

  // 获取 html 之前, 在当前目录, 新建 dist 目录
  fs.mkdir(dir, (err) => {
    if (err) {
      console.log(err)
    }
  })

  const options = new URL(url);
  request(url, function (error, response, body) {
    console.log(body);
    // 使用 cheerio 进行 html 的解析
    let $ = cheerio.load(body);
    // 获取所有的 img/link/script 标签
    let imgs = $('img');
    let links = $('link');
    let scripts = $('script');
    // console.log('scripts:', Object.keys(scripts[0]));
    // console.log(imgs.length);
    downloadImg(imgs, options);
    downloadHref(links, options);
    downloadJs(scripts);
  })
}

// 下载脚本
function downloadJs (scripts) {
  scripts.each((index, script) => {
    let spUrl = script.attribs.src;
    // 将有 src 属性的 js 下载下来
    // console.log('spUrl:', spUrl);
    if (spUrl) {
      request(spUrl).pipe(fs.createWriteStream(dir + index + '.js'));
    }
  })
}

// 下载链接文件
function downloadHref (links, options) {
  links.each((index, link) => {
    // 获取各个属性
    let href = link.attribs.href;
    let type = link.attribs.type;
    let rel = link.attribs.rel;

    // console.log('type:' + type, typeof href);
    if (href) {
      href = convertUrl(options, href);
      if (type && type.includes('image')) {
        request(href).pipe(fs.createWriteStream(dir + 'image' + index + '.jpg'));
      } else if (type && type.includes('css') || rel === 'stylesheet') {
        request(href).pipe(fs.createWriteStream(dir + 'css' + index + '.css'));
      } else if (type && type.includes('javascript')) {
        request(href).pipe(fs.createWriteStream(dir + 'js' + index + '.js'));
      } else if (type && type.includes('xml')) {
        request(href).pipe(fs.createWriteStream(dir + 'xml' + index + '.xml'));
      }
    }
  })
}

// 下载图片
function downloadImg (imgs, options) {
  imgs.each((index, img) => {
    // 获取图片的各个属性
    let imgUrl = img.attribs.src;
    let imgName = img.attribs.alt || 'img';
    let imgId = img.attribs.id || index;
    // console.log(imgUrl);
    // 将不完整的图片url转完成完整的图片url
    imgUrl = convertUrl(options, imgUrl);
    // 利用request模块保存图片
    request(imgUrl).pipe(fs.createWriteStream(dir + imgName + '_' + imgId + '.jpg'));
  })
}

// 对不合法的 url 进行转换
function convertUrl (options, url) {
  let res = null;
  if (url.startsWith('//')) {
    res = options.protocol + url;
  } else if (url.startsWith('/')) {
    res = options.origin + url;
  } else if (!url.startsWith('http') && !url.startsWith('https')) {
    // 在当前目录下, 直接拼凑目标 url
    let arr = options.pathname.split('/');
    arr.pop();
    arr.push(imgUrl);
    res = options.origin + arr.join('/');
  }
  // console.log(res, url);
  return res ? res : url;
}

// 测试案例部分

let url = 'https://www.xuetangx.com/';
getHtml(url);
// 下载的文件在当前目录的 dist 目录下