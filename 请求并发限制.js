import request from 'request';

// 并发请求限制实现
class LimitPromise {

  constructor(max) {
    this._max = max; // 异步任务"并发"上限
    this._count = 0; // 当前正在执行的任务数量
    this._taskQueue = []; // 等待执行的任务队列
  }

  // 对任务进行调度
  call (fn, ...args) {
    return new Promise((resolve, reject) => {
      let task = this.createTask(fn, args, resolve, reject);
      // 判断当前正在执行任务的数量是否达到上限
      if (this._count < this._max) {
        // 没到上限就执行任务
        task();
      } else {
        // 到上限就将任务先放进队列中
        this._taskQueue.push(task);
      }
    })
  }

  // 创建任务
  createTask (fn, args, resolve, reject) {
    return () => {
      fn(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          // 任务执行完成后, 计数-1
          this._count--;
          // 执行队列头部的任务
          if (this._taskQueue.length > 0)
            this._taskQueue.shift()();
        })
      // 任务执行时, 计数+1
      this._count++;
    }
  }
}

/*********** 使用方法 ***********/
// 只需要使用 LimitPromise 进行再一次的封装
// 即可实现请求并发数量的限制

const MAX = 10;
const limitP = new LimitPromise(MAX);

// 重新包装 get/post 方法
function get (url, params) {
  return limitP.call(request.get, url, params)
}

function post (url, params) {
  return limitP.call(request.post, url, params)
}

export { get, post };

// request.get 调用之后返回 Promise
/*
const request = require('./request')
request.get('https://www.baidu.com')
  .then((res) => {
    // 处理返回结果
  })
  .catch(err => {
    // 处理异常情况
  })
*/